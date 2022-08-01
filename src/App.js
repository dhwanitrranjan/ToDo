import React, { useReducer } from 'react';
import Fetch  from './Components/Fetch.js';
import ToDo from './Components/ToDo.js';

const initialState = {
  count: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        [action.name]: state[action.name] + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        [action.name]: state[action.name] - 1,
      };
    case 'RESET':
      return {
        ...state,
        [action.name]: 0,
      }
    default:
      return state;
  }
};

const Counter = ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <p>Count: {state[name]}</p>
      <br />
      <button onClick={() => dispatch({ type: 'INCREMENT', name })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT', name })}>-1</button>
      <button onClick={() => dispatch({ type: 'RESET', name })}>RESET</button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Counter name="count" />
      <br/>
      <Fetch />
      <br/>
      {/* <ToDo /> */}
    </div>
  );
}

export default App;
