import { EAPI_STATUS } from '@/common/types/enums';
import { CityCard } from '@/components/cards/CityCard';
import useCities from '@/hooks/useCities';
import { Alert, Box, Snackbar, Typography } from '@mui/material';

import { getCardWidth } from '@/utils/helpers';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { SearchFiled } from './components/SearchFiled';

export const StyledWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const StyledList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),

  '& > *': {
    width: getCardWidth(theme.spacing(1), 5),

    [theme.breakpoints.down(1620)]: {
      width: getCardWidth(theme.spacing(1), 4),
    },

    [theme.breakpoints.down(1024)]: {
      width: getCardWidth(theme.spacing(1), 3),
    },

    [theme.breakpoints.down(768)]: {
      width: `calc(50% - 4px)`,
    },

    [theme.breakpoints.down(540)]: {
      width: '100%',
    },
  },
}));

const Home = () => {
  const { data, status, addCity, error } = useCities();
  console.log('data :', data);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const isLoading =
    status === EAPI_STATUS.IDLE || status === EAPI_STATUS.LOADING;

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderCities = () =>
    data.map((item) => <CityCard weather={item} key={item.id} />);

  useEffect(() => {
    if (error) {
      setOpenSnackbar(true);
    }
  }, [error]);

  if (isLoading) {
    // @TODO: implement loading state
    return null;
  }

  return (
    <StyledWrapper>
      <SearchFiled handlerAddCity={addCity} />
      {!!data.length ? (
        <StyledList>{renderCities()}</StyledList>
      ) : (
        <Box
          height={200}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Typography variant="h6" align="center">
            You don't have any city to watch. Provide the name of the city
          </Typography>
        </Box>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </StyledWrapper>
  );
};

export default Home;
