export function getMoscowTime() {
    const moscowTimeStr = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Moscow",
        // timeZone: "PST", // use PST timezone to check function
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false 
    });
    // console.log (new Date(moscowTimeStr))
    return new Date(moscowTimeStr);
}


export function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return [hours, minutes, seconds]
        .map(component => component < 10 ? '0' + component : component)
        .join(':');
}

export function isDayTime(hours) {
    return (hours >= 7 && hours < 19);
}
