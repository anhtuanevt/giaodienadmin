const categoryUrl = '/admin/category'
const articleUrl = '/admin/article'
const contactUrl = '/admin/contact'
const settingsUrl = '/admin/settings'
const checkboxAll = $('.check-all');
const checkbox = $('.checkbox');

const submitContact = (event, id) => {
    event.preventDefault()
    const data = $('#contact-form').serialize();
    const method = id ? "PUT" : "POST";
    $.ajax({
        type: method,
        url: `/admin/contact/form/${id}`,
        data: data,
        dataType: "json",
        success: function (response) {
            if(response.success){
                window.location.href = "admin/contact"
            }
        }
    });
}

const changeStatus = (url, id, status) => {
    let update_data = { id, status };
    $.post(url, update_data,
        function (data, textStatus, jqXHR) {
            let { status} = data.result
            if(data.success){
                let parent = `#status-${id}`
                let classColor = "danger"
                let iconColor = "ban"

                if(status == 'active'){
                    classColor = "success"
                    iconColor = "check"
                }
                let xhtmlStatus = `<a href="javascript:changeStatus('${url}', '${id}', '${status}')" class="rounded-circle btn btn-sm btn-${classColor}"> <i class="fas fa-${iconColor}"></i></a>`
                $(parent).html(xhtmlStatus);
                alertify.success('Change status success');
            }
        },
        "json"
    );
}

 const activeMenuOnClick = (menu, pathUrl) => {
     let currentURL = window.location.pathname;
    if (currentURL.includes(pathUrl)) {
        $(menu).addClass('bg-primary');
    }
 }
 
 const previewImages = (previewId, inputId, width = '100px', height = '100px') => {
    let preview = $(previewId)
    preview.html('');
    let files = $(inputId).prop('files');

    if (files) {
        Array.from(files).forEach(file => {
            var reader = new FileReader();
            reader.onload = function(e) {
                var img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = width; 
                img.style.height = height; 
                img.style.marginRight = '10px';
                preview.append(img); 
            };
            reader.readAsDataURL(file);
        });
    }
}


const confirmDelete = (url) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to delete this item?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = url;
        }
    });
}

  // check all checkbox
const toggleSelectAll = (checkboxAll) => {
    checkbox.prop('checked', checkboxAll.checked);
}

// get data id
const getDataId = () => {
    let ids = [];
    checkbox.each(function(){
        if($(this).is(':checked')){
            ids.push($(this).data('id'));
        }
    })
    return ids;
}

// change multi status
const changeStatusAll = (status, link) => {
    let linkChangStatus = `${link}/update-multi-status`
    let ids = getDataId();
    const data = {
        ids,
        status
    }
    $.post(linkChangStatus, data,
        function (data, textStatus, jqXHR) {
            if(data.success){
              window.location.href = link
            }
        },
        "json"
    );
}


// deleteMulti
const deleteMulti = (link) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to delete this item?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let Ids = getDataId()
            const data = {Ids}
            $.ajax({
                type: "delete",
                url: link,
                data: data,
                dataType: "json",
                success: function (response) {
                    if(response.success){
                        window.location.href = link
                    }
                }
            });
        }
    });
}

const searchItems = () => {
    $.get("/admin/article/", data,
        function (data, textStatus, jqXHR) {
            
        },
        "json"
    );
}


const highlight = () => {
    var inputTexts = document.getElementsByClassName("inputText");
    var text = document.getElementById("highlighter").value;
  
    Array.from(inputTexts).forEach(inputText => {
        var innerHTML = inputText.innerHTML.replaceAll(/<span class="highlight">(.*?)<\/span>/gi, "$1");
        if (text !== "") {
            innerHTML = innerHTML.replaceAll(text, '<span class="highlight">' + text + "</span>");
        }

        inputText.innerHTML = innerHTML;
    });
}

// upload photo
const updateSettings = () => {
    const formData = new FormData();
    formData.append("logo", $('#logo')[0].files[0]);
    formData.append("banner1", $('#banner1')[0].files[0]);
    formData.append("banner2", $('#banner2')[0].files[0]);
    formData.append("banner3", $('#banner3')[0].files[0]);

    $.ajax({
        url: `${settingsUrl}/upload-photo`,
        type: 'POST',
        data: formData,
        processData: false, 
        contentType: false, 
        success: function (data, textStatus, jqXHR) {
            updateSettingsHandle(data)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Upload failed:', textStatus, errorThrown);
        }
    });
}

const updateSettingsHandle = (photoData) => {

    const facebook_url = $('#facebook').val()
    const instagram_url = $('#instagram').val()
    const twitter_url = $('#twitter').val()

    const logo = photoData.logo ?? $('#logo-preview img').attr('src');
    const site_name = $('#site_name').val()
    const about = $('#about').val()
    const contact = $('#contact').val()

    const senderName = $('#senderName').val()
    const senderEmail = $('#senderEmail').val()
    const subject = $('#templateSubject').val()
    const body = $('#templateBody').val()

    const banner1 = photoData.banner1 ?? $('#banner1-preview img').attr('src')
    const banner2 = photoData.banner2 ?? $('#banner2-preview img').attr('src')
    const banner3 = photoData.banner3 ?? $('#banner3-preview img').attr('src')

    const data = {
        "social_settings": {
            "facebook_url": facebook_url,
            "instagram_url": instagram_url,
            "twitter_url": twitter_url
        },
        "email_settings": {
            "senderName": senderName,
            "senderEmail": senderEmail,
            "subject": subject,
            "body": body
        },
        "general_info": {
            "logo": photoData.logo ?? logo,
            "site_name": site_name,
            "about": about,
            "contact": contact
        },
        "ads": {
            "banner1": photoData.banner1 ?? banner1,
            "banner2": photoData.banner2 ?? banner2,
            "banner3": photoData.banner3 ?? banner3
        }
    }

    const options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    };
    
    fetch(`${settingsUrl}`, options)
        .then(response => response.json())
        .then(data => {
            if(data.success){
               alertify.success('Update settings success')
            }else{
                alertify.error('Update settings failed')
            }
        })
        .catch((error) => {
            console.error('Error:', error); 
        });
    
}

