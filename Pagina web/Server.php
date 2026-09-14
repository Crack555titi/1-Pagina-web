const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(express.json()); // Permite al servidor leer formato JSON

// Servir tus archivos HTML y JS automáticamente desde una carpeta llamada "public"
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a tu base de datos SQLite
const db = new sqlite3.Database('./sistema_usuarios.db', (err) => {
    if (err) console.error("Error al abrir la base de datos", err);
    else console.log("Conectado con éxito a SQLite");
});

// RUTA DE LOGIN: Aquí es donde tu página web enviará los datos para validar
app.post('/login', (req, require) => {
    const { email, password } = req.body;

    // Buscamos en la base de datos usando código SQL seguro
    const sql = `SELECT validacion FROM usuarios WHERE email = ? AND password = ?`;
    
    db.get(sql, [email, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Error en el servidor" });
        }
        
        if (row) {
            // Si encontró al usuario, devolvemos su estado de validación (1)
            res.json({ valido: true, validacion: row.validacion });
        } else {
            // Si los datos están mal, devolvemos falso
            res.json({ valido: false, validacion: 0 });
        }
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});