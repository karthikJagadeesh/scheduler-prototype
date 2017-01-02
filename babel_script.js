'use strict';

// (() => {

var showGrid = 'numbers';
var weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var firmHolidays = [{
    startDate: '2017-03-25T00:00:00',
    endDate: '2017-03-26T00:00:00',
    title: 'Good Friday'
}, {
    startDate: '2017-01-26T00:00:00',
    endDate: '2017-01-27T00:00:00',
    title: 'Republic Day'
}, {
    startDate: '2017-01-05-01T00:00:00',
    endDate: '2017-05-02T00:00:00',
    title: 'Worker Day'
}, {
    startDate: '2017-08-15T00:00:00',
    endDate: '2017-08-16T00:00:00',
    title: 'Independence Day'
}, {
    startDate: '2017-09-05T00:00:00',
    endDate: '2017-09-06T00:00:00',
    title: 'Teachers Day'
}];

var bookingType = '';

var bookingObj = {};
var copied = null;

var dp = new DayPilot.Scheduler("dp");

dp.theme = "scheduler_8";
dp.clipBoard = null;

dp.cellWidth = 60;
dp.eventHeight = 50;
dp.headerHeight = 40;
dp.startDate = new DayPilot.Date().firstDayOfMonth();
var cacheStart = dp.startDate;
dp.days = 900;
dp.cellDuration = 8;
dp.scale = 'Day';

dp.timeHeaders = [{
    groupBy: 'Month',
    format: 'MMMM yyyy'
}, {
    groupBy: 'Cell',
    format: 'ddd d'
}];
dp.separators = [{
    color: "red",
    location: new DayPilot.Date(),
    width: 2
}];

dp.heightSpec = "Max";
dp.height = 360;
dp.width = '98%';

dp.businessBeginsHour = 10;
dp.businessEndsHour = 18;

var picker = new Pikaday({
    field: document.getElementById('select-cal'),
    disableDayFn: function disableDayFn(date) {
        var sun = date.getDay() === 0;
        var sat = date.getDay() === 6;
        return sun + sat;
    },
    onSelect: function onSelect() {
        dp.scrollTo(picker.getMoment().format('YYYY-MM-DD'), false, 'middle');
    }
});

