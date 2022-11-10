let pumpkinNumber;
let up = false;
let clicked = false;
let ariaValue = 100;

const shotAudio = new Audio("https://rpg.hamsterrepublic.com/wiki-images/d/d7/Oddbounce.ogg");
const backgroundAudio = new Audio("assets/background.mp3");

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
            Swal.fire({
                title: 'You Won',
                text: "Go To Next Level",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                } else {
                    window.location.reload();
                }
            })
        }
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

backgroundAudio.addEventListener("canplaythrough", () => {
    backgroundAudio.play().catch(e => {
        $("#btnStart").click(function () {
            backgroundAudio.volume = 0.5;
            backgroundAudio.play();
        })
    })
});

$("#btnStart").on("click", function () {
    setInterval(ghostAction, 2000);
    timer();
});

function timer() {
    let x = 60;
    setInterval(function () {
        if (x >= 0) {
            $("#txtTime").text(x);
            x--;
        } else {
            clearInterval(this);
            Swal.fire({
                title: 'You Lose',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }
    }, 1000);
}
