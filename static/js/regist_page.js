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
  var check_login;
  if (type_login.length < 4 || type_login.length > 20) {
    $('#login_regist').css({
    'background-image': 'url("/static/img/cancel.png")',
    'background-repeat': 'no-repeat',
    'padding-right': '5px',
    'background-size': '20px 20px',
    'background-position': 'right',
    'transition': 'background-image 0.25s ease-in-out 0.1s'});
    check_login = '0';
  } else {
    $('#login_regist').css({
    'background-image': 'url("/static/img/ok.png")',
    'background-repeat': 'no-repeat',
    'padding-right': '5px',
    'background-size': '20px 20px',
    'background-position': 'right',
    'transition': 'background-image 0.25s ease-in-out 0.1s'});
    check_login = '1';
  };
  if (type_login === "") {
    $("#login_regist").css("background-image", "none");
  };
});
/*-------------------------------------------------------------------------*/
/*---------------Проверка пароля ------------------------------------------*/
$('#pass').keyup(function(){
  var type_pass = $('#pass').val();
  var check_pass;
  if (isStrongPassword(type_pass) == true && type_pass.length >= 8) {
    $('#pass').css({
    'background-image': 'url("/static/img/ok.png")',
    'background-repeat': 'no-repeat',
    'padding-right': '5px',
    'background-size': '20px 20px',
    'background-position': 'right',
    'transition': 'background-image 0.25s ease-in-out 0.1s'});
    check_pass = 1;
    if (check_login == '1') {
      $('#button_regist').removeAttr('disabled');
    };
  } else if (isStrongPassword(type_pass) == false && type_pass.length < 8) {
    $('#pass').css({
    'background-image': 'url("/static/img/cancel.png")',
    'background-repeat': 'no-repeat',
    'padding-right': '5px',
    'background-size': '20px 20px',
    'background-position': 'right',
    'transition': 'background-image 0.25s ease-in-out 0.1s'});
    check_pass = 0;
    $('#button_regist').attr('disabled', 'true');
  };
  if (type_pass === "") {
    $("#pass").css("background-image", "none");
    $('#button_regist').attr('disabled', 'true');
  };
});

/*-------------------------------------------------------------------------*/
function isStrongPassword(password) {
    // Проверка наличия хотя бы одной цифры
  const hasDigit = /[0-9]/.test(password);
  // Проверка наличия хотя бы одной буквы в верхнем регистре
  const hasUppercase = /[A-Z]/.test(password);
  // Проверка наличия хотя бы одной буквы в нижнем регистре
  const hasLowercase = /[a-z]/.test(password);
  // Проверка наличия хотя бы одного специального символа
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/.test(password);

  // Пароль считается сильным, если выполняются все условия
  return hasDigit && hasUppercase && hasLowercase && hasSpecialChar;
};



