function timeFrom(year, month, day, hours, minutes, seconds) {
    if (year === undefined) {
        return 0
    }
    let result = '';
    const now = new Date();

    let date;
    if (arguments.length === 1)
        date = new Date(year, 0);
    if (arguments.length === 2)
        date = new Date(year, month);
    if (arguments.length === 3)
        date = new Date(year, month, day);
    if (arguments.length === 4)
        date = new Date(year, month, day, hours);
    if (arguments.length === 5)
        date = new Date(year, month, day, hours, minutes);
    if (arguments.length === 6)
        date = new Date(year, month, day, hours, minutes, seconds);

    let yearsDelta = getYearsDelta(now, date);

    result += yearsDelta;
    let lastNumber = yearsDelta % 10;
    switch (lastNumber) {
        case 1:
            result += ' год';
            break;
        case 2:
        case 3:
        case 4:
            result += ' года';
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 0:
            result += ' лет';
            break;
    }

    if (month === undefined) {
        return result;
    }

    let monthsDelta = getMonthsDelta(now, date);

    result += ', ';
    result += monthsDelta;
    lastNumber = monthsDelta % 10;
    switch (lastNumber) {
        case 1:
            result += ' месяц';
            break;
        case 2:
        case 3:
        case 4:
            result += ' месяца';
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 0:
            result += ' месяцев';
            break;
    }
    if (day === undefined) {
        return result;
    }

    let daysDelta = getDaysDelta(now, date);

    result += ', ';
    result += daysDelta;
    lastNumber = daysDelta % 10;
    switch (lastNumber) {
        case 1:
            result += ' день';
            break;
        case 2:
        case 3:
        case 4:
            result += ' дня';
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 0:
            result += ' дней';
            break;
    }

    if (hours === undefined) {
        return result;
    }

    let hoursDelta = getHoursDelta(now, date);

    result += ', ';
    result += hoursDelta;
    lastNumber = hoursDelta % 10;
    switch (lastNumber) {
        case 1:
            result += ' час';
            break;
        case 2:
        case 3:
        case 4:
            result += ' часа';
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 0:
            result += ' часов';
            break;
    }

    if (minutes === undefined) {
        return result;
    }

    let minutesDelta = getMinutesDelta(now, date);

    result += ', ';
    result += minutesDelta;
    lastNumber = minutesDelta % 10;
    switch (lastNumber) {
        case 1:
            result += ' минута';
            break;
        case 2:
        case 3:
        case 4:
            result += ' минуты';
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 0:
            result += ' минут';
            break;
    }

    if (seconds === undefined) {
        return result;
    }

    let secondsDelta = getSecondsDelta(now, date);

    result += ', ';
    result += secondsDelta;
    lastNumber = secondsDelta % 10;
    switch (lastNumber) {
        case 1:
            result += ' секунда';
            break;
        case 2:
        case 3:
        case 4:
            result += ' секунды';
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 0:
            result += ' секунд';
            break;
    }
    return result;
}

function getYearsDelta(now, date) {
    const years = now.getFullYear() - date.getFullYear();
    if (years === 0) {
        return 0;
    }
    const months = now.getMonth() - date.getMonth();
    if (months > 0) {
        return years;
    }
    if (months < 0) {
        return years - 1;
    }
    // here now.getMonth() === date.getMonth() so we need to check days
    const days = now.getDate() - date.getDate();
    if (days > 0) {
        return years;
    }
    if (days < 0) {
        return years - 1;
    }
    // here now.getDate() === date.getDate() so we need to check hours
    const hours = now.getHours() - date.getHours();
    if (hours > 0) {
        return years;
    }
    if (hours < 0) {
        return years - 1;
    }
    // here now.getHours() === date.getHours() so we need to check minutes
    const minutes = now.getMinutes() - date.getMinutes();
    if (minutes > 0) {
        return years;
    }
    if (minutes < 0) {
        return years - 1;
    }
    // here now.getMinutes() === date.getMinutes() so we need to check seconds
    const seconds = now.getSeconds() - date.getSeconds();
    if (seconds > 0) {
        return years;
    }
    if (seconds < 0) {
        return years - 1;
    }
    // everything except years are equal:
    return years
}

