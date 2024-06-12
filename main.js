

let winAudio = document.getElementById("win")
let playerName = document.querySelector(".name span");
let timeInterval;
document.querySelector(".control-buttons span").onclick = () => {
    let userName = prompt("Whats Your Name");
    
    if (userName == null || userName == ""){
        
        playerName.innerHTML = "UnKnown";
    }else{
        playerName.innerHTML = userName;
    }
    document.querySelector(".control-buttons span").parentElement.remove();
    if (localStorage.getItem("leader-board")){

        createLeaderBoard()
    }
    // winAudio.play();

    let timerMinutes = document.querySelector(".timer .min")
    let timerSeconds = document.querySelector(".timer .sec")

    let timer = 150;
    timerMinutes.innerHTML = parseInt(timer / 60) < 10 ? `0`+ parseInt(timer / 60) : parseInt(timer / 60);
    timerSeconds.innerHTML = parseInt(timer % 60) < 10 ? "0"+parseInt(timer % 60) : parseInt(timer % 60);
    timeInterval = setInterval(()=>{

        --timer;
        
        let minutes = parseInt(timer / 60);
        let second = parseInt(timer % 60);

        minutes = minutes < 10 ? `0${minutes}`: minutes;
        second = second < 10 ? `0${second}`: second;

        timerMinutes.innerHTML = minutes;
        timerSeconds.innerHTML = second;

        if (timer == 0){
            clearInterval(timeInterval);
            setTimeout(() => {

                alert("You Lost To Try Again Press Ok");
                window.location.reload()
            })
        }
    },duration)
}


let tries = document.querySelector(".tries span")

let duration = 1000;
let wrongTries = 0;
tries.innerHTML = wrongTries;


let failAudio = document.getElementById("fail");
let successAudio = document.getElementById("success");

let blocksContainer = document.querySelector(".blocks-container");
createBlocks()

let blocks = Array.from(document.querySelectorAll(".block"))

let orderRange = [...Array(blocks.length).keys()]

shuffle(orderRange)

blocks.forEach((block, index) =>{
    block.style.order = orderRange[index]
    block.addEventListener("click", () => {
        flipBlock(block);
    })
})

let resetBtn = document.querySelector(".reset")
resetBtn.addEventListener("click", () => {
    location.reload()

})

