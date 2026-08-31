const CONTENT_VERSION = 2;

const DEFAULT_SECTIONS = [
{
 id:"overview", title:"1. 유체역학 전체 지도", sub:"공식들이 실제 설계에서는 어떻게 이어지는가",
 body:`<div class="callout editable"><b>실무의 핵심:</b> 유체역학 공식은 각각 따로 쓰이는 것이 아니라 하나의 설계 흐름 안에서 연결된다. 예를 들어 공장의 냉각수 시스템이라면 <b>유량 결정 → 배관 직경 → 유속 → Reynolds 수 → 압력손실 → 펌프 양정 → 필요하면 CFD</b> 순서로 이어진다.</div>
 <div class="grid">
 <div class="card editable"><h4>질량보존 → 유량과 유속</h4><p>필요한 냉각수량이 정해지면 Q=AV를 이용해 배관 지름과 평균 유속을 정한다. 너무 작은 배관은 유속과 손실을 키운다.</p></div>
 <div class="card editable"><h4>운동량보존 → 구조물이 받는 힘</h4><p>엘보에서 물이 90° 꺾이거나 제트엔진이 공기를 뒤로 가속하면 운동량이 변한다. 이 변화량으로 배관 지지력이나 추진력을 계산한다.</p></div>
 <div class="card editable"><h4>에너지보존 → 압력과 펌프</h4><p>높이차, 압력차, 유속, 마찰손실을 한 에너지 수지에 넣고 펌프가 얼마의 에너지를 보충해야 하는지 계산한다.</p></div>
 <div class="card editable"><h4>Navier–Stokes → 복잡한 유동장</h4><p>형상이 복잡해 1차원 식으로 부족하면 CFD로 셀마다 압력과 속도를 계산한다. NASA도 실제 유동 해석에서 Navier–Stokes의 수치해를 CFD로 구한다고 설명한다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">이 페이지의 실제 활용 사례는 NASA Glenn, 미국 DOE, NOAA, ITTC의 공개 자료를 참고해 구성했다.</p>`
},
{
 id:"viscosity", title:"2. 점성", sub:"점성은 실제 설계에서 무엇을 바꾸는가",
 body:`<div class="formula editable">τ = μ · du/dy</div>
 <div class="grid">
 <div class="card editable"><h4>실제 장면 ① 윤활유</h4><p>베어링이나 엔진의 두 표면 사이에는 얇은 오일막이 있다. 축이 움직이면 오일 내부에 속도구배 du/dy가 생기고, 점성 때문에 전단응력이 발생한다. 점도가 너무 낮으면 금속 접촉 위험이 커지고, 너무 높으면 점성저항과 동력손실이 커진다.</p></div>
 <div class="card editable"><h4>실제 장면 ② 항공기 표면 마찰</h4><p>NASA는 항력의 한 원인인 skin friction이 공기의 점성과 경계층 상태에 좌우된다고 설명한다. 즉 표면이 거칠거나 경계층 상태가 바뀌면 같은 형상에서도 항력이 달라질 수 있다.</p></div>
 <div class="card editable"><h4>가상 계산 예시</h4><p>두 평판 사이 간격이 1 mm이고 위 판이 1 m/s로 움직인다고 하자. du/dy≈1000 s⁻¹이다. μ=0.001 Pa·s인 물이라면 τ≈1 Pa, μ=0.1 Pa·s인 오일이라면 τ≈100 Pa다. 같은 속도구배라도 점도가 100배면 필요한 전단력도 100배다.</p></div>
 <div class="card editable"><h4>설계에서 결정하는 것</h4><p>윤활유 등급, 펌프 동력, 압력손실, 열발생, CFD의 점성모델과 벽면 격자 조건을 결정하는 출발점이 된다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">참고 사례: <a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/what-is-drag/" target="_blank" style="color:#67b7ff">NASA Glenn · What is Drag?</a></p>`
},
{
 id:"hydrostatics", title:"3. 정수역학", sub:"깊이에 따른 압력은 구조 설계를 어떻게 바꾸는가",
 body:`<div class="formula editable">P = P₀ + ρgh</div>
 <div class="grid">
 <div class="card editable"><h4>실제 장면 ① 잠수정</h4><p>NOAA는 바닷물에서 약 10 m 깊어질 때마다 압력이 약 1기압씩 증가한다고 설명한다. 그래서 심해 잠수정의 압력선체는 수심이 깊어질수록 훨씬 큰 외압을 견뎌야 한다.</p></div>
 <div class="card editable"><h4>실제 장면 ② 탱크·댐</h4><p>수조 벽은 위보다 아래쪽에서 더 큰 압력을 받는다. 따라서 벽면의 압력분포를 적분해 총 힘과 작용점을 구하고, 판 두께·보강재·앵커 하중 등을 정한다.</p></div>
 <div class="card editable"><h4>숫자 예시</h4><p>물의 밀도를 1000 kg/m³라 하면 수면 아래 10 m에서 게이지압은 ρgh = 1000×9.81×10 ≈ <b>98.1 kPa</b>다. 20 m라면 약 196 kPa로 두 배가 된다.</p></div>
 <div class="card editable"><h4>설계에서 묻는 질문</h4><p>“탱크 바닥 압력은?”, “잠수정 외판이 받는 외압은?”, “센서는 어느 압력 범위를 가져야 하나?”를 계산하는 데 쓰인다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">참고 사례: <a href="https://oceanservice.noaa.gov/facts/pressure.html" target="_blank" style="color:#67b7ff">NOAA · Ocean pressure with depth</a></p>`
},
{
 id:"continuity", title:"4. 연속방정식", sub:"배관·노즐의 크기를 바꾸면 왜 유속이 변하는가",
 body:`<div class="formula editable">ṁ = ρAV &nbsp;&nbsp; → &nbsp;&nbsp; 비압축성 정상유동: A₁V₁ = A₂V₂</div>
 <div class="grid">
 <div class="card editable"><h4>실제 장면 ① 노즐</h4><p>호스나 터빈 노즐에서 출구 단면을 줄이면 같은 유량을 통과시키기 위해 유속이 올라간다. 이 원리는 소방 노즐, 분사기, 제트엔진 노즐, 냉각수 분사구에 그대로 적용된다.</p></div>
 <div class="card editable"><h4>실제 장면 ② 덕트 분기</h4><p>공조 덕트가 여러 방으로 분기되면 주 덕트의 유량은 각 분기 유량의 합과 같아야 한다. 이를 이용해 각 구간의 덕트 크기와 풍량을 맞춘다.</p></div>
 <div class="card editable"><h4>숫자 예시</h4><p>직경 100 mm 관에서 평균속도가 1 m/s라고 하자. 관이 50 mm로 줄면 단면적은 1/4이므로 같은 유량에서 속도는 <b>4 m/s</b>가 된다. 직경은 절반이지만 면적은 제곱으로 줄어든다는 점이 중요하다.</p></div>
 <div class="card editable"><h4>다음 단계</h4><p>연속식으로 유속을 구한 뒤 베르누이로 압력변화를 보거나, Reynolds 수와 Darcy 식으로 마찰손실을 계산한다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">NASA의 추진식에서도 질량유량 ṁ=ρVA가 사용되며, 엔진을 통과하는 질량유량과 속도 변화가 추력으로 연결된다.</p>`
},
{
 id:"bernoulli", title:"5. 베르누이 방정식", sub:"실제 장비에서 압력을 이용해 속도를 어떻게 알아내는가",
 body:`<div class="formula editable">P + ½ρV² + ρgz = constant</div>
 <div class="grid">
 <div class="card editable"><h4>실제 장면 ① 항공기 피토-정압관</h4><p>NASA는 항공기에서 total pressure와 static pressure를 측정하고 베르누이 관계를 이용해 비행속도를 구하는 피토관을 대표 응용으로 제시한다. 속도를 직접 재기 어렵지만 압력은 센서로 비교적 쉽게 측정할 수 있기 때문이다.</p></div>
 <div class="card editable"><h4>가상 계산: 압력차 → 속도</h4><p>높이차를 무시하고 공기밀도 1.225 kg/m³, 전압과 정압의 차가 500 Pa라면 V=√(2ΔP/ρ)≈<b>28.6 m/s</b>, 약 <b>103 km/h</b>다.</p></div>
 <div class="card editable"><h4>실제 장면 ② 벤투리 유량계</h4><p>관을 좁혀 유속을 올리면 압력이 변한다. 두 지점의 압력차를 재고 연속방정식과 베르누이를 함께 쓰면 유량을 역산할 수 있다.</p></div>
 <div class="card editable"><h4>중요한 제한</h4><p>기본형은 정상·비점성·비압축성 등의 가정이 있다. 실제 긴 배관에서는 마찰손실을, 펌프가 있으면 펌프 헤드를 추가한 확장 에너지식을 사용해야 한다.</p></div>
 </div>
 <div class="formula editable">P₁/(ρg)+V₁²/(2g)+z₁+hₚ = P₂/(ρg)+V₂²/(2g)+z₂+hᴸ</div>
 <p class="editable" style="color:#9eadc8;font-size:13px">참고 사례: <a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/bernoullis-equation/" target="_blank" style="color:#67b7ff">NASA Glenn · Bernoulli’s Equation</a></p>`
},
{
 id:"momentum", title:"6. 운동량 방정식", sub:"제트엔진·엘보·소방호스의 힘을 어떻게 계산하는가",
 body:`<div class="formula editable">ΣF = ṁ(V₂ − V₁) &nbsp;&nbsp; (단순 1차원 정상유동)</div>
 <div class="grid">
 <div class="card editable"><h4>실제 장면 ① 제트엔진 추력</h4><p>NASA의 일반 추력식은 엔진이 공기를 뒤로 가속해 생기는 운동량 변화와 출구 압력항을 합해 추력을 계산한다. 즉 “얼마나 많은 질량을 초당 얼마나 빠르게 가속했는가”가 핵심이다.</p></div>
 <div class="card editable"><h4>가상 계산</h4><p>압력항을 무시하고 질량유량이 50 kg/s, 유입속도 200 m/s, 출구속도 500 m/s라면 F=50×(500−200)=<b>15,000 N = 15 kN</b>이다.</p></div>
 <div class="card editable"><h4>실제 장면 ② 90° 배관 엘보</h4><p>물의 속력은 같아도 방향이 x축에서 y축으로 바뀌면 운동량 벡터가 변한다. 이때 필요한 힘의 반작용이 배관과 지지대에 전달되므로 앵커·서포트 설계에 사용한다.</p></div>
 <div class="card editable"><h4>실제 장면 ③ 소방호스</h4><p>노즐에서 물이 고속으로 분사되면 물의 운동량을 앞쪽으로 증가시키는 만큼 호스에는 반대 방향 반력이 생긴다. 유량과 분사속도가 커질수록 잡아야 하는 힘도 커진다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">참고 사례: <a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/thrust-force/" target="_blank" style="color:#67b7ff">NASA Glenn · Thrust Equation</a></p>`
},
{
 id:"reynolds", title:"7. Reynolds 수", sub:"같은 형상도 속도·크기가 달라지면 왜 흐름이 달라지는가",
 body:`<div class="formula editable">Re = ρVL/μ = VL/ν</div>
 <div class="grid">
 <div class="card editable"><h4>실제 장면 ① 배관</h4><p>같은 물이라도 유속이나 관경이 커지면 Re가 증가해 층류에서 천이·난류 영역으로 갈 수 있다. 이 변화는 마찰계수와 압력손실, 혼합과 열전달 특성을 바꾼다.</p></div>
 <div class="card editable"><h4>숫자 예시</h4><p>물(ρ≈1000 kg/m³, μ≈0.001 Pa·s)이 직경 20 mm 관을 흐른다고 하자. V=0.01 m/s이면 Re≈<b>200</b>, V=0.1 m/s이면 Re≈<b>2,000</b>, V=1 m/s이면 Re≈<b>20,000</b>이다. 속도 하나만 바뀌어도 유동 성격이 크게 달라진다.</p></div>
 <div class="card editable"><h4>실제 장면 ② 항공·자동차</h4><p>NASA는 경계층의 층류/난류 상태와 skin friction이 Reynolds 수의 영향을 받는다고 설명한다. 풍동 모형과 실제 차량의 Re가 다르면 표면마찰과 박리 거동도 달라질 수 있다.</p></div>
 <div class="card editable"><h4>CFD에서의 역할</h4><p>Re를 먼저 계산하면 층류 모델로 충분한지, 난류모델이 필요한지, 벽면 격자를 얼마나 촘촘하게 해야 하는지 판단하는 근거가 된다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">참고 사례: <a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/boundary-layer/" target="_blank" style="color:#67b7ff">NASA Glenn · Boundary Layer / Reynolds Number</a></p>`
},
{
 id:"navier", title:"8. Navier–Stokes 방정식", sub:"왜 복잡한 형상은 CFD가 필요한가",
 body:`<div class="formula editable">ρ(∂u/∂t + u·∇u) = −∇p + μ∇²u + ρg</div>
 <div class="grid">
 <div class="card editable"><h4>실제 장면 ① 자동차 주변 공기</h4><p>차체 앞·측면·하부·후면에서는 속도와 압력이 위치마다 다르고 후류와 박리도 생긴다. 하나의 베르누이 식으로 전체장을 알 수 없기 때문에 공간을 수많은 셀로 나누어 운동량 방정식을 푼다.</p></div>
 <div class="card editable"><h4>실제 장면 ② 냉각 유로</h4><p>전자장비나 엔진 냉각 통로처럼 굴곡과 분기가 많으면 특정 구역에 유량이 몰리거나 정체영역이 생길 수 있다. CFD로 각 분기의 유량, 압력강하, 열전달 분포를 확인한다.</p></div>
 <div class="card editable"><h4>NASA가 설명하는 CFD</h4><p>NASA는 Navier–Stokes를 해석적으로 풀기 어려운 실제 문제에서 finite difference, finite volume, finite element 등의 수치기법을 사용하며 이것이 CFD라고 설명한다.</p></div>
 <div class="card editable"><h4>결과로 무엇을 결정하나</h4><p>형상 변경, 덕트 위치, 냉각구 배치, 항력 저감, 압력손실, 팬·펌프 용량, 국부 과열 가능성 등을 판단한다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">참고: <a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/navier-strokes-equation/" target="_blank" style="color:#67b7ff">NASA Glenn · Navier–Stokes Equation</a></p>`
},
{
 id:"pipe", title:"9. 관내유동과 압력손실", sub:"배관 지름이 펌프 크기와 전기요금을 어떻게 바꾸는가",
 body:`<div class="formula editable">h_f = f(L/D) · V²/(2g)</div>
 <div class="grid">
 <div class="card editable"><h4>가상 계산</h4><p>길이 20 m, 직경 50 mm 관에서 물이 2 m/s로 흐르고 f=0.02라고 하자. h_f≈<b>1.63 m</b>이고, 물의 압력손실로 바꾸면 ΔP=ρgh_f≈<b>16 kPa</b>다.</p></div>
 <div class="card editable"><h4>왜 배관을 무조건 작게 못 하나</h4><p>같은 유량에서 D를 줄이면 V가 증가하고, Darcy 식의 V²와 L/D가 동시에 불리해진다. 작은 관은 자재비는 싸지만 펌프 양정과 운전 전력비를 크게 만들 수 있다.</p></div>
 <div class="card editable"><h4>실제 산업 적용</h4><p>미국 DOE는 산업용 펌핑 시스템에서 배관 마찰손실과 pipe sizing을 에너지 절감의 핵심 항목으로 다루고, 여러 배관 지름의 생애주기 비용을 비교할 것을 권장한다.</p></div>
 <div class="card editable"><h4>국부손실도 포함</h4><p>실제 시스템에는 직관뿐 아니라 밸브, 엘보, 스트레이너, 급확대·급축소가 있다. 각각의 K값을 이용해 K·V²/(2g) 형태의 손실을 더한다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">참고: <a href="https://www.energy.gov/eere/amo/downloads/pumping-system-assessment-tool-user-manual" target="_blank" style="color:#67b7ff">U.S. DOE · Pumping System Assessment Tool</a></p>`
},
{
 id:"boundary", title:"10. 경계층과 No-slip", sub:"항공기·자동차 표면 바로 옆의 얇은 영역이 왜 중요한가",
 body:`<div class="callout editable"><b>No-slip 조건:</b> 정지한 고체 벽면에서 점성 유체의 속도를 0으로 둔다. 벽에서 멀어질수록 자유류 속도로 회복하면서 큰 속도구배가 생기고, 이 영역이 경계층이다.</div>
 <div class="grid">
 <div class="card editable"><h4>실제 장면 ① 항공기 skin friction</h4><p>비행기 표면을 스치는 공기는 벽에서 0부터 외부 속도까지 변한다. 이 속도구배가 전단응력을 만들고 전체 표면에 누적되면 마찰항력이 된다.</p></div>
 <div class="card editable"><h4>실제 장면 ② 열교환기</h4><p>벽 근처에는 속도경계층뿐 아니라 온도경계층도 발달한다. 경계층 두께와 난류 정도는 열전달계수에 영향을 주므로 냉각 성능과 압력손실을 함께 고려해야 한다.</p></div>
 <div class="card editable"><h4>CFD 실무</h4><p>벽 근처 속도구배가 크기 때문에 격자를 벽면에 층상으로 촘촘히 배치한다. 난류모델에 따라 y+ 목표가 달라지고, 이를 잘못 잡으면 마찰과 박리를 부정확하게 예측할 수 있다.</p></div>
 <div class="card editable"><h4>설계에서 결정하는 것</h4><p>표면 거칠기, 공력 형상, 열교환기 핀 형상, 벽면 격자, 난류모델 선택에 직접 연결된다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">참고: <a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/boundary-layer/" target="_blank" style="color:#67b7ff">NASA Glenn · Boundary Layer</a></p>`
},
{
 id:"separation", title:"11. 박리", sub:"왜 자동차 뒤에 큰 후류가 생기고 날개가 실속하는가",
 body:`<div class="grid">
 <div class="card editable"><h4>실제 장면 ① 날개 실속</h4><p>NASA는 높은 받음각에서 경계층이 표면에서 떨어져 나가면 날개 뒤쪽 유동이 크게 분리되고 양력이 급격히 나빠지는 실속과 연결된다고 설명한다.</p></div>
 <div class="card editable"><h4>실제 장면 ② 자동차 후면</h4><p>차량 뒤에서 유동이 깔끔하게 따라가지 못하면 저압의 큰 wake가 생긴다. 앞쪽 높은 압력과 뒤쪽 낮은 압력의 차이가 커져 압력항력이 증가한다.</p></div>
 <div class="card editable"><h4>실제 장면 ③ 디퓨저</h4><p>유로를 너무 급격히 넓히면 유속은 낮아지고 압력은 회복하려 하지만 불리한 압력구배가 너무 커져 벽면 박리가 생길 수 있다. 그러면 기대한 압력회복을 얻지 못한다.</p></div>
 <div class="card editable"><h4>엔지니어가 바꾸는 것</h4><p>곡률을 완만하게 하거나, 후면 형상을 다듬거나, vortex generator 같은 장치를 써 경계층에 운동량을 공급하는 방식으로 박리 위치를 조절한다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">참고: <a href="https://www.grc.nasa.gov/www/k-12/BGP/boundlay.html" target="_blank" style="color:#67b7ff">NASA Glenn · Boundary Layer and Separation</a></p>`
},
{
 id:"draglift", title:"12. 항력과 양력", sub:"속도가 올라갈수록 필요한 동력이 왜 급격히 커지는가",
 body:`<div class="formula editable">F_D = ½ρV²C_DA &nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp; F_L = ½ρV²C_LA</div>
 <div class="grid">
 <div class="card editable"><h4>자동차 가상 예시</h4><p>ρ=1.225 kg/m³, C_D=0.30, 전면적 A=2.2 m²라고 하자. 100 km/h에서 항력은 약 <b>312 N</b>, 200 km/h에서는 약 <b>1,248 N</b>으로 4배가 된다.</p></div>
 <div class="card editable"><h4>동력은 더 가파르게 증가</h4><p>공기저항을 이기는 동력은 P=F·V이므로 대략 V³에 비례한다. 위 가정에서는 공력에만 필요한 동력이 약 8.7 kW에서 69 kW로 약 8배가 된다. 고속에서 공력 개선이 중요한 이유다.</p></div>
 <div class="card editable"><h4>양력의 실제 사용</h4><p>항공기는 양력으로 중량을 지탱하고, 레이싱카는 날개와 바닥 형상으로 아래 방향의 양력인 다운포스를 만든다. 풍력터빈 블레이드도 양력 성분으로 회전 토크를 얻는다.</p></div>
 <div class="card editable"><h4>C_D·C_L의 의미</h4><p>형상, 받음각, Reynolds 수, 표면상태 등의 복잡한 영향을 무차원 계수에 담는다. 따라서 CFD나 풍동시험의 주요 출력이 C_D와 C_L이다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">참고: <a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/what-is-drag/" target="_blank" style="color:#67b7ff">NASA Glenn · Drag</a></p>`
},
{
 id:"dimensional", title:"13. 차원해석과 상사", sub:"선박 모형시험 결과를 실제 230 m 선박에 어떻게 연결하는가",
 body:`<div class="grid">
 <div class="card editable"><h4>실제 사례: KCS 선형</h4><p>ITTC의 선박 저항 CFD 가이드에는 KCS 컨테이너선 사례가 나온다. 실선 Lpp는 <b>230 m</b>, 축척비 λ=<b>31.6</b>, 모형 길이는 <b>7.278 m</b>, 목표 Froude 수는 <b>0.26</b>로 제시된다.</p></div>
 <div class="card editable"><h4>왜 Froude 수를 맞추나</h4><p>자유수면을 달리는 선박은 파를 만들기 때문에 관성력과 중력의 비인 Froude 수가 조파 현상의 상사에 중요하다. 같은 Fr에서 모형을 시험해 파형과 조파저항을 실선과 연결한다.</p></div>
 <div class="card editable"><h4>그런데 Reynolds 수는?</h4><p>축소모형에서는 길이와 속도가 달라져 Re까지 동시에 실선과 완벽히 맞추기 어렵다. 그래서 선박 저항시험에서는 점성저항의 scale effect를 별도로 보정하는 절차가 중요하다.</p></div>
 <div class="card editable"><h4>다른 분야</h4><p>항공 풍동에서는 Re와 Mach 수, 회전체에서는 Re·Mach·유량계수 등을 보면서 모형과 실물 사이의 물리적 유사성을 판단한다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">실제 사례: <a href="https://ittc.info/media/4198/75-03-02-04.pdf" target="_blank" style="color:#67b7ff">ITTC · Practical Guidelines for Ship Resistance CFD</a></p>`
},
{
 id:"pump", title:"14. 펌프와 시스템", sub:"펌프는 단순히 ‘센 것’을 고르는 장비가 아니다",
 body:`<div class="formula editable">필요 펌프 Head ≈ 높이차 + 압력차 Head + 속도 Head 변화 + 배관·밸브 손실</div>
 <div class="grid">
 <div class="card editable"><h4>실제 설계 질문</h4><p>“분당 몇 L를 몇 m 위로 보내야 하는가?”, “배관과 밸브에서 몇 m의 Head를 잃는가?”를 먼저 계산하고 그 조건에서 필요한 유량과 양정을 동시에 만족하는 펌프를 고른다.</p></div>
 <div class="card editable"><h4>가상 예시</h4><p>탱크 사이 높이차가 15 m이고 배관·밸브 손실이 5 m라면 최소한 약 <b>20 m Head</b>가 필요하다. 물 기준으로 이는 약 <b>196 kPa</b>의 압력상승에 해당한다.</p></div>
 <div class="card editable"><h4>DOE의 실제 평가 방식</h4><p>미국 DOE의 Pumping System Assessment Tool은 suction/discharge pressure, elevation, velocity head, friction head를 합쳐 펌프 head를 평가하고, 시스템 수정에 따른 에너지 절감 가능성을 비교한다.</p></div>
 <div class="card editable"><h4>운전점</h4><p>배관 시스템은 유량이 늘수록 손실이 증가하는 system curve를 만들고, 펌프는 자체 성능곡선을 가진다. 두 곡선이 만나는 지점이 실제 운전점이 된다.</p></div>
 </div>
 <p class="editable" style="color:#9eadc8;font-size:13px">참고: <a href="https://www.energy.gov/cmei/ito/pump-systems" target="_blank" style="color:#67b7ff">U.S. DOE · Pump Systems</a></p>`
},
{
 id:"workflow", title:"15. 실무 문제 풀이 흐름", sub:"냉각수 배관을 설계한다고 가정하면",
 body:`<div class="callout editable"><b>예시 프로젝트:</b> 생산장비에 냉각수를 공급하는 폐회로 배관을 설계한다. 필요한 유량만 맞추는 것으로 끝나는 것이 아니라, 유속·압력손실·펌프·진동·유량분배까지 순서대로 확인한다.</div>
 <div class="grid">
 <div class="card editable"><h4>① 요구조건</h4><p>장비의 발열량과 허용 온도상승에서 필요한 냉각수 유량 Q를 정한다. 여기서는 열역학/열전달 결과가 유체역학의 입력이 된다.</p></div>
 <div class="card editable"><h4>② 배관 직경</h4><p>Q=AV로 후보 직경별 유속을 계산한다. 너무 빠르면 손실·소음·침식 가능성이 커지고, 너무 느리면 배관이 불필요하게 커진다.</p></div>
 <div class="card editable"><h4>③ Re와 마찰계수</h4><p>Re로 유동영역을 확인하고 상대조도와 함께 마찰계수 f를 결정한다. 이 값이 Darcy–Weisbach 손실 계산으로 들어간다.</p></div>
 <div class="card editable"><h4>④ 모든 손실 합산</h4><p>직관, 엘보, 밸브, 필터, 열교환기 등의 압력손실을 합한다. 필터가 막히는 최악조건도 검토할 수 있다.</p></div>
 <div class="card editable"><h4>⑤ 펌프 선정</h4><p>높이차와 전체 손실을 에너지식에 넣어 필요한 Head를 얻고, 펌프 성능곡선에서 목표 유량과 Head를 만족하는 모델을 고른다.</p></div>
 <div class="card editable"><h4>⑥ CFD가 필요한 순간</h4><p>분배 매니폴드에서 특정 장비에만 유량이 몰리거나, 탱크 내부에 정체영역이 있거나, 급격한 형상변화가 있으면 1차원 계산을 넘어 CFD로 유동장을 확인한다.</p></div>
 </div>
 <div class="callout editable" style="margin-top:16px"><b>핵심:</b> 실무에서는 “무슨 공식을 쓸까?”보다 <b>지금 필요한 미지수가 무엇이고, 어떤 보존법칙과 손실모델이 그 미지수를 연결하는가</b>를 판단하는 능력이 더 중요하다.</div>`
}
];

