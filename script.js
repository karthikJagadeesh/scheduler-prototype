  const showGrid = 'numbers'
  const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

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
    { groupBy: 'Month', format: 'MMMM yyyy' },
    { groupBy: 'Cell', format: 'ddd d' }
  ]
  dp.separators = [
      { color: "red", location: new DayPilot.Date(),  width:2 }
  ];

  dp.heightSpec = "Max";
  dp.height = 360;
  dp.width = '98%';

  dp.businessBeginsHour = 10
  dp.businessEndsHour = 18

  //Navigate toolbar Handlers
  // - change Time Headers view to Days, Weeks, Months, Year
  document.querySelector('#show-hours').addEventListener('click', () => {
    dp.scale = "Manual";
    dp.timeline = [];
    dp.timeHeaders = [
      { groupBy: 'Day', format: 'dddd, MMM dd'},
      { groupBy: 'Hour' }
    ]
    dp.scale = 'Hour'
    dp.days = 100
    dp.update()
  })
  document.querySelector('#show-days').addEventListener('click', () => {
    dp.timeHeaders = [
      { groupBy: 'Month', format: 'MMMM yyyy' },
      { groupBy: 'Cell', format: 'ddd d' }
    ]
    dp.scale = 'Day'
    dp.days = 900
    dp.update()
  })
  document.querySelector('#show-weeks').addEventListener('click', () => {
    dp.timeHeaders = [
      { groupBy: 'Month', format: 'MMMM yyyy' },
      { groupBy: 'Week' }
    ]
    dp.scale = 'Week'
    dp.days = 900
    dp.update()
  })
  document.querySelector('#show-months').addEventListener('click', () => {
    dp.timeHeaders = [
      { groupBy: 'Year', format: 'yyyy' },
      { groupBy: 'Cell', format: 'MM' }
    ]
    dp.scale = 'Month'
    dp.days = 900
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
    scroll(1, 7, 21, 1)
    if (dp.getViewPort().end.addDays(-1).value === dp.getDate().value) {
      dp.days += 100
      dp.scrollTo(dp.getDate(dp.getScrollX()).addDays(-100))
      dp.update()
    }
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

  const addResourceForm = document.querySelector('#add-resource-form')
  addResourceForm.addEventListener('submit', function(event) {
    event.preventDefault()

    const firstName = event.target[0].value
    const lastName = event.target[1].value

    if (firstName !== '' && lastName !== '') {
      dp.resources.unshift({
        name: `${firstName} ${lastName}`,
        id: `${firstName}`
      })
      dp.message("Added new Resource")
    }

    event.target[0].value = ''
    event.target[1].value = ''
    dp.update()

  })

  const cellHeights = {
    '#xtrasmall': 30,
    '#small': 40,
    '#medium': 50,
    '#large': 70,
    '#xtralarge': 100,
  }
  const heightKeys = Object.keys(cellHeights)
  for (let i=0; i < heightKeys.length; i++) {
    document.querySelector(heightKeys[i]).addEventListener('click', () => {
      dp.eventHeight = cellHeights[heightKeys[i]]
      dp.update()
    })
  }

  dp.onBeforeCellRender = args => {
    //highlight today's column
    if (args.cell.start <= DayPilot.Date.today() && DayPilot.Date.today() < args.cell.end) {
        args.cell.backColor = "#83D6DE";
    }

    let firmAvailableHours = 8;
    // var weekDay = weekdays[args.cell.start.getDayOfWeek()];
    // utilization color
    var utilization = args.cell.utilization("total");

    var visibleUtilization = utilization > 0

    // cell bar color
    var bgColor = '';
    var utilizationText = '';
    var utilizationHrs = 0;
    if (utilization > firmAvailableHours) {
        bgColor = '#c0504d';
        utilizationHrs = utilization - firmAvailableHours;
        utilizationText = 'over';
    } else if (utilization == firmAvailableHours) {
        bgColor = '#9bbb59;';
        utilizationText = 'ok';
        utilizationHrs = firmAvailableHours;
    } else {
        bgColor = '#4F81BD;';
        utilizationText = 'under';
        utilizationHrs = firmAvailableHours - utilization;
    }

    firmAvailableHours = firmAvailableHours > 0 ? firmAvailableHours : '-';

    // showing numbers only
    if (showGrid == 'numbers' && visibleUtilization == true) {
        args.cell.html = "<div class='booking-bg booking-numbers' style='background-color: " + bgColor + ";'><span class='utilization-span'>" + utilizationHrs + "hr " + utilizationText + "</span></div>";
    } else if (showGrid == 'numbers' && visibleUtilization == false) {
        args.cell.html = "<div class='booking-bg unscheduled-booking'><span>"+firmAvailableHours+"</span></div>";
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

  dp.onBeforeTimeHeaderRender = function(args) {

  		var firmHolidays = [
  			{ startDate: '2017-03-25T00:00:00', endDate:'2017-03-26T00:00:00', title: 'Good Friday'},
  			{ startDate: '2017-01-26T00:00:00', endDate:'2017-01-27T00:00:00', title: 'Republic Day'},
  			{ startDate: '2017-01-05-01T00:00:00', endDate:'2017-05-02T00:00:00', title: 'Worker Day'},
  			{ startDate: '2017-08-15T00:00:00', endDate:'2017-08-16T00:00:00', title: 'Independence Day'},
  			{ startDate: '2017-09-05T00:00:00', endDate:'2017-09-06T00:00:00', title: 'Teachers Day'},
  		];
  		for(var i=0; i< firmHolidays.length; i++ ){
  		   if (args.header.start == firmHolidays[i].startDate && args.header.end  ==  firmHolidays[i].endDate ) {
  				args.header.cssClass = "firm-holiday";
  				args.header.toolTip =  firmHolidays[i].title +" " + args.header.toolTip;
  		    }
  		}
  };

  // event creating

  dp.onTimeRangeSelecting = function(args) {

        document.getElementById('scheduleproMenur').style.display= "none";
        document.getElementById('eventActions').style.display= "none";
        args.right.enabled = true;
        args.left.enabled = true;
        args.allowed = true;

  };

dp.onTimeRangeSelected = function (args) {

    bookingObj = args;


    document.querySelector('.scheduler_8_shadow_inner').addEventListener('contextmenu', function(e) {
    document.getElementById('scheduleproMenur').style.display= "block";
    $("#scheduleproMenur").css(
              {
                position: "absolute",
                top: e.pageY,
                left: e.pageX,
                zIndex: 999999
              }
            );
                e.preventDefault();
         }, false);

    $('.schedulepop').removeClass('disabled');
    $('.schedulepop').click(function(e){
        $('#scheduleproMenur').css({  position: "absolute",
        display:"block",
          top: e.pageY,
          left: e.pageX,
          zIndex: 999999});

    });

    if (!copied) { $('.pasteBooking').addClass('disabled'); }else{$('.pasteBooking').removeClass('disabled');}
    $('.pasteBooking').on('click', function(args){

    //  var selection = this.source;
      var duration = copied.end().getTime() - copied.start().getTime(); // milliseconds
      var newEvent = new DayPilot.Event({
        start: bookingObj.start,
        end: bookingObj.start.addMilliseconds(duration),
        text: copied.text(),
        resource: bookingObj.resource,
        id: DayPilot.guid(),
        total: copied.data.total,
        tags: copied.data.tags,  // generate random id
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
  //  csm.addEventListener('click', function(){ customdropMenu.show(args);  });

  };



  //dp.dynamicEventRenderingCacheSweeping = true;
  dp.eventMovingStartEndEnabled = false;
  dp.eventResizingStartEndEnabled = true;
  dp.timeRangeSelectingStartEndEnabled = false;

  // see also DayPilot.Event.data.staticBubbleHTML property
  dp.bubble = new DayPilot.Bubble({
      onLoad: function(args) {
          var ev = args.source, parentElement;
          var noDaysBooked = new DayPilot.Date(ev.data.end).getDay() - new DayPilot.Date(ev.data.start).getDay();
          if (noDaysBooked == 0) noDaysBooked = 1;
          var bookedHrs = ev.data.total;
          args.html = '<div class="bubble-class"> '+ev.text()+ ' '+' : '+ bookedHrs +'  hrs for  '+ noDaysBooked +' day </div>';
      }
  });

  // header columns
  dp.rowHeaderColumns = [{ title: 'Name' }];
  dp.treeEnabled = false;
  dp.resources = [

                  { name : "Resource 1", id : "r1" },
                  { name : "Resource 2", id : "r2" },
                  { name: "Resource 3", id: "r3" },
                  { name: "Resource 4", id: "r4" },
                  { name : "Resource 5", id : "r5" },
                  { name : "Resource 6", id : "r6" }


                 ];
   dp.events.list = [{
                     start: "2016-12-04",
                     end: "2016-12-09",
                     id: "1",
                     resource: "r1",
                     text: "2's,A Stitch In Time's, 1040, 40 ",
                     title: "2's,A Stitch In Time's, 1040, 40 ",

                     total: 8,

                  	tags: { bookingType: 'schedule',  taskType: 1040 } // custom event property
                 }, {
                     start: "2016-12-04",
                     end: "2016-12-09",
                     id: "2",
                     resource: "r2",
                     text: "1's,A Stitch, 1041, 40 ",
                     title: "1's,A Stitch, 1041, 40 ",

                     total: 13,
                     tags: { bookingType: 'schedule',  taskType: 1041 } // custom event property
                 },
                 {
                     start: "2016-12-10",
                     end: "2016-12-15",
                     id: "3",
                     resource: "r2",
                     text: "1's,A Stitch, 1041, 40 ",
                     title: "1's,A Stitch, 1041, 40 ",

                     total: 13,
                     tags: { bookingType: 'schedule',  taskType: 1041 } // custom event property
                 }];



     dp.init();



     const addRippleEffect = function(e) {
         let target = e.target;
         if (target.tagName.toLowerCase() !== 'button') return false;
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

     var picker = new Pikaday({ field: document.getElementById('select-cal') });

      $(document).ready(function() {

        $('#setting').click(function(){
         $('.ui.sidebar').sidebar('setting',{'transition': 'overlay',dimPage: true}).sidebar("toggle");
         e.preventDefault();
        });
        // $('#addresource-form .item').click(function(e){
        //  e.preventDefault();
        // });
        $('#addresource-submit').click(function(){
           // $('#addresource-form').parent('active visible);

        });

        /* vigfox code */

        var taskList = dp.events.list;
        var taskTitle = '';
        var projectStartDate = new Pikaday({
                field: $("#dateStart")[0],
                theme :'triangle',
                container: $("#datepikstart")[0],
            }),

            projectEndDate = new Pikaday({
              field: $("#dateEnd")[0],
              theme :'triangle',
              container: $("#datepikend")[0],
            });

          $('.ui.dropdown').dropdown();
          $('.ui.accordion').accordion();
              $('.draghelp').popup();

          $('#searchClient').search({
              source: taskList,
              searchFields: ['title'],

              onSelect: function(result, response) {
               taskTitle = result.title;
              }
          });

            var scheduleproj = $("#scheduleProject");
            $(scheduleproj).click(function(event) {

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
                 bookingType: bookingType ? bookingType : 'schedule',
                 //taskType: taskType,
               }
             });
           dp.events.add(newBooking);
           document.getElementById('scheduleproMenur').style.display= "none";
           dp.message("Created");
           dp.clearSelection();

               }



            });




/* ends vf  here */

      });

  dp.onEventClick = function(args) {
  $('#scheduleproMenur').css({ display:"none"});
     dp.clearSelection();
        $("#eventActions").css(
                  { display:"block",
                    position: "absolute",
                    top: event.pageY,
                    left: event.pageX,
                    zIndex: 999999
                  }
                );

      $('.copyBooking').on('click', function(){
            copied = args.e;

            $("#eventActions").css(  { display:"none"});
      });
  };

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


$(function () {

    $(".item.dropdown").on('mouseenter mouseleave', function (e) {

        if ($('.menu', this).length) {
          console.log($('.menu', this).length);
            var elm = $('.dropdown', this);

            var off = elm.offset();
            console.log(off);
            var l = off.left;
            var w = elm.width();

            var docH = $("#calendar-container").height();
            var docW = $("#calendar-container").width();

            var isEntirelyVisible = (l + w <= docW);

            if (!isEntirelyVisible) {
              console.log(true);
                $(this).addClass('edge');
            } else {
                $(this).removeClass('edge');
                console.log(false);
            }
        }
    });
});
