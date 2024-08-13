import { CityCard } from '@/components/cards/CityCard';
import useCities from '@/hooks/useCities';
import { ISubmitFormData } from '@/pages/Home/types';
import { Button } from '@mui/material';
import {
  FormContent,
  StyledContainer,
  StyledInput,
  StyledList,
} from './styles';

const Home = () => {
  const { addCity, data } = useCities();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as ISubmitFormData;

    addCity(data.query);
  };

  const renderCities = () =>
    data.map((item) => <CityCard weather={item} key={item.id} />);

  return (
    <StyledContainer>
      <form onSubmit={handleSubmit}>
        <FormContent>
          <StyledInput placeholder="Search" name="query" />
          <Button type="submit" variant="outlined" color="primary">
            Get
          </Button>
        </FormContent>
      </form>
      <StyledList>{renderCities()}</StyledList>
    </StyledContainer>
  );
};

export default Home;
