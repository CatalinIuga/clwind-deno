import { assert } from "@std/assert";
import { clw } from "./mod.ts";

Deno.test("Basic text color test", () => {
  const test = clw`Hello, world!`.text_blue().toString();
  assert(test === "\x1b[34mHello, world!\x1b[0m");
});

Deno.test("Basic background color test", () => {
  const test = clw`Hello, world!`.bg_blue().toString();
  assert(test === "\x1b[44mHello, world!\x1b[0m");
});

Deno.test("Basic font style test", () => {
  const test = clw`Hello, world!`.font_blink().toString();
  assert(test === "\x1b[5mHello, world!\x1b[0m");
});

Deno.test("Basic text color and font style test", () => {
  const test = clw`Hello, world!`.text_blue().font_blink()
    .toString();
  assert(test === "\x1b[34;5mHello, world!\x1b[0m");
});

Deno.test("Basic text color and background color test", () => {
  const test = clw`Hello, world!`.text_blue().bg_blue()
    .toString();
  assert(test === "\x1b[34;44mHello, world!\x1b[0m");
});

Deno.test("Basic background color and font style test", () => {
  const test = clw`Hello, world!`.bg_blue().font_blink()
    .toString();
  assert(test === "\x1b[5;44mHello, world!\x1b[0m");
});

Deno.test("Basic text color, background color, and font style test", () => {
  const test = clw`Hello, world!`.text_blue().bg_blue()
    .font_blink().toString();
  assert(test === "\x1b[34;5;44mHello, world!\x1b[0m");
});
