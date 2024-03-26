import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';


import NoteCard from "../components/NoteCard";
import PageNavigation from "../components/PageNavigation";
import FilterPage from "./FilterPage";

const Home = (props) => {
  const {users, limit, total, page, setPage, domain, gender, available, setDomain, setGender, setAvailable} = props;

  const [showTeam, setShowTeam] = useState(false);
  const [currTeam, setCurrTeam] = useState([]);


  return (
    <Container>

      <FilterPage 
        domain={domain} 
        gender={gender} 
        available={available}
        setDomain={setDomain} 
        setGender={setGender} 
        setAvailable={setAvailable} 
        showTeam={showTeam} 
        setShowTeam={setShowTeam} 
        currTeam={currTeam}
      />

      <Grid container spacing={3}>
        {users && users.map(user => (
          <Grid item key={user.id} xs={12} md={6} lg={4}>
            <NoteCard 
              user={user} 
              showTeam={showTeam} 
              currTeam={currTeam}
              setCurrTeam={setCurrTeam} 
            />
          </Grid>
        ))}
      </Grid>

      <Box 
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{marginTop: 5, marginBottom: 10}}>

        <PageNavigation page={page} limit={limit} total={total} setPage={setPage} />
      </Box>

    </Container>
  )
}
export default Home



