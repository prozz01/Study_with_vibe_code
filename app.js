const storedVersion = Number(localStorage.getItem("fluidContentVersion") || "0");
const storedSections = JSON.parse(localStorage.getItem("fluidSections") || "null");
let sections = (storedVersion === CONTENT_VERSION && storedSections) ? storedSections : JSON.parse(JSON.stringify(DEFAULT_SECTIONS));
let completed = JSON.parse(localStorage.getItem("fluidCompleted") || "{}");
let editMode = false;

if (storedVersion !== CONTENT_VERSION) {
  localStorage.setItem("fluidSections", JSON.stringify(sections));
  localStorage.setItem("fluidContentVersion", String(CONTENT_VERSION));
}

const $ = s => document.querySelector(s);
const nav = $("#nav"), sectionsEl = $("#sections"), search = $("#search");

function render(){
  nav.innerHTML = "";
  sectionsEl.innerHTML = "";
  sections.forEach((s)=>{
    const nb=document.createElement("button");
    nb.textContent=s.title; nb.dataset.target=s.id;
    nb.onclick=()=>document.getElementById(s.id).scrollIntoView({behavior:"smooth",block:"start"});
    nav.appendChild(nb);

    const el=document.createElement("section");
    el.className="section"; el.id=s.id;
    el.innerHTML=`<div class="section-head">
      <div><h3>${s.title}</h3><p class="subtitle">${s.sub}</p></div>
      <label class="complete"><input type="checkbox" ${completed[s.id]?"checked":""} data-complete="${s.id}"> 학습 완료</label>
    </div>
    <div class="body">${s.body}</div>`;
    sectionsEl.appendChild(el);
  });
  document.querySelectorAll("[data-complete]").forEach(cb=>cb.onchange=e=>{
    completed[e.target.dataset.complete]=e.target.checked;
    localStorage.setItem("fluidCompleted",JSON.stringify(completed)); updateProgress();
  });
  setEditable(editMode);
  updateProgress();
}

function setEditable(on){
  editMode=on;
  document.querySelectorAll(".editable").forEach(el=>el.contentEditable=on?"true":"false");
  $("#editBtn").textContent=on?"편집 저장":"편집 모드";
  $("#editBtn").classList.toggle("success",on);
  $("#saveStatus").textContent=on?"본문을 직접 수정한 뒤 ‘편집 저장’을 누르세요":`실무 사례 v${CONTENT_VERSION}`;
}

function saveEdits(){
  sections.forEach(s=>{
    const sec=document.getElementById(s.id);
    if(sec) s.body=sec.querySelector(".body").innerHTML;
  });
  localStorage.setItem("fluidSections",JSON.stringify(sections));
  localStorage.setItem("fluidContentVersion",String(CONTENT_VERSION));
  $("#saveStatus").textContent="브라우저에 저장됨";
  toast("수정 내용을 이 브라우저에 저장했습니다.");
}

$("#editBtn").onclick=()=>{
  if(editMode){saveEdits(); setEditable(false);}
  else setEditable(true);
};

function updateProgress(){
  const total=sections.length, done=sections.filter(s=>completed[s.id]).length;
  $("#progressText").textContent=`${done} / ${total}`;
  $("#progressBar").style.width=(done/total*100)+"%";
}

search.addEventListener("input",()=>{
  const q=search.value.trim().toLowerCase();
  document.querySelectorAll(".section").forEach(sec=>{
    const hit=!q || sec.innerText.toLowerCase().includes(q);
    sec.classList.toggle("hidden",!hit);
  });
  document.querySelectorAll(".nav button").forEach(btn=>{
    const sec=document.getElementById(btn.dataset.target);
    btn.classList.toggle("hidden",sec.classList.contains("hidden"));
  });
});

document.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){
    e.preventDefault();search.focus();search.select();
  }
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll(".nav button").forEach(b=>b.classList.toggle("active",b.dataset.target===e.target.id));
    }
  });
},{rootMargin:"-25% 0px -65% 0px"});
function observe(){document.querySelectorAll(".section").forEach(s=>observer.observe(s));}

function toast(msg){
  const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800);
}

