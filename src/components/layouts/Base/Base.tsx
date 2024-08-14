import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

const StyledContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1920px',
  minHeight: '100svh',
  margin: '0 auto',
  position: 'relative',
  padding: '80px',

  [theme.breakpoints.down(1920)]: {
    padding: '80px 8vw',
  },
  [theme.breakpoints.down(1440)]: {
    padding: '80px 5vw',
  },
  [theme.breakpoints.down(1280)]: {
    padding: '80px 40px',
  },
  [theme.breakpoints.down(768)]: {
    padding: '16px 76px',
  },
}));

const Base = () => (
  <StyledContainer>
    <Outlet />
  </StyledContainer>
);

export default Base;
