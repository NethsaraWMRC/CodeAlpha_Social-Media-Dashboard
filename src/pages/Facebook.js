import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Facebook.css'; 

function Facebook() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        // Initialize Facebook SDK
        window.fbAsyncInit = function() {
            window.FB.init({
                appId: '1009955207219257',
                xfbml: true,
                version: 'v19.0'
            });
            window.FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    const loginWithFacebook = () => {
        window.FB.login(function(response) {
            if (response.authResponse) {
                console.log('Successfully logged in:', response);
                setIsLoggedIn(true);
                fetchUserPosts();
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, { scope: 'email,user_posts' });
    };

    const logoutFromFacebook = () => {
        window.FB.logout(function(response) {
            console.log('Logged out from Facebook:', response);
            setIsLoggedIn(false);
            setUserPosts([]);
            navigate('/')
        });
    };

    const fetchUserPosts = () => {
        window.FB.api('/me/posts', 'GET', { fields: 'id,message,attachments{description,type,media{image,source}},status_type' }, function(response) {
            if (!response || response.error) {
                console.log('Error retrieving user posts:', response.error);
            } else {
                console.log('User posts:', response.data);
                // Filter out shared posts and only include original posts
                const originalPosts = response.data.filter(post => !post.status_type || post.status_type !== 'shared_story');
                setUserPosts(originalPosts);
            }
        });
    };
    

    return (
        <div className="facebook-container">
            {!isLoggedIn ? (
                <button className="login-button" onClick={loginWithFacebook}>Login with Facebook</button>
            ) : (
                <div>
                    <button className="logout-button" onClick={logoutFromFacebook}>Logout from Facebook</button>
                    <h2>User Posts:</h2>
                    <ul className="post-list">
                        {userPosts.map((post, index) => (
                            <li key={post.id} className="post">
                                {post.attachments && post.attachments.data.map(attachment => (
                                    <div >
                                        {attachment.type === 'photo' && attachment.media && attachment.media.image && (
                                            <div>
                                                <p>{attachment.description}</p>
                                                <img src={attachment.media.image.src} alt={index} className="post-image" />
                                           
                                                
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Facebook;
