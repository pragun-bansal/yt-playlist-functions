// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';
//
// const DownloadPlaylist = () => {
//     const [playlistLink, setPlaylistLink] = useState('');
//     const [startVideoNumber, setStartVideoNumber] = useState(1);
//     const [endVideoNumber, setEndVideoNumber] = useState(1);
//     const [isVideo, setIsVideo] = useState(false);
//     const [activeTab, setActiveTab] = useState('full');
//     const [linkChecked, setLinkChecked] = useState(false); // To track if the link has been checked
//
//     // Function to extract video or playlist ID from the URL
//     const extractId = (url) => {
//         const urlParams = new URLSearchParams(new URL(url).search);
//         console.log('videoId:', urlParams.get('v'));
//         console.log('playlistId:', urlParams.get('list'));
//         console.log('url:', urlParams);
//         return {
//             videoId: urlParams.get('v'),
//             playlistId: urlParams.get('list')
//
//         };
//     };
//
//     // Handle the link change event
//     const handleLinkChange = (e) => {
//         setPlaylistLink(e.target.value);
//     };
//
//     // Handle the "Enter" button click or keypress to check if it's a video or playlist
//     const handleCheckLink = (e) => {
//         e.preventDefault();
//         const { videoId, playlistId } = extractId(playlistLink);
//         setIsVideo(!!videoId);
//         setLinkChecked(true); // Set this to true to show the download options
//     };
//
//     // Handle the download of a single video
//     const handleDownloadVideo = async (videoId) => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/download-video', {
//                 params: { videoId },
//                 responseType: 'blob',
//             });
//
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `video_${videoId}.mp4`);
//             document.body.appendChild(link);
//             link.click();
//
//             toast.success(`Video downloaded successfully!`, {
//                 position: 'top-center',
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: 'dark',
//             });
//         } catch (error) {
//             toast.error(`Failed to download video`, {
//                 position: 'top-center',
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: 'dark',
//             });
//         }
//     };
//
//     // Handle the download of the entire playlist
//     const handleDownloadPlaylist = async () => {
//         const { playlistId } = extractId(playlistLink);
//
//         try {
//             const response = await axios.get('http://localhost:5000/api/download-playlist', {
//                 params: {
//                     playlistId,
//                     startVideoNumber: activeTab === 'full' ? 1 : startVideoNumber,
//                     endVideoNumber: activeTab === 'full' ? undefined : endVideoNumber,
//                 },
//                 responseType: 'blob',
//             });
//
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `playlist_download.zip`);
//             document.body.appendChild(link);
//             link.click();
//
//             toast.success('Playlist downloaded successfully!', {
//                 position: 'top-center',
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: 'dark',
//             });
//         } catch (error) {
//             toast.error('Failed to download playlist', {
//                 position: 'top-center',
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: 'dark',
//             });
//         }
//     };
//
//     return (
//         <div className="w-[90vw] max-w-4xl mx-auto p-6 bg-[rgb(0,0,0,0.7)] shadow-lg rounded-lg">
//             <h2 className="text-2xl font-bold mb-4 text-center text-white">
//                 Download YouTube Content
//             </h2>
//             {/* Render the input field and Enter button initially */}
//             {!linkChecked ? (
//                 <form onSubmit={handleCheckLink}>
//                     <div className="mb-4">
//                         <label className="block font-bold mb-2 text-gray-100">Link:</label>
//                         <input
//                             type="text"
//                             value={playlistLink}
//                             onChange={handleLinkChange}
//                             required
//                             className="w-full p-2 border text-white bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full py-2 mb-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 shadow-md shadow-blue-400 hover:shadow-blue-500"
//                     >
//                         Enter
//                     </button>
//                 </form>
//             ) : (
//                 // Render video download or playlist options based on link
//                 <>
//                 <form onSubmit={handleCheckLink}>
//                     <div className="mb-4">
//                         <label className="block font-bold mb-2 text-gray-100">Link:</label>
//                         <input
//                             type="text"
//                             value={playlistLink}
//                             onChange={handleLinkChange}
//                             required
//                             className="w-full p-2 border text-white bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full py-2 mb-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 shadow-md shadow-blue-400 hover:shadow-blue-500"
//                     >
//                         Enter
//                     </button>
//                 </form>
//
//                     {isVideo ? (
//                         <button
//                             onClick={() => handleDownloadVideo(extractId(playlistLink).videoId)}
//                             className="w-full py-2 mb-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 shadow-md shadow-green-400 hover:shadow-green-500"
//                         >
//                             Download Video
//                         </button>
//                     ) : (
//                         <>
//                             <div className="mb-4 flex justify-center">
//
//                                 <button
//                                     type="button"
//                                     onClick={() => setActiveTab('range')}
//                                     className={`px-4 py-2 font-semibold rounded-r-md ${activeTab === 'range' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
//                                 >
//                                     Download Range
//                                 </button>
//                             </div>
//                                 <>
//                                     <div className="mb-4">
//                                         <label className="block font-bold mb-2 text-gray-100">Start Video Number:</label>
//                                         <input
//                                             type="number"
//                                             value={startVideoNumber}
//                                             onChange={e => setStartVideoNumber(parseInt(e.target.value))}
//                                             min="1"
//                                             required
//                                             className="w-full p-2 border text-white bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
//                                         />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label className="block font-bold mb-2 text-gray-100">End Video Number:</label>
//                                         <input
//                                             type="number"
//                                             value={endVideoNumber}
//                                             onChange={e => setEndVideoNumber(parseInt(e.target.value))}
//                                             min="1"
//                                             required
//                                             className="w-full p-2 border text-white bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
//                                         />
//                                     </div>
//                                 </>
//
//                             <button
//                                 type="button"
//                                 onClick={handleDownloadPlaylist}
//                                 className="w-full py-2 mb-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 shadow-md shadow-blue-400 hover:shadow-blue-500"
//                             >
//                                 Download Videos
//                             </button>
//                         </>
//                     )}
//                 </>
//             )}
//             <ToastContainer />
//         </div>
//     );
// };
//
// export default DownloadPlaylist;


