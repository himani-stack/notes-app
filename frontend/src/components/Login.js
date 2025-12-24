import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
        try {
            const res = await axios.post(url, { email, password });
            localStorage.setItem('token', res.data.token);
            alert(isLogin ? "Login Successful!" : "Account Created!");
            window.location.href = '/dashboard'; //refresh to update Auth state
        } catch (err) {
            alert(err.response?.data?.message || "Error occurred");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
            <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', width: '320px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <button type="submit" style={{ width: '100%', background: '#007bff', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {isLogin ? 'Login' : 'Register'}
                </button>
                <p onClick={() => setIsLogin(!isLogin)} style={{ textAlign: 'center', marginTop: '15px', color: '#007bff', cursor: 'pointer', fontSize: '14px' }}>
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </p>
            </form>
        </div>
    );
};

export default Login;