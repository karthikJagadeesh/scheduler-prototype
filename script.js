// (() => {

const showGrid = 'numbers'
const weekdays = [
    'sun',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat'
]
const firmHolidays = [
    {
        startDate: '2017-04-14T00:00:00',
        endDate: '2017-04-15T00:00:00',
        title: 'Good Friday'
    }, {
        startDate: '2017-01-26T00:00:00',
        endDate: '2017-01-27T00:00:00',
        title: 'Republic Day'
    }, {
        startDate: '2017-03-29T00:00:00',
        endDate: '2017-03-30T00:00:00',
        title: 'Ugadi'
    }, {
        startDate: '2017-08-15T00:00:00',
        endDate: '2017-08-16T00:00:00',
        title: 'Independence Day'
    }, {
        startDate: '2017-05-01T00:00:00',
        endDate: '2017-05-02T00:00:00',
        title: 'May Day'
    }, {
        startDate: '2017-02-10T00:00:00',
        endDate: '2017-02-11T00:00:00',
        title: 'Gandhi Jayanthi'
    }, {
        startDate: '2017-12-25T00:00:00',
        endDate: '2017-12-26T00:00:00',
        title: 'Gandhi Jayanthi'
    }, {
        startDate: '2017-10-20T00:00:00',
        endDate: '2017-10-21T00:00:00',
        title: 'Diwali'
    }
]

let bookingType = '';

var bookingObj = {};
let copied = null;

const dp = new DayPilot.Scheduler("dp")

dp.theme = "scheduler_8"
dp.clipBoard = null

dp.cellWidth = 60
dp.eventHeight = 50
dp.headerHeight = 40
dp.startDate = new DayPilot.Date().firstDayOfMonth()
let cacheStart = dp.startDate
dp.days = 900
dp.cellDuration = 8
dp.scale = 'Day'

dp.timeHeaders = [
    {
        groupBy: 'Month',
        format: 'MMMM yyyy'
    }, {
        groupBy: 'Cell',
        format: 'ddd d'
    }
]

dp.separators = [
    {
        color: "red",
        location: new DayPilot.Date(),
        width: 2
    }
]

dp.heightSpec = "Max";
dp.height = 360;
dp.width = '98%';

dp.businessBeginsHour = 10
dp.businessEndsHour = 18

const picker = new Pikaday({
    field: document.getElementById('select-cal'),
    disableDayFn: function(date) {
        var sun = date.getDay() === 0;
        var sat = date.getDay() === 6;
        return sun + sat;
    },
    onSelect: function() {
        dp.scrollTo(picker.getMoment().format('YYYY-MM-DD'), false, 'middle')
    }
})

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
document.querySelector('#show-hours').addEventListener('click', () => {
    dp.timeHeaders = [
        {
            groupBy: 'Day',
            format: 'dddd, MMM dd'
        }, {
            groupBy: 'Hour'
        }
    ]
    cacheStart = dp.startDate = new DayPilot.Date()
    dp.scale = 'Hour'
    dp.days = 100
    dp.cellWidth = 60
    dp.update()
})
document.querySelector('#show-days').addEventListener('click', () => {
    dp.timeHeaders = [
        {
            groupBy: 'Month',
            format: 'MMMM yyyy'
        }, {
            groupBy: 'Cell',
            format: 'ddd d'
        }
    ]
    cacheStart = dp.startDate = new DayPilot.Date()
    dp.scale = 'Day'
    dp.days = 900
    dp.cellWidth = 60
    dp.update()
})
document.querySelector('#show-weeks').addEventListener('click', () => {
    dp.timeHeaders = [
        {
            groupBy: 'Month',
            format: 'MMMM yyyy'
        }, {
            groupBy: 'Week'
        }
    ]
    cacheStart = dp.startDate = new DayPilot.Date()
    dp.scale = 'Week'
    dp.days = 900
    dp.cellWidth = 60
    dp.update()
})
document.querySelector('#show-months').addEventListener('click', () => {
    dp.timeHeaders = [
        {
            groupBy: 'Year',
            format: 'yyyy'
        }, {
            groupBy: 'Cell',
            format: 'MM'
        }
    ]
    cacheStart = dp.startDate = new DayPilot.Date()
    dp.scale = 'Month'
    dp.days = 900
    dp.cellWidth = 60
    dp.update()
})
document.querySelector('#show-this-week').addEventListener('click', () => {
    dp.timeHeaders = [
        {
            groupBy: 'Month',
            format: 'MMMM yyyy'
        }, {
            groupBy: 'Cell',
            format: 'ddd d'
        }
    ]
    cacheStart = dp.startDate = new DayPilot.Date()
    dp.scale = 'Day'
    dp.days = 7
    dp.startDate = new DayPilot.Date()
    dp.cellWidth = 180
    dp.update()
})
document.querySelector('#show-this-month').addEventListener('click', () => {
    dp.timeHeaders = [
        {
            groupBy: 'Month',
            format: 'MMMM yyyy'
        }, {
            groupBy: 'Cell',
            format: 'ddd d'
        }
    ]
    cacheStart = dp.startDate = new DayPilot.Date()
    dp.scale = 'Day'
    dp.days = 31
    dp.startDate = new DayPilot.Date()
    dp.cellWidth = 60
    dp.update()
})

