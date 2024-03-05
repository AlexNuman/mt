/*--------------скрипт новый тур----------------------*/
var modal = document.getElementById('ModalWindow');
var btn = document.getElementById("NewTourBtn");
var hellotxt = document.getElementById("hello_text");
var span = document.getElementsByClassName("close")[0];
var ModalWindow = document.getElementsByClassName("ModalWindow")[0];
var NewTourData;
var info;
btn.onclick = function() {
  hellotxt.style.display = "none";
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'newtour'},
    success: function(data){
      NewTour = data;
      $('#info_reciever').html(NewTour);
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
/*----------кнопка гиды---------------------------------------------*/
var GidBtn = document.getElementById('GidBtn');
GidBtn.onclick = function() {
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
};
/*-------------------------------------------------------------------*/
/*----------кнопка Гостиницы---------------------------------------------*/
var HotelsBtn = document.getElementById('Hotels');
HotelsBtn.onclick = function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'HotelsList'},
    success: function(data){
      UsersList = data;
      $('#info_reciever').html(UsersList);
    }
  });
};
/*-------------------------------------------------------------------*/
/*----------кнопка Трансфер---------------------------------------------*/
var TransferBtn = document.getElementById('Transfer');
TransferBtn.onclick = function() {
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
};
/*-------------------------------------------------------------------*/
/*----------кнопка Список туристов---------------------------------------------*/
var TransferBtn = document.getElementById('ClientsList');
TransferBtn.onclick = function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'AllTouristList'},
    success: function(data){
      UsersList = data;
      $('#info_reciever').html(UsersList);
    }
  });
};
/*-------------------------------------------------------------------*/
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
/*----тест запрос AJAX-------------------
document.onclick = function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'Test'},
    success: function(data){
      InfoData = data[1];
      alert(InfoData);
    }
  });
};
*/

