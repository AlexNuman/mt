//----кнопка добавить авиакомпанию ------------------------------------
var AddNewAirline = document.getElementById('add_new_airline');
AddNewAirline.onclick = function() {
  modal.style.display = "block";
  ModalWindow.style.width = "340px";
  ModalWindow.style.height = "340px";
  $("#InfoHead h2").text('Добавить авиакомпанию');
  $("#InfoHead h2").css('font-size', '14pt');
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'AirlineList', Request: 'AddForm'},
    success: function(data){
      Info = data;
      $('#ModalInfoBlock').empty();
      $('#ModalInfoBlock').html(Info);
    }
  });
};
//------------------------------------------------------------------
// ------ появление элементов управления при наведении мыщи----
$('#airline_list tr').mouseenter(function(){
  var EditBtn = $("<span data-tooltip='Редактировать' class ='tooltip'><img id='EditBtn' src='/static/img/person_edit_btn.png' alt='Редактировать' class='edit_btn'></span>");
  var DelBtn = $("<span data-tooltip='Удалить' class ='tooltip'><img id='DeleteBtn' src='/static/img/delete.png' alt='Удалить' class='del_btn'></span>");
  var AirlineID = this.cells[5].textContent;
  $(this.cells[0]).append(DelBtn, EditBtn);
//-----При нажатии кнопки удалить---------------//
  $('#DeleteBtn').click(function(){
    var DeleteGid = confirm('Точно удалить авиакомпанию?');
    if (DeleteGid == true) {
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'json',
        data: {switсh: 'AirlineList', Request: 'Delete', Airline: AirlineID},
        success: function(data){
          InfoData = data[1];
          alert(InfoData);
          modal.style.display = "none";
          $.ajax({
            url: '/ajax-server/',
            method: 'get',
            dataType: 'html',
            data: {switсh: 'AirlineList', Request: 'Get'},
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
//-----------при нажатии редактировать -------//
  $('#EditBtn').click(function(){
    $.ajax({
      url: '/ajax-server/',
      method: 'get',
      dataType: 'html',
      data: {switсh: 'AirlineList', Request: 'Edit', Airline: AirlineID},
      success: function(data){
        Gid = data;
        modal.style.display = "block";
        ModalWindow.style.width = "340px";
        ModalWindow.style.height = "420px";
        $('#ModalInfoBlock').empty();
        $('#ModalInfoBlock').html(Gid);
      }
    });
  });
//---при выходе курсора мыщи из объекта//
  }).mouseleave(function(){
    $(this.cells[0]).empty();
  });
