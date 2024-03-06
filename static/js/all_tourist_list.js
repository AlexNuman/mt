// ------ появление элементов управления при наведении мыщи----
$('#all_tourist_list tr').mouseenter(function(){
  var EditBtn = $("<img id='EditBtn' src='/static/img/person_edit_btn.png' alt='Редактировать' class='edit_btn'>");
  var DelBtn = $("<img id='DeleteBtn' src='/static/img/delete.png' alt='Удалить' class='del_btn'>");
  var InfoBtn = $("<img id='InfoBtn' src='/static/img/info_btn.png' alt='Инфо' class='info_btn'>");
  var TouristID = this.cells[10].textContent;
  $(this.cells[0]).append(DelBtn, EditBtn, InfoBtn);
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
    ModalWindow.style.height = "550px";
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
//---при выходе курсора мыщи из объекта//
  }).mouseleave(function(){
    $(this.cells[0]).empty();
  });
