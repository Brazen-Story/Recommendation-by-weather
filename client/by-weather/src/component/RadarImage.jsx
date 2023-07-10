import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RadarImage = () => {
    const [radarImages, setRadarImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3001/weather/raider');
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
        }, 1000);

        return () => clearInterval(interval);
    }, [radarImages]);

    return (

        <div className="radar-images-container">
            <span>레이더 영상</span>
            <img src={radarImages[currentImageIndex]} alt={`Radar Image ${currentImageIndex}`} />
        </div>
    );
};

export default RadarImage;
