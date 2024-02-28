import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LinkedIn.css';

function LinkedIn() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch LinkedIn profile data
    const fetchProfileData = async () => {
      try {
         const response = await axios.get('http://localhost:8080/api/linkedin-profile');

        if (response.status === 200) {
          const data = response.data;
          setProfileData(data);
          console.log(data)
        } else {
          console.error('Failed to fetch LinkedIn profile data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching LinkedIn profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="linkedin-container">
      <h2>LinkedIn Profile</h2>
      {profileData && (
        <div className="profile">
          <p>Name: {profileData.localizedFirstName} {profileData.localizedLastName}</p>
          <p>Headline: {profileData.email}</p>
          {/* Add more profile data as needed */}
        </div>
      )}
    </div>
  );
}

export default LinkedIn;
