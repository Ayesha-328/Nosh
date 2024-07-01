const express = require("express");
const app= express();
const cors=require("cors");
const pool= require("./db")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'secret';

// middleware
app.use(cors());
app.use(express.json()); //req.body

// MiddleWare function to authenticate for protected routes
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

// Routes

app.get('/test-auth', authenticateToken, (req, res) => {
    res.json({ message: 'Token is valid', user: req.user });
  });

// Protected Routes
// create a menuItem
app.post("/add", authenticateToken, async (req, res) => {
    try {
        const { itemName, itemDescription, itemImageUrl, price, category } = req.body;
        const newItem = await pool.query("INSERT INTO menuItem(itemName, itemDescription, itemImageUrl, price, category) VALUES($1, $2, $3, $4, $5) RETURNING *", [itemName, itemDescription, itemImageUrl, price, category]);

        res.json(newItem.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// get all menuItems

app.get("/list", authenticateToken, async (req, res) => {
    try {
        const allItems = await pool.query("SELECT * FROM menuItem ORDER BY menuItemId");
        res.json(allItems.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// get a menuItem

app.get("/list/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const menuItem = await pool.query("SELECT * FROM menuItem WHERE menuItemId = $1", [id]);
        res.json(menuItem.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// update a menuItem
app.put("/list/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, itemDescription, itemImageUrl, price, category } = req.body;
        await pool.query("UPDATE menuItem SET itemName = $1, itemDescription = $2, itemImageUrl = $3, price = $4, category = $5 WHERE menuItemId = $6", [itemName, itemDescription, itemImageUrl, price, category, id]);
        res.json("Item was updated!");
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// delete a menuItem
app.delete("/list/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM menuItem WHERE menuItemId = $1", [id]);
        res.json("Item was deleted");
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Place an order
app.post("/order", authenticateToken, async (req, res) => {
    try {
        const { custId, oDate, totalPrice, oStatus, pId, items } = req.body;

        const orderResult = await pool.query("INSERT INTO orders (custId, oDate, totalPrice, oStatus, pId) VALUES ($1, $2, $3, $4, $5) RETURNING orderId", [custId, oDate, totalPrice, oStatus, pId]);
        const orderId = orderResult.rows[0].orderid;

        const orderItemsData = items.map(item => [orderId, item.menuItemId, item.quantity, item.specialInst, item.unitPrice]);

        const insertOrderItemsQuery = "INSERT INTO orderItems (orderId, menuItemId, quantity, specialInst, unitPrice) VALUES ($1, $2, $3, $4, $5)";
        for (const orderItem of orderItemsData) {
            await pool.query(insertOrderItemsQuery, orderItem);
        }

        res.json({ orderId, message: "Order placed successfully!" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
})

// List all orders in admin panel
app.get("/orders", authenticateToken, async (req, res) => {
    try {
        const ordersResult = await pool.query(`
            SELECT 
                o.orderId,
                o.custId,
                o.oDate,
                o.totalPrice,
                o.oStatus,
                o.pId,
                json_agg(json_build_object(
                    'menuItemId', oi.menuItemId,
                    'quantity', oi.quantity,
                    'specialInst', oi.specialInst,
                    'unitPrice', oi.unitPrice,
                    'itemName', mi.itemName
                )) as items
            FROM orders o
            LEFT JOIN orderItems oi ON o.orderId = oi.orderId
            LEFT JOIN menuItem mi ON oi.menuItemId = mi.menuItemId
            GROUP BY o.orderId
            ORDER BY o.orderId;
        `);

        res.json(ordersResult.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Update order status
app.put("/orders/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { ostatus } = req.body;
        await pool.query("UPDATE orders SET oStatus = $1 WHERE orderId = $2", [ostatus, id]);
        res.json("Order status is updated!");
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Register an admin
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        const registeredEmail = await pool.query("SELECT * FROM admin WHERE email = $1", [email]);
        if (registeredEmail.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new admin with hashed password
        const newAdmin = await pool.query("INSERT INTO admin(name, email, password) VALUES($1, $2, $3) RETURNING *", [name, email, hashedPassword]);
        res.json(newAdmin.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// login admin

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email exists
        const user = await pool.query("SELECT * FROM admin WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ error: "Email not registered" });
        }

        // Check if the password matches
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        // Create a JWT token
        const token = jwt.sign({ adminId: user.rows[0].adminid }, SECRET_KEY, { expiresIn: '1h' });

        // Successful login
        res.json({ 
            message: "Login successful", 
            token,
            user: {
                id: user.rows[0].adminid,
                name: user.rows[0].name,
                email: user.rows[0].email
            } 
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Get the categories data
app.get("/categories", async (req, res) => {
    //*****Make the catName catId if the foreign key is catId */
    try {
        const result = await pool.query(`
            SELECT 
                c.catId, 
                c.catName, 
                c.catImageUrl, 
                COUNT(m.menuItemId) AS itemCount
            FROM 
                category c
            LEFT JOIN 
                menuItem m 
            ON 
                c.catName = m.category 
            GROUP BY 
                c.catId;
        `);

        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Get order statistics
app.get("/order-stats", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                SUM(totalPrice) AS totalSales,
                COUNT(orderId) AS totalOrders,
                COUNT(CASE WHEN oStatus = 'Processing' THEN 1 END) AS processingOrders,
                COUNT(CASE WHEN oStatus = 'Out for delivery' THEN 1 END) AS outForDeliveryOrders,
                COUNT(CASE WHEN oStatus = 'Delivered' THEN 1 END) AS completedOrders
            FROM 
                orders;
        `);

        const stats = result.rows[0];
        res.json({
            totalSales: parseFloat(stats.totalsales) || 0, // Handle null values
            totalOrders: parseInt(stats.totalorders, 10) || 0,
            processingOrders: parseInt(stats.processingorders, 10) || 0,
            outForDeliveryOrders: parseInt(stats.outfordeliveryorders, 10) || 0,
            completedOrders: parseInt(stats.completedorders, 10) || 0
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});





app.listen(5000, ()=> {
    console.log("Server has started on port 5000 ")
})