/* ================= DOM ELEMENTS ================= */
const display =
document.querySelector("#display");
const copy =
document.querySelector("#copy");
const length =
document.querySelector("#length");
const range =
document.querySelector("#range");

const uppercase =
document.querySelector("#uppercase");
const lowercase =
document.querySelector("#lowercase");
const number =
document.querySelector("#number");
const symbol =
document.querySelector("#symbol");

const strength =
document.querySelector("#strength");
const generate =
document.querySelector("#generate");

/* Make input fields read-only */
display.readOnly = true;
strength.readOnly = true;

/* ================= CHARACTER SETS ================= */
const uppercaseSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "0123456789";
const symbolSet = "!@#$%^&*";

/* ================= COPY PASSWORD ================= */
copy.addEventListener("click", () => {
  if(display.value === ""){
    alert("First generate your password!");
    return;
  }
  navigator.clipboard.writeText(display.value);
});

/* ================= RANGE SLIDER ================= */
range.value = length.innerText;

range.addEventListener("input", () => {
  length.innerText = range.value;
});

/* ================= STRENGTH CHECK ================= */
function getUserData(){
  let count = 0;

  if(uppercase.checked) count++;
  if(lowercase.checked) count++;
  if(number.checked) count++;
  if(symbol.checked) count++;

  if(count === 1){
    strength.value = "WEAK";
    strength.style.backgroundColor = "#E74C3C";
    strength.style.color = "white";
  } 
  else if(count === 2){
    strength.value = "MEDIUM";
    strength.style.backgroundColor = "yellow";
    strength.style.color = "black";
  } 
  else if(count === 3){
    strength.value = "HARD";
    strength.style.backgroundColor = "green";
    strength.style.color = "white";
  } 
  else if(count === 4){
    strength.value = "VERY STRONG";
    strength.style.backgroundColor = "gold";
    strength.style.color = "black";
  } 
  else{
    strength.value = "STRENGTH";
    strength.style.backgroundColor = "black";
    strength.style.color = "white";
  };
};

/* Attach strength checker to all checkboxes */
uppercase.addEventListener("change", getUserData);
lowercase.addEventListener("change", getUserData);
number.addEventListener("change", getUserData);
symbol.addEventListener("change", getUserData);


// Secure random index generator (Cryptographically strong)
function getSecureRandomIndex(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

/* ================= GENERATE PASSWORD ================= */
generate.addEventListener("click", () => {

  let pool = "";

  if(uppercase.checked) pool += uppercaseSet;
  if(lowercase.checked) pool += lowercaseSet;
  if(number.checked) pool += numberSet;
  if(symbol.checked) pool += symbolSet;
  

  if(pool === ""){
    alert("Select at least one option");
    return;
  }

  let password = "";

  for(let i = 0; i < range.value; i++){
    const randomIndex = getSecureRandomIndex(pool.length);
    password += pool[randomIndex];
    
    /* For Developers to debug */
    console.log(randomIndex);
    console.log(pool[randomIndex]);
  }

  display.value = password;
});