//Scroll forward, backward and today
const scroll = (...distance) => {
    switch (dp.scale) {
        case 'Hour':
            return dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(distance[0]))

        case 'Day':
            return dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(distance[1]))

        case 'Week':
            return dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(distance[2]))

        case 'Month':
            return dp.scrollTo(dp.getDate(dp.getScrollX()).addMonths(distance[3]))
    }
}

document.querySelector('#scroll-next').addEventListener('click', () => {

    if (dp.getViewPort().end.addDays(-1).value === dp.getDate().value) {
        dp.days += 100
        dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(-100))
        dp.update()
    }
    scroll(1, 7, 21, 1)
})
document.querySelector('#scroll-back').addEventListener('click', () => {

    if (dp.getViewPort().start === cacheStart) {
        cacheStart = dp.startDate = dp.getViewPort().start.addDays(-100)
        dp.days += 100
        dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(100))
        dp.update()
    }

    scroll(-1, -7, -21, -1)
})
document.querySelector('#scroll-today').addEventListener('click', () => {
    // cacheStart = dp.startDate = (new DayPilot.Date()).addDays(-10)
    dp.scrollTo(new DayPilot.Date(), false, 'middle')
    dp.update()
})

// const addResourceForm = document.querySelector('#add-resource-form')
// addResourceForm.addEventListener('submit', function(event) {
//     event.preventDefault()
//
//     const firstName = event.target[0].value
//     const lastName = event.target[1].value
//
//     if (firstName !== '' && lastName !== '') {
//         dp.resources.unshift({name: `${firstName} ${lastName}`, id: `${firstName}`})
//         dp.message("Added new Resource")
//     }
//
//     event.target[0].value = ''
//     event.target[1].value = ''
//     dp.update()
//
// })

const cellHeights = {
    '#xtrasmall': 30,
    '#small': 40,
    '#medium': 50,
    '#large': 70,
    '#xtralarge': 100
}
const heightKeys = Object.keys(cellHeights)

heightKeys.forEach(key => {
  document.querySelector(key).addEventListener('change', () => {
      dp.eventHeight = cellHeights[key]
      dp.update()
  })
})

//View Modes
const modesGroupedLabel = document.querySelector('#label-modes-grouped')
const modesSingleProjectResourceLabel = document.querySelector('#label-modes-single-project-resource')
const modesSingleResourceLabel = document.querySelector('#label-modes-single-resource')
const modesStyle = (...types) => (modesGroupedLabel.style.display = types[0], modesSingleProjectResourceLabel.style.display = types[1], modesSingleResourceLabel.style.display = types[2])
const changeModeTo = mode => {
    if (mode === 'grouped')
        return (dp.treeEnabled = true, dp.resources = [
            {
                name: "Task 1",
                id: "T1",
                expanded: true,
                children: [
                    {
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
                    }
                ]
            }
        ])
    else if (mode === 'singleRowResource')
        return (dp.treeEnabled = false, dp.resources = [
            {
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
            }
        ])
}

document.querySelector('#modes-grouped').addEventListener('click', () => (modesStyle('inline', 'none', 'none'), changeModeTo('grouped'), dp.update()))
document.querySelector('#modes-single-project-resource').addEventListener('click', () => modesStyle('none', 'inline', 'none'))
document.querySelector('#modes-single-resource').addEventListener('click', () => (modesStyle('none', 'none', 'inline'), changeModeTo('singleRowResource'), dp.update()))

