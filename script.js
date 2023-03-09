class Calculator {
  constructor(display) {
    this.display = display
    this.clear()
  }

  clear() {
    this.currentDisplay = ''
    this.previousDisplay = ''
    this.operation = undefined
  }

  delete() {
    this.currentDisplay = this.currentDisplay.slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentDisplay.includes('.')) return
    this.currentDisplay = this.currentDisplay.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentDisplay === '') return
    if (this.previousDisplay !== '') {
      this.compute()
    }
    switch (operation) {
      case '+':
        this.operation = 'add'
        break
      case '-':
        this.operation = 'subtract'
        break
      case '*':
        this.operation = 'multiply'
        break
      case '÷':
        this.operation = 'divide'
        break
      default:
        throw new Error('Invalid operator: ' + operation)
    }
    this.previousDisplay = this.currentDisplay
    this.currentDisplay = ''
  }

  compute() {
    if (this.previousDisplay === '') return
    const previous = parseFloat(this.previousDisplay)
    const current = parseFloat(this.currentDisplay)
    if (isNaN(previous) || isNaN(current)) return
    function operate(operator, a, b) {
      let result
      switch (operator) {
        case 'add':
          result = a + b
          break
        case 'subtract':
          result = a - b
          break
        case 'multiply':
          result = a * b
          break
        case 'divide':
          result = a / b
          break
        default:
          throw new Error('Invalid operator: ' + operator)
      }
      return result
    }
    this.currentDisplay = operate(this.operation, previous, current)
    this.operation = undefined
  }

  updateDisplay() {
    this.display.value = this.currentDisplay
  }
}

const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('.equalButton')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const display = document.querySelector('.newElement')

const calculator = new Calculator(display)

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

opButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
  })
})

equalButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})
