if ($('#user_type_label').text() == 'Менеджер по продажам') {
  $('#TourInfoContainer').css('display', 'none');
} else {

};
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
      ModalWindow.style.width = "400px";
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
    'width': '1200px',
    'height': '600px',
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
    // ------Получение цен из базы данных
    $.ajax({
      url: '/ajax-server/',
      method: 'get',
      dataType: 'json',
      data: {switсh: 'TourSummaryReturn',
        TourId: $("#tour_id").text(),
        RoomChoose: $("#room_choose").val(),
        FoodChoose: $("#FoodChoose").val()},
      success: function(data){
        info = data[1];
        $('#tourist_summary').text(info);
      }
    });
//-------------------------------------------
  //-------расчет общей суммы тура -----------------
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
    var ClientIIN = this.cells[4].textContent;
    var ClientName = this.cells[1].textContent;
    var CommentBtn = $("<span data-tooltip='Комментарий' class ='tooltip'><img id='CommentBtn' src='/static/img/comment_btn_2.png' alt='Комментарии' class='edit_btn'></span>");
    var InfoBtn = $("<span data-tooltip='Информация' class ='tooltip'><img id='InfoBtn' src='/static/img/info_btn.png' alt='Инфо' class='info_btn'></span>");
    var DelBtn = $("<span data-tooltip='Удалить' class ='tooltip'><img id='DeleteBtn' src='/static/img/delete_user.png' alt='Удалить' class='del_btn'></span>");
    var GroupBtn = $("<span data-tooltip='Создать группу' class ='tooltip'><img id='GroupBtn' src='/static/img/add_group.png' alt='Группа' class='info_btn'></span>");
    var EditBtn = $("<span data-tooltip='Редактировать' class ='tooltip'><img id='EditBtn' src='/static/img/person_edit_btn.png' alt='Редактировать' class='info_btn'></span>");
    var VaucherBtn = $("<span data-tooltip='Ваучер' class ='tooltip'><img id='VaucherBtn' src='/static/img/vaucher.png' alt='Ваучер' class='info_btn'></span>");
    if (this.cells[0].textContent!='Действие') {
      $(this.cells[0]).css({
         'cursor': 'pointer'
      }).append(InfoBtn, CommentBtn, DelBtn, GroupBtn, EditBtn, VaucherBtn);
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
            ModalWindow.style.width = "400px";
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
        ModalWindow.style.height = "500px";
        $("#SecondPerson").attr('disabled', 'false');
        $("#ThirdPerson").attr('disabled', 'false');
        $("#FourthPerson").attr('disabled', 'false');
        $("#tourist_group_btn").attr('disabled', 'false');
        $.ajax({
          url: '/ajax-server/',
          method: 'get',
          dataType: 'html',
          data: {switсh: 'TouristGroup', Type: 'Read', TouristID: ClientId, TourId: $("#tour_id").text()},
          success: function(data){
            GroupList = data;
            $('#ModalInfoBlock').empty();
            $('#ModalInfoBlock').html(GroupList);
            if (ClientIIN != $("#FirstPerson").val() && $("#FirstPerson").val() != '') {
              $("#FirstPerson").attr('disabled', 'true');
              $("#SecondPerson").attr('disabled', 'true');
              $("#ThirdPerson").attr('disabled', 'true');
              $("#FourthPerson").attr('disabled', 'true');
              $("#tourist_group_btn").attr('disabled', 'true');
            } else {
            };
            if ($("#FirstPerson").val() == '') {
              $('#FirstPerson').val(ClientIIN);
              $("#FirstPerson").attr('disabled', 'true');
              $("#FirstPersonSpan").text(ClientName);
            } else {
            };
          }
        });
      });
      // ----кнопка нажатие ваучер--------------
      $('#VaucherBtn').click(function(){
        $.ajax({
          url: '/ajax-server/',
          method: 'get',
          dataType: 'html',
          data: {switсh: 'Vaucher', TouristID: ClientId, TourId: $("#tour_id").text()},
          success: function(data){
            InfoData = data;
            var url = '';
            var win = window.open(url, '_blank');
            win.document.write(InfoData);
            win.document.close();
            win.focus();
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

//$("#tourist_tel").mask("+7 (999) 999-9999");
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


