# FLCSS SSR

```jsx
import { Head } from 'fresh/runtime.ts';

import { createStyle } from 'https://pax.deno.dev/fable-community/flcss@v1.0.1';

const styles = createStyle({
  button: {
    cursor: 'pointer',
    backgroundColor: colors.blue,
    ':hover': {
      border: '2px solid white',
    },
  },
  icon: {
    color: '#ffffff',
  },
});

export default function () {
  return (
    <>
      <Head>
        <style>{styles.bundle}</style>
      </Head>
      <div>
        <button className={styles.names.button}>
          Button
          <img class={styles.names.icon} />
        </button>
      </div>
    </>
  );
}
```
