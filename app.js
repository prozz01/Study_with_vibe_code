const ADMIN_EMAIL = "prozz0912@gmail.com";
const CONTENT_ID = "fluid_mechanics";
let db = null;
let currentUser = null;
let isAdmin = false;

const storedVersion = Number(localStorage.getItem("fluidContentVersion") || "0");
const storedSections = JSON.parse(localStorage.getItem("fluidSections") || "null");
let sections = (storedVersion === CONTENT_VERSION && storedSections) ? storedSections : JSON.parse(JSON.stringify(DEFAULT_SECTIONS));
let completed = JSON.parse(localStorage.getItem("fluidCompleted") || "{}");
let editMode = false;

const $ = s => document.querySelector(s);
const nav = $("#nav"), sectionsEl = $("#sections"), search = $("#search");

const metaTargets = [
  ["brandTitle", ".brand h1"],
  ["brandText", ".brand p"],
  ["chapter", ".chapter"],
  ["heroKicker", ".hero .kicker"],
  ["heroTitle", ".hero h2"],
  ["heroText", ".hero > p"]
];

const defaultMeta = {};
metaTargets.forEach(([key, selector]) => {
  const el = $(selector);
  if (el) {
    defaultMeta[key] = el.innerHTML;
    el.dataset.metaEdit = key;
  }
});

let meta = JSON.parse(localStorage.getItem("fluidMeta") || "null") || JSON.parse(JSON.stringify(defaultMeta));

function cacheContent(){
  localStorage.setItem("fluidSections", JSON.stringify(sections));
  localStorage.setItem("fluidMeta", JSON.stringify(meta));
  localStorage.setItem("fluidContentVersion", String(CONTENT_VERSION));
}

