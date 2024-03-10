from django.shortcuts import render, redirect
from .models import Users, Clients, Gids, Hotels, TourTransfer, Tours, Settings
from django.http import JsonResponse
from datetime import datetime


# -- кабинет Суперадминистратора -----------------------
def SuperAdmin(request):
    session_login = request.session['SessionLogin']
    session_login_type = request.session['SessionLoginType']
    if session_login == 'none' or session_login_type != 'СУПЕРАДМИН':
        return redirect('/')
    else:
        return render(request, 'super_admin.html',
                      context={'session_login': session_login})
# ------------------------------------------------------------------------------------------
# ----------Кабинет администратора-------------------------------------------------------
def cabinet_admin(request):
    try:
        session_login = request.session['SessionLogin']
        session_login_type = request.session['SessionLoginType']
        if session_login == 'none' or session_login_type != 'Администратор':
            return redirect('/')
        else:
            return render(request, 'cabinet_admin.html',
                          context={'session_login': session_login})
    except:
        return redirect('/')
# ------------------------------------------------------------------------------------------
# ---------Кабинет директора------------------
def cabinet_director(request):
    session_login = request.session['SessionLogin']
    session_login_type = request.session['SessionLoginType']
    if session_login == 'none' or session_login_type != 'Директор':
        return redirect('/')
    else:
        return render(request, 'cabinet_director.html', context={'session_login': session_login})
# ------------------------------------------------------------------------------------------
# ---------Кабинет менеджера------------------
def cabinet_manager(request):
    session_login = request.session['SessionLogin']
    session_login_type = request.session['SessionLoginType']
    if session_login == 'none' or session_login_type != 'Менеджер':
        return redirect('/')
    else:
        return render(request, 'cabinet_manager.html', context={'session_login': session_login})
# ------------------------------------------------------------------------------------------
# ---------Кабинет бухгалтера---------------------
def cabinet_buhgalter(request):
    try:
        session_login = request.session['SessionLogin']
        session_login_type = request.session['SessionLoginType']
        if session_login == 'none' or session_login_type != 'Бухгалтер':
            return redirect('/')
        else:
            return render(request, 'cabinet_buhgalter.html',
                          context={'session_login': request.session['SessionLogin']})
    except:
        return redirect('/')
# ------------------------------------------------------------------------------------------
# ---------главная страница Логин/пароль---------------------
def main_page(request, error_logo='none'):
    try:
        session_login_check = request.session['SessionLogin']
        session_user_type_check = request.session['SessionLoginType']
        if session_user_type_check == 'СУПЕРАДМИН':
            return redirect('/superadmin')
        elif session_user_type_check == 'Администратор':
            return redirect('/cabinet_admin')
        elif session_user_type_check == 'Менеджер':
            return redirect('/cabinet_manager')
        elif session_user_type_check == 'Бухгалтер':
            return redirect('/cabinet_buhgalter')
        elif session_user_type_check == 'Турист':
            return redirect('/vaucher')
        else:
            return render(request, 'main_page.html', context={'error_login': error_logo})
    except:
        return render(request, 'main_page.html', context={'error_login': error_logo})
# ------------------------------------------------------------------------------------------
# ---------Страница регистрации юзера---------------------
def regist_page(request):
    return render(request, 'regist_page.html')
