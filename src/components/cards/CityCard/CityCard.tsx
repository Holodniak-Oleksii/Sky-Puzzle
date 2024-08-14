import { LINK_TEMPLATES } from '@/common/constants/link-templates';
import { IShortCityWeatherModel } from '@/common/types/models';
import useCities from '@/hooks/useCities';
import { getImage } from '@/utils/helpers';
import emotionStyled from '@emotion/styled';
import {
  Box,
  Button,
  Card,
  CardActions,
  styled,
  Typography,
} from '@mui/material';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface ICityCardProps {
  weather: IShortCityWeatherModel;
}

const StyledCard = styled(Card)(() => ({
  boxShadow:
    'rgba(60, 64, 67, 0.3) 0px 0px 2px 0px, rgba(60, 64, 67, 0.05) 0px 2px 6px 2px',
  borderRadius: '8px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
}));

const TopSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#57b9ff',
  color: '#fff',
  padding: '16px 16px 0 0',
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
}));

const BottomSection = styled(Box)(() => ({
  backgroundColor: '#fff',
  padding: '16px',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}));

const StyledImage = emotionStyled.img`
  width: 60%;
  object-fit: contain;
`;

const CityCard = ({ weather }: ICityCardProps) => {
  const navigate = useNavigate();
  const { refetch, removeCity } = useCities();

  const handleRedirect = () => {
    navigate(LINK_TEMPLATES.DETAILS(weather.id));
  };

  const handleClick = (
    e: MouseEvent<HTMLButtonElement>,
    callback: (id: number) => void
  ) => {
    e.stopPropagation();
    callback(weather.id);
  };

  return (
    <StyledCard onClick={handleRedirect} data-testid="card-navigate">
      <TopSection>
        <StyledImage
          src={getImage(weather.icon, 4)}
          alt={weather.description}
        />
        <Box>
          <Typography variant="subtitle2">{weather.weather}</Typography>
          <Typography variant="h3">{weather.temperature}°</Typography>
          <Typography variant="subtitle1">{weather.name}</Typography>
        </Box>
      </TopSection>
      <BottomSection>
        <Typography variant="body2">
          <strong>Wind:</strong> {weather.windSpeed}mph
        </Typography>
        <Typography variant="body2">
          <strong>Humidity:</strong> {weather.humidity}%
        </Typography>
        <Typography variant="body2">
          <strong>Pressure:</strong> {weather.pressure} in
        </Typography>
      </BottomSection>
      <CardActions>
        <Button
          size="small"
          color="secondary"
          onClick={(
            e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
          ) => {
            e.stopPropagation();
            handleClick(e, removeCity);
          }}
        >
          Remove
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={(
            e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
          ) => {
            e.stopPropagation();
            handleClick(e, refetch);
          }}
        >
          Update
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default CityCard;
