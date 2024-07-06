class Pizza {
    constructor(name, sizes, crusts, is_veg) {
        this.name = name;
        this.sizes = sizes;
        this.crusts = crusts;
        this.is_veg = is_veg;
        this.toppings = [];
        this.selected_size = null;
        this.selected_crust = null;
    }
    add_topping(topping) {
        this.toppings.push(topping);
    }
    set_size(size) {
        if (this.sizes[size] !== undefined) {
            this.selected_size = size;
        } else {
            throw new Error(`Size ${size} is not available for ${this.name}`);
        }
    }

    set_crust(crust) {
        if (this.crusts.includes(crust)) {
            this.selected_crust = crust;
        } else {
            throw new Error(`Crust ${crust} is not available for ${this.name}`);
        }
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