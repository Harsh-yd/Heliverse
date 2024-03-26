import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import TeamCard from "../components/TeamCard";

const Team = () => {
    const [allTeams, setAllTeams] = useState([]);

    // fetching Teams
    useEffect(() => {
      const fetchTeams = async () => {

        const response = await fetch('https://heliverse-backend-4444.vercel.app/api/team');
        const json = await response.json();

        if (response.ok) {
          setAllTeams(json);
        }
      }

      fetchTeams();
    },[]);

  return (
    <Container sx={{marginBottom: 5}}>
      
      <Box sx={{ width: '100%',display: "flex", justifyContent: "center"}}>
        <Typography variant="h5" display="block" sx={{marginBottom: 3}}>
          Teams
        </Typography>
      </Box>


      <Grid container spacing={3}>
      {
        allTeams.map((team, index) => {
          return(
            <Grid item key={index} xs={12} md={6} lg={4}>
              <TeamCard  team={team}/>
            </Grid>
          )
        })
      }
      </Grid>
    </Container>
  )
}
export default Team



