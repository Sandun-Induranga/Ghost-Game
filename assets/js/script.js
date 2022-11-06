function ghostOut() {
    // ghosts[chooseRandomPumpkin()].css("top", "50%");
    $(".ghost-"+chooseRandomPumpkin()).css("top","50%");
    $(".ghost-"+chooseRandomPumpkin()).css("top","0%");
}

function chooseRandomPumpkin() {
    return Math.floor(Math.random() * 5);
}

setInterval(ghostOut, 1000);
