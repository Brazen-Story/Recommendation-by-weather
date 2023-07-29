import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll' }}>
                {videos.map((video, index) => (
                    <div key={index} style={{ marginRight: '20px' }}>
                        <a href={video.link} target="_blank" rel="noopener noreferrer">
                            <img src={video.thumbnail} alt={video.title} />
                            <p>{video.title}</p>
                        </a>
                    </div>
                ))}
            </div>
        </>
    )
}

export default NewsVideio;