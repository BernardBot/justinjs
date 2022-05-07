onmessage = function(e) {
    console.log("Got from main: " + e.data);
    wait(e.data);
    this.postMessage("Done waiting");
}

function wait(ms) {
    let start = new Date().getTime();
    while (new Date().getTime() < start + ms);
}
