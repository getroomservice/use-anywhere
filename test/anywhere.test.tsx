import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Anywhere } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Anywhere>hi</Anywhere>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
