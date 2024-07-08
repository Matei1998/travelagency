import React, { useState, useEffect } from 'react';
import ImageListItem from '../Components/ImageListItem';
import { useNavigate } from "react-router-dom";
import '../styles.css';
import { Destinatie } from '../Models/Destinatie';
import { Button, Typography } from "@mui/material";
import {Pages} from "../Components/Router/router";
import UserLocationMap from "../Components/UserLocationMap";
import Cookies from 'js-cookie';

export const RepublicaDominicana = (): JSX.Element => {
  const [data, setData] = useState<Destinatie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null); 

  const navigate = useNavigate();
  const onClick = (): void => {
    navigate(Pages.Home);
  };
  const [location, setLocation] = useState<{ latitude: number | undefined, longitude: number | undefined }>({ latitude: undefined, longitude: undefined });



  useEffect(() => {
    fetch('http://localhost:8080/Destinatii/getAll', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        const destination = data.find((item: Destinatie) => item.id === 4);
        setData(destination || null);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setError('There was an error fetching the data.');
        setLoading(false);
      });
      const storedUserData = localStorage.getItem('name');
        if (storedUserData) {
            setUsername(storedUserData);
            const savedLocation = Cookies.get('userLocation');
            if (savedLocation) {
                const parsedLocation = JSON.parse(savedLocation);
                setLocation(parsedLocation);
            }
        } else {
            alert("Te rugam sa te autentifici!");
            navigate(Pages.Autentificare);
        }
    }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Data not available</div>;
  }

  return (
    <div className="background-containerGrecia">
            <Typography variant="h6" sx={{ position: 'absolute', top: '20px', right: '20px', color: 'white' }}>{username ? `Bine ai venit, ${username}!` : ''}</Typography>

      <Button variant="contained" className="butonAcasaGrecia" onClick={onClick}> Acasa </Button>
      <div className="imageListContainer">
        <ImageListItem destinationKey="adresaRepublicadominicana" />
      </div>
      <Typography className="descriereGrecia" variant="h5" component="h2"
      sx={{
        backgroundColor: 'lightgrey',
        padding: 1,
        borderRadius: 2,
      }}>
        {data.descriere}
      </Typography>
      <UserLocationMap />
                {location.latitude && location.longitude && (
                    <div style={{ position: 'fixed', bottom: '10px', right: '10px', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>
                        <p style={{ margin: 0 }}>Lat: {location.latitude.toFixed(2)}</p>
                        <p style={{ margin: 0 }}>Lon: {location.longitude.toFixed(2)}</p>
                    </div>
                )}
    </div>
  );
};
