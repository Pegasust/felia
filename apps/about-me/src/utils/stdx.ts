import React from "react";

export function useReducerMonad<T, ReduceProps>(reducer: (state: T, reduceProps: ReduceProps) => T, init: T) {
    return React.useReducer(reducer, init);
}
