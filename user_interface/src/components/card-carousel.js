import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useState } from 'react';

export default function ActionAreaCard({ image, title }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300); // Reset after animation
  };

  return (
    <Card
      sx={{
        width: 200,
        height: 200,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isClicked ? 'scale(1.1)' : 'scale(1)', // Scale effect on click
        transition: 'transform 0.3s ease', // Smooth animation
        cursor: 'pointer', // Pointer cursor for click indication
      }}
      onClick={handleClick}
    >
      <CardActionArea sx={{ height: '100%', width: '100%' }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
        <CardContent
          sx={{
            position: 'absolute',
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            width: '100%',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            fontSize={11}
            textAlign="center"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
