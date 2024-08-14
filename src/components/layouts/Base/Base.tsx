import { LINK_TEMPLATES } from '@/common/constants/link-templates';
import { AppBar, Box, styled, Theme, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

const responsivePadding = ({ theme }: { theme: Theme }) => ({
  [theme.breakpoints.down(1920)]: {
    padding: '0 8vw',
  },
  [theme.breakpoints.down(1440)]: {
    padding: '0 5vw',
  },
  [theme.breakpoints.down(1280)]: {
    padding: '0 40px',
  },
  [theme.breakpoints.down(768)]: {
    padding: '0 16px ',
  },
});

export const StyledWrapper = styled(Box)(responsivePadding);

const StyledContainer = styled(Box)(() => ({
  width: '100%',
  maxWidth: '1920px',
  minHeight: '100svh',
  margin: '0 auto',
  position: 'relative',
  paddingTop: '100px',
  paddingBottom: '100px',
}));

const StyledBar = styled(AppBar)(() => ({
  height: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledLogoText = styled(Typography)(() => ({
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: '#fff',
  textDecoration: 'none',
  cursor: 'pointer',
}));

const Base = () => {
  const push = useNavigate();

  const handlerPushHome = () => push(LINK_TEMPLATES.HOME());

  return (
    <>
      <StyledBar position="fixed">
        <StyledWrapper>
          <StyledLogoText variant="h6" onClick={handlerPushHome}>
            Sky Puzzle
          </StyledLogoText>
        </StyledWrapper>
      </StyledBar>
      <StyledContainer>
        <StyledWrapper>
          <Outlet />
        </StyledWrapper>
      </StyledContainer>
    </>
  );
};

export default Base;
