// constants
const WORD_LENGTH = 5;
const ATTEMPTS = 6;
const KEYBOARD_LAYOUT = "QWERTYUIOP,ASDFGHJKL,ZXCVBNM"
const word = "MAHAL";


const handleKeyEnter = (letter) => {

    // check there are available spaces
    if(currentGuess.length >= WORD_LENGTH) return 

    // update data
    currentGuess.push(letter)

    // get specific slot element
    const row = document.getElementById(`row${currentRow}`)
    const slot = row.querySelector(`#slot${currentGuess.length -1}`)
    slot.classList.add("active-slot")

    // display letter
    slot.innerText = letter
}

const handleKeyDelete = () => {

    // check there's something to delete
    if(currentGuess.length <= 0) return 

    const row = document.getElementById(`row${currentRow}`)
    const slot = row.querySelector(`#slot${currentGuess.length -1}`)
    slot.classList.remove("active-slot")
    slot.innerText = ""
    currentGuess.pop()
}

const checkGuess = () => {
    // check all letters have been guessed
    if(currentGuess.length < 5) return

    const row = document.getElementById(`row${currentRow}`)

    // update ui
    for(let i=0;i<5;i++){
        const slot = row.querySelector(`#slot${i}`)
        const key = document.getElementById(`key${slot.innerText}`)
        console.log(slot.innerText)
        if(word[i] == currentGuess[i]){
            slot.classList.add("correct")
            key.classList.add("correct-key")
            continue
        }
        else if(word.includes(currentGuess[i])){
            slot.classList.add("present")
            key.classList.add("present-key")
            continue
        }else{
            slot.classList.add("absent")
            key.classList.add("absent-key")

        }
    }
    
    if(word == currentGuess.join("")){
        return
    }else if(currentRow == ATTEMPTS -1){
        return
    }

    currentGuess = []
    currentRow += 1
}


const renderBoard = () => {
    const gameboard = document.getElementById("gameboard")

    for(let i=0;i<ATTEMPTS; i++){
        // create row
        const row = document.createElement("div")
        row.id = `row${i}`
        row.classList.add("row")

        // create slots
        for(let i=0;i<WORD_LENGTH; i++){
            const slot = document.createElement("div")

            slot.id = `slot${i}`
            slot.classList.add("slot")

            if(currentGuess.length > i){
                slot.innerText = currentGuess[i]
                slot.classList.add("active-slot")
            }


            row.appendChild(slot) // add slot to row

        }

        // add gameboard to dom
        gameboard.appendChild(row)
    }
}

const renderKeyboard = () => {
    const keyboard = document.getElementById("keyboard")
    const keyboard_layout = KEYBOARD_LAYOUT.split(",")

    // create keyboard rows
    for(let i=0;i<keyboard_layout.length;i++){
        const row = document.createElement("div")
        row.classList.add("key-row")

        // create keys
        for(let j=0;j<keyboard_layout[i].length;j++){
            const key = document.createElement("button")
            key.classList.add("key")
            key.textContent = keyboard_layout[i][j]
            key.id = `key${keyboard_layout[i][j]}`
            key.addEventListener("click", ()=>handleKeyEnter(keyboard_layout[i][j]))
            row.appendChild(key)
        }
        if(i == 2){
            const enterKey = document.createElement("div");
            const deleteKey = document.createElement("div");
            enterKey.innerText = "ENTER";
            deleteKey.innerText = "DELETE";
            enterKey.classList.add("key")
            deleteKey.classList.add("key")
            enterKey.addEventListener("click", ()=>checkGuess())
            deleteKey.addEventListener("click", ()=>handleKeyDelete())
            row.insertBefore(enterKey,row.firstChild)
            row.appendChild(deleteKey)
        }
        

        keyboard.appendChild(row)
    }

}



var data = []
var currentGuess = []
var currentRow = 0


// render board
renderBoard()
renderKeyboard()