$( document ).ready(function() {

// Set variables
var container = $('.container');
var currentTime = moment().format('LT');
var currentHour = parseInt(currentTime[0]+currentTime[1]);

// Set current date in header
$('#currentDay').text(moment().format('MMMM DD, YYYY') + "  /  " + moment().format('hh:mm'));

// Get local storage object
var storage = JSON.parse(localStorage.getItem('storage'));
if (storage === null){
    storage = {
        "9AM" : "",
        "10AM" : "",
        "11AM" : "",
        "12PM" : "",
        "1PM" : "",
        "2PM" : "",
        "3PM" : "",
        "4PM" : "",
        "5PM" : ""
    }
    console.log(storage);
}

var future = false;
// Create time block
function timeBlock(time, data){
    // Add space to time displayed
    if(time.length === 3){
        var displayTime = time[0] + " " + time[1] + time[2];
    } else {
        var displayTime = time[0] + time[1] + " " + time[2] + time[3];
    }
    var row = $('<div>');
    row.addClass('row time-block');
    row.attr('id', time);
    container.append(row);
    // Create 3 column bootstrap row
    for(var i = 0; i < 3; i++){
        var newCol = $('<div>');
        switch(i){
            case 0:
                newCol.addClass('col-md-2 hour');
                newCol.text(displayTime);
                break;
            case 1:
                newCol.addClass('col-md-8');
                var inputArea = $('<textarea>');
                inputArea.text(data);
                inputArea.addClass('description');
                newCol.append(inputArea);
                break;
            case 2:
                newCol.addClass('col-md-2 saveBtn');
                break;
        }
        row.append(newCol);
        row.addClass('past');
        if(future && parseInt(time) !== currentHour){
            row.addClass('future');
            row.removeClass('past');
        }
        console.log(parseInt(time));
        console.log(currentHour);
        if(parseInt(time) === currentHour){
            row.addClass('present');
            // Toggle future time block display
            future = true;
            row.removeClass('past');
        } 
    }
}

// Create time blocks 9 AM to 5 PM
for(key in storage){
    var data = storage[key];
    console.log(data);
    timeBlock(key, data);
}

function setStorage(id,data){
    storage[id] = data;
    console.log(storage);
    localStorage.setItem('storage', JSON.stringify(storage));
}

// Save button click
$('.saveBtn').on("click", function(e){
    // DOM traverse to get the entered data
    var selectionID = this.parentElement.id;
    var selectionData = this.parentElement.querySelectorAll('textarea')[0].value;
    // Push items into local storage
    setStorage(selectionID, selectionData);
})

// Clear data click
$('#clear').on('click', function(e){
    e.preventDefault();
    localStorage.removeItem('storage');
    location.reload();
})

});