//-----кнопка сохранить туриста в базе ----------------------------
$('#TouristGroupForm').submit(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'TouristGroup',
      Type: 'Save',
      SecondPerson: $("#SecondPerson").val(),
      ThirdPerson: $("#ThirdPerson").val(),
      FourthPerson: $("#FourthPerson").val(),
      TourId: $("#tour_id").text()},
    success: function(data){
      info = data[1];
      alert(info)
      modal.style.display = "none";
      $.ajax({
      url: '/ajax-server/',
      method: 'get',
      dataType: 'html',
      data: {switсh: 'TouristList', TourId: $("#tour_id").text()},
      success: function(data){
        TouristList = data;
        $('#info_reciever').html(TouristList);
        modal.style.display = "none";
      }
      });
    }
  });
  return false;
});
//------------------------------------------------------------------------------------




