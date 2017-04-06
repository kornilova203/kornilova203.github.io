function timeFrom(year, month, day, hours, minutes, seconds) {
    console.log(arguments.length);
    if (year === undefined) {
        return 0
    }
    const now = new Date();
    const date = new Date(year, month, day, hours, minutes, seconds);
    console.log(now);
    console.log(date);
    let yearsDelta = getYearsDelta(now, date);
    // console.log(now-date);
    console.log(yearsDelta);

}

function getYearsDelta(now, date) {
    const years = now.getFullYear() - date.getFullYear();
    const months = now.getMonth() - date.getMonth();
    if (months > 0) {
        return years;
    }
    if (months < 0) {
        return years - 1;
    }
    // here now.getMonth() === date.getMonth() so we need to check days
    const days = now.getDate() > date.getDate();
    if (days > 0) {
        return years;
    }
    if (days < 0) {
        return years - 1;
    }
    // here now.getDate() === date.getDate() so we need to check hours
    const hours = now.getHours() > date.getHours();
    if (hours > 0) {
        return years;
    }
    if (hours < 0) {
        return years - 1;
    }
    // here now.getHours() === date.getHours() so we need to check minutes
    const minutes = now.getMinutes() > date.getMinutes();
    if (minutes > 0) {
        return years;
    }
    if (minutes < 0) {
        return years - 1;
    }
    // here now.getMinutes() === date.getMinutes() so we need to check seconds
    const seconds = now.getSeconds() > date.getSeconds();
    if (seconds > 0) {
        return years;
    }
    if (seconds < 0) {
        return years - 1;
    }
    // everything except years are equal:
    return years
}

console.log(timeFrom(2016, 8, 1, 1, 1, 1));
