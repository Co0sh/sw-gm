import { CircularProgress, Fade } from '@material-ui/core';
import React, { FC } from 'react';
import { Div } from './Div';

interface LoadingViewProps {}

const LoadingView: FC<LoadingViewProps> = () => {
  return (
    <Div align="center" justify="center" grows>
      <Fade in style={{ transitionDelay: '800ms' }}>
        <CircularProgress />
      </Fade>
    </Div>
  );
};

export default LoadingView;
