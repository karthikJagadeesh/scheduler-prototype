"use strict";

var dayPilot = new DayPilot.Scheduler('dp');
dayPilot.cssClassPrefix = "dp";

// resources related  -------------------------------------------------------------
dayPilot.treeEnabled = true;
dayPilot.resources = [{
  name: "Task 1", id: "task1", expanded: true, children: [{
    name: "Sulkunte, Sanjath Me",
    id: "sanjath"
  }, {
    name: "Macclean, MaxJ",
    id: "maxj"
  }, {
    name: "Baily, Tom",
    id: "tom"
  }]
}, {
  name: "Task 2", id: "task2", expanded: true, children: [{
    name: "Fallon, Elias ",
    id: "elias"
  }, {
    name: "Hammer, Judy",
    id: "judy"
  }, {
    name: "James, Jimmy",
    id: "jimmy"
  }]
}];
//-----------------------------------------------------------------------------------------

//initial headers and rows-------------
dayPilot.startDate = new DayPilot.Date().firstDayOfYear();
dayPilot.days = 400;

dayPilot.timeHeaders = [{
  groupBy: "Month",
  format: "MMM yyyy"
}, {
  groupBy: "Cell",
  format: "ddd d"
}];
dayPilot.scale = "Day";

dayPilot.separators = [{ color: "red", location: new DayPilot.Date() }];

//-------------------------------------------------------------

dayPilot.events.list = [{
  start: "2016-01-04",
  end: "2016-01-09",
  id: "1",
  resource: "maxj",
  text: "1's,A Stitch, 1041, 40 ",
  total: 13,
  barColor: "#9a0"
}];

dayPilot.onTimeRangeSelected = function (args) {
  var name = prompt("Enter new event name", "Event");
  dayPilot.clearSelection();

  if (!name) return;

  var e = new DayPilot.Event({
    start: args.start,
    end: args.end,
    id: DayPilot.guid(),
    resource: args.resource,
    text: name
  });

  dayPilot.events.add(e);
  dayPilot.message("Created");
};

dayPilot.cellWidth = 50;
dayPilot.headerHeight = 40;
dayPilot.rowHeight = 40;
dayPilot.eventHeight = 40;
//dayPilot.rowMarginTop = 10

dayPilot.init();
