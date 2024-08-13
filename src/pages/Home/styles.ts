import { getCardWidth } from '@/utils/helpers';
import { Box, styled, TextField } from '@mui/material';

export const StyledContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export const FormWrapper = styled(StyledContainer)(({ theme }) => ({
  backgroundColor: '#ffffff',
  gap: theme.spacing(4),
  zIndex: 1,
  borderRadius: '16px',
  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
  padding: '40px',
}));

export const FormContent = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  gap: theme.spacing(1),
  maxWidth: '500px',
  margin: '0 auto',
  padding: '4px',
}));

export const StyledInput = styled(TextField)(() => ({
  flexGrow: 1,
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
