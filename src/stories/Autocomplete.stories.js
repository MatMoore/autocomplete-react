import React from 'react';
import { action } from '@storybook/addon-actions';

import Autocomplete from '../Autocomplete.js'

export default {
    component: Autocomplete,
    title: 'Autocomplete',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

export const Default = () => <Autocomplete/>
