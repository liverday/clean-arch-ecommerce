import Handler from "@application/usecases/handlers/Handler";
import DomainEvent from "@domain/event/DomainEvent";
import InMemoryMediatorAdapter from "@infra/mediator/InMemoryMediatorAdapter";
import Mediator from "@infra/mediator/Mediator";

let mediator: Mediator
let dummyHandler: Handler

beforeEach(() => {
  mediator = new InMemoryMediatorAdapter();
	dummyHandler = new DummyHandler();
})

class DummyEvent implements DomainEvent {
  name = 'DummyEvent'  
}

class DummyHandler implements Handler {
	eventName: string = 'DummyEvent';
	
	async handle(event: DomainEvent): Promise<void> {
		console.log(`The event ${event.name} was fired and received`);
	}
}

test('should be able to register an event', async () => {
  const event = new DummyEvent();
  const spyRegister = jest.spyOn(mediator, 'register');
  await mediator.publish(event);
  expect(spyRegister).not.toBeCalled();
});

test('should fire a handler when is registered', async () => {
	const event = new DummyEvent();
	await mediator.register(event.name, dummyHandler);

	const spyOnHandle = jest.spyOn(dummyHandler, 'handle');
	await mediator.publish(event);
	expect(spyOnHandle).toBeCalledWith(event);
})