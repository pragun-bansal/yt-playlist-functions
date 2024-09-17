import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import DownloadPlaylist from './Pages/DownloadPlayList';
import PlaylistCalculator from './Pages/PlaylistCalculator';
import HomePage from './Pages/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <div className="App bg-gradient-to-r from-indigo-400 to-cyan-400 h-[100vh] flex justify-center items-center">
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/download" element={<DownloadPlaylist />} />
                        <Route path="/calculator" element={<PlaylistCalculator />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;