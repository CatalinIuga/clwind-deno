/**
 * ANSI codes for colors
 * @enum
 */
enum Color {
  BLACK = "30",
  RED = "31",
  GREEN = "32",
  YELLOW = "33",
  BLUE = "34",
  MAGENTA = "35",
  CYAN = "36",
  WHITE = "37",

  BRIGHT_BLACK = "90",
  BRIGHT_RED = "91",
  BRIGHT_GREEN = "92",
  BRIGHT_YELLOW = "93",
  BRIGHT_BLUE = "94",
  BRIGHT_MAGENTA = "95",
  BRIGHT_CYAN = "96",
  BRIGHT_WHITE = "97",
}

/**
 * Convert number to hex string
 * @param hex number or hex string
 * @returns hex string without #
 */
export function Hex(hex: number | string): string {
  if (typeof hex === "string") {
    return hex.replace(/^#/, "").padStart(6, "0");
  }

  return hex.toString(16).padStart(6, "0");
}

/**
 * Convert RGB to string format
 * @param r red
 * @param g green
 * @param b blue
 * @returns RGB string
 */
export function RGB(r: number, g: number, b: number): string {
  return `${r};${g};${b}`;
}

/**
 * Convert hex color to RGB string
 * @param hex hex color
 * @returns RGB string
 */
function HexToRGB(hex: string): string {
  if (/^#([0-9a-f]{3}){1,2}$/i.test(hex)) {
    throw new Error("Invalid hex color");
  }

  const num = parseInt(hex, 16);

  const r = num >> 16;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;

  return RGB(r, g, b);
}

/**
 * ANSI codes for text style
 * @enum
 */
enum Style {
  BOLD = "1",
  DIM = "2",
  ITALIC = "3",
  UNDERLINE = "4",
  BLINK = "5",
  INVERT = "7",
  HIDDEN = "8",
  STRIKE = "9",
}

/**
 * Represents a colored and styled string for terminal output
 * @class
 */
export class CLW {
  private str: string;
  private color: string = "";
  private bgColor: string = "";
  private style: string[] = [];

  constructor(str: string) {
    this.str = str;
  }

  /**
   * Build the ANSI code string with the current colors and styles
   * @returns ANSI code string
   */
  public toString(): string {
    const codes: string[] = [];

    if (this.color) {
      codes.push(this.color);
    }

    if (this.style.length > 0) {
      codes.push(this.style.join(";"));
    }

    if (this.bgColor) {
      codes.push(this.bgColor);
    }

    if (codes.length === 0) {
      return this.str;
    }

    return `\x1b[${codes.join(";")}m${this.str}\x1b[0m`;
  }

  /**
   * Convert a color from the Color enum to an ANSI code.
   * Background colors are offset by 10.
   * @param color color code
   * @param bg background color
   * @returns ANSI code
   */
  private colorToAnsii(color: Color, bg: boolean = false): string {
    const colorCode = parseInt(color) + (bg ? 10 : 0);

    if (isNaN(colorCode)) {
      throw new Error("Invalid color code");
    }

    return colorCode.toString();
  }

  /**
   * Set the text color for Color code
   * @param color color code
   * @returns this
   */
  private text(color: Color): CLW {
    this.color = this.colorToAnsii(color);
    return this;
  }

  /**
   * Set the text color for hex color
   * @param color color code
   * @returns this
   */
  public text_hex(hex: number | string): CLW {
    this.color = `38;2;${HexToRGB(Hex(hex))}`;
    return this;
  }

  /**
   * Set the text color for RGB color
   * @param r red
   * @param g green
   * @param b blue
   * @returns this
   */
  public text_rgb(r: number, g: number, b: number): CLW {
    this.color = `38;2;${RGB(r, g, b)}`;
    return this;
  }

  /**
   * Set the text color for 256 color
   * @param color color code
   * @returns this
   */
  public text_256(color: number): CLW {
    this.color = `38;5;${color}`;
    return this;
  }

  /**
   * Set the background color
   * @param color color code
   * @returns this
   */
  private bg(color: Color): CLW {
    this.bgColor = this.colorToAnsii(color, true);
    return this;
  }

  /**
   * Set the background color for hex color
   * @param color color code
   * @returns this
   */
  public bg_hex(hex: number | string): CLW {
    this.bgColor = `48;2;${HexToRGB(Hex(hex))}`;
    return this;
  }

  /**
   * Set the background color for RGB color
   * @param r red
   * @param g green
   * @param b blue
   * @returns this
   */
  public bg_rgb(r: number, g: number, b: number): CLW {
    this.bgColor = `48;2;${RGB(r, g, b)}`;
    return this;
  }

  /**
   * Set the background color for 256 color
   * @param color color code
   * @returns this
   */
  public bg_256(color: number): CLW {
    this.bgColor = `48;5;${color}`;
    return this;
  }

  /**
   * Set the font style
   * @param style style code
   * @returns this
   */
  private font(style: Style): CLW {
    this.style.push(style);
    return this;
  }

  /**
   * Reset the colors and styles
   * @returns this
   */
  public reset(): CLW {
    this.color = "";
    this.bgColor = "";
    this.style = [];
    return this;
  }

  /**
   * Set the text color to black
   * @returns this
   */
  public text_red(): CLW {
    return this.text(Color.RED);
  }

  /**
   * Set the text color to green
   * @returns this
   */
  public text_green(): CLW {
    return this.text(Color.GREEN);
  }

  /**
   * Set the text color to yellow
   * @returns this
   */
  public text_yellow(): CLW {
    return this.text(Color.YELLOW);
  }

  /**
   * Set the text color to blue
   * @returns this
   */
  public text_blue(): CLW {
    return this.text(Color.BLUE);
  }

  /**
   * Set the text color to magenta
   * @returns this
   */
  public text_magenta(): CLW {
    return this.text(Color.MAGENTA);
  }

  /**
   * Set the text color to cyan
   * @returns this
   */
  public text_cyan(): CLW {
    return this.text(Color.CYAN);
  }

  /**
   * Set the text color to white
   * @returns this
   */
  public text_white(): CLW {
    return this.text(Color.WHITE);
  }

  /**
   * Set the text color to black
   * @returns this
   */
  public text_black(): CLW {
    return this.text(Color.BLACK);
  }

  /**
   * Set the text color to bright red
   * @returns this
   */
  public text_bright_red(): CLW {
    return this.text(Color.BRIGHT_RED);
  }

  /**
   * Set the text color to bright green
   * @returns this
   */
  public text_bright_green(): CLW {
    return this.text(Color.BRIGHT_GREEN);
  }

  /**
   * Set the text color to bright yellow
   * @returns this
   */
  public text_bright_yellow(): CLW {
    return this.text(Color.BRIGHT_YELLOW);
  }

  /**
   * Set the text color to bright blue
   * @returns this
   */
  public text_bright_blue(): CLW {
    return this.text(Color.BRIGHT_BLUE);
  }

  /**
   * Set the text color to bright magenta
   * @returns this
   */
  public text_bright_magenta(): CLW {
    return this.text(Color.BRIGHT_MAGENTA);
  }

  /**
   * Set the text color to bright cyan
   * @returns this
   */
  public text_bright_cyan(): CLW {
    return this.text(Color.BRIGHT_CYAN);
  }

  /**
   * Set the text color to bright white
   * @returns this
   */
  public text_bright_white(): CLW {
    return this.text(Color.BRIGHT_WHITE);
  }

  /**
   * Set the background color to red
   * @returns this
   */
  public bg_red(): CLW {
    return this.bg(Color.RED);
  }

  /**
   * Set the background color to green
   * @returns this
   */
  public bg_green(): CLW {
    return this.bg(Color.GREEN);
  }

  /**
   * Set the background color to yellow
   * @returns this
   */
  public bg_yellow(): CLW {
    return this.bg(Color.YELLOW);
  }

  /**
   * Set the background color to blue
   * @returns this
   */
  public bg_blue(): CLW {
    return this.bg(Color.BLUE);
  }

  /**
   * Set the background color to magenta
   * @returns this
   */
  public bg_magenta(): CLW {
    return this.bg(Color.MAGENTA);
  }

  /**
   * Set the background color to cyan
   * @returns this
   */
  public bg_cyan(): CLW {
    return this.bg(Color.CYAN);
  }

  /**
   * Set the background color to white
   * @returns this
   */
  public bg_white(): CLW {
    return this.bg(Color.WHITE);
  }

  /**
   * Set the background color to black
   * @returns this
   */
  public bg_black(): CLW {
    return this.bg(Color.BLACK);
  }

  /**
   * Set the background color to bright red
   * @returns this
   */
  public bg_bright_red(): CLW {
    return this.bg(Color.BRIGHT_RED);
  }

  /**
   * Set the background color to bright green
   * @returns this
   */
  public bg_bright_green(): CLW {
    return this.bg(Color.BRIGHT_GREEN);
  }

  /**
   * Set the background color to bright yellow
   * @returns this
   */
  public bg_bright_yellow(): CLW {
    return this.bg(Color.BRIGHT_YELLOW);
  }

  /**
   * Set the background color to bright blue
   * @returns this
   */
  public bg_bright_blue(): CLW {
    return this.bg(Color.BRIGHT_BLUE);
  }

  /**
   * Set the background color to bright magenta
   * @returns this
   */
  public bg_bright_magenta(): CLW {
    return this.bg(Color.BRIGHT_MAGENTA);
  }

  /**
   * Set the background color to bright cyan
   * @returns this
   */
  public bg_bright_cyan(): CLW {
    return this.bg(Color.BRIGHT_CYAN);
  }

  /**
   * Set the background color to bright white
   * @returns this
   */
  public bg_bright_white(): CLW {
    return this.bg(Color.BRIGHT_WHITE);
  }

  /**
   * Set the text color to black
   * @returns this
   */
  public font_bold(): CLW {
    return this.font(Style.BOLD);
  }

  /**
   * Set the text color to black
   * @returns this
   */
  public font_dim(): CLW {
    return this.font(Style.DIM);
  }

  /**
   * Set the text color to black
   * @returns this
   */
  public font_italic(): CLW {
    return this.font(Style.ITALIC);
  }

  /**
   * Set the text color to black
   * @returns this
   */
  public font_underline(): CLW {
    return this.font(Style.UNDERLINE);
  }

  /**
   * Set the text color to black
   * @returns this
   */
  public font_blink(): CLW {
    return this.font(Style.BLINK);
  }

  /**
   * Set the text color to black
   * @returns this
   */
  public font_invert(): CLW {
    return this.font(Style.INVERT);
  }

  /**
   * Set the text color to black
   * @returns this
   */
  public font_hidden(): CLW {
    return this.font(Style.HIDDEN);
  }

  /**
   * Set the text color to black
   * @returns this
   */
  public font_strike(): CLW {
    return this.font(Style.STRIKE);
  }

  /**
   * Log the string to the console
   * @returns void
   */
  public log(): void {
    console.log(this.toString());
  }
}

/**
 * Helper function to create a new CLW instance with the given string
 * @param str string
 * @returns CLW instance
 *
 * @example
 * ```ts
 * const str = clw`Hello, World!`.text_red().bg_hex("#000000").font_bold();
 * str.log();
 * ```
 */
// deno-lint-ignore no-explicit-any
export function clw(str: TemplateStringsArray, ...args: any): CLW {
  return new CLW(String.raw(str, ...args));
}
