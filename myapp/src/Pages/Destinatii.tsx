import React, { useState, useEffect } from 'react';
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Pages } from "../Components/Router/router";
import ActionAreaCard from '../Components/DestinatiiCards';
import { Destinatie } from '../Models/Destinatie';
import '../styles.css';
import UserLocationMap from '../Components/UserLocationMap';
import Cookies from 'js-cookie';


export const Destinatii = (): JSX.Element => {
    const navigate = useNavigate();
    const [destinatii, setDestinatii] = useState<Destinatie[]>([]);
    const [username, setUsername] = useState<string | null>(null); 
    const [location, setLocation] = useState<{ latitude: number | undefined, longitude: number | undefined }>({ latitude: undefined, longitude: undefined });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8080/Destinatii/getAll');
                if (!response.ok) {
                    throw new Error('Nu s-a putut obține lista de destinatii');
                }
                const data = await response.json();
                setDestinatii(data);
            } catch (error) {
                console.error('Eroare la preluarea datelor:', error);
            }
        }
        fetchData();

        const storedUserData = localStorage.getItem('name');
        if (storedUserData) {
            setUsername(storedUserData);
            const savedLocation = Cookies.get('userLocation');
            if (savedLocation) {
                const parsedLocation = JSON.parse(savedLocation);
                setLocation(parsedLocation);
            }
        } else {
            alert("Acces nepermis. Te rugam sa te autentifici!");
            navigate(Pages.Autentificare);
        }
    }, [navigate]);

    const onClick = (): void => {
        navigate(Pages.Home);
    }

    const handleCardClick = (titlu: string): void => {
        navigate(`/destinatii/${titlu}`);
    }

    return (
        <div className="background-container">
            <div>
    <Typography variant="h1" sx={{ position: 'absolute', fontSize: '3rem', top: '40px', left: '500px' }}>Toate destinatiile disponibile</Typography>
    <Typography variant="h6" sx={{ position: 'absolute', top: '20px', right: '20px', color: 'white' }}>{username ? `Bine ai venit, ${username}!` : ''}</Typography>
    <Button variant="contained" sx={{ position: 'absolute', top: '20px', left: '20px' }} onClick={onClick}>Acasa</Button>
</div>

            <div className="grid-container">
                {destinatii.map(destinatie => (
                    <ActionAreaCard
                        key={destinatie.id}
                        title={destinatie.titluDestinatie}
                        description={destinatie.descriere}
                        imageUrl={destinatie.adresaImagine}
                        onClick={() => handleCardClick(destinatie.titluDestinatie)}
                    />
                ))}
            </div>
            <UserLocationMap />
                {location.latitude && location.longitude && (
                    <div style={{ position: 'fixed', bottom: '10px', right: '10px', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>
                        <p style={{ margin: 0 }}>Lat: {location.latitude.toFixed(2)}</p>
                        <p style={{ margin: 0 }}>Lon: {location.longitude.toFixed(2)}</p>
                    </div>
                )}
        </div>
    );
}
