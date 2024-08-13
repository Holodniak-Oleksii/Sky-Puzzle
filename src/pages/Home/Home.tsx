import { CityCard } from '@/components/cards/CityCard';
import useCities from '@/hooks/useCities';
import { Welcome } from '@/pages/Home/components/Welcome';
import { Button } from '@mui/material';
import { useState } from 'react';
import {
  FormContent,
  FormWrapper,
  StyledContainer,
  StyledInput,
  StyledList,
} from './styles';

const Home = () => {
  const { addCity, data } = useCities();
  const [query, setQuery] = useState('');

  const handleClick = () => {
    addCity(query);
  };

  const renderCities = () =>
    data.map((item) => <CityCard weather={item} key={item.id} />);

  return (
    <StyledContainer>
      <Welcome />
      <FormWrapper>
        <FormContent>
          <StyledInput
            placeholder="Search"
            name="query"
            variant="standard"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            type="submit"
            variant="text"
            color="primary"
            onClick={handleClick}
          >
            Get
          </Button>
        </FormContent>
        <StyledList>{renderCities()}</StyledList>
      </FormWrapper>
    </StyledContainer>
  );
};

export default Home;
