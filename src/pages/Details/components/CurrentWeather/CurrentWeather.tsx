import { IAPIWeather } from '@/common/types/weather';
import { getImage } from '@/utils/helpers';
import emotionStyled from '@emotion/styled';
import { Box, styled, Typography } from '@mui/material';
import { FC } from 'react';

interface ICurrentWeatherProps {
  weather: IAPIWeather;
}

const WeatherImage = emotionStyled.img`
  height: 180px;
  margin-left: auto;
`;

const StyledBox = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  padding: '16px 24px',
  width: '100%',
  maxWidth: '500px',
  backgroundColor: '#fff',
  borderRadius: '12px',
}));

const CurrentWeather: FC<ICurrentWeatherProps> = ({ weather }) => (
  <StyledBox>
    <Box display="flex" alignItems="flex-start" gap={1}>
      <Box display="flex" flexDirection="column">
        <Typography variant="h2">{weather.main.temp}°</Typography>
        <Typography variant="subtitle1">
          {weather.name}, {weather.weather[0].description}
        </Typography>
      </Box>
      <WeatherImage src={getImage(weather.weather[0].icon, 4)} />
    </Box>

    <Box bgcolor={'#57b9ff61'} padding={'10px 16px'} borderRadius={1}>
      <Typography variant="body1">
        <b>Feels Like:</b>&nbsp;
        {weather.main.feels_like}°
      </Typography>
      <Typography variant="body1">
        <b>Humidity:</b>&nbsp;{weather.main.humidity}%
      </Typography>
      <Typography variant="body1">
        <b>Wind Speed:</b>&nbsp;
        {weather.wind.speed} m/s
      </Typography>
      <Typography variant="body1">
        <b>Pressure:</b>&nbsp;
        {weather.main.pressure} in
      </Typography>
    </Box>
  </StyledBox>
);

export default CurrentWeather;
