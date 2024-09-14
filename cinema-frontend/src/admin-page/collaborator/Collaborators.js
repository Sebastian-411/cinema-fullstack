import { useEffect, useState } from 'react';

export default function Collaborators() {
    const [collaborators, setCollaborators] = useState([]);
    const [newCollaborator, setNewCollaborator] = useState('');
    const [editingCollaborator, setEditingCollaborator] = useState(null);
    const [editedCollaborator, setEditedCollaborator] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/collaborators/private-collaborator')
            .then(response => response.json())
            .then(data => setCollaborators(data));
    }, []);

    const handleAddCollaborator = () => {
        fetch('http://localhost:8080/api/auth/register/collaborator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCollaborator),
        })
            .then(() => {
                setNewCollaborator('');
                return fetch('http://localhost:8080/api/collaborators/private-collaborator');
            })
            .then(response => response.json())
            .then(data => setCollaborators(data));
    };

    const handleEditCollaborator = (id) => {
        fetch(`http://localhost:8080/api/collaborators/private-collaborator/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: editedCollaborator }),
        })
            .then(() => {
                setEditingCollaborator(null);
                setEditedCollaborator('');
                return fetch('http://localhost:8080/api/collaborators/private-collaborator');
            })
            .then(response => response.json())
            .then(data => setCollaborators(data));
    };

    const handleDeleteCollaborator = (id) => {
        fetch(`http://localhost:8080/api/collaborators/private-collaborator/${id}`, {
            method: 'DELETE',
        })
            .then(() => fetch('http://localhost:8080/api/collaborators/private-collaborator'))
            .then(response => response.json())
            .then(data => setCollaborators(data));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Colaboradores</h1>
            <input
                type="text"
                value={newCollaborator.username}
                onChange={(e) => setNewCollaborator(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Nombre de usuario"
            />
            <input
                type="password"
                value={newCollaborator.password}
                onChange={(e) => setNewCollaborator(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Contraseña"
            />
            <button onClick={handleAddCollaborator} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
                Agregar
            </button>

            <ul>
                {Array.isArray(collaborators) && collaborators.map(collaborator => (
                    <li key={collaborator.id} className="flex items-center mb-2">
                        {editingCollaborator === collaborator.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedCollaborator}
                                    onChange={(e) => setEditedCollaborator(e.target.value)}
                                />
                                <button onClick={() => handleEditCollaborator(collaborator.id)} className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <>
                                {collaborator.username}
                                <button onClick={() => setEditingCollaborator(collaborator.id)} className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded">
                                    Editar
                                </button>
                                <button onClick={() => handleDeleteCollaborator(collaborator.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
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
