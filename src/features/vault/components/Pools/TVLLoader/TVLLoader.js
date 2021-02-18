import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import ContentLoader from 'react-content-loader';

const Loader = props => {
  const theme = useTheme();

  return (
    <ContentLoader
      speed={2}
      width={120}
      height={28}
      viewBox="0 0 120 28"
      backgroundColor={theme.palette.background.primary}
      foregroundColor={theme.palette.background.hover}
      {...props}
    >
      <rect x="0" y="0" width="120" height="28" />
    </ContentLoader>
  );
};

export default Loader;
