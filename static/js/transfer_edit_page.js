//-----кнопка сохранить гостиницу в базе ----------------------------
$('#TransferForm').submit(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'TransferEditSave',
      TransportType: $("#TransportType").val(),
      TransportQuality: $("#TransportQuality").val(),
      TransferSeats: $("#TransferSeats").val(),
      TransportInfo: $("#TransportInfo").val()},
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