$(document).ready(function () { 
     // active menu
     activeMenuOnClick('#category', categoryUrl);
     activeMenuOnClick('#article', articleUrl);
     activeMenuOnClick('#contact', contactUrl);
     activeMenuOnClick('#settings', settingsUrl);

    //preview image
    $('#thumbnail-input').on('change', function() {
        previewImages('#thumbnail-preview', '#thumbnail-input');
    });
    $('#logo').on('change', function() {
        previewImages('#logo-preview', '#logo');
    });
    $('#banner1').on('change', function() {
        previewImages('#banner1-preview', '#banner1', '300px', '100px');
    });
    $('#banner2').on('change', function() {
        previewImages('#banner2-preview', '#banner2', '300px', '100px');
    });
    $('#banner3').on('change', function() {
        previewImages('#banner3-preview', '#banner3', '300px', '100px');
    });

    // tagify
    var input = document.querySelector('input[name="tags"]')
    if(input){
        const tags = input.getAttribute('data-tags')
        const tagsArray = tags.split(',');
        tagify = new Tagify(input, {
            whitelist: tagsArray,
            maxTags: 10,
            dropdown: {
                maxItems: 20,           
                classname: 'tags-look', 
                enabled: 0,            
                closeOnSelect: false    
            }
        })
    }
    
    if ($('#description').length) {
        CKEDITOR.replace('description');
    }

    $(document).on('change', '.ordering', function() {
        var newOrdering = $(this).val();
        var id = $(this).closest('td').find('input[name="category-id"]').val();

        let postData = {
            id,
            newOrdering
        }
       $.post(`${categoryUrl}/update-ordering`, postData,
        function (data, textStatus, jqXHR) {
            if(data.success) {
                alertify.success('Update ordering success')
            }
        },
        "json"
       );
    })

// search handle



$('#btn-clear').on('click', function(event) {
    event.preventDefault();
    $('#keyword').val('');
    // $('td.text-center span').each(function() {
    //     clearHighlights(this);
    // });
});


// save email settings
    $('#saveEmailSettings').click(function() {
        var senderName = $('#senderName').val();
        var senderEmail = $('#senderEmail').val();
        var subject = $('#templateSubject').val();
        var message = $('#templateBody').val();

        $.ajax({
            url: `${settingsUrl}/email-settings`, 
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                senderName: senderName,
                senderEmail: senderEmail,
                subject: subject,
                message: message
            }),
            success: function(response) {
                alertify.confirm('Success', 'Email settings updated successfully!',
                function() {
                    window.location.href = '/admin'; 
                },
                function() {
                    alertify.closeAll(); 
                }).set('labels', {ok:'OK', cancel:'Cancel'});
            },
            error: function(xhr, status, error) {
                alertify.error('Error updating email settings: ' + error);
            }
        });
    });

})  




// Turn input element into a pond
    //  FilePond.registerPlugin(FilePondPluginImagePreview);

    //  const inputElement = document.querySelector('input[name="thumbnail"]');
    //  const pond = FilePond.create(inputElement);
    //  FilePond.setOptions({
    //     server: {
    //         url: '/admin/article/upload-photos',
    //         timeout: 7000,
    //         process: {
    //             url: '/upload', // Specify the backend endpoint to handle file upload
    //             method: 'POST',
    //             withCredentials: false,
    //             onload: (response) => response.key,
    //             onerror: (response) => response.data,
    //             ondata: (formData) => {
    //                 console.log(JSON.stringify(formData));
    //                 return formData;
    //             },
    //         },
    //     },
    // });
    
    // pond.on('processfile', (error, file) => {
    //     if (error) {
    //         console.error('File processing error:', error);
    //     } else {
    //         console.log('File processed:', file);
    //         pond.processFile(file, file.serverId);
    //     }
    // });
    //  pond.addFile('https://res.cloudinary.com/dzi76lgy2/image/upload/v1716543675/thumbnail/sovxgrjveg6f5mhu31ae.jpg'); // Add a file to the FilePond instance

    //  pond.on('addfile', (error, file) => {
    //      if (error) {
    //          console.error('File add error:', error);
    //      } else {
    //          console.log('File added:', file.File);
    //      }
    //  });


    //  FilePond.setOptions({
    //      server: {
    //          url: '/admin/article/upload-photos'
    //  }})
     

    // $('.filepond').filepond({
    //     allowMultiple: true,
    // });
    


    // Set allowMultiple property to true
    // $('.filepond').filepond('allowMultiple', false);

    // $('.filepond')
    // .filepond('addFile', 'http://res.cloudinary.com/dzi76lgy2/image/upload/v1716205523/thumbnail/thumbnail-1716205521015-577735266.jpg.jpg' )
    // .then(function (file) {
    //     console.log('file added', file.file);
    //     //
    // });