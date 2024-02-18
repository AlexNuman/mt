//----кнопка добавить гостиницу ------------------------------------
var AddNewHotel = document.getElementById('add_new_hotel');
AddNewHotel.onclick = function() {
  modal.style.display = "block";
  ModalWindow.style.width = "400px";
  ModalWindow.style.height = "600px";
  $("#InfoHead h2").text('Добавить гостиницу');
  $("#InfoHead h2").css('font-size', '14pt');
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'AddNewHotelBtn'},
    success: function(data){
      Info = data;
      ModalWindow.style.width = "340px";
      ModalWindow.style.height = "420px";
      $('#ModalInfoBlock').empty();
      $('#ModalInfoBlock').html(Info);
    }
  });
};

//-------------------Получаем данные таблицы по клику --------------
var HotelList = document.querySelector('#hotels_list');
HotelList.addEventListener('click', MouseClk => {
  const ClkData = MouseClk.target.closest('tr');
  if (!ClkData) return;
  const TableData = ClkData.cells;
  const HotelID = `${TableData[4].textContent}`;
//------вызов модального окна, добавление стиля и текса-----------------------
  modal.style.display = "block";
  ModalWindow.style.width = "440px";
  ModalWindow.style.height = "100px";
  $("#InfoHead h2").text('Действие');
  $("#InfoHead h2").css('font-size', '14pt');
  $('#ModalInfoBlock').css({
    'color': 'black',
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-around'
  });
//----добавление кнопок и действиями -----------------
  var DelHotelBtn = $("<div class='DelHotelBtn' id='DelHotelBtn'>Удалить гостиницу</div>");
  var HotelEditBtn = $("<div class='HotelEditBtn' id='HotelEditBtn'>Редактировать </div>");
  $('#ModalInfoBlock').empty();
  $('#ModalInfoBlock').append(DelHotelBtn);
  $('#ModalInfoBlock').append(HotelEditBtn);
//------------------------------------------------------------------------------------------
  $('#DelHotelBtn').css('border', '1px solid transparent');
  $('#ModalInfoBlock').css({
    'color': 'black',
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-around'
  });
  $("#DelHotelBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
	    $( "#DelHotelBtn" ).css({
	      'border': '1px solid',
	      'border-radius': '5px',
          'background-color': 'rgb(202, 193, 235)',
          'color': 'rgb(88, 68, 68)',
          '-webkit-transition': '.5s ease-in-out',
          '-moz-transition': '.5s ease-in-out',
          '-o-transition': '.5s ease-in-out',
          'transition': '.5s ease-in-out',
          'cursor': 'pointer',
          'display': 'absolute',
          'text-decoration': 'none'
	    });
	    }, function(){ // задаем функцию, которая срабатывает, когда указатель выходит из элемента
	    $( "#DelHotelBtn" ).css({
	      'border': '1px transparent',
	      'background-color': ''
	    }); // задаем цвет заднего фона
	  });
  $('#HotelEditBtn').css('border', '1px solid transparent');
  $("#HotelEditBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
	    $( "#HotelEditBtn" ).css({
	      'border': '1px solid',
	      'border-radius': '5px',
          'background-color': 'rgb(202, 193, 235)',
          'color': 'rgb(88, 68, 68)',
          '-webkit-transition': '.5s ease-in-out',
          '-moz-transition': '.5s ease-in-out',
          '-o-transition': '.5s ease-in-out',
          'transition': '.5s ease-in-out',
          'cursor': 'pointer',
          'display': 'absolute',
          'text-decoration': 'none'
	    });
	    }, function(){ // задаем функцию, которая срабатывает, когда указатель выходит из элемента
	    $( "#HotelEditBtn" ).css({
	      'border': '1px transparent',
	      'background-color': ''
	    }); // задаем цвет заднего фона
	  });
//-----Действие при нажатии на кнопку удалить гостиницу---------------------
  var DelHotelBtn = document.getElementById('DelHotelBtn');
  DelHotelBtn.onclick = function() {
    var DeleteHotel = confirm('Точно удалить гостиницу?');
    if (DeleteHotel == true) {
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'json',
        data: {switсh: 'HotelDelete', Hotel: HotelID},
        success: function(data){
          InfoData = data[1];
          alert(InfoData);
          modal.style.display = "none";
          $.ajax({
            url: '/ajax-server/',
            method: 'get',
            dataType: 'html',
            data: {switсh: 'HotelsList'},
            success: function(data){
              HotelsList = data;
              $('#info_reciever').html(HotelsList);
              modal.style.display = "none";
            }
          });
        }
      });
    } else {
      modal.style.display = "none";
    };
  };
//--------------------------------------------------------------------
//-----Действие при нажатии на кнопку редактировать---------------
  var HotelEditBtn = document.getElementById('HotelEditBtn');
  HotelEditBtn.onclick = function() {
    $.ajax({
      url: '/ajax-server/',
      method: 'get',
      dataType: 'html',
      data: {switсh: 'HotelEdit', Hotel: HotelID},
      success: function(data){
        Hotel = data;
        ModalWindow.style.width = "340px";
        ModalWindow.style.height = "420px";
        $('#ModalInfoBlock').empty();
        $('#ModalInfoBlock').html(Hotel);
      }
    });
  };
//--------------------------------------------------------------------
});
//--------------------------------------------------------------------