# ------------------------------------------------------------------------------------------
# ---------Проверка введенного логина и пароль, переадресация на страницу---------------------
def check_login(request):
    if request.method == 'POST':
        user_log = request.POST.get('login')
        pass_in = request.POST.get('pass_in')
        try:
            login = Users.objects.get(user_login=user_log)
            if (login.user_pass == pass_in) and login.user_type == 'СУПЕРАДМИН':
                request.session['SessionLogin'] = login.user_login
                request.session.save()
                request.session['SessionLoginType'] = login.user_type
                request.session.save()
                login.user_status = 'on-line'
                login.save()
                return redirect('/superadmin')
            elif (login.user_pass == pass_in) and login.user_type == 'Администратор':
                request.session['SessionLogin'] = login.user_login
                request.session.save()
                request.session['SessionLoginType'] = login.user_type
                request.session.save()
                login.user_status = 'on-line'
                login.save()
                return redirect('/cabinet_admin')
            elif (login.user_pass == pass_in) and login.user_type == 'Менеджер':
                request.session['SessionLogin'] = login.user_login
                request.session.save()
                request.session['SessionLoginType'] = login.user_type
                request.session.save()
                login.user_status = 'on-line'
                login.save()
                return redirect('/cabinet_manager')
            elif (login.user_pass == pass_in) and login.user_type == 'Бухгалтер':
                request.session['SessionLogin'] = login.user_login
                request.session.save()
                request.session['SessionLoginType'] = login.user_type
                request.session.save()
                login.user_status = 'on-line'
                login.save()
                return redirect('/cabinet_buhgalter')
            elif (login.user_pass == pass_in) and login.user_type == 'Директор':
                request.session['SessionLogin'] = login.user_login
                request.session.save()
                request.session['SessionLoginType'] = login.user_type
                request.session.save()
                login.user_status = 'on-line'
                login.save()
                return redirect('/cabinet_director')
            else:
                return redirect('/')
        except:
            try:
                login = Clients.objects.get(TouristLogin=user_log)
                tour_info = Tours.objects.get(id=login.TourID)
                if login.TouristPass == pass_in:
                    request.session['SessionLogin'] = login.TouristLogin
                    request.session.save()
                    request.session['SessionLoginType'] = 'Турист'
                    request.session.save()
                    return render(request, 'vaucher.html', context={'TouristInfo': login, 'TourInfo': tour_info})
                else:
                    return redirect('/error_login')
            except:
                return redirect('/error_login')
            return redirect('/error_login')
# ------------------------------------------------------------------------------------------
# ------------Jinja тест---------------------------------------------------------------
def jinja_test(request):
    return render(request, 'jinja_test.html', context={'tags': 'blue'})
# ------------------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------
def users_list(request):
    people = Users.objects.values()
    return render(request, 'users_list.html', context={'db_data': people})
def NewTour(request):
    return render(request, 'tour_create_page.html')
def user_info(request):
    return render(request, 'user_info.html')
def test_form(request, check='No'):
    check = request.GET.get('check')
    return render(request, 'test_form.html', context={'info': check})
# ------------------------------------------------------------------------------------------

# ---------- СЕРВЕР ОБРАБОКИ AJAX-ЗАПРОСОВ ПО СЕЛЕКТОРУ --------------------------
def AjaxServer(request):
    switcher = request.GET.get('switсh')
# --------------> Окно новый тур-------------------
    if switcher == 'newtour':
        GidData = Gids.objects.values()
        HotelData = Hotels.objects.values()
        TransferData = TourTransfer.objects.values()
        return render(request, 'tour_create_page.html', context={'GidData': GidData, 'HotelData': HotelData,
                                                                 'TransferData': TransferData})
# -----------> Окно информация о пользователе----------------
    elif switcher == 'userinfo':
        login = Users.objects.get(user_login=request.session['SessionLogin'])
        user_info = request.GET.get('send_login')
        switcher = request.GET.get('switcher')
        send_data = Users.objects.get(user_login=user_info)
        if switcher == 'info':
            if send_data.user_type == 'СУПЕРАДМИН':
                send_data.user_pass = '********'
            return render(request, 'user_info_block.html', context={'user_data': send_data})
        else:
            return render(request, 'user_info.html',
                      context={'get_user_name': login.user_name, 'get_birth': login.user_birth,
                               'get_adress': login.user_adress, 'get_email': login.user_email,
                               'get_tel': login.user_tel, 'get_login': login.user_login})
# -----------> Информация о пользователе из списка--------------
    elif switcher == 'list_userinfo':
        try:
            login = Users.objects.get(user_login=request.GET.get('send_login'))
        except:
            login = Users.objects.get(user_login=request.session['SessionLogin'])
        return render(request, 'user_info.html',
                      context={'get_user_name': login.user_name, 'get_birth': login.user_birth,
                               'get_adress': login.user_adress, 'get_email': login.user_email,
                               'get_tel': login.user_tel, 'get_login': login.user_login})
# ----------> Кнопка выйти ----------------------------------------------
    elif switcher == 'LogOut':
        login = Users.objects.get(user_login=request.session['SessionLogin'])
        request.session['SessionLogin'] = 'none'
        request.session['SessionLoginType'] = 'none'
        request.session.save()
        login.user_status = 'off-line'
        login.save()
        return redirect('/')
    elif switcher == 'LogOutTourist':
        request.session['SessionLogin'] = 'none'
        request.session['SessionLoginType'] = 'none'
        request.session.save()
        return redirect('/')
