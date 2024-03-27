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
/*-------------------------------------------------------------------------*/
if ($('#user_type_label').text()=='Кабинет администратора') {
  $("#user_type option[value='СУПЕРАДМИН']").remove();
} else {
};
/*-------------------------------------------------------------------------*/
/*---------------Проверка логина------------------------------------------*/
$('#login_regist').keyup(function() {
  var type_login = $('#login_regist').val();
  if (type_login.length < 4 || type_login.length > 20) {
    $('#login_len').css({
    'color': '#A60800',
    'opacity': '0.7'});
  } else {
    $('#login_len').css({
    'color': '#1E786C',
    'opacity': '1.0'});
  };
});
/*-------------------------------------------------------------------------*/
/*---------------Проверка пароля ------------------------------------------*/
$('#pass').keyup(function(){
  var type_pass = $('#pass').val();
  if (type_pass.length < 4 || type_pass.length > 20) {
    $('#pass_len').css({
    'color': '#A60800',
    'opacity': '0.7'});
  } else {
    $('#pass_len').css({
    'color': '#1E786C',
    'opacity': '1.0'});
  };
  if (!/[A-Z]/.test(type_pass) || !/\d/.test(type_pass)) {
    $('#pass_len').css({
    'color': '#A60800',
    'opacity': '0.7'});
} else {
    $('#pass_len').css({
    'color': '#1E786C',
    'opacity': '1.0'});
}
});
/*-------------------------------------------------------------------------*/