import React, { FC } from 'react';
import { cn } from '../logic/cn';
import { makeStyles } from '@material-ui/core';

export interface ImageViewProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageView: FC<ImageViewProps> = ({ src, alt, className }) => {
  const classes = useStyles();
  return (
    <div className={cn(classes.root, className)}>
      <img className={classes.image} src={src} alt={alt} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingBottom: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));
