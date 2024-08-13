import { LINK_TEMPLATES } from '@/common/constants/link-templates';
import { IShortCityWetherModel } from '@/common/types/models';
import useCities from '@/hooks/useCities';
import { getImage } from '@/utils/helpers';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface ICityCardProps {
  weather: IShortCityWetherModel;
}

const CityCard = ({ weather }: ICityCardProps) => {
  const push = useNavigate();

  const { refetch, removeCity } = useCities();

  const handleRedirect = () => {
    push(LINK_TEMPLATES.DETAILS(weather.id));
  };

  const handleClick = (
    e: MouseEvent<HTMLButtonElement>,
    callback: (id: number) => void
  ) => {
    e.stopPropagation();
    callback(weather.id);
  };

  return (
    <Card onClick={handleRedirect}>
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
          <img src={getImage(weather.icon, 2)} />
        </Typography>
        <Typography
          sx={{ mb: 1.5, textTransform: 'capitalize' }}
          color="text.secondary"
        >
          {weather.description}
        </Typography>
        <Typography variant="body2">
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(e) => handleClick(e, removeCity)}>
          remove
        </Button>
        <Button size="small" onClick={(e) => handleClick(e, refetch)}>
          update
        </Button>
      </CardActions>
    </Card>
  );
};

export default CityCard;
