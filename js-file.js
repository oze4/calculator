const monitor = document.querySelector("#schermo")

let firstNumber = "";
let sign = "";
let secondNumber = "";

const numbers = document.querySelectorAll("[data-numero]")
numbers.forEach((number) => {
    number.addEventListener("click", () => {
      const numero =  number.getAttribute('data-numero')
      if (sign === ""){
        firstNumber += numero
        monitor.value = firstNumber
      }
      else if (sign != ""){
        secondNumber += numero
        monitor.value = secondNumber
      }
    });
  });

