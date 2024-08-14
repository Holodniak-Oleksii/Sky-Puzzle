import useCache from '@/hooks/useCache';
import { Box, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CurrentWeather } from './components/CurrentWeather';
import { TemperatureChart } from './components/TemperatureChart';

export const StyledWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const StyledContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

const Details = () => {
  const { id } = useParams();
  const { data: weather } = useCache(Number(id));

  if (!weather) return null;

  return (
    <StyledWrapper>
      <StyledContainer>
        <CurrentWeather weather={weather} />
        {!!weather.forecast && <TemperatureChart forecast={weather.forecast} />}
      </StyledContainer>
    </StyledWrapper>
  );
};

export default Details;
