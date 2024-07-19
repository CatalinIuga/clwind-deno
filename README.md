# clwind - TailwindCSS-ish API for you CLI text

ANSII color codes are a pain to remember, and just like plain CSS, it can take more time to write than it should. This is a simple utility that allows you to add colors and styles to your CLI text with a TailwindCSS-like syntax.

## Installation

Get the module from [jsr.io](https://jsr.io/@gug/clwind)

```bash
deno add @gug/clwind
```

## Usage

```ts
import { clw } from "@gug/clwind";

clw`Deno🦕`.text_hex(0xf2f2f2).bg_green().font_bold().log();

const ansi_formated = clw`Hello, World!`.text_rgb(255, 0, 0);

console.log(ansi_formated.toString());
```

## Features

### Colors

- Base colors & bright colors

  - black
  - red
  - green
  - yellow
  - blue
  - magenta
  - cyan
  - white

- Hex colors
- RGB colors
- 256 colors

### Styles

- bold
- dim
- italic
- underline
- blink
- reverse
- hidden
- strikethrough

## License

MIT