$("#exportBtn").onclick=()=>{
  if(editMode) saveEdits();
  const data={version:CONTENT_VERSION,sections,completed,exportedAt:new Date().toISOString()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="유체역학_학습노트_백업.json";a.click();
  URL.revokeObjectURL(a.href);
};

$("#importBtn").onclick=()=>$("#fileInput").click();
$("#fileInput").onchange=e=>{
  const f=e.target.files[0]; if(!f)return;
  const r=new FileReader();
  r.onload=()=>{
    try{
      const d=JSON.parse(r.result);
      if(!Array.isArray(d.sections)) throw new Error();
      sections=d.sections; completed=d.completed||{};
      localStorage.setItem("fluidSections",JSON.stringify(sections));
      localStorage.setItem("fluidCompleted",JSON.stringify(completed));
      localStorage.setItem("fluidContentVersion",String(CONTENT_VERSION));
      render(); observe(); toast("백업을 불러왔습니다.");
    }catch{alert("올바른 백업 JSON 파일이 아닙니다.");}
  }; r.readAsText(f);
};

$("#resetBtn").onclick=()=>{
  if(confirm("수정 내용과 학습 완료 기록을 기본 상태로 되돌릴까요?")){
    localStorage.removeItem("fluidSections"); localStorage.removeItem("fluidCompleted");
    sections=JSON.parse(JSON.stringify(DEFAULT_SECTIONS)); completed={};
    localStorage.setItem("fluidSections",JSON.stringify(sections));
    localStorage.setItem("fluidContentVersion",String(CONTENT_VERSION));
    render(); observe(); toast("최신 기본 내용으로 초기화했습니다.");
  }
};

let quizOrder=[], qi=0, score=0, answered=false;
function startQuiz(){
  quizOrder=[...Array(QUIZ.length).keys()].sort(()=>Math.random()-.5);
  qi=0; score=0; answered=false; $("#quizPanel").style.display="block"; showQuiz();
}
function showQuiz(){
  if(qi>=quizOrder.length){
    $("#quizQuestion").textContent=`완료! ${QUIZ.length}문제 중 ${score}문제를 맞혔습니다.`;
    $("#quizOptions").innerHTML="";
    $("#quizFeedback").textContent=score>=8?"핵심 개념을 실제 상황에 잘 연결하고 있습니다.":"틀린 문제의 실제 사례를 본문 검색으로 다시 확인해보세요.";
    $("#quizProgress").textContent="퀴즈 완료"; $("#quizScore").textContent=`점수 ${score}/${QUIZ.length}`;
    $("#nextQuiz").textContent="다시 풀기"; answered=true; return;
  }
  answered=false; $("#nextQuiz").textContent="다음 문제";
  const q=QUIZ[quizOrder[qi]];
  $("#quizProgress").textContent=`${qi+1} / ${QUIZ.length}`;
  $("#quizScore").textContent=`현재 점수 ${score}`;
  $("#quizQuestion").textContent=q.q; $("#quizFeedback").textContent="";
  const wrap=$("#quizOptions");wrap.innerHTML="";
  q.o.forEach((label,idx)=>{
    const b=document.createElement("button"); b.className="option"; b.textContent=label;
    b.onclick=()=>{
      if(answered)return; answered=true;
      [...wrap.children].forEach((x,j)=>{if(j===q.a)x.classList.add("correct");});
      if(idx!==q.a)b.classList.add("wrong"); else score++;
      $("#quizScore").textContent=`현재 점수 ${score}`;
      $("#quizFeedback").textContent=q.e;
    };
    wrap.appendChild(b);
  });
}
$("#quizBtn").onclick=startQuiz;
$("#closeQuiz").onclick=()=>$("#quizPanel").style.display="none";
$("#nextQuiz").onclick=()=>{
  if(qi>=quizOrder.length){startQuiz();return;}
  if(!answered){toast("먼저 답을 선택하세요.");return;}
  qi++; showQuiz();
};
$("#quizPanel").addEventListener("click",e=>{if(e.target.id==="quizPanel")$("#quizPanel").style.display="none";});

render(); observe();