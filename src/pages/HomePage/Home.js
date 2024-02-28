import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 


const backImg = require('../../assests/back.jpg');
const fb = require('../../assests/facebook.png');
const linkedin = require('../../assests/linkedin.png');

function Home() {
    const navigate = useNavigate();

  const handleClick = (socialMedia) => {
    if(socialMedia==='Facebook'){
        navigate('/facebook')
    }
  };

  return (
    <div className='container' style={{
        backgroundImage: `url(${backImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width:'100%',
    }}>
        <div className='card' onClick={() => handleClick('Facebook')}>
            <h2 className='header'>Facebook</h2>
            <div className='card-content'>
                <img src={fb} alt="Facebook Logo" />
                <p>Connect with friends and the world around you on Facebook.</p>
            </div>
        </div>
        <div className='card' onClick={() => handleClick('LinkedIn')}>
            <h2 className='header'>LinkedIn</h2>
            <div className='card-content'>
                <img src={linkedin} alt="LinkedIn Logo" />
                <p>Build your professional network and grow your career on LinkedIn.</p>
            </div>
        </div>
    </div>
  );
}

export default Home;