# ----> Создание нового тура------------------
    elif switcher == 'NewTourCreate':
        done = {1: 'Тур создан!', 2: request.GET.get('TourDead')}
        error = {1: 'Ощибка создания тура! По пробуйте еще!'}
        FlightType = request.GET.get('FlightType')
        PaketName = request.GET.get('PaketName')
        TourRoute = request.GET.get('TourRoute')
        DepartureFromOrigin = request.GET.get('DepartureFromOrigin')
        TransitToArrival = request.GET.get('TransitToArrival')
        TransitToDeparture = request.GET.get('TransitToDeparture')
        ArrivalDestination = request.GET.get('ArrivalDestination')
        WaitingTimeTo = request.GET.get('WaitingTimeTo')
        DepartureFromDestination = request.GET.get('DepartureFromDestination')
        TransitFromArrival = request.GET.get('TransitFromArrival')
        TransitFromDeparture = request.GET.get('TransitFromDeparture')
        ArrivalOrigin = request.GET.get('ArrivalOrigin')
        WaitingTimeFrom = request.GET.get('WaitingTimeFrom')
        TouristQuantity = request.GET.get('TouristQuantity')
        HotelMekka = request.GET.get('HotelMekka')
        HotelMekkaIn = request.GET.get('HotelMekkaIn')
        HotelMekkaOut = request.GET.get('HotelMekkaOut')
        HotelMedina = request.GET.get('HotelMedina')
        HotelMedinaIn = request.GET.get('HotelMedinaIn')
        HotelMedinaOut = request.GET.get('HotelMedinaOut')
        FoodChoose = request.GET.get('FoodChoose')
        GidChoose = request.GET.get('GidChoose')
        TransferChoose = request.GET.get('TransferChoose')
        TourDeadline = request.GET.get('TourDeadline')
        FlightTicketPrice = request.GET.get('FlightTicketPrice')
        TouristVisaPrice = request.GET.get('TouristVisaPrice')
        MekkaHotelPrice = request.GET.get('MekkaHotelPrice')
        MedinaHotelPrice = request.GET.get('MedinaHotelPrice')
        TourFoodPrice = request.GET.get('TourFoodPrice')
        TransferPrice = request.GET.get('TransferPrice')
        HadjKitPrice = request.GET.get('HadjKitPrice')
        GidPrice = request.GET.get('GidPrice')
        Comission = request.GET.get('Comission')
        TourDiscount = request.GET.get('TourDiscount')
        TourSummary = request.GET.get('TourSummary')
        TourCreateDate = datetime.now()
        new_tour = Tours.objects.create(FlightType=FlightType, PaketName=PaketName, TourRoute=TourRoute,
                                        DepartureFromOrigin=DepartureFromOrigin, TransitToArrival=TransitToArrival,
                                        TransitToDeparture=TransitToDeparture, ArrivalDestination=ArrivalDestination,
                                        WaitingTimeTo=WaitingTimeTo, DepartureFromDestination=DepartureFromDestination,
                                        TransitFromArrival=TransitFromArrival, TransitFromDeparture=TransitFromDeparture,
                                        ArrivalOrigin=ArrivalOrigin, WaitingTimeFrom=WaitingTimeFrom,
                                        TouristQuantity=TouristQuantity, HotelMekka=HotelMekka, HotelMekkaIn=HotelMekkaIn,
                                        HotelMekkaOut=HotelMekkaOut, HotelMedina=HotelMedina, HotelMedinaIn=HotelMedinaIn,
                                        HotelMedinaOut=HotelMedinaOut, FoodChoose=FoodChoose, GidChoose=GidChoose,
                                        TransferChoose=TransferChoose, TourDeadline=TourDeadline,
                                        FlightTicketPrice=FlightTicketPrice, TouristVisaPrice=TouristVisaPrice,
                                        MekkaHotelPrice=MekkaHotelPrice, MedinaHotelPrice=MedinaHotelPrice,
                                        TourFoodPrice=TourFoodPrice, TransferPrice=TransferPrice,
                                        HadjKitPrice=HadjKitPrice, GidPrice=GidPrice, Comission=Comission,
                                        TourDiscount=TourDiscount, TourSummary=TourSummary, TourCreateDate=TourCreateDate)
        return JsonResponse(done)

