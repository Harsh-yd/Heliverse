import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';

const UserDetails = ({user}) => {
  return (
    <Card sx={{marginBottom: 2}}>
        <CardHeader
            avatar={
                <Avatar alt="Remy Sharp" src={user.avatar} />
            }
            title={user.first_name + " " + user.last_name}
            subheader={user.gender}
        />
    </Card>
  )
}
export default UserDetails