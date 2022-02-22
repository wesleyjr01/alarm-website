const clock_div = document.getElementById("clock")

function getDate() {
    var currentDate = new Date();
    return currentDate;
}

function getCurrentTime() {
    var currentDate = getDate();
    var currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    return currentTime;
}

function setDateToClock() {
    var currentTime = getCurrentTime();
    clock_div.innerHTML = currentTime;
}

setInterval(setDateToClock, 1000);