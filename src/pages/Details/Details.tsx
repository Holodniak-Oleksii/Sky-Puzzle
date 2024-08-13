import useCache from '@/hooks/useCache';
import { getImage } from '@/utils/helpers';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { StyledContainer, StyledWrapper, WeatherImage } from './styles';

const Details = () => {
  const { id } = useParams();

  const { data: weather } = useCache(Number(id));

  return (
    <StyledWrapper>
      <StyledContainer>
        <WeatherImage src={getImage(weather?.weather[0].icon, 4)} />
        <Box>
          <Typography variant="h1" component="h2">
            {weather?.name}
          </Typography>

          <Typography variant="h6" component="h6">
            {weather?.weather[0].description}
          </Typography>
        </Box>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default Details;
