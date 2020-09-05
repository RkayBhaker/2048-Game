document.addEventListener('DOMContentLoaded', () => {
	const displayGrid = document.querySelector('.grid')
	const resultDisplay = document.querySelector('.result')
	const scoreDisplay = document.querySelector('.Score')
	const width = 4
	let score = 0
	const squares = []

	//create cardBoard
	function createCardBoard() {
		for (var i = 0; i < width*width; i++) {
			square = document.createElement('div')
			square.innerHTML = 0
			displayGrid.appendChild(square)
			squares.push(square)
		}
		generate()
		generate()
	}
	createCardBoard()

	//generate random number
	function generate(){
		randomNumber = Math.floor(Math.random() * squares.length)
		if (squares[randomNumber].innerHTML==0) {
			squares[randomNumber].innerHTML = 2
			gameOver()
		}
		else generate()
	}

	//create moveRight function for move up side
	function moveRight(){
		for (var i = 0; i < 16; i++) {
			if (i%4===0) {
				const totalOne = squares[i].innerHTML
				const totalTwo = squares[i+1].innerHTML
				const totalThree = squares[i+2].innerHTML
				const totalFour = squares[i+3].innerHTML
				const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
				//console.log(row)

				const filterRow = row.filter(num => num)
				//console.log('filter '+filterRow)
				const missing = 4 - filterRow.length
				//console.log('missing '+missing)
				const zero =  Array(missing).fill(0)
				//console.log(zero)
				const newRow = zero.concat(filterRow)

				squares[i].innerHTML = newRow[0]
				squares[i +1].innerHTML = newRow[1]
				squares[i +2].innerHTML = newRow[2]
				squares[i +3].innerHTML = newRow[3]
			}
		}
	}
	//create moveLeft function for move up side
	function moveLeft(){
		for (var i = 0; i < 16; i++) {
			if (i%4===0) {
				const totalOne = squares[i].innerHTML
				const totalTwo = squares[i+1].innerHTML
				const totalThree = squares[i+2].innerHTML
				const totalFour = squares[i+3].innerHTML
				const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
				//console.log(row)

				const filterRow = row.filter(num => num)
				//console.log('filter '+filterRow)
				const missing = 4 - filterRow.length
				//console.log('missing '+missing)
				const zero =  Array(missing).fill(0)
				//console.log(zero)
				const newRow = filterRow.concat(zero)

				squares[i].innerHTML = newRow[0]
				squares[i +1].innerHTML = newRow[1]
				squares[i +2].innerHTML = newRow[2]
				squares[i +3].innerHTML = newRow[3]
			}
		}
	}
	//create moveUp() funcion for move up
	function moveUp(){
		for (var i = 0; i < 4; i++) {
			const totalOne = squares[i].innerHTML
			const totalTwo = squares[i+width].innerHTML
			const totalThree = squares[i+(width*2)].innerHTML
			const totalFour = squares[i+(width*3)].innerHTML
			const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
			//console.log(column)

			const filterCol = column.filter(num => num)
			//console.log(filterCol)
			const missing = 4 - filterCol.length
			//console.log(missing)
			const zero = Array(missing).fill(0)
			//console.log(zero)
			const newCol = filterCol.concat(zero)

			squares[i].innerHTML = newCol[0]
			squares[i+(width)].innerHTML = newCol[1]
			squares[i+(width*2)].innerHTML = newCol[2]
			squares[i+(width*3)].innerHTML = newCol[3]
		}
	}
	//create moveDown() function for move down
	function moveDown(){
		for (var i = 0; i < 4; i++) {
			const totalOne = squares[i].innerHTML
			const totalTwo = squares[i+width].innerHTML
			const totalThree = squares[i+(width*2)].innerHTML
			const totalFour = squares[i+(width*3)].innerHTML
			const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
			//console.log(column)

			const filterCol = column.filter(num => num)
			//console.log(filterCol)
			const missing = 4 - filterCol.length
			//console.log(missing)
			const zero = Array(missing).fill(0)
			//console.log(zero)
			const newCol = zero.concat(filterCol)

			squares[i].innerHTML = newCol[0]
			squares[i+(width)].innerHTML = newCol[1]
			squares[i+(width*2)].innerHTML = newCol[2]
			squares[i+(width*3)].innerHTML = newCol[3]
		}
	}
	//function for combine Row
	function combineRow() {
		for (var i = 0; i < 15; i++) {
			if(squares[i].innerHTML == squares[i+1].innerHTML){
				let totalCombine = parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML)
				squares[i].innerHTML = totalCombine
				squares[i+1].innerHTML = 0
				score += totalCombine
				scoreDisplay.innerHTML=score
			}
		}
		forWin()
	}
	function combineCol() {
		for (var i = 0; i < 12 ; i++) {
			if(squares[i].innerHTML == squares[i+width].innerHTML){
				let totalCombine =  parseInt(squares[i].innerHTML)+parseInt(squares[i+width].innerHTML)
				squares[i].innerHTML = totalCombine
				squares[i+width].innerHTML = 0
				score += totalCombine
				scoreDisplay.innerHTML=score
			}
		}
		forWin()
	}
		//key control
	function control(e){
		if (e.keyCode === 39) {
			keyRight()
		}else if(e.keyCode === 37){
			keyLeft()
		}else if(e.keyCode === 38){
			keyUp()
		}else if(e.keyCode === 40){
			keyDown()
		}
	}
	document.addEventListener('keyup', control)

	//moveRight function
	function keyRight(){
		moveRight()
		combineRow()
		moveRight()
		generate()
	}
	//moveLeft function
	function keyLeft(){
		moveLeft()
		combineRow()
		moveLeft()
		generate()
	}
	// moveUp function
	function keyUp(){
		moveUp()
		combineCol()
		moveUp()
		generate()
	}
	//moveDown function
	function keyDown(){
		moveDown()
		combineCol()
		moveDown()
		generate()
	}
	//function for win
	function forWin(){
		for (var i = 0; i < squares.length; i++) {
			if(squares[i].innerHTML == 2048){
				resultDisplay.innerHTML = 'You Win'
				document.removeEventListener('keyup', control)
			}
		}
	}
	//function for gameOver
	function gameOver(){
		let zeros = 0
		for (var i = 0; i < squares.length; i++) {
			if(squares[i].innerHTML==0){
				zeros++
			}
		}
			if(zeros === 0){
				resultDisplay.innerHTML = 'You Lost'
				document.removeEventListener('keyup', control)
		}
	}
	//add color
	function addColor() {
		for (var i = 0; i < squares.length; i++) {
			if(squares[i].innerHTML==0) squares[i].style.backgroundColor =  '#757B87'
			else if(squares[i].innerHTML==2) squares[i].style.backgroundColor =  '#FDEE87'
			else if(squares[i].innerHTML==4) squares[i].style.backgroundColor =  '#FDAE1D'
			else if(squares[i].innerHTML==8) squares[i].style.backgroundColor = '#ECFCFC' 
			else if(squares[i].innerHTML==16) squares[i].style.backgroundColor = '#FEC5E5' 
			else if(squares[i].innerHTML==32) squares[i].style.backgroundColor =  '#F1EEE9'
			else if(squares[i].innerHTML==64) squares[i].style.backgroundColor = '#ffab6e' 
			else if(squares[i].innerHTML==128) squares[i].style.backgroundColor = '#fd9982' 
			else if(squares[i].innerHTML==256) squares[i].style.backgroundColor =  '#ead79c'
			else if(squares[i].innerHTML==512) squares[i].style.backgroundColor = '#76daff' 
			else if(squares[i].innerHTML==1024) squares[i].style.backgroundColor = '#beeaa5' 
			else if(squares[i].innerHTML==2048) squares[i].style.backgroundColor = '#d7d4f0'  
		}
	}
	addColor()
	var myTimer = setInterval(addColor, 50)
})