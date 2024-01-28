let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let lapListRef = document.querySelector(".lap-list");
let int = null;
let lapNumber = 1;

document.getElementById("start-timer").addEventListener("click", () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

document.getElementById("pause-timer").addEventListener("click", () => {
    clearInterval(int);
});

document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00 : 00 : 00 : 000 ";
    lapListRef.innerHTML = "";
    lapNumber = 1;
});

document.getElementById("lap-timer").addEventListener("click", () => {
    if (int !== null) {
        const lapTime = getTimeString();
        addLapToList(lapTime);
    }
});

function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    timeRef.innerHTML = getTimeString();
}

function getTimeString() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms =
        milliseconds < 10
            ? "00" + milliseconds
            : milliseconds < 100
            ? "0" + milliseconds
            : milliseconds;

    return `${h} : ${m} : ${s} : ${ms}`;
}

function addLapToList(lapTime) {
    const lapItem = document.createElement("li");
    lapItem.innerText = `Lap ${lapNumber}: ${lapTime}`;
    lapListRef.appendChild(lapItem);
    lapNumber++;
}
