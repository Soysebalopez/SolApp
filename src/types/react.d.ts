/// <reference types="react" />

import type { 
  FormEvent, 
  ChangeEvent, 
  ReactNode, 
  ReactElement 
} from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'react' {
  export * from 'react';

  export type {
    FormEvent,
    ChangeEvent,
    ReactNode,
    ReactElement
  };

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extend if needed
  }

  export interface Component<P = {}, S = {}, SS = any> {
    props: Readonly<P>;
    state: Readonly<S>;
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
    readonly context: any;
    readonly refs: {
      [key: string]: ReactInstance;
    };
  }

  export class Component<P, S> {
    constructor(props: Readonly<P>);
    constructor(props: P, context?: any);
    static contextType?: Context<any>;
    static getDerivedStateFromError?(error: Error): Partial<any>;
    static getDerivedStateFromProps?(props: Readonly<any>, state: Readonly<any>): Partial<any> | null;
  }

  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;

  export interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
  }

  export interface ForwardRefRenderFunction<T, P = {}> {
    (props: PropsWithChildren<P>, ref: ForwardedRef<T>): ReactElement | null;
    displayName?: string | undefined;
    defaultProps?: never | undefined;
    propTypes?: never | undefined;
  }

  export const useState: <T>(initialState: T | (() => T)) => [T, (newState: T | ((prevState: T) => T)) => void];
  export const useEffect: (effect: () => void | (() => void), deps?: ReadonlyArray<any>) => void;
  export const useCallback: <T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>) => T;
  export const createContext: <T>(defaultValue: T) => Context<T>;
  export const useContext: <T>(context: Context<T>) => T;
} 