function getMonthsDelta(now, date) {
    let months = now.getMonth() - date.getMonth();
    if (months === 0) {
        return 0;
    }
    if (months < 0) {
        months = 12 + months;
    }
    const days = now.getDate() - date.getDate();
    if (days > 0) {
        return months;
    }
    if (days < 0) {
        return months - 1;
    }
    // here now.getDate() === date.getDate() so we need to check hours
    const hours = now.getHours() - date.getHours();
    if (hours > 0) {
        return months;
    }
    if (hours < 0) {
        return months - 1;
    }
    // here now.getHours() === date.getHours() so we need to check minutes
    const minutes = now.getMinutes() - date.getMinutes();
    if (minutes > 0) {
        return months;
    }
    if (minutes < 0) {
        return months - 1;
    }
    // here now.getMinutes() === date.getMinutes() so we need to check seconds
    const seconds = now.getSeconds() - date.getSeconds();
    if (seconds > 0) {
        return months;
    }
    if (seconds < 0) {
        return months - 1;
    }
    // everything except months are equal:
    return months
}

function getDaysDelta(now, date) {
    let days = now.getDate() - date.getDate();
    if (days === 0) {
        return 0;
    }
    if (days < 0) {
        const prevMonth = date.getMonth() + 1;
        let daysInPrevMonth = 30;
        switch (prevMonth) {
            case 1:
            case 3:
            case 7:
            case 10:
            case 12:
                daysInPrevMonth = 31;
                break;
            case 2:
                const prevYear = date.getFullYear();
                if ((!(prevYear % 4) && prevYear % 100) || !(prevYear % 400))  // if year was leap
                    daysInPrevMonth = 29;
                else
                    daysInPrevMonth = 28;
        }
        days = daysInPrevMonth + days;
    }
    const hours = now.getHours() - date.getHours();
    if (hours > 0) {
        return days;
    }
    if (hours < 0) {
        return days - 1;
    }
    // here now.getHours() === date.getHours() so we need to check minutes
    const minutes = now.getMinutes() - date.getMinutes();
    if (minutes > 0) {
        return days;
    }
    if (minutes < 0) {
        return days - 1;
    }
    // here now.getMinutes() === date.getMinutes() so we need to check seconds
    const seconds = now.getSeconds() - date.getSeconds();
    if (seconds > 0) {
        return days;
    }
    if (seconds < 0) {
        return days - 1;
    }
    // everything except days are equal:
    return days
}

function getHoursDelta(now, date) {
    let hours = now.getHours() - date.getHours();
    if (hours === 0) {
        return 0;
    }
    if (hours < 0) {
        hours = 24 + hours;
    }
    const minutes = now.getMinutes() - date.getMinutes();
    if (minutes > 0) {
        return hours;
    }
    if (minutes < 0) {
        return hours - 1;
    }
    // here now.getMinutes() === date.getMinutes() so we need to check seconds
    const seconds = now.getSeconds() - date.getSeconds();
    if (seconds > 0) {
        return hours;
    }
    if (seconds < 0) {
        return hours - 1;
    }
    // everything except hours are equal:
    return hours
}

function getMinutesDelta(now, date) {
    let minutes = now.getMinutes() - date.getMinutes();
    if (minutes === 0)
        return 0;
    if (minutes < 0) {
        minutes = 60 + minutes;
    }
    const seconds = now.getSeconds() - date.getSeconds();
    if (seconds > 0) {
        return minutes;
    }
    if (seconds < 0) {
        return minutes - 1;
    }
    // everything except hours are equal:
    return minutes
}

function getSecondsDelta(now, date) {
    const seconds = now.getSeconds() - date.getSeconds();
    if (seconds === 0) {
        return 0;
    }
    if (seconds < 0) {
        return 60 + seconds;
    }
    return seconds
}

console.log(timeFrom(2016, 8, 1, 1, 1, 1));
