import { IAPIWeather } from '@/common/types/weather';
import useWeather from '@/hooks/useWeather';
import { getImage } from '@/utils/helpers';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

interface ICityCardProps {
  weather: IAPIWeather;
}

const CityCard = ({ weather }: ICityCardProps) => {
  const { removeCity } = useWeather();

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          {weather.name}
        </Typography>
        <Typography>
          <img src={getImage(weather.weather[0].icon, 2)} />
        </Typography>
        <Typography
          sx={{ mb: 1.5, textTransform: 'capitalize' }}
          color="text.secondary"
        >
          {weather.weather[0].description}
        </Typography>
        <Typography variant="body2">
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => removeCity(weather.id)}>
          remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CityCard;
