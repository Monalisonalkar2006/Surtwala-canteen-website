from . import views

from django.urls import path


urlpatterns = [

     path("signup/", views.signup, name="signup"),
     path("login/", views.login, name="login"),
     path("send-otp/", views.send_otp, name="send_otp"),
      path("otp/verify/", views.verify_otp, name="verify_otp"),

   

    path(
        'logout',
        views.logout,
        name='logout'
    ),

   

  

    path(
        'password/reset',
        views.reset_password,
        name='reset_password'
    ),

    path(
        'change/password',
        views.change_password,
        name='change_password'
    ),

]   