const { menu, Inventory } = require('../models/menu');
const inventory = new Inventory();

exports.getMenu = (req, res) => {
    try {
        res.json(menu);
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({ error: 'Failed to retrieve menu' });
    }
};
exports.createMenu = (req, res) => {
    const { pizzas, sides, toppings } = req.body;

    try {
        if (!Array.isArray(pizzas) || !Array.isArray(sides) || !Array.isArray(toppings)) {
            return res.status(400).json({ error: 'Invalid menu data' });
        }

        menu.pizzas = pizzas.map(p => new Pizza(p.name, p.sizes, p.crusts, p.is_veg));
        menu.sides = sides.map(s => new Side(s.name, s.price));
        menu.toppings = toppings.map(t => new Topping(t.name, t.price, t.is_veg));

        inventory.items = {};
        pizzas.forEach(pizza => {
            inventory.add_item(pizza.name, pizza.initial_stock || 0);
        });
        sides.forEach(side => {
            inventory.add_item(side.name, side.initial_stock || 0);
        });
        toppings.forEach(topping => {
            inventory.add_item(topping.name, topping.initial_stock || 0);
        });

        res.json({ message: 'Menu created/updated successfully' });
    } catch (error) {
        console.error('Error creating/updating menu:', error);
        res.status(500).json({ error: 'Failed to create/update menu' });
    }
};

exports.checkAvailability = (name, quantity) => {
    return inventory.check_availability(name, quantity);
};


exports.useItem = (name, quantity) => {
    inventory.use_item(name, quantity);
};

exports.addItem = (name, quantity, price) => {
    inventory.add_item(name, quantity);
    inventory.update_price(name, price);
};