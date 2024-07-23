const chai = require('chai');
const expect = chai.expect;
const  { menu, Inventory, Pizza, Order, Topping, Side } = require('../menu');


describe('Pizza Class', function() {
    it('create a pizza', function() {
        const pizza = new Pizza('Deluxe Veggie', { Regular: 150, Medium: 200, Large: 325 }, ['New hand tossed'], true);
        expect(pizza.name).to.equal('Deluxe Veggie');
        expect(pizza.sizes).to.have.property('Regular');
        expect(pizza.crusts).to.include('New hand tossed');
        expect(pizza.is_veg).to.be.true;
    });

    it('add topping to pizza', function() {
        const pizza = new Pizza('Deluxe Veggie', { Regular: 150, Medium: 200, Large: 325 }, ['New hand tossed'], true);
        const topping = new Topping('Capsicum', 25, true);
        pizza.add_topping(topping);
        expect(pizza.toppings).to.include(topping);
    });

    it('check for topping combination', function() {
        const pizza = new Pizza('Deluxe Veggie', { Regular: 150, Medium: 200, Large: 325 }, ['New hand tossed'], true);
        const topping = new Topping('Chicken Tikka', 35, false);
        expect(() => pizza.add_topping(topping)).to.throw(Error, 'Wrong toppings combination');
    });

    it('set size and crust', function() {
        const pizza = new Pizza('Deluxe Veggie', { Regular: 150, Medium: 200, Large: 325 }, ['New hand tossed'], true);
        pizza.set_size('Medium');
        pizza.set_crust('New hand tossed');
        expect(pizza.selected_size).to.equal('Medium');
        expect(pizza.selected_crust).to.equal('New hand tossed');
    });
});

describe('Order Class', function() {
    it('add a pizza to the order', function() {
        const order = new Order();
        const pizza = new Pizza('Deluxe Veggie', { Regular: 150, Medium: 200, Large: 325 }, ['New hand tossed'], true);
        order.add_pizza(pizza);
        expect(order.pizzas).to.include(pizza);
    });

    it('calculate total amount', function() {
        const order = new Order();
        const pizza = new Pizza('Deluxe Veggie', { Regular: 150, Medium: 200, Large: 325 }, ['New hand tossed'], true);
        pizza.set_size('Medium');
        order.add_pizza(pizza);
        order.calculate_total();
        expect(order.total_amount).to.equal(200);
    });

    it('add a side to the order', function() {
        const order = new Order();
        const side = new Side('Cold drink', 55);
        order.add_side(side);
        expect(order.sides).to.include(side);
    });

    it('calculate total with sides', function() {
        const order = new Order();
        const pizza = new Pizza('Deluxe Veggie', { Regular: 150, Medium: 200, Large: 325 }, ['New hand tossed'], true);
        pizza.set_size('Medium');
        order.add_pizza(pizza);
        const side = new Side('Cold drink', 55);
        order.add_side(side);
        order.calculate_total();
        expect(order.total_amount).to.equal(255);
    });

    it('throw an error if size not set for pizza', function() {
        const order = new Order();
        const pizza = new Pizza('Deluxe Veggie', { Regular: 150, Medium: 200, Large: 325 }, ['New hand tossed'], true);
        order.add_pizza(pizza);
        expect(() => order.calculate_total()).to.throw(Error, 'Size not set for pizza Deluxe Veggie');
    });
});

describe('Inventory Class', function() {
    let inventory;

    beforeEach(function() {
        inventory = new Inventory();
    });

    it('should add items correctly', function() {
        inventory.add_item('cheese', 10);
        expect(inventory.items).to.have.property('cheese', 10);

        inventory.add_item('cheese', 5);
        expect(inventory.items).to.have.property('cheese', 15);
    });

    it('should update item price correctly', function() {
        inventory.add_item('paneer', 10);
        inventory.update_price('paneer', 1.5);
        expect(inventory.items['paneer']).to.have.property('price', 1.5);
    });

    it('should check item availability correctly', function() {
        inventory.add_item('tomato', 20);
        expect(inventory.check_availability('tomato', 15)).to.be.true;
        expect(inventory.check_availability('tomato', 25)).to.be.false;
        expect(inventory.check_availability('paneer', 1)).to.be.false;
    });

    it('should use items correctly', function() {
        inventory.add_item('grilled chicken', 30);
        inventory.use_item('grilled chicken', 10);
        expect(inventory.items['grilled chicken']).to.equal(20);

        inventory.use_item('grilled chicken', 20);
        expect(inventory.items['grilled chicken']).to.equal(0);
    });

    it('should not use more items than available', function() {
        inventory.add_item('Mango', 10);
        inventory.use_item('Mango', 15);
        expect(inventory.items['Mango']).to.equal(10); // Should not go negative
    });
});
describe('Menu', function() {
    it('have pizzas, toppings, and sides', function() {
        expect(menu.pizzas).to.be.an('array');
        expect(menu.toppings).to.be.an('array');
        expect(menu.sides).to.be.an('array');
    });

    it('have veg and non-veg pizzas', function() {
        const vegPizzas = menu.pizzas.filter(pizza => pizza.is_veg);
        const nonVegPizzas = menu.pizzas.filter(pizza => !pizza.is_veg);
        expect(vegPizzas.length).to.be.greaterThan(0);
        expect(nonVegPizzas.length).to.be.greaterThan(0);
    });
});