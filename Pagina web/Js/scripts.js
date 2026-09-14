console.log("JavaScript conectado correctamente");
function eliminar_boton_registro(estado)
{
    if (estado == 0)
    {
        const elemento = document.getElementById("registro");
        elemento.remove();
    }
}