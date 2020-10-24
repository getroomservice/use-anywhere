import React from 'react';
import { useContext, useState, createContext, useRef, useEffect } from 'react';

const context = createContext<{
  subscribe?: (event: Symbol, callback: Function) => any;
  publish?: (event: Symbol, callback: Function) => any;
}>({});

export interface Atom<T extends any> {
  default?: T;
  symbol: Symbol;
}

export function createAtom<T extends any>(defaultState?: T) {
  return {
    default: defaultState,
    symbol: Symbol('atom'),
  };
}

export function useAnywhere<T extends any>(
  atom: Atom<T>
): [T | undefined, (arg: T) => void] {
  const ctx = useContext(context);
  const [state, setState] = useState<T>(atom.default!);

  useEffect(() => {
    ctx.subscribe!(atom.symbol, (data: any) => {
      setState(data);
    });
  }, []);

  function set(data: any) {
    ctx.publish!(atom.symbol, data);
  }

  return [state, set];
}

export function Anywhere(props: { children: React.ReactNode }) {
  const ref = useRef<any>({
    subs: {},
  });

  function subscribe(event: any, callback: Function) {
    if (!Array.isArray(ref.current.subs[event])) {
      ref.current!.subs[event] = [];
    }
    ref.current!.subs[event].push(callback);
  }

  function publish(event: any, data: any) {
    if (!Array.isArray(ref.current.subs[event])) return;
    for (let fn of ref.current.subs[event]) fn(data);
  }

  return (
    <context.Provider
      value={{
        subscribe,
        publish,
      }}
    >
      {props.children}
    </context.Provider>
  );
}
