import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  // ESTADOS LOCALES 
  const [products, setProducts] = useState([]); // Almacena el inventario proveniente de la DB
  const [users, setUsers] = useState([]);       // Almacena la lista de personal (Solo accesible para Admin)
  
  // NUEVOS ESTADOS AÑADIDOS PARA AUDITORÍA 
  const [logs, setLogs] = useState([]);         // Almacena el historial de la tabla extra
  const [vista, setVista] = useState('inventario'); // Controla la vista actual: 'inventario' o 'auditoria'
  
  const [name, setName] = useState('');         // Estado para el nombre del nuevo producto
  const [price, setPrice] = useState('');        // Estado para el precio del nuevo producto
  const [stock, setStock] = useState('');        // Estado para el stock del nuevo producto
  
  const navigate = useNavigate();
  
  // --- DATOS DE SESIÓN (Extraídos de LocalStorage) 
  const currentUser = localStorage.getItem('username') || 'Usuario';
  const userRole = localStorage.getItem('role') || 'empleado';
  const token = localStorage.getItem('token');

  //CARGA DE DATOS AL INICIAR EL COMPONENTE 
  useEffect(() => {
    // CAMBIO AÑADIDO: Validación de usuario bloqueado
    // Si el rol es bloqueado, se le expulsa del sistema con un mensaje, es una alerta con fin de bloquear a los usuarios que no esten trabanjo o esten despedidos.
    if (userRole === 'bloqueado') {
      alert("❌ Error: Acceso bloqueado. No tiene permisos para entrar al sistema.");
      localStorage.clear();
      navigate('/login');
      return;
    }

    if (!token) {
      navigate('/login'); // Redirigir al login si no se detecta un token activo
    } else {
      fetchProducts();
      if (userRole === 'admin') fetchUsers(); 
    }
  }, [token, userRole, navigate]);

  // LÓGICA DE PRODUCTOS (INVENTARIO)*** lo que sería el crud central de este proyecto 

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("❌ Error de conexión al cargar productos");
    }
  };

  // - CARGA DE AUDITORÍA, con el fin de llevar un registro de quien modifica el sistema ---
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auditoria', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      }
    } catch (err) {
      console.error("❌ Error al cargar la tabla de auditoría");
    }
  };

  const onlyNumbers = (e) => {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', '.', 'Enter'];
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !stock) return alert("⚠️ Todos los campos son obligatorios para registrar un producto");

    try {
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, price: parseFloat(price), stock: parseInt(stock) }),
      });
      if (response.ok) { 
        alert("✅ Producto añadido exitosamente al inventario");
        fetchProducts(); 
        setName(''); setPrice(''); setStock(''); 
      }
    } catch (err) { alert("❌ Error técnico al intentar guardar el producto"); }
  };

  const handleUpdate = async (id, updatedValue, field, product) => {
    const originalValue = field === 'price' ? product.price : product.stock;
    if (parseFloat(updatedValue) === parseFloat(originalValue)) {
      return; 
    }

    try {
      const bodyData = {
        price: field === 'price' ? parseFloat(updatedValue) : parseFloat(product.price),
        stock: field === 'stock' ? parseInt(updatedValue) : parseInt(product.stock)
      };

      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        alert(`✨ ¡Actualizado! Se han guardado los cambios para "${product.name}" exitosamente.`);
        fetchProducts(); 
      }
    } catch (err) { alert("❌ Error de red: No se pudo actualizar el producto"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás totalmente seguro de que deseas eliminar este producto?")) return;
    const response = await fetch(`http://localhost:3001/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      alert("🗑️ El producto ha sido borrado del sistema.");
      fetchProducts();
    }
  };

  // LÓGICA DE USUARIOS admin 

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (err) { console.error("❌ Error al cargar la tabla de personal"); }
  };

  const handleRoleChange = async (id, targetUser, newRole) => {
    if (targetUser === currentUser) {
      alert("⛔ Acción denegada: No puedes cambiar tus propios privilegios.");
      return;
    }
    
    const response = await fetch(`http://localhost:3001/api/users/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ role: newRole }),
    });
    if (response.ok) {
      alert(`✅ El usuario "${targetUser}" ahora tiene el rol de: ${newRole}`);
      fetchUsers();
    }
  };

  // --- ESTILOS VISUALES -------------------------------------------------------------------------------------------------------------------------------------------------------
  const darkCard = { 
    backgroundColor: '#1e1e1e', 
    padding: '25px', 
    borderRadius: '12px', 
    marginBottom: '30px', 
    border: '1px solid #333', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)' 
  };
  
  const inputDark = { 
    backgroundColor: '#2d2d2d', 
    color: 'white', 
    border: '1px solid #444', 
    padding: '10px', 
    borderRadius: '6px' 
  };

  const scrollContainer = { 
    maxHeight: '400px', 
    overflowY: 'auto', 
    border: '1px solid #2a2a2a', 
    borderRadius: '8px' 
  };

  const userScrollStyle = {
    maxHeight: users.length > 4 ? '240px' : 'auto',
    overflowY: users.length > 4 ? 'auto' : 'visible',
    border: '1px solid #2a2a2a',
    borderRadius: '8px'
  };

  return (
    <div style={{ 
      backgroundColor: '#121212', 
      color: 'white', 
      minHeight: '100vh', 
      padding: '40px 20px', 
      fontFamily: 'Arial, sans-serif',
      display: 'flex',          
      justifyContent: 'center'  
    }}>
      
      <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
          <h2 style={{ fontSize: '1.8rem' }}>Supermercado Simplest 🛒</h2>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0 }}>Bienvenido: <strong style={{ color: '#00ff88' }}>{currentUser}</strong></p>
            <p style={{ margin: '5px 0', fontSize: '0.85rem', color: '#aaa' }}>Rol: {userRole}</p>
            <button onClick={() => { localStorage.clear(); navigate('/login'); }} style={{ cursor: 'pointer', backgroundColor: '#444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px' }}>Cerrar Sesión</button>
          </div>
        </header>

        {/* NAVEGACIÓN ENTRE VISTAS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          <button 
            onClick={() => setVista('inventario')}
            style={{ 
              padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', border: 'none', fontWeight: 'bold',
              backgroundColor: vista === 'inventario' ? '#28a745' : '#333', color: 'white'
            }}
          >
            📦 Inventario
          </button>
          
          {/* Solo el admin puede ver este botón */}
          {userRole === 'admin' && (
            <button 
              onClick={() => { setVista('auditoria'); fetchLogs(); }}
              style={{ 
                padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', border: 'none', fontWeight: 'bold',
                backgroundColor: vista === 'auditoria' ? '#28a745' : '#333', color: 'white'
              }}
            >
              📜 Ver Historial
            </button>
          )}
        </div>

        {/* --- RENDERIZADO CONDICIONAL DE VISTAS --- */}
        {vista === 'inventario' ? (
          <>
            {userRole === 'admin' && (
              <section style={darkCard}>
                <h3 style={{ color: '#00ff88', marginTop: 0, marginBottom: '20px' }}>Gestión de Personal</h3>
                <div style={userScrollStyle}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#1e1e1e', zIndex: 10 }}>
                      <tr style={{ textAlign: 'left', borderBottom: '2px solid #444', color: '#888888' }}>
                        <th style={{ padding: '12px' }}>Empleado</th>
                        <th>Rol Actual</th>
                        <th>Modificar Permisos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id} style={{ borderBottom: '1px solid #2a2a2a' }}>
                          <td style={{ padding: '12px' }}>
                            {u.username} {u.username === currentUser && <span style={{ color: '#00ff88', marginLeft: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>(Tú)</span>}
                          </td>
                          <td style={{ fontSize: '0.9rem', color: '#ccc' }}>{u.role.toUpperCase()}</td>
                          <td>
                            <select 
                              defaultValue={u.role} 
                              disabled={u.username === currentUser}
                              onChange={(e) => handleRoleChange(u.id, u.username, e.target.value)}
                              style={{ ...inputDark, opacity: u.username === currentUser ? 0.5 : 1, cursor: u.username === currentUser ? 'not-allowed' : 'pointer' }}
                            >
                              <option value="empleado">Empleado</option>
                              <option value="admin">Administrador</option>
                              <option value="bloqueado">Bloquear Acceso</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <section style={darkCard}>
              <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Inventario General</h3>
              
              {userRole === 'admin' && (
                <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                  <input placeholder="Nombre del producto" value={name} onChange={e => setName(e.target.value)} style={{ ...inputDark, flex: 2 }} />
                  <input placeholder="Precio" value={price} onKeyDown={onlyNumbers} onChange={e => setPrice(e.target.value)} style={{ ...inputDark, flex: 1 }} />
                  <input placeholder="Stock" value={stock} onKeyDown={onlyNumbers} onChange={e => setStock(e.target.value)} style={{ ...inputDark, flex: 1 }} />
                  <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>GUARDAR</button>
                </form>
              )}
             

              <div style={scrollContainer}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ position: 'sticky', top: 0, backgroundColor: '#252525', zIndex: 10 }}>
                    <tr style={{ color: '#00d4ff' }}>
                      <th style={{ padding: '15px' }}>ID</th>
                      <th>Producto</th>
                      <th>Precio (Edit Admin)</th>
                      <th>Existencias</th>
                      {userRole === 'admin' && <th>Acción</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #333', textAlign: 'center' }}>
                        <td style={{ padding: '12px', color: '#666' }}>{p.id}</td>
                        <td style={{ fontWeight: 'bold' }}>{p.name}</td>
                        <td>
                          <span style={{ color: '#00ff88', marginRight: '4px' }}>$</span>
                          <input 
                            type="text"
                            defaultValue={p.price}
                            readOnly={userRole !== 'admin'}
                            onKeyDown={onlyNumbers}
                            onBlur={(e) => handleUpdate(p.id, e.target.value, 'price', p)}
                            style={{ ...inputDark, width: '80px', textAlign: 'center', border: userRole !== 'admin' ? 'none' : '1px solid #444', backgroundColor: userRole !== 'admin' ? 'transparent' : '#2d2d2d' }}
                          />
                        </td>
                        <td>
                          <input 
                            type="text"
                            defaultValue={p.stock}
                            onKeyDown={onlyNumbers}
                            onBlur={(e) => handleUpdate(p.id, e.target.value, 'stock', p)}
                            style={{ ...inputDark, width: '80px', textAlign: 'center' }}
                          /> <span style={{ fontSize: '0.8rem', color: '#888' }}>Uds.</span>
                        </td>
                        {userRole === 'admin' && (
                          <td>
                            <button onClick={() => handleDelete(p.id)} style={{ color: '#ff4444', background: 'none', border: '1px solid #ff4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>ELIMINAR</button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          /* --- VISTA: TABLA DE AUDITORÍA (Pero solo para admins) --- */
          userRole === 'admin' ? (
            <section style={darkCard}>
              <h3 style={{ color: '#00ff88', marginTop: 0, marginBottom: '20px' }}>Historial de Actividad (Auditoría)</h3>
              <div style={scrollContainer}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ position: 'sticky', top: 0, backgroundColor: '#252525', zIndex: 10 }}>
                    <tr style={{ color: '#00d4ff', textAlign: 'left' }}>
                      <th style={{ padding: '15px' }}>Usuario</th>
                      <th>Acción</th>
                      <th>Detalles</th>
                      <th>Fecha y Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map(log => (
                      <tr key={log.id} style={{ borderBottom: '1px solid #333' }}>
                        <td style={{ padding: '12px', fontWeight: 'bold' }}>{log.usuario}</td>
                        <td>
                          <span style={{ 
                            backgroundColor: log.accion === 'ELIMINAR' ? '#442222' : '#224422',
                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem'
                          }}>
                            {log.accion}
                          </span>
                        </td>
                        <td style={{ color: '#aaa', fontSize: '0.85rem' }}>{log.detalles}</td>
                        <td style={{ color: '#888', fontSize: '0.85rem' }}>{new Date(log.fecha).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            /* Bloqueo por si alguien intenta cambiar el estado manualmente */
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h2 style={{ color: '#ff4444' }}>⛔ Acceso Denegado</h2>
              <p>No tiene permisos para ver el historial.</p>
              <button onClick={() => setVista('inventario')} style={{ ...inputDark, cursor: 'pointer' }}>Regresar</button>
            </div>
          )
        )}

        <footer style={{ textAlign: 'center', marginTop: '20px', color: '#9c9a9a', fontSize: '0.8rem' }}>
          Sistema de Gestión Simplest Supermercado © 2026 | Desarrollado por Freddy
        </footer>
      </div>
    </div>
  );
};

export default DashboardPage;