import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlaylistCalculator = () => {
  const [playlistLink, setPlaylistLink] = useState('');
  const [startVideoNumber, setStartVideoNumber] = useState(1);
  const [endVideoNumber, setEndVideoNumber] = useState(1);
  const [totalLength, setTotalLength] = useState(0);
  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [playlistId, setPlaylistId] = useState('');
  const [nextPageToken,setNextPageToken]=useState('');


  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract the playlist ID from the provided link
    setPlaylistId(extractPlaylistId(playlistLink));

    // Fetch playlist data using YouTube Data API
    await fetchPlaylistData(playlistId,endVideoNumber);
    // console.log(playlistData);
    setTimeout(() => {  
      calculateTotalLength(startVideoNumber, endVideoNumber);
    }, 1000);
    // Calculate total length from start video number to end video number
    
  };

  // Function to extract playlist ID from playlist link
  const extractPlaylistId = (link) => {
    const url = new URL(link);
    return url.searchParams.get('list');
  };


  const fetchPlaylistData = async (playlistId, endVideoNumber) => {
    try {
      setPlaylistData(null);  
      let pageNumber = 0;
      let nextPageToken = '';  // Initialize nextPageToken
      let fetchedItemsCount = 0; // Keep track of fetched items

      while (fetchedItemsCount < endVideoNumber) {
        // Construct the URL with conditional pageToken
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${process.env.REACT_APP_API_KEY}${nextPageToken ? '&pageToken=' + nextPageToken : ''}`;
        
        const response = await axios.get(url);
        // console.log(response.data.items);

        // Check if items are there
        if (response.data.items) {
          setPlaylistData(prevData => [...prevData || [], ...response.data.items]);
          fetchedItemsCount += response.data.items.length; // Update fetched items count
        }

        if (!response.data.nextPageToken || fetchedItemsCount >= endVideoNumber) {
          // console.log(playlistData)
          break;  // Exit if no more tokens or reached the desired number
        }

        nextPageToken = response.data.nextPageToken; // Update the token for the next request
        pageNumber++;
        // console.log(`Page number: ${pageNumber}, Fetched items: ${fetchedItemsCount}`);
      }
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
;

    setLoading(true);
    // Iterate through the playlist data and calculate total time
    let i;
    for (i = start-1; i < end; i++) {
      const videoData = playlistData[i];
      const videoId = videoData.contentDetails.videoId;
      
      if (videoData && videoData.contentDetails && videoData.contentDetails.videoId) {
        const durationInSeconds = await fetchVideoDuration(videoId);
        // console.log(i,videoId,durationInSeconds);
       totalTimeInSeconds += durationInSeconds;
       setTotalTime(totalTimeInSeconds);
        setNow((i + 1) / (end - start + 1) * 100);
      } else {
        console.error(`Content details or video ID is undefined for video at index ${i}.`);
      }
    }

    if (end == i) {
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
        // console.log(response.data);
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
    const timeInSecondsAtSpeed = Math.floor(totalTimeInSeconds / speed);
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
            onChange={(e) => {setPlaylistLink(e.target.value);
              setPlaylistId(extractPlaylistId(playlistLink));
            }
          }
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
              <ul className='text-black text-lg'>
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