const QUIZ = [
 {q:"직경 100 mm 배관이 50 mm로 줄어들고 비압축성 유량이 일정하다. 앞 구간 평균유속이 1 m/s라면 뒤 구간 유속은?",o:["2 m/s","4 m/s","0.5 m/s","1 m/s"],a:1,e:"단면적은 직경의 제곱에 비례한다. 직경이 절반이면 면적은 1/4이므로 유속은 4배가 된다."},
 {q:"항공기 피토-정압관에서 전압과 정압의 차를 측정하는 가장 직접적인 목적은?",o:["고도를 직접 계산하기 위해","베르누이 관계로 유속을 구하기 위해","공기의 점성계수를 구하기 위해","날개의 면적을 구하기 위해"],a:1,e:"피토-정압관은 전압과 정압의 차인 동압을 측정해 유속을 계산하는 대표적인 베르누이 응용이다."},
 {q:"질량유량 50 kg/s의 공기가 200 m/s에서 500 m/s로 가속되고 압력항을 무시한다. 운동량 변화에 따른 추력은?",o:["6 kN","10 kN","15 kN","25 kN"],a:2,e:"F=ṁ(V₂−V₁)=50×300=15,000 N=15 kN이다."},
 {q:"같은 물이 같은 직경 관을 흐를 때 유속을 10배 높이면 Reynolds 수는 어떻게 되는가?",o:["1/10배","변하지 않는다","10배","100배"],a:2,e:"Re=ρVD/μ에서 나머지 조건이 같으면 Re는 V에 정비례한다."},
 {q:"길이 20 m, 직경 0.05 m, f=0.02, V=2 m/s인 관의 Darcy 마찰손실수두에 가장 가까운 값은? (g=9.81 m/s²)",o:["0.16 m","0.82 m","1.63 m","6.52 m"],a:2,e:"h_f=0.02×(20/0.05)×(2²/(2×9.81))≈1.63 m이다."},
 {q:"날개 받음각을 크게 올렸을 때 경계층 박리가 심해지면 대표적으로 발생할 수 있는 현상은?",o:["실속","정수압 증가","질량보존 위반","점성 소멸"],a:0,e:"큰 박리는 날개 위 압력분포와 양력을 악화시켜 실속으로 이어질 수 있다."},
 {q:"다른 조건이 같은 자동차가 100 km/h에서 200 km/h로 속도를 높이면 항력식의 V² 항 때문에 항력은 대략?",o:["2배","4배","6배","8배"],a:1,e:"속도가 2배이면 V²는 4배가 된다."},
 {q:"실선과 축소 선박모형에서 자유수면 파 생성의 동역학적 상사를 맞출 때 특히 중요한 무차원수는?",o:["Froude 수","Prandtl 수","Nusselt 수","Biot 수"],a:0,e:"선박의 조파 현상은 관성력과 중력의 비를 나타내는 Froude 수의 상사가 핵심이다."},
 {q:"펌프를 선정하기 전에 배관의 마찰손실과 높이차를 계산하는 주된 이유는?",o:["필요한 총 Head를 알기 위해","유체의 분자량을 알기 위해","배관의 색상을 정하기 위해","중력가속도를 변경하기 위해"],a:0,e:"펌프는 목표 유량에서 시스템이 요구하는 총 Head를 공급해야 하므로 높이차와 손실을 먼저 계산한다."},
 {q:"복잡한 자동차 후류에서 위치별 압력과 속도를 모두 알고 싶을 때 가장 적합한 접근은?",o:["정수압식만 사용","베르누이 한 식만 사용","Navier–Stokes 기반 CFD","단순 비례식만 사용"],a:2,e:"박리와 와류가 있는 복잡한 3차원 유동장은 Navier–Stokes 방정식을 수치적으로 푸는 CFD가 적합하다."}
];