const createTwoEvents = (...props) => {

  const newEvent1 = new DayPilot.Event({
      start: props[0]
      , end: props[1]
      , text: props[3].text()
      , resource: props[3].resource()
      , id: DayPilot.guid()
      , total: props[3].data.total
      , tags: props[3].data.tags
  })
  const newEvent2 = new DayPilot.Event({
      start: props[1]
      , end: props[2]
      , text: props[3].text()
      , resource: props[3].resource()
      , id: DayPilot.guid()
      , total: props[3].data.total
      , tags: props[3].data.tags
  })

  dp.events.add(newEvent1)
  dp.events.add(newEvent2)
  dp.update()
}

//Split Dates and create 2 events
const setNewDateRange = args => {
  const { e } = args

  let splitdate = new Pikaday({
     field: document.getElementById('split'),
     container: document.getElementById('split-cal'),
     onSelect: function(date) {
       dp.events.remove(e)
       createTwoEvents(e.start()
       , moment(date).format('YYYY-MM-DD')
       , e.end()
       , e)

       document.querySelector('#eventActions').style.display = 'none'
       splitdate.destroy()
     },
     minDate: new Date(e.start().addDays(1).value),
     maxDate: new Date(e.end().addDays(-1).value)
  })
}

dp.onEventClick = args => {
    
    setNewDateRange(args)

    // $('#scheduleproMenur').css({ display:"none"});
    document.querySelector('#scheduleproMenur').style.display = 'none'
    $("#eventActions").css({display: "block", position: "absolute", top: event.pageY, left: event.pageX, zIndex: 999999});

    document.querySelector('.copyBooking').addEventListener('click', () => {
        copied = args.e;
        document.querySelector('#eventActions').style.display = 'none'
    })
    document.querySelector('.cutBooking').addEventListener('click', () => {
        copied = args.e;
        dp.events.remove(args.e)
        document.querySelector('#eventActions').style.display = 'none'
    })
    document.querySelector('.delBooking').addEventListener('click', () => {
        dp.events.remove(args.e)
        document.querySelector('#eventActions').style.display = 'none'
    })
    document.querySelector('.dupBooking').addEventListener('click', () => {})

}

dp.onTimeRangeRightClick = args => {}

dp.onBeforeCellRender = args => {
    //highlight today's column
    if (args.cell.start <= DayPilot.Date.today() && DayPilot.Date.today() < args.cell.end) {
        args.cell.backColor = "#F9AE74";
    }
    // let blur = false
    let firmAvailableHours = 8;
    // var weekDay = weekdays[args.cell.start.getDayOfWeek()];
    // utilization color
    let utilization = args.cell.utilization("total");

    let visibleUtilization = utilization > 0
    // if (args.cell.start.getDayOfWeek() === 0 || args.cell.start.getDayOfWeek() === 6)
    //   visibleUtilization = false

    // cell bar color
    let bgColor = '';
    let utilizationText = '';
    let utilizationHrs = 0;
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
    const blurColor = color => color.replace('10', '0.3')
    firmAvailableHours = firmAvailableHours > 0
        ? firmAvailableHours
        : '-';
    if (showGrid == 'numbers' && visibleUtilization == true) {
        args.cell.html = "<div class='booking-bg booking-numbers' style='background-color: " + bgColor + ";'><span class='utilization-span'>" + utilizationHrs + "hr " + utilizationText + "</span></div>";
        if (args.cell.start.getDayOfWeek() === 0 || args.cell.start.getDayOfWeek() === 6) {
            args.cell.backColor = "#f9f6ed"
            args.cell.html = "<div class='booking-bg booking-numbers' style='background-color: " + blurColor(bgColor) + ";'></div>"
        }
    } else if (showGrid == 'numbers' && visibleUtilization == false) {
        args.cell.html = "<div class='booking-bg unscheduled-booking'><span>" + firmAvailableHours + "</span></div>";
    }
    if (dp.scale == "Day" && (args.cell.start.getDayOfWeek() === 0 || args.cell.start.getDayOfWeek() === 6)) {
        args.cell.backColor = "#f9f6ed"
    }

};

//groupConcurrentEvents by vigfox

