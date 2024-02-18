//----кнопка добавить новый трансфер ------------------------------------
var AddNewTransfer = document.getElementById('add_new_transfer');
AddNewTransfer.onclick = function() {
  modal.style.display = "block";
  ModalWindow.style.width = "400px";
  ModalWindow.style.height = "600px";
  $("#InfoHead h2").text('Добавить трансфер');
  $("#InfoHead h2").css('font-size', '14pt');
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'AddNewTransferBtn'},
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
var TransferList = document.querySelector('#transfer_list');
TransferList.addEventListener('click', MouseClk => {
  const ClkData = MouseClk.target.closest('tr');
  if (!ClkData) return;
  const TableData = ClkData.cells;
  const TransferID = `${TableData[4].textContent}`;
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
  var DelTransferBtn = $("<div class='DelTransferBtn' id='DelTransferBtn'>Удалить трансфер</div>");
  var TransferEditBtn = $("<div class='TransferEditBtn' id='TransferEditBtn'>Редактировать </div>");
  $('#ModalInfoBlock').empty();
  $('#ModalInfoBlock').append(DelTransferBtn);
  $('#ModalInfoBlock').append(TransferEditBtn);
//------------------------------------------------------------------------------------------
  $('#DelTransferBtn').css('border', '1px solid transparent');
  $('#ModalInfoBlock').css({
    'color': 'black',
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-around'
  });
  $("#DelTransferBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
	    $( "#DelTransferBtn" ).css({
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
	    $( "#DelTransferBtn" ).css({
	      'border': '1px transparent',
	      'background-color': ''
	    }); // задаем цвет заднего фона
	  });
  $('#TransferEditBtn').css('border', '1px solid transparent');
  $("#TransferEditBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
	    $( "#TransferEditBtn" ).css({
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
	    $( "#TransferEditBtn" ).css({
	      'border': '1px transparent',
	      'background-color': ''
	    }); // задаем цвет заднего фона
	  });
//-----Действие при нажатии на кнопку удалить трансфер---------------------
  var DelTransferBtn = document.getElementById('DelTransferBtn');
  DelTransferBtn.onclick = function() {
    var DeleteTransfer = confirm('Точно удалить трансфер?');
    if (DeleteTransfer == true) {
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'json',
        data: {switсh: 'TransferDelete', Transfer: TransferID},
        success: function(data){
          InfoData = data[1];
          alert(InfoData);
          modal.style.display = "none";
          $.ajax({
            url: '/ajax-server/',
            method: 'get',
            dataType: 'html',
            data: {switсh: 'TransferList'},
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
  var TransferEditBtn = document.getElementById('TransferEditBtn');
  TransferEditBtn.onclick = function() {
    $.ajax({
      url: '/ajax-server/',
      method: 'get',
      dataType: 'html',
      data: {switсh: 'TransferEdit', Transfer: TransferID},
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