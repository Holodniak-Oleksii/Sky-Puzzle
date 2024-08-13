import { Box, styled } from '@mui/material';

import emotionStyled from '@emotion/styled';

export const StyledWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const StyledContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  gap: theme.spacing(4),
}));

export const WeatherImage = emotionStyled.img`
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  width: 250px;
  height: 250px;
`;