# ---->Изменение данных пользователя --------------
    elif switcher == 'UserInfoChange':
        done = {1: 'Данные изменены!'}
        error = {1: 'Ощибка изменения данных! Попробуйте еще!'}
        try:
            user_fio = request.GET.get('user_fio')
            user_birth = request.GET.get('user_birth')
            user_adress = request.GET.get('user_adress')
            user_email = request.GET.get('user_email')
            user_tel = request.GET.get('user_tel')
            login = Users.objects.get(user_login=request.session['SessionLogin'])
            login.user_name = user_fio
            login.user_adress = user_adress
            login.user_tel = user_tel
            login.user_email = user_email
            login.user_birth = user_birth
            login.save()
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ------> Удаление пользователя ---------------------------
    elif switcher == 'del_user':
        done = {1: 'Пользователь удален!'}
        error = {1: 'Самоудаление не возможно!'}
        denied = {1: 'У вас нет прав!'}
        online_login = Users.objects.get(user_login=request.session['SessionLogin'])
        send_login = request.GET.get('send_login')
        if send_login == online_login.user_login:
            return JsonResponse(error)
        elif Users.objects.get(user_login=send_login).user_type == 'СУПЕРАДМИН':
            return JsonResponse(denied)
        else:
            login = Users.objects.get(user_login=send_login)
            login.delete()
            return JsonResponse(done)
# ------> Удаление тура ---------------------------
    elif switcher == 'TourDelete':
        done = {1: 'Тур удален!'}
        error = {1: 'Удалить тур невозможно!'}
        TourId = request.GET.get('TourId')
        try:
            Tour = Tours.objects.get(id=TourId)
            Tour.delete()
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ------> Удаление туриста ---------------------------
    elif switcher == 'TouristDelete':
        done = {1: 'Турист удален!'}
        error = {1: 'Удалить туриста невозможно!'}
        TouristID = request.GET.get('Tourist')
        try:
            TouristDB = Clients.objects.get(id=TouristID)
            TouristDB.delete()
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ------> Удаление гида ---------------------------
    elif switcher == 'GidDelete':
        done = {1: 'Гид удален!'}
        error = {1: 'Удалить гида не удалось!'}
        GidID = request.GET.get('Gid')
        try:
            GidDB = Gids.objects.get(id=GidID)
            GidDB.delete()
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ------> Удаление гостиницы ---------------------------
    elif switcher == 'HotelDelete':
        done = {1: 'Гостиница удалена!'}
        error = {1: 'Удалить гостиницу не удалось!'}
        HotelID = request.GET.get('Hotel')
        try:
            HotelDB = Hotels.objects.get(id=HotelID)
            HotelDB.delete()
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ------> Удаление трансфера ---------------------------
    elif switcher == 'TransferDelete':
        done = {1: 'Трансфер удален!'}
        error = {1: 'Удалить трансфер не удалось!'}
        TransferID = request.GET.get('Transfer')
        try:
            TransferDB = TourTransfer.objects.get(id=TransferID)
            TransferDB.delete()
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ------> Кнопка редактировать туриста ---------------------------
    elif switcher == 'TouristEdit':
        done = {1: 'Редактирование сохраненного туриста невозможно!'}
        TouristID = request.GET.get('Tourist')
        return JsonResponse(done)
# ------> Кнопка редактировать гида ---------------------------
    elif switcher == 'GidEdit':
        GidID = request.GET.get('Gid')
        GidDB = Gids.objects.get(id=GidID)
        request.session['CheckedGidId'] = GidID
        request.session.save()
        return render(request, 'gid_edit_page.html', context={'GidData': GidDB})
# ------> Кнопка редактировать гостиницу ---------------------------
    elif switcher == 'HotelEdit':
        HotelID = request.GET.get('Hotel')
        HotelDB = Hotels.objects.get(id=HotelID)
        request.session['CheckedHotelId'] = HotelID
        request.session.save()
        return render(request, 'hotel_edit_page.html', context={'hotel_name': HotelDB.HotelName,
                                                                'hotel_city': HotelDB.HotelCity,
                                                                'hotel_stars': HotelDB.HotelStars,
                                                                'hotel_info': HotelDB.HotelInfo})
# ------> Кнопка редактировать трансфер ---------------------------
    elif switcher == 'TransferEdit':
        TransferID = request.GET.get('Transfer')
        TransferDB = TourTransfer.objects.get(id=TransferID)
        request.session['CheckedTransferId'] = TransferID
        request.session.save()
        return render(request, 'transfer_edit_page.html', context={'TransportType': TransferDB.TransportType,
                                                                'TransportQuality': TransferDB.TransportQuality,
                                                                'TransferSeats': TransferDB.TransferSeats,
                                                                'TransportInfo': TransferDB.TransportInfo})