//Navigate toolbar Handlers
// - change Time Headers view to Days, Weeks, Months, Year
// function getTimeFormatProperties(scale, timeHeader, days, cellWidth, startDate) {
//   dp.timeHeaders = [
//     { groupBy: timeHeader.groupBy1, format: timeHeader.format1},
//     { groupBy: timeHeader.groupBy2, format: timeHeader.format2 }
//   ]
//   dp.scale = scale
//   dp.days = days
//   dp.cellWidth = cellWidth
//   cacheStart = dp.startDate = startDate
// }
// const _navigator = {
//   '#show-hours': {
//     timeFormat: ['Hour',
//     { groupBy1: 'Day', groupBy2: 'Hour', format1: 'dddd, MMM dd', format2: undefined },
//     100, 60, (new DayPilot.Date())]
//   },
//   '#show-days': {
//     timeFormat: ['Day',
//     { groupBy1: 'Month', groupBy2: 'Cell', format1: 'MMMM yyyy', format2: 'ddd d' },
//     900, 60, (new DayPilot.Date())]
//   },
//   '#show-weeks': {
//     timeFormat: ['Week',
//     { groupBy1: 'Month', groupBy2: 'Week', format1: 'MMMM yyyy', format2: undefined },
//     900, 60, (new DayPilot.Date())]
//   },
//   '#show-months': {
//     timeFormat: ['Month',
//     { groupBy1: 'Year', groupBy2: 'Cell', format1: 'yyyy', format2: 'MM' },
//     900, 60, (new DayPilot.Date())]
//   },
//   '#show-this-week': {
//     timeFormat: ['Day',
//     { groupBy1: 'Month', groupBy2: 'Cell', format1: 'MMMM yyyy', format2: 'ddd d' },
//     7, 180, (new DayPilot.Date())]
//   },
//   '#show-this-month': {
//     timeFormat: ['Day',
//     { groupBy1: 'Month', groupBy2: 'Cell', format1: 'MMMM yyyy', format2: 'ddd d'},
//     31, 60, (new DayPilot.Date())]
//   }
// }
// const navigatorKeys = Object.keys(_navigator)
// for (let i=0; i<navigatorKeys.length; i++) {
//   const props = _navigator[navigatorKeys[i]]
//   document.querySelector(navigatorKeys[i]).addEventListener('click', () => {
//     getTimeFormatProperties(...props.timeFormat)
//     dp.update()
//   })
// }
document.querySelector('#show-hours').addEventListener('click', function () {
    dp.timeHeaders = [{
        groupBy: 'Day',
        format: 'dddd, MMM dd'
    }, {
        groupBy: 'Hour'
    }];
    cacheStart = dp.startDate = new DayPilot.Date();
    dp.scale = 'Hour';
    dp.days = 100;
    dp.cellWidth = 60;
    dp.update();
});
document.querySelector('#show-days').addEventListener('click', function () {
    dp.timeHeaders = [{
        groupBy: 'Month',
        format: 'MMMM yyyy'
    }, {
        groupBy: 'Cell',
        format: 'ddd d'
    }];
    cacheStart = dp.startDate = new DayPilot.Date();
    dp.scale = 'Day';
    dp.days = 900;
    dp.cellWidth = 60;
    dp.update();
});
document.querySelector('#show-weeks').addEventListener('click', function () {
    dp.timeHeaders = [{
        groupBy: 'Month',
        format: 'MMMM yyyy'
    }, {
        groupBy: 'Week'
    }];
    cacheStart = dp.startDate = new DayPilot.Date();
    dp.scale = 'Week';
    dp.days = 900;
    dp.cellWidth = 60;
    dp.update();
});
document.querySelector('#show-months').addEventListener('click', function () {
    dp.timeHeaders = [{
        groupBy: 'Year',
        format: 'yyyy'
    }, {
        groupBy: 'Cell',
        format: 'MM'
    }];
    cacheStart = dp.startDate = new DayPilot.Date();
    dp.scale = 'Month';
    dp.days = 900;
    dp.cellWidth = 60;
    dp.update();
});
document.querySelector('#show-this-week').addEventListener('click', function () {
    dp.timeHeaders = [{
        groupBy: 'Month',
        format: 'MMMM yyyy'
    }, {
        groupBy: 'Cell',
        format: 'ddd d'
    }];
    cacheStart = dp.startDate = new DayPilot.Date();
    dp.scale = 'Day';
    dp.days = 7;
    dp.startDate = new DayPilot.Date();
    dp.cellWidth = 180;
    dp.update();
});
document.querySelector('#show-this-month').addEventListener('click', function () {
    dp.timeHeaders = [{
        groupBy: 'Month',
        format: 'MMMM yyyy'
    }, {
        groupBy: 'Cell',
        format: 'ddd d'
    }];
    cacheStart = dp.startDate = new DayPilot.Date();
    dp.scale = 'Day';
    dp.days = 31;
    dp.startDate = new DayPilot.Date();
    dp.cellWidth = 60;
    dp.update();
});

//Scroll forward, backward and today
var scroll = function scroll() {
    switch (dp.scale) {
        case 'Hour':
            return dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(arguments.length <= 0 ? undefined : arguments[0]));

        case 'Day':
            return dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(arguments.length <= 1 ? undefined : arguments[1]));

        case 'Week':
            return dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(arguments.length <= 2 ? undefined : arguments[2]));

        case 'Month':
            return dp.scrollTo(dp.getDate(dp.getScrollX()).addMonths(arguments.length <= 3 ? undefined : arguments[3]));
    }
};

