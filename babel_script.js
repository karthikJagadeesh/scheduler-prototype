'use strict';

var moreThan = 0;
var copied = null;
var bookingObj = {};
var showGrid = 'numbers';
var weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var resources = [];
var bookingType = '';
var dp = new DayPilot.Scheduler("dp");
dp.theme = "scheduler_8";
//dp.cssClassPrefix = "scheduler_blue";
//behaviour & appearance
dp.cellWidth = 60;
dp.eventHeight = 50;
dp.headerHeight = 30;
dp.startDate = "2016-12-01"; // or just dp.startDate = "2013-03-25";
dp.days = 900;
dp.cellDuration = 8; // one day
dp.scale = "Day";
dp.timeHeaders = [{ groupBy: "Month", format: "MMM yyyy" }, { groupBy: "Week" }, { groupBy: "Cell", format: "ddd d" }];
dp.separators = [{ color: "red", location: new DayPilot.Date(), width: 2 }];

dp.heightSpec = "Max";
dp.height = 400;
dp.width = '95%';

dp.onBeforeCellRender = function (args) {
    //get today line

    if (args.cell.start <= DayPilot.Date.today() && DayPilot.Date.today() < args.cell.end) {
        args.cell.backColor = "#ffcccc";
    }

    var firmAvaiblehrs = 8;
    var weekDay = weekdays[args.cell.start.getDayOfWeek()];

    // utilization color
    var utilization = args.cell.utilization("total");

    var visibleUtilization = utilization > moreThan;

    // cell bar color
    var bgColor = '';
    var utilizationText = '';
    var utilizationHrs = 0;
    if (utilization > firmAvaiblehrs) {
        bgColor = '#c0504d';
        utilizationHrs = utilization - firmAvaiblehrs;
        utilizationText = 'over';
    } else if (utilization == firmAvaiblehrs) {
        bgColor = '#9bbb59;';
        utilizationText = 'ok';
        utilizationHrs = firmAvaiblehrs;
    } else {
        bgColor = '#4F81BD;';
        utilizationText = 'under';
        utilizationHrs = firmAvaiblehrs - utilization;
    }

    firmAvaiblehrs = firmAvaiblehrs > 0 ? firmAvaiblehrs : '-';

    // showing numbers only
    if (showGrid == 'numbers' && visibleUtilization == true) {
        args.cell.html = "<div class='booking-bg booking-numbers' style='background-color: " + bgColor + ";'><span class='utilization-span'>" + utilizationHrs + "hr " + utilizationText + "</span></div>";
    } else if (showGrid == 'numbers' && visibleUtilization == false) {
        args.cell.html = "<div class='booking-bg unscheduled-booking'><span>" + firmAvaiblehrs + "</span></div>";
    }
    // showing bars only
    /*if (showGrid == 'bar' && visibleUtilization == true) {
        args.cell.html = "<div class='booking-bg booking-bar' style='background-color: " + bgColor + ";'><span class='utilization-span'>" + utilizationHrs + "hr " + utilizationText + "</span></div>";
    } else if (showGrid == 'bar' && visibleUtilization == false) {
        args.cell.html = "<div class='booking-bg booking-bar unscheduled-booking'></div>";
    }
    // disable
    if (showGrid == 'none' && visibleUtilization == true) {
        args.cell.html = "<div class='booking-bg booking-disable' style='background-color: " + bgColor + ";'><span class='utilization-span'>" + utilizationHrs + "hr " + utilizationText + "</span></div>";
    } else if (showGrid == 'none' && visibleUtilization == false) {
        args.cell.html = "<div class='booking-bg booking-disable unscheduled-booking'></div>";
    }*/
    // for weekends
    if (dp.scale == "Day" && (args.cell.start.getDayOfWeek() === 0 || args.cell.start.getDayOfWeek() === 6)) {
        args.cell.backColor = "#FCFBF8";
    }
};

// adding holidays to the caleneder beore loading

dp.onBeforeTimeHeaderRender = function (args) {

    var firmHolidays = [{ startDate: '2017-03-25T00:00:00', endDate: '2017-03-26T00:00:00', title: 'Good Friday' }, { startDate: '2017-01-26T00:00:00', endDate: '2017-01-27T00:00:00', title: 'Republic Day' }, { startDate: '2017-01-05-01T00:00:00', endDate: '2017-05-02T00:00:00', title: 'Worker Day' }, { startDate: '2017-08-15T00:00:00', endDate: '2017-08-16T00:00:00', title: 'Independence Day' }, { startDate: '2017-09-05T00:00:00', endDate: '2017-09-06T00:00:00', title: 'Teachers Day' }];
    for (var i = 0; i < firmHolidays.length; i++) {
        if (args.header.start == firmHolidays[i].startDate && args.header.end == firmHolidays[i].endDate) {
            args.header.cssClass = "firm-holiday";
            args.header.toolTip = firmHolidays[i].title + " " + args.header.toolTip;
        }
    }
};