# ----Сохранение изменении редактирования гида--------------
    elif switcher == 'GidEditSave':
        done = {1: 'Данные гида изменены!'}
        error = {1: 'Ощибка изменения данных! Попробуйте еще!'}
        try:
            GidDB = Gids.objects.get(id=request.session['CheckedGidId'])
            GidName = request.GET.get('GidName')
            GidBirth = request.GET.get('GidBirth')
            GidAdress = request.GET.get('GidAdress')
            GidEmail = request.GET.get('GidEmail')
            GidTel = request.GET.get('GidTel')
            GidDB.GidName = GidName
            GidDB.GidBirth = GidBirth
            GidDB.GidAdress = GidAdress
            GidDB.GidEmail = GidEmail
            GidDB.GidTel = GidTel
            GidDB.save()
            request.session['CheckedGidId'] = ''
            request.session.save()
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ----Сохранение изменении редактирования гостиницы--------------
    elif switcher == 'HotelEditSave':
        done = {1: 'Данные гостиницы изменены!'}
        error = {1: 'Ощибка изменения данных! Попробуйте еще!'}
        try:
            Hotel = Hotels.objects.get(id=request.session['CheckedHotelId'])
            HotelName = request.GET.get('HotelName')
            HotelCity = request.GET.get('HotelCity')
            HotelStars = request.GET.get('HotelStars')
            HotelInfo = request.GET.get('HotelInfo')
            Hotel.HotelName = HotelName
            Hotel.HotelCity = HotelCity
            Hotel.HotelStars = HotelStars
            Hotel.HotelInfo = HotelInfo
            Hotel.save()
            request.session['CheckedHotelId'] = ''
            request.session.save()
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ----Сохранение изменении редактирования трансфера--------------
    elif switcher == 'TransferEditSave':
        done = {1: 'Данные транспорта  изменены!'}
        error = {1: 'Ощибка изменения данных! Попробуйте еще!'}
        try:
            TransferDB = TourTransfer.objects.get(id=request.session['CheckedTransferId'])
            TransportType = request.GET.get('TransportType')
            TransportQuality = request.GET.get('TransportQuality')
            TransferSeats = request.GET.get('TransferSeats')
            TransportInfo = request.GET.get('TransportInfo')
            TransferDB.TransportType = TransportType
            TransferDB.TransportQuality = TransportQuality
            TransferDB.TransferSeats = TransferSeats
            TransferDB.TransportInfo = TransportInfo
            TransferDB.save()
            request.session['CheckedTransferId'] = ''
            request.session.save()
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ---->Активные туры------------------------
    elif switcher == 'ActiveTours':
        tours = Tours.objects.values()
        return render(request, 'active_tours.html', context={'tour_data': tours, 'len': len(tours)})
# ---->Страница тура со списком туристов------------------------
    elif switcher == 'TouristList':
        TourID = request.GET.get('TourId')
        TourID = TourID.strip()
        tour = Tours.objects.get(id=TourID)
        TouristData = Clients.objects.filter(TourID__exact=TourID)
        #TouristData = Clients.objects.values()
        return render(request, 'tourist_list.html',
                      context={'tour': tour, 'TouristData': TouristData, 'Len': len(TouristData), 'Seats': tour.TouristQuantity-len(TouristData)})
    elif switcher == 'AllTouristList':
        tourist = Clients.objects.values()
        return render(request, 'all_tourist_list.html', context={'TouristData': tourist, 'Len': len(tourist)})
# ---->Подтверждение оплаты туриста------------------------
    elif switcher == 'TouristConfirm':
        done = {1: 'Оплата подтверждена!'}
        error = {1: 'Ошибка подтверждения!'}
        try:
            TouristId = request.GET.get('Tourist')
            TouristData = Clients.objects.get(id=TouristId)
            TouristData.ConfirmBuh = request.session['SessionLogin']
            TouristData.StatusPay = 'Оплачено'
            TouristData.save()
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ---->Кнопка добавить туриста------------------
    elif switcher == 'AddNewTouristBtn':
        TourId = request.GET.get('TourId')
        tour = Tours.objects.get(id=TourId)
        SummaryPay = tour.TourSummary
        VisaPay = tour.TouristVisaPrice
        TransferPay = tour.TransferPrice
        Discount = tour.TourDiscount
        return render(request, 'tourist_reg_page.html', context={'SummaryPay': SummaryPay,
                                                                 'VisaPay': VisaPay, 'TransferPay': TransferPay,
                                                                 'Discount': Discount})
