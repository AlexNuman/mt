/*--------------скрипт новый тур----------------------*/
var modal = document.getElementById('ModalWindow');
var btn = document.getElementById("NewTourBtn");
var span = document.getElementsByClassName("close")[0];
var ModalWindow = document.getElementsByClassName("ModalWindow")[0];
var NewTourData;
var info;
btn.onclick = function() {
  modal.style.display = "block";
  ModalWindow.style.width = "400px";
  ModalWindow.style.height = "700px";
  $("#InfoHead h2").text('Создание нового тура');
  $("#InfoHead h2").css('font-size', '14pt');
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'newtour'},
    success: function(data){
      NewTourData = data;
      $('#ModalInfoBlock').html(NewTourData);
    }
  });
};
/*кнопка х---------*/
span.onclick = function() {
  modal.style.display = "none";
};
/*------------------------------------------------------------------*/
/*--------------скрипт список активных туров----------------------*/
var UsersBtn = document.getElementById("ActiveTourBtn");
var TourList;
ActiveTourBtn.onclick = function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'ActiveTours'},
    success: function(data){
      TourList = data;
      $('#info_reciever').html(TourList);
    }
  });
};
/*------------------------------------------------------------------*/
/*----------кнопка Архив---------------------------------------------*/
var ArchivBtn = document.getElementById('Archiv');
ArchivBtn.onclick = function() {
  modal.style.display = "block";
  ModalWindow.style.width = "340px";
  ModalWindow.style.height = "420px";
  $("#InfoHead h2").text('Архив');
  $("#InfoHead h2").css('font-size', '14pt');
  $('#ModalInfoBlock').html('Нет архивных данных');
};
/*------------------------------------------------------*/
/*--------------скрипт вызова списка пользователей----------------------*/
var UsersBtn = document.getElementById("UsersBtn");
var UsersList;
UsersBtn.onclick = function() {
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
/*--------------скрипт резевр-1----------------------*/
var ReservBtn_1 = document.getElementById("reservBtn_1");
ReservBtn_1.onclick = function() {
  modal.style.display = "block";
  ModalWindow.style.width = "340px";
  ModalWindow.style.height = "420px";
  $("#InfoHead h2").text('Резерв-1');
  $("#InfoHead h2").css('font-size', '14pt');
  $('#ModalInfoBlock').html('Нет доступа');
};
/*------------------------------------------------------------------*/
/*--------------скрипт резевр-2----------------------*/
var ReservBtn_2 = document.getElementById("reservBtn_2");
ReservBtn_2.onclick = function() {
  modal.style.display = "block";
  ModalWindow.style.width = "340px";
  ModalWindow.style.height = "420px";
  $("#InfoHead h2").text('Резерв-2');
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
