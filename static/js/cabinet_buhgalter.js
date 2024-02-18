var modal = document.getElementById('ModalWindow');
var span = document.getElementsByClassName("close")[0];
var ModalWindow = document.getElementsByClassName("ModalWindow")[0];

/*кнопка х---------*/
span.onclick = function() {
  modal.style.display = "none";
};
/*------------------------------------------------------------------*/
/*--------------скрипт вызова списка клиентов----------------------*/
var ClientsBtn = document.getElementById("ClientsBtn");
var UsersList;
ClientsBtn.onclick = function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'ClientsList'},
    success: function(data){
      UsersList = data;
      $('#info_reciever').html(UsersList);
    }
  });
};
/*------------------------------------------------------------------*/
/*----------кнопка Информация---------------------------------------------*/
var InfoBtn = document.getElementById('InfoBtn');
InfoBtn.onclick = function() {
  modal.style.display = "block";
  ModalWindow.style.width = "340px";
  ModalWindow.style.height = "420px";
  $("#InfoHead h2").text('Информация');
  $("#InfoHead h2").css('font-size', '14pt');
  $('#ModalInfoBlock').html('Нет информации');
};
/*-------------------------------------------------------------------*/
/*--------------скрипт настройки----------------------*/
var StngsBtn = document.getElementById("StngsBtn");
StngsBtn.onclick = function() {
  modal.style.display = "block";
  ModalWindow.style.width = "340px";
  ModalWindow.style.height = "420px";
  $("#InfoHead h2").text('Настройки');
  $("#InfoHead h2").css('font-size', '14pt');
  $('#ModalInfoBlock').html('Нет доступа');
};
/*------------------------------------------------------------------*/
/*--------------скрипт настройка пользователя----------------------*/
var UserWindowBtn = document.getElementById('UserWindowBtn');
var UsersInfo;
UserWindowBtn.onclick = function() {
  modal.style.display = "block";
  ModalWindow.style.width = "340px";
  ModalWindow.style.height = "420px";
  $("#InfoHead h2").text('Информация о пользователе');
  $("#InfoHead h2").css('font-size', '14pt');
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'userinfo'},
    success: function(data){
      UserInfo = data;
      $('#ModalInfoBlock').html(UserInfo);
    }
  });
};
/*------------------------------------------------------------------*/
/*------кнопка выйти--------*/
var LogOut = document.getElementById("LogOut");
LogOut.onclick = function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'LogOut'},
    success: function(data){
      TouristList = data;
      location.reload();
    }
  });
};
/*-------------------------------------------------------------------*/


