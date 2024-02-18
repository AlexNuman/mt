//-----кнопка сохранить гостиницу в базе ----------------------------
$('#HotelForm').submit(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'HotelData',
      HotelName: $("#hotel_name").val(),
      HotelCity: $("#hotel_city").val(),
      HotelStars: $("#hotel_stars").val(),
      HotelInfo: $("#hotel_info").val()},
    success: function(data){
      info = data[1];
      alert(info)
      modal.style.display = "none";
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'html',
        data: {switсh: 'HotelsList'},
        success: function(data){
          UsersList = data;
          $('#info_reciever').html(UsersList);
        }
      });
    }
  });
  return false;
});
//------------------------------------------------------------------------------------
//------------------


