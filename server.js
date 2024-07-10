const express = require('express');
const app = express();
app.use(express.json());

const port = 3000;
const { menu, inventory, Pizza, Order, Topping, Side } = require('./menu');

app.get('/menu', (req, res) => {
    res.json(menu);
});

app.post('/order', (req, res) => {
    const { pizzas, sides } = req.body;
    const order = new Order();

    pizzas.forEach(p => {
        const pizza = new Pizza(p.name, p.sizes, p.crusts, p.is_veg);
        pizza.set_size(p.selected_size);
        pizza.set_crust(p.selected_crust);

        if (!inventory.check_availability(pizza.selected_size, 1)) {
            throw new Error(`Insufficient inventory for pizza ${p.name}`);
        }

        p.toppings.forEach(t => {
            const topping = menu.toppings.find(topping => topping.name === t.name);
            if (topping) {
                if (!inventory.check_availability(t.name, 1)) {
                    throw new Error(`Insufficient inventory for topping ${t.name}`);
                }
                pizza.add_topping(topping);
                inventory.use_item(p.selected_size,1);
            }
        });

        order.add_pizza(pizza);
        inventory.use_item(p.selected_crust,1);
    });

    sides.forEach(s => {
        const side = menu.sides.find(side => side.name === s.name);
        if (side) {
            if (!inventory.check_availability(s.name, 1)) {
                throw new Error(`Insufficient inventory for side ${s.name}`);
            }
            order.add_side(side);
            inventory.use_item(s.name,1);
        }
    });

    order.calculate_total();
    res.json({ TotalAmount: `Rs. ${order.total_amount}` });
});

app.post('/inventory', (req, res) => {
    const { name, quantity } = req.body;
    inventory.add_item(name, quantity);
    inventory.update_price(name, price);
    res.json({ message: 'Inventory updated' });
});

app.listen(port, () => {
    console.log(`PizzaFactory app listening at http://localhost:${port}`);
});