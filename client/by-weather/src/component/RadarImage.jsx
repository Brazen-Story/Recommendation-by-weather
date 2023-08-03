import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Radar.css'
import { radarInfoUrl } from '../utils/WeatherRoutes';
const RadarImage = () => {
  const [radarImages, setRadarImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(radarInfoUrl);
        const imageUrls = response.data['rdr-img-file'].split(',');
        setRadarImages(imageUrls);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % radarImages.length);
    }, 500);
  
    return () => clearInterval(interval);
  }, [radarImages]); // add radarImages to the dependencies array  

  return (
    <div className="radar-images-container">
      {radarImages.length > 0 ? (
        <>
          <img src={radarImages[currentImageIndex]} alt={` 레이더 준비 중`} />
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default RadarImage;