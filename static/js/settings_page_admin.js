//---установление значении ползунка настроек -----
if ($('#SiteCurrency').text() == 'KZT(тенге)') {
  $('#currency_choose').prop('checked', 'true');
} else {

};
if ($('#SiteTime').text() == 'Минут') {
  $('#time_choose').prop('checked', 'true');
} else {
};
//-----------------------------------------------
//------Сохранения значении настроек в базе -----
$('#SiteSettingsForm').submit(function() {
  var CurrencyChecked;
  var TimeChecked;
  if ($('#currency_choose').is(':checked')){
	CurrencyChecked = 'KZT(тенге)';
  } else {
	CurrencyChecked = 'USD(доллар)';
  };
  if ($('#time_choose').is(':checked')){
	TimeChecked = 'Минут';
  } else {
	TimeChecked = 'Час';
  };
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'SettingsPage',
      Request: 'Save',
      UserType: 'Admin',
      SiteCurrency: CurrencyChecked,
      SiteTime: TimeChecked},
    success: function(data){
      info = data[1];
      alert(info)
      modal.style.display = "none";
    }
  });
  return false;
});
//---------------------------------------------------