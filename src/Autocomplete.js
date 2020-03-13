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

export default function Autocomplete() {
    return (
        <div className="field">
            <label for="destination" className="field-label">Destination</label>
            <select name="destination" aria-hidden="true" tabindex="-1" className="visually-hidden">
                <option value="">Select</option>
                <option value="1">France</option>
                <option value="2">Germany</option>
            </select>
            <div className="autocomplete">
                <input aria-owns="autocomplete-options--destination" autocapitalize="none" type="text" autocomplete="off"  aria-autocomplete="list" role="combobox" id="destination" aria-expanded="false"/>
                <svg focusable="false" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g><polygon points="0 0 22 0 11 17"></polygon></g>
                </svg>
                <ul id="autocomplete-options--destination" role="listbox" className="hidden">
                <li role="option" tabindex="-1" aria-selected="false" data-option-value="1" id="autocomplete_1">
                    France
                </li>
                <li role="option" tabindex="-1" aria-selected="true" data-option-value="2" id="autocomplete_2">
                    Germany
                </li>
                </ul>
                <div aria-live="polite" role="status" className="visually-hidden">
                13 results available.
                </div>
            </div>
        </div>
    );
  }
