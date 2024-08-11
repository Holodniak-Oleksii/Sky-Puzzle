import { lightTheme } from '@/services/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const App = () => (
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
);

export default App;
