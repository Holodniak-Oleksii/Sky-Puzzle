import useCache from '@/hooks/useCache';
import { useParams } from 'react-router-dom';
import { CurrentWeather } from './components/CurrentWeather';
import { TemperatureChart } from './components/TemperatureChart';
import { StyledContainer, StyledWrapper } from './styles';

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
