import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NewsVideio() {

    const [video, setVideo] = useState([]);

    useEffect(() => {
        
        const response = axios.get('http:localhost:3001/weather/youtubeapi')
        setVideo(response.data);

    }, [])

    return(
        <>
        </>
    )
}

export default NewsVideio;