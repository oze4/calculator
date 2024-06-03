const monitor = document.querySelector("#schermo")

let firstNumber = "";
let operator = "";
let secondNumber = "";
let resultCalculated = false

const numbers = document.querySelectorAll("[data-numero]")
numbers.forEach((number) => {
    number.addEventListener("click", () => {
      const numero =  number.getAttribute('data-numero')
      if (!resultCalculated){
      if (operator === ""){
        firstNumber += numero
        monitor.value = firstNumber
      }}
        if (operator != ""){
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
        operator = segno
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
     
    }
    else if (operator === "-") {
      result += (num1 - num2)
    }
    else if (operator === "*") {
      result += (num1 * num2)
      
    }
    else if (operator === "/") {
      result += (num1 / num2)
      
    }
    if (result.toString().length > 15) {
      result = parseFloat(result).toExponential(3);
  }
    firstNumber = result
    monitor.value = firstNumber
    
    operator = ""
    secondNumber= ""
    resultCalculated = true
  }

  const ac = document.querySelector("#reset")
  ac.addEventListener("click", function (){
    resultCalculated = false
    firstNumber = ""
    operator = ""
    secondNumber = ""
    monitor.value = firstNumber
  })

  const canc = document.querySelector("#canc")
  canc.addEventListener("click", function(){
    if (!resultCalculated) { 
    if (operator == "" && firstNumber != ""){
    firstNumber = firstNumber.slice(0, -1)
    monitor.value = firstNumber
    }
  }
     if (operator != "" && secondNumber != ""){
      secondNumber = secondNumber.slice(0, -1)
      monitor.value = secondNumber
    }
  })
  
  document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
      if (!resultCalculated){
        if (operator === ""){
          firstNumber += event.key
          monitor.value = firstNumber
        }}
          if (operator != ""){
          secondNumber += event.key
          monitor.value = secondNumber
        }
    }
     else if (['+', '-', '*', '/'].includes(event.key)) {
      if(firstNumber != "" && operator != "" && secondNumber !="" ){
        operate()
        operator = event.key
      }
      else if(firstNumber != "" ){
        operator = event.key
        
      }
    } else if (event.key === '.') {
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
    }
    else if (event.key === 'Enter') {
      operate();
    } 
    else if (event.key === 'Backspace') {
      if (!resultCalculated) { 
        if (operator == "" && firstNumber != ""){
        firstNumber = firstNumber.slice(0, -1)
        monitor.value = firstNumber
        }
      }
         if (operator != "" && secondNumber != ""){
          secondNumber = secondNumber.slice(0, -1)
          monitor.value = secondNumber
        }
    }
  });