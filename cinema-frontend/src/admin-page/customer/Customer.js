import { useEffect, useState } from 'react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/customers/private')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleAddCustomer = () => {
    fetch('http://localhost:8080/api/auth/register/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
    })
      .then(() => {
        setNewCustomer('');
        return fetch('http://localhost:8080/api/customers/private');
      })
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error adding customer:', error));
  };

  const handleEditCustomer = (id) => {
    fetch(`http://localhost:8080/api/customers/private/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: editedCustomer }),
    })
      .then(response => {
        if (response.ok) {
          return fetch('http://localhost:8080/api/customers/private');
        } else {
          throw new Error('Error updating customer');
        }
      })
      .then(response => response.json())
      .then(data => {
        setEditingCustomer(null);
        setEditedCustomer('');
        setCustomers(data);
      })
      .catch(error => console.error('Error editing customer:', error));
  };

  const handleDeleteCustomer = (id) => {
    fetch(`http://localhost:8080/api/customers/private/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetch('http://localhost:8080/api/customers/private')) 
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error deleting customer:', error));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <input
        type="text"
        value={newCustomer.username}
        onChange={(e) => setNewCustomer(prev => ({ ...prev, username: e.target.value }))}
        placeholder="Nombre de usuario"
      />
      <input
        type="password"
        value={newCustomer.password}
        onChange={(e) => setNewCustomer(prev => ({ ...prev, password: e.target.value }))}
        placeholder="Contraseña"
      />
      <button onClick={handleAddCustomer} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
        Agregar
      </button>
      <ul>
        {Array.isArray(customers) && customers.map(customer => (
          <li key={customer.id} className="flex items-center mb-2">
            {editingCustomer === customer.id ? (
              <>
                <input
                  type="text"
                  value={editedCustomer}
                  onChange={(e) => setEditedCustomer(e.target.value)}
                />
                <button onClick={() => handleEditCustomer(customer.id)} className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
                  Guardar
                </button>
              </>
            ) : (
              <>
                {customer.username}
                <button onClick={() => { setEditingCustomer(customer.id); setEditedCustomer(customer.username); }} className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded">
                  Editar
                </button>
                <button onClick={() => handleDeleteCustomer(customer.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
                  Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