# ---->Кнопка добавить Гида------------------
    elif switcher == 'AddNewGidBtn':
        return render(request, 'gid_regist_page.html')
# ---->Кнопка добавить гостиницу------------------
    elif switcher == 'AddNewHotelBtn':
        return render(request, 'hotel_regist_page.html', context={'hotel_name': 'Назание гостиницы',
                                                                  'hotel_city': 'Город расположения',
                                                                  'hotel_stars': 'Уровень', 'hotel_info': 'Информация'})
# ---->Кнопка добавить трансфер------------------
    elif switcher == 'AddNewTransferBtn':
        return render(request, 'transfer_regist_page.html')
# ---->Добавлении туриста в базу данных------------------
    elif switcher == 'TouristData':
        tourID = request.GET.get('TourId')
        done = {1: 'Турист добавлен!'}
        error = {1: 'Ощибка добавления туриста в базу!'}
        already_exist = {1: 'Такой турист уже добавлен в тур!'}
        TouristData = Clients.objects.filter(TourID__exact=tourID)
        try:
            touristName = request.GET.get('TouristFIO')            # ФИО туриста
            touristBirth = request.GET.get('TouristBirth')         # Дата рождения
            touristAdress = request.GET.get('TouristAdress')       # Адрес
            touristIIN = request.GET.get('TouristIIN')             # ИИН
            touristPassNumber = request.GET.get('TouristPassNum')  # № паспорта
            touristPassEx = request.GET.get('TouristPassEx')       # Срок паспорта
            touristTel = request.GET.get('TouristTel')             # Телефон
            touristRoomType = request.GET.get('TouristRoom')       # Размешение туриста
            touristFoodType = request.GET.get('TouristFood')       # Питание туриста
            tourSummary = Tours.objects.get(id=tourID)             # Стоимость тура
            touristPay = request.GET.get('TouristPay')             # Оплаченная сумма
            touristDebt = request.GET.get('TouristDebt')           # Долг
            touristGroup = 'none'                                  # Группа
            registManager = request.session['SessionLogin']        # Менеджер
            dateRegist = datetime.now()                            # Дата регистрации
            confirmBuh = 'Не оплачен'                              # Подтвердивщий бухгательтер
            statusPay = 'Не оплачен'                               # Статус оплаты
            touristLogin = request.GET.get('TouristIIN')           # Логин туриста (ИИН)
            touristPass = request.GET.get('TouristIIN')            # Пароль туриста (ИИН)
            touristLastLogin = datetime.now()                      # Дата последнего входа туриста
            for i in TouristData:
                if i.TouristIIN == touristIIN:
                    return JsonResponse(already_exist)
                else:
                    continue
            new_client = Clients.objects.create(TouristName=touristName, TouristBirth=touristBirth,
                                                TouristAdress=touristAdress, TouristIIN=touristIIN,
                                                TouristPassNumber=touristPassNumber, TouristPassEx=touristPassEx,
                                                TouristTel=touristTel, TouristRoomType=touristRoomType,
                                                TouristFoodType=touristFoodType, TourSummary=tourSummary.TourSummary,
                                                TouristPay=touristPay, TourDiscount=tourSummary.TourDiscount,
                                                TouristDebt=touristDebt, TouristGroup=touristGroup,
                                                RegistManager=registManager, DateRegist=dateRegist,
                                                ConfirmBuh=confirmBuh, StatusPay=statusPay, TouristLogin=touristLogin,
                                                TouristPass=touristPass, TouristLastLogin=touristLastLogin,
                                                Comments='-----', TourID=tourID)
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ---->Добавление гида в базу данных------------------
    elif switcher == 'GidData':
        done = {1: 'Гид добавлен!'}
        error = {1: 'Ощибка добавления гида в базу!'}
        try:
            GidFIO = request.GET.get('GidFIO')          # ФИО гида
            GidBirth = request.GET.get('GidBirth')      # Дата рождения
            GidAdress = request.GET.get('GidAdress')    # Адрес
            GidEmail = request.GET.get('GidEmail')      # Эл.почта
            GidTel = request.GET.get('GidTel')          # Сотовый телефон
            GidRegDate = datetime.now()                 # Дата регистрации
            new_gid = Gids.objects.create(GidName=GidFIO, GidBirth=GidBirth,
                                                GidAdress=GidAdress, GidEmail=GidEmail,
                                                GidTel=GidTel, GidCreateDate=GidRegDate)
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ---->Добавление гостиницы в базу данных------------------
    elif switcher == 'HotelData':
        done = {1: 'Гостиница добавлена!'}
        error = {1: 'Ощибка добавления гостиницы в базу!'}
        try:
            HotelName = request.GET.get('HotelName')  # Название гостиницы
            HotelCity = request.GET.get('HotelCity')  # Город
            HotelStars = request.GET.get('HotelStars')  # уровень
            HotelInfo = request.GET.get('HotelInfo')  # Инфо
            new_hotel = Hotels.objects.create(HotelName=HotelName, HotelCity=HotelCity,
                                          HotelStars=HotelStars, HotelInfo=HotelInfo)
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ---->Добавление трансфера в базу данных------------------
    elif switcher == 'TransferData':
        done = {1: 'Трансфер добавлен!'}
        error = {1: 'Ощибка добавления трансфера в базу!'}
        try:
            TransportType = request.GET.get('transport_type')
            TransportQuality = request.GET.get('transport_quality')
            TransferSeats = request.GET.get('transfer_seats')
            TransportInfo = request.GET.get('transport_info')
            new_transfer = TourTransfer.objects.create(TransportType=TransportType, TransportQuality=TransportQuality,
                                              TransferSeats=TransferSeats, TransportInfo=TransportInfo)
            return JsonResponse(done)
        except:
            return JsonResponse(error)
