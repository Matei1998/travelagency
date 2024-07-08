import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import "../styles.css";
import {Button} from "@mui/material";
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import "../styles.css";
import {Pages} from "../Components/Router/router";
import Cookies from 'js-cookie';
import UserLocationMap from "../Components/UserLocationMap";
import {ContactData} from "../Models/ContactData";



export const Contact = (): JSX.Element => {

  const navigate = useNavigate();
  const [username,setUsername]=useState<string | null>(null);
  const [contactData,setContactData]=useState<ContactData[]>([]);
  const onClick = (): void => {
    navigate(Pages.Home);
  };
  const [location, setLocation] = useState<{ latitude: number | undefined, longitude: number | undefined }>({ latitude: undefined, longitude: undefined });

  useEffect(()=>{

    fetch('http://localhost:8080/Contact/getAll')
    .then(response =>response.json())
    .then(data=>{
      setContactData(data);
    })
    .catch(error =>{
      console.error('Error in fetching the data',error)
    });

    const storedUserData = localStorage.getItem("name");
    if(storedUserData){
      setUsername(storedUserData);
    }

    const savedLocation = Cookies.get('userLocation');
    if (savedLocation) {
        const parsedLocation = JSON.parse(savedLocation);
        setLocation(parsedLocation);
    }

  }) 

  return (
    <div className="background-container">

      <div>
      <Button variant="contained" sx={{ position: 'absolute', top: '20px', left: '20px' }} onClick={onClick}>Acasa</Button>

      </div>
      <div>

      <Typography variant="h6" sx={{ position: 'absolute', top: '20px', right: '20px', color: 'white' }}>{username ? `Bine ai venit, ${username}!` : ''}</Typography>


      <Paper elevation={1} className="contact-paper">
  <Typography variant="h3" gutterBottom style={{fontWeight: 'bold', fontSize: '30px' }}>Informatii contact si orar</Typography>
  <List>
    {contactData.map((contact, index) => (
      <div key={index}>
        <ListItem>
          <ListItemText primary="Telefon" secondary={contact.telefon} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary={contact.email} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Program" secondary={contact.orar} />
        </ListItem>
      </div>
    ))}
  </List>
</Paper>

        <UserLocationMap />
                {location.latitude && location.longitude && (
                    <div style={{ position: 'fixed', bottom: '10px', right: '10px', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>
                        <p style={{ margin: 0 }}>Lat: {location.latitude.toFixed(2)}</p>
                        <p style={{ margin: 0 }}>Lon: {location.longitude.toFixed(2)}</p>
                    </div>
                )}
      </div>
    </div>
  );

}


