import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para limpiar el error cuando el usuario vuelve a escribir
  const handleInputChange = (setter, value) => {
    setter(value);
    if (error) setError(''); 
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // --- VALIDACIÓN LOCAL DE SEGURIDAD ---
    if (password.length < 6) {
      console.warn("⚠️ Intento de registro fallido: Contraseña demasiado corta.");
      setError('La contraseña debe tener al menos 6 caracteres');
      return; // Detiene la ejecución aquí y no envía nada al servidor
    }

    try {
      console.log("🚀 Enviando solicitud de registro al servidor..."); 
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Registro exitoso en DB para el usuario:", username); 
        alert('¡Usuario registrado con éxito! Ahora puedes iniciar sesión.');
        navigate('/login'); 
      } else {
        // Captura errores del servidor como duplicados de credenciales
        console.error("❌ Error devuelto por el servidor:", data.error); 
        setError(data.error || 'Error al registrar usuario');
      }
    } catch (err) {
      console.error("🚫 Error crítico de conexión:", err);
      setError('No se pudo conectar con el servidor');
    }
  };

  // --- ESTILOS ---
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
    fontSize: '1rem'
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
      
      <div style={darkCard}>
        <h2 style={{ textAlign: 'center', marginTop: 0, color: '#00ff88' }}>
          Registro de Supermercado 🛒
        </h2>
        
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => handleInputChange(setUsername, e.target.value)}
              style={inputDark}
              placeholder="Nombre de usuario"
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Contraseña (mín. 6):</label>
            <input
              type="password"
              value={password}
              onChange={(e) => handleInputChange(setPassword, e.target.value)}
              style={inputDark}
              placeholder="Escribe tu clave de seguridad"
              required
            />
          </div>

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
            REGISTRARME
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '25px', borderTop: '1px solid #333', paddingTop: '15px' }}>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
            ¿Ya tienes una cuenta?{' '}
            <span 
              onClick={() => navigate('/login')} 
              style={{ color: '#00d4ff', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              Inicia Sesión aquí
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

export default RegisterPage;