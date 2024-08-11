import { CityCard } from '@/components/cards/CityCard';
import { Button, Input } from '@mui/material';
import { StyledContainer } from './styles';

const Home = () => {
  return (
    <StyledContainer>
      <Input />
      <Button variant="outlined">Submit</Button>
      <CityCard />
    </StyledContainer>
  );
};

export default Home;
