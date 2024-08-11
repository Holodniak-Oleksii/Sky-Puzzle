import { getCardWidth } from '@/utils/helpers';
import { Box, Input, styled } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

export const FormContent = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  gap: theme.spacing(1),
}));

export const StyledInput = styled(Input)(() => ({
  flexGrow: 1,
}));

export const StyledList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),

  '& > *': {
    width: getCardWidth(theme.spacing(1), 5),

    [theme.breakpoints.down(1440)]: {
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
