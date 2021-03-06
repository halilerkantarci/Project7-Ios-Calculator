//* =================================================
//*                     IOS CALCULATOR
//* =================================================
const prevDisp = document.querySelector(".previous-display");
const currDisp = document.querySelector(".current-display");

const btnContainer = document.querySelector(".buttons-container");

let currOperand = "";
let previousOperand = "";
let operation = "";
let equalOrPercentPressed = false;

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
    equalOrPercentPressed = true;
  }
  if (e.target.classList.contains("ac")) {
    previousOperand = "";
    currOperand = "";
    operation = "";
    updateDisplay();
  }

  if (e.target.classList.contains("pm")) {
    if (!currOperand) return;
    currOperand *= -1;
    updateDisplay();
  }

  if (e.target.classList.contains("percent")) {
    if (!currOperand) return;
    currOperand /= 100;
    updateDisplay();
    equalOrPercentPressed = true;
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

  if (equalOrPercentPressed) {
    currOperand = num;
    equalOrPercentPressed = false;
    return;
  }
  //? Girilen sayilari birlestir.
  currOperand += num;
};

const updateDisplay = () => {
  if (currOperand.toString().length > 11) {
    currOperand = Number(currOperand).toExponential(5);
  }
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
      // break yazsaydık alttaki kodlar çalışmaya devam ederdi,return olunca direkt fonksiyondan çıkar. böylece eşittire basınca toplam değeri çıkar (break varken sıfır çıkıyodu)
      return;
  }

  currOperand = calculation;

  //! eşittir butonuna tıklandığında ekranda gözükmemesi için previousoperand ve operationı silmemiz gerekir

  previousOperand = "";
  operation = "";
};
