//----кнопка добававить туриста ------------------------------------
var AddNewTourist = document.getElementById('add_new_tourist');
AddNewTourist.onclick = function() {
  $("#InfoHead h2").text('Добавить туриста');
  $("#InfoHead h2").css('font-size', '14pt');
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'AddNewTouristBtn', TourId: $("#tour_id").text()},
    success: function(data){
      Info = data;
      modal.style.display = "block";
      ModalWindow.style.width = "340px";
      ModalWindow.style.height = "820px";
      $('#ModalInfoBlock').empty();
      $('#ModalInfoBlock').html(Info);
    }
  });
};
//------Нажатие на кнопку информаиця-----------------------------
var OpenInfo = document.getElementById('OpenInfo');
var CloseInfo = document.getElementById('CloseInfo');
OpenInfo.onclick = function() {
  $( "#TourInfoContainer" ).css({
    'width': '510px',
    'height': '750px',
	'border-radius': '5px',
	'border': 'groove 3px',
    'color': 'rgb(88, 68, 68)',
    '-webkit-transition': '.5s ease-in-out',
    '-moz-transition': '.5s ease-in-out',
    '-o-transition': '.5s ease-in-out',
    'transition': '.5s ease-in-out',
    'cursor': 'pointer',
    'display': 'absolute',
    'text-decoration': 'none',
    'font-size': '12pt',
    'color': 'black'
  });
  $("#OpenInfo").css('display', 'none');
  $("#CloseInfo").css('display', 'grid');
  $("#TourInfoData").delay(500).fadeIn(500);
};
CloseInfo.onclick = function() {
  $( "#TourInfoContainer" ).css({
    'width': '28px',
    'height': '25px',
	'border-radius': '5px',
	'border': 'groove 3px',
    'color': 'rgb(88, 68, 68)',
    '-webkit-transition': '.5s ease-in-out',
    '-moz-transition': '.5s ease-in-out',
    '-o-transition': '.5s ease-in-out',
    'transition': '.5s ease-in-out',
    'cursor': 'pointer',
    'display': 'absolute',
    'text-decoration': 'none'
  });
  $("#OpenInfo").css('display', 'grid');
  $("#CloseInfo").css('display', 'none');
  $("#TourInfoData").fadeOut(500);
};

//-----------Подсчет цен ---------------------------------//

//--срабатывает на клик по документу----//
$(document).ready(function(){
  document.onclick = function() {
// выбор галочки виза-------------------------------------
    if ($('#visa_choose').prop('checked')) {
      visa = 0;
    } else {
      visa = Number($('#VisaPay').html());
    };
// выбор галочки трансфер -------------------------------------
    if ($('#transfer_choose').prop('checked')) {
      transfer = 0;
    } else {
      transfer = Number($('#TransferPay').html());
    };
// выбор галочки дисконт-------------------------------------
    if ($('#discount_choose').prop('checked')) {
      discount = Number($('#Discount').html());
    } else {
      discount = 0;
    };
// подсчет суммы к оплате -------------------------------------
    summary = Number($('#tourist_summary').html());
    $("#checkboxId").prop('checked', false)
    summa = summary - visa - transfer - discount;
    $('#summary_pay').text(summa);
// --------подсчет суммы и задатка к оплате
    $('#tourist_debt').text(summa - Number($('#tourist_pay').val()));
  };
});

