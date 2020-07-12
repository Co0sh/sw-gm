import React, { FC, ComponentType } from 'react';
import { makeStyles } from '@material-ui/core';
import { cn } from '../logic/cn';

export type FlexPosition =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline'
  | 'space-between'
  | 'space-evenly'
  | 'space-around';

export interface DivProps {
  row?: boolean;
  grows?: boolean;
  align?: FlexPosition;
  justify?: FlexPosition;
  className?: string;
  component?: ComponentType<{ className?: string }>;
  [key: string]: any;
}

export const Div: FC<DivProps> = ({
  row = false,
  grows = false,
  align,
  justify,
  component: Component = 'div',
  className,
  children,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Component
      {...rest}
      className={cn(
        classes.base,
        row && classes.row,
        grows && classes.grows,
        align && (classes as any)[`align-${align}`],
        justify && (classes as any)[`justify-${justify}`],
        className,
      )}
    >
      {children}
    </Component>
  );
};

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  grows: {
    flexGrow: 1,
  },
  'align-center': {
    alignItems: 'center',
  },
  'align-flex-start': {
    alignItems: 'flex-start',
  },
  'align-flex-end': {
    alignItems: 'flex-end',
  },
  'align-stretch': {
    alignItems: 'stretch',
  },
  'align-baseline': {
    alignItems: 'baseline',
  },
  'align-space-between': {
    alignItems: 'space-between',
  },
  'align-space-evenly': {
    alignItems: 'space-evenly',
  },
  'align-space-around': {
    alignItems: 'space-around',
  },
  'justify-center': {
    justifyContent: 'center',
  },
  'justify-flex-start': {
    justifyContent: 'flex-start',
  },
  'justify-flex-end': {
    justifyContent: 'flex-end',
  },
  'justify-stretch': {
    justifyContent: 'stretch',
  },
  'justify-baseline': {
    justifyContent: 'baseline',
  },
  'justify-space-between': {
    justifyContent: 'space-between',
  },
  'justify-space-evenly': {
    justifyContent: 'space-evenly',
  },
  'justify-space-around': {
    justifyContent: 'space-around',
  },
});
