import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import UsersChip from './UsersChip';

import TeamDetails from './TeamDetails';


const TeamCard = ({team}) => {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleDelteTeam = async () => {
      const teamId = team._id;
      try {
          const response = await fetch(`https://heliverse-backend-4444.vercel.app/api/team/${teamId}`, {
          method: 'DELETE'
      });
  
      if (!response.ok) {
          throw new Error('Failed to delete team');
      }
  
      const data = await response.json();
      console.log('Team deleted successfully:', data);
      // Redirect to the specified URL
      window.location.href = data.redirect;
      
      } catch (error) {
          console.error('Error deleting team:', error);
      }
  }

    return (
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
          <Box sx={{ p: 2 }}>
    
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            
            <Button onClick={handleOpen}>
                <Typography variant="h6" noWrap={true} sx={{color: "#424242"}}>
                    {team.name}
                </Typography>
            </Button>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <TeamDetails team={team} />
            </Backdrop>

            <IconButton onClick={handleDelteTeam}>
                <DeleteOutlineIcon/>
            </IconButton>
          </Stack>
    
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="body2">
              Members
            </Typography>
            <Stack direction="row" spacing={1}>
              <UsersChip members={team.members} />
            </Stack>
          </Box>
        </Card>
      );
}
export default TeamCard