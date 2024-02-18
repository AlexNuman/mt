var UserInfoBtn = document.getElementById('info_ok');
UserInfoBtn.onclick = function() {
modal.style.display = "none";
}

/*-----Изменение данных пользователя-------------*/
var UserChangeBtn = document.getElementById('info_change');
UserChangeBtn.onclick = function() {
    $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'json',
        data: {switсh: 'UserInfoChange',
            user_fio: $("#info_fio").val(),
            user_birth: $("#info_birth").val(),
            user_adress: $("#info_ardess").val(),
            user_email: $("#info_mail").val(),
            user_tel: $("#info_tel").val()},
        success: function(data){
            info = data[1];
            alert(info);
            modal.style.display = "none";
            }
    });
    return false;
}
/*-------------------------------------------------*/