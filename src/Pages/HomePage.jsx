import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="w-[90vw] max-w-4xl mx-auto p-6 bg-[rgb(0,0,0,0.7)] shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Welcome to the YouTube Downloader</h2>
            <p className="text-white text-center">Use the navigation links to download videos/playlists or calculate playlist length.</p>
            <div className="text-center mt-4">
                <Link to="/download" className="text-blue-500 hover:underline block">Go to Download Page</Link>
                <Link to="/calculator" className="text-blue-500 hover:underline">Go to Calculate Page</Link>
            </div>
        </div>
    );
};

export default HomePage;