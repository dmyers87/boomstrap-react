# Fauxbox (React Element)

> Much like the similarly named hairstyle of the '00s, the Fauxbox replaces something functional with something flashy in hopes to lure the user into touching it.

### Example

```html
<Fauxbox
  id='coolBox'
  className='fauxbox-test'
  labelClass='box-test'
  checked={true}
  onClick={this._handleOnClick}
  inline={false}
  label='Box Test'
```
---

### Props

**id** (string) _required_  id that will be used with checkbox input and label to connect the two

**className** (string) Class to apply to the outer div

**labelClass** (string) Class to apply to the label

**checked** (bool) _required_ Checked state of the Fauxbox

**onClick** (function) Function to be called when the Fauxbox when clicked

**inline** (bool) When true, the fauxbox-inline class will be applied, allowing multiple Fauxboxes to be on the same line

**label** (node | string) React Element or string to render as the label for the Fauxbox
