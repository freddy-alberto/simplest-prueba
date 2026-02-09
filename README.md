# 🛒 Sistema de Gestión de Inventario - Simplest Supermercado

Este proyecto es una aplicación **Fullstack** de alto rendimiento diseñada para el **Reto Técnico de Simplest Guru**. La solución permite gestionar el inventario de productos mediante un CRUD completo, integrando seguridad avanzada con JWT y un sistema de trazabilidad mediante auditorías automáticas.

---

## 🛠️ Stack Tecnológico

* **Frontend:** React con Vite (Interfaz reactiva y moderna).
* **Backend:** Node.js + Express (Servidor escalable).
* **Base de Datos:** PostgreSQL (Gestión de datos relacionales).
* **Seguridad:** Autenticación mediante JSON Web Tokens (JWT) y encriptación de claves con Bcrypt.

---

## ⚙️ Requisitos e Instalación

### 1. Servidor (Backend)
Para configurar el núcleo del sistema, siga estos pasos:

1.  Navegue a la carpeta: `cd backend`
2.  Instale las dependencias necesarias: `npm install`
3.  **Configuración de Seguridad:** Cree un archivo `.env` en la raíz de la carpeta `backend` y defina sus credenciales:
    ```env
    PORT=3001
    DB_USER=postgres
    DB_PASSWORD=tu_contraseña_aqui
    DB_HOST=localhost
    DB_PORT=5432
    DB_DATABASE=simplest_db1
    JWT_SECRET=supermercado_secreto_123
    ```
4.  **Ejecución:**
    * Para desarrollo: `npx nodemon src/index.js`
    * Ejecución estándar: `node src/index.js`

### 2. Interfaz (Frontend)
Para visualizar el panel de control:

1.  Navegue a la carpeta: `cd frontend`
2.  Instale las dependencias: `npm install`
3.  Inicie el servidor de desarrollo: `npm run dev`
4.  Acceda localmente en: `http://localhost:5173`

---

## 🗄️ Base de Datos
El proyecto incluye un archivo estructurado en **`backend/database.sql`**. Este script genera automáticamente las tablas de:
* **Usuarios:** Con roles diferenciados.
* **Productos:** El inventario central.
* **Auditoría:** Registro histórico de cambios.

> **Importante:** Asegúrese de crear la base de datos `simplest_db1` en su PostgreSQL antes de ejecutar el script.

---

## 🔑 Credenciales de Acceso (Modo Prueba)

Utilice los siguientes perfiles para validar los niveles de acceso:

| Rol | Usuario | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | `freddy` | `2502` |
| **Empleado** | `freddy25` | `252004` |

---

## ✨ Valor Agregado: Módulo de Auditoría

A diferencia de un CRUD convencional, este sistema implementa un **Middleware de Auditoría**. 
* **Trazabilidad Total:** Cada vez que un usuario crea, edita o elimina un producto, el sistema captura automáticamente quién hizo la acción, la fecha exacta y el detalle del cambio.
* **Transparencia:** Ideal para entornos de supermercado donde se requiere control estricto sobre el inventario.

---

## 👤 Información del Desarrollador
* **Autor:** Freddy Flórez
* **Propósito:** Entrega de Reto Técnico
* **Entidad:** Simplest Guru
* **Año:** 2026

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------