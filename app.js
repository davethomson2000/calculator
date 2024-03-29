let runningTotal = 0
let inputNumber = 0
let inputString = "0"
let currentOperand = ""
let historyString = ""
const operands = ["*", "/", "+", "-"]

const mainDisplay = document.querySelector("#display-result")
const memoryDisplay = document.querySelector('#display-memory')
const calculator = document.querySelector("#calculator")

//event handle button clicks
const buttons = document.querySelectorAll(".button")
for (let button of buttons) {
    console.log(button)
    button.addEventListener("click", (event) => handleButtonPress(event.target.textContent))
}
//event handle keyboard presses
document.addEventListener("keypress", (event) => handleButtonPress(event.key))

function handleButtonPress(buttonPressed) {
    console.log(buttonPressed)
    if (isNaN(buttonPressed)) // is not a number
        handleOtherInput(buttonPressed)
    else
        handleNumberInput(buttonPressed)
}

function handleNumberInput(buttonPressed) {
    if (!Number(inputString))
        inputString = buttonPressed
    else
        inputString = inputString + buttonPressed;
    
    mainDisplay.textContent = inputString
}

function handleOtherInput(buttonPressed) {
    //if most recent input was an operand, save that as current operand and handle
    if (operands.includes(buttonPressed)) 
        if (currentOperand) 
            equalsTotal()
        else
            saveInputNumber()

    const specialFunctions = {
        "CLEAR": clear,
        "CLEAR ALL": clearAll,
         "=": equalsTotal,
         "Enter": equalsTotal,
         ".": handleDecimal,
    }

    //launch specified function for operand keys
    if (otherText in specialFunctions) 
        specialFunctions[buttonPressed]()
}

function saveInputNumber() {
    if (Number(inputString))
        inputNumber = Number(inputString)
    
    runningTotal = inputNumber
    inputString = runningTotal
    mainDisplay.textContent = inputString
    //resetInput()
    //updateDisplay()
    console.log("running total "+ runningTotal)
    console.log("input number "+ inputNumber)
}

function updateDisplay() {
    memoryDisplay.textContent = historyString
    mainDisplay.textContent = inputString
}

function resetInput() {
    inputNumber = 0
    inputString = "0"
}

function resetOperand() {
    currentOperand = ""
}

function resetHistory() {
    historyString = ""
}


function clearAll() {
    resetInput()
    resetOperand()
    resetHistory()
    updateDisplay()
}

function clear() {}

function handleDecimal() {}

function equalsTotal() {
    if (Number(inputString))
        inputNumber = Number(inputString)

    switch(currentOperand) {
        case "*":
            runningTotal *= inputNumber
            break
        case "+":
            runningTotal += inputNumber
            break
        case "-":
            runningTotal -= inputNumber
            break
        case "/":
            if (inputNumber === 0)
                errorMode()
            else
                runningTotal = runningTotal / inputNumber
            break
    }
    // round to 2 dps where necessary
    runningTotal = Number(runningTotal.toFixed(2))
    console.log("running total "+ runningTotal)
    mainDisplay.textContent = runningTotal
    inputNumber = runningTotal
    inputString = String(runningTotal)
    resetOperand()
}

function errorMode() {

}

// Initialize
updateDisplay()




