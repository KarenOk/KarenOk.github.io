let highScore = localStorage.getItem("highscore") || 0;
let score = 0;
let time = "01:10"
let [min,sec] = time.split(":")
let scoreElem = document.querySelector(".score");
let highScoreElem = document.querySelector(".high-score");
let timeElem = document.querySelector(".timer");
let modal = document.querySelector(".modal");
let replayElem = document.querySelector(".replay");
let highScoreImg = document.querySelector(".high-score-img")
let scoreDisplayElem = document.querySelector(".score-display")

timeElem.classList.remove("warning")
highScoreImg.classList.add("hidden")

// Function to manage scores
function setScore(){
    highScore = localStorage.getItem("highscore") || 0
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

// Function to manage countdown of the gmae
function countdown(){
    if (parseInt(min) === 0 && parseInt(sec) === 0){
        // End game
        cancelAnimationFrame(animationReq);
        scoreDisplayElem.innerHTML = "Score: " + score
        modal.classList.remove("hidden") // show modal

        // Check if score is a high score and show high scoreimage
        if (score.toString() === localStorage.getItem("highscore")){
            highScoreImg.classList.remove("hidden")
        }

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

// Handle replay
replayElem.addEventListener("click", function(){
    window.location.reload()
    modal.classList.add("hidden")
})

