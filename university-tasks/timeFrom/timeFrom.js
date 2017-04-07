function timeFrom(year, month, day, hours, minutes, seconds) {
    if (year === undefined) {  // if no arguments was passed
        return 0
    }
    let result = '';
    const now = new Date();
    let date;
    if (arguments.length === 1) {
        date = new Date(year, 0);
    } else {
        date = new Date(...arguments);
    }

    let yearsDelta = getYearsDelta(now, date);
    result = addToResult(result, yearsDelta, ['год', 'года', 'лет'], '');

    if (month === undefined) {
        return result;
    }

    let monthsDelta = getMonthsDelta(now, date);
    result = addToResult(result, monthsDelta, ['месяц', 'месяца', 'месяцев'], ', ');

    if (day === undefined) {
        return result;
    }

    let daysDelta = getDaysDelta(now, date);
    result = addToResult(result, daysDelta, ['день', 'дня', 'дней'], ', ');

    if (hours === undefined) {
        return result;
    }

    let hoursDelta = getHoursDelta(now, date);
    result = addToResult(result, hoursDelta, ['час', 'часа', 'часов'], ', ');

    if (minutes === undefined) {
        return result;
    }

    let minutesDelta = getMinutesDelta(now, date);
    result = addToResult(result, minutesDelta, ['минута', 'минуты', 'минут'], ', ');

    if (seconds === undefined) {
        return result;
    }

    let secondsDelta = getSecondsDelta(now, date);
    result = addToResult(result, secondsDelta, ['секунда', 'секунды', 'секунд'], ', ');

    return result;
}

// add part to result string (for example "15 часов")
function addToResult(result, number, strArr, separator) {
    result += separator;
    result += number;
    const lastNumber = number % 10;
    switch (lastNumber) {
        case 1:
            result += ' ' + strArr[0];
            break;
        case 2:
        case 3:
        case 4:
            result += ' ' + strArr[1];
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 0:
            result += ' ' + strArr[2];
            break;
    }
    return result;
}

// count how many full years passed after certain date
function getYearsDelta(now, date) {
    const years = now.getFullYear() - date.getFullYear();
    if (years === 0) {  // if 2 dates have same year
        return 0;
    }
    // have to check amount of months
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

// count how many month passed after certain date (less than 12)
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

// count how many days passed after certain date (less than 31)
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

// count how many hours passed after certain date (less than 24)
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

// count how many minutes passed after certain date (less than 60)
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

// count how many seconds passed after certain date (less than 60)
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

console.log("time passed since 2016 sep 1, 01:01:01");
console.log(timeFrom(2016, 8, 1, 1, 1, 1));