// event creating

dp.onTimeRangeSelecting = function (args) {

    args.right.enabled = true;
    args.left.enabled = true;
    args.allowed = true;
};

dp.onTimeRangeSelected = function (args) {

    //dp.durationBarVisible = true;
    //var name = prompt("New event name:", "Event");
    var el = document.querySelector('.scheduler_8_shadow');
    var elChild = document.createElement('div');
    elChild.className = 'cellSelectionMenu';
    el.prepend(elChild);
    var el2 = document.querySelector('.cellSelectionMenu');
    el2.innerHTML = "<i class='material-icons'>more_vert</i>";

    // dp.clearSelection();
    //if (!name) return;
    var e = new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource
    });
    //dp.events.add(e);
    //dp.message("Created");
};

dp.dynamicEventRenderingCacheSweeping = true;
dp.eventMovingStartEndEnabled = false;
dp.eventResizingStartEndEnabled = true;
dp.timeRangeSelectingStartEndEnabled = false;

// see also DayPilot.Event.data.staticBubbleHTML property
dp.bubble = new DayPilot.Bubble({
    onLoad: function onLoad(args) {
        var ev = args.source,
            parentElement;
        var noDaysBooked = new DayPilot.Date(ev.data.end).getDay() - new DayPilot.Date(ev.data.start).getDay();
        if (noDaysBooked == 0) noDaysBooked = 1;
        var bookedHrs = ev.data.total;
        args.html = '<div class="bubble-class"> ' + ev.text() + ' ' + ' : ' + bookedHrs + '  hrs for  ' + noDaysBooked + ' day </div>';
    }
});

// header columns
dp.rowHeaderColumns = [{ title: 'Name' }];
dp.treeEnabled = false;
dp.resources = [{ name: "Resource 1", id: "r1" }, { name: "Resource 2", id: "r2" }, { name: "Resource 3", id: "r3" }, { name: "Resource 4", id: "r4" }, { name: "Resource 5", id: "r5" }, { name: "Resource 6", id: "r6" }];
dp.events.list = [{
    start: "2016-12-04",
    end: "2016-12-09",
    id: "1",
    resource: "r1",
    text: "2's,A Stitch In Time's, 1040, 40 ",
    total: 8,

    tags: { bookingType: 'schedule', taskType: 1040 } // custom event property
}, {
    start: "2016-12-04",
    end: "2016-12-09",
    id: "2",
    resource: "r2",
    text: "1's,A Stitch, 1041, 40 ",
    total: 13,
    tags: { bookingType: 'schedule', taskType: 1041 } // custom event property
}, {
    start: "2016-12-10",
    end: "2016-12-15",
    id: "3",
    resource: "r2",
    text: "1's,A Stitch, 1041, 40 ",
    total: 13,
    tags: { bookingType: 'schedule', taskType: 1041 } // custom event property
}];

dp.contextMenu = new DayPilot.Menu({
    items: [{ text: "Edit", onclick: function onclick() {} }, { text: "Delete", onclick: function onclick() {
            var res = confirm("Are you sure want to delete ");if (res) dp.events.remove(this.source);
        } }, { text: "Copy", onclick: function onclick() {
            copied = this.source;
        } }, { text: "Select", onclick: function onclick() {
            dp.multiselect.add(this.source);
        } }, { text: "-" }, { text: "Reassign to", items: dp.resources.map(function (res) {
            return { text: res.name };
        }) }]
});

dp.contextMenuSelection = new DayPilot.Menu({ items: [{
        text: "Paste", onclick: function onclick() {
            if (!copied) {
                alert('You need to copy an event first.');return;
            }
            var selection = this.source;
            var duration = copied.end().getTime() - copied.start().getTime(); // milliseconds
            var newEvent = new DayPilot.Event({
                start: selection.start,
                end: selection.start.addMilliseconds(duration),
                text: copied.text(),
                resource: selection.resource,
                id: DayPilot.guid(),
                total: copied.data.total,
                tags: copied.data.tags });
            dp.events.add(newEvent);
        }
    }]
});

dp.init();

/*   // height of grid container as per window and list of resources
   function gridCalendarHeight() {
       var totalHeight = $("#calendar-container").height() + $("#calendar-container").offset().top + $(".footer").height();
       if(  totalHeight >= $(window).height() ){
           dp.heightSpec = "Fixed";
           dp.height = $(window).height() - $("#calendar-container").offset().top  - $(".footer").height() - 80;
           dp.update();
       }
   }
   gridCalendarHeight();*/
