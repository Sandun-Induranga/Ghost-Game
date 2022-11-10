let pumpkinNumber;
let up = false;
let clicked = false;
let ariaValue = 100;
let gameInterval;
let timeInterval;

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
        ariaValue -= 10;
        $(".progress-bar").attr("aria-valuenow", ariaValue);
        $(".progress-bar").css("width", `${ariaValue}%`);
        if (ariaValue == 0) {
            $("main").css("display", `none`);
            alert("You Won");
            clearInterval(timeInterval);
        }
    }
});

shotAudio.addEventListener("canplaythrough", () => {
    shotAudio.play().catch(e => {
        $(".ghost").on("click",function () {
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
    clearInterval(gameInterval);
    gameInterval = setInterval(ghostAction, 2000);
    timer();
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
