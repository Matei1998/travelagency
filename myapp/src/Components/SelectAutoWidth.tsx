import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SelectAutoWidthProps {
  onDestinationChange: (destination: string) => void;
}

const SelectAutoWidth: React.FC<SelectAutoWidthProps> = ({ onDestinationChange }) => {
  const [destinations, setDestinations] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:8080/Destinatii/getAll'); // Înlocuiește cu URL-ul real al endpoint-ului
        if (!response.ok) {
          throw new Error('Failed to fetch destinations');
        }
        const data = await response.json();
        setDestinations(data.map((dest: any) => dest.titluDestinatie)); // Presupunând că răspunsul este un array de obiecte cu câmpul "titluDestinatie"
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedDestination = event.target.value;
    setSelectedDestination(selectedDestination);
    onDestinationChange(selectedDestination);
  };

  return (
    <FormControl sx={{ m: 2, minWidth: 200, top: 4 }}>
      <InputLabel id="select-destination-label">Selectează locația</InputLabel>
      <Select
        labelId="select-destination-label"
        id="select-destination"
        value={selectedDestination}
        onChange={handleChange}
        autoWidth
        label="Locație"
      >
        {destinations.map((destination, index) => (
          <MenuItem key={index} value={destination}>{destination}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectAutoWidth;
