/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

let pumpkinNumber;
let up = false;
let clicked = false;
let ariaValue = 100;
let gameInterval;
let timeInterval;
let decHealth = 10;
let level = 1;

const shotAudio = new Audio("https://rpg.hamsterrepublic.com/wiki-images/d/d7/Oddbounce.ogg");
const backgroundAudio = new Audio("assets/background.mp3");
backgroundAudio.loop = true;

function ghostAction() {
    clicked = false;
    $(".ghost").attr("style", "background : url(assets/img/ghost.png) !important;");
    pumpkinNumber = chooseRandomPumpkin();
    $(".ghost" + pumpkinNumber).css("top", "0%");
    setTimeout(ghostIn, 1500);
    up = false;
}

function ghostIn() {
    $(".ghost" + pumpkinNumber).css("top", "50%");
}

function chooseRandomPumpkin() {
    return Math.floor(Math.random() * 6);
}

$(".ghost").on("mousedown", function () {
    let top = $(this).css("top");
    if (top == "0px" && !clicked) {
        up = true;
        clicked = true;
        $(".ghost").css("background", "url(assets/img/ghost-attacked.png)");
        ariaValue -= decHealth;
        $(".progress-bar").attr("aria-valuenow", ariaValue);
        $(".progress-bar").css("width", `${ariaValue}%`);
        if (ariaValue <= 0) {
            clearInterval(timeInterval);
            clearInterval(gameInterval);
            let result = confirm("You Won");
            if (result) {
                ariaValue = 100;
                $(".progress-bar").attr("aria-valuenow", 100);
                $(".progress-bar").css("width", `100%`);
                level += 1;
                decHealth--;
                timerAfterWon();
                setTimeout(startGame, 3000)
            }
        }
    }
});

shotAudio.addEventListener("canplaythrough", () => {
    shotAudio.play().catch(e => {
        $(".ghost").on("click", function () {
            if (up) {
                shotAudio.play();
            }
        })
    })
});

backgroundAudio.addEventListener("canplaythrough", () => {
    backgroundAudio.play().catch(e => {
        $("#btnStart").on("click", function () {
            backgroundAudio.volume = 0.5;
            backgroundAudio.play();
        })
    })
});

$("#btnStart").on("click", function () {
    startGame();
});

function timer() {
    let x = 60;
    clearInterval(timeInterval);
    timeInterval = setInterval(function () {
        if (x >= 0) {
            $("#txtTime").text(x);
            x--;
        } else {
            clearInterval(this);
            alert("You Lose");
        }
    }, 1000);
}

function startGame() {
    $("#lblLevel").text("Level " + level);
    clearInterval(gameInterval);
    gameInterval = setInterval(ghostAction, 2000);
    timer();
}

function timerAfterWon() {
    let x = 3;
    let wonInterval;
    clearInterval(wonInterval);
    wonInterval = setInterval(function () {
        if (x >= 0) {
            console.log(x);
        } else {
            clearInterval(wonInterval);
            return;
        }
        x--;
    }, 1000);
}
