import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import '../css/video.css'

function NewsVideio() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get('http://localhost:3001/weather/youtubeapi');  // 여기는 서버로부터 비디오 데이터를 가져오는 API 경로로 변경해야 합니다.
                setVideos(res.data);
                console.log(res.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <>
            <div className="scrollableDiv">
                {videos.map((video, index) => (
                    <div key={index} className='video'>
                        <a href={video.link} target="_blank" rel="noopener noreferrer">
                            <img src={video.thumbnail} alt={video.title} className='video-img' />
                            <p className='video-title'>{video.title}</p>
                        </a>
                    </div>
                ))}
            </div>

        </>
    )
}

export default NewsVideio;