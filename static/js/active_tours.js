///---проверка JS ---------
//---------------------------------------------------------------------------------
/*
//-------------получаем данные из таблицы по клику---------------------------------
var active_tours = document.querySelector('#active_tours');
active_tours.addEventListener('click', MouseClk => {
  const ClkData = MouseClk.target.closest('tr');
  if (!ClkData) return;
  const TableData = ClkData.cells;
  const RowData = `${TableData[12].textContent}`;
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
  var DelTourBtn = $("<div class='DelTourBtn' id='DelTourBtn'>Удалить тур</div>");
  var TouristListBtn = $("<div class='TouristListBtn' id='TouristListBtn'>Список туристов </div>");
  $('#ModalInfoBlock').empty();
  $('#ModalInfoBlock').append(DelTourBtn);
  $('#ModalInfoBlock').append(TouristListBtn);
//------------------------------------------------------------------------------------------
  $('#DelTourBtn').css('border', '1px solid transparent');
  $('#ModalInfoBlock').css({
    'color': 'black',
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-around'
  });
  $("#DelTourBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
	    $( "#DelTourBtn" ).css({
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
	    $( "#DelTourBtn" ).css({
	      'border': '1px transparent',
	      'background-color': ''
	    }); // задаем цвет заднего фона
	  });
  $('#TouristListBtn').css('border', '1px solid transparent');
  $("#TouristListBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
	    $( "#TouristListBtn" ).css({
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
	    $( "#TouristListBtn" ).css({
	      'border': '1px transparent',
	      'background-color': ''
	    }); // задаем цвет заднего фона
	  });
//--------------------------------------------------------------------

//-----Действие при нажатии на кнопку удалить тур---------------------
  var DelTourBtn = document.getElementById('DelTourBtn');
  DelTourBtn.onclick = function() {
    var DeleteTour = confirm('Точно удалить тур?');
    if (DeleteTour == true) {
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'json',
        data: {switсh: 'TourDelete', TourId: RowData},
        success: function(data){
          InfoData = data[1];
          alert(InfoData);
          modal.style.display = "none";
        }
      });
    } else {
      modal.style.display = "none";
    };
  };
//--------------------------------------------------------------------
//-----Действие при нажатии на кнопки список туристов---------------
  var TouristListBtn = document.getElementById('TouristListBtn');
  TouristListBtn.onclick = function() {
    $.ajax({
      url: '/ajax-server/',
      method: 'get',
      dataType: 'html',
      data: {switсh: 'TouristList', TourId: RowData},
      success: function(data){
        TouristList = data;
        $('#info_reciever').html(TouristList);
        modal.style.display = "none";
      }
    });
  };
//--------------------------------------------------------------------
});
*/

// ------ появление элементов управления при наведении мыщи----
$('#active_tours tr').
  mouseenter(function(){
    // при вхождении в элемент
    var TourId = this.cells[12].textContent;
    var InfoBtn = $("<span data-tooltip='Информация' class ='tooltip'><img id='InfoBtn' src='/static/img/info_btn.png' alt='Инфо' class='info_btn'></span>");
    var DelBtn = $("<span data-tooltip='Удалить тур' class ='tooltip'><img id='DeleteBtn' src='/static/img/delete.png' alt='Удалить' class='del_btn'></span");
    var ClientsBtn = $("<span data-tooltip='Список туристов' class ='tooltip'><img id='ClientsBtn' src='/static/img/person_add.png' alt='Добавить' class='group_btn'></span");
    if (this.cells[0].textContent!='Действие') {
      $(this.cells[0]).css({
         'cursor': 'pointer'
      }).append(InfoBtn, DelBtn, ClientsBtn);
//----Нажатие кнопки инфо -------------------------------------------------------------
      $('#InfoBtn').click(function(){
        modal.style.display = "block";
        ModalWindow.style.width = "550px";
        ModalWindow.style.height = "850px";
        $('#ModalInfoBlock').empty();
        $("#InfoHead h2").text('Информация о туре');
        $("#InfoHead h2").css('font-size', '14pt');
        $('#ModalInfoBlock').css({
          'color': 'black',
          'display': 'flex',
          'flex-direction': 'row',
          'justify-content': 'space-around'
        });
        $.ajax({
          url: '/ajax-server/',
          method: 'get',
          dataType: 'html',
          data: {switсh: 'TourInfo', TourId: TourId},
          success: function(data){
            TourList = data;
            $('#ModalInfoBlock').html(TourList);
          }
        });
      });
//----Нажатие кнопки удалить тур--------------------------------------------------
      $('#DeleteBtn').click(function(){
        if ($('#user_type_label').text()=='Менеджер по продажам') {
          alert('У вас нет прав!');
        } else {
          var DeleteTourist = confirm('Точно удалить тур?');
          if (DeleteTourist == true) {
            $.ajax({
              url: '/ajax-server/',
              method: 'get',
              dataType: 'json',
              data: {switсh: 'TourDelete', TourId: TourId},
              success: function(data){
                InfoData = data[1];
                alert(InfoData);
                modal.style.display = "none";
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
              }
            });
          } else {
            modal.style.display = "none";
          };
        };
      });
//----Нажатие кнопки клиенты -------------
      $('#ClientsBtn').click(function(){
        $.ajax({
          url: '/ajax-server/',
          method: 'get',
          dataType: 'html',
          data: {switсh: 'TouristList', TourId: TourId},
          success: function(data){
            TouristList = data;
            $('#info_reciever').html(TouristList);
            modal.style.display = "none";
          }
        });
      });
    };
  }).
  mouseleave(function(){
    // при покидании элемента
    if (this.cells[0].textContent!='Действие') {
      $(this.cells[0]).empty();
    };
  });

