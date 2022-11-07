let pumpkinNumber;
let up = false;
const shotAudio = new Audio("https://rpg.hamsterrepublic.com/wiki-images/d/d7/Oddbounce.ogg");

function ghostAction() {
    pumpkinNumber = chooseRandomPumpkin();
    $(".ghost" + pumpkinNumber).css("top","0%");
    setTimeout(ghostIn, 1500);
    up = false;
}

function ghostIn() {
    $(".ghost" + pumpkinNumber).css("top","50%");
}

function chooseRandomPumpkin() {
    return Math.floor(Math.random() * 6);
}

setInterval(ghostAction, 2000);

$(".ghost").on("mousedown", function () {
    let top = $(this).css("top");
    console.log(top)
    if (top == "0px"){
        $(this).css("background-image", "url(/img/ghost-attacked.png);");
        up = true;
    }
});

shotAudio.addEventListener("canplaythrough", () => {
    shotAudio.play().catch(e => {
        $(".ghost").click(function () {
            if (up){
                shotAudio.play();
            }
        })
    })
});
