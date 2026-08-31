const DEFAULT_SECTIONS = [
{
 id:"overview", title:"1. 유체역학 전체 지도", sub:"유체역학에서 무엇을 계산하려는가",
 body:`<div class="callout editable">유체역학의 핵심 질문은 세 가지다. <b>유체가 어디로 얼마나 흐르는가</b>, <b>압력과 속도가 어떻게 변하는가</b>, <b>유체와 물체가 서로 어떤 힘을 주고받는가</b>. 대부분의 식은 질량보존, 운동량보존, 에너지보존에서 출발한다.</div>
 <div class="grid">
 <div class="card editable"><h4>질량보존</h4><p>흐르던 유체의 질량은 갑자기 사라지지 않는다. 연속방정식의 출발점이다.</p></div>
 <div class="card editable"><h4>운동량보존</h4><p>유체의 속도나 방향을 바꾸려면 힘이 필요하다. 제트, 엘보, 항력 문제로 이어진다.</p></div>
 <div class="card editable"><h4>에너지보존</h4><p>압력·속도·높이는 서로 에너지 형태를 바꾼다. 베르누이 방정식의 핵심이다.</p></div>
 <div class="card editable"><h4>점성</h4><p>현실의 유체에서는 내부 마찰 때문에 에너지가 손실된다. 압력손실과 경계층이 생긴다.</p></div>
 </div>`
},
{
 id:"viscosity", title:"2. 점성", sub:"왜 물과 꿀은 다르게 흐르는가",
 body:`<div class="formula editable">τ = μ · du/dy</div>
 <div class="grid">
 <div class="card editable"><h4>왜 만들어졌나</h4><p>유체 내부의 마찰 효과를 정량적으로 표현하기 위해서다. 같은 속도 차이라도 점성이 큰 유체는 더 큰 전단응력을 만든다.</p></div>
 <div class="card editable"><h4>핵심 직관</h4><p>점성은 흐름을 방해하는 내부 마찰이다. 벽 근처 유체가 느려지고, 관내 유동과 경계층의 속도구배가 생긴다.</p></div>
 <div class="card editable"><h4>실무 활용</h4><ul><li>윤활유·엔진오일 선정</li><li>배관 압력손실</li><li>베어링과 유압 시스템</li><li>냉각수 및 공기 유동 해석</li></ul></div>
 <div class="card editable"><h4>연결 개념</h4><p>Reynolds 수, no-slip 조건, 경계층, Darcy 마찰손실, Navier–Stokes의 점성항과 연결된다.</p></div>
 </div>`
},
{
 id:"hydrostatics", title:"3. 정수역학", sub:"가만히 있는 유체의 압력은 어떻게 달라지는가",
 body:`<div class="formula editable">P = P₀ + ρgh</div>
 <div class="grid">
 <div class="card editable"><h4>왜 필요한가</h4><p>유체가 정지해 있어도 그 무게 때문에 깊이에 따라 압력이 달라진다. 구조물에 작용하는 유체 힘을 계산하기 위해 필요하다.</p></div>
 <div class="card editable"><h4>핵심 직관</h4><p>깊이 h가 커질수록 위에 쌓인 유체의 무게가 증가하므로 압력도 증가한다.</p></div>
 <div class="card editable"><h4>실무 활용</h4><ul><li>댐·수조·저장탱크</li><li>잠수함·선박</li><li>유압장치</li><li>압력계와 액주계</li></ul></div>
 <div class="card editable"><h4>주의</h4><p>ρ가 거의 일정한 비압축성 유체에서는 단순한 ρgh 형태가 편리하다. 기체처럼 밀도 변화가 크면 더 일반적인 관계가 필요하다.</p></div>
 </div>`
},
{
 id:"continuity", title:"4. 연속방정식", sub:"흐르던 유체는 갑자기 사라지지 않는다",
 body:`<div class="formula editable">ṁ = ρAV &nbsp;&nbsp; → &nbsp;&nbsp; 비압축성 정상유동: A₁V₁ = A₂V₂</div>
 <div class="grid">
 <div class="card editable"><h4>왜 만들어졌나</h4><p>제어체적에 들어오고 나가는 질량을 추적하기 위해서다. 질량보존법칙을 유동에 적용한 결과다.</p></div>
 <div class="card editable"><h4>핵심 직관</h4><p>같은 양의 비압축성 유체가 더 좁은 통로를 지나가면 유속이 커진다. A↓이면 V↑다.</p></div>
 <div class="card editable"><h4>실무 활용</h4><ul><li>배관 직경과 유속 계산</li><li>덕트 설계</li><li>노즐·디퓨저</li><li>유량 산정</li></ul></div>
 <div class="card editable"><h4>연결 개념</h4><p>베르누이와 함께 쓰면 단면 변화에 따른 압력·속도 변화를 계산할 수 있다.</p></div>
 </div>`
},
{
 id:"bernoulli", title:"5. 베르누이 방정식", sub:"압력·속도·높이는 어떻게 서로 바뀌는가",
 body:`<div class="formula editable">P + ½ρV² + ρgz = constant</div>
 <div class="grid">
 <div class="card editable"><h4>왜 만들어졌나</h4><p>유선을 따라 유체의 압력에너지, 운동에너지, 위치에너지가 어떻게 서로 변환되는지 계산하기 위해서다. 본질은 기계적 에너지 보존이다.</p></div>
 <div class="card editable"><h4>핵심 직관</h4><p>높이 변화가 작고 손실을 무시할 수 있다면 유속이 증가하는 구간에서 정압이 낮아질 수 있다. 다만 모든 상황에서 무조건 “속도↑ → 압력↓”라고 외우면 안 된다.</p></div>
 <div class="card editable"><h4>실무 활용</h4><ul><li>탱크 배출속도</li><li>노즐·벤투리 유량계</li><li>배관 압력 추정</li><li>펌프가 포함된 에너지 수지</li></ul></div>
 <div class="card editable"><h4>확장형</h4><p>현실의 배관에서는 펌프가 더하는 헤드와 마찰·밸브·엘보가 빼앗는 손실수두를 함께 넣는다.</p></div>
 </div>
 <div class="formula editable">P₁/(ρg)+V₁²/(2g)+z₁+hₚ = P₂/(ρg)+V₂²/(2g)+z₂+hᴸ</div>`
},
{
 id:"momentum", title:"6. 운동량 방정식", sub:"유체의 속도나 방향을 바꾸려면 얼마나 큰 힘이 필요한가",
 body:`<div class="formula editable">ΣF = ṁ(V₂ − V₁) &nbsp;&nbsp; (단순 1차원 정상유동)</div>
 <div class="grid">
 <div class="card editable"><h4>왜 만들어졌나</h4><p>뉴턴의 제2법칙을 흐르는 유체에 적용해 유체와 구조물 사이의 힘을 계산하기 위해서다.</p></div>
 <div class="card editable"><h4>핵심 직관</h4><p>유체의 운동량 벡터가 변하려면 힘이 필요하다. 속력뿐 아니라 방향만 바뀌어도 운동량이 변한다.</p></div>
 <div class="card editable"><h4>실무 활용</h4><ul><li>배관 엘보 지지력</li><li>소방호스 반력</li><li>제트 충돌</li><li>프로펠러·터빈·추진</li></ul></div>
 <div class="card editable"><h4>연결 개념</h4><p>항력과 양력은 물체 주변 유체의 운동량 변화와 표면 압력·전단력의 결과로 해석할 수 있다.</p></div>
 </div>`
},
{
 id:"reynolds", title:"7. Reynolds 수", sub:"관성과 점성 중 무엇이 흐름을 더 지배하는가",
 body:`<div class="formula editable">Re = ρVL/μ = VL/ν</div>
 <div class="grid">
 <div class="card editable"><h4>왜 만들어졌나</h4><p>서로 크기·속도·유체가 다른 유동의 성격을 하나의 무차원수로 비교하기 위해서다.</p></div>
 <div class="card editable"><h4>물리적 의미</h4><p>대략 관성효과와 점성효과의 상대적인 크기를 나타낸다. Re가 작으면 점성 영향이 상대적으로 크고, 커지면 관성 영향이 강해진다.</p></div>
 <div class="card editable"><h4>층류·난류</h4><p>원형 관내유동에서는 보통 Re가 약 2300보다 작으면 층류, 그보다 큰 영역에서 천이와 난류가 나타날 수 있다. 임계값은 유동 형태에 따라 달라진다.</p></div>
 <div class="card editable"><h4>실무 활용</h4><ul><li>층류/난류 모델 선택</li><li>마찰계수 결정</li><li>모형실험 상사성</li><li>CFD 물리모델 판단</li></ul></div>
 </div>`
},
{
 id:"navier", title:"8. Navier–Stokes 방정식", sub:"실제 유체의 운동을 지배하는 기본 운동방정식",
 body:`<div class="formula editable">ρ(∂u/∂t + u·∇u) = −∇p + μ∇²u + ρg</div>
 <div class="grid">
 <div class="card editable"><h4>왜 만들어졌나</h4><p>뉴턴의 제2법칙을 연속체인 유체에 적용해, 압력·점성·체적력이 유체를 어떻게 가속하는지를 계산하기 위해서다.</p></div>
 <div class="card editable"><h4>각 항의 의미</h4><p>왼쪽은 유체 입자의 가속도, 오른쪽은 압력에 의한 힘, 점성에 의한 힘, 중력 같은 체적력이다.</p></div>
 <div class="card editable"><h4>왜 어려운가</h4><p>대류항이 비선형이고 실제 형상이 복잡하면 해석해를 얻기 어렵다. 그래서 수치해석이 필요하다.</p></div>
 <div class="card editable"><h4>CFD와 연결</h4><p>Fluent 같은 CFD는 영역을 셀로 나누고 질량보존과 운동량보존 방정식을 수치적으로 반복해서 풀어 속도장과 압력장을 구한다.</p></div>
 </div>`
},
{
 id:"pipe", title:"9. 관내유동과 압력손실", sub:"배관에서는 왜 압력이 떨어지는가",
 body:`<div class="formula editable">h_f = f(L/D) · V²/(2g)</div>
 <div class="grid">
 <div class="card editable"><h4>왜 필요한가</h4><p>실제 배관의 점성 마찰 때문에 발생하는 기계적 에너지 손실을 계산하기 위해서다.</p></div>
 <div class="card editable"><h4>핵심 직관</h4><p>관이 길수록, 같은 조건에서 지름이 작을수록, 유속이 커질수록 손실은 커진다. 특히 유속의 제곱에 비례하는 형태가 중요하다.</p></div>
 <div class="card editable"><h4>실무 활용</h4><ul><li>냉각수·공정수 배관</li><li>HVAC 덕트</li><li>펌프 양정 산정</li><li>배관 지름 경제성 비교</li></ul></div>
 <div class="card editable"><h4>설계 관점</h4><p>작은 배관은 자재비를 줄이지만 유속과 손실을 키워 더 큰 펌프와 전력비를 요구할 수 있다. 설계는 이 둘의 균형 문제다.</p></div>
 </div>`
},
{
 id:"boundary", title:"10. 경계층과 No-slip", sub:"왜 물체 표면 가까이에서는 유체가 느려지는가",
 body:`<div class="callout editable"><b>No-slip 조건:</b> 점성이 있는 유체는 고체 벽면에서 벽과 같은 속도를 갖는다고 모델링한다. 정지 벽이라면 벽면 유속은 0이다.</div>
 <div class="grid">
 <div class="card editable"><h4>경계층</h4><p>벽면의 0 속도에서 외부 자유류 속도까지 유속이 변하는 얇은 영역이다. 이 안에서 점성 효과가 중요하다.</p></div>
 <div class="card editable"><h4>왜 중요한가</h4><p>표면 마찰, 열전달, 박리, 항력의 크기를 결정하는 핵심 영역이기 때문이다.</p></div>
 <div class="card editable"><h4>실무 활용</h4><ul><li>자동차 공력</li><li>항공기 날개</li><li>선박 저항</li><li>열교환기 유동</li></ul></div>
 <div class="card editable"><h4>CFD</h4><p>벽 근처 격자와 난류모델, y+ 관리가 중요한 이유도 경계층의 큰 속도구배를 제대로 계산해야 하기 때문이다.</p></div>
 </div>`
},
{
 id:"separation", title:"11. 박리", sub:"유체가 왜 물체 표면을 따라가지 못하고 떨어지는가",
 body:`<div class="grid">
 <div class="card editable"><h4>무엇인가</h4><p>경계층 유체가 불리한 압력구배 등을 이기지 못해 벽면을 따라 흐르지 못하고 떨어져 나오는 현상이다.</p></div>
 <div class="card editable"><h4>무엇이 생기나</h4><p>큰 후류와 와류, 압력회복 실패가 발생하고 압력항력이 커질 수 있다.</p></div>
 <div class="card editable"><h4>실무 활용</h4><ul><li>자동차 후면 형상</li><li>비행기 실속</li><li>원통·교량 구조물 와류</li><li>디퓨저 설계</li></ul></div>
 <div class="card editable"><h4>연결 개념</h4><p>경계층, 압력구배, 항력계수, vortex shedding과 연결해 이해하면 좋다.</p></div>
 </div>`
},
{
 id:"draglift", title:"12. 항력과 양력", sub:"유체와 물체가 만나면 어떤 힘이 생기는가",
 body:`<div class="formula editable">F_D = ½ρV²C_DA &nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp; F_L = ½ρV²C_LA</div>
 <div class="grid">
 <div class="card editable"><h4>항력</h4><p>유동 방향과 반대 방향으로 작용하는 힘이다. 표면 마찰과 압력 분포가 함께 기여한다.</p></div>
 <div class="card editable"><h4>양력</h4><p>주 유동 방향에 수직인 힘이다. 날개, 프로펠러, 자동차 다운포스, hydrofoil 등에 중요하다.</p></div>
 <div class="card editable"><h4>C_D와 C_L</h4><p>형상, Reynolds 수, 표면 상태, 받음각 등 복잡한 영향을 무차원 계수에 담아 비교하기 위한 값이다.</p></div>
 <div class="card editable"><h4>핵심 직관</h4><p>다른 조건이 같으면 힘은 V²에 비례한다. 속도가 2배가 되면 동압에 기반한 힘의 규모는 4배가 된다.</p></div>
 </div>`
},
{
 id:"dimensional", title:"13. 차원해석과 상사", sub:"작은 모형으로 실제 제품을 어떻게 예측하는가",
 body:`<div class="grid">
 <div class="card editable"><h4>왜 필요한가</h4><p>실제 크기의 선박, 항공기, 터빈을 매번 실험할 수 없기 때문에 축소 모형의 결과를 실물에 연결해야 한다.</p></div>
 <div class="card editable"><h4>핵심 생각</h4><p>단순히 길이 비율만 맞추는 것이 아니라 지배적인 무차원수를 적절히 맞춰 물리적으로 유사한 상태를 만든다.</p></div>
 <div class="card editable"><h4>대표 무차원수</h4><ul><li>Reynolds 수: 관성/점성</li><li>Mach 수: 유속/음속</li><li>Froude 수: 관성/중력</li></ul></div>
 <div class="card editable"><h4>실무 활용</h4><p>풍동, 선박 수조시험, 터보기계 시험, CFD 결과 검증에 쓰인다.</p></div>
 </div>`
},
{
 id:"pump", title:"14. 펌프와 시스템", sub:"유체에 에너지를 넣어 원하는 유량을 만드는 방법",
 body:`<div class="grid">
 <div class="card editable"><h4>펌프의 역할</h4><p>유체에 기계적 에너지를 공급해 높이 차와 압력손실을 극복하고 원하는 유량을 흐르게 한다.</p></div>
 <div class="card editable"><h4>시스템 관점</h4><p>필요 유량 → 배관 직경 → Re → 마찰계수 → 손실수두 → 총 양정 → 펌프 선정의 순서로 설계가 이어진다.</p></div>
 <div class="card editable"><h4>확장 베르누이</h4><p>펌프 헤드와 손실 헤드를 함께 넣어 시스템 전체의 에너지 수지를 맞춘다.</p></div>
 <div class="card editable"><h4>실무 핵심</h4><p>펌프 자체만 고르는 것이 아니라 배관 시스템 곡선과 펌프 성능곡선의 운전점을 본다.</p></div>
 </div>`
},
{
 id:"workflow", title:"15. 실무 문제 풀이 흐름", sub:"공식들을 실제 설계 문제에 연결하기",
 body:`<div class="callout editable"><b>예: 냉각수를 일정 유량으로 보내는 시스템</b><br><br>
 ① 필요한 유량 Q 결정 → ② Q=AV로 배관 직경과 유속 검토 → ③ Re 계산 → ④ 마찰계수 f 결정 → ⑤ 직관·국부 손실 계산 → ⑥ 확장 베르누이로 필요한 펌프 Head 계산 → ⑦ 펌프 선정 → ⑧ 복잡한 형상·분배 문제라면 CFD로 상세 검토</div>
 <div class="grid">
 <div class="card editable"><h4>중요한 사고방식</h4><p>공식을 따로 외우기보다 “이 단계에서 무엇을 모르는가?”를 보고 필요한 보존법칙이나 경험식을 선택한다.</p></div>
 <div class="card editable"><h4>핵심 연결</h4><p>연속식 → Re → 압력손실 → 베르누이 → 펌프 → 필요하면 Navier–Stokes/CFD.</p></div>
 </div>`
}
];

