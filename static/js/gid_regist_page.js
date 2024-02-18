//-----кнопка сохранить гида в базе ----------------------------
$('#GidForm').submit(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'GidData',
      GidFIO: $("#fio_gid").val(),
      GidBirth: $("#birth_gid").val(),
      GidAdress: $("#adress_gid").val(),
      GidEmail: $("#email_gid").val(),
      GidTel: $("#tel_gid").val()},
    success: function(data){
      info = data[1];
      alert(info)
      modal.style.display = "none";
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'html',
        data: {switсh: 'GidList'},
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


