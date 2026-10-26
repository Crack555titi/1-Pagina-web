# Aerus Club

Sitio web PHP/MySQL para ejecutar en un servidor local (por ejemplo XAMPP).

## Puesta en marcha
1. Copiar la carpeta `Pagina web` dentro de `htdocs/1-Pagina-web/` para conservar las rutas del puente de login/registro.
2. Importar `mi_paginaweb.sql` en phpMyAdmin **en una base nueva** llamada `mi_paginaweb`. Si ya tenías importado el SQL anterior, ejecutar solamente las instrucciones nuevas desde el comentario `Funcionalidades nuevas de Aerus Club` y comprobar que no se repitan columnas/tablas.
3. Revisar las credenciales PDO en `Server.php`, `PHP/pagos.php`, `PHP/actualizar_perfil.php` y `PHP/api_club.php` según tu instalación.
4. Para habilitar al encargado, después de registrar su usuario ejecutar: `UPDATE usuarios SET rol='encargado' WHERE email='correo-del-encargado';`
5. Cambiar `QR_SECRETO` en `PHP/pagos.php` y configurar la misma variable de entorno `AERUS_QR_SECRET` para el endpoint verificador. En desarrollo ambos usan la frase de ejemplo; no dejarla en producción.
6. La cámara QR y la PWA necesitan HTTPS o `localhost`. El shell puede abrirse sin conexión, pero las operaciones de pagos, validación, reservas y comentarios requieren servidor y base de datos conectados.

## Funciones añadidas
- Panel privado de encargado para revisar pagos y moderar comentarios.
- Verificador de credenciales QR con firma HMAC y vigencia de cuota.
- Contraseñas con `password_hash`/`password_verify`; el login convierte automáticamente hashes heredados en texto plano cuando el usuario inicia sesión.
- Historial de pagos, comentarios moderados, formulario de contacto, reservas de clase y agenda conectados a MySQL.
- Tema claro/oscuro, galería, resultados de muestra explícitamente etiquetados como simulados y estructura PWA.

**Importante:** ejecutar el bloque SQL de nuevas tablas/columnas una sola vez; las credenciales de base de datos y el rol encargado deben configurarse antes de probar las funciones protegidas.