# ---->Список пользователей-----------------------------
    elif switcher == 'UsersList':
        people = Users.objects.values()
        return render(request, 'users_list.html', context={'db_data': people})
# ---->Список клиентов-----------------------------
    elif switcher == 'ClientsList':
        TouristID = request.GET.get('TouristID')
        ClientsData = Clients.objects.values()
        Type = request.GET.get('Type')
        if Type == 'buh':
            return render(request, 'clients_list_buh.html',
                          context={'TouristData': ClientsData, 'Len': len(ClientsData)})
        elif Type == 'comment':
            TouristData = Clients.objects.get(id=TouristID)
            done = {1: TouristData.Comments}
            return JsonResponse(done)
        elif Type == 'Save':
            comments = request.GET.get('comment')
            error = {1: 'Ошибка сохранения!'}
            done = {1: 'Комментарии сохранены!'}
            try:
                TouristData = Clients.objects.get(id=TouristID)
                TouristData.Comments = comments
                TouristData.save()
                return JsonResponse(done)
            except:
                return JsonResponse(error)
        else:
            return render(request, 'clients_list.html',
                          context={'TouristData': ClientsData, 'Len': len(ClientsData)})
# ---->Информация о клиенте-----------------------------
    elif switcher == 'ClientInfo':
        ClientId = request.GET.get('Tourist')
        ClientData = Clients.objects.get(id=ClientId)
        return render(request, 'tourist_info.html',
                      context={'TouristData': ClientData})
# ---->Информация о туре-----------------------------
    elif switcher == 'TourInfo':
        TourId = request.GET.get('TourId')
        TourData = Tours.objects.get(id=TourId)
        if TourData.FlightType == 'Прямой рейс':
            TourData.WaitingTimeTo = '---'
            TourData.WaitingTimeFrom = '---'
            TourData.TransitToArrival = '---'
            TourData.TransitToDeparture = '---'
            TourData.TransitFromArrival = '---'
            TourData.TransitFromDeparture = '---'
        return render(request, 'tour_info.html',
                      context={'TourData': TourData})
# ---->Список гидов-----------------------------
    elif switcher == 'GidList':
        GidData = Gids.objects.values()
        return render(request, 'gid_list.html', context={'GidData': GidData, 'Len': len(GidData)})
# ---->Списка гостиниц-----------------------------
    elif switcher == 'HotelsList':
        HotelsData = Hotels.objects.values()
        return render(request, 'hotels_list.html', context={'HotelsData': HotelsData, 'Len': len(HotelsData)})
