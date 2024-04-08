//----Создание нового тура -------------//
var TourData;
/*---отправка данных в БД для сохранения ----------
$('#NewTourForm').submit(function() {
  $.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'NewTourCreate',
      FlightType: $("#FlightType").val(),
      PaketName: $("#PaketName").val(),
      TourRoute: $("#TourRoute").val(),
      DepartureFromOrigin: $("#DepartureFromOrigin").val(),
      TransitToArrival: TransitToArrival_1,
      TransitToDeparture: TransitToDeparture_1,
      ArrivalDestination: $("#ArrivalDestination").val(),
      WaitingTimeTo: WaitingTimeTo_01,
      DepartureFromDestination: $("#DepartureFromDestination").val(),
      TransitFromArrival: TransitFromArrival_1,
      TransitFromDeparture: TransitFromDeparture_1,
      ArrivalOrigin: $("#ArrivalOrigin").val(),
      WaitingTimeFrom: WaitingTimeFrom_01,
      TouristQuantity: $("#TouristQuantity").val(),
      HotelMekka: $("#HotelMekka").val(),
      HotelMekkaIn: $("#HotelMekkaIn").val(),
      HotelMekkaOut: $("#HotelMekkaOut").val(),
      HotelMedina: $("#HotelMedina").val(),
      HotelMedinaIn: $("#HotelMedinaIn").val(),
      HotelMedinaOut: $("#HotelMedinaOut").val(),
      FoodChoose: $("#FoodChoose").val(),
      GidChoose: $("#GidChoose").val(),
      TransferChoose: $("#TransferChoose").val(),
      TourDeadline: $("#TourDeadline").val(),
      FlightTicketPrice: $("#FlightTicketPrice").val(),
      TouristVisaPrice: $("#TouristVisaPrice").val(),
      MekkaHotelPrice: $("#MekkaHotelPrice").val(),
      MedinaHotelPrice: $("#MedinaHotelPrice").val(),
      TourFoodPrice: $("#TourFoodPrice").val(),
      TransferPrice: $("#TransferPrice").val(),
      HadjKitPrice: $("#HadjKitPrice").val(),
      GidPrice: $("#GidPrice").val(),
      Comission: $("#Comission").val(),
      TourDiscount: $("#TourDiscount").val(),
      TourSummary: $("#TourSummary").text()},
    success: function(data){
      info = data[1];
      alert(info)
      modal.style.display = "none";
      $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'html',
        data: {switсh: 'ActiveTours'},
        success: function(data){
          TourList = data;
          $('#info_reciever').html(TourList);
        }
      });
    }
  });
  return false;
});
*/
//--------------------------------------------------------//
//-----------Подсчет цен ---------------------------------//
/*
var PriceContainer = document.getElementById('PriceContainer');
var FlightTicket = document.getElementById('FlightTicketPrice');
var TouristVisa = document.getElementById('TouristVisaPrice');
var PriceMekkaHotel = document.getElementById('MekkaHotelPrice');
var PriceMedinaHotel = document.getElementById('MedinaHotelPrice');
var TourFood = document.getElementById('TourFoodPrice');
var TourTrans = document.getElementById('TransferPrice');
var HadjKit = document.getElementById('HadjKitPrice');
var Gid = document.getElementById('GidPrice');
var Comission = document.getElementById('Comission');
var SummaryResult = document.getElementById('TourSummary');
*/

