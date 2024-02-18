from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_page, name='main_page'),
    path('superadmin/', views.SuperAdmin),
    path('regist_page/', views.regist_page),
    path('check_login/', views.check_login),
    path('cabinet_admin/', views.cabinet_admin),
    path('cabinet_manager/', views.cabinet_manager),
    path('cabinet_buhgalter/', views.cabinet_buhgalter),
    path('jinja_test/', views.jinja_test),
    path('error_login', views.main_page, kwargs={'error_logo':'grid'}),
    path('users_list/', views.users_list),
    path('tour_create_page/', views.NewTour),
    path('user_info/', views.user_info),
    path('test_form/', views.test_form),
    path('ajax-server/', views.AjaxServer),
    path('active_tours/', views.ActiveTours),
    path('tourist_regist/', views.TouristRegist),
    path('tourist_list/', views.TouristList),
    path('clients_list/', views.ClientsList),
    path('gid_regist_page/', views.GidRegist),
    path('gid_list/', views.GidList),
    path('vaucher/', views.Vaucher),
]