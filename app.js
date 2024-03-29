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

function handleNumberInput(numberText) {
    if (Number(inputString) === 0)
        inputString = numberText
    else
        inputString = inputString + numberText;
    updateDisplay()
}

function handleOtherInput(otherText) {
    //if most recent input was an operand, save that as current operand
    if (operands.includes(otherText))
        currentOperand = otherText
        
    const operandFunctions = {
        "=" : equalsTotal,
        "Enter": equalsTotal,
        "CLEAR": clear,
        "CLEAR ALL": clearAll,
         "*": multiplyNumber,
         "/": divideNumber,
         "+": addNumber,
         "-": subtractNumber,
         ".": handleDecimal,
    }
    const specialFunctions = {
        "CLEAR": clear,
        "CLEAR ALL": clearAll,
         "=": equalsTotal,
         "Enter": equalsTotal,
         ".": handleDecimal,
    }

    //launch specified function for operand keys
    if (otherText in specialFunctions) 
        specialFunctions[otherText]()
}

function updateDisplay() {
    memoryDisplay.textContent = historyString
    mainDisplay.textContent = inputString
}

function resetInput() {
    inputNumber = 0
    inputString = "0"
    currentOperand = "" 
}

function saveInputNumber(inputString) {
    if (Number(inputString))
        inputNumber = Number(inputString)
    
    
    
    updateDisplay()
}

function clearAll() {
    historyString = ""
    resetInput()
    
    updateDisplay()
}

function clear() {}


function multiplyNumber(otherText) {}
            
function divideNumber(otherText) {}
            
function addNumber(otherText) {}

function subtractNumber(otherText) {}

function handleDecimal() {}

function equalsTotal() {
    if (currentOperand)

    updateDisplay()
    resetInput()
}


// Initialize
updateDisplay()

saveInputNumber(1)
saveInputNumber("1.5")



