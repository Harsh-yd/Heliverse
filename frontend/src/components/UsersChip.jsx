import Chip from '@mui/material/Chip';

const UsersChip = ({members}) => {
  return (
    <>
    {
        members.map((member, index) => (
            <Chip key={index} label={member.first_name} size="small" />
        ))
    }
    </>
  )
}
export default UsersChip