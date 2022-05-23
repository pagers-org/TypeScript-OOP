type StoreStatus = "action" | "mutation" | "resting";

export default class Store {
  private status: StoreStatus;
  private actions;
  private mutations;
  private state;

  constructor(params) {
    this.actions = params.actions || {};
    this.mutations = params.mutations || {};
    this.state = params.state || {};
    this.status = "resting";

    const self = this;

    self.state = new Proxy(this.state || {}, {
      set(state, key, value) {
        if (self.status !== "mutation") {
          return false;
        }

        state[key] = value;

        self.status = "resting";

        return true;
      },
    });
  }

  dispatch = (actionKey: string, payload: unknown) => {
    const self = this;

    if (typeof self.actions[actionKey] !== "function") {
      throw new Error(`${actionKey} doesn't exist`);
    }

    self.status = "action";

    return self.actions[actionKey](self, payload);
  };

  commit = (mutationKey: string, payload: unknown) => {
    const self = this;

    if (typeof self.mutations[mutationKey] !== "function") {
      throw new Error(`${mutationKey} doesn't exist`);
    }

    self.status = "mutation";

    const newState = self.mutations[mutationKey](self.state, payload);
    self.state = Object.assign(self.state, newState);
  };
}