document.querySelector('#scroll-next').addEventListener('click', function () {

    if (dp.getViewPort().end.addDays(-1).value === dp.getDate().value) {
        dp.days += 100;
        dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(-100));
        dp.update();
    }
    scroll(1, 7, 21, 1);
});
document.querySelector('#scroll-back').addEventListener('click', function () {

    if (dp.getViewPort().start === cacheStart) {
        cacheStart = dp.startDate = dp.getViewPort().start.addDays(-100);
        dp.days += 100;
        dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(100));
        dp.update();
    }

    scroll(-1, -7, -21, -1);
});
document.querySelector('#scroll-today').addEventListener('click', function () {
    // cacheStart = dp.startDate = (new DayPilot.Date()).addDays(-10)
    dp.scrollTo(new DayPilot.Date(), false, 'middle');
    dp.update();
});

var addResourceForm = document.querySelector('#add-resource-form');
addResourceForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var firstName = event.target[0].value;
    var lastName = event.target[1].value;

    if (firstName !== '' && lastName !== '') {
        dp.resources.unshift({ name: firstName + ' ' + lastName, id: '' + firstName });
        dp.message("Added new Resource");
    }

    event.target[0].value = '';
    event.target[1].value = '';
    dp.update();
});

var cellHeights = {
    '#xtrasmall': 30,
    '#small': 40,
    '#medium': 50,
    '#large': 70,
    '#xtralarge': 100
};
var heightKeys = Object.keys(cellHeights);

var _loop = function _loop(i) {
    document.querySelector(heightKeys[i]).addEventListener('click', function () {
        dp.eventHeight = cellHeights[heightKeys[i]];
        dp.update();
    });
};

for (var i = 0; i < heightKeys.length; i++) {
    _loop(i);
}

//View Modes
var modesGroupedLabel = document.querySelector('#label-modes-grouped');
var modesSingleProjectResourceLabel = document.querySelector('#label-modes-single-project-resource');
var modesSingleResourceLabel = document.querySelector('#label-modes-single-resource');
var modesStyle = function modesStyle() {
    return modesGroupedLabel.style.display = arguments.length <= 0 ? undefined : arguments[0], modesSingleProjectResourceLabel.style.display = arguments.length <= 1 ? undefined : arguments[1], modesSingleResourceLabel.style.display = arguments.length <= 2 ? undefined : arguments[2];
};
var changeModeTo = function changeModeTo(mode) {
    if (mode === 'grouped') return dp.treeEnabled = true, dp.resources = [{
        name: "Task 1",
        id: "T1",
        expanded: true,
        children: [{
            name: "Resource 1",
            id: "T1_r1"
        }, {
            name: "Resource 2",
            id: "r2"
        }, {
            name: "Resource 3",
            id: "r3"
        }, {
            name: "Resource 4",
            id: "r4"
        }, {
            name: "Resource 5",
            id: "r5"
        }, {
            name: "Resource 6",
            id: "r6"
        }]
    }];else if (mode === 'singleRowResource') return dp.treeEnabled = false, dp.resources = [{
        name: "Resource 1",
        id: "r1"
    }, {
        name: "Resource 2",
        id: "r2"
    }, {
        name: "Resource 3",
        id: "r3"
    }, {
        name: "Resource 4",
        id: "r4"
    }, {
        name: "Resource 5",
        id: "r5"
    }, {
        name: "Resource 6",
        id: "r6"
    }];
};

document.querySelector('#modes-grouped').addEventListener('click', function () {
    return modesStyle('inline', 'none', 'none'), changeModeTo('grouped'), dp.update();
});
document.querySelector('#modes-single-project-resource').addEventListener('click', function () {
    return modesStyle('none', 'inline', 'none');
});
document.querySelector('#modes-single-resource').addEventListener('click', function () {
    return modesStyle('none', 'none', 'inline'), changeModeTo('singleRowResource'), dp.update();
});

