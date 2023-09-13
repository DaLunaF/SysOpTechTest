$().ready(function(){
    var username = sessionStorage.getItem("username");

    $.ajax({
        type:'GET',
        url: './../php/GetAllUsers.php',
        success: function(msg, status, jqXHR)
        {
            const json = JSON.parse(msg);
            if(json.success)
            {
                console.log(json);
                json.response.forEach(employee => {
                    $("#employeeTable").append(`
                    <tr>
                    <td>${employee.username}</td>
                    <td>${employee.role}</td>
                    <td>${employee.email}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.birthday}</td>
                    </tr>`)
                });
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

    const formCreate = $("#formCreateUser");
    $(formCreate).validate({
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

    formCreate.submit((e)=>
    {
        e.preventDefault();
        
        let formData = $(formCreate).serializeArray();
        formData[3].value = md5(formData[3].value);

        if($(formCreate).valid()){
            $.ajax({
                type:'POST',
                url: './../php/CreateUser.php',
                // data: $(formCreate).serializeArray(),
                data: formData,
                success: function(msg, status, jqXHR)
                {
                    const json = JSON.parse(msg);
                    if(json.success)
                    {
                        sendEmail($("#input_username"), $("#input_email"));
                        alert("Se ha enviado un correo de confirmación a: " + formData[2].value);
                        
                        $("#employeeTable").append(`
                        <tr>
                        <td>${formData[0].value}</td>
                        <td>${formData[1].value}</td>
                        <td>${formData[2].value}</td>
                        <td>${formData[4].value}</td>
                        <td>${formData[5].value}</td>
                        </tr>`)
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
    })
    
    $("#cerrarSesion").click(()=>{
        sessionStorage.clear();
        window.location.replace(".");
    })
})

function sendEmail(p_name, p_email)
{
    $.ajax({
        type:'POST',
        url: './../php/Mail.php',
        data: {email: p_email, subject: `Bienvenido, ${p_name}`, message:`Bienvenido a SysOp a partir de este
        momento formaras parte de una de las empresas más grandes de marketing digital
        y diseño web de Monterrey`}
    });
}