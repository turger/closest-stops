import React from 'react'
import ReactDOM from 'react-dom'
import ListApp from './ListApp'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ListApp />, div)
  ReactDOM.unmountComponentAtNode(div)
});