dp.onEventClick = function (args) {
    // $('#scheduleproMenur').css({ display:"none"});
    document.querySelector('#scheduleproMenur').style.display = 'none';
    $("#eventActions").css({ display: "block", position: "absolute", top: event.pageY, left: event.pageX, zIndex: 999999 });

    document.querySelector('.copyBooking').addEventListener('click', function () {
        copied = args.e;
        document.querySelector('#eventActions').style.display = 'none';
    });
    document.querySelector('.cutBooking').addEventListener('click', function () {
        copied = args.e;
        dp.events.remove(args.e);
        document.querySelector('#eventActions').style.display = 'none';
    });
    document.querySelector('.delBooking').addEventListener('click', function () {
        dp.events.remove(args.e);
        document.querySelector('#eventActions').style.display = 'none';
    });
    document.querySelector('.dupBooking').addEventListener('click', function () {});
};

dp.onTimeRangeRightClick = function (args) {};

dp.onBeforeCellRender = function (args) {
    //highlight today's column
    if (args.cell.start <= DayPilot.Date.today() && DayPilot.Date.today() < args.cell.end) {
        args.cell.backColor = "#83D6DE";
    }
    // let blur = false
    var firmAvailableHours = 8;
    // var weekDay = weekdays[args.cell.start.getDayOfWeek()];
    // utilization color
    var utilization = args.cell.utilization("total");

    var visibleUtilization = utilization > 0;
    // if (args.cell.start.getDayOfWeek() === 0 || args.cell.start.getDayOfWeek() === 6)
    //   visibleUtilization = false

    // cell bar color
    var bgColor = '';
    var utilizationText = '';
    var utilizationHrs = 0;
    if (utilization > firmAvailableHours) {
        bgColor = 'rgba(192,80,77,10)';
        utilizationHrs = utilization - firmAvailableHours;
        utilizationText = 'over';
    } else if (utilization == firmAvailableHours) {
        bgColor = 'rgba(155,187,89,10)';
        utilizationText = 'ok';
        utilizationHrs = firmAvailableHours;
    } else {
        bgColor = 'rgba(79,129,189,10)';
        utilizationText = 'under';
        utilizationHrs = firmAvailableHours - utilization;
    }
    var blurColor = function blurColor(color) {
        return color.replace('10', '0.3');
    };
    firmAvailableHours = firmAvailableHours > 0 ? firmAvailableHours : '-';
    if (showGrid == 'numbers' && visibleUtilization == true) {
        args.cell.html = "<div class='booking-bg booking-numbers' style='background-color: " + bgColor + ";'><span class='utilization-span'>" + utilizationHrs + "hr " + utilizationText + "</span></div>";
        if (args.cell.start.getDayOfWeek() === 0 || args.cell.start.getDayOfWeek() === 6) {
            args.cell.backColor = "#f9f6ed";
            args.cell.html = "<div class='booking-bg booking-numbers' style='background-color: " + blurColor(bgColor) + ";'></div>";
        }
    } else if (showGrid == 'numbers' && visibleUtilization == false) {
        args.cell.html = "<div class='booking-bg unscheduled-booking'><span>" + firmAvailableHours + "</span></div>";
    }
    if (dp.scale == "Day" && (args.cell.start.getDayOfWeek() === 0 || args.cell.start.getDayOfWeek() === 6)) {
        args.cell.backColor = "#f9f6ed";
    }
};

// adding holidays to the caleneder beore loading
dp.onBeforeTimeHeaderRender = function (args) {
    firmHolidays.forEach(function (holiday) {
        if (args.header.start.value === holiday.startDate && args.header.end.value === holiday.endDate) {
            args.header.html = '<div class="header-holiday">' + holiday.title + '</div>';
            args.header.toolTip = holiday.title + ' ' + args.header.toolTip;
        }
    });
};

// event creating

dp.onTimeRangeSelecting = function (args) {

    document.getElementById('scheduleproMenur').style.display = "none";
    document.getElementById('eventActions').style.display = "none";
    args.right.enabled = true;
    args.left.enabled = true;
    args.allowed = true;
};

