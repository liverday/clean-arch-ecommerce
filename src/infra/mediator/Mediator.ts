import Handler from "@application/usecases/handlers/Handler";
import DomainEvent from "@domain/event/DomainEvent";

export default interface Mediator {
  register(eventName: string, handler: Handler): Promise<void>;
  publish(event: DomainEvent): Promise<void>;
}