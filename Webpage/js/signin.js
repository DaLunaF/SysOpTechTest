$().ready(function(){
    const formSignIn = $("#formSignIn");
    
    $(formSignIn).validate({
        rules: {
            username:
            {
                required: true,
                minlength: 5
            },
            email:
            {
                required: true,
                email: true
            },
            password:
            {
                required: true,
                minlength: 8
            },
            phone:
            {
                required: true,
                minlength: 10
            },
            birthday:
            {
                required: true
            }
        },
        messages:{
            username: 
            {
                required: "Requisito.",
                minlength: "El nombre de usuario debe contener al menos 5 caracteres."
            },
            email: 
            {
                required: "Requisito.",
                email: "Formato incorrecto."
            },
            password: 
            {
                required: "Requisito.",
                minlength: "La contraseña debe contener al menos 8 caracteres."
            },
            phone:
            {
                required: "Requisito.",
                minlength: "El teléfono debe contener 10 caracteres"
            },
            birthday:
            {
                required: "Requisito."
            }
        }
    });
    
    $(formSignIn).submit((e) =>{
        e.preventDefault();

        let formData = $(formSignIn).serializeArray();
        formData[3].value = md5(formData[3].value);

        if($(formSignIn).valid()){
            $.ajax({
                type:'POST',
                url: './../php/CreateUser.php',
                data: formData,
                // data: $(formSignIn).serializeArray(),
                success: function(msg, status, jqXHR)
                {
                    console.log(msg);
                    const json = JSON.parse(msg);
                    if(json.success)
                    {
                        alert("Enviamos un correo de confirmación a: "+$("#input_email").val());
                        sessionStorage.setItem("username", $("#input_username").val())
                        if($("#input_role").val() == "Administrador")
                            window.location.replace("./../pages/AdminPage.html");
                        else
                            window.location.replace("./../pages/EmployeePage.html");
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
})