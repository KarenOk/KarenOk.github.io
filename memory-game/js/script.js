document.addEventListener("DOMContentLoaded", function start() {

    let moveNo = 0;
    let clickedCardsNo = 0;
    let clickedCards = [];
    let cards = document.getElementsByClassName("card");
    let gameOver = document.getElementsByClassName("game-over");
    let refresh = document.getElementsByClassName("refresh");
    let moves = document.getElementsByClassName("moves")
    const cardContainer = document.querySelector(".card-list");
    let closeButton =   document.getElementById("close-modal");

    // moves[0].firstElementChild.innerHTML = moveNo;
    // console.log(moves);
    // console.log(moves[1].firstElementChild.innerHTML)


    function shuffleCards(cards) {
        let currentIndex = cards.length - 1;
        console.log(currentIndex)
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

    function closeModal () {
        gameOver[0].style.display = "none";
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

    shuffleCards(cards),
        // After shuffle, call function to close cards after a few seconds
        setTimeout(function () {
            for (let i = 0; i < cards.length; i++) {
                cards[i].classList.remove("open", "match");
            }
        }, 1500);

    for (let i = 0; i < refresh.length; i++) {
        refresh[i].addEventListener("click", function () {
            closeModal();
            start();
        })
    }

    closeButton.addEventListener("click" , closeModal);

    cardContainer.addEventListener("click", function (event) {
        console.log(event);

        if (event.target.classList.contains("open") ||
            event.target.classList.contains("mismatch") ||
            event.target.classList.contains("match") ||
            event.target.tagName !== "LI") {
            // Do nothing
            console.log("do nothing");
        } else {
            clickedCardsNo += 1;
            console.log(clickedCardsNo);
            moveNo += 1;
            console.log(clickedCardsNo);

            if (clickedCardsNo > 0 && clickedCardsNo < 3) {
                event.target.classList.add("open");
                moves[0].firstElementChild.innerHTML = moveNo;

                console.log(event.target);
                console.log(event.target.className);
                clickedCards.push(event.target);
                console.log(clickedCards);
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
                            gameOver[0].style.display = "block";
                            moves[1].innerHTML = `${moveNo} moves.`;
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