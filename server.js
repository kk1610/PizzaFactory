// server.js
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

        p.toppings.forEach(t => {
            const topping = menu.toppings.find(topping => topping.name === t.name);
            if (topping) pizza.add_topping(topping);
        });

        order.add_pizza(pizza);
    });

    sides.forEach(s => {
        const side = menu.sides.find(side => side.name === s.name);
        if (side) order.add_side(side);
    });

    order.calculate_total();
    res.json({ total_amount: order.total_amount });
});

app.post('/inventory', (req, res) => {
    const { name, quantity } = req.body;
    inventory.add_item(name, quantity);
    res.json({ message: 'Inventory updated' });
});

app.listen(port, () => {
    console.log(`PizzaFactory app listening at http://localhost:${port}`);
});