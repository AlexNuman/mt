var AddNewUserBtn = document.getElementById('add_new_user');
var AddNewUserData;
AddNewUserBtn.onclick = function() {
  modal.style.display = "block";
  ModalWindow.style.width = "400px";
  ModalWindow.style.height = "700px";
  $("#InfoHead h2").text('Добавить нового пользователя');
  $("#InfoHead h2").css('font-size', '14pt');
  $.ajax({
    url: '/regist_page/',
    method: 'get',
    dataType: 'html',
    success: function(data){
      AddNewUserData = data;
      $('#ModalInfoBlock').html(AddNewUserData);
    }
  });
};
/*--------------------------------------------------------------------------------------*/
users_table = document.querySelector('#users_table'); //выбераем таблицу пользователей
users_table.addEventListener('click', e => {         // действие при нажатии на таблицу
  const or = e.target.closest('tr');
  if (!or) return;
  const o = or.cells;
  const cursor_login = `${o[5].textContent}`; // присуждаем данные таблицы к переменной
/*---------------------------------------------------------------------------------------------------------*/
  $('#ModalInfoBlock').css({
    'color': 'black',
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-around'
  });
  modal.style.display = "block";
  ModalWindow.style.width = "340px";
  ModalWindow.style.height = "100px";
  $("#InfoHead h2").text('Действие');
  $("#InfoHead h2").css('font-size', '14pt');
  var EditBtn = $("<div class='EditBtn' id='EditBtn'> Редактировать</div>"); //--создаем кнопки -------
  var delBtn = $("<div class='delBtn' id='delBtn'>Удалить</div>");
  $('#ModalInfoBlock').empty();
  $('#ModalInfoBlock').append(EditBtn);
  $('#ModalInfoBlock').append(delBtn);   // добавляем кнопки к окну
  $('#EditBtn').css('border', '1px solid transparent');
  $("#EditBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
    $( "#EditBtn" ).css({
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
	})
	}, function(){ // задаем функцию, которая срабатывает, когда указатель выходит из элемента
	  $( "#EditBtn" ).css({
	    'border': '1px transparent',
	    'background-color': ''
	  }) // задаем цвет заднего фона
	});
/*------------------------------------------------------------------------------------------*/
  $('#delBtn').css('border', '1px solid transparent');
  $("#delBtn").hover(function(){ // задаем функцию при наведении курсора на элемент
    $( "#delBtn" ).css({
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
	})
	}, function(){ // задаем функцию, которая срабатывает, когда указатель выходит из элемента
	  $( "#delBtn" ).css({
	    'border': '1px transparent',
	    'background-color': ''
	  }) // задаем цвет заднего фона
	});
//------------------------------------------------------------------------------------------
//---------------кнопка редактировать пользователя---------------------------------------------------------------------------
  var EditBtn = document.getElementById('EditBtn');
  EditBtn.onclick = function() {
    $.ajax({
      url: '/ajax-server/',
      method: 'get',
      dataType: 'html',
      data: {switсh: 'list_userinfo', send_login: cursor_login},
      success: function(data){
        UserInfo = data;
        ModalWindow.style.width = "340px";
        ModalWindow.style.height = "440px";
        $('#ModalInfoBlock').empty();
        $('#ModalInfoBlock').html(UserInfo);
      }
    });
  };
//------------------------------------------------------------------------------------------
//--------------------------кнопка удалить пользователя-------------------------------------
  var delBtn = document.getElementById('delBtn');
  delBtn.onclick = function() {
    var answer = confirm('Точно удалить?');
    if (answer == true) {   //--> если нажато ОК--
      $.ajax({
      url: '/ajax-server/',
      method: 'get',
      dataType: 'json',
      data: {switсh: 'del_user', send_login: cursor_login},
      success: function(data){
        UserInfo = data[1];
        alert(UserInfo);
        modal.style.display = "none";
        $('#info_reciever').empty();
        $.ajax({
          url: '/ajax-server/',
          method: 'get',
          dataType: 'html',
          data: {switсh: 'UsersList'},
          success: function(data){
            UsersList = data;
            $('#info_reciever').html(UsersList);
          }
        });
      }
    });
    } else {   //--> если нажато отмена ---
      modal.style.display = "none";
    };
  };
});

