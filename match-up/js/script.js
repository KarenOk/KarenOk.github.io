document.addEventListener("DOMContentLoaded", function start() {

    let moveNo = 0;
    let clickedCardsNo = 0;
    let clickedCards = [];
    let timerStarted = true;
    let sec = 0, min = 0, timerId;
    let cards = document.getElementsByClassName("card");
    let timeEl = document.getElementsByClassName("time");
    const gameOver = document.getElementsByClassName("game-over");
    const refresh = document.getElementsByClassName("refresh");
    const moves = document.getElementsByClassName("moves");
    const stars = document.getElementsByClassName("star");
    const cardContainer = document.querySelector(".card-list");
    const closeButton = document.getElementById("close-modal");


    // Function to pad the time with zeros for single digits
    Number.prototype.pad = function (size) {
        let paddedNo = String(this);
        while (paddedNo.length < size) {
            paddedNo = "0" + paddedNo;
        }

        return paddedNo;
    }

    // Function that implements the timer logic
    function timer() {
        sec += 1;
        if (sec === 60) {
            min += 1;
            sec = 0;
        }

        for (let i = 0; i < timeEl.length; i++) {
            timeEl[i].innerText = min.pad(2) + ":" + sec.pad(2);
        }
    }

    function startTimer() {
        // To fix the problem of recursive calling of the timer function each time a card is clicked. 
        // See line 138
        if (timerStarted) {
            timerId = setInterval(timer, 1500);
            timerStarted = false;
        }
    }

    function stopTimer() {
        clearInterval(timerId);
        // console.log("Stopped");
    }


    function shuffleCards(cards) {
        let currentIndex = cards.length - 1;
        // console.log(currentIndex)
        let randomIndex, temporaryStore;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            temporaryStore = cards[currentIndex].innerHTML;
            cards[currentIndex].innerHTML = cards[randomIndex].innerHTML;
            cards[randomIndex].innerHTML = temporaryStore;
            currentIndex -= 1
        }
        return cards;
    }

    shuffleCards(cards),
        // After shuffle, call function to close cards after a few seconds
        setTimeout(function () {
            for (let i = 0; i < cards.length; i++) {
                cards[i].classList.remove("open", "match");
            }
        }, 1500);

    function assignStars() {
        let starNo;
        if (moveNo <= 10) {
            starNo = 5;
        } else if (moveNo > 10 && moveNo <= 15) {
            starNo = 4;
        } else if (moveNo > 15 && moveNo <= 20) {
            starNo = 3;
        } else if (moveNo > 20 && moveNo <= 30) {
            starNo = 2;
        } else if (moveNo > 30) {
            starNo = 1;
        }

        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.remove("show");
            // console.log(stars[i]);
        }

        for (let i = 0; i < starNo; i++) {
            stars[i].classList.add("show");
        }

    }

    function checkGameEnd() {
        let allMatched = true;
        for (let i = 0; i < cards.length; i++) {
            if (!cards[i].classList.contains("match")) {
                allMatched = false;
                break;
            }
        }

        return allMatched;
    }

    function countStars() {
        let starNo = 0;
        for (let i = 0; i < stars.length; i++) {
            if (stars[i].classList.contains("show")) {
                starNo += 1;
          }
        }

        starNo = 1;
        document.getElementById("stars").innerHTML = (starNo > 1) ? `${starNo} stars` : `${starNo} star` ;
    }

    function closeModal() {
        gameOver[0].style.display = "none";
    }

    for (let i = 0; i < refresh.length; i++) {
        refresh[i].addEventListener("click", function (event) {
            // console.log(event)
            // stopTimer();
            // min = sec = moveNo = 0;
            // for (let i = 0; i < timeEl.length; i++) {
            //     timeEl[i].innerText = min.pad(2) + ":" + sec.pad(2);
            // }
            // moves[0].firstElementChild.innerHTML = moveNo;
            // closeModal();
            // start();
            window.location.reload();
        })
    }

    closeButton.addEventListener("click", closeModal);

    cardContainer.addEventListener("click", function (event) {
        // console.log(event);
        startTimer();
        if (event.target.classList.contains("open") ||
            event.target.classList.contains("mismatch") ||
            event.target.classList.contains("match") ||
            event.target.tagName !== "LI") {
            // Do nothing
            // console.log("do nothing");
        } else {
            clickedCardsNo += 1;
            // console.log(clickedCardsNo);
            moveNo += 1;
            assignStars();

            if (clickedCardsNo > 0 && clickedCardsNo < 3) {
                event.target.classList.add("open");
                moves[0].firstElementChild.innerHTML = moveNo;

                // console.log(event.target);
                // console.log(event.target.className);
                clickedCards.push(event.target);
                // console.log(clickedCards);
            }

            if (clickedCardsNo === 2) {
                if (clickedCards[0].firstElementChild.classList.value === clickedCards[1].firstElementChild.classList.value) {
                    // Check if the two cards are the same
                    setTimeout(function () {
                        clickedCards.forEach(function (card) {
                            card.classList.replace("open", "match");
                        })
                        let showModal = checkGameEnd();
                        clickedCardsNo = 0;
                        clickedCards = [];

                        if (showModal) {
                            stopTimer();
                            countStars();
                            gameOver[0].style.display = "block";
                            moves[1].innerHTML = `${moveNo} moves`;
                        }
                    }, 800)

                } else {
                    // Show a mismatch and revert back if not
                    clickedCards.forEach(function (card) {
                        card.classList.replace("open", "mismatch");
                    })
                    setTimeout(function () {
                        clickedCards.forEach(function (card) {
                            card.classList.remove("mismatch");
                        })
                        clickedCardsNo = 0;
                        clickedCards = [];

                    }, 1000)
                }
            }
        }

    })


});