const QUIZ = [
 {q:"비압축성 정상유동에서 관 단면적이 절반이 되고 유량이 같다면 평균 유속은 어떻게 되는가?",
  o:["절반이 된다","2배가 된다","4배가 된다","변하지 않는다"], a:1,
  e:"Q=AV가 일정하므로 A가 1/2이 되면 V는 2배가 된다."},
 {q:"베르누이 방정식의 핵심 물리 원리는 무엇인가?",
  o:["질량보존","기계적 에너지 보존","각운동량 보존","열팽창 법칙"], a:1,
  e:"베르누이는 압력·운동·위치 형태의 기계적 에너지 변환을 나타낸다."},
 {q:"Reynolds 수가 주로 비교하는 두 효과는 무엇인가?",
  o:["압력과 온도","관성과 점성","중력과 표면장력","열전도와 대류"], a:1,
  e:"Re는 관성효과와 점성효과의 상대적 크기를 나타내는 대표적인 무차원수다."},
 {q:"정지한 고체 벽면에 대한 no-slip 조건을 적용하면 벽면의 유체 속도는?",
  o:["자유류 속도와 같다","0이다","항상 음수다","압력에만 의해 결정된다"], a:1,
  e:"정지 벽면에서는 점성 유체가 벽과 같은 속도를 갖는다고 보므로 벽면 유속은 0이다."},
 {q:"Darcy–Weisbach 식에서 다른 조건이 같을 때 유속이 2배가 되면 마찰손실수두는 대략 어떻게 되는가?",
  o:["1/2배","2배","4배","8배"], a:2,
  e:"h_f는 V²에 비례하므로 유속이 2배면 V² 항은 4배가 된다."},
 {q:"Navier–Stokes 방정식은 근본적으로 어떤 법칙을 유체에 적용한 것인가?",
  o:["뉴턴의 제2법칙","훅의 법칙","푸리에 법칙","이상기체 법칙"], a:0,
  e:"운동량 방정식인 Navier–Stokes는 유체에 대한 F=ma의 연속체 표현이다."},
 {q:"유체가 물체 표면을 따라 흐르다 떨어져 큰 후류를 만드는 현상은?",
  o:["공동","박리","확산","압축"], a:1,
  e:"경계층이 벽면을 더 이상 따라가지 못하고 떨어지는 현상을 박리라고 한다."},
 {q:"항력식 F_D=½ρV²C_DA에서 다른 조건이 같을 때 속도가 3배가 되면 항력 규모는?",
  o:["3배","6배","9배","27배"], a:2,
  e:"항력은 V²에 비례하므로 3²=9배다."},
 {q:"배관의 90° 엘보에 작용하는 반력을 직접 계산할 때 가장 핵심적인 보존법칙은?",
  o:["질량보존만","운동량보존","열역학 제0법칙","상태방정식"], a:1,
  e:"유체의 속도 벡터 방향이 바뀌므로 운동량 변화에 필요한 힘을 계산한다."},
 {q:"축소 모형의 유동을 실물과 물리적으로 유사하게 만들기 위해 중요하게 보는 것은?",
  o:["길이 비만 맞춘다","대표 무차원수의 상사","재료의 색상","계산 격자 수만 동일하게 한다"], a:1,
  e:"Re, Froude, Mach 같은 지배적 무차원수를 맞춰 동역학적 상사를 확보한다."}
];