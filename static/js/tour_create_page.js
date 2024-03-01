//----Создание нового тура -------------//
var TourData;
var TransitToArrival_1;
var TransitToDeparture_1;
var TransitFromArrival_1;
var TransitFromDeparture_1;
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
      WaitingTimeTo: $("#WaitingTimeTo").text(),
      DepartureFromDestination: $("#DepartureFromDestination").val(),
      TransitFromArrival: TransitFromArrival_1,
      TransitFromDeparture: TransitFromDeparture_1,
      ArrivalOrigin: $("#ArrivalOrigin").val(),
      WaitingTimeFrom: $("#WaitingTimeFrom").text(),
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
//--срабатывает на клик по документу----//
document.onclick = function() {
  if ($("#FlightType").val() == 'Прямой рейс') {
    $("#TransitToArrival").attr('disabled', true);
    $("#TransitToDeparture").attr('disabled', true);
    $("#TransitFromArrival").attr('disabled', true);
    $("#TransitFromDeparture").attr('disabled', true);
    $("#wait_lab_1").css('display', 'none');
    $("#wait_lab_2").css('display', 'none');
    TransitToArrival_1 = '';
    TransitToDeparture_1 = '';
    TransitFromArrival_1 = '';
    TransitFromDeparture_1 = '';
  } else {
      $("#TransitToArrival").attr('disabled', false);
      $("#TransitToDeparture").attr('disabled', false);
      $("#TransitFromArrival").attr('disabled', false);
      $("#TransitFromDeparture").attr('disabled', false);
      TransitToArrival_1 = $("#TransitToArrival").val();
      TransitToDeparture_1 = $("#TransitToDeparture").val();
      TransitFromArrival_1 = $("#TransitFromArrival").val();
      TransitFromDeparture_1 = $("#TransitFromDeparture").val();
    };
  SummaryResult.textContent = Number(FlightTicket.value)+Number(TouristVisa.value)+Number(PriceMekkaHotel.value)+
  Number(PriceMedinaHotel.value)+Number(TourFood.value)+Number(HadjKit.value)+Number(Gid.value)+Number(Comission.value)+Number(TourTrans.value);
//--подсчет разницы времени---//
  const ToDateArrive = dayjs($("#TransitToDeparture").val());
  const ToDateDeparture = dayjs($("#TransitToArrival").val());
  const FromDateArrive = dayjs($("#TransitFromDeparture").val());
  const FromDateDeparture = dayjs($("#TransitFromArrival").val());
  const getHumanizedValue = (diffInHours) => {
    const HOURS_IN_DAY = 24;
    const days = Math.floor(diffInHours / HOURS_IN_DAY);
    const hours = diffInHours % HOURS_IN_DAY;
    return `${hours}`;
  };
  WaitTimeTo.textContent = getHumanizedValue(ToDateArrive.diff(ToDateDeparture, "hour"));
  WaitTimeFrom.textContent = getHumanizedValue(FromDateArrive.diff(FromDateDeparture, "hour"));
};

//----переключение между с пересадкой и без пересадкой


//-----------------------------------------------------------------



