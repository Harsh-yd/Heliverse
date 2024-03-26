import { Outlet, NavLink } from "react-router-dom";

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const handleClick = () =>{
  console.log('button is clicked');
}




const RootLayout = ({setSearch}) => {

  const handleSearchChange = (event) => {
    console.log('search-check');
    setSearch(event.target.value);
  };
    
    return(
      <div className="root-layout">
        <header>
          <nav>
          <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
            <AppBar position="static">
              <Toolbar>

                
                <Typography
                  variant="h5"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', marginLeft: 15, fontWeight: 700 } }}
                >
                  <NavLink to="/">Heliverse</NavLink>
                </Typography>

                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search User.."
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearchChange}
                  />
                </Search>

                <Box sx={{ flexGrow: 1 }} />

                
                <NavLink to="/team">
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="team of current user"
                    aria-haspopup="true"
                    sx = {{marginRight: 5, color: 'white'}}
                    onClick={()=>handleClick()}
                  >
                    <GroupsIcon />
                  </IconButton>
                </NavLink>

              </Toolbar>
            </AppBar>
          </Box>
          </nav>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    )
}
export default RootLayout;