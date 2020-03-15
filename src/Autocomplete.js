import React from 'react';

function AutocompleteFallback() {
    return (
        <div className="field">
            <label for="destination">
                <span className="field-label">Destination</span>
            </label>
            <select name="destination" id="destination">
                <option value="">Select</option>
                <option value="1">France</option>
                <option value="2">Germany</option>
            </select>
        </div>
    );
}

export default class Autocomplete extends React.Component {
    render() {
        const props = this.props;
        const optionElements = props.options.map(option => {
            return (
                <option key={option.value} value={option.value}>{option.label}</option>
            )
        });
        const menuElements = props.options.map(option => {
            return (
                <li key={option.value} role="option" tabindex="-1" aria-selected={option.value === props.selectedValue} data-option-value="{option.value}">
                    {option.label}
                </li>
            )
        });
        const numberOfResults = props.options.length;
        const downArrow = (
            <svg focusable="false" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g><polygon points="0 0 22 0 11 17"></polygon></g>
            </svg>
        );
        const inputId = props.name + "-input";
        const menuId = props.name + "-menu";

        return (
            <div className="field">
                <label for={inputId} className="field-label">{props.label}</label>
                <select name={props.name} aria-hidden="true" tabindex="-1" className="visually-hidden" value={props.selectedValue}>
                    <option value="">Select</option>
                    {optionElements}
                </select>
                <div className="autocomplete">
                    <input aria-owns={menuId} autocapitalize="none" type="text" autocomplete="off"  aria-autocomplete="list" role="combobox" id={inputId} aria-expanded="false"/>
                    {downArrow}
                    <ul id={menuId} role="listbox" className="hidden">
                        {menuElements}
                    </ul>
                    <div aria-live="polite" role="status" className="visually-hidden">
                    {numberOfResults} results available.
                    </div>
                </div>
            </div>
        );
    }
}
