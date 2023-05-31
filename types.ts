import type * as CSS from 'https://esm.sh/csstype@3.1.2';

type CSSProperties = CSS.Properties<string, number>;

type Pseudos = Partial<{
  ':-moz-any()': CSSProperties;
  ':-moz-dir': CSSProperties;
  ':-webkit-any()': CSSProperties;
  '::part': CSSProperties;
  '::slotted': CSSProperties;
  ':dir': CSSProperties;
  ':has': CSSProperties;
  ':host': CSSProperties;
  ':host-context': CSSProperties;
  ':is': CSSProperties;
  ':lang': CSSProperties;
  ':matches()': CSSProperties;
  ':not': CSSProperties;
  ':nth-child': CSSProperties;
  ':nth-last-child': CSSProperties;
  ':nth-last-of-type': CSSProperties;
  ':nth-of-type': CSSProperties;
  ':where': CSSProperties;
  ':-khtml-any-link': CSSProperties;
  ':-moz-any-link': CSSProperties;
  ':-moz-focusring': CSSProperties;
  ':-moz-full-screen': CSSProperties;
  ':-moz-placeholder': CSSProperties;
  ':-moz-read-only': CSSProperties;
  ':-moz-read-write': CSSProperties;
  ':-ms-fullscreen': CSSProperties;
  ':-ms-input-placeholder': CSSProperties;
  ':-webkit-any-link': CSSProperties;
  ':-webkit-full-screen': CSSProperties;
  '::-moz-placeholder': CSSProperties;
  '::-moz-progress-bar': CSSProperties;
  '::-moz-range-progress': CSSProperties;
  '::-moz-range-thumb': CSSProperties;
  '::-moz-range-track': CSSProperties;
  '::-moz-selection': CSSProperties;
  '::-ms-backdrop': CSSProperties;
  '::-ms-browse': CSSProperties;
  '::-ms-check': CSSProperties;
  '::-ms-clear': CSSProperties;
  '::-ms-fill': CSSProperties;
  '::-ms-fill-lower': CSSProperties;
  '::-ms-fill-upper': CSSProperties;
  '::-ms-input-placeholder': CSSProperties;
  '::-ms-reveal': CSSProperties;
  '::-ms-thumb': CSSProperties;
  '::-ms-ticks-after': CSSProperties;
  '::-ms-ticks-before': CSSProperties;
  '::-ms-tooltip': CSSProperties;
  '::-ms-track': CSSProperties;
  '::-ms-value': CSSProperties;
  '::-webkit-backdrop': CSSProperties;
  '::-webkit-input-placeholder': CSSProperties;
  '::-webkit-progress-bar': CSSProperties;
  '::-webkit-progress-inner-value': CSSProperties;
  '::-webkit-progress-value': CSSProperties;
  '::-webkit-slider-runnable-track': CSSProperties;
  '::-webkit-slider-thumb': CSSProperties;
  '::after': CSSProperties;
  '::backdrop': CSSProperties;
  '::before': CSSProperties;
  '::cue': CSSProperties;
  '::cue-region': CSSProperties;
  '::first-letter': CSSProperties;
  '::first-line': CSSProperties;
  '::grammar-error': CSSProperties;
  '::marker': CSSProperties;
  '::placeholder': CSSProperties;
  '::selection': CSSProperties;
  '::spelling-error': CSSProperties;
  ':active': CSSProperties;
  ':after': CSSProperties;
  ':any-link': CSSProperties;
  ':before': CSSProperties;
  ':blank': CSSProperties;
  ':checked': CSSProperties;
  ':default': CSSProperties;
  ':defined': CSSProperties;
  ':disabled': CSSProperties;
  ':empty': CSSProperties;
  ':enabled': CSSProperties;
  ':first': CSSProperties;
  ':first-child': CSSProperties;
  ':first-letter': CSSProperties;
  ':first-line': CSSProperties;
  ':first-of-type': CSSProperties;
  ':focus': CSSProperties;
  ':focus-visible': CSSProperties;
  ':focus-within': CSSProperties;
  ':fullscreen': CSSProperties;
  ':hover': CSSProperties;
  ':in-range': CSSProperties;
  ':indeterminate': CSSProperties;
  ':invalid': CSSProperties;
  ':last-child': CSSProperties;
  ':last-of-type': CSSProperties;
  ':left': CSSProperties;
  ':link': CSSProperties;
  ':only-child': CSSProperties;
  ':only-of-type': CSSProperties;
  ':optional': CSSProperties;
  ':out-of-range': CSSProperties;
  ':placeholder-shown': CSSProperties;
  ':read-only': CSSProperties;
  ':read-write': CSSProperties;
  ':required': CSSProperties;
  ':right': CSSProperties;
  ':root': CSSProperties;
  ':scope': CSSProperties;
  ':target': CSSProperties;
  ':valid': CSSProperties;
  ':visited': CSSProperties;
}>;

// type AtRules = Partial<{
//   '@charset': FlcssProperties
//   '@counter-style': FlcssProperties
//   '@document': FlcssProperties
//   '@font-face': FlcssProperties
//   '@font-feature-values': FlcssProperties
//   '@import': FlcssProperties
//   '@keyframes': FlcssProperties
//   '@media': FlcssProperties
//   '@namespace': FlcssProperties
//   '@page': FlcssProperties
//   '@supports': FlcssProperties
//   '@viewport': FlcssProperties
// }>

export interface FlcssProperties extends CSSProperties, Pseudos {
  extend?: string;
}

export type StyleSheet = { [key in string]: FlcssProperties | StyleSheet };

type Keyframes = {
  [key: string]: CSSProperties;
} & {
  from?: CSSProperties;
  to?: CSSProperties;
};

export type Animation = {
  keyframes: Keyframes;
  timingFunction?: CSS.Property.AnimationTimingFunction;
  delay?: CSS.Property.AnimationDelay;
  iterationCount?: CSS.Property.AnimationIterationCount;
  duration?: CSS.Property.AnimationDuration;
  direction?: CSS.Property.AnimationDirection;
  fillMode?: CSS.Property.AnimationFillMode;
};
