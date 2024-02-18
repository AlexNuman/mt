$('#ajax_form').submit(function() {
    $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'html',
         data: {switсh: 'юзер'},
        success: function(data){
            info = data;
            $('#recieve').html(info);
        }
    });
    return false;
})