dp.onTimeRangeSelected = function (args) {
    $('.schedulepop').removeClass('disabled');

    bookingObj = args;

    document.querySelector('.scheduler_8_shadow_inner').addEventListener('contextmenu', function (e) {
        document.getElementById('scheduleproMenur').style.display = "block";
        var windowWidth = $(window).width();

        $("#scheduleproMenur").css({
            position: "absolute",
            top: e.pageY,
            left: e.pageX <= windowWidth - 300 ? e.pageX : windowWidth - 300,
            zIndex: 999999
        });
        e.preventDefault();
    }, false);

    $('.schedulepop').removeClass('disabled');
    $('.schedulepop').click(function (e) {
        $('#scheduleproMenur').css({ position: "absolute", display: "block", top: e.pageY, left: e.pageX, zIndex: 999999 });
    });

    if (!copied) {
        $('.pasteBooking').addClass('disabled');
    } else {
        $('.pasteBooking').removeClass('disabled');
    }
    $('.pasteBooking').on('click', function (args) {

        //  var selection = this.source;
        var duration = copied.end().getTime() - copied.start().getTime(); // milliseconds
        var newEvent = new DayPilot.Event({
            start: bookingObj.start,
            end: bookingObj.start.addMilliseconds(duration),
            text: copied.text(),
            resource: bookingObj.resource,
            id: DayPilot.guid(),
            total: copied.data.total,
            tags: copied.data.tags });
        dp.events.add(newEvent);
        copied = null;
    });

    //if (document.getElementsByClassName('cellSelectionMenu').length) {
    //  document.getElementsByClassName('cellSelectionMenu').remove();
    //  }

    var el = document.querySelector('.scheduler_8_shadow');
    var elChild = document.createElement('div');
    elChild.className = 'cellSelectionMenu';
    el.prepend(elChild);
    var el2 = document.querySelector('.cellSelectionMenu');
    el2.innerHTML = "<i class='fa fa-ellipsis-v fa-2x' aria-hidden='true'></i>";

    var csm = document.querySelector('.cellSelectionMenu');
    //  csm.addEventListener('click', function(){ customdropMenu.show(args);  });
};

//dp.dynamicEventRenderingCacheSweeping = true;
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

// before event load callback
dp.onBeforeEventRender = function (args) {
    args.data.barHidden = true;
    args.data.barBackColor = 'transparent';
    if (args.data.tags.bookingType == 'vacation') {
        args.data.cssClass = "bookingtype-vacation";
    } else if (args.data.tags.bookingType == 'sickleave') {
        args.data.cssClass = "bookingtype-sickleave";
    } else {
        args.data.cssClass = "bookingtype-schedule";
    }
};

// header columns
// dp.rowHeaderColumns = [{ title: 'Name' }];
dp.treeEnabled = false;

var data = {
    'r1': {
        id: 'r1',
        name: 'resource_1',
        tasks: [{
            id: 'r1_t1',
            name: 'task_1'
        }]
    },
    'r2': {
        id: 'r2',
        name: 'resource_2',
        tasks: [{
            id: 'r2_t1',
            name: 'task_1'
        }, {
            id: 'r2_t2',
            name: 'task_2'
        }]
    }
};

var eventList = [{
    start: "2017-01-04",
    end: "2017-01-09",
    id: "1",
    resource: "r1_t1",
    text: "2's,A Stitch In Time's, 1040, 40 ",
    title: "2's,A Stitch In Time's, 1040, 40 ",
    total: 8,
    tags: {
        bookingType: 'schedule',
        taskType: 1040
    } // custom event property
}, {
    start: "2017-01-06",
    end: "2017-01-12",
    id: "2",
    resource: "r2_t1",
    text: "1's,A Stitch, 1041, 40 ",
    title: "1's,A Stitch, 1041, 40 ",
    total: 13,
    tags: {
        bookingType: 'schedule',
        taskType: 1041
    } // custom event property
}, {
    start: "2017-01-10",
    end: "2017-01-15",
    id: "3",
    resource: "r2_t2",
    text: "1's, branchse, 1043, 50 ",
    title: "1's, branchse, 1043, 50 ",
    total: 6,
    tags: {
        bookingType: 'schedule',
        taskType: 1041
    } // custom event property
}];

