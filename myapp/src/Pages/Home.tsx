import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Pages } from "../Components/Router/router";
import "../styles.css";
import SearchAppBar from "../Components/SearchAppBar";
import UserLocationMap from "../Components/UserLocationMap";
import Cookies from 'js-cookie';
import { HomePageData } from '../Models/HomePage';

export const Home = (): JSX.Element => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);
    const [homePageData, setHomePageData] = useState<HomePageData[]>([]);

    const onClick = (): void => {
        navigate(Pages.Autentificare);
    };

    const onLogoutClick = (): void => {
        localStorage.removeItem("name");
        setUsername(null);
        navigate(Pages.Home);
    };

    const [location, setLocation] = useState<{ latitude: number | undefined, longitude: number | undefined }>({ latitude: undefined, longitude: undefined });

    useEffect(() => {

        fetch('http://localhost:8080/HomePage/getAll')
        .then(response => response.json())
        .then(data => {
            setHomePageData(data);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        });
        const savedLocation = Cookies.get('userLocation');
        if (savedLocation) {
            const parsedLocation = JSON.parse(savedLocation);
            setLocation(parsedLocation);
        }
        
        const storedUserData = localStorage.getItem("name");
        if (storedUserData) {
            setUsername(storedUserData);
        }
    }, []);

    return (
        <div>
            <SearchAppBar showLoginButton={true} onLoginClick={onClick} username={username} onLogoutClick={onLogoutClick} /> 
            <div className="background-container">
                <UserLocationMap />
                {location.latitude && location.longitude && (
                    <div style={{ position: 'fixed', bottom: '10px', right: '10px', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>
                        <p style={{ margin: 0 }}>Lat: {location.latitude.toFixed(2)}</p>
                        <p style={{ margin: 0 }}>Lon: {location.longitude.toFixed(2)}</p>
                    </div>
                )}
                <div className="description-container">
    {homePageData.map((page, index) => (
        <div key={index}>
            <h2>{page.title}</h2>
            <p>{page.para1}</p>
            <p>{page.para2}</p>
        </div>
    ))}
</div>
            </div>

            
        </div>
    );
};

export default Home;