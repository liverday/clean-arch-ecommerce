import Handler from "@application/usecases/handlers/Handler";
import DomainEvent from "@domain/event/DomainEvent";
import Mediator from "./Mediator";

type HandlersByEvent = {
  [key: string]: Handler[];
}

export default class InMemoryMediatorAdapter implements Mediator {
  private handlersByEvent: HandlersByEvent = {};
  
  async register(eventName: string, handler: Handler): Promise<void> {
    if (!this.handlersByEvent[eventName]) {
      this.handlersByEvent[eventName] = [];
    }

    this.handlersByEvent[eventName].push(handler);
  }

  async publish(event: DomainEvent): Promise<void> {
    const handlers = this.handlersByEvent[event.name] ?? [];

    for (const handler of handlers) {
      handler.handle(event);
    }
  }
}