//----Создание нового тура -------------//
var TourData;
var TransitToArrival_1;
var TransitToDeparture_1;
var TransitFromArrival_1;
var TransitFromDeparture_1;
var WaitingTimeTo_01;
var WaitingTimeFrom_01;

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
//--------------------------------------------------------//
//-----------Подсчет цен ---------------------------------//
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
var WaitTimeTo = document.getElementById('WaitingTimeTo');
var WaitTimeFrom = document.getElementById('WaitingTimeFrom');
var MekkaHotel_Days = document.getElementById('MekkaHotel_Days');
var MedinaHotel_Days = document.getElementById('MedinaHotel_Days');
//--срабатывает на клик по документу----//
document.onclick = function() {
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
    TransitToArrival_1 = '1111-11-11 11:11';
    TransitToDeparture_1 = '1111-11-11 11:11';
    TransitFromArrival_1 = '1111-11-11 11:11';
    TransitFromDeparture_1 = '1111-11-11 11:11';
    WaitingTimeTo_01 = '---';
    WaitingTimeFrom_01 = '---';
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
      TransitToArrival_1 = $("#TransitToArrival").val();
      TransitToDeparture_1 = $("#TransitToDeparture").val();
      TransitFromArrival_1 = $("#TransitFromArrival").val();
      TransitFromDeparture_1 = $("#TransitFromDeparture").val();
      WaitingTimeTo_01 = $("#WaitingTimeTo").text();
      WaitingTimeFrom_01 = $("#WaitingTimeFrom").text();
    };
  SummaryResult.textContent = Number(FlightTicket.value)+Number(TouristVisa.value)+Number(PriceMekkaHotel.value)+
  Number(PriceMedinaHotel.value)+Number(TourFood.value)+Number(HadjKit.value)+Number(Gid.value)+Number(Comission.value)+Number(TourTrans.value);
//--подсчет разницы времени---//
  const ToDateArrive = dayjs($("#TransitToDeparture").val());
  const ToDateDeparture = dayjs($("#TransitToArrival").val());
  const FromDateArrive = dayjs($("#TransitFromDeparture").val());
  const FromDateDeparture = dayjs($("#TransitFromArrival").val());
  const HotelMekkaIn = dayjs($("#HotelMekkaIn").val());
  const HotelMekkaOut = dayjs($("#HotelMekkaOut").val());
  const HotelMedinaIn = dayjs($("#HotelMedinaIn").val());
  const HotelMedinaOut = dayjs($("#HotelMedinaOut").val());
  const getHumanizedValue = (diffInHours) => {
    const HOURS_IN_DAY = 24;
    const days = Math.floor(diffInHours / HOURS_IN_DAY);
    const hours = diffInHours % HOURS_IN_DAY;
    return `${hours}`;
  };
  WaitTimeTo.textContent = getHumanizedValue(ToDateArrive.diff(ToDateDeparture, "hour"));
  WaitTimeFrom.textContent = getHumanizedValue(FromDateArrive.diff(FromDateDeparture, "hour"));
  MekkaHotel_Days.textContent = getHumanizedValue(HotelMekkaOut.diff(HotelMekkaIn, "days"));
  MedinaHotel_Days.textContent = getHumanizedValue(HotelMedinaOut.diff(HotelMedinaIn, "days"));
};

//----переключение между с пересадкой и без пересадкой


//-----------------------------------------------------------------
/* блок для тестироания AJAX
$.ajax({
    url: '/ajax-server/',
    method: 'get',
    dataType: 'json',
    data: {switсh: 'Test'},
    success: function(data){
      InfoData = data[1];
      alert(InfoData);
    }
  });
*/

