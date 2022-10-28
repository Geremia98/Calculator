const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-all-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
	}
	
	clear (){
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}
	
	delete(){
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}
	
	appendNumber(number){
		this.currentOperand = (this.currentOperand === undefined) ? ('' + number.toString()) :
			(number === '.' && this.currentOperand.includes('.')) ? (this.currentOperand.toString()) :
				(this.currentOperand.toString() + number.toString())
	}
	
	choseOperation(operation){
		if (this.currentOperand === '') return
		if (this.previousOperand !== '') {
			this.compute()
		}
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
		this.updateDisplay()
	}
	
	compute(){
		let computation
		const previous = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		if (isNaN(current) || isNaN(previous)) return
		switch (this.operation) {
			case '+':
				computation = previous + current
				break
			case '-':
				computation = previous - current
				break
			case '*':
				computation = previous * current
				break
			case '÷':
				computation = previous / current
				break
			default:
				return
		}
		this.currentOperand = computation
		this.previousOperand = ''
		this.operation = undefined
	}
	
	updateDisplay(){
		this.currentOperandTextElement.innerText = this.currentOperand
		if (this.operation !== undefined) {
			this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
		} else {
			this.previousOperandTextElement.innerText = ''
		}
	}
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', ()=> {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
		
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', ()=> {
		calculator.choseOperation(button.innerText)
		calculator.updateDisplay()
		
	})
})

equalsButton.addEventListener('click', ()=> {
	calculator.compute()
	calculator.updateDisplay()
})

clearButton.addEventListener('click', ()=> {
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', ()=> {
	calculator.delete()
	calculator.updateDisplay()
})