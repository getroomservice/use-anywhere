import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Anywhere, useAnywhere, createAtom } from '../.';

const input = createAtom<string>();

function Input() {
  const [state, setState] = useAnywhere<string>(input);
  return <input onChange={e => setState(e.target.value)} value={state} />;
}

const inputWithDefault = createAtom<string>('i am default value');

function InputWithDefault() {
  const [state, setState] = useAnywhere<string>(inputWithDefault);
  return <input onChange={e => setState(e.target.value)} value={state} />;
}

const App = () => {
  return (
    <Anywhere>
      <Input />
      <Input />
      <InputWithDefault />
      <div>I'm unrelated and don't rerender!</div>
    </Anywhere>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