function applyMeta(){
  metaTargets.forEach(([key, selector]) => {
    const el = $(selector);
    if (el && meta[key] != null) el.innerHTML = meta[key];
  });
}

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
      <div class="section-heading-text">
        <h3 class="section-title-edit" data-field="title">${s.title}</h3>
        <p class="subtitle section-sub-edit" data-field="sub">${s.sub}</p>
      </div>
      <label class="complete"><input type="checkbox" ${completed[s.id]?"checked":""} data-complete="${s.id}"> 학습 완료</label>
    </div>
    <div class="body">${s.body}</div>`;
    sectionsEl.appendChild(el);
  });

  document.querySelectorAll("[data-complete]").forEach(cb=>cb.onchange=e=>{
    completed[e.target.dataset.complete]=e.target.checked;
    localStorage.setItem("fluidCompleted",JSON.stringify(completed));
    updateProgress();
  });

  setEditable(editMode);
  updateProgress();
}

function editableElements(){
  return document.querySelectorAll(".editable, .section-title-edit, .section-sub-edit, [data-meta-edit]");
}

function setEditable(on){
  if(on && !isAdmin){
    editMode=false;
    toast("관리자 로그인 후 수정할 수 있습니다.");
    return;
  }

  editMode=on;
  document.body.classList.toggle("edit-mode", on);
  editableElements().forEach(el=>{
    el.contentEditable=on?"true":"false";
    if(on) el.setAttribute("spellcheck","false");
    else el.removeAttribute("spellcheck");
  });

  if($("#editBtn")){
    $("#editBtn").textContent=on?"온라인 저장":"편집 모드";
    $("#editBtn").classList.toggle("success",on);
  }
  if(on) $("#saveStatus").textContent="관리자 편집 중 · Ctrl+S로 온라인 저장";
}

function collectEdits(){
  sections.forEach(s=>{
    const sec=document.getElementById(s.id);
    if(!sec) return;
    const titleEl=sec.querySelector('[data-field="title"]');
    const subEl=sec.querySelector('[data-field="sub"]');
    const bodyEl=sec.querySelector(".body");
    if(titleEl) s.title=titleEl.innerText.trim() || s.title;
    if(subEl) s.sub=subEl.innerText.trim();
    if(bodyEl) s.body=bodyEl.innerHTML;
  });

  metaTargets.forEach(([key, selector])=>{
    const el=$(selector);
    if(el) meta[key]=el.innerHTML;
  });
  cacheContent();
}

async function saveOnline(){
  if(!db || !isAdmin){
    toast("이 계정에는 온라인 쓰기 권한이 없습니다.");
    return false;
  }

  collectEdits();
  $("#saveStatus").textContent="온라인 저장 중…";
  const payload={version:CONTENT_VERSION,sections,meta};
  const {error}=await db
    .from("study_content")
    .update({content:payload,updated_at:new Date().toISOString()})
    .eq("id",CONTENT_ID);

  if(error){
    console.error(error);
    $("#saveStatus").textContent="온라인 저장 실패";
    toast("저장하지 못했습니다. 로그인 상태를 확인해주세요.");
    return false;
  }

  document.querySelectorAll(".nav button").forEach((btn,idx)=>{
    if(sections[idx]) btn.textContent=sections[idx].title;
  });
  $("#saveStatus").textContent="온라인 DB에 저장됨";
  toast("수정 내용을 온라인에 저장했습니다.");
  return true;
}

async function loadOnlineContent(){
  if(!db){
    $("#saveStatus").textContent="DB 설정 대기 중 · 로컬 내용 사용";
    return;
  }

  $("#saveStatus").textContent="온라인 내용 불러오는 중…";
  const {data,error}=await db
    .from("study_content")
    .select("content,updated_at")
    .eq("id",CONTENT_ID)
    .single();

  if(error){
    console.error(error);
    $("#saveStatus").textContent="온라인 연결 실패 · 로컬 사본 사용";
    return;
  }

  const remote=data?.content;
  if(remote && Array.isArray(remote.sections) && remote.sections.length){
    sections=remote.sections;
    meta={...defaultMeta,...(remote.meta||{})};
    cacheContent();
    applyMeta();
    render();
    observe();
    $("#saveStatus").textContent="온라인 최신 내용";
  }else{
    $("#saveStatus").textContent="온라인 저장 준비됨 · 현재 내용 사용";
  }
}

function updateAuthUI(){
  isAdmin = !!currentUser && (currentUser.email||"").toLowerCase()===ADMIN_EMAIL.toLowerCase();
  document.querySelectorAll(".admin-only").forEach(el=>el.classList.toggle("hidden",!isAdmin));

  if($("#authState")){
    $("#authState").textContent=isAdmin
      ? "관리자 · 온라인 편집 가능"
      : (currentUser?"로그인됨 · 읽기 전용":"방문자 모드 · 읽기 전용");
  }
  if($("#authBtn")) $("#authBtn").textContent=currentUser?"로그아웃":"관리자 로그인";

  if(!isAdmin && editMode) setEditable(false);
}

async function initializeDb(){
  try{
    const response=await fetch('/api/config',{cache:'no-store'});
    const cfg=await response.json();
    if(!cfg.url || !cfg.key) throw new Error('Supabase environment variables are missing');
    db=window.supabase.createClient(cfg.url,cfg.key);
    return true;
  }catch(error){
    console.error(error);
    $("#saveStatus").textContent="DB 설정 필요 · 읽기 전용 로컬 모드";
    if($("#authBtn")) $("#authBtn").classList.add("hidden");
    return false;
  }
}

async function initializeAuth(){
  if(!db) return;
  const {data}=await db.auth.getSession();
  currentUser=data.session?.user||null;
  updateAuthUI();

  db.auth.onAuthStateChange((_event,session)=>{
    currentUser=session?.user||null;
    updateAuthUI();
  });
}

if($("#authBtn")) $("#authBtn").onclick=async()=>{
  if(!db){
    toast("DB 연결 설정이 아직 완료되지 않았습니다.");
    return;
  }

  if(currentUser){
    await db.auth.signOut();
    currentUser=null;
    updateAuthUI();
    toast("로그아웃했습니다.");
    return;
  }

  const email=(prompt("관리자 이메일을 입력하세요.")||"").trim().toLowerCase();
  if(!email) return;
  if(email!==ADMIN_EMAIL.toLowerCase()){
    toast("관리자로 등록되지 않은 이메일입니다.");
    return;
  }

  $("#authState").textContent="로그인 링크 전송 중…";
  const redirectTo=window.location.origin+window.location.pathname;
  const {error}=await db.auth.signInWithOtp({
    email,
    options:{emailRedirectTo:redirectTo,shouldCreateUser:true}
  });

  if(error){
    console.error(error);
    $("#authState").textContent="방문자 모드 · 읽기 전용";
    toast("로그인 메일을 보내지 못했습니다.");
    return;
  }

  $("#authState").textContent="이메일의 로그인 링크를 확인하세요";
  toast("관리자 이메일로 로그인 링크를 보냈습니다.");
};

if($("#editBtn")) $("#editBtn").onclick=async()=>{
  if(editMode){
    const ok=await saveOnline();
    if(ok) setEditable(false);
  }else{
    setEditable(true);
  }
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

document.addEventListener("keydown",async e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){
    e.preventDefault();
    search.focus();
    search.select();
  }

  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"&&editMode){
    e.preventDefault();
    const ok=await saveOnline();
    if(ok) setEditable(false);
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
  const t=$("#toast");
  t.textContent=msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2200);
}

$("#exportBtn").onclick=()=>{
  if(editMode) collectEdits();
  const data={version:CONTENT_VERSION,sections,completed,meta,exportedAt:new Date().toISOString()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="유체역학_학습노트_백업.json";
  a.click();
  URL.revokeObjectURL(a.href);
};

$("#importBtn").onclick=()=>{if(isAdmin) $("#fileInput").click();};
$("#fileInput").onchange=e=>{
  const f=e.target.files[0];
  if(!f||!isAdmin)return;
  const r=new FileReader();
  r.onload=async()=>{
    try{
      const d=JSON.parse(r.result);
      if(!Array.isArray(d.sections)) throw new Error();
      sections=d.sections;
      meta={...defaultMeta,...(d.meta||{})};
      applyMeta();
      render();
      observe();
      await saveOnline();
    }catch{
      alert("올바른 백업 JSON 파일이 아닙니다.");
    }
  };
  r.readAsText(f);
};

$("#resetBtn").onclick=async()=>{
  if(!isAdmin) return;
  if(confirm("온라인 학습 내용을 기본 상태로 되돌릴까요?")){
    sections=JSON.parse(JSON.stringify(DEFAULT_SECTIONS));
    meta=JSON.parse(JSON.stringify(defaultMeta));
    applyMeta();
    render();
    observe();
    await saveOnline();
  }
};

let quizOrder=[], qi=0, score=0, answered=false;
function startQuiz(){
  quizOrder=[...Array(QUIZ.length).keys()].sort(()=>Math.random()-.5);
  qi=0; score=0; answered=false;
  $("#quizPanel").style.display="block";
  showQuiz();
}

function showQuiz(){
  if(qi>=quizOrder.length){
    $("#quizQuestion").textContent=`완료! ${QUIZ.length}문제 중 ${score}문제를 맞혔습니다.`;
    $("#quizOptions").innerHTML="";
    $("#quizFeedback").textContent=score>=8?"핵심 개념을 실제 상황에 잘 연결하고 있습니다.":"틀린 문제의 실제 사례를 본문 검색으로 다시 확인해보세요.";
    $("#quizProgress").textContent="퀴즈 완료";
    $("#quizScore").textContent=`점수 ${score}/${QUIZ.length}`;
    $("#nextQuiz").textContent="다시 풀기";
    answered=true;
    return;
  }

  answered=false;
  $("#nextQuiz").textContent="다음 문제";
  const q=QUIZ[quizOrder[qi]];
  $("#quizProgress").textContent=`${qi+1} / ${QUIZ.length}`;
  $("#quizScore").textContent=`현재 점수 ${score}`;
  $("#quizQuestion").textContent=q.q;
  $("#quizFeedback").textContent="";
  const wrap=$("#quizOptions");
  wrap.innerHTML="";

  q.o.forEach((label,idx)=>{
    const b=document.createElement("button");
    b.className="option";
    b.textContent=label;
    b.onclick=()=>{
      if(answered)return;
      answered=true;
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
  qi++;
  showQuiz();
};
$("#quizPanel").addEventListener("click",e=>{if(e.target.id==="quizPanel")$("#quizPanel").style.display="none";});

(async function boot(){
  applyMeta();
  render();
  observe();
  updateAuthUI();
  const ok=await initializeDb();
  if(!ok) return;
  await initializeAuth();
  await loadOnlineContent();
})();