const displayClock = document.getElementById('clock');
const displayCountdown = document.getElementById('countdown');
const audio = new Audio('beep.mp3');
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;
let countdownInterval = null;

function updateTime() {
    const date = new Date();

    const hour = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());



    displayClock.innerText = `${hour} : ${minutes} : ${seconds}`
}

function formatTime(time) {
    if (time < 10) {
        return '0' + time;
    }
    return time;
}

function setAlarmTime(value) {
    alarmTime = value;
}

function getTimeLeftCountdownInMilliseconds(timeToAlarm, current) {
    // timeToAlarm: type -> new Date();
    var timeout = timeToAlarm.getTime() - current.getTime();
    return timeout;
}

function setCountdown() {
    const current = new Date();
    const timeToAlarm = new Date(alarmTime);
    const timeoutMs = getTimeLeftCountdownInMilliseconds(timeToAlarm, current);
    let beep = "beep in ->  ";
    if (timeoutMs > 0) {
        const timeoutTime = msToTime(timeoutMs);
        displayCountdown.innerHTML = beep + timeoutTime;
    }
    else {
        displayCountdown.innerHTML = beep + '00:00:00';
    }

}

function msToTime(s) {

    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
}

function setAlarm() {
    if (alarmTime) {
        const current = new Date();
        const timeToAlarm = new Date(alarmTime);

        if (timeToAlarm > current) {
            var timeout = getTimeLeftCountdownInMilliseconds(timeToAlarm, current);
            countdownInterval = setInterval(setCountdown, 1000);
            alarmTimeout = setTimeout(() => audio.play(), timeout);
            alert('Alarm set');
        }
    }
    else {
        alert('Set a time before starting the alarm!');
    }
}

function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        clearCountdown();
        alert('Alarm cleared');
    }
}

function clearCountdown() {
    clearInterval(countdownInterval);
    displayCountdown.innerHTML = '';
}

setInterval(updateTime, 1000);