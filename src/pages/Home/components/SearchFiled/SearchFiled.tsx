import { Box, Button, Input, styled } from '@mui/material';
import { FC, useState } from 'react';

const StyledInput = styled(Input)(() => ({
  flexGrow: 1,
}));

export const StyledContent = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  gap: theme.spacing(1),
  maxWidth: '500px',
  margin: '0 auto',
  padding: '4px',
}));

interface ISearchFiledProps {
  handlerAddCity: (city: string) => void;
}

const SearchFiled: FC<ISearchFiledProps> = ({ handlerAddCity }) => {
  const [query, setQuery] = useState('');

  const handleClick = () => {
    handlerAddCity(query);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <StyledContent>
      <StyledInput
        placeholder="Enter full city name"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        type="submit"
        variant="text"
        color="primary"
        onClick={handleClick}
      >
        Get
      </Button>
    </StyledContent>
  );
};

export default SearchFiled;
