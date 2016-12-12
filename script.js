const dayPilot = new DayPilot.Scheduler('dp')
dayPilot.cssClassPrefix = "dp"
dayPilot.clipBoard = null

// resources related  -------------------------------------------------------------
dayPilot.treeEnabled = true
const resources = dayPilot.resources = [
    {
        name: "Task 1",
        id: "task1",
        expanded: true,
        children: [
            {
                name: "Sulkunte, Sanjath Me",
                id: "sanjath"
            }, {
                name: "Macclean, MaxJ",
                id: "maxj"
            }, {
                name: "Baily, Tom",
                id: "tom"
            }
        ]
    }, {
        name: "Task 2",
        id: "task2",
        expanded: true,
        children: [
            {
                name: "Fallon, Elias ",
                id: "elias"
            }, {
                name: "Hammer, Judy",
                id: "judy"
            }, {
                name: "James, Jimmy",
                id: "jimmy"
            }
        ]
    }
]
//-----------------------------------------------------------------------------------------

//initial headers and rows-------------
dayPilot.startDate = new DayPilot.Date().firstDayOfYear()
dayPilot.days = 400

dayPilot.timeHeaders = [
    {
        groupBy: "Month",
        format: "MMM yyyy"
    }, {
        groupBy: "Cell",
        format: "ddd d"
    }
]
dayPilot.scale = "Day"

dayPilot.separators = [
    {
        color: "red",
        location: new DayPilot.Date()
    }
];

//-------------------------------------------------------------

//predefined events --------------------------------
dayPilot.events.list = [
    {
        start: "2016-01-04",
        end: "2016-01-09",
        id: "1",
        resource: "maxj",
        text: "1's,A Stitch, 1041, 40 ",
        //total: 1, //no of work hours
        barColor: "#9a0"
    }
];

//-------------------------------------------------



//on click and drag to create a new event------------------------
dayPilot.onTimeRangeSelected = args => {
  console.log(args)
    let modal = new DayPilot.Modal()
    modal.top = 160
    modal.width = 300
    modal.opacity = 70
    modal.border = "2px solid rgba(0,0,0,0.2)"
    modal.zIndex = 100
    modal.showHtml()


    const name = document.querySelector("#event-name").value

    const e = new DayPilot.Event({
      start: args.start,
      end: args.end,
      id: DayPilot.guid(),
      resource: args.resource,
      text: name
    })

    dayPilot.events.add(e)
    dayPilot.message("Created")

}
//------------------------


//right click on an event-------------------------------------------
dayPilot.contextMenu = new DayPilot.Menu({
  items: [
    {
      text: "Edit",
      onclick: function() {

      }
    },
    {
      text: "Delete",
      onclick: function() {
        const response = confirm("Are you sure you want to delete?")
        if (response)
          dayPilot.events.remove(this.source)
      }
    },
    {
      text: "Copy",
      onclick: function() {
        dayPilot.clipBoard = this.source
      }
    },
    {
      text: "Select",
      onclick: function() {
        dayPilot.multiselect.add(this.source)
      }
    },
    {
      text: "Re-Assign To",
      items: resources[0].children
    }
  ]
})
//------------------------------------------------------

// right click on empty block---------------------------
dayPilot.contextMenuSelection = new DayPilot.Menu({
  items: [
    {
      text: "paste",
      onclick: function() {
        if (!dayPilot.clipBoard)
          alert("Nothing copied to paste")

        const selection = this.source
        const { clipBoard } = dayPilot
        const duration = clipBoard.end().getTime() - clipBoard.start().getTime()

        const newEvent = new DayPilot.Event({
          start: selection.start,
          end: selection.start.addMilliseconds(duration),
          text: clipBoard.text(),
          resource: selection.resource,
          id: DayPilot.guid()
        })

        dayPilot.events.add(newEvent)
        dayPilot.clipBoard = null
      }
    }
  ]
})
//--------------------------------------------------------

// let modal = new DayPilot.Modal()
// modal.top = 160
// modal.width = 300
// modal.opacity = 70
// modal.border = "2px solid rgba(0,0,0,0.2)"
// modal.zIndex = 100
// modal.showHtml(`
//   <div>Hello</div>
//   <div>there</div>
//   `)

// dayPilot.bubble = new DayPilot.Bubble({
//
//   }
// })

dayPilot.cellWidth = 50
dayPilot.headerHeight = 40
dayPilot.rowHeight = 40
dayPilot.eventHeight = 40


// function gridCalendarHeight() {
//   var calendarContainer = document.querySelector('#calendar-container');
//   var footer = document.querySelector('.footer')
//   var windowHeight = window.innerHeight;
//
//   var getOffsetTop = function(el) {
//     return el.getBoundingClientRect().top + window.scrollY;
//   };
//
//   var totalHeight = calendarContainer.style.height +
//                     getOffsetTop(calendarContainer) +
//                     footer.style.height;
//
//   if (totalHeight >= windowHeight) {
//     dp.heightSpec = 'Fixed';
//     dp.height = windowHeight - getOffsetTop(calendarContainer) - footer.style.height - 80;
//     dp.update();
//   }
// }

dayPilot.init()
