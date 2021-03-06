import React from 'react';

import Autocomplete from '../Autocomplete.js'

export default {
    component: Autocomplete,
    title: 'Autocomplete',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

const options = [
    {label: "France", value: "fr"},
    {label: "Germany", value: "de"},
]
export const Default = () => <Autocomplete name="autocomplete" options={options} label="Destination"/>

export const Selected = () => <Autocomplete name="autocomplete" options={options} label="Destination" selectedValue="de" menuVisible="true"/>
