let runningTotal = 0
let inputNumber = 0
let inputString = "0"
let currentOperand = ""
let entryHistory = "0 + 0 = 0"

const mainDisplay = document.querySelector("#display-result")
const memoryDisplay = document.querySelector('#display-memory')
const calculator = document.querySelector("#calculator")

memoryDisplay.textContent = entryHistory
mainDisplay.textContent = inputString

document.addEventListener("keypress", handleKeyPress)

const buttons = document.querySelectorAll(".button")
for (let button of buttons) {
    console.log(button)
    button.addEventListener("click", handleButtonPress)
}

function handleButtonPress (event) {
    let buttonPressed = event.target.textContent
    console.log(buttonPressed)
    if (isNaN(buttonPressed)) // is not a number
        console.log("not a number")
    else
        console.log("is a number")
}

function handleKeyPress(event) {
    console.log(event.key)
    inputString += event.key
    mainDisplay.textContent = inputString
}