var resources = Object.keys(data);
dp.treeEnabled = true;
dp.resources = resources.map(function (resource) {
    return {
        name: data[resource].name,
        id: data[resource].id,
        expanded: true,
        children: data[resource].tasks.map(function (task) {
            return { name: task.name, id: task.id };
        })
    };
});

dp.events.list = eventList;

dp.init();

var addRippleEffect = function addRippleEffect(e) {
    var target = e.target;
    if (target.tagName.toLowerCase() !== 'button') return false;
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');
    return false;
};

document.addEventListener('click', addRippleEffect, false);

$(document).ready(function () {

    $('#setting').click(function (e) {

        $('.ui.sidebar').sidebar('setting', {
            'transition': 'overlay',
            dimPage: true
        }).sidebar("toggle");
        e.preventDefault();
    });
    // $('#addresource-form .item').click(function(e){
    //  e.preventDefault();
    // });
    $('#addresource-submit').click(function () {
        // $('#addresource-form').parent('active visible);

    });

    /* vigfox code */

    var taskList = dp.events.list;
    var taskTitle = '';
    var projectStartDate = new Pikaday({
        field: $("#dateStart")[0],
        theme: 'triangle',
        container: $("#datepikstart")[0]
    }),
        projectEndDate = new Pikaday({
        field: $("#dateEnd")[0],
        theme: 'triangle',
        container: $("#datepikend")[0]
    }),
        eventStartDate = new Pikaday({
        field: $("#edateStart")[0],
        theme: 'triangle',
        container: $("#edatepikstart")[0]
    }),
        eventEndDate = new Pikaday({
        field: $("#edateEnd")[0],
        theme: 'triangle',
        container: $("#edatepikend")[0]
    });

    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
    $(".ui.fluid.dropdown").dropdown({ allowLabels: true });
    $(".close-booking").on("click", function () {
        $('.ui.scheduleproj-modal').modal("hide");
    });
    $('.ui.fluid.dropdown').dropdown({ 'set selected': 'Resource 1,Resource 2' });

    $('.ui.radio.checkbox').checkbox({
        onChange: function onChange() {
            var tval = $(this).val();
            $("div.desc").hide();
            $("#byday" + tval).show();
        },
        onChecked: function onChecked() {
            var tval = $(this).val();
            $("div.desc").hide();
            $("#byday" + tval).show();
        }

    });

    $('.ui.accordion').dropdown({ exclusive: false });
    $('.ui.accordion').accordion();
    $('.draghelp').popup();

    $('#searchClient').search({
        source: taskList,
        searchFields: ['title'],

        onSelect: function onSelect(result, response) {
            taskTitle = result.title;
        }
    });

    var submitProj = $("#submitProject");
    var submitEvent = $("#submitEvent");
    var scheduleEvent = $("#scheduleEvent");
    var scheduleProject = $("#scheduleProject");

    $(scheduleEvent).click(function (event) {

        createBookingModal();
        document.getElementById('scheduleproMenur').style.display = "none";
    });

    $(scheduleProject).click(function (event) {

        scheduleProjectModal();
        document.getElementById('scheduleproMenur').style.display = "none";
    });

    $(submitProj).click(function (event) {

        var bookingHours = parseInt($("#bookingHrs").val()) ? parseInt($("#bookingHrs").val()) : 8,
            bookingTitle = $('#projName').val(),
            projStartDate = $("#dateStart").val(),
            projEndDate = $("#dateEnd").val();

        bookingObj.start = projStartDate ? projStartDate : bookingObj.start;
        bookingObj.end = projEndDate ? projEndDate : bookingObj.end;

        createBooking();
        function createBooking() {
            var newBooking = new DayPilot.Event({
                start: bookingObj.start,
                end: bookingObj.end,
                id: DayPilot.guid(),
                resource: bookingObj.resource,
                text: bookingTitle,
                total: bookingHours,
                color: '#ffffff',
                barBackColor: 'transparent',
                tags: {
                    bookingType: bookingType ? bookingType : 'schedule'
                }
            });
            dp.events.add(newBooking);
            document.getElementById('scheduleproMenur').style.display = "none";
            $('.ui.scheduleproj-modal').modal("hide");
            dp.message('New Task assigned to ' + bookingObj.resource);
            dp.clearSelection();
        }
    });

    // submit event

    $(submitEvent).click(function (event) {
        var bookingHours = parseInt($("#bookingHrs").val()) ? parseInt($("#bookingHrs").val()) : 8,
            eventStartDate = $("#edateStart").val(),
            eventEndDate = $("#edateEnd").val();

        var bookingTitle = $('.dropdown.eventleave').dropdown('get text');
        var bookingType = $('.dropdown.eventleave').dropdown('get value');
        bookingObj.start = eventStartDate ? eventStartDate : bookingObj.start;
        bookingObj.end = eventEndDate ? eventEndDate : bookingObj.end;

        createeBooking();
        function createeBooking() {

            var newBooking = new DayPilot.Event({
                start: bookingObj.start,
                end: bookingObj.end,
                id: DayPilot.guid(),
                resource: bookingObj.resource,
                text: bookingTitle,
                total: bookingHours,
                color: '#ffffff',
                barBackColor: 'transparent',
                tags: {
                    bookingType: bookingType
                }
            });
            dp.events.add(newBooking);
            document.getElementById('scheduleproMenur').style.display = "none";
            $('.ui.event-booking-modal').modal("hide");
            dp.message('New event created');
            dp.clearSelection();
        }
    });

    /* ends vf  here */
});