dp.groupConcurrentEvents = true;
dp.groupConcurrentEventsLimit = 1;  // don't group if there aren't more than 2 overlapping events

dp.onBeforeRowHeaderRender = function(args) {
    var hasExpanded = args.row.groups.expanded().length > 0;
    var hasCollapsed = args.row.groups.collapsed().length > 0;

    if (hasExpanded && hasCollapsed) {
        args.row.areas = [
          {v:"Visible", right: 14, top: 0, height: 12, width: 12, style: "cursor:pointer", html: "", action:"JavaScript", js: function(row) {row.groups.expandAll(); } },
          {v:"Visible", right: 0, top: 0, height: 12, width: 12, style: "cursor:pointer", html: "", action:"JavaScript", js: function(row)
          { row.groups.collapseAll(); } }
        ];
    }
    else if (hasCollapsed) {
        args.row.areas = [
            {v:"Visible", right: 0, top: 0, height: 12, width: 12, style: "cursor:pointer", html: "<i class='pam'>[+]</i>", action:"JavaScript", js: function(row)
            { row.groups.expandAll(); } },
        ];
    }
    else if (hasExpanded) {
        args.row.areas = [

            {v:"Visible", right: 0, top: 0, height: 12, width: 12, style: "cursor:pointer", html: "<i class='pam'>[-]</i>", action:"JavaScript", js: function(row) { row.groups.collapseAll(); } }
        ];
    }
};

  // adding holidays to the caleneder beore loading
  dp.onBeforeTimeHeaderRender = args => {
      firmHolidays.forEach(holiday => {
        if (args.header.start.value === holiday.startDate && args.header.end.value === holiday.endDate) {
            args.header.html = `<div class="header-holiday">${holiday.title}</div>`
            args.header.toolTip = holiday.title + ' ' + args.header.toolTip
        }
    })
}

// event creating

dp.onTimeRangeSelecting = function(args) {

    document.getElementById('scheduleproMenur').style.display = "none";
    document.getElementById('eventActions').style.display = "none";
    args.right.enabled = true;
    args.left.enabled = true;
    args.allowed = true;

};

