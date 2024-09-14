import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/authenticate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.text();

            const response2 = await fetch('http://localhost:8080/api/auth/login', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data}` },
            });

            const data2 = await response2.json();

            if (response.ok) {
                console.log(data)
                localStorage.setItem('token', data);
                localStorage.setItem('role', data2.role);
                navigate('/admin');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.log(error)
            setError('Error de red');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block mb-1" htmlFor="username">Username</label>
                    <input
                        type="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