// ------ появление элементов управления при наведении мыщи----
$('#tourist_list tr').
  mouseenter(function(){
    // при вхождении в элемент
    var ClientId = this.cells[9].textContent;
    var CommentBtn = $("<img id='CommentBtn' src='/static/img/comment_btn_2.png' alt='Комментарии' class='edit_btn'>");
    var InfoBtn = $("<img id='InfoBtn' src='/static/img/info_btn.png' alt='Инфо' class='info_btn'>");
    var DelBtn = $("<img id='DeleteBtn' src='/static/img/delete_user.png' alt='Удалить' class='del_btn'>");
    var GroupBtn = $("<img id='GroupBtn' src='/static/img/add_group.png' alt='Группа' class='info_btn'>");
    var EditBtn = $("<img id='EditBtn' src='/static/img/person_edit_btn.png' alt='Редактировать' class='info_btn'>");
    if (this.cells[0].textContent!='Действие') {
      $(this.cells[0]).css({
         'cursor': 'pointer'
      }).append(InfoBtn, CommentBtn, DelBtn, GroupBtn, EditBtn);
//----Нажатие кнопки инфо -------------------------------------------------------------
      $('#InfoBtn').click(function(){
        modal.style.display = "block";
        ModalWindow.style.width = "550px";
        ModalWindow.style.height = "600px";
        $('#ModalInfoBlock').empty();
        $("#InfoHead h2").text('Информация туристе');
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
          data: {switсh: 'ClientInfo', Tourist: ClientId},
          success: function(data){
            TourList = data;
            $('#ModalInfoBlock').html(TourList);
          }
        });
      });
      //----Нажатие кнопки редактировать -------------------------------------------------------------
      $('#EditBtn').click(function(){
        $("#InfoHead h2").text('Редактировать туриста');
        $("#InfoHead h2").css('font-size', '14pt');
        $.ajax({
          url: '/ajax-server/',
          method: 'get',
          dataType: 'html',
          data: {switсh: 'ClientsList', TouristID: ClientId, Type: 'TouristEdit'},
          success: function(data){
            Info = data;
            modal.style.display = "block";
            ModalWindow.style.width = "340px";
            ModalWindow.style.height = "720px";
            $('#ModalInfoBlock').empty();
            $('#ModalInfoBlock').html(Info);
          }
        });
      });
//----Нажатие кнопки удалить --------------------------------------------------
      $('#DeleteBtn').click(function(){
        var DeleteTourist = confirm('Точно удалить туриста?');
        if (DeleteTourist == true) {
          $.ajax({
          url: '/ajax-server/',
          method: 'get',
          dataType: 'json',
          data: {switсh: 'TouristDelete', Tourist: ClientId},
          success: function(data){
            InfoData = data[1];
            alert(InfoData);
            modal.style.display = "none";
            $.ajax({
              url: '/ajax-server/',
              method: 'get',
              dataType: 'html',
              data: {switсh: 'TouristList', TourId: $("#tour_id").text()},
              success: function(data){
                TouristList = data;
                $('#info_reciever').html(TouristList);
                modal.style.display = "none";
              }
            });
          }
        });
        } else {
          modal.style.display = "none";
        };
      });
      //-----------при нажатии комментарии -------//
      $('#CommentBtn').click(function(){
        modal.style.display = "block";
        ModalWindow.style.width = "340px";
        ModalWindow.style.height = "200px";
        $("#InfoHead h2").text('Комментарии');
        $("#InfoHead h2").css('font-size', '14pt');
        $('#ModalInfoBlock').css({
          'color': 'black',
          'display': 'block',
          'flex-direction': 'row',
          'justify-content': 'space-around'
        });
        var CommentField= $("<textarea id='CommentField' disabled></textarea>");
        $('#ModalInfoBlock').empty();
        $('#ModalInfoBlock').append(CommentField);
        $('#CommentField').css({
          'width': '300px',
          'height': '100px',
          'resize': 'none'
        });
       //---получение комментария из базы данных----
        $.ajax({
          url: '/ajax-server/',
          method: 'get',
          dataType: 'json',
          data: {switсh: 'ClientsList', TouristID: ClientId, Type: 'comment'},
          success: function(data){
            InfoData = data[1];
            $('#CommentField').text(InfoData);
          }
        });
      });
//----Нажатие кнопки группа -------------
      $('#GroupBtn').click(function(){
        modal.style.display = "block";
        $("#InfoHead h2").text('Создание группы');
        $("#InfoHead h2").css('font-size', '14pt');
        ModalWindow.style.width = "340px";
        ModalWindow.style.height = "400px";
        $.ajax({
          url: '/ajax-server/',
          method: 'get',
          dataType: 'html',
          data: {switсh: 'TouristGroup', Type: 'Read', TouristID: ClientId, TourId: $("#tour_id").text()},
          success: function(data){
            GroupList = data;
            $('#ModalInfoBlock').empty();
            $('#ModalInfoBlock').html(GroupList);
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
/*----Окрашивание таблицы-----------------------------*/
$('#tourist_list td').each(function(){
  var x = $(this).text();
  if (x == 'Оплачено') $(this).css({color: 'green'});
  if (x == 'Не оплачен') $(this).css({color: 'red'});
});
/*----------------------------------------------------*/
/*
//------------------------------------------------------------------
//-------------------Получаем данные таблицы по клику --------------
var active_tours = document.querySelector('#tourist_list');
active_tours.addEventListener('click', MouseClk => {
  const ClkData = MouseClk.target.closest('tr');
  if (!ClkData) return;
  const TableData = ClkData.cells;
  const TouristID = `${TableData[9].textContent}`;
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
  var DelTouristBtn = $("<div class='DelTouristBtn' id='DelTouristBtn'>Удалить туриста</div>");
  var TouristEditBtn = $("<div class='TouristEditBtn' id='TouristEditBtn'>Редактировать </div>");
  $('#ModalInfoBlock').empty();
  $('#ModalInfoBlock').append(DelTouristBtn);
  $('#ModalInfoBlock').append(TouristEditBtn);
//------------------------------------------------------------------------------------------
  $('#DelTouristBtn').css('border', '1px solid transparent');
  $('#ModalInfoBlock').css({
    'color': 'black',
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-around'
  });
  $("#DelTouristBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
	    $( "#DelTouristBtn" ).css({
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
	    $( "#DelTouristBtn" ).css({
	      'border': '1px transparent',
	      'background-color': ''
	    }); // задаем цвет заднего фона
	  });
  $('#TouristEditBtn').css('border', '1px solid transparent');
  $("#TouristEditBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
	    $( "#TouristEditBtn" ).css({
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
	    $( "#TouristEditBtn" ).css({
	      'border': '1px transparent',
	      'background-color': ''
	    }); // задаем цвет заднего фона
	  });
//--------------------------------------------------------------------

//-----Действие при нажатии на кнопку удалить туриста---------------------
  var DelTouristBtn = document.getElementById('DelTouristBtn');
  DelTouristBtn.onclick = function() {
    var DeleteTourist = confirm('Точно удалить туриста?');
    if (DeleteTourist == true) {
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'json',
        data: {switсh: 'TouristDelete', Tourist: TouristID},
        success: function(data){
          InfoData = data[1];
          alert(InfoData);
          modal.style.display = "none";
          $.ajax({
            url: '/ajax-server/',
            method: 'get',
            dataType: 'html',
            data: {switсh: 'TouristList', TourId: $("#tour_id").text()},
            success: function(data){
              TouristList = data;
              $('#info_reciever').html(TouristList);
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
  var TouristEditBtn = document.getElementById('TouristEditBtn');
  TouristEditBtn.onclick = function() {
    $.ajax({
      url: '/ajax-server/',
      method: 'get',
      dataType: 'json',
      data: {switсh: 'TouristEdit', Tourist: TouristIIN},
      success: function(data){
        Tourist = data[1];
        alert(Tourist);
        modal.style.display = "none";
      }
    });
  };
//--------------------------------------------------------------------
});
*/


