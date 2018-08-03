# react-native-dynamic-modal
Add dynamic modals to any component without worrying about toggling Booleans. Useful for components that might launch multiple modals

## Usage

1. Decorate Your Modal
```js
import { registerModal } from 'react-native-dynamic-modal'

@registerModal("MyModal")
class MyModal extends React.Component {
  // ...
```

**NOTE** If the modal uses other decorators that add props such as Redux's connect or React-Navigation's withNavigation, make sure this decorator is run after them (i.e. place it at a line before them). 

2. Decorate Your Component
```js
import { withModal } from 'react-native-dynamic-modal'

@withModal
class MyComponent extends React.Component {
  // ...
```
This decorator simply adds the `onModal` method to the props of the decorated component. THe order isn't important here.

3. Open The Modal
```js
  // Somewhere inside MyComponent's render function
  // ...
  <Button label="click me" onPress={()=>this.props.openModal('MyModal'})/>
```

## API

`openModal(name: String, props: Object}`

Opens a registered modal.
- name - The name of a registered modal
- props - Props to be passed to the object

`closeModal()` (WIP)

Closes a modal, if open.

## Full Example
Coming Soon
