from django.db import models

# Create your models here.
#-------Класс БД списка пользоввателей -------------------------------
class Users(models.Model):  #Класс для создания нового пользователья
    user_name = models.CharField(max_length=50)                            # ФИО нового пользователья
    user_birth = models.DateField(auto_now=False)                          # Дата рождения
    user_adress = models.CharField(max_length=50)                          # Адрес
    user_email = models.EmailField()                                       # Эл.почта
    user_tel = models.CharField(max_length=10)                             # Сотовый телефон
    user_login = models.CharField(max_length=50)                           # Логин
    user_pass = models.CharField(max_length=50)                            # Пароль
    user_type = models.CharField(max_length=50)                            # Тип пользователя
    user_regist_date = models.DateField(auto_now=True)                     # Дата регистрации
    user_login_date = models.DateTimeField(auto_now=True)                  # Дата последнего входа
    user_status = models.CharField(max_length=10, default='off-line')      # Статус пользователя
#----------------------------------------------------------------------------
#-------Класс БД нового тура ------------------------------------------------


class Tours (models.Model):
    FlightType = models.CharField(max_length=200)                                # Направление рейса
    PaketName = models.CharField(max_length=200)                                 # Название пакета
    TourRoute = models.CharField(max_length=200)                                 # Маршрут
    DepartureFromOrigin = models.DateTimeField(auto_now=False, blank=True)       # --> Дата вылета туда
    TransitToArrival = models.DateTimeField(null=True, blank=True, default=None)     # --> Транзит туда - прилет
    TransitToDeparture = models.DateTimeField(null=True, blank=True, default=None)   # --> Транзит туда - вылет
    ArrivalDestination = models.DateTimeField(auto_now=False, blank=True)        # --> Дата прилета туда
    WaitingTimeTo = models.CharField(max_length=50)                              # --> Ожидание транзит - туда
    DepartureFromDestination = models.DateTimeField(auto_now=False, blank=True)  # <-- Дата вылета обратно
    TransitFromArrival = models.DateTimeField(null=True, blank=True, default=None)   # <-- Транзит обратно - прилет
    TransitFromDeparture = models.DateTimeField(null=True, blank=True, default=None) # <-- Транзит обратно - вылет
    ArrivalOrigin = models.DateTimeField(auto_now=False, blank=True)             # <-- Дата прилета обратно
    WaitingTimeFrom = models.CharField(max_length=50)                            # <-- Ожидание транзит - обратно
    TouristQuantity = models.SmallIntegerField()                                 # Количество туристов
    HotelMekka = models.CharField(max_length=200)                                # Отель в Мекке
    HotelMekkaIn = models.DateTimeField(auto_now=False, blank=True)              # Заезд в отель в Мекке
    HotelMekkaOut = models.DateTimeField(auto_now=False, blank=True)             # Выезд из отеля в Мекке
    HotelMedina = models.CharField(max_length=200)                               # Отель в Медина
    HotelMedinaIn = models.DateTimeField(auto_now=False, blank=True)             # Заезд в отель в Медина
    HotelMedinaOut = models.DateTimeField(auto_now=False, blank=True)            # Выезд из отеля в Медина
    FoodChoose = models.CharField(max_length=200)                                # Выбор питания
    GidChoose = models.CharField(max_length=200)                                 # Выбор гида
    TransferChoose = models.CharField(max_length=200)                            # Выбор трансфера
    TourDeadline = models.DateTimeField(auto_now=False, blank=True)              # Срок последней регистрации
    FlightTicketPrice = models.CharField(max_length=200)                         # Цена авиабилета
    TouristVisaPrice = models.CharField(max_length=200)                          # Цена визы туриста
    MekkaHotelPrice = models.CharField(max_length=200)                           # Цена отеля в Мекке
    MedinaHotelPrice = models.CharField(max_length=200)                          # Цена отеля в Медина
    TourFoodPrice = models.CharField(max_length=200)                             # Питание
    TransferPrice = models.CharField(max_length=200)                             # Трансфер
    HadjKitPrice = models.CharField(max_length=200)                              # Хадж набор
    GidPrice = models.CharField(max_length=200)                                  # Гид
    Comission = models.CharField(max_length=200)                                 # Комиссия
    TourDiscount = models.CharField(max_length=200)                              # Скидка
    TourSummary = models.CharField(max_length=200)                               # Итого тура
    TourCreateDate = models.DateTimeField(auto_now=False, blank=True)            # Дата создания тура
