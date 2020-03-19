# Autocomplete-react

A react component that turns a regular `<select>` element into an accessible
autocomplete control.

The implementation of this component is based on [building an accessible autocomplete control](https://adamsilver.io/articles/building-an-accessible-autocomplete-control/) by Adam Silver. [A demo of that control is available on heroku](https://nostyle.herokuapp.com/examples/autocomplete).

## Roadmap

### The control is an enhancement of the select element
- Renders a regular select control when javascript is not available
- Select box is visually hidden when the autocomplete is present
- Select box is hidden to assistive technology when the autocomplete is present
- Select box is not focusable when the autocomplete is present
- When the user selects an autocomplete option, the select box is updated to keep them in sync, so the correct data is sent to the server when submitting forms

### The menu doesn't get in the way
- The menu is hidden until you interact with the control
- It takes up a maximum height and the content becomes scrollable if it exceeds that
- Unfocusing the control hides the menu to stop it obscuring content
- There is an overlaid SVG icon as a visual hint that the menu is available

### Autocomplete behaviour takes precedence over browser defaults
- Browser autocomplete is disabled
- Browser autocapitalize is disabled

### Filtering is intuitive
- Filtering is case insensitive
- Options are still returned if there are small typos
- Users can type alternate names for each option

### The control is usable by keyboard
- The control has a single tab stop which focuses the text box
- When either the text box or menu is focused, the user can use arrow keys to traverse the menu, and enter or space to select an option
- When the text box is focused:
  - If the user presses down without having typed anything, the menu shows all options and focuses the first one
  - If the user presses down after typing something, and there are matches, the menu shows all matching options and focuses the first one
- When the menu is focused:
  - Pressing tab hides the menu
  - Pressing escape hides the menu and focuses the text box.
  - Pressing anything other than arrow keys, tab, enter, space, or escape focuses the text box so the user can keep typing.

### The control is usable by assistive technology
- The control's label is accessible to assistive technology
- The input is announced as a `combobox`
- Screen reader users are told that a list of options will appear
- Screen reader users are told when the menu is expanded or collapsed
- The menu is communicated as a `list`
- The selected item is is marked with `aria-selected`
- A live region is used to inform screen reader users when options are selected

### The component is packaged properly
- The component can be easily added to another project
- There is a demo of the component
- Published to NPM

### Questions
- Should the menu show whenever the control is focused? Currently, it appears when clicked on but not when navigated to by keyboard.
- Should the "up" arrow wrap around to the bottom of the list? Currently, it collapses the menu.
- Should there be a way to tell whether a valid value has been selected? Currently, this is obvious when you are interacting with the control, but if the control is not focused there is no visual distinction.

## Licence
All code is available under the [MIT licence](LICENSE).

## Development setup from react-starter-kit
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy-storybook`

Deploys the [Storybook](https://storybook.js.org/) documentation to github pages.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
