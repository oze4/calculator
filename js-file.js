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
      if(firstNumber != "" && operator != "" && secondNumber !="" ){
        operate()
        operator += segno
      }
      else if(firstNumber != "" ){
        operator = segno
        
      }
    })
  })  

  const decimale = document.querySelector("#decimal")
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

  const equal = document.querySelector("#equal")
equal.addEventListener("click", operate)
  
function operate () {
    let result = ""
    const num1 = parseFloat(firstNumber)
    const num2 = parseFloat(secondNumber)
    
    if (operator === "" || secondNumber === ""){
      return
    }
    else if (operator === "+") {
      result += (num1 + num2)
      firstNumber = result
      monitor.value = firstNumber
    }
    else if (operator === "-") {
      result += (num1 - num2)
      firstNumber = result
      monitor.value = firstNumber
    }
    else if (operator === "*") {
      result += (num1 * num2)
      firstNumber = result
      monitor.value = firstNumber
    }
    else if (operator === "/") {
      result += (num1 / num2)
      firstNumber = result
      monitor.value = firstNumber
    }
    operator = ""
    secondNumber= ""
  }
