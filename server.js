const express = require('express');
const app = express();
app.use(express.json());

const port = 3000;
const { menu, Pizza, Order } = require('./models/menu');
const menuController = require('./controllers/menuController');

app.get('/menu', menuController.getMenu);

app.post('/order', (req, res) => {
    const { pizzas, sides } = req.body;
    const order = new Order();

    pizzas.forEach(p => {
        const pizza = new Pizza(p.name, p.sizes, p.crusts, p.is_veg);
        pizza.set_size(p.selected_size);
        pizza.set_crust(p.selected_crust);

        if (!menuController.checkAvailability(pizza.selected_size, 1)) {
            return res.status(400).json({ error: `Insufficient inventory for pizza ${p.name}` });
        }

        p.toppings.forEach(t => {
            const topping = menu.toppings.find(topping => topping.name === t.name);
            if (topping) {
                if (!menuController.checkAvailability(t.name, 1)) {
                    return res.status(400).json({ error: `Insufficient inventory for topping ${t.name}` });
                }
                pizza.add_topping(topping);
                menuController.useItem(t.name, 1);
            }
        });

        order.add_pizza(pizza);
        menuController.useItem(p.selected_crust, 1);
    });

    sides.forEach(s => {
        const side = menu.sides.find(side => side.name === s.name);
        if (side) {
            if (!menuController.checkAvailability(s.name, 1)) {
                return res.status(400).json({ error: `Insufficient inventory for side ${s.name}` });
            }
            order.add_side(side);
            menuController.useItem(s.name, 1);
        }
    });

    order.calculate_total();
    res.json({ TotalAmount: `Rs. ${order.total_amount}` });
});

app.post('/inventory', (req, res) => {
    const { name, quantity, price } = req.body;
    menuController.addItem(name, quantity, price);
    res.json({ message: 'Inventory updated' });
});

app.listen(port, () => {
    console.log(`PizzaFactory app listening at http://localhost:${port}`);
});