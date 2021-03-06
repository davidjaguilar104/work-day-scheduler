var times = {
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": ""
}; // var times is above 

function getPastPresentFuture(difference) {
    if (difference < 0) return "future";
    if (difference > 0 ) return "past";
    return "present";
};


$(document).ready(function() {
    Object.keys(times).forEach(function(key) {
        var splitTime = key.split(" ");
        var hour = parseInt(splitTime[0], 10);
        var meridiem = splitTime[1];
        var hour24 = (meridiem === "AM") || hour === 12 ? hour : hour + 12;
        var currentHour = moment().hour();
        var pastPresentFuture = getPastPresentFuture(currentHour - hour24);

        var storedValue = localStorage.getItem(key);
        var timeBlock = $("<div>" + key + "</div>").addClass("row time-block");
        var textarea = $("<textarea>").addClass("col-10 description " + pastPresentFuture).val(storedValue);
        timeBlock.append(textarea);
        var icon = $("<i>").addClass("fa fa-save");
        var button = $("<button>").addClass("col saveBtn").append(icon);

        $(button).on("click", function() {
            localStorage.setItem(key, textarea.val());
        });

        timeBlock.append(button);
        $(".container").append(timeBlock);
    });

    var currentDayText = moment().format("[today is ]MMMM DD, YYYY");
    $("#currentDay").text(currentDayText);
});
