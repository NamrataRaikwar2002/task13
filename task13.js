function reverseStr(str) {
    var item = str.split("")
    var reverseitem = item.reverse()
    var reversed = reverseitem.join("")
    return reversed;

}

function checkpalindrome(str) {
    var reversed = reverseStr(str)
    if (reversed==str) {
        return true
    } else {
        return false
    }

}


function dateofbirth(date) {
    var datestr = {day:"",month:"",year:""};
    if (date.day<10){
        datestr.day="0"+date.day;
    }else{
        datestr.day=date.day.toString()
    }
    if(date.month<10){
        datestr.month="0"+date.month;
    }else{
        datestr.month=date.month.toString()
    }
    datestr.year=date.year.toString()
    return datestr
}

function dateformats(date) {
    var datestr = dateofbirth(date);

    var ddmmyyyy = datestr.day + datestr.month + datestr.year;
    var mmddyyyy = datestr.month + datestr.day + datestr.year;
    var yyyymmdd = datestr.year + datestr.month + datestr.day;
    var ddmmyy = datestr.day + datestr.month + datestr.year.slice(-2);
    var mmddyy = datestr.month + datestr.day + datestr.year.slice(-2);
    var yymmdd = datestr.year.slice(-2) + datestr.month + datestr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}


function isformatpalindrome(date) {
    var palindromeList=dateformats(date);

    var check = false
    for (let i = 0; i < palindromeList.length; i++) {

        if (checkpalindrome(palindromeList[i])) {
            check = true;
            break;
        }
    }
    return check;
}


function checkleapYear(year) {
    if (year % 400 === 0) {
        return true;
    }

    if (year % 100 === 0) {
        return true;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}


function findNextdate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (checkleapYear(year)) {
            if (day > 29) {
                day = 1
                month++
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > dayInMonth[month - 1]) {
            day = 1
            month++
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function findNextpalindrome(date) {
    var count = 0;
    var nextdate = findNextdate(date);
    while(1){
        count++;
        var checkpalindrome = isformatpalindrome(nextdate);
        if (checkpalindrome) {
            break;
        
        }
        nextdate = findNextdate(nextdate);

    
    }
    return [count, nextdate];
}


var dobinput = document.querySelector("#dateinput");
var checkbutton = document.querySelector("#Button");
var output = document.querySelector("#out-put");



function clickHandler(e) {
    var bdydate = dobinput.value

    if (bdydate !== "") {
        var listofdate = bdydate.split("-");
        var date = {
            day: Number(listofdate[2]),
            month: Number(listofdate[1]),
            year: Number(listofdate[0])

        };
        var checkpalindrome =isformatpalindrome(date);
        if (checkpalindrome) {
            output.innerText = "yeah !! your birthday is palindrome 🥳 "
        } else {
            var [count, nextdate] = findNextpalindrome(date);
            output.innerText = `The next palindrome date is ${nextdate.day}-${nextdate.month}-${nextdate.year},you missed it by ${count} days!☹️`
        }
    }

}


checkbutton.addEventListener("click", clickHandler);