class Subject<T> implements Observable<T> {
  private observers$ = new Set();

  subscribe(callback: (s: T) => void) {
    this.observers$.add(callback);

    return {
      unsubscribe: () => this.observers$.delete(callback),
    };
  }

  next(args: T) {
    this.observers$.forEach(callback => typeof callback === 'function' && callback(args));
  }
}

export default Subject;
