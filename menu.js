class Pizza {
    constructor(name, sizes, crusts, is_veg, s, c) {
        this.name = name;
        this.sizes = sizes;
        this.crusts = crusts;
        this.is_veg = is_veg;
        this.toppings = [];
        this.selected_size = s;
        this.selected_crust = c;
    }
    add_topping(topping) {
        if(this.is_veg && topping.is_veg){
            this.toppings.push(topping);
        }
        else if(!this.is_veg && topping.name != 'Paneer' && this.toppings.length == 0){
            this.toppings.push(topping);
        }
        else{
            throw new Error("Wrong toppings combination");
        }
    }
    set_size(size) {
        this.selected_size = size;
    }

    set_crust(crust) {
        this.selected_crust = crust;
    }
}

class Topping {
    constructor(name, price, is_veg) {
        this.name = name;
        this.price = price;
        this.is_veg = is_veg;
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
        this.total_amount = 0;
        this.sides = [];
    }
    add_pizza(pizza) {
        this.pizzas.push(pizza);
    }
    add_side(side) {
        this.sides.push(side);
    }
    calculate_total() {
        let Amount = 0;
        for (let i = 0; i < this.pizzas.length; i++) {
            const pizza = this.pizzas[i];
            if (!pizza.selected_size) {
                throw new Error(`Size not set for pizza ${pizza.name}`);
            }
            let pizza_total = pizza.sizes[pizza.selected_size];
            for (let j = 0; j < pizza.toppings.length; j++) {
                const topping = pizza.toppings[j];
                pizza_total += topping.price;
            }
            Amount += pizza_total;
        }
        for (let i = 0; i < this.sides.length; i++) {
            const side = this.sides[i];
            Amount += side.price;
        }
        this.total_amount = Amount;
    }
}

class Inventory {
    constructor() {
        this.items = {};
    }

    add_item(name, quantity) {
        if (this.items[name]) {
            this.items[name] += quantity;
        } else {
            this.items[name] = quantity;
        }
    }

    check_availability(name, quantity) {
        return this.items[name] && this.items[name] >= quantity;
    }

    use_item(name, quantity) {
        if (this.checkAvailability(name, quantity)) {
            this.items[name] -= quantity;
        } else {
            throw new Error(`Insufficient inventory for ${name}`);
        }
    }
}

const menu = {
    pizzas: [
        {
            name: 'Deluxe Veggie',
            sizes: { Regular: 150, Medium: 200, Large: 325 },
            crusts: ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'],
            is_veg: true
        },
        {
            name: 'Cheese and Corn',
            sizes: { Regular: 175, Medium: 375, Large: 475 },
            crusts: ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'],
            is_veg: true
        },
        {
            name: 'Paneer Tikka',
            sizes: { Regular: 160, Medium: 290, Large: 340 },
            crusts: ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'],
            is_veg: true
        },
        {
            name: 'Non-Veg Supreme',
            sizes: { Regular: 190, Medium: 325, Large: 425 },
            crusts: ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'],
            is_veg: false
        },
        {
            name: 'Chicken Tikka',
            sizes: { Regular: 210, Medium: 370, Large: 500 },
            crusts: ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'],
            is_veg: false
        },
        {
            name: 'Pepper Barbecue Chicken',
            sizes: { Regular: 220, Medium: 380, Large: 525 },
            crusts: ['New hand tossed', 'Wheat thin crust', 'Cheese Burst', 'Fresh pan pizza'],
            is_veg: false
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
module.exports = { menu, inventory, Pizza, Order, Topping, Side };