// import React, { useState } from 'react';
// import axios from 'axios';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import 'bootstrap/dist/css/bootstrap.min.css';



// const PlaylistCalculator = () => {
//   const [playlistLink, setPlaylistLink] = useState('');
//   const [startVideoNumber, setStartVideoNumber] = useState(1);
//   const [endVideoNumber, setEndVideoNumber] = useState(null);
//   const [totalLength, setTotalLength] = useState(0);
//   const [playlistData, setPlaylistData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [now, setNow] = useState(0);
//   console.log("API_KEY", process.env.REACT_APP_API_KEY)

//   // Function to handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Extract the playlist ID from the provided link
//     const playlistId = extractPlaylistId(playlistLink);

//     // Fetch playlist data using YouTube Data API
//     await fetchPlaylistData(playlistId);

//     // Calculate total length from start video number to end video number
//     calculateTotalLength(startVideoNumber, endVideoNumber);
//   };

//   // Function to extract playlist ID from playlist link
//   const extractPlaylistId = (link) => {
//     const url = new URL(link);
//     return url.searchParams.get('list');
//   };

//   // Function to fetch playlist data from YouTube Data API
//   const fetchPlaylistData = async (playlistId) => {
//     // Replace with your YouTube Data API key

//     try {
//       const response = await axios.get(
//         `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${process.env.REACT_APP_API_KEY}`
//       );

//       setPlaylistData(response.data.items);
//       console.log('playlistData', response.data.items)
//     } catch (error) {
//       console.error('Failed to fetch playlist data:', error);
//     }
//   };



//   // Function to calculate total length of the playlist from start to end video numbers
//   const calculateTotalLength = async (start, end) => {
//     if (!playlistData) {
//       console.error('Playlist data is not available.');
//       return;
//     }
  
//     let totalTimeInSeconds = 0;
  
//     // Adjust end video number if not provided
//     const adjustedEnd = end ? end : playlistData.length;

//     setLoading(true);
//     // Iterate through the playlist data and calculate total time
//     let i;
//     for (i=0; i < adjustedEnd-start+1; i++) {
//       const videoData = playlistData[i];
      
//       const videoId = videoData.contentDetails.videoId;
//       console.log('videoId', videoId)
//       if (videoData && videoData.contentDetails && videoData.contentDetails.videoId) {
//         // Add a delay to avoid rate limiting
        
//         const durationInSeconds = await fetchVideoDuration(videoId);
//         totalTimeInSeconds += durationInSeconds;
//         console.log('totalTimeInSeconds', totalTimeInSeconds)
//         setNow((i+1)/(adjustedEnd-start+1)*100)
//       } else {
//         console.error(`Content details or video ID is undefined for video at index ${i}.`);
//       }
//     }
//     if(i===adjustedEnd-start+1){
//       setNow(0)
//       setLoading(false);
//     }
  
//     // Convert total time from seconds to a readable format
//     const totalTimeFormatted = formatTime(totalTimeInSeconds);
//     setTotalLength(totalTimeFormatted);
//     console.log('totalTimeFormatted', totalTimeFormatted)
//   };


// // Function to fetch video duration and calculate total time
// const fetchVideoDuration = async (videoId) => {
//   // Replace with your YouTube Data API key

//   console.log(`Fetching duration for video ID: ${videoId}`);

//   try {
//     const response = await axios.get(
//       `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${process.env.REACT_APP_API_KEY}`
//     );

//     if (response.data.items.length > 0) {
//       const duration = response.data.items[0].contentDetails.duration;

//       // Convert ISO 8601 duration to seconds
//       const durationInSeconds = parseISO8601Duration(duration);
//       console.log(`Duration for video ID ${videoId}: ${durationInSeconds} seconds`);

//       return durationInSeconds;
//     } else {
//       console.error(`No video found for video ID: ${videoId}`);
//       return 0;
//     }
//   } catch (error) {
//     console.error(`Failed to fetch video duration for video ID ${videoId}:`, error);
//     return 0;
//   }
// };



//   // Function to parse ISO 8601 duration format
//   const parseISO8601Duration = (duration) => {
//     const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
//     const [, hours, minutes, seconds] = durationRegex.exec(duration);

//     return (parseInt(hours || 0) * 3600) +
//       (parseInt(minutes || 0) * 60) +
//       parseInt(seconds || 0);
//   };

//   // Function to format time from seconds to HH:MM:SS
//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     seconds %= 3600;
//     const minutes = Math.floor(seconds / 60);
//     seconds %= 60;

//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

  
//   return (
//     <div className="w-[90vw] max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">YouTube Playlist Length Calculator</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block font-bold mb-2 text-gray-700">YouTube Playlist Link:</label>
//           <input
//             type="text"
//             value={playlistLink}
//             onChange={(e) => setPlaylistLink(e.target.value)}
//             required
//             className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-bold mb-2 text-gray-700">Start Video Number:</label>
//           <input
//             type="number"
//             value={startVideoNumber}
//             onChange={(e) => setStartVideoNumber(parseInt(e.target.value))}
//             min="1"
//             required
//             className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-bold mb-2 text-gray-700">End Video Number:</label>
//           <input
//             type="number"
//             value={endVideoNumber}
//             onChange={(e) => setEndVideoNumber(parseInt(e.target.value))}
//             min="1"
//             className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
//         >
//           Calculate Total Length
//         </button>
//       </form>
      

