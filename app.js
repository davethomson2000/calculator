let runningTotal = 0
let prevFinalTotal = 0
let inputString = ""
let currentOperand = ""
let historyString = ""
const operands = ["*", "/", "+", "-"]
const errors = document.querySelectorAll(".error")

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
    if (isNaN(buttonPressed)) {
        // is not a number
        if (operands.includes(buttonPressed))
            handleOperandInput(buttonPressed)
        else
            handleSpecialInput(buttonPressed)
    }
    else
        handleNumberInput(buttonPressed)
}

function handleNumberInput(buttonPressed) {
    inputString = inputString + buttonPressed;
    updateDisplay(inputString)
}

function handleOperandInput(buttonPressed) {
    //if most recent input was an operand, and no new input, re-use recent total
    if (inputString === "") {
        if (!currentOperand)
            inputString = prevFinalTotal
        else inputString = "0"
    }
    addToHistory(inputString)
    calculateRunningTotal()
    saveOperand(buttonPressed)
    updateDisplay(runningTotal)
}

function handleSpecialInput(buttonPressed) {
    //launch specified function for special keys
    const specialFunctions = {
        "CLEAR": clear,
        "CLEAR ALL": clearAll,
        "=": equalsTotal,
        "Enter": equalsTotal,
        ".": handleDecimal,
    }
    if (buttonPressed in specialFunctions)
        specialFunctions[buttonPressed]()
}

function addToHistory(stringToAdd) {
    historyString = historyString + ' ' + stringToAdd
    updateDisplay()
}

function saveOperand(buttonPressed) {
    currentOperand = buttonPressed
    addToHistory(buttonPressed)
    updateDisplay()
}

function getValidNumber(inputString) {
    let validNumber = 0
    if (!isNaN(inputString))
        validNumber = Number(Number(inputString).toFixed(3))
    return validNumber
}

function saveInputNumberToRunningTotal() {
    runningTotal = getValidNumber(inputString)
    updateDisplay(runningTotal)
    inputString = ""
}

function resetInput() {
    inputString = ""
}

function resetOperand() { currentOperand = "" }

function resetHistory() { historyString = "" }

function clearAll() {
    runningTotal = 0
    for (let error of errors)
        error.hidden = true
    resetInput()
    resetOperand()
    resetHistory()
    updateDisplay("0")

}

function clear() {
    inputString = inputString.slice(0, inputString.length - 1)
    updateDisplay(inputString)
}

function handleDecimal() {
    if (!inputString.includes("."))
        inputString += "."
    updateDisplay(inputString)
}

function calculateRunningTotal() {
    let inputNumber = getValidNumber(inputString)

    switch (currentOperand) {
        case "*":
            runningTotal *= inputNumber
            break
        case "":
        case "+":
            runningTotal += inputNumber
            break
        case "-":
            runningTotal -= inputNumber
            break
        case "/":
            if (inputNumber === 0) {
                errorMode()
                return false
            }
            else
                runningTotal = runningTotal / inputNumber
            break
    }
    // round to 2 dps where necessary
    runningTotal = getValidNumber(runningTotal)
    inputString = ""
    updateDisplay(runningTotal)
}

function equalsTotal() {
    addToHistory(inputString)
    calculateRunningTotal()
    resetHistory()
    resetInput()
    resetOperand()

    prevFinalTotal = runningTotal
    runningTotal = 0
}

function updateDisplay(mainDisplayText) {
    memoryDisplay.textContent = historyString
    if (mainDisplayText != undefined)
        mainDisplay.textContent = mainDisplayText
}

function errorMode() {
    runningTotal = 0
    console.log("error mode")
    mainDisplay.textContent = "(✖﹏✖)"
    for (let error of errors)
        error.hidden = false
    setTimeout(clearAll, 4000)
}



// Initialize
updateDisplay(0)




