import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

const StyledContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1920px',
  minHeight: '100svh',
  margin: '0 auto',
  position: 'relative',
  padding: '100px 120px 0 120px',

  [theme.breakpoints.down(1920)]: {
    padding: '100px 8vw 0 8vw',
  },
  [theme.breakpoints.down(1440)]: {
    padding: '100px 5vw 0 5vw',
  },
  [theme.breakpoints.down(1280)]: {
    padding: '100px 40px 0 40px',
  },
  [theme.breakpoints.down(768)]: {
    padding: '76px 16px 0 16px',
  },
}));

const Base = () => (
  <StyledContainer>
    <Outlet />
  </StyledContainer>
);

export default Base;
