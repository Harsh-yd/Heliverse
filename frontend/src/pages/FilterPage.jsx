import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import { useState } from 'react';

const FilterPage = (props) => {
    const {domain, gender, available, setDomain, setGender, setAvailable, showTeam, setShowTeam, currTeam} = props;

    const [teamName, setTeamName] = useState("");
    const [open, setOpen] = React.useState(false);

    const handleGenderChange = (event) => {
        console.log('gender-check-called', event.target.value);
        setGender(event.target.value);
    };
    const handleAvailableChange = (event) => {
        console.log('available-check');
        setAvailable(event.target.value);
    };
    const handleDomainChange = (event) => {
        console.log('domain-check');
        setDomain(event.target.value);
    };
    const handleClick = (event) =>{
      setTeamName(event.target.value);
    }
    const handleCreateTeam = async () => {
      try {
        if (teamName==="") {
          alert("Team Name Can't be empty");
          throw new Error(`Team Name Cann't be empty`);
        }
        else if(currTeam.length === 0){
          alert("Team Cann't be empty");
          throw new Error(`Team Cann't be empty`);
        }

        const postData = {
          name: teamName,
          teamList: currTeam
        };
    
        console.log('postData', postData);
    
        const response = await fetch('https://heliverse-backend-4444.vercel.app/api/team', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        setShowTeam(old => !old);
        setOpen(true);
        console.log('POST request succeeded with JSON response:', data);
      } catch (error) {
        console.error('Error encountered during POST request:', error);
      }
    };    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

  return (

    <Box
        marginBottom={3}
        display="flex"
        alignContent="center"
        alignItems="center"
        justifyContent="center"
    >
      <Typography variant="h5" sx={{marginRight: 10}}>
          Filter
      </Typography>


      <FormControl sx={{ m: 1, minWidth: 120 }} >

        <InputLabel id="Gender-label">Gender</InputLabel>
        <Select
          labelId="Gender-label"
          label="Gender"
          value={gender}
          onChange={handleGenderChange}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Agender">Agender</MenuItem>
          <MenuItem value="Bigender">Bigender</MenuItem>
          <MenuItem value="Polygender">Polygender</MenuItem>
          <MenuItem value="Genderfluid">Genderfluid</MenuItem>
          <MenuItem value="Genderqueer">Genderqueer</MenuItem>
          
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }} >
        <InputLabel id="available-label">Available</InputLabel>
        <Select
          labelId="available-label"
          label="Available"
          value={available}
          onChange={handleAvailableChange}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }} >
        <InputLabel id="domain-label">Domain</InputLabel>
          <Select
            labelId="domain-label"
            id="domain-select"
            label="Domain"
            value={domain}
            onChange={handleDomainChange}
          >
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Management">Management</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Buisness">Buisness</MenuItem>
            <MenuItem value="UI Designing">UI Designing</MenuItem>
            <MenuItem value="Buisness Development">Buisness Development</MenuItem>
          </Select> 
      </FormControl>

      <Box sx={{ flexGrow: 1 }} />

      {showTeam && <TextField 
        id="filled-basic" 
        required
        error={teamName === "" ? true : false}
        label="Enter Team Name" 
        variant="filled" 
        onChange={handleClick}
        sx={{marginRight: 3}}
        />
      }

      { showTeam ? <Button 
          variant="contained" size="large" onClick={handleCreateTeam} 
          sx={{paddingTop: 2, paddingBottom: 2}}>
          Create
        </Button>
        : 
        <Button variant="contained" size="large" onClick={()=> setShowTeam(old => !old)} 
        sx={{paddingTop: 2, paddingBottom: 2}}>
          Add New Team
        </Button>
      }

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Team Created Successfully"
      />
      
      </Box>
  )
}
export default FilterPage