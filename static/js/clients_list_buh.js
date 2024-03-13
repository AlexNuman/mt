// ------ появление элементов управления при наведении мыщи----
$('#clients_list_buh tr').mouseenter(function(){
  var InfoBtn = $("<img id='InfoBtn' src='/static/img/info_btn.png' alt='Инфо' class='info_btn'>");
  var CommentBtn = $("<img id='CommentBtn' src='/static/img/comment_btn.png' alt='Комментарии' class='edit_btn'>");
  var ConfirmBtn = $("<img id='ConfirmBtn' src='/static/img/confirm_btn.png' alt='Подтвердить' class='edit_btn'>");
  var TouristID = this.cells[11].textContent;
  var TourID = this.cells[10].textContent;

  if (this.cells[9].textContent != 'Оплачено') {
    $(this.cells[0]).append(InfoBtn, CommentBtn, ConfirmBtn);
  } else {
    $(this.cells[0]).append(InfoBtn, CommentBtn);
  };
//-----------при нажатии инфо -------//
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
      data: {switсh: 'ClientInfo', Tourist: TouristID},
      success: function(data){
        TourList = data;
        $('#ModalInfoBlock').html(TourList);
      }
    });
  });
  //-----------при нажатии комментарии -------//
  $('#CommentBtn').click(function(){
    modal.style.display = "block";
    ModalWindow.style.width = "340px";
    ModalWindow.style.height = "230px";
    $("#InfoHead h2").text('Добавить комментарии');
    $("#InfoHead h2").css('font-size', '14pt');
    $('#ModalInfoBlock').css({
      'color': 'black',
      'display': 'block',
      'flex-direction': 'row',
      'justify-content': 'space-around'
    });
    var CommentLabel = $("<label for='CommentField'>Текст (макс 500 символов):</label>");
    var CommentField= $("<textarea id='CommentField'></textarea>");
    var SaveBtn = $("<input type='submit' id='SaveBtn' class='SaveBtn' value='Сохранить'>");
    var CancelBtn = $("<div class='CancelBtn' id='CancelBtn'>Отмена</div>");
    $('#ModalInfoBlock').empty();
    $('#ModalInfoBlock').append(CommentLabel);
    $('#ModalInfoBlock').append(CommentField);
    $('#ModalInfoBlock').append(SaveBtn);
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
      data: {switсh: 'ClientsList', TouristID: TouristID, Type: 'comment'},
      success: function(data){
        InfoData = data[1];
        $('#CommentField').text(InfoData);
      }
    });
   //----нажатие кнопки сохранить ---------
    $('#SaveBtn').click(function(){
      var Comment = $('#CommentField').val();
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'json',
        data: {switсh: 'ClientsList', TouristID: TouristID, Type: 'CommentSave', comment: Comment},
        success: function(data){
          InfoData = data[1];
          alert(InfoData);
          modal.style.display = "none";
        }
      });
    });
  });
//-----------при нажатии подтвердить -------//
  $('#ConfirmBtn').click(function(){
    var PayConfirm = confirm('Вы подтверждаете оплату?');
    if (PayConfirm == true) {
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
            data: {switсh: 'ClientsList', Type: 'buh'},
            success: function(data){
              UsersList = data;
              $('#info_reciever').html(UsersList);
            }
          });
        }
      });
    } else {
      modal.style.display = "none";
    };
  });
//---при выходе курсора мыщи из объекта//
  }).mouseleave(function(){
    $(this.cells[0]).empty();
  });
/*----Окрашивание таблицы---------*/
$('#clients_list_buh td').each(function(){
  var x = $(this).text();
  if (x == 'Оплачено') $(this).css({color: 'green'});
  if (x == 'off-line') $(this).css({color: 'grey'});
  if (x == 'Не оплачен') $(this).css({color: 'red'});
});
/*--------------------------------------------*/
//-------------Фильтр списка клиентов------------------------------------
var select = document.getElementById("ListChoose");
select.addEventListener("change", function(){
  var val = this.options[this.selectedIndex].text;
  if (val=='Оплаченные') {
    sorting='Paid';
  } else if (val=='Не оплаченные') {
    sorting='NotPaid';
  } else if (val=='Все туристы') {
    sorting='All';
  } else{
    sorting='none';
  };
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'ClientsList', Type: 'buh', sort: sorting},
    success: function(data){
      UsersList = data;
      $('#info_reciever').html(UsersList);
    }
  });
});
//---------------------------------------------------------------------
/*
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

*/

