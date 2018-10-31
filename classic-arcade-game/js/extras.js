let highScore = localStorage.getItem("highscore") || 0;
let score = 0;
let time = "01:10"
let [min,sec] = time.split(":")
let scoreElem = document.querySelector(".score");
let highScoreElem = document.querySelector(".high-score");
let timeElem = document.querySelector(".timer");
timeElem.classList.remove("warning")

// function to manage scores
function setScore(){
    highScore = localStorage.getItem("highscore")
    highScoreElem.innerHTML = highScore
    scoreElem.innerHTML = score
};

Number.prototype.padNumber = function (size){
    paddedNo = String(this.valueOf())
    let length = paddedNo.length;
    while(length < size){
        paddedNo = "0" + paddedNo;
        length += 1
    }
    return(paddedNo)
}

function timer(){
    if (parseInt(min) === 0 && parseInt(sec) === 0){
        // end games
    } else if(parseInt(sec) === 0){
        min = (parseInt(min) - 1).padNumber(2);
        sec = "59"
    } else{
        sec = (parseInt(sec) - 1).padNumber(2)
    }

    time = min + ":" + sec
    timeElem.innerHTML = time
    if (parseInt(min) === 0 && parseInt(sec) === 10){
        timeElem.classList.add("warning")
    } 
}

setInterval(timer, 1000)