function shuffle(arr){
    for (let i = arr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
        return arr;
}

function flipBlock(block){
    block.classList.add("flipped")

    let flippedBlocks = blocks.filter((block) => block.classList.contains("flipped"))

    if (flippedBlocks.length == 2){
        handleClicking();
        matchBlocks(flippedBlocks[0], flippedBlocks[1]);
    }
    tries.innerHTML = wrongTries;

    checkWin()

}

function handleClicking(){
    blocksContainer.classList.add("no-clicking")
    setTimeout(()=>{
        blocksContainer.classList.remove("no-clicking")
    },duration)
}

function matchBlocks(firstBlock, secondBlock){
        if (firstBlock.dataset.technology == secondBlock.dataset.technology){
        firstBlock.classList.remove("flipped");
        secondBlock.classList.remove("flipped");

        firstBlock.classList.add("matched");
        secondBlock.classList.add("matched");
        successAudio.play();


    }else{
        wrongTries++;
        failAudio.play()
        setTimeout(() =>{
            firstBlock.classList.remove("flipped")
            secondBlock.classList.remove("flipped")
        },duration)
    }
}

function checkWin(){
    let allMatchedBlocks = Array.from(document.querySelectorAll('.matched'));

    if (blocks.length == allMatchedBlocks.length){

        winAudio.play();
        blocksContainer.classList.add("no-clicking")
        let userObj = JSON.parse(localStorage.getItem("leader-board")) || { [playerName.innerHTML]: wrongTries,}

        userObj[playerName.innerHTML] = wrongTries;

        localStorage.setItem("leader-board", JSON.stringify(userObj));

        
        
        clearInterval(timeInterval);

        if (document.querySelector(".leader-board")){
            document.querySelector(".leader-board").remove();
        }

            createLeaderBoard();
        
    }
}

function createLeaderBoard(){

    let leaderBoard = JSON.parse(localStorage.getItem("leader-board"));
    let leaderEntries = Object.entries(leaderBoard);
    let leaderBoardDiv = document.createElement("div");
    let h2 = document.createElement("h2");
    let leaderBarDiv = document.createElement("div");
    let resetfooterdBtn = document.createElement("span");
    let boardInfoContainer = document.createElement("div");
    let triesInfo = document.createElement("span");
    let playerInfo = document.createElement("span");
    let footerBoard = document.createElement("div")


    footerBoard.className = "footer-board"
    triesInfo.className = "player-tries";
    playerInfo.className = "player-name";
    resetfooterdBtn.className = "reset-board";
    leaderBarDiv.className = "leader-bar";
    leaderBoardDiv.className = "leader-board";
    boardInfoContainer.className = "leaders-info"


    leaderEntries.sort((a,b) => a[1] - b[1]);
    h2.textContent = "Leader Board";
    resetfooterdBtn.textContent = "Reset Leader Board";
    playerInfo.textContent = "Player Name"
    triesInfo.textContent = "Number Of Tries"
    
    resetfooterdBtn.addEventListener("click", () => {
        leaderBoardDiv.remove()
        localStorage.clear()
    })

    footerBoard.append(resetfooterdBtn)
    boardInfoContainer.append(playerInfo,triesInfo)
    leaderBarDiv.appendChild(h2)  
    leaderBoardDiv.appendChild(leaderBarDiv)
    leaderBoardDiv.appendChild(boardInfoContainer)
    
    
    for (let i = 0; i < leaderEntries.length; i++){
        let playerContainer = document.createElement("div")
        let player = document.createElement("span");
        let tries = document.createElement("span");
        let place = document.createElement("span")
        let playerName = document.createElement("span")
        
        playerName.className = "player-name"
        place.className = "place";
        playerContainer.className = "entry"
        player.className = "player"
        tries.className = "player-tries"
        
        tries.innerHTML = leaderEntries[i][1]
        playerName.innerHTML = leaderEntries[i][0];
        place.textContent = `${i + 1}: `;
        
        player.append(place,playerName)
        playerContainer.append(player,tries)
        leaderBoardDiv.appendChild(playerContainer)
        
    }
    leaderBoardDiv.appendChild(footerBoard)
    document.body.appendChild(leaderBoardDiv)
}


function createBlocks(){
    let blocks = {
        angular1: "images/angular.jpeg",
        angular2: "images/angular.jpeg",
        css1: "images/css.jpeg",
        css2: "images/css.jpeg",
        html1: "images/html.jpeg",
        html2: "images/html.jpeg",
        python1: "images/python.jpeg",
        python2: "images/python.jpeg",
        react1: "images/react.jpeg",
        react2: "images/react.jpeg",
        github1: "images/github.jpeg",
        github2: "images/github.jpeg",
        mongodb1: "images/mongodb.jpeg",
        mongodb2: "images/mongodb.jpeg",
        vue1: "images/vue.jpeg",
        vue2: "images/vue.jpeg",
        jest1: "images/jest.jpeg",
        jest2: "images/jest.jpeg",
        gulpjs1: "images/gulpjs.jpeg",
        gulpjs2: "images/gulpjs.jpeg",
    }

    let blocksEntries = Object.entries(blocks);  
    for (let i = 0; i < blocksEntries.length; i++){
        let div = document.createElement("div");
        div.className = "block";
        div.dataset.technology = blocksEntries[i][0].slice(0,-1);


        let front = document.createElement("div");
        let back = document.createElement("div");

        front.className = "front";
        front.classList.add("face");
        back.className = "back";
        back.classList.add("face");

        let img = document.createElement("img");
        img.setAttribute("src", blocksEntries[i][1]);
        img.alt = "";

        back.appendChild(img)

        div.append(front,back)
        blocksContainer.append(div)
    }
}

// console.log("ahemd")