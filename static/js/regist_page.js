var TourData;
$('#regist_form').submit(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'UserCreate',
      GetName: $("#fio_regist").val(),
      GetBirth: $("#birth_regist").val(),
      GetAdress: $("#adress_regist").val(),
      GetEmail: $("#email_regist").val(),
      GetTel: $("#user_tel").val(),
      GetLogin: $("#login_regist").val(),
      GetPass: $("#pass").val(),
      GetType: $("#user_type").val()},
    success: function(data){
      info = data[1];
      alert(info)
      modal.style.display = "none";
        $.ajax({
          url: '/ajax-server/',
          method: 'get',
          dataType: 'html',
          data: {switсh: 'UsersList'},
          success: function(data){
            UsersList = data;
            $('#info_reciever').html(UsersList);
          }
        });
    }
  });
  return false;
})

if ($('#user_type_label').text()=='Кабинет администратора') {
  $("#user_type option[value='СУПЕРАДМИН']").remove();
} else {
};