//       {loading?<div className='mt-6'>
//         <h3 className="text-xl font-semibold text-gray-800">Calculating Total Length ....</h3>
//         <ProgressBar now={now} label={`${now}%`} visuallyHidden />;
//       </div>:<div className="mt-6">
//         <h3 className="text-xl font-semibold text-gray-800">Total Length of the Playlist: {totalLength}</h3>
//       </div>}
//     </div>
//   );
// };

// export default PlaylistCalculator;
import React, { useState } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlaylistCalculator = () => {
  const [playlistLink, setPlaylistLink] = useState('');
  const [startVideoNumber, setStartVideoNumber] = useState(1);
  const [endVideoNumber, setEndVideoNumber] = useState(null);
  const [totalLength, setTotalLength] = useState(0);
  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  // const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(0);
  

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract the playlist ID from the provided link
    const playlistId = extractPlaylistId(playlistLink);

    // Fetch playlist data using YouTube Data API
    await fetchPlaylistData(playlistId);

    // Calculate total length from start video number to end video number
    calculateTotalLength(startVideoNumber, endVideoNumber);
  };

  // Function to extract playlist ID from playlist link
  const extractPlaylistId = (link) => {
    const url = new URL(link);
    return url.searchParams.get('list');
  };

  // Function to fetch playlist data from YouTube Data API
  const fetchPlaylistData = async (playlistId) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${process.env.REACT_APP_API_KEY}`
      );
      setPlaylistData(response.data.items);
    } catch (error) {
      console.error('Failed to fetch playlist data:', error);
    }
  };

  // Function to calculate total length of the playlist from start to end video numbers
  const calculateTotalLength = async (start, end) => {
    if (!playlistData) {
      console.error('Playlist data is not available.');
      return;
    }

    let totalTimeInSeconds = 0;

    // Adjust end video number if not provided
    const adjustedEnd = end ? end : playlistData.length;

    setLoading(true);
    // Iterate through the playlist data and calculate total time
    let i;
    for (i = 0; i < adjustedEnd - start + 1; i++) {
      const videoData = playlistData[i];
      const videoId = videoData.contentDetails.videoId;

      if (videoData && videoData.contentDetails && videoData.contentDetails.videoId) {
        const durationInSeconds = await fetchVideoDuration(videoId);
       totalTimeInSeconds += durationInSeconds;
       setTotalTime(totalTimeInSeconds);
        setNow((i + 1) / (adjustedEnd - start + 1) * 100);
      } else {
        console.error(`Content details or video ID is undefined for video at index ${i}.`);
      }
    }

    if (adjustedEnd - start + 1 === i) {
      setNow(0);
      setLoading(false);
    }

    // Convert total time from seconds to a readable format
    const totalTimeFormatted = formatTime(totalTimeInSeconds);
    setTotalLength(totalTimeFormatted);
  };

  // Function to fetch video duration and calculate total time
  const fetchVideoDuration = async (videoId) => {

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${process.env.REACT_APP_API_KEY}`
      );

      if (response.data.items.length > 0) {
        const duration = response.data.items[0].contentDetails.duration;

        // Convert ISO 8601 duration to seconds
        const durationInSeconds = parseISO8601Duration(duration);

        return durationInSeconds;
      } else {
        console.error(`No video found for video ID: ${videoId}`);
        return 0;
      }
    } catch (error) {
      console.error(`Failed to fetch video duration for video ID ${videoId}:`, error);
      return 0;
    }
  };

  // Function to parse ISO 8601 duration format
  const parseISO8601Duration = (duration) => {
    const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const [, hours, minutes, seconds] = durationRegex.exec(duration);

    return (parseInt(hours || 0) * 3600) +
      (parseInt(minutes || 0) * 60) +
      parseInt(seconds || 0);
  };

  // Function to format time from seconds to HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Helper function to calculate the time taken at different speeds
  const calculateTimeAtSpeed = (totalTimeInSeconds, speed) => {
    console.log('totalTimeInSeconds', totalTimeInSeconds)
    const timeInSecondsAtSpeed = Math.floor(totalTimeInSeconds / speed);
    console.log('timeInSecondsAtSpeed', timeInSecondsAtSpeed)
    return formatTime(timeInSecondsAtSpeed);

  };

  return (
    <div className="w-[90vw] max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">YouTube Playlist Length Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700">YouTube Playlist Link:</label>
          <input
            type="text"
            value={playlistLink}
            onChange={(e) => setPlaylistLink(e.target.value)}
            required
            className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700">Start Video Number:</label>
          <input
            type="number"
            value={startVideoNumber}
            onChange={(e) => setStartVideoNumber(parseInt(e.target.value))}
            min="1"
            required
            className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700">End Video Number:</label>
          <input
            type="number"
            value={endVideoNumber}
            onChange={(e) => setEndVideoNumber(parseInt(e.target.value))}
            min="1"
            className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
        >
          Calculate Total Length
        </button>
      </form>

      {loading ? (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Calculating Total Length ....</h3>
          <ProgressBar now={now} label={`${now}%`} visuallyHidden />
        </div>
      ) : (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Total Length of the Playlist: {totalLength}</h3>
            <div className="mt-4">
              <h4 className="text-lg font-medium text-black">Time taken at different speeds:</h4>
              <ul className='text-black'>
                <li>At 1.25x speed: {calculateTimeAtSpeed(totalTime, 1.25)}</li>
                <li>At 1.5x speed: {calculateTimeAtSpeed(totalTime, 1.5)}</li>
                <li>At 2x speed: {calculateTimeAtSpeed(totalTime, 2)}</li>
              </ul>
            </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistCalculator;
