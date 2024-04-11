//-----кнопка сохранить туриста в базе ----------------------------
$('#TouristForm').submit(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'TouristData',
      TouristFIO: $("#fio_tourist").val(),
      TouristBirth: $("#birth_tourist").val(),
      TouristAdress: $("#adress_tourist").val(),
      TouristIIN: $("#tourist_IIN").val(),
      TouristPassNum: $("#passport_n").val(),
      TouristPassEx: $("#passport_ex").val(),
      TouristTel: $("#tourist_tel").val(),
      TouristRoom: $("#room_choose").val(),
      TouristFood: $("#FoodChoose").val(),
      TouristPay: $("#tourist_pay").val(),
      TouristDebt: $("#tourist_debt").text(),
      TourId: $("#tour_id").text()},
    success: function(data){
      info = data[1];
      alert(info)
      if (info == 'Турист добавлен!') {
        modal.style.display = "none";
      } else {
        modal.style.display = "block";
      };
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'html',
        data: {switсh: 'TouristList', TourId: $("#tour_id").text()},
        success: function(data){
          TouristList = data;
          $('#info_reciever').html(TouristList);
        }
      });
    }
  });
  return false;
});
//------------------------------------------------------------------------------------
//-------ввод телефона
var input = document.querySelector('#tourist_tel');
// Проверяем фокус
input.addEventListener('focus', () => {
    // Если там ничего нет или есть, но левое
    if (!/^\+\d*$/.test(input.value)) {
        // Вставляем знак плюса как значение
        input.value = '+';
    }
});
// Отменяем ввод не цифр
input.addEventListener('keypress', (e) => {
    if (!/\d/.test(e.key)) {
        e.preventDefault();
    }
});
//--------------------------------------------------------------------------------
//------ввод только цифр в ИИН
var IINinput = document.querySelector('#tourist_IIN');
IINinput.addEventListener('keypress', (e) => {
    if (!/\d/.test(e.key)) {
        e.preventDefault();
    }
});
//-----------------------------------------------------------------------------
//------ввод только цифр в сумму
var IINinput = document.querySelector('#tourist_pay');
IINinput.addEventListener('keypress', (e) => {
    if (!/\d/.test(e.key)) {
        e.preventDefault();
    }
});
//-----------------------------------------------------------------------------