#-------------------------------------------36 строк---------------------------------

#-------Класс БД гиды -----------------------------------------------
class Gids (models.Model):
    GidName = models.CharField(max_length=200)                        # ФИО гида
    GidBirth = models.DateField(auto_now=False)                       # Дата рождения
    GidAdress = models.CharField(max_length=200)                      # Адрес
    GidEmail = models.EmailField()                                    # Эл.почта
    GidTel = models.CharField(max_length=12)                          # Сотовый телефон
    GidCreateDate = models.DateTimeField(auto_now=False, blank=True)  # Дата добавления гида

#----------------------------------------------------------------------------
#-------Класс БД гостиниц -----------------------------------------------
class Hotels (models.Model):
    HotelName = models.CharField(max_length=50)                        # Название гостиницы
    HotelCity = models.CharField(max_length=50)                        # Город расположения
    HotelStars = models.CharField(max_length=50)                        # Звезд гостиницы
    HotelInfo = models.CharField(max_length=500)                       # Информация о гостинице
#----------------------------------------------------------------------------
#-------Класс БД трансфер -----------------------------------------------
class TourTransfer (models.Model):
    TransportType = models.CharField(max_length=50)                  # Тип транспорта
    TransportQuality = models.CharField(max_length=50)               # Качество  транспорта
    TransferSeats = models.CharField(max_length=50)                  # Количество мест
    TransportInfo = models.CharField(max_length=500)                 # Информация о транспорте

#----------------------------------------------------------------------------
#-------Класс БД нового туриста -----------------------------------------------

class Clients(models.Model):
    TouristName = models.CharField(max_length=200)                      # ФИО туриста
    TouristBirth = models.DateField(auto_now=False)                     # Дата рождения
    TouristAdress = models.CharField(max_length=200)                    # Адрес
    TouristIIN = models.CharField(max_length=50)                        # ИИН
    TouristPassNumber = models.CharField(max_length=50)                 # № паспорта
    TouristPassEx = models.DateField(auto_now=False)                    # Срок паспорта
    TouristTel = models.CharField(max_length=20)                        # Телефон
    TouristRoomType = models.CharField(max_length=20)                   # Размешение туриста
    TouristFoodType = models.CharField(max_length=20)                   # Питание туриста
    TourSummary = models.CharField(max_length=50)                       # Стоимость тура
    TourDiscount = models.CharField(max_length=50)                      # Скидка тура
    TouristPay = models.CharField(max_length=50)                        # Оплаченная сумма
    TouristDebt = models.CharField(max_length=50)                       # Долг
    TouristGroup = models.CharField(max_length=50)                      # Группа
    PersonOne = models.CharField(max_length=50)                         # 1-Турист
    PersonTwo = models.CharField(max_length=50)                         # 2-Турист
    PersonThree = models.CharField(max_length=50)                       # 3-Турист
    PersonFour = models.CharField(max_length=50)                        # 4-Турист
    RegistManager = models.CharField(max_length=200)                    # Менеджер
    DateRegist = models.DateTimeField(auto_now=True)                    # Регистрация
    ConfirmBuh = models.CharField(max_length=200)                       # Подтверждение
    StatusPay = models.CharField(max_length=50)                         # Статус
    TouristLogin = models.CharField(max_length=100)                     # Логин
    TouristPass = models.CharField(max_length=100)                      # Пароль
    TouristLastLogin = models.DateTimeField(auto_now=True)              # Активность
    Comments = models.CharField(max_length=200)                         # Комментарий
    TourID = models.CharField(max_length=50)                            # Тур ID

#----------------------------------------------------------------------------
#------------------------
#---------------------------------------------------------------------------
#-------Класс БД настройки --------------------------------------------------
class SiteSettings(models.Model):
    SettingsType = models.CharField(max_length=50)                         # типа настройки
    Block = models.CharField(max_length=50, default='---')                 # Переключатель блок или нет
    NoticeInfo = models.CharField(max_length=500, default='---')           # Уведомление инфо
    CurrencyInfo = models.CharField(max_length=10)                         # Информация валюта
    TimeInfo = models.CharField(max_length=10)                             # Информация время
#-------Класс проверка БД --------------------------------------------------
class test_db(models.Model):
    name = models.CharField(max_length=20)
    age = models.IntegerField()
#----------------------------------------------------------------------------