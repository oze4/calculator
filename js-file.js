const monitor = document.querySelector("#schermo")

let firstNumber = "";
let operator = "";
let secondNumber = "";

const numbers = document.querySelectorAll("[data-numero]")
numbers.forEach((number) => {
    number.addEventListener("click", () => {
      const numero =  number.getAttribute('data-numero')
      if (operator === ""){
        firstNumber += numero
        monitor.value = firstNumber
      }
      else if (operator != ""){
        secondNumber += numero
        monitor.value = secondNumber
      }
    });
  });

  const signs = document.querySelectorAll("[data-segno]")
signs.forEach((sign) => {
    sign.addEventListener("click", () => {
      const segno =  sign.getAttribute('data-segno')
      if(firstNumber != ""){
        operator = segno
      }
    })
  })  

  const decimale = document.querySelector("#decimale")
  decimale.addEventListener('click', () => {
    if (operator === '') {
      if (!firstNumber.includes('.')) {
        firstNumber += '.';
        monitor.value = firstNumber

      }
    } else {
      if (!secondNumber.includes('.')) {
        secondNumber += '.';
        monitor.value = secondNumber
      }
    }
  })

