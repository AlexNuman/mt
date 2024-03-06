//----кнопка добавить Гида ------------------------------------
var AddNewGid = document.getElementById('add_new_gid');
AddNewGid.onclick = function() {
  modal.style.display = "block";
  ModalWindow.style.width = "400px";
  ModalWindow.style.height = "600px";
  $("#InfoHead h2").text('Добавить гида');
  $("#InfoHead h2").css('font-size', '14pt');
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'html',
    data: {switсh: 'AddNewGidBtn'},
    success: function(data){
      Info = data;
      ModalWindow.style.width = "340px";
      ModalWindow.style.height = "420px";
      $('#ModalInfoBlock').empty();
      $('#ModalInfoBlock').html(Info);
    }
  });
};
//------------------------------------------------------------------
// ------ появление элементов управления при наведении мыщи----
$('#gid_list tr').mouseenter(function(){
  var EditBtn = $("<img id='EditBtn' src='/static/img/person_edit_btn.png' alt='Редактировать' class='edit_btn'>");
  var DelBtn = $("<img id='DeleteBtn' src='/static/img/delete.png' alt='Удалить' class='del_btn'>");
  var GidID = this.cells[7].textContent;
  $(this.cells[0]).append(DelBtn, EditBtn);
//-----При нажатии кнопки удалить---------------//
  $('#DeleteBtn').click(function(){
    var DeleteGid = confirm('Точно удалить гида?');
    if (DeleteGid == true) {
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'json',
        data: {switсh: 'GidDelete', Gid: GidID},
        success: function(data){
          InfoData = data[1];
          alert(InfoData);
          modal.style.display = "none";
          $.ajax({
            url: '/ajax-server/',
            method: 'get',
            dataType: 'html',
            data: {switсh: 'GidList'},
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
      data: {switсh: 'GidEdit', Gid: GidID, EditType: 'GidEdit'},
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

/*
//-------------------Получаем данные таблицы по клику --------------
var GidList = document.querySelector('#gid_list');
GidList.addEventListener('click', MouseClk => {
  const ClkData = MouseClk.target.closest('tr');
  if (!ClkData) return;
  const TableData = ClkData.cells;
  const GidID = `${TableData[6].textContent}`;
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
  var DelGidBtn = $("<div class='DelGidBtn' id='DelGidBtn'>Удалить гида</div>");
  var GidEditBtn = $("<div class='GidEditBtn' id='GidEditBtn'>Редактировать </div>");
  $('#ModalInfoBlock').empty();
  $('#ModalInfoBlock').append(DelGidBtn);
  $('#ModalInfoBlock').append(GidEditBtn);
//------------------------------------------------------------------------------------------
  $('#DelGidBtn').css('border', '1px solid transparent');
  $('#ModalInfoBlock').css({
    'color': 'black',
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-around'
  });
  $("#DelGidBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
	    $( "#DelGidBtn" ).css({
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
	    $( "#DelGidBtn" ).css({
	      'border': '1px transparent',
	      'background-color': ''
	    }); // задаем цвет заднего фона
	  });
  $('#GidEditBtn').css('border', '1px solid transparent');
  $("#GidEditBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
	    $( "#GidEditBtn" ).css({
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
	    $( "#GidEditBtn" ).css({
	      'border': '1px transparent',
	      'background-color': ''
	    }); // задаем цвет заднего фона
	  });
//-----Действие при нажатии на кнопку удалить туриста---------------------
  var DelGidBtn = document.getElementById('DelGidBtn');
  DelGidBtn.onclick = function() {
    var DeleteGid = confirm('Точно удалить туриста?');
    if (DeleteGid == true) {
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'json',
        data: {switсh: 'GidDelete', Gid: GidID},
        success: function(data){
          InfoData = data[1];
          alert(InfoData);
          modal.style.display = "none";
          $.ajax({
            url: '/ajax-server/',
            method: 'get',
            dataType: 'html',
            data: {switсh: 'GidList'},
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
  var GidEditBtn = document.getElementById('GidEditBtn');
  GidEditBtn.onclick = function() {
    $.ajax({
      url: '/ajax-server/',
      method: 'get',
      dataType: 'json',
      data: {switсh: 'GidEdit', Tourist: GidID},
      success: function(data){
        Tourist = data[1];
        alert(Tourist);
        modal.style.display = "none";
      }
    });
  };
//--------------------------------------------------------------------
});
//--------------------------------------------------------------------

*/