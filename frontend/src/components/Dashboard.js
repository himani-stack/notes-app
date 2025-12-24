import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, PlusCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const fetchNotes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/notes', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotes(res.data);
        } catch (err) { console.log("Fetch failed"); }
    };

    useEffect(() => { if (token) fetchNotes(); }, []);

    const addNote = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/notes', { title, content }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle(''); setContent('');
            fetchNotes();
        } catch (err) { alert("Add failed"); }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotes();
        } catch (err) { alert("Delete failed"); }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <h1>My Quick Notes</h1>
                <button onClick={handleLogout} style={{ background: '#ff4b2b', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LogOut size={18}/> Logout
                </button>
            </div>

            <form onSubmit={addNote} style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                <input placeholder="Note Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #eee', borderRadius: '5px' }} />
                <textarea placeholder="Your Note Content..." value={content} onChange={(e) => setContent(e.target.value)} required style={{ width: '100%', padding: '12px', height: '100px', border: '1px solid #eee', borderRadius: '5px' }} />
                <button type="submit" style={{ marginTop: '10px', background: '#28a745', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlusCircle size={18}/> Save Note
                </button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {notes.map(note => (
                    <div key={note._id} style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative' }}>
                        <h3 style={{ margin: '0 0 10px 0' }}>{note.title}</h3>
                        <p style={{ color: '#666' }}>{note.content}</p>
                        <button onClick={() => deleteNote(note._id)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>
                            <Trash2 size={20}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;