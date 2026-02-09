********************************************************************************************
                  🛒 Sistema de Gestión de Inventario - Simplest Supermercado
********************************************************************************************

Este proyecto es una aplicación Fullstack desarrollada para el Reto Técnico de Simplest Guru. Implementa un sistema de gestión de productos (CRUD) con autenticación segura y un módulo de auditoría detallado, el cual facilita le seguimiento del sistema.


*********************************************************************************************
                               DESARROLLO DEL PROYECTO SOLICITADO 
*********************************************************************************************

SE CONFORMA EN:

    Frontend: Uso de React.

    Backend: Node.js + Express.

    Base de Datos: PostgreSQL.

    Autenticación: JSON Web Tokens (JWT).
    
*******************************************************
Requisitos e Instalación
*******************************************************

1. Servidor (Backend)

    Entra a la carpeta: cd backend.---recomiendo la cmd

    Instala dependencias: npm install.

    Crea un archivo .env con tus credenciales de PostgreSQL y una clave secreta para el token.

    Ejecución: El punto de entrada principal del servidor es index.js. <-------PARA EJECUTAR

    Para desarrollo (con reinicio automático): npm run dev

    Para ejecución directa: node index.js

2. Interfaz (Frontend)

    Entra a la carpeta: cd frontend.

    Instala dependencias: npm install.

    Inicia la app: npm run dev.

***********************************************************
 Base de Datos
***********************************************************

Se adjunta el archivo database.sql con la estructura necesaria para el desarrollo y ejecición del proyecto (tablas de usuarios, productos y auditoría).


**************************************************************
Credenciales de prueba para el evaluador: es para el LOGIN
**************************************************************
    Admin: freddy / Clave: 2502

    empleado: freddy25 / Clave: 252004


**************************************************************
 Características Implementadas
**************************************************************

    Autenticación: Registro y Login con contraseñas encriptadas mediante Bcrypt.

    Seguridad: El token se almacena en localStorage y es requerido para todas las operaciones del CRUD.

    Módulo de Auditoría: (Valor Agregado) El sistema registra automáticamente quién realizó cada cambio (ej. freddy25), la acción ejecutada y la fecha exacta, asegurando trazabilidad total.

    Organización:EL Código es de tipo modular con clara separación de responsabilidades (Controladores, Rutas y Middlewares).


*********************************************************************************************

Desarrollado por: Freddy Flórez

Proyecto para: Simplest© 2025