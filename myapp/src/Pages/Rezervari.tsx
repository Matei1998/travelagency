import React, { useState, useEffect } from 'react';
import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import BasicDateRangePicker from '../Components/BasicDateRangePicker';
import SelectAutoWidth from "../Components/SelectAutoWidth";
import dayjs, { Dayjs } from 'dayjs';
import '../styles.css';
import { Pages } from "../Components/Router/router";
import UserLocationMap from '../Components/UserLocationMap';
import Cookies from 'js-cookie';

export const Rezervari = (): JSX.Element => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [destination, setDestination] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [showReservationButton, setShowReservationButton] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number | undefined, longitude: number | undefined }>({ latitude: undefined, longitude: undefined });
  const loc=useLocation()
  useEffect(() => {
    console.log(loc);
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
    }, [loc.pathname]);

  const handleDateChange = (newDateRange: [Dayjs | null, Dayjs | null]) => {
    setDateRange(newDateRange);
    setAvailability(null);
    setShowReservationButton(false);
  };

  const handleDestinationChange = (newDestination: string) => {
    setDestination(newDestination);
    setAvailability(null);
    setShowReservationButton(false);
  };

  const calculatePrice = async () => {
    if (dateRange[0] && dateRange[1] && destination) {
      const diffInDays = dateRange[1].diff(dateRange[0], 'day') + 1;
      try {
        const response = await fetch(`http://localhost:8080/Destinatii/${destination}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const destinationDetails = await response.json();
        if (destinationDetails) {
          const totalPrice = diffInDays * destinationDetails.pretPerZi;
          setPrice(totalPrice);
        } else {
          console.log('Destination not found or price per day not available');
        }
      } catch (error) {
        console.error('Error fetching destination price:', error);
      }
    } else {
      alert('Te rugăm să selectezi o destinație și un interval de date.');
    }
  };

  const calculateAvailability = async () => {
    if (dateRange[0] && dateRange[1] && destination) {
      try {
        const rezervareDTO = {
          locatie: destination,
          startDate: dateRange[0]?.format('YYYY-MM-DD'),
          endDate: dateRange[1]?.format('YYYY-MM-DD')
        };

        const response = await fetch('http://localhost:8080/rezervari/verificaDisponibilitate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rezervareDTO),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const isAvailable = await response.json();
        setAvailability(isAvailable);
        setShowReservationButton(isAvailable);
      } catch (error) {
        console.error('Error fetching availability:', error);
        throw new Error('A apărut o eroare la verificarea disponibilității.');
      }
    } else {
      alert('Te rugăm să selectezi o destinație și un interval de date.');
    }
  };

  const onClick = (): void => {
    navigate(Pages.Home);
  };

  const handleReservation = async () => {
    const dataRezervare = dayjs();
    if (dateRange[0] && dateRange[1] && destination && price !== null) {
      const rezervare = {
        locatie: destination,
        dataInceput: dateRange[0].toISOString().split('T')[0],
        dataFinal: dateRange[1].toISOString().split('T')[0],
        dataRezervare: dataRezervare.toISOString().split('T')[0],
        costTotal: price
      };

      try {
        const response = await fetch('http://localhost:8080/rezervari/efectuare', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rezervare),
        });

        if (response.ok) {
          alert('Rezervarea a fost efectuată cu succes!');
          navigate('/Home');
        } else {
          console.error('Eroare la efectuarea rezervării');
          throw new Error('Eroare la efectuarea rezervării');
        }
      } catch (error) {
        console.error('Eroare la efectuarea rezervării', error);
        throw new Error('Eroare la efectuarea rezervării');
      }
    } else {
      console.error('Incomplete information:', { dateRange, destination, price });
      alert('Te rugăm să completezi toate informațiile necesare.');
    }
  };

  return (
    <div className="background-inregistrare">
      <Typography variant="h3" sx={{ position: 'absolute', fontSize: '3rem', top: '40px', left: '550px' }}>
        Rezervare vacanță
      </Typography>
      <div>
        <Typography variant="h6" sx={{ position: 'absolute', top: '20px', right: '20px', color: 'white' }}>
          {username ? `Bine ai venit, ${username}!` : ''}
        </Typography>
      </div>
      <div className="rezervare">
        <BasicDateRangePicker onDateChange={handleDateChange} />
      </div>
      <div>
        <Button variant="contained" sx={{ position: 'absolute', top: '20px', left: '20px' }} onClick={onClick}>
          Acasa
        </Button>
      </div>
      <div>
        <SelectAutoWidth onDestinationChange={handleDestinationChange} />
      </div>
      <div>
        <Button variant="outlined" className="butonRezervare" onClick={calculatePrice}>
          Calculează prețul
        </Button>
      </div>
      {price !== null && (
        <div style={{ marginTop: '20px', fontSize: '20px' }}>
          Prețul total: {price} EUR
        </div>
      )}
      <div>
        <Button variant="outlined" className="butonRezervare" onClick={calculateAvailability}>
          Verifică disponibilitatea
        </Button>
      </div>
      {availability !== null && (
        <div style={{ marginTop: '20px', fontSize: '20px' }}>
          Disponibilitate: {availability ? 'Disponibil' : 'Indisponibil'}
        </div>
      )}
      {showReservationButton && (
        <div>
          <Button variant="outlined" className="butonRezervare" onClick={handleReservation} disabled={availability === false}>
            Rezerva sejurul
          </Button>
        </div>
      )}
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

export default Rezervari;
