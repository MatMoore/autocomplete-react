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

class AutocompleteInput extends React.Component {
    constructor(props) {
        super(props)

        this.handleKeyUp = this.handleKeyUp.bind(this)
    }

    handleKeyUp(event) {
        switch (event.key) {
            case 'Escape':
            case 'ArrowUp':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'Space':
            case 'Enter':
            case 'Tab':
            case 'Shift':
              // ignore otherwise the menu will show
              break;
            case 'ArrowDown':
              this.props.onKeyDown();
              break;
            default:
              this.handleType(event);
          }
    }

    handleType(event) {

    }

    render() {
        const props = this.props
        const downArrow = (
            <svg focusable="false" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g><polygon points="0 0 22 0 11 17"></polygon></g>
            </svg>
        )

        return (
            <div>
                <label htmlFor={props.id} className="field-label">{props.label}</label>
                <input id={props.id} aria-owns={props.menuId} autoCapitalize="none" type="text" autoComplete="off"  aria-autocomplete="list" role="combobox" aria-expanded="false" onKeyUp={this.handleKeyUp}/>
                {downArrow}
            </div>
        )
    }
}

class AutocompleteMenu extends React.Component {
    constructor(props) {
        super(props)

        this.handleClickOption = this.handleClickOption.bind(this)
    }

    handleClickOption(event) {
        const option = event.currentTarget.dataset.optionValue
        this.props.onSelect(option)
    }

    render() {
        const props = this.props
        const numberOfResults = props.options.length
        const menuElements = props.options.map(option => {
            return (
                <li key={option.value} role="option" tabIndex="-1" aria-selected={option.value === props.value} data-option-value={option.value} onClick={this.handleClickOption}>
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
            selectedValue: props.selectedValue,
            menuVisible: props.menuVisible
        }

        this.handleSelect = this.handleSelect.bind(this)
        this.showMenu = this.showMenu.bind(this)
    }

    handleSelect(value) {
        this.setState({selectedValue: value})
    }

    showMenu() {
        this.setState({menuVisible: true})
    }

    render() {
        const props = this.props
        const menuId = props.name + "-menu"
        const inputId = props.name + "-input"

        return (
            <div className="field">
                <HiddenSelect name={props.name} options={props.options} value={this.state.selectedValue}/>
                <div className="autocomplete">
                    <AutocompleteInput id={inputId} menuId={menuId} onKeyDown={this.showMenu}/>
                    {
                        this.state.menuVisible &&
                        <AutocompleteMenu id={menuId} options={props.options} value={this.state.selectedValue} onSelect={this.handleSelect}/>
                    }
                </div>
            </div>
        )
    }
}
