import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import imagine from '../indonezia.jpg';


interface ActionAreaCardProps {
    title: string;
    description: string;
    imageUrl: string;
    onClick: ()=>void;
  }
  
  const ActionAreaCard: React.FC<ActionAreaCardProps> = ({ title, description, imageUrl,onClick }) => {
    return (
 
      <Card  onClick={onClick} sx={{ maxWidth: 250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            width="50" 
            image={imageUrl}
            alt="Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
  
  export default ActionAreaCard;