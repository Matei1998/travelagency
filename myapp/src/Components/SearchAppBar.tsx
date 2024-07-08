import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface SearchAppBarProps {
  showLoginButton: boolean;
  onLoginClick: () => void;
  username: string | null;
  onLogoutClick: () => void;
}

enum locatii{
  Grecia,Indonezia,Republicadominicana,Turcia
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: 'auto',
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',
    '&:focus': {
      width: '20ch',
    },
  },
}));

const SearchAppBar = (props: SearchAppBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };
  const handleDestinatiiClick = () => {
    navigate('/destinatii');
  };
  const handleAcasaClick = () => {
    navigate('/Home');
  };
  const handleAutentificareClick = () => {
    navigate('/Autentificare');
  };
  const handleInregistrareClick = () => {
    navigate('/Inregistrare');
  };
  const handleRezervariClick = () => {
    navigate('/Destinatii/Rezervari');
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setError(null);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/destinatii/${searchTerm.trim()}`);
    } else {
      setError('Introduceti o destinatie valida');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div">
          Transylvania Tour
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" onClick={handleAcasaClick}>Acasa</Button>
          <Button color="inherit" onClick={handleDestinatiiClick}>Destinatii</Button>
          <Button color="inherit" onClick={handleContactClick}>Contact</Button>
          <Button color="inherit" onClick={handleRezervariClick}>Rezervari</Button>
          {props.username ? (
            <>
              <Typography variant="body1" color="inherit" sx={{ marginRight: 2 }}>
                Bine ai venit, {props.username}
              </Typography>
              <Button color="inherit" onClick={props.onLogoutClick}>Delogare</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleAutentificareClick}>Autentificare</Button>
              <Button color="inherit" onClick={handleInregistrareClick}>Inregistrare</Button>
            </>
          )}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Cauta o destinatie"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Search>
          </form>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default SearchAppBar;
