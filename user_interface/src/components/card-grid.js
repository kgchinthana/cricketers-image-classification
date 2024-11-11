import * as React from 'react';
import Grid from '@mui/material/Grid';
import ActionAreaCard from './card-carousel';
import kumar_sangakkara from '../assets/images/kumar_sangakkara.png';
import mahela_jayawardhana from '../assets/images/mahela_jayawardhana.png';
import lasith_malinga from '../assets/images/lasith_malinga.png';
import pathum_nissanka from '../assets/images/pathum_nissanka.png';
import kamindu_mendis from '../assets/images/kamindu_mendis.png';
import wanindu_hasranga from '../assets/images/wanindu_hasaranga.png';
import kasal_janith_perera from '../assets/images/kusal_janith_perera.png';


const cardData = [
  { image: kumar_sangakkara, title: "Kumar Sangakkara" },
  { image: mahela_jayawardhana, title: "Mahela Jayawardhana"  },
  { image: lasith_malinga, title: "Lasith Malinga" },
  { image: pathum_nissanka, title: "Pathum Nissanka"  },
  { image: kamindu_mendis, title: "Kamindu Mendis"  },
  { image: wanindu_hasranga, title: "Wanindu Hasranga"  },
  { image: kasal_janith_perera, title: "Kasal Janith Perera"  }
];

export default function CardGrid() {
  return (
    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ overflowX: 'auto' }}>
      {cardData.map((card, index) => (
        <Grid item key={index}>
          
          <ActionAreaCard image={card.image} title={card.title} description={card.description} />
        </Grid>
      ))}
    </Grid>
  );
}
