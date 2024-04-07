//-----кнопка сохранить авиакомпанию в базе ----------------------------
$('#AirlineForm').submit(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'AirlineList',
      Request: 'Save',
      CompanyName: $("#CompanyName").val(),
      CompanyClass: $("#CompanyClass").val(),
      CompanyInfo: $("#CompanyInfo").val()},
    success: function(data){
      info = data[1];
      alert(info)
      modal.style.display = "none";
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'html',
        data: {switсh: 'AirlineList', Request: 'Get'},
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


