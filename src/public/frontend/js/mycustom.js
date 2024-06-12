
const submitContact = (event) => {
    event.preventDefault()
    const data = $('#contact-form').serialize();
    $.post("/admin/contact/form", data,
        function (data, textStatus, jqXHR) {
            if(data.success){
                alertify.notify('Submit successfull', 'success', 2, function(){  
                    window.location.href = '/';
                });
            }else{
                alertify.notify('Submit failed', 'error')
            }
        },
        "json"
    );
}