dp.onTimeRangeSelected = function(args) {
    $('.schedulepop').removeClass('disabled');

    bookingObj = args;

    document.querySelector('.scheduler_8_shadow_inner').addEventListener('contextmenu', function(e) {
        document.getElementById('scheduleproMenur').style.display = "block";
        var windowWidth = $(window).width();

        $("#scheduleproMenur").css({
            position: "absolute",
            top: e.pageY,
            left: e.pageX <= windowWidth - 300
                ? e.pageX
                : windowWidth - 300,
            zIndex: 999999
        });
        e.preventDefault();
    }, false);

    $('.schedulepop').removeClass('disabled');
    $('.schedulepop').click(function(e) {
        $('#scheduleproMenur').css({position: "absolute", display: "block", top: e.pageY, left: e.pageX, zIndex: 999999});

    });

    if (!copied) {
        $('.pasteBooking').addClass('disabled');
    } else {
        $('.pasteBooking').removeClass('disabled');
    }
    $('.pasteBooking').on('click', function(args) {

        //  var selection = this.source;
        var duration = copied.end().getTime() - copied.start().getTime(); // milliseconds
        var newEvent = new DayPilot.Event({
            start: bookingObj.start,
            end: bookingObj.start.addMilliseconds(duration),
            text: copied.text(),
            resource: bookingObj.resource,
            id: DayPilot.guid(),
            total: copied.data.total,
            tags: copied.data.tags, // generate random id
        });
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
};

//dp.dynamicEventRenderingCacheSweeping = true;
dp.eventMovingStartEndEnabled = false;
dp.eventResizingStartEndEnabled = true;
dp.timeRangeSelectingStartEndEnabled = false;

// see also DayPilot.Event.data.staticBubbleHTML property
dp.bubble = new DayPilot.Bubble({
    onLoad: function(args) {
        var ev = args.source,
            parentElement;
        var noDaysBooked = new DayPilot.Date(ev.data.end).getDay() - new DayPilot.Date(ev.data.start).getDay();
        if (noDaysBooked == 0)
            noDaysBooked = 1;
        var bookedHrs = ev.data.total;
        args.html = '<div class="bubble-class"> ' + ev.text() + ' ' + ' : ' + bookedHrs + '  hrs for  ' + noDaysBooked + ' day </div>';
    }
});

  // before event load callback
  dp.onBeforeEventRender = function(args) {
          args.data.barHidden = true;
          args.data.barBackColor = 'transparent';
         if( args.data.tags.bookingType == 'vacation'){
          	args.data.cssClass = "bookingtype-vacation";
          }
          else if(args.data.tags.bookingType == 'sickleave'){
          	args.data.cssClass = "bookingtype-sickleave";
          }
          else {
              args.data.cssClass = "bookingtype-schedule";
          }
  }

// header columns
// dp.rowHeaderColumns = [{ title: 'Name' }];
dp.treeEnabled = false;

const dataSBC = {
    'r1': {
        id: 'r1',
        name: 'task 1',
        tasks: [
            {
                id: 'r1_t1',
                name: 'resource 1'
            },   {
                  id: 'r1_t2',
                  name: 'resource 2'
              }
        ]
    },
    'r2': {
        id: 'r2',
        name: 'task 2',
        tasks: [
            {
                id: 'r2_t1',
                name: 'resource 1'
            }, {
                id: 'r2_t2',
                name: 'resource 2'
            }
        ]
    }
}
const dataSBE = {
    't1': {
        id: 't1',
        name: 'resource 1',
        resources: [
            {
                id: 't1_r1',
                name: 'task 1'
            }
        ]
    },
    't2': {
        id: 't2',
        name: 'resource 2',
        resources: [
            {
                id: 't2_r1',
                name: 'task 1'
            }, {
                id: 't2_r2',
                name: 'task 2'
            }
        ]
    }
}

const eventListSBE = [
    {
        start: "2017-01-04",
        end: "2017-01-09",
        id: "1",
        resource: "t1_r1",
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
        resource: "t2_r1",
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
        resource: "t2_r2",
        text: "1's, branchse, 1043, 50 ",
        title: "1's, branchse, 1043, 50 ",
        total: 6,
        tags: {
            bookingType: 'schedule',
            taskType: 1041
        } // custom event property
    }
]
const eventListSBC = eventListSBE.map(event => ({
  start: event.start,
  end: event.end,
  id: event.id,
  resource: event.resource.split('_').reverse().join('_'),
  text: event.text,
  title: event.title,
  total: event.total,
  tags: {
      bookingType: event.tags.bookingType,
      taskType: event.tags.taskType
  }
}))

const loadSBE = () => {
  const tasks = Object.keys(dataSBE)
  dp.treeEnabled = true
  dp.resources = tasks.map(task => ({
      name: dataSBE[task].name,
      id: dataSBE[task].id,
      expanded: true,
      children: dataSBE[task].resources.map(resource => ({name: resource.name, id: resource.id}))
  }))
}
loadSBE()

dp.events.list = eventListSBE

const sbeButton = document.querySelector('#sbe-tab')
sbeButton.className = 'item active'
const sbcButton = document.querySelector('#sbc-tab')

sbcButton.addEventListener('click', () => {
  sbcButton.className = 'item active'
  sbeButton.className = 'item'

  const resources = Object.keys(dataSBC)
  dp.treeEnabled = true
  dp.resources = resources.map(resource => ({
      name: dataSBC[resource].name,
      id: dataSBC[resource].id,
      expanded: true,
      children: dataSBC[resource].tasks.map(task => ({name: task.name, id: task.id}))
  }))
  dp.events.list = eventListSBC

  dp.update()
})
sbeButton.addEventListener('click', () => {
  sbeButton.className = 'item active'
  sbcButton.className = 'item'

  loadSBE()
  dp.events.list = eventListSBE

  dp.update()
})

dp.init();

const addRippleEffect = function(e) {
    let target = e.target;
    if (target.tagName.toLowerCase() !== 'button')
        return false;
    let rect = target.getBoundingClientRect();
    let ripple = target.querySelector('.ripple');
    if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    let top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    let left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');
    return false;
}

document.addEventListener('click', addRippleEffect, false);

$(document).ready(function() {

    $('#setting').click(function(e) {

        $('.ui.sidebar').sidebar('setting', {
            'transition': 'overlay',
            dimPage: true
        }).sidebar("toggle");
        e.preventDefault();
    });
    // $('#addresource-form .item').click(function(e){
    //  e.preventDefault();
    // });
    $('#addresource-submit').click(function() {
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
    $(".ui.fluid.dropdown").dropdown({allowLabels: true})
    $(".close-booking").on("click", function() {
        $('.ui.scheduleproj-modal').modal("hide");
    });
    $('.ui.fluid.dropdown').dropdown({'set selected': 'Resource 1,Resource 2'});

    $('.ui.radio.checkbox').checkbox({
        onChange: function() {
            var tval = $(this).val();
            $("div.desc").hide();
            $("#byday" + tval).show();
        },
        onChecked: function() {
            var tval = $(this).val();
            $("div.desc").hide();
            $("#byday" + tval).show();
        }

    });

    $('.ui.accordion').dropdown({exclusive: false});
    $('.ui.accordion').accordion();
    $('.draghelp').popup();

    $('#searchClient').search({
        source: taskList,
        searchFields: ['title'],

        onSelect: function(result, response) {
            taskTitle = result.title;
        }
    });

    var submitProj = $("#submitProject");
    var submitEvent = $("#submitEvent");
    let scheduleEvent = $("#scheduleEvent");
    let scheduleProject = $("#scheduleProject");

    $(scheduleEvent).click(function(event) {

        createBookingModal();
        document.getElementById('scheduleproMenur').style.display = "none";

    });

    $(scheduleProject).click(function(event) {

        scheduleProjectModal();
        document.getElementById('scheduleproMenur').style.display = "none";

    });

    $(submitProj).click(function(event) {

        var bookingHours = parseInt($("#bookingHrs").val())
                ? parseInt($("#bookingHrs").val())
                : 8,
            bookingTitle = $('#projName').val(),
            projStartDate = $("#dateStart").val(),
            projEndDate = $("#dateEnd").val();

        bookingObj.start = projStartDate
            ? projStartDate
            : bookingObj.start;
        bookingObj.end = projEndDate
            ? projEndDate
            : bookingObj.end;

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
                    bookingType: bookingType
                        ? bookingType
                        : 'schedule',
                    //taskType: taskType,
                }
            });
            dp.events.add(newBooking);
            document.getElementById('scheduleproMenur').style.display = "none";
            $('.ui.scheduleproj-modal').modal("hide");
            dp.message(`New Task assigned to ${bookingObj.resource}`);
            dp.clearSelection();

        }

    });

    // submit event

    $(submitEvent).click(function(event) {
        var bookingHours = parseInt($("#bookingHrs").val())
                ? parseInt($("#bookingHrs").val())
                : 8,

            eventStartDate = $("#edateStart").val(),
            eventEndDate = $("#edateEnd").val();

        var bookingTitle = $('.dropdown.eventleave').dropdown('get text');
        var bookingType = $('.dropdown.eventleave').dropdown('get value');
        bookingObj.start = eventStartDate
            ? eventStartDate
            : bookingObj.start;
        bookingObj.end = eventEndDate
            ? eventEndDate
            : bookingObj.end;

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
                    bookingType: bookingType,
                    //taskType: taskType,
                }
            });
            dp.events.add(newBooking);
            document.getElementById('scheduleproMenur').style.display = "none";
            $('.ui.event-booking-modal').modal("hide");
            dp.message(`New event created`);
            dp.clearSelection();

        }
    });

    /* ends vf  here */

});

function createBookingModal() {
    $('.ui.event-booking-modal').modal({
        closable: true,
        blurring: false,
        onApprove: function() {
            dp.clearSelection();
        },
        onDeny: function() {
            dp.clearSelection();
            $('#booking-form').form('reset');
        }
    }).modal("show");
}

function scheduleProjectModal() {
    $('.ui.scheduleproj-modal').modal({
        closable: true,
        blurring: false,
        onApprove: function() {
            dp.clearSelection();
        },
        onDeny: function() {
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
$('#expand-btn').click(function(e) {
    $('#workspace').toggleClass('fullscreen');
    $('#header-menu, #footer, .submenu').toggleClass('hidden');
    $('#header-menu, .submenu').addClass('bring-down');

    const workspace = document.querySelector('#workspace');
    if (workspace.classList.contains('fullscreen')) {
        let height = 360
        const change = setInterval(() => {
            height += 6
            if (dp.height >= 450)
                clearInterval(change)
            else
                dp.setHeight(height)
        }, 1)

    } else
        dp.setHeight(360)
});


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
