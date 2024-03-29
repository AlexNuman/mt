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
  if (checkLength(type_login)==false) {
    $('#login_regist').css({
    'background-image': 'url("/static/img/cancel.png")',
    'background-repeat': 'no-repeat',
    'padding-right': '5px',
    'background-size': '20px 20px',
    'background-position': 'right',
    'transition': 'background-image 0.25s ease-in-out 0.1s'});
  } else if (checkLength(type_login)==true) {
    $('#login_regist').css({
    'background-image': 'url("/static/img/ok.png")',
    'background-repeat': 'no-repeat',
    'padding-right': '5px',
    'background-size': '20px 20px',
    'background-position': 'right',
    'transition': 'background-image 0.25s ease-in-out 0.1s'});
  };
  if (type_login === "") {
    $("#login_regist").css("background-image", "none");
  };
  if (isStrongPassword($('#pass').val()) == true && checkLength(type_login) == true) {
    $('#button_regist').removeAttr('disabled');
  } else {
    $('#button_regist').attr('disabled', 'true');
  };
});
/*-------------------------------------------------------------------------*/
/*---------------Проверка пароля ------------------------------------------*/
$('#pass').keyup(function(){
  var type_pass = $('#pass').val();
  if (isStrongPassword(type_pass) == true) {
    $('#pass').css({
    'background-image': 'url("/static/img/ok.png")',
    'background-repeat': 'no-repeat',
    'padding-right': '5px',
    'background-size': '20px 20px',
    'background-position': 'right',
    'transition': 'background-image 0.25s ease-in-out 0.1s'});
  } else if (isStrongPassword(type_pass) == false) {
    $('#pass').css({
    'background-image': 'url("/static/img/cancel.png")',
    'background-repeat': 'no-repeat',
    'padding-right': '5px',
    'background-size': '20px 20px',
    'background-position': 'right',
    'transition': 'background-image 0.25s ease-in-out 0.1s'});
  };
  if (type_pass === "") {
    $("#pass").css("background-image", "none");
    $('#button_regist').attr('disabled', 'true');
  };
  if (isStrongPassword(type_pass) == true && checkLength($('#login_regist').val()) == true) {
    $('#button_regist').removeAttr('disabled');
  } else {
    $('#button_regist').attr('disabled', 'true');
  };
});

/*-----------Функция проверки пароля на сложность--------------------------------------------------*/
function isStrongPassword(password) {
  const minLength = 8; // Минимальная длина пароля
  const maxLength = 16; // Максимальная длина пароля
    // Проверка наличия хотя бы одной цифры
  const hasDigit = /[0-9]/.test(password);
  // Проверка наличия хотя бы одной буквы в верхнем регистре
  const hasUppercase = /[A-Z]/.test(password);
  // Проверка наличия хотя бы одной буквы в нижнем регистре
  const hasLowercase = /[a-z]/.test(password);
  // Проверка наличия хотя бы одного специального символа
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/.test(password);
  // Проверка длины пароля
  const lengthValid = password.length >= minLength && password.length <= maxLength;
  // Пароль считается сильным, если выполняются все условия
  return hasDigit && hasUppercase && hasLowercase && hasSpecialChar && lengthValid;
};
/*----------------------------------------------------------------------------*/
/*-------проверка на длину логина/пароля----------*/
function checkLength(TypeWord) {
    const minLength = 6; // Минимальная длина пароля
    const maxLength = 20; // Максимальная длина пароля
    return TypeWord.length >= minLength && TypeWord.length <= maxLength;
}


