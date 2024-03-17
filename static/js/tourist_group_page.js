//-----кнопка сохранить туриста в базе ----------------------------
$('#TouristGroupForm').submit(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'TouristGroup',
      Type: 'Save',
      FirstPerson: $("#FirstPerson").val(),
      SecondPerson: $("#SecondPerson").val(),
      ThirdPerson: $("#ThirdPerson").val(),
      FourthPerson: $("#FourthPerson").val(),
      TourId: $("#tour_id").text()},
    success: function(data){
      info = data[1];
      alert(info)
      modal.style.display = "none";
    }
  });
  return false;
});
//------------------------------------------------------------------------------------

//-------проверка клиента из базы для группы-------
//---первый турист------
$('#FirstPerson').keyup(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'TouristGroup',
      Type: 'Check',
      TourId: $("#tour_id").text(),
      PersonInfo: $("#FirstPerson").val()},
    success: function(data){
      $('#FirstPersonSpan').text(data[1]);
    }
  });
});
//---второй турист------
$('#SecondPerson').keyup(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'TouristGroup',
      Type: 'Check',
      TourId: $("#tour_id").text(),
      PersonInfo: $("#SecondPerson").val()},
    success: function(data){
      $('#SecondPersonSpan').text(data[1]);
    }
  });
});

///-----третий турист-------
$('#ThirdPerson').keyup(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'TouristGroup',
      Type: 'Check',
      TourId: $("#tour_id").text(),
      PersonInfo: $("#ThirdPerson").val()},
    success: function(data){
      $('#ThirdPersonSpan').text(data[1]);
    }
  });
});
///-----четвертый турист-----
$('#FourthPerson').keyup(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'TouristGroup',
      Type: 'Check',
      TourId: $("#tour_id").text(),
      PersonInfo: $("#FourthPerson").val()},
    success: function(data){
      $('#FourthPersonSpan').text(data[1]);
    }
  });
});



