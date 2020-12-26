type Listener = () => void;

export class UpdateSubscriber {
  protected listeners: Listener[] = [];

  public getSubscribe() {
    const subscribe = (listener: Listener) => {
      this.listeners.push(listener);
      const unsubscribe = () => {
        const index = this.listeners.indexOf(listener);
        this.listeners.splice(index, 1);
      };
      return unsubscribe;
    };
    return subscribe;
  }

  public getTrigger() {
    const trigger = () => {
      this.listeners.forEach((listener) => listener());
    };
    return trigger;
  }
}
