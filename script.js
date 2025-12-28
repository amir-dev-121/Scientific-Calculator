const display = document.getElementById("display");
const lastResultEl = document.getElementById("lastResult");
const historyList = document.getElementById("historyList");

let expr = "";
let ans = 0;
let shift = false;
let degree = true;

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

math.config({ angles: "deg" });

function insert(v){
  expr += v;
  display.value = expr;
}

function clearAll(){
  expr = "";
  display.value = "";
}

function backspace(){
  expr = expr.slice(0,-1);
  display.value = expr;
}

function toggleShift(){
  shift = !shift;
  document.getElementById("shiftBtn").classList.toggle("active");
}

function trig(fn){
  if(shift){
    if(fn==="sin") insert("asin(");
    if(fn==="cos") insert("acos(");
    if(fn==="tan") insert("atan(");
  }else{
    insert(fn + "(");
  }
}

function toggleDeg(){
  degree = !degree;
  math.config({ angles: degree ? "deg" : "rad" });
  document.getElementById("degBtn").innerText = degree ? "DEG" : "RAD";
}

function calculate(){
  try{
    let result = math.evaluate(expr.replace("ln","log"));
    ans = result;
    lastResultEl.innerText = result;
    display.value = result;

    history.unshift(`${expr} = ${result}`);
    history = history.slice(0,5);
    localStorage.setItem("calcHistory", JSON.stringify(history));

    expr = "";
    shift = false;
    document.getElementById("shiftBtn").classList.remove("active");
  }catch{
    display.value = "Error";
  }
}

function useAns(){
  insert(ans.toString());
}

function openHistory(){
  historyList.innerHTML = "";
  history.forEach(h => historyList.innerHTML += `<li>${h}</li>`);
  document.getElementById("historyPopup").style.display = "flex";
}

function closeHistory(){
  document.getElementById("historyPopup").style.display = "none";
}

function clearHistory(){
  history = [];
  localStorage.removeItem("calcHistory");
  historyList.innerHTML = "";
}

function toggleTheme(){
  document.body.classList.toggle("dark");
  document.getElementById("lightLabel").classList.toggle("active");
  document.getElementById("darkLabel").classList.toggle("active");
}
