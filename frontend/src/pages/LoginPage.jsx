import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // ESTADOS LOCALES 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Maneja el mensaje de error que verá el usuario
  const navigate = useNavigate();

  // Función para limpiar el error visual apenas el usuario vuelva a tocar los datos
  const handleInputChange = (setter, value) => {
    setter(value);
    if (error) setError(''); 
  };

  // --- LÓGICA DE INICIO DE SESIÓN 
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      console.log("🚀 Intentando iniciar sesión..."); // Log de inicio de acción
      
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login de tipo positivo: informa al servidor /consola que las credenciales son correctas
        console.log("✅ Acceso concedido para el usuario:", data.user.username); 
        
        // Persistencia de la sesión--lo solicitado en el informe
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('role', data.user.role); 
        
        alert(`¡Bienvenido de nuevo, ${data.user.username}!`);
        navigate('/dashboard'); // Redirección al panel principal
      } else {
        // ERROR DINÁMICO: Captura el mensaje exacto enviado por el servidor
        // para que el usuario sepa si falló el nombre, la clave o si el usuario no existe.
        const serverErrorMessage = data.error || 'Usuario o contraseña incorrectos';
        console.error("❌ Error en el inicio de sesión:", serverErrorMessage); 
        setError(serverErrorMessage); 
      }
    } catch (err) {
      // Manejo de errores de red o fallo en el fetch
      console.error("🚫 Error de red al intentar login:", err);
      setError('Error al conectar con el servidor');
    }
  };

  // --- ESTILOS UNIFICADOS (Identidad visual del sistema) ---
  const darkCard = { 
    backgroundColor: '#1e1e1e', 
    padding: '30px', 
    borderRadius: '12px', 
    border: '1px solid #333', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
    width: '100%',
    maxWidth: '400px'
  };
  
  const inputDark = { 
    backgroundColor: '#2d2d2d', 
    color: 'white', 
    border: '1px solid #444', 
    padding: '12px', 
    borderRadius: '6px',
    width: '100%',
    marginTop: '8px',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    backgroundColor: '#28a745', 
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '20px',
    fontSize: '1rem',
    textTransform: 'uppercase'
  };

  return (
    <div style={{ 
      backgroundColor: '#121212', 
      color: 'white', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      
      {/* Contenedor del Formulario */}
      <div style={darkCard}>
        <h2 style={{ textAlign: 'center', marginTop: 0, color: '#00ff88' }}>
          Login Supermercado 🛒
        </h2>
        
        <form onSubmit={handleLogin}>
          {/* Input de Usuario */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => handleInputChange(setUsername, e.target.value)}
              style={inputDark}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          {/* Input de Contraseña */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => handleInputChange(setPassword, e.target.value)}
              style={inputDark}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Mostrar error si el servidor responde con fallo */}
          {error && (
            <p style={{ 
              color: '#ff4444', 
              backgroundColor: 'rgba(255, 68, 68, 0.1)', 
              padding: '10px', 
              borderRadius: '4px', 
              fontSize: '0.9rem',
              textAlign: 'center',
              border: '1px solid rgba(255, 68, 68, 0.2)',
              margin: '10px 0'
            }}>
              ⚠️ {error}
            </p>
          )}

          <button type="submit" style={buttonStyle}>
            INICIAR SESIÓN
          </button>
        </form>

        {/* Enlace para ir al Registro */}
        <div style={{ textAlign: 'center', marginTop: '25px', borderTop: '1px solid #333', paddingTop: '15px' }}>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
            ¿No tienes cuenta aún?{' '}
            <span 
              onClick={() => navigate('/register')} 
              style={{ color: '#00d4ff', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              Regístrate aquí
            </span>
          </p>
        </div>
      </div>

      <footer style={{ marginTop: '20px', color: '#444', fontSize: '0.8rem' }}>
        Sistema de Gestión Simplest Supermercado © 2026
      </footer>
    </div>
  );
};

export default LoginPage;