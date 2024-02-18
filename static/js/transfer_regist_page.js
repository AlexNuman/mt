//-----кнопка сохранить гостиницу в базе ----------------------------
$('#TransferForm').submit(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'TransferData',
      transport_type: $("#TransportType").val(),
      transport_quality: $("#TransportQuality").val(),
      transfer_seats: $("#TransferSeats").val(),
      transport_info: $("#TransportInfo").val()},
    success: function(data){
      info = data[1];
      alert(info)
      modal.style.display = "none";
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'html',
        data: {switсh: 'TransferList'},
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


