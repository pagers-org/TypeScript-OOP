export interface DisPatch {
  type: string;
  payload?: unknown;
}

interface PublishPayload<T> {
  type: string;
  payload: unknown;
  store: T;
}

function createStore<T, P extends DisPatch>(
  name: string,
  callback: (store: T, action: P) => T,
  targetElement?: HTMLElement,
) {
  let currentStore: T;
  const reducer = callback;
  const dispatchEventName = `${name}-dispatch`;
  const listenerElement = targetElement || window;

  listenerElement.addEventListener(dispatchEventName, (e: CustomEventInit<P>) => {
    currentStore = reducer(currentStore, e.detail!);

    const publish = new CustomEvent<PublishPayload<T>>(name, {
      detail: {
        type: e.detail!.type,
        payload: e.detail!.payload,
        store: currentStore,
      },
    });
    dispatchEvent(publish);
  });

  function dispatch({ type, payload }: P) {
    const dispatch = new CustomEvent(dispatchEventName, {
      detail: {
        type,
        payload,
      },
    });
    dispatchEvent(dispatch);
  }

  const getStore = () => {
    return currentStore;
  };

  // init!
  // @ts-ignore
  dispatch({ type: 'init', action: { type: '' } });

  return {
    dispatch,
    getStore,
  };
}

export default createStore;
