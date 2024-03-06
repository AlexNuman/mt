//-----Кнопка омтена----------
$('#settings_cancel').click(function(){
  modal.style.display = "none";
});
//-----------------------------
//-----сохранить--------------
$('#settings_change').click(function(){
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'SettingsPage',
      Request: 'Save',
      Site_Blocked: $("#Site_Blocked").val(),
      currency_choose: $("#currency_choose").val(),
      time_choose: $("#time_choose").val()},
    success: function(data){
      InfoData = data[1];
      alert(InfoData);
      modal.style.display = "none";
    }
  });
});