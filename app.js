//* ==================================================================
//*                        IOS CALCULATOR
//* ==================================================================

const prevDisp = document.querySelector(".previous-display");
const currDisp = document.querySelector(".current-display");

const btnContainer = document.querySelector(".buttons-container");

let currOperand = "";
let prevOperand = "";

//we defined an event for buttons container
btnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("num")) {
    appendNumber(e.target.textContent);
    updateDisplay();
  }
});

const appendNumber = (num) => {
  // eğer ilk sayı sıfırsa geri döndür
  if (!currOperand && num === "0") return;

  if (currOperand.includes(".") && num === ".") return;

  // girilen sayiyi birleştirir
  currOperand += num;
};

const updateDisplay = () => {
  // str dönüyor
  currDisp.textContent = currOperand;
};
