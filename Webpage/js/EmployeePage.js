$().ready(function()
{    
    alert(`Bienvenido a SysOp, ${sessionStorage.getItem("username")}!`);
    $("#cerrarSesion").click(()=>{
        sessionStorage.clear();
        window.location.replace(".");
    });

})