# ---->Списка трансфер-----------------------------
    elif switcher == 'TransferList':
        TransferData = TourTransfer.objects.values()
        return render(request, 'transfer_list.html', context={'TransferData': TransferData, 'Len': len(TransferData)})
# ------> Добавление нового пользователя----------------------
    elif switcher == 'UserCreate':
        done = {1: 'Пользователь добавлен!'}
        error = {1: 'Ощибка добавления пользователя!'}
        already = {1: 'Такой пользователь сушествует!'}
        try:
            get_name = request.GET.get('GetName')
            get_birth = request.GET.get('GetBirth')
            get_adress = request.GET.get('GetAdress')
            get_email = request.GET.get('GetEmail')
            get_tel = request.GET.get('GetTel')
            get_login = request.GET.get('GetLogin')
            get_pass = request.GET.get('GetPass')
            get_type = request.GET.get('GetType')
            try:
                check_user = Users.objects.get(user_login=get_login)
                return JsonResponse(already)
            except:
                try:
                    user = Users.objects.create(user_name=get_name, user_birth=get_birth, user_adress=get_adress,
                                                user_email=get_email,
                                                user_tel=get_tel, user_login=get_login, user_pass=get_pass,
                                                user_type=get_type)
                    return JsonResponse(done)
                except:
                    return JsonResponse(error)
        except:
            return JsonResponse(error)
# ------->   раздел блокировки пользователя -----------------
    elif switcher == 'UserBlock':
        Block = {1: 'Пользователь заблокирован!'}
        Unblock = {1: 'Пользователь разблокирован!'}
        error = {1: 'Нельзя блокировать себя!'}
        denied = {1: 'У вас нет прав!'}
        online_login = Users.objects.get(user_login=request.session['SessionLogin'])
        send_login = request.GET.get('send_login')
        choosen_login =Users.objects.get(user_login=send_login)
        if send_login == online_login.user_login:
            return JsonResponse(error)
        elif choosen_login.user_type == 'СУПЕРАДМИН':
            return JsonResponse(denied)
        elif choosen_login.user_status == 'on-line' or choosen_login.user_status == 'off-line':
            choosen_login.user_status = 'blocked'
            choosen_login.save()
            return JsonResponse(Block)
        elif choosen_login.user_status == 'blocked':
            choosen_login.user_status = 'off-line'
            choosen_login.save()
            return JsonResponse(Unblock)
# ---->Настройки-----------------------------
    elif switcher == 'SettingsPage':
        Request = request.GET.get('Request')
        Site_Blocked = request.GET.get('Site_Blocked')
        if Site_Blocked == '':
            Site_Blocked = '---'
        currency_choose = request.GET.get('currency_choose')
        time_choose = request.GET.get('time_choose')
        SettingsType = 'Site Settings'
        done = {1: 'Настройки сохранены'}
        error = {1: 'Ощибка сохранения!'}
        if Request == 'Get':
            return render(request, 'settings_page.html')
        elif Request == 'Save':
            new_settings = Settings.objects.create(SettingsType=SettingsType, Block='---', NoticeInfo='---',
                                                   CurrencyInfo=currency_choose, TimeInfo=time_choose)
            return JsonResponse(done)
#------->   раздел тестирования функии -----------------
    elif switcher == 'Test':
        tourID = 5
        already_regist = {1: 'Такой турист уже добавлен в тур!'}
        TouristData = Clients.objects.filter(TourID__exact=tourID)
        for i in TouristData:
            if i.TouristIIN == '2':
                res = 'Yes'
                break
            else:
                res = 'No'
        done = {1: res}
        return JsonResponse(done)


# -------------------------------------------------------------------------------------------------------------------
def ActiveTours(request):
    tours = Tours.objects.values()
    return render(request, 'active_tours.html', context={'tour_data': tours})

# -------Регистрация туриста----------------------
def TouristRegist(request):
    return render(request, 'tourist_reg_page.html')
def TouristList(request):
    return render(request, 'tourist_list.html')
def ClientsList(request):
    return render(request, 'clients_list.html')
# -------Регистрация гида----------------------
def GidRegist(requst):
    return render(requst, 'gid_regist_page.html')
# -------------------------------------------------------------------------------------------------------------------

# -------Список гидов----------------------
def GidList(requst):
    return render(requst, 'gid_list.html')
# -------------------------------------------------------------------------------------------------------------------
def Vaucher(request):
    return render(request, 'vaucher.html')
