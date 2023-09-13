

$().ready(function(){
    const loginForm = $("#loginForm");
    $(loginForm).validate({
        rules: {
            email:
            {
                required: true,
                email: true
            },
            password:
            {
                required: true,
                minlength: 8
            }
        },
        messages:{
            email: 
            {
                required: "Requisito.",
                email: "Formato incorrecto."
            },
            password: 
            {
                required: "Requisito.",
                minlength: "Mínimo 8 caracteres."
            }
        }
    });

    $(loginForm).submit((e) =>{
        e.preventDefault();

        let formData = $(loginForm).serializeArray()
        formData[1].value = md5(formData[1].value);
        
        if($(loginForm).valid()){
            $.ajax({
                type:'GET',
                url: './../php/LoginUser.php',
                // data: $(loginForm).serializeArray(),
                data: formData,
                success: function(msg, status, jqXHR)
                {
                    const json = JSON.parse(msg);
                    if(json.success)
                    {
                        if(json.response != null)
                        {
                            sessionStorage.setItem('username', json.response.username);
                            if(json.response.role == "Administrador")
                                window.location.replace("AdminPage.html");
                            else
                                window.location.replace("EmployeePage.html");
                        }
                        else
                        {
                            alert("Usuario no encontrado");
                        }
                    }
                    else
                    {
                        alert("Hubo un error de nuestra parte. El usuario no pudo ser creado");
                    }
                },
                error: function(xhr, status, error) 
                {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                }
            });
        }
    });
});