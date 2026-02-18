# PostCSS Nested Import with Tailwind CSS Support

A PostCSS plugin for importing other stylesheet source files anywhere in your CSS. This is a fork of [postcss-nested-import](https://github.com/eriklharper/postcss-nested-import) by [Erik Harper](https://github.com/eriklharper) with enhancements for Tailwind CSS and improved module resolution.

## Features

- Import CSS files at any nesting level
- Proper module resolution with support for node_modules and web_modules
- Tailwind CSS package detection and resolution
- Process cascading imports
- PostCSS 8+ compatible

## Installation

```bash
npm install @zoliszabo/postcss-nested-import-tailwind
```

> **Note:** This package is a drop-in replacement for the original [postcss-nested-import](https://github.com/eriklharper/postcss-nested-import). It uses the same `@nested-import` at-rule syntax, so you can simply replace the original package without changing your CSS. If you're using this fork, the original package is no longer needed.

## Usage

### Basic Setup

```js
const postcss = require('postcss');
const nestedImport = require('@zoliszabo/postcss-nested-import-tailwind');

postcss([nestedImport()]).process(css);
```

Or in your PostCSS configuration file:

**CommonJS:**
```js
// postcss.config.js
module.exports = {
  plugins: [
    require('@zoliszabo/postcss-nested-import-tailwind')
  ]
};
```

**ESM:**
```js
// postcss.config.mjs
import nestedImport from '@zoliszabo/postcss-nested-import-tailwind';

export default {
  plugins: [
    nestedImport()
  ]
};
```

**ESM with plugin map syntax:**
```js
// postcss.config.mjs
export default {
  plugins: {
    '@zoliszabo/postcss-nested-import-tailwind': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
  },
};
```

### Example

**vendor.css**
```css
.vendor {
  background: silver;
}
```

**index.css**
```css
:global {
  @nested-import './vendor.css';
}
```

**Result**
```css
:global {
  .vendor {
    background: silver;
  }
}
```

## How It Works

The plugin processes `@nested-import` at-rules and replaces them with the parsed content from the imported file. It intelligently resolves module paths including:

- Local file imports (relative and absolute paths)
- npm packages with CSS support
- Tailwind CSS packages (via `style` or `index.css` entry points)
- Files in `node_modules` and `web_modules` directories

## License

MIT

## Attribution

This project is based on [postcss-nested-import](https://github.com/eriklharper/postcss-nested-import) by Erik Harper. It extends the original with Tailwind CSS support and enhanced module resolution capabilities.
