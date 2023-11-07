/* eslint-disable @typescript-eslint/no-explicit-any */
export class SynchronizedAction<T> {
  constructor(private readonly callback: () => Promise<T>) {}

  private action = async (): Promise<T> => {
    const result = await this.callback();
    this.updateClosure();
    return result;
  };

  private actionPromise: Promise<T> | null = null;

  private closure = () => {
    let executed = false;
    return () => {
      if (!executed) executed = true;
      else return this.actionPromise;
      this.actionPromise = this.action();
      return this.actionPromise;
    };
  };

  actionSync = this.closure();

  private updateClosure = () => (this.actionSync = this.closure());
}
