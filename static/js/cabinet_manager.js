/*--------------скрипт новый тур----------------------*/
var modal = document.getElementById('ModalWindow');
var hellotxt = document.getElementById("hello_text");
var span = document.getElementsByClassName("close")[0];
var ModalWindow = document.getElementsByClassName("ModalWindow")[0];
var NewTourData;
var info;

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
/*-------------------------------------------------------------------*/
/*--------------скрипт настройка пользователя----------------------*/
var UserWindowBtn = document.getElementById('UserWindowBtn');
var UsersInfo;
UserWindowBtn.onclick = function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'list_userinfo', send_login: 'user'},
    success: function(data){
      UserInfo = data;
      modal.style.display = "block";
      ModalWindow.style.width = "340px";
      ModalWindow.style.height = "440px";
      $('#ModalInfoBlock').empty();
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
