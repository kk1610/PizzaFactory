class Pizza {
    constructor(name, sizes, crusts, isVeg) {
        this.name = name;
        this.sizes = sizes;
        this.crusts = crusts;
        this.isVeg = isVeg;
        this.toppings = [];
        this.selectedSize = null;
        this.selectedCrust = null;
    }

    addTopping(topping) {
        if (this.isVeg && topping.isVeg) {
            this.toppings.push(topping);
        } else if (!this.isVeg && topping.name !== 'Paneer' && this.toppings.length === 0) {
            this.toppings.push(topping);
        } else {
            throw new Error("Wrong toppings combination");
        }
    }

    setSize(size) {
        if (!this.sizes[size]) {
            throw new Error(`Size ${size} not available for pizza ${this.name}`);
        }
        this.selectedSize = size;
    }

    setCrust(crust) {
        if (!this.crusts.includes(crust)) {
            throw new Error(`Crust ${crust} not available for pizza ${this.name}`);
        }
        this.selectedCrust = crust;
    }

    calculatePrice() {
        if (!this.selectedSize) {
            throw new Error(`Size not set for pizza ${this.name}`);
        }

        let pizzaTotal = this.sizes[this.selectedSize];
        for (let i = 0; i < this.toppings.length; i++) {
            const topping = this.toppings[i];
            if (this.selectedSize === "Large" && i < 2) {
                continue;
            }
            pizzaTotal += topping.price;
        }

        return pizzaTotal;
    }
}

class Topping {
    constructor(name, price, isVeg) {
        this.name = name;
        this.price = price;
        this.isVeg = isVeg;
    }
}

class Side {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class Order {
    constructor() {
        this.pizzas = [];
        this.sides = [];
    }

    addPizza(pizza) {
        this.pizzas.push(pizza);
    }

    addSide(side) {
        this.sides.push(side);
    }

    calculateTotal() {
        let amount = 0;

        for (const pizza of this.pizzas) {
            amount += pizza.calculatePrice();
        }

        for (const side of this.sides) {
            amount += side.price;
        }

        return amount;
    }
}

class Inventory {
    constructor() {
        this.items = {};
    }

    addItem(name, quantity) {
        if (this.items[name]) {
            this.items[name] += quantity;
        } else {
            this.items[name] = quantity;
        }
    }

    updatePrice(name, newPrice) {
        if (this.items[name]) {
            this.items[name].price = newPrice;
        }
    }

    checkAvailability(name, quantity) {
        return this.items[name] && this.items[name] >= quantity;
    }

    useItem(name, quantity) {
        if (this.items[name] >= quantity) {
            this.items[name] -= quantity;
        } else {
            throw new Error(`Insufficient quantity of ${name}`);
        }
    }
}

const menu = {
    pizzas: [
        {
            name: 'Deluxe Veggie',
            sizes: { Regular: 150, Medium: 200, Large: 325 },
            crusts: ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'],
            isVeg: true
        },
        {
            name: 'Cheese and Corn',
            sizes: { Regular: 175, Medium: 375, Large: 475 },
            crusts: ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'],
            isVeg: true
        },
        {
            name: 'Paneer Tikka',
            sizes: { Regular: 160, Medium: 290, Large: 340 },
            crusts: ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'],
            isVeg: true
        },
        {
            name: 'Non-Veg Supreme',
            sizes: { Regular: 190, Medium: 325, Large: 425 },
            crusts: ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'],
            isVeg: false
        },
        {
            name: 'Chicken Tikka',
            sizes: { Regular: 210, Medium: 370, Large: 500 },
            crusts: ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'],
            isVeg: false
        },
        {
            name: 'Pepper Barbecue Chicken',
            sizes: { Regular: 220, Medium: 380, Large: 525 },
            crusts: ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'],
            isVeg: false
        },
    ],
    toppings: [
        new Topping('Black olive', 20, true),
        new Topping('Capsicum', 25, true),
        new Topping('Paneer', 35, true),
        new Topping('Mushroom', 30, true),
        new Topping('Fresh Tomato', 10, true),
        new Topping('Chicken Tikka', 35, false),
        new Topping('Barbecue Chicken', 45, false),
        new Topping('Grilled Chicken', 40, false),
        new Topping('Extra Cheese', 35, false),
    ],
    sides: [
        new Side('Cold drink', 55),
        new Side('Mousse cake', 90)
    ]
};

const inventory = new Inventory();
inventory.addItem('Regular', 10);
inventory.addItem('Medium', 10);
inventory.addItem('Large', 10);
menu.toppings.forEach(topping => inventory.addItem(topping.name, 20));
menu.sides.forEach(side => inventory.addItem(side.name, 15));

module.exports = { menu, Inventory, Pizza, Order, Topping, Side };