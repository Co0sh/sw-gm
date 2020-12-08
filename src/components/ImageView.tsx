import React, { FC } from 'react';
import { cn } from '../logic/cn';
import { ButtonBase, makeStyles } from '@material-ui/core';

export interface ImageViewProps {
  src: string;
  alt: string;
  onClick?: () => void;
  className?: string;
}

export const ImageView: FC<ImageViewProps> = ({
  src,
  alt,
  className,
  onClick,
}) => {
  const classes = useStyles();
  const Component = onClick ? ButtonBase : 'div';
  return (
    <Component
      focusRipple
      className={cn(classes.root, className)}
      onClick={onClick}
    >
      <div className={classes.container}>
        <img className={classes.image} src={src} alt={alt} />
      </div>
    </Component>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: 0,
    paddingBottom: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
}));
