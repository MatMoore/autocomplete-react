import React from 'react'

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
    )
}

function HiddenSelect(props) {
    const optionElements = props.options.map(option => {
        return (
            <option key={option.value} value={option.value}>{option.label}</option>
        )
    })

    return (
        <select name={props.name} aria-hidden="true" tabIndex="-1" className="visually-hidden" defaultValue={props.value}>
            <option value="">Select</option>
            {optionElements}
        </select>
    )
}

function AutocompleteInput(props) {
    const downArrow = (
        <svg focusable="false" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g><polygon points="0 0 22 0 11 17"></polygon></g>
        </svg>
    )

    return (
        <div>
            <label htmlFor={props.id} className="field-label">{props.label}</label>
            <input id={props.id} aria-owns={props.menuId} autoCapitalize="none" type="text" autoComplete="off"  aria-autocomplete="list" role="combobox" aria-expanded="false"/>
            {downArrow}
        </div>
    )
}

class AutocompleteMenu extends React.Component {
    constructor(props) {
        super(props)

        this.onClickOption = this.onClickOption.bind(this)
    }

    onClickOption(event) {
        const option = event.currentTarget.dataset.optionValue
        this.props.handleSelect(option)
    }

    render() {
        const props = this.props
        const numberOfResults = props.options.length
        const menuElements = props.options.map(option => {
            return (
                <li key={option.value} role="option" tabIndex="-1" aria-selected={option.value === props.value} data-option-value={option.value} onClick={this.onClickOption}>
                    {option.label}
                </li>
            )
        })

        return (
            <div>
                <ul id={props.id} role="listbox" className="hidden">
                {menuElements}
                </ul>
                <div aria-live="polite" role="status" className="visually-hidden">
                    {numberOfResults} results available.
                </div>
            </div>
        )
    }
}

export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedValue: props.selectedValue
        }

        this.onSelect = this.onSelect.bind(this)
    }

    onSelect(value) {
        this.setState({selectedValue: value})
    }

    render() {
        const props = this.props
        const menuId = props.name + "-menu"
        const inputId = props.name + "-input"

        return (
            <div className="field">
                <HiddenSelect name={props.name} options={props.options} value={this.state.selectedValue}/>
                <div className="autocomplete">
                    <AutocompleteInput id={inputId} menuId={menuId}/>
                    <AutocompleteMenu id={menuId} options={props.options} value={this.state.selectedValue} handleSelect={this.onSelect}/>
                </div>
            </div>
        )
    }
}
