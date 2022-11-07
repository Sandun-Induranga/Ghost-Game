let pumpkinNumber;
let up = false;
const shotAudio = new Audio("https://rpg.hamsterrepublic.com/wiki-images/d/d7/Oddbounce.ogg");
let clicked = false;

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

setInterval(ghostAction, 2000);

$(".ghost").on("mousedown", function () {
    let top = $(this).css("top");
    if (top == "0px" && !clicked) {
        up = true;
        clicked = true;
        $(".ghost").css("background"," url(assets/img/ghost-attacked.png)");
    }
});

shotAudio.addEventListener("canplaythrough", () => {
    shotAudio.play().catch(e => {
        $(".ghost").click(function () {
            if (up) {
                shotAudio.play();
            }
        })
    })
});
