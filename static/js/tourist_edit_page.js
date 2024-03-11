//-----кнопка сохранить туриста в базе ----------------------------
$('#TouristEditForm').submit(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'ClientsList',
      Type: 'TouristEditSave',
      TouristFIO: $("#fio_tourist").val(),
      TouristBirth: $("#birth_tourist").val(),
      TouristAdress: $("#adress_tourist").val(),
      TouristIIN: $("#tourist_IIN").val(),
      TouristPassNum: $("#passport_n").val(),
      TouristPassEx: $("#passport_ex").val(),
      TouristTel: $("#tourist_tel").val(),
      TouristRoom: $("#room_choose").val(),
      TouristFood: $("#FoodChoose").val(),
      TouristPay: $("#tourist_pay").val()},
    success: function(data){
      info = data[1];
      alert(info)
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




