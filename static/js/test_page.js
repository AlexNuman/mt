$('#LogTest').submit(function() {
    $.ajax({
        url: '/ajax-server/',
        method: 'get',
        dataType: 'json',
         data: {switсh: 'Test'},
        success: function(data){
            info = data[1];
            alert(info);
        }
    });
    return false;
})