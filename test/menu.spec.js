const chai = require('chai');
const expect = chai.expect;

const { menu, Inventory, Pizza, Order, Topping, Side } = require('./path_to_your_module');

describe('Pizza', function () {
    let pizza, topping1, topping2;

    beforeEach(function () {
        pizza = new Pizza('Deluxe Veggie', { Regular: 150, Medium: 200, Large: 325 }, 
                           ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'], 
                           true);
        topping1 = new Topping('Black olive', 20, true);
        topping2 = new Topping('Chicken Tikka', 35, false);
    });

    it('should set size and calculate price correctly', function () {
        pizza.setSize('Medium');
        pizza.addTopping(topping1);
        pizza.addTopping(topping2); // Should throw error as topping is not allowed
        expect(pizza.calculatePrice()).to.equal(200 + 20); // 200 (size) + 20 (topping)
    });

    it('should throw error for wrong topping combination', function () {
        pizza.setSize('Medium');
        expect(() => pizza.addTopping(topping2)).to.throw('Wrong toppings combination');
    });

    it('should throw error for unset size', function () {
        expect(() => pizza.calculatePrice()).to.throw('Size not set for pizza Deluxe Veggie');
    });
});

describe('Inventory', function () {
    let inventory;

    beforeEach(function () {
        inventory = new Inventory();
        inventory.addItem('Regular', 10);
        inventory.addItem('Medium', 10);
        inventory.addItem('Large', 10);
    });

    it('should add and check availability of items', function () {
        expect(inventory.checkAvailability('Regular', 5)).to.be.true;
        expect(inventory.checkAvailability('Regular', 15)).to.be.false;
    });

    it('should update item quantity correctly', function () {
        inventory.useItem('Regular', 5);
        expect(inventory.checkAvailability('Regular', 5)).to.be.true;
        expect(inventory.checkAvailability('Regular', 6)).to.be.false;
    });

    it('should throw error if using more items than available', function () {
        expect(() => inventory.useItem('Regular', 15)).to.throw('Insufficient quantity of Regular');
    });
});

describe('Order', function () {
    let order, pizza, side;

    beforeEach(function () {
        order = new Order();
        pizza = new Pizza('Deluxe Veggie', { Regular: 150, Medium: 200, Large: 325 }, 
                           ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'], 
                           true);
        side = new Side('Cold drink', 55);
        pizza.setSize('Medium');
    });

    it('should add pizzas and sides and calculate total correctly', function () {
        order.addPizza(pizza);
        order.addSide(side);
        pizza.addTopping(new Topping('Black olive', 20, true));
        expect(order.calculateTotal()).to.equal(200 + 20 + 55); // Pizza + Topping + Side
    });
});