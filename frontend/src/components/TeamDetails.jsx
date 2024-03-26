import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import UserDetails from './UserDetails';

const TeamDetails = ({team}) => {
    const {members} = team;
  return (
    <>
    <Card>
        <CardHeader
            title={team.name}
        />

        <CardContent>
            {
                members.map((member, index) => (
                    <UserDetails key={index} user={member}/>
                ))                    
            }
        </CardContent>
    </Card>
    </>
  )
}
export default TeamDetails