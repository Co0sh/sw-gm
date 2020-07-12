import React from 'react';
import { addDecorator } from '@storybook/react';
import { Providers } from '../src/components/Providers';

addDecorator((storyFn) => <Providers>{storyFn()}</Providers>);
