import React, { useReducer, useRef, useState } from "react";

type ACTIONTYPE =
    | { type: "increment"; }
    | { type: "decrement";  }
    | {
        type: "reset"; payload: {
            count: number;
        } };

const Counter: React.FC = () => {

    const initialCount = { count: 0 };
 
    const [state, dispatch] = useReducer(reducer, initialCount);
    const prevCount = useRef(-1)


    function reducer(state: typeof initialCount, action: ACTIONTYPE) {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 } ;
            case 'decrement':
                return { count: state.count - 1 };
            default:
                throw new Error();
        }
    }

    return (
        <>
            <div>
                <span>How Old are u?</span>
                <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
                <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
            </div>
            
            <span>I am : {state.count} years old 😊</span>
            <span>In last year i was {state.count ? prevCount.current = state.count - 1 : -1} years old 😁</span>
        </>
    )
}


export default Counter