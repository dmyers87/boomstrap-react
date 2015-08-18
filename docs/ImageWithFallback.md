## ImageWithFallback (React Element)

> Because the internet lies to us about images, sometimes we need a backup for img tags if src does not exist.

### Usage

```html
<ImageWithFallback
 src='http://www.derp.com/img1.jpg'
 fallbackSrc='http://www.derp.com/backup.jpg' />
```
---

### Props

**src** (string) _required_  Link to image to show.

**fallbackSrc** (string) _required_ Link to show on error with src.

> Any extra props passed to ImageWithFallback will apply to the img tag within.
