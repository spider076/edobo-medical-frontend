import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

// mui
import { useTheme } from '@mui/material/styles';

const Providers = () => {
  const theme = useTheme();
  return (
    <ProgressBar height="3px" color={theme.palette.primary.main} options={{ showSpinner: false }} shallowRouting />
  );
};

export default Providers;
