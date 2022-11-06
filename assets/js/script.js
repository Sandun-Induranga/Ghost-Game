let pumpkinNumber;

function ghostAction() {
    pumpkinNumber = chooseRandomPumpkin();
    $(".ghost" + pumpkinNumber).css("top","0%");
    setTimeout(ghostIn, 1500);
}

function ghostIn() {
    $(".ghost" + pumpkinNumber).css("top","50%");
}

function chooseRandomPumpkin() {
    return Math.floor(Math.random() * 6);
}

setInterval(ghostAction, 2000);

$(".ghost").on("mousedown", function (event) {
    let top = $(this).css("top");
    console.log(top)
    if (top == "0px"){
        console.log("shot")
    }
});
