let highScore = Number(localStorage.getItem("highScore")) || 0;

let gameSeq = [];
let userSeq = [];
let colors = ["yellow","green","purple","red"];
let level = 0;

let h2 = document.querySelector("h2");

// Auto start game when game.html loads
window.onload = function(){
    levelUp();
};

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>btn.classList.remove("flash"),250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>btn.classList.remove("userflash"),250);
}

function wrongFlash(btn){
    btn.classList.add("wrongflash");
    setTimeout(()=>btn.classList.remove("wrongflash"),300);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level} | High Score: ${highScore}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = colors[randIdx];
    gameSeq.push(randColor);

    let btn = document.querySelector("." + randColor);
    gameFlash(btn);
}

function checkAns(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length === userSeq.length){
            setTimeout(levelUp,1000);
        }
    } else {
        let wrongBtn = document.querySelector("." + userSeq[idx]);
        wrongFlash(wrongBtn);

        localStorage.setItem("lastScore", level);
        localStorage.setItem("showGameOver", "true");

        if(level > highScore){
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }

        setTimeout(()=>{
            window.location.href = "gameover.html";
        },800);
    }
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", function(){
        let userColor = btn.getAttribute("id");
        userFlash(btn);
        userSeq.push(userColor);
        checkAns(userSeq.length-1);
    });
}
