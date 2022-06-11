//* =================================================
//*                     IOS CALCULATOR
//* =================================================
const prevDisp = document.querySelector(".previous-display");
const currDisp = document.querySelector(".current-display");

const btnContainer = document.querySelector(".buttons-container");

let currOperand = "";
let previousOperand = "";
let operation = "";

//? Butonlari tasiyan container icin event tanimlamasi
btnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("num")) {
    appendNumber(e.target.textContent);
    updateDisplay();
  }

  if (e.target.classList.contains("operator")) {
    chooseOperator(e.target.textContent);
    updateDisplay();
  }

  if (e.target.classList.contains("equal")) {
    calculate();
    updateDisplay();
  }
});

const appendNumber = (num) => {
  //? Eger onceden 0 girilmisse ve tekrardan 0 girilise geri don
  if (currOperand === "0" && num === "0") return;

  //? Eğer ilk olarak 0 girilmisse ve sonrasinda da . haricinde baska
  //? bir sayi girilmis ise sadece girilen yeni sayiyi degiskene aktar.
  //? Orn: 09 => 9 , 03 => 3 , 0.1 => 0.1
  if (currOperand === "0" && num !== ".") {
    currOperand = num;
    return;
  }

  //? Eğer şu anki sayi . ise ve önceki girilen sayi . iceriyorsa geri don
  if (num === "." && currOperand.includes(".")) return;

  if (currOperand.length > 10) return;
  //? Girilen sayilari birlestir.
  currOperand += num;
};

const updateDisplay = () => {
  currDisp.textContent = currOperand;
  prevDisp.textContent = `${previousOperand} ${operation}`;
};

const chooseOperator = (op) => {
  //? ilk sayi girisiinden sonraki islemleri gercekletir
  if (previousOperand) {
    calculate();
  }

  //? Degisken swapiing
  operation = op;
  previousOperand = currOperand;
  currOperand = "";
};

const calculate = () => {
  let calculation = 0;

  const prev = Number(previousOperand);
  const current = Number(currOperand);

  switch (operation) {
    case "+":
      calculation = prev + current;
      break;
    case "-":
      calculation = prev - current;
      break;
    case "x":
      calculation = prev * current;
      break;
    case "÷":
      calculation = prev / current;
      break;
    default:
      return;
  }

  currOperand = calculation;

  //! eşittir butonuna tıklandığında ekranda gözükmemesi için previousoperand ve operationı silmemiz gerekir

  previousOperand = "";
  operation = "";
};
