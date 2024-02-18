//-------------------Получаем данные таблицы по клику --------------
var active_tours = document.querySelector('#clients_list');
active_tours.addEventListener('click', MouseClk => {
  const ClkData = MouseClk.target.closest('tr');
  if (!ClkData) return;
  const TableData = ClkData.cells;
  const TouristID = `${TableData[2].textContent}`;
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
  var ConfirmBtn = $("<div class='ConfirmBtn' id='ConfirmBtn'>Подтвердить</div>");
  var CancelBtn = $("<div class='CancelBtn' id='CancelBtn'>Отмена</div>");
  $('#ModalInfoBlock').empty();
  $('#ModalInfoBlock').append(ConfirmBtn);
  $('#ModalInfoBlock').append(CancelBtn);
//------------------------------------------------------------------------------------------
  $('#ConfirmBtn').css('border', '1px solid transparent');
  $('#ConfirmBtn').css({
    'color': 'black',
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-around'
  });
  $("#ConfirmBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
	    $( "#ConfirmBtn" ).css({
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
	    $( "#ConfirmBtn" ).css({
	      'border': '1px transparent',
	      'background-color': ''
	    }); // задаем цвет заднего фона
	  });
  $('#CancelBtn').css('border', '1px solid transparent');
  $("#CancelBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
	    $( "#CancelBtn" ).css({
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
	    $( "#CancelBtn" ).css({
	      'border': '1px transparent',
	      'background-color': ''
	    }); // задаем цвет заднего фона
	  });
//--------------------------------------------------------------------

//-----Действие при нажатии на кнопку подтвердить---------------------
  var ConfirmBtn = document.getElementById('ConfirmBtn');
  ConfirmBtn.onclick = function() {
    $.ajax({
      url: '/ajax-server/',
      method: 'get',
      dataType: 'json',
      data: {switсh: 'TouristConfirm', Tourist: TouristID},
      success: function(data){
        InfoData = data[1];
        alert(InfoData);
        modal.style.display = "none";
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
      }
    });
  };
//--------------------------------------------------------------------
//-----Действие при нажатии на кнопку отменить---------------
  var CancelBtn = document.getElementById('CancelBtn');
  CancelBtn.onclick = function() {
    modal.style.display = "none";
  };
//--------------------------------------------------------------------
});

