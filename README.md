# svelte-mono-icons

Svelte components for the beautiful [mono icon set](https://github.com/mono-company/mono-icons).

## Installation

With npm
`npm install --save-dev svelte-mono-icons`

or yarn
`yarn add --dev svelte-mono-icons`

## Usage

```html
<script>
  import { MoonIcon, SunIcon, ... } from 'svelte-mono-icons';
</script>

<MoonIcon size="24" />
<SunIcon size="1.5x" class="yellow" focusable="false" />

<style>
  :global(.yellow path) {
    fill: yellow !important;
  }
</style>
```

## Icons

Complete list of icons can be found [here](https://icons.mono.company/).

The naming convention for the components is pascal case with 'Icon' appended. So the icon 'arrow-up' become 'ArrowUpIcon'.

```javascript
import { ArrowUpIcon } from 'svelte-mono-icons';
```

## Acknowledgements

- [Mono Icons](https://github.com/mono-company/mono-icons)
- This library is based on [svelte-feather-icons](https://github.com/dylanblokhuis/svelte-feather-icons) and [vue-feather-icons](https://github.com/egoist/vue-feather-icons)