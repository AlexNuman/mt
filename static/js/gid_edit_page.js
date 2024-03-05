//-----кнопка сохранить гостиницу в базе ----------------------------
$('#gid_form').submit(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'GidEditSave',
      GidName: $("#GidName").val(),
      GidBirth: $("#GidBirth").val(),
      GidAdress: $("#GidAdress").val(),
      GidEmail: $("#GidEmail").val(),
      GidTel: $("#GidTel").val()},
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