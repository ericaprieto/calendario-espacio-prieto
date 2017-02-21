function request(url, callback) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
      if(xmlhttp.status == 200) {
        callback(null, xmlhttp.responseText);
      } else if (xmlhttp.status == 400) {
        callback(xmlhttp.status);
      } else {
        alert('something else other than 200 was returned');
      }
    }
  };

  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

request('https://dl.dropboxusercontent.com/u/93148896/espacio_prieto_datas_ocupadas.txt', function(error, content) {
  if(error) {
    console.error(error);
  } else {
    var dates = content.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/gm);
    calendar = new BookingCalendar("calendar", dates);
  }
});