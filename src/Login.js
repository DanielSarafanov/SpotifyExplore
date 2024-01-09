import React from 'react';
import { Container } from 'react-bootstrap';
import './Login.css'; 
import spotifyLogo from './spotifyLogo.png';


const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=9b210a400aa5497a94ef800a2d466e69&response_type=code&redirect_uri=http://localhost:3000/&scope=user-library-read%20playlist-modify-public%20playlist-modify-private%20playlist-read-collaborative%20playlist-read-private%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
    return (
        <div>
            <Container className='d-flex flex-column justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
                <div>
                    <img src={spotifyLogo} alt='This is the spotify Logo' className='spotifyLogo'></img>
                </div>
                <div>
                    <h1 className='headline'>SPOTIFY EXPLORE</h1>
                </div> 
                <div>
                    <p className='explaination'>With Spotify Explore you can see whats popular all over the world! By bringing together popular songs played gloably, you can get a taste of new genres, songs and hits around the world.</p>
                </div>
                <div className="button-82-pushable">
                    <div className="button-82-shadow"></div>
                    <div className="button-82-edge"></div>
                    <a className="button-82-front btn btn-success btn-lg" href={AUTH_URL}>
                        Login With Spotify
                    </a>
                </div>
            </Container>
        </div>
    );
}
