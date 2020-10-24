<h1 align="center">
  <br>
  <img src="./logo.svg" alt="use-anywhere"  />
  <br>
  <br>
</h1>

`use-anywhere` is a hook that lets you share state between components without rerendering the entire tree. It's a bit like [Recoil](https://recoiljs.org/), but under 1kb gziped, so you can embed it within your own libraries.

# Install

```
yarn add use-anywhere
```

# Usage

## Setup

At the top of your application (or just higher up, we're not your boss), add `<Anywhere/>`:

```tsx
import { Anywhere } from 'use-anywhere';

function App() {
  return (
    <Anywhere>
      <TheRestOfYourApp />
    </Anywhere>
  );
}
```

## Atoms

State in `use-anywhere` is referenced by "Atoms", which you can create with `createAtom`:

```tsx
import { createAtom } from 'use-anywhere';

const atom = createAtom();
```

You can also set a default value for the state:

```tsx
const atom = createAtom('cool friends');
```

## Using State

If you have an atom, you can access state with `useAnywhere`:

```tsx
import { useAnywhere } from 'use-anywhere';

function MyComponent() {
  const [state, setState] = useAnywhere(atom);
}
```

# FAQ

**Wait what, how is this different from useState in Context?**

If you store state in context at the top of your tree, it will rerender all the children, which can be slow in complex applications. What you'd really like is for two or more components to access the same state without hoisting it, so only those two components rerender:

```tsx
function App() {
  return (
    <Context>
      <SharedState /> {/* rerender! */}
      <SharedState /> {/* rerender! */}
      <DoesntUseSharedState /> {/* don't rerender! */}
    </Context>
  );
}
```

**How does this differ from Recoil?**
It's smaller and does less.
