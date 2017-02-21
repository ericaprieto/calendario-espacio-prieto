function BookingCalendar(div, ocupiedDates) {
  var _currentYear;
  var _currentMonth;
  var _node = document.getElementById(div);
  var _now = new Date();

  function leadingZero(number) {
    return ('0' + number).slice(-2);
  }
  
  function _getTime() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    now = null;
    var ampm = '';
    
    if (hour >= 12) {
      hour -= 12;
      ampm = 'PM';
    } else ampm = 'AM';
    hour = (hour == 0) ? 12 : hour;
    
    if (minute < 10) minute = '0' + minute;
    return hour + ':' + minute + ' ' + ampm;
  }
  
  function _leapYear(year) {
    if (year % 4 == 0) return true;
    return false;
  }
  
  function _getDays(month, year) {
    var ar = new Array(12);
    ar[0] = 31;
    ar[1] = (_leapYear(year)) ? 29 : 28;
    ar[2] = 31;
    ar[3] = 30;
    ar[4] = 31;
    ar[5] = 30;
    ar[6] = 31;
    ar[7] = 31;
    ar[8] = 30;
    ar[9] = 31;
    ar[10] = 30;
    ar[11] = 31;
    
    return ar[month];
  }
  
  function _getMonthName(month) {
    var ar = new Array(12);
    ar[0] = 'Janeiro';
    ar[1] = 'Fevereiro';
    ar[2] = 'Março';
    ar[3] = 'Abril';
    ar[4] = 'Maio';
    ar[5] = 'Junho';
    ar[6] = 'Julho';
    ar[7] = 'Agosto';
    ar[8] = 'Setembro';
    ar[9] = 'Outubro';
    ar[10] = 'Novembro';
    ar[11] = 'Dezembro';
    
    return ar[month];
  }
  
  function _drawCal(firstDay, lastDate) {
    _node.innerHTML = '';

    var firstDay = (new Date(currentYear, currentMonth, 1)).getDay() + 1;
    lastDate = _getDays(currentMonth, currentYear);
  
    var headerHeight = 50;
    var border = 2;
    var cellspacing = 4;
    var headerColor = 'midnightblue';
    var headerSize = '+3';
    var colWidth = 60;
    var dayCellHeight = 25;
    var dayColor = 'darkblue';
    var cellHeight = 40;
    var todayColor = 'red';
    var timeColor = 'purple';
    var monthName = _getMonthName(currentMonth);
  
    var text = '';
    // text += '<CENTER>';
    text += '<TABLE BORDER=' + border + ' CELLSPACING=' + cellspacing + '>';
    text += '<TH COLSPAN=7 HEIGHT=' + headerHeight + '>';
    text += '<h2><a href="javascript:calendar.prev()">&lt;&lt;</a> <span class="title">' + monthName + ' '  + currentYear + '</span> <a href="javascript:calendar.next()">&gt;&gt;</a></h2>';
    text += '</TH>';
  
    var openCol = '<TD WIDTH=' + colWidth + ' HEIGHT=' + dayCellHeight + '>';
    var closeCol = '</TD>';
  
    var weekDay = new Array(7);
    weekDay[0] = 'Dom';
    weekDay[1] = 'Seg';
    weekDay[2] = 'Ter';
    weekDay[3] = 'Qua';
    weekDay[4] = 'Qui';
    weekDay[5] = 'Sex';
    weekDay[6] = 'Sab';
  
    text += '<TR ALIGN="center" VALIGN="center">';
    for (var dayNum = 0; dayNum < 7; ++dayNum) {
      text += openCol + weekDay[dayNum] + closeCol;
    }
    text += '</TR>';
    
    var digit = 1;
    var curCell = 1;
  
    for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row) {
      text += '<TR ALIGN="right" VALIGN="top">';
      for (var col = 1; col <= 7; ++col) {
        if (digit > lastDate) break;
        if (curCell < firstDay) {
          text += '<TD></TD>';
          curCell++;
        } else {
          var currentDate = currentYear + '-' + leadingZero(currentMonth + 1) + '-' + leadingZero(digit);
          var ocupied = ocupiedDates.indexOf(currentDate) > -1;
          text += '<TD HEIGHT=' + cellHeight + ' class="' + (ocupied ? 'ocupied' : 'free') + '">' + digit + '</TD>';
          digit++;
        }
      }
      text += '</TR>';
    }
  
    text += '</TABLE>';
    // text += '</CENTER>';
  
    _node.innerHTML = text;
  }
  
  function _setCal(month, year) { 
    currentMonth = month;
    currentYear = year;
    _drawCal();
  }
  
  function _init() {
    _setCal(_now.getMonth(), _now.getFullYear());
  }
  
  var next = this.next = function() {
    currentMonth++;
    if(currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    _drawCal();
  }
  
  var prev = this.prev = function() {
    currentMonth--;
    if(currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    _drawCal();
  }
  
  _init();
}