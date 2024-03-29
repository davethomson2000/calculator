let runningTotal = 0
let inputNumber = 0
let inputString = "0"
let currentOperand = ""
let historyString = ""

const mainDisplay = document.querySelector("#display-result")
const memoryDisplay = document.querySelector('#display-memory')
const calculator = document.querySelector("#calculator")

document.addEventListener("keypress", handleKeyPress)

const buttons = document.querySelectorAll(".button")
for (let button of buttons) {
    console.log(button)
    button.addEventListener("click", handleButtonPress)
}

// Initialize
updateDisplay()

function handleButtonPress(event) {
    let buttonPressed = event.target.textContent
    console.log(buttonPressed)
    if (isNaN(buttonPressed)) // is not a number
        handleOtherInput(buttonPressed)
    else
        handleNumberInput(buttonPressed)
}

function handleKeyPress(event) {
    let buttonPressed = event.key
    if (isNaN(buttonPressed)) // is not a number
        handleOtherInput(buttonPressed)
    else
        handleNumberInput(buttonPressed)
}

function handleNumberInput(numberText) {
    if (inputString === "0")
        inputString = numberText
    else
        inputString = inputString + numberText;
    updateDisplay()
}

function handleOtherInput(otherText) {
    switch (otherText) {
        case "=":
            equalsTotal(otherText)
            break
        case "*":
            multiplyNumber(otherText)
            break
        case "/":
            divideNumber(otherText)
            break
        case "+":
            addNumber(otherText)
            break
        case "-":
            subtractNumber(otherText)
            break
        case "CLEAR":
            clear(otherText)
            break
        case "CLEAR ALL":
            clearAll(otherText)
            break
        case ".":
            handleDecimal(otherText)
            break
    }
}

function updateDisplay() {
    memoryDisplay.textContent = historyString
    mainDisplay.textContent = inputString
}

function clearAll() {
    inputString = "0"
    historyString = ""
    updateDisplay()
}

function clear() {

}