function createBookingModal() {
    $('.ui.event-booking-modal').modal({
        closable: true,
        blurring: false,
        onApprove: function onApprove() {
            dp.clearSelection();
        },
        onDeny: function onDeny() {
            dp.clearSelection();
            $('#booking-form').form('reset');
        }
    }).modal("show");
}

function scheduleProjectModal() {
    $('.ui.scheduleproj-modal').modal({
        closable: true,
        blurring: false,
        onApprove: function onApprove() {
            dp.clearSelection();
        },
        onDeny: function onDeny() {
            dp.clearSelection();
            $('#booking-form').form('reset');
        }
    }).modal("show");
}

/*  dp.onEventRightClick = function(args) {

    $("#eventActions").css(
              { display:"block",
                position: "absolute",
                top: event.pageY,
                left: event.pageX,
                zIndex: 999999
              }
            );
};*/

// fullscreen
$('#expand-btn').click(function (e) {
    $('#workspace').toggleClass('fullscreen');
    $('#header-menu, #footer').toggleClass('hidden');
    $('#header-menu').addClass('bring-down');

    var workspace = document.querySelector('#workspace');
    if (workspace.classList.contains('fullscreen')) {
        (function () {
            var height = 360;
            var change = setInterval(function () {
                height += 6;
                if (dp.height >= 450) clearInterval(change);else dp.setHeight(height);
            }, 1);
        })();
    } else dp.setHeight(360);
});

// Split Dates and create 2 events
// let splitdate = new Pikaday({
//    field: document.getElementById('split'),
//    container: document.getElementById('split-cal'),
//    onSelect: function(){
//
//      document.querySelector('#eventActions').style.display = "none";
//    },
//    minDate: new Date(),
//    maxDate: new Date("2016-12-31")
// });

/*  custom contextmenu position

  $(".item.dropdown").on('mouseenter mouseleave', function (e) {

        if ($('.menu', this).length) {
          var elm = $('.dropdown', this);
          var off = elm.offset();
          var l = off.left;
            var w = elm.width() + 300;
            var docH = $("#calendar-container").height();
            var docW = $("#calendar-container").width();
            var isEntirelyVisible = (l + w <= docW);
            if (!isEntirelyVisible) {
              $(this).addClass('edge');
            } else {
              $(this).removeClass('edge');
            }
        }
    });*/

// })()
