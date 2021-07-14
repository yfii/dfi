import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import ContentLoader from 'react-content-loader';

const ValueLoader = props => {
  const theme = useTheme();

  return (
    <ContentLoader
      width={64}
      height={16}
      viewBox="0 0 64 16"
      backgroundColor={theme.palette.background.primary}
      foregroundColor={theme.palette.background.hover}
      {...props}
    >
      <rect x="0" y="0" width="64" height="16" />
    </ContentLoader>
  );
};

export default ValueLoader;
