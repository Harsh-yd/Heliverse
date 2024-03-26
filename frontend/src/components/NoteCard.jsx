import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import DomainIcon from '@mui/icons-material/Domain';



const NoteCard = ({user, showTeam, currTeam, setCurrTeam}) => {

    const handleAddToTeam = () => {
        const {domain, available} = user;

        // check if the domain is already present
        const isExistingUser = currTeam.some(existingUser => existingUser.domain === domain && existingUser.available === available);

        if (isExistingUser) {
            alert(`A user with the domain "${domain}" already exists in the team.`);
        } else {
            setCurrTeam(prevTeam => [...prevTeam, user]);
        }
    }

    const handleDelteUser = async () => {
        const userId = user._id;
        console.log('delete-user-called', user);
        try {
            const response = await fetch(`https://heliverse-backend-4444.vercel.app/api/users/${userId}`, {
            method: 'DELETE'
        });
    
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
    
        const data = await response.json();
        console.log('User deleted successfully:');
        // Redirect to the specified URL
        window.location.href = data.redirect;
        
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

  return (
    <div>
        <Card>
            <CardHeader
                avatar={
                    <Avatar alt="Remy Sharp" src={user.avatar} />
                }
                action={
                    <IconButton onClick={handleDelteUser}>
                      <DeleteOutlineIcon />
                    </IconButton>
                }
                title={user.first_name + " " + user.last_name}
                subheader={user.gender}
            />

            <CardContent>
                <List dense={true}>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary={user.email} />
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemIcon>
                            <DomainIcon />
                        </ListItemIcon>
                        <ListItemText primary={user.domain} />
                    </ListItem>
                </List>
            </CardContent>

            {showTeam && <CardActions>
            <Button variant="outlined" sx={{marginLeft: 1}} onClick={handleAddToTeam}>Add to Team</Button>
            </CardActions> }
        </Card>
    </div>
  )
}
export default NoteCard