/*
var MekkaHotel_Days = document.getElementById('MekkaHotel_Days');
var MedinaHotel_Days = document.getElementById('MedinaHotel_Days');
*/
//--срабатывает на клик по документу----//
document.onclick = function() {
  //----переменные для подсчета дней -----------------------
  var WaitTimeTo = document.getElementById('WaitingTimeTo');
  var WaitTimeFrom = document.getElementById('WaitingTimeFrom');
  //----изменения типа рейса-------------------
  if ($("#FlightType").val() == 'Прямой рейс') {
    $("#TransitToArrival").css('opacity', '0');
    $("#TransitToArrival").attr('disabled', true);
    $("#TransitToDeparture").css('opacity', '0');
    $("#TransitToDeparture").attr('disabled', true);
    $("#TransitFromArrival").css('opacity', '0');
    $("#TransitFromArrival").attr('disabled', true);
    $("#TransitFromDeparture").css('opacity', '0');
    $("#TransitFromDeparture").attr('disabled', true);
    $("#wait_lab_1").css('display', 'none');
    $("#wait_lab_2").css('display', 'none');
    $("#lab_transit_1").css('display', 'none');
    $("#lab_transit_2").css('display', 'none');
  } else {
      $("#TransitToArrival").css('opacity', '100');
      $("#TransitToArrival").attr('disabled', false);
      $("#TransitToDeparture").css('opacity', '100');
      $("#TransitToDeparture").attr('disabled', false);
      $("#TransitFromArrival").css('opacity', '100');
      $("#TransitFromArrival").attr('disabled', false);
      $("#TransitFromDeparture").css('opacity', '100');
      $("#TransitFromDeparture").attr('disabled', false);
      $("#wait_lab_1").css('display', '');
      $("#wait_lab_2").css('display', '');
      $("#lab_transit_1").css('display', '');
      $("#lab_transit_2").css('display', '');
  };
  //-----------------------------------------------------------------
  //-----подсчет разницы часов времени ожидания--------------------------------------
  const ToDateArrive = dayjs($("#TransitToDeparture").val());
  const ToDateDeparture = dayjs($("#TransitToArrival").val());
  const FromDateArrive = dayjs($("#TransitFromDeparture").val());
  const FromDateDeparture = dayjs($("#TransitFromArrival").val());
  WaitTimeTo.textContent = convertMinutesToHoursAndMinutes(ToDateArrive.diff(ToDateDeparture, "minute"));
  WaitTimeFrom.textContent = convertMinutesToHoursAndMinutes(FromDateArrive.diff(FromDateDeparture, "minute"));
  //-----подсчет дней в Мекке и в Медине
  //--------Мекка--------------------
  const HotelMekkaIn = dayjs($("#HotelMekkaIn").val());
  const HotelMekkaOut = dayjs($("#HotelMekkaOut").val());
  const startDateMekka = HotelMekkaIn.startOf("day");
  const endDateMekka = HotelMekkaOut.startOf("day");
  //--------Медина-------------------
  const HotelMedinaIn = dayjs($("#HotelMedinaIn").val());
  const HotelMedinaOut = dayjs($("#HotelMedinaOut").val());
  const startDateMedina = HotelMedinaIn.startOf("day");
  const endDateMedina = HotelMedinaOut.startOf("day");
  MekkaHotel_Days.textContent = IsNan(endDateMekka.diff(startDateMekka, "day"));
  MedinaHotel_Days.textContent = IsNan(endDateMedina.diff(startDateMedina, "days"));
};


  /*
  SummaryResult.textContent = Number(FlightTicket.value)+Number(TouristVisa.value)+Number(PriceMekkaHotel.value)+
  Number(PriceMedinaHotel.value)+Number(TourFood.value)+Number(HadjKit.value)+Number(Gid.value)+Number(Comission.value)+Number(TourTrans.value);
//--подсчет разницы времени---//






  */

//-----------------------------------------------------------------

/*
// Импортируем библиотеку Moment.js
const moment = require('moment');

// Две строки даты
const first = '01/25/2020';
const second = 'January 15, 2020';

// Создаем два объекта момента с датами для сравнения
const x = moment(first, 'L');
const y = moment(second, 'LL');

// Получаем разницу в днях
const days = x.diff(y, 'days');

console.log(days + " дней"); // Вывод: 10 дней
*/

//----Функция конвертации времени------
function convertMinutesToHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (isNaN(totalMinutes)) {
    return `0`;
  } else {
    return `${hours}:${minutes}`;
  };
};
//--------------------------------------
//--функция для подсчета разницы времени в минутах------
function getHumanizedValue(diffInHours) {
  const HOURS_IN_DAY = 24;
  const days = Math.floor(diffInHours / HOURS_IN_DAY);
  const hours = diffInHours % HOURS_IN_DAY;
  if (isNaN(diffInHours)) {
    return `0`;
  } else {
    return `${hours}`;
  };
};
//-----------------------------------------------------

//-----проверка на NaN-----------------------
function IsNan (data) {
  if (isNaN(data)) {
    return `0`;
  } else {
    return Math.ceil(data);
  };
};