import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const DownloadPlaylist = () => {
    const [playlistLink, setPlaylistLink] = useState('');
    const [startVideoNumber, setStartVideoNumber] = useState(1);
    const [endVideoNumber, setEndVideoNumber] = useState(1);
    const [isVideo, setIsVideo] = useState(false);
    const [activeTab, setActiveTab] = useState('full');
    const [linkChecked, setLinkChecked] = useState(false);
    const [videoId, setVideoId] = useState('');
    const [playlistId, setPlaylistId] = useState('');
    const [videoIndex, setVideoIndex] = useState(null);

    // Function to extract video or playlist ID from the URL
    const extractId = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get('v');
        const playlistId = urlParams.get('list');
        const index = urlParams.get('index');
        return { videoId, playlistId, index };
    };

    // Handle the link change event
    const handleLinkChange = (e) => {
        setPlaylistLink(e.target.value);
    };

    // Handle the "Enter" button click or keypress to check if it's a video or playlist
    const handleCheckLink = (e) => {
        e.preventDefault();
        const { videoId, playlistId, index } = extractId(playlistLink);
        setVideoId(videoId);
        setPlaylistId(playlistId);
        setVideoIndex(index ? parseInt(index, 10) : null);
        setIsVideo(!!videoId);
        setLinkChecked(true);
    };

    // Handle the download of a single video
    const handleDownloadVideo = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/download-video', {
                params: { videoId },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `video_${videoId}.mp4`);
            document.body.appendChild(link);
            link.click();

            toast.success(`Video downloaded successfully!`, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } catch (error) {
            toast.error(`Failed to download video`, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
    };

    // Handle the download of the entire playlist
    const handleDownloadPlaylist = async () => {
        try {
            const response = await axios.get('http://localhost:5005/api/download-playlist', {
                params: {
                    playlistId,
                    startVideoNumber:startVideoNumber,
                    endVideoNumber: endVideoNumber,
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `playlist_download.zip`);
            document.body.appendChild(link);
            link.click();

            toast.success('Playlist downloaded successfully!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } catch (error) {
            toast.error('Failed to download playlist', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
    };

    return (
        <div className="w-[90vw] max-w-4xl mx-auto p-6 bg-[rgb(0,0,0,0.7)] shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">
                <a href="/"  rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12" viewBox="0 0 500.612 208.352" id="youtube">
                        <path fill="#010101" d="M83.743 168.876c-4.007-1.375-6.746-3.24-10.09-6.863-7.024-7.611-7.41-9.883-7.41-43.682 0-32.567.5-35.634 7.044-43.281 9.175-10.718 30.39-10.401 39.45.589 6.017 7.3 6.506 10.55 6.506 43.192 0 25.834-.224 30.14-1.8 34.66-2.416 6.922-9.535 13.619-16.758 15.764-6.812 2.023-10.167 1.949-16.942-.38zm12.455-15.666c4.09-1.57 4.545-5.006 4.545-34.282 0-18.682-.376-28.828-1.13-30.482-2.53-5.554-11.21-5.554-13.74 0-.754 1.654-1.13 11.8-1.13 30.482 0 32.665.417 34.56 7.668 34.825 1.193.043 2.897-.202 3.787-.543zm44.427 15.118c-1.44-.782-3.466-3.128-4.5-5.21-1.745-3.512-1.903-7.104-2.179-49.537l-.297-45.75h19.094v41.877c0 35.843.214 42.057 1.487 43.112 2.216 1.839 5.816.493 9.887-3.697l3.626-3.733V67.832h19v101h-19v-10.17l-4.75 4.217c-2.612 2.319-6.198 4.832-7.968 5.585-4.126 1.753-11.043 1.687-14.4-.136zM24.73 141.08l-.015-27.75-12.357-39.5L.001 34.33l10.04-.287c5.877-.168 10.293.124 10.651.704.337.545 3.524 12.035 7.082 25.533 3.56 13.498 6.698 24.544 6.977 24.546.28.002 2.902-9.108 5.828-20.246 2.927-11.137 5.992-22.612 6.813-25.5l1.493-5.25h10.536c8.584 0 10.438.258 10.003 1.39-.293.764-5.967 18.745-12.607 39.957l-12.073 38.567v55.086h-20l-.014-27.75z"></path>
                        <path fill="#d02726" d="M284.873 207.783c-48.855-1.631-62.084-5.108-71.078-18.688-3.634-5.486-7.713-17.764-9.012-27.128-4.56-32.866-3.44-101.4 2.041-125.021 4.964-21.391 16.637-31.87 37.931-34.053C265.673.748 320.203-.42 373.243.14c57.262.604 84.221 1.829 93.975 4.27 19.08 4.773 28.336 18.828 31.563 47.92.61 5.5 1.36 24.702 1.666 42.67 1.234 72.535-4.223 95.61-25.02 105.799-7.853 3.848-12.99 4.732-35.185 6.057-24.106 1.438-122.48 2.025-155.369.927zm24.034-39.536c1.686-.873 5.038-3.404 7.45-5.63l4.386-4.04v10.254h19v-100h-19V145.095l-4.368 4.367c-4.688 4.689-6.584 5.274-9.06 2.798-1.378-1.378-1.572-6.626-1.572-42.5V68.83h-19v43.319c0 47.787.393 51.568 5.768 55.58 3.403 2.539 11.964 2.809 16.396.518zm91.45-.323c1.745-1.064 4.163-4.03 5.5-6.746 2.346-4.764 2.393-5.42 2.722-37.828.36-35.532-.212-41.948-4.386-49.15-2.319-4.002-7.849-7.37-12.104-7.37-4.098 0-9.97 2.757-14.447 6.782l-4.898 4.403V34.83h-18v134h18v-9.232l4.105 3.709c2.258 2.039 5.521 4.324 7.25 5.076 4.643 2.022 12.557 1.798 16.258-.46zm-23.864-16.312l-3.75-2.174v-61.33l4.438-2.354c3.601-1.91 4.968-2.167 7.25-1.366 4.931 1.732 5.462 5.552 5.12 36.78l-.308 27.838-2.806 2.412c-3.435 2.954-5.123 2.987-9.944.194zm84.25 16.135c9.664-4.381 14.016-11.79 14.777-25.158l.5-8.758h-19.278v5.936c0 7.27-1.127 10.446-4.487 12.648-3.787 2.48-8.494.904-10.76-3.605-1.369-2.721-1.75-6.037-1.75-15.23l-.003-11.75h36v-14.683c0-18.48-1.445-24.37-7.676-31.3-5.506-6.123-11.405-8.561-20.324-8.397-7.393.135-12.333 1.978-17.522 6.534-8.48 7.447-9.766 14.082-9.259 47.847.33 21.939.693 27.284 2.117 31.057 2.432 6.442 6.825 11.347 12.858 14.354 6.8 3.386 17.95 3.614 24.807.505zm-21-68.45c0-12.438 3.191-16.682 11.221-14.918 4.031.886 5.78 5.398 5.78 14.919v7.532h-17v-7.532zm-172 12.034v-57.5h22v-19h-63v19h21v115h20v-57.5z"></path>
                    </svg>
                </a>{' '}Download YouTube Content
            </h2>
                <form onSubmit={handleCheckLink} className="flex">
                    <div className="mb-4 flex w-full items-center" >
                        <label className="block font-bold mb-2 text-gray-100 mr-2">Link:</label>
                        <input
                            type="text"
                            value={playlistLink}
                            onChange={handleLinkChange}
                            required
                            className="w-full p-2 border text-white bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-10 mb-4 text-white font-semibold rounded-md hover:bg-red-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Search">
                            <g fill="#000000" class="color000000 svgShape">
                                <path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" fill="#ffffff" class="color000000 svgShape"></path>
                            </g>
                        </svg>
                    </button>
                </form>
            <>
                {!linkChecked ? (<></>) : (
                    <>
                        {isVideo ? (
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-white mb-2">Video Preview</h3>
                                <div className="aspect-w-16 aspect-h-9">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-[50vh] rounded-lg"
                                        ></iframe>
                                    </div>
                                    <button
                                        onClick={handleDownloadVideo}
                                        className="w-full py-2 mb-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 shadow-md shadow-green-400 hover:shadow-green-500"
                                    >
                                        Download Video
                                    </button>
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <div className="mb-4">
                                        <iframe
                                            src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&index=0`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-[50vh]  rounded-lg"
                                        ></iframe>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="flex mb-4">
                                            <label className="block font-bold mb-2 text-gray-100">Start Video Number:</label>
                                            <input
                                                type="number"
                                                value={startVideoNumber}
                                                onChange={e => setStartVideoNumber(parseInt(e.target.value))}
                                                min="1"
                                                required
                                                className="w-full p-2 border text-white bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
                                            />
                                        </div>
                                        <div className="flex mb-4">
                                            <label className="block font-bold mb-2 text-gray-100">End Video Number:</label>
                                            <input
                                                type="number"
                                                value={endVideoNumber}
                                                onChange={e => setEndVideoNumber(parseInt(e.target.value))}
                                                min="1"
                                                required
                                                className="w-full p-2 border text-white bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleDownloadPlaylist}
                                        className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 shadow-md shadow-red-400 hover:shadow-red-500">
                                        Download Videos
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            <ToastContainer/>
        </div>
    );
};
export default DownloadPlaylist;