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
    console.log(data, 'data')
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
 
 const previewImages = () => {
    var preview = document.getElementById('image-preview');
    preview.innerHTML = ''; 
    var files = document.getElementById('thumbnail-input').files;

    if (files) {
        Array.from(files).forEach(file => {
            var reader = new FileReader();
            reader.onload = function(e) {
                var img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '100px'; 
                img.style.height = '100px'; 
                img.style.marginRight = '10px';
                preview.appendChild(img);
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
                console.log(data)
              window.location.href = link
            }
        },
        "json"
    );
    console.log(data)
}


// deleteMulti
const deleteMulti = (link) => {
    console.log(link)
    let Ids = getDataId()
    console.log(typeof(Ids))
    const data = {Ids}
    console.log(Ids)
    $.ajax({
        type: "delete",
        url: link,
        data: data,
        
        dataType: "json",
        success: function (response) {
            console.log(response)
            if(response.success){
                // window.location.href = link
            }
        }
    });
}


$(document).ready(function () { 
    // tagify
    let input = $('input[name="tags"][data-tagify]');
    let tagify = new Tagify(input[0]);

    // active menu
    activeMenuOnClick('#category', categoryUrl);
    activeMenuOnClick('#article', articleUrl);
    activeMenuOnClick('#contact', contactUrl);
    activeMenuOnClick('#settings', settingsUrl);
    
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

// function highlightText(node, keyword) {
//     if (node.nodeType === 3) { // Text node
//         const regex = new RegExp(`(${keyword})`, 'gi');
//         const newHtml = node.nodeValue.replace(regex, '<span class="highlight1">$1</span>');
//         $(node).replaceWith(newHtml);
//     } else {
//         $(node).contents().each(function() {
//             highlightText(this, keyword);
//         });
//     }
// }

// function clearHighlights(node) {
//     $(node).find('span.highlight').each(function() {
//         $(this).replaceWith($(this).text());
//     });
// }

// $('#keyword').on('input', function() {
//     const keyword = $(this).val().trim();
//     $('td.text-center span').each(function() {
//         clearHighlights(this);
//         if (keyword !== '') {
//             highlightText(this, keyword);
//         }
//     });
// });

$('#btn-clear').on('click', function(event) {
    event.preventDefault();
    $('#keyword').val('');
    $('td.text-center span').each(function() {
        clearHighlights(this);
    });
});


// save email settings
$('#saveEmailSettings').click(function() {
    var senderName = $('#senderName').val();
    var senderEmail = $('#senderEmail').val();
    var subject = $('#templateSubject').val();
    var message = $('#templateBody').val();

    $.ajax({
        url: '/admin/settings/email-settings', 
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





// const deleteItem = (id) => {
//     const data = { ids: [id] };
//     $.ajax({
//         type: "DELETE",
//         url: "/admin/category",
//         data: JSON.stringify(data),
//         dataType: "json",
//         success: function (response) {
//             if(response.success){
//                 console.log(response,data)
//             }
//         },
//     });
// } 

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