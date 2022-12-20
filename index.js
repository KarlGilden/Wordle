// constants
const WORD_LENGTH = 5;
const ATTEMPTS = 6;
const KEYBOARD_LAYOUT = "qwertyuiop,asdfghjkl,zxcvbnm"
const word = "weary";


const handleKeyEnter = (letter) => {
    console.log(letter)
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
            const key = document.createElement("div")
            key.classList.add("key")
            key.textContent = keyboard_layout[i][j]
            key.addEventListener("click", ()=>handleKeyEnter(keyboard_layout[i][j]))
            row.appendChild(key)
        }
        if(i == 2){
            const enterKey = document.createElement("div");
            const deleteKey = document.createElement("div");
            enterKey.innerText = "E";
            deleteKey.innerText = "X";
            enterKey.classList.add("key")
            deleteKey.classList.add("key")
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