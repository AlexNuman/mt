
// ------ появление элементов управления при наведении мыщи----
$('#all_tourist_list tr').mouseenter(function(){
  var CommentBtn = $("<img id='CommentBtn' src='/static/img/comment_btn_2.png' alt='Комментарии' class='edit_btn'>");
  var EditBtn = $("<img id='EditBtn' src='/static/img/person_edit_btn.png' alt='Редактировать' class='edit_btn'>");
  var DelBtn = $("<img id='DeleteBtn' src='/static/img/delete_user.png' alt='Удалить' class='del_btn'>");
  var InfoBtn = $("<img id='InfoBtn' src='/static/img/info_btn.png' alt='Инфо' class='info_btn'>");
  var TouristID = this.cells[10].textContent;
  $(this.cells[0]).append(CommentBtn, DelBtn, EditBtn, InfoBtn);
//-----При нажатии кнопки удалить---------------//
  $('#DeleteBtn').click(function(){
    var DeleteTransfer = confirm('Точно удалить туриста?');
    if (DeleteTransfer == true) {
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
            data: {switсh: 'AllTouristList'},
            success: function(data){
              HotelList = data;
              $('#info_reciever').html(HotelList);
              modal.style.display = "none";
            }
          });
        }
      });
    } else {
      modal.style.display = "none";
    };
  });
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
//-----------при нажатии редактировать -------//
  $('#EditBtn').click(function(){
    alert('У вас нет прав!');
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
      data: {switсh: 'ClientsList', TouristID: TouristID, Type: 'comment'},
      success: function(data){
        InfoData = data[1];
        $('#CommentField').text(InfoData);
      }
    });
  });
//---при выходе курсора мыщи из объекта//
  }).mouseleave(function(){
    $(this.cells[0]).empty();
  });
/*----Окрашивание таблицы---------*/
$('#all_tourist_list td').each(function(){
  var x = $(this).text();
  if (x == 'Оплачено') $(this).css({color: 'green'});
  if (x == 'Не оплачен') $(this).css({color: 'red'});
});
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
    data: {switсh: 'ClientsList', Type: 'Admin', sort: sorting},
    success: function(data){
      UsersList = data;
      $('#info_reciever').html(UsersList);
    }
  });
});
//---------------------------------------------------------------------