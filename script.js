$( document ).ready(function() {

// Set variables
var container = $('.container');
var currentTime = moment().format('LT');
var currentHour = parseInt(currentTime[0]+currentTime[1]);

// Set current date in header
$('#currentDay').text(moment().format('MMMM DD, YYYY'));

var future = false;
// Create time block
function timeBlock(x){
    // Check if time is AM or PM
    if(x > 9 && x < 12){
        ampm = "AM";
    } else {
        var ampm = "PM";
    }
    var row = $('<div>');
    row.addClass('row time-block');
    row.attr('data-time', x + ampm);
    container.append(row);
    // Create 3 column bootstrap row
    for(var i = 0; i < 3; i++){
        var newCol = $('<div>');
        switch(i){
            case 0:
                newCol.addClass('col-md-2 hour');
                newCol.text(x + " " + ampm);
                break;
            case 1:
                newCol.addClass('col-md-8');
                var inputArea = $('<textarea>');
                inputArea.addClass('description');
                
                newCol.append(inputArea);
                break;
            case 2:
                newCol.addClass('col-md-2 saveBtn');
                break;
        }
        row.append(newCol);
        row.addClass('past');
        if(future && x !== currentHour){
            row.addClass('future');
            row.removeClass('past');
        }
        if(x === currentHour){
            row.addClass('present');
            future = true;
            row.removeClass('past');
        } 
    }
}

// Create 
var timeRange = 9;
while(timeRange !== 6){
    if(timeRange === 13){
        timeRange = 1;
    }
    timeBlock(timeRange);
    timeRange++;
}

$('.saveBtn').on("click", function(e){
    var selection = this.parentElement.getAttribute("data-time");
    
})
});