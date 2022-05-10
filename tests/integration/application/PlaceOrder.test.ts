import Dimension from "@domain/entity/Dimension";
import Item from "@domain/entity/Item";
import InMemoryItemRepository from "@infra/repositories/memory/InMemoryItemRepository";
import InMemoryOrderRepository from "@infra/repositories/memory/InMemoryOrderRepository";
import PlaceOrder from "@application/PlaceOrder";
import InMemoryCouponRepository from "@infra/repositories/memory/InMemoryCouponRepository";
import Coupon from "@domain/entity/Coupon";

test("Should place an Order", async () => {
	const itemRepository = new InMemoryItemRepository();
	itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3));
	itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20));
	itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
	const orderRepository = new InMemoryOrderRepository();
	const couponRepository = new InMemoryCouponRepository();
	const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
	const input = {
		cpf: "935.411.347-80",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		],
		date: new Date('2022-05-09T12:00:00.000')
	};
	const output = await placeOrder.execute(input);
	expect(output.total).toBe(6350);
});

test('should reject an order that item was not found', async () => {
	const orderRepository = new InMemoryOrderRepository();
	const itemRepository = new InMemoryItemRepository();
	const couponRepository = new InMemoryCouponRepository();
	itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3));
	itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20));
	itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
	const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
	const input = {
		cpf: "935.411.347-80",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 5, quantity: 1 }
		],
		date: new Date('2022-05-09T12:00:00.000')
	};

	await expect(placeOrder.execute(input)).rejects.toThrow(new Error('Item not found'))
})

test('should place an order with valid coupon', async () => {
	const orderRepository = new InMemoryOrderRepository();
	const itemRepository = new InMemoryItemRepository();
	const couponRepository = new InMemoryCouponRepository();
	itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3));
	itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20));
	itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
	couponRepository.save(new Coupon('VALE20', 20, new Date('2022-05-10T12:00:00.000')))
	const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
	const input = {
		cpf: "935.411.347-80",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 1 }
		],
		coupon: 'VALE20',
		date: new Date('2022-05-09T12:00:00.000')
	};
	const { total } = await placeOrder.execute(input);
	expect(total).toBe(5064);
})


