import type { Animation, FlcssProperties, StyleSheet } from './types.ts';

function random(): string {
  return Math.random().toString(36).substring(2, 7);
}

function isValue(obj: unknown): boolean {
  return (typeof obj === 'string' || typeof obj === 'number');
}

function processProperty(property: string): string {
  // correct vender prefixes
  if (property.substring(0, 1) === property.substring(0, 1).toUpperCase()) {
    property = `-${property.substring(0, 1).toLowerCase()}${
      property.substring(1)
    }`;
  }

  // transform camelCase to no-caps
  property = property.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

  return property;
}

function parse(selector: string, style: StyleSheet | FlcssProperties) {
  const obj = { [selector]: style };

  const keys = Object.keys(obj);

  const rules: {
    selector: string;
    block: string;
    declarations: { property: string; value: string }[];
  }[] = [];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    const rule = obj[key];

    const declarationsList: { property: string; value: string }[] = [];

    for (let property in rule) {
      const value = rule[property as keyof typeof rule];

      // rule is probably a nested object
      if (!isValue(value)) {
        // handle at-rules
        if (property.startsWith('@')) {
          // only support at-media
          if (!property.startsWith('@media')) {
            continue;
          }

          property = key + property;
        } else {
          // handle appending classnames

          const split = key.split('@');

          // appending inside at-rule wrappers
          if (split.length > 1) {
            property = split[0] + property + '@' + split[1];
          } else {
            property = key + property;
          }
        }

        obj[property] = value;

        keys.push(property);
      } // add the rule
      else {
        // corrects vender prefixes and
        // transform camelCase to no-caps
        property = processProperty(property);

        declarationsList.push({ property, value });
      }
    }

    // item has no rules
    if (declarationsList.length <= 0) {
      continue;
    }

    const block = declarationsList
      .map((declaration) => `${declaration.property}: ${declaration.value}`)
      .join('; ') + ';';

    // handle at-rule wrappers
    if (key.includes('@')) {
      const split = key.split('@');

      rules.push({
        selector: `@${split[1]}`,
        block: `${split[0]} { ${block} }`,
        declarations: declarationsList,
      });
    } else {
      rules.push({ selector: key, block, declarations: declarationsList });
    }
  }

  return rules;
}

export function createAnimation(animation: Animation) {
  const duration = animation.duration ?? '0s';
  const timingFunction = animation.timingFunction ?? 'ease';
  const delay = animation.delay ?? '0s';
  const iterationCount = animation.iterationCount ?? '1';
  const direction = animation.direction ?? 'normal';
  const fillMode = animation.fillMode ?? 'none';

  // generate a random name for the animation
  const animationName = `flcss-animation-${random()}`;

  const keyframes = [];

  for (const key in animation.keyframes) {
    const declarationsList = [];

    const item = animation.keyframes[key];

    for (let property in item) {
      const value = item[property as keyof typeof item];

      // corrects vender prefixes and
      // transform camelCase to no-caps
      property = processProperty(property);

      declarationsList.push(`${property}: ${value}`);
    }

    keyframes.push(`${key} { ${declarationsList.join('; ')}; }`);
  }

  return {
    name: (animation.duration || animation.timingFunction || animation.delay ||
        animation.iterationCount || animation.direction || animation.fillMode)
      ? `${animationName} ${duration} ${timingFunction} ${delay} ${iterationCount} ${direction} ${fillMode}`
      : animationName,
    bundle: `@keyframes ${animationName} { ${keyframes.join(' ')} }`,
  };
}

export function createStyle<T>(
  styles: { [key in keyof T]: StyleSheet & FlcssProperties } | StyleSheet,
) {
  const classNames: { [key in keyof T]: string } = {};

  const rules: string[] = [];

  const keys = Object.keys(styles);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    let rule = styles[key];

    let className = key;

    // key must be a possible classnames
    if (!key.match('^[A-z]')) {
      throw new Error(`Error: ${key} is not a valid classname`);
    }

    // create a class name using the original class name as a prefix and a random characters
    // & return generated classnames
    classNames[key] = `flcss-${key}-${random()}`;

    className = `.${classNames[key]}`;

    // handle extending
    if (typeof rule['extend'] === 'string') {
      const extendKey = rule['extend'];

      // delete extend property
      delete rule['extend'];

      if (styles[extendKey]) {
        rule = { ...styles[extendKey], ...rule };
      } else {
        throw new Error(
          `Error: can't extend ${key} with ${extendKey} because ${extendKey} does not exists`,
        );
      }
    }

    parse(className, rule).forEach(({ selector, block }) =>
      rules.push(`${selector} { ${block} }`)
    );
  }

  return {
    names: classNames,
    bundle: rules.join('\n'),
  };
}
