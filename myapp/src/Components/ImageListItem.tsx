import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { DestinatiiPages } from '../Models/DestinatiiPages'; // Importă tipul definit

interface ImageListItem{
  destinationKey : string;
}

export default function StandardImageList({ destinationKey }: { destinationKey: string }) {
  const [itemData, setItemData] = React.useState<DestinatiiPages[]>([]); // Specifică tipul stării
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch('http://localhost:8080/DestinatiiPages/getAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setItemData(data))
      .catch(error => console.error('There was an error fetching the data!', error));
  }, []);

  return (
    <ImageList sx={{ width: 950, height: 390 }} cols={4} rowHeight={190}>
      {itemData.map((item) => (
        <ImageListItem key={item.id}>
          <img
            srcSet={`${item[destinationKey as keyof DestinatiiPages]}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item[destinationKey as keyof DestinatiiPages]}?w=164&h=164&fit=crop&auto=format`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
