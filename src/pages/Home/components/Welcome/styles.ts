import emotionStyled from '@emotion/styled';
import { Box, styled } from '@mui/system';

export const StyledWrapper = styled(Box)(() => ({
  width: '100%',
  height: '70svh',
  maxHeight: '600px',
  minHeight: '400px',
  display: 'flex',
  padding: '32px 0',
  position: 'relative',
}));

export const Panel = styled(Box)(() => ({
  position: 'absolute',
  zIndex: 1,
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '12px 40px',
  borderRadius: '12px',
  backgroundColor: 'rgba(73, 73, 255, 0.503)',
  backdropFilter: 'blur(4px)',
  color: '#fff',
  textTransform: 'uppercase',
  fontWeight: 'bold',
}));

export const StyledPlanetWrapper = emotionStyled.div`
  height: 100%;
  aspect-ratio: 1/1;
  margin:auto;
  padding: 40px;
  position: relative;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  border-radius: 50%;
  filter: hue-rotate(45deg);

  &::after{
    content: '';
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    position: absolute;
    inset: 40px;
    border-radius: 50%;
  }

    &::before{
    content: '';
    width: 180%;
    aspect-ratio: 1/1;
    left: -40%;
    top: -40%;
    position: absolute;
    border-radius: 50%;
    border: 80px solid #ffffff;
  }
`;
