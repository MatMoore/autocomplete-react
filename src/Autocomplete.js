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

        this.inputRef = React.createRef()

        this.handleKeyUp = this.handleKeyUp.bind(this)

        this.state = {
            validOptionSelected: this.props.value !== undefined
        }
    }

    componentDidUpdate() {
        if(!this.state.validOptionSelected) {
            return
        }

        // If we have updated the component,
        // and have selected an option, rather than typed it,
        // then put the cursor at the end of the input
        const inputEl = this.inputRef.current
        inputEl.focus()
        inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length)
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
        this.setState({validOptionSelected: false})
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
                <input ref={this.inputRef} id={props.id} aria-owns={props.menuId} autoCapitalize="none" type="text" autoComplete="off"  aria-autocomplete="list" role="combobox" aria-expanded="false" onKeyUp={this.handleKeyUp} defaultValue={props.value}/>
                {downArrow}
            </div>
        )
    }
}

class AutocompleteMenu extends React.Component {
    constructor(props) {
        super(props)

        this.highlightedRef = React.createRef()

        this.handleClickOption = this.handleClickOption.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
    }

    componentDidMount() {
        this.highlightedRef.current.focus()
    }

    componentDidUpdate() {
        this.highlightedRef.current.focus()
    }

    handleKeyUp(event) {
        console.log('keyup')
    }

    handleClickOption(event) {
        const option = event.currentTarget.dataset.optionValue
        this.props.onSelect(option)
    }

    render() {
        const props = this.props
        const numberOfResults = props.options.length

        const menuElements = props.options.map(option => {
            if (option.value === this.props.highlightedValue) {
                return (
                    <li ref={this.highlightedRef} key={option.value} role="option" tabIndex="-1" aria-selected="true" data-option-value={option.value} onClick={this.handleClickOption}>
                        {option.label}
                    </li>
                )
            } else {
                return (
                    <li key={option.value} role="option" tabIndex="-1" aria-selected="false" data-option-value={option.value} onClick={this.handleClickOption}>
                        {option.label}
                    </li>
                )
            }
        })

        return (
            <div>
                <ul id={props.id} role="listbox" className="hidden" onKeyUp={this.handleKeyUp}>
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
            menuVisible: props.menuVisible,
            highlightedValue: props.selectedValue || props.options[0].value
        }

        this.handleSelect = this.handleSelect.bind(this)
        this.handleHighlight = this.handleHighlight.bind(this)
        this.showMenu = this.showMenu.bind(this)
    }

    handleSelect(value) {
        this.setState({selectedValue: value, menuVisible: false})
    }

    handleHighlight(value) {
        console.log('highlight' + value)
    }

    showMenu() {
        this.setState({menuVisible: true})
    }

    selectedLabel() {
        const option = this.props.options.find(option => option.value === this.state.selectedValue)
        return option === undefined ? "" : option.label
    }

    render() {
        const props = this.props
        const menuId = props.name + "-menu"
        const inputId = props.name + "-input"

        return (
            <div className="field">
                <HiddenSelect name={props.name} options={props.options} value={this.state.selectedValue}/>
                <div className="autocomplete">
                    <AutocompleteInput id={inputId} menuId={menuId} onKeyDown={this.showMenu} value={this.selectedLabel()}/>
                    {
                        this.state.menuVisible &&
                        <AutocompleteMenu id={menuId} options={props.options} value={this.state.selectedValue} highlightedValue={this.state.highlightedValue} onSelect={this.handleSelect} onHighlight={this.handleHighlight}/>
                    }
                </div>
            </div>
        )
    }
}
