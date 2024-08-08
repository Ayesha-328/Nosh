const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db'); // DB connection
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'secret';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS options
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
};

app.use(cors(corsOptions));

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
// ROUTINGS 
// CLIENT 
// 1. GET all menu categories
app.get('/api/menucategory', async (req, res) => {
  try {
    const categories = await pool.query("SELECT * FROM menucategory");
    res.json(categories.rows);
  } catch (err) {
    console.error('Error fetching menu categories:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. GET all menu items
app.get('/api/menuitems', async (req, res) => {
  try {
    const menuItems = await pool.query("SELECT * FROM menuitems");
    res.json(menuItems.rows);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// 3. GET a specific menu item by ID
app.get('/api/menuitems/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await pool.query("SELECT * FROM menuitems WHERE menuitemid = $1", [id]);
    if (menuItem.rows.length === 0) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem.rows[0]);
  } catch (err) {
    console.error('Error fetching menu item by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
})
// 4. POST cartItem
app.post('/api/cart/add', async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;

    // Fetch the price of the menu item
    const menuItemResult = await pool.query('SELECT price FROM menuitems WHERE menuitemid = $1', [menuItemId]);

    if (menuItemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    const itemPrice = menuItemResult.rows[0].price;
    const itemTotalPrice = itemPrice * quantity;

    // Check if there is an existing cart
    let cartResult = await pool.query('SELECT cartid, totalprice FROM cart ORDER BY cartid DESC LIMIT 1');
    let cartId;
    let updatedTotalPrice;

    if (cartResult.rows.length === 0 || cartResult.rows[0].totalprice === null) {
      // If no cart exists, create a new cart
      const newCartResult = await pool.query(
        'INSERT INTO cart (totalprice) VALUES ($1) RETURNING cartid',
        [itemTotalPrice]
      );
      cartId = newCartResult.rows[0].cartid;
      updatedTotalPrice = itemTotalPrice;
    } else {
      // If a cart exists, update the total price
      cartId = cartResult.rows[0].cartid;
      updatedTotalPrice = cartResult.rows[0].totalprice + itemTotalPrice;
      await pool.query('UPDATE cart SET totalprice = $1 WHERE cartid = $2', [updatedTotalPrice, cartId]);
    }

    // Insert the item into cartItems
    const insertCartItemQuery = `
      INSERT INTO cartitems (cartid, menuitemid, quantity)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const insertCartItemValues = [cartId, menuItemId, quantity];
    const { rows: insertedCartItem } = await pool.query(insertCartItemQuery, insertCartItemValues);

    res.status(201).json({ 
      cartItem: insertedCartItem[0],
      updatedTotalPrice
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// 5. GET recent cart item
app.get('/api/cart/recent', async (req, res) => {
  try {
    const cartItems = await pool.query(`
      SELECT ci.*, 
             m.itemname, 
             m.itemimage, 
             m.price
      FROM cartitems ci
      JOIN menuitems m ON ci.menuitemid = m.menuitemid
      WHERE ci.cartid = (SELECT MAX(cartid) FROM cart)
      ORDER BY ci.cartitemid DESC;
    `);

    if (cartItems.rows.length === 0) {
      return res.status(404).json({ message: 'No items found in the cart' });
    }

    const cartItemsWithDetails = cartItems.rows.map(row => ({
      cartitemid: row.cartitemid,
      cartid: row.cartid,
      menuitemid: row.menuitemid,
      quantity: row.quantity,
      item: {
        itemname: row.itemname,
        itemimage: row.itemimage,
        price: row.price
      }
    }));

    res.json(cartItemsWithDetails);
  } catch (err) {
    console.error('Error fetching items from cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 6. DELETE a specific cart item
app.delete('/api/cart/remove-item/:menuitemid', async (req, res) => {
  const { menuitemid } = req.params;

  try {
      const deleteItemQuery = 'DELETE FROM cartItems WHERE menuitemid = $1';
      await pool.query(deleteItemQuery, [menuitemid]);

      res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// 7. POST customer data
app.post('/api/customer', async (req, res) => {
  try {
    const { name, phone, email, city, area, house, street, landmark } = req.body;

    const insertCustomerQuery = `
      INSERT INTO customer (custname, phonenumber, email, city, area, houseno, street, nearestlandmark)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING custid
    `;
    const insertCustomerValues = [name, phone, email, city, area, house, street, landmark];
    const { rows: insertedCustomer } = await pool.query(insertCustomerQuery, insertCustomerValues);

    res.status(201).json(insertedCustomer[0]);
  } catch (error) {
    console.error('Error adding customer data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 8. POST order
app.post('/api/order', async (req, res) => {
  try {
    const { custId, totalPrice, specialInstructions } = req.body;

    if (!custId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    const insertOrderQuery = `
      INSERT INTO orders (custid, totalprice, orderdate, specialinstruction)
      VALUES ($1, $2, NOW(), $3)
      RETURNING orderid
    `;
    const insertOrderValues = [custId, totalPrice, specialInstructions];
    const { rows: insertedOrder } = await pool.query(insertOrderQuery, insertOrderValues);

    res.status(201).json(insertedOrder[0]);
  } catch (error) {
    console.error('Error adding order data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 9. POST order items
app.post('/api/orderitems', async (req, res) => {
  try {
    const { orderId, cartItems } = req.body;

    if (!orderId || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Order ID and cart items are required' });
    }

    const insertOrderItemQuery = `
      INSERT INTO orderitems (orderid, menuitemid, quantity, unitprice)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (orderid, menuitemid)
      DO UPDATE SET
        quantity = EXCLUDED.quantity,
        unitprice = EXCLUDED.unitprice
      RETURNING *
    `;

    const insertedOrderItems = [];

    for (const item of cartItems) {
      const { menuitemid, quantity, unitprice } = item;
      try {
        const { rows } = await pool.query(insertOrderItemQuery, [orderId, menuitemid, quantity, unitprice]);
        insertedOrderItems.push(rows[0]);
      } catch (error) {
        console.error('Error adding order item:', item, error);
        return res.status(500).json({ error: 'Internal server error while adding order item', details: error.message });
      }
    }

    res.status(201).json(insertedOrderItems);
  } catch (error) {
    console.error('Error adding order items:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// 10. GET order details by recent orderId
app.get('/api/order/recent', async (req, res) => {
  try {
    const recentOrder = await pool.query(`
      SELECT o.orderid, 
       c.custname AS customername, 
       c.houseno, c.street, c.area, c.city, c.phonenumber, ARRAY_AGG(json_build_object('menuitemid', oi.menuitemid, 
         'itemName', m.itemname, 'itemImage', m.itemimage, 'quantity', oi.quantity )) AS items,
       o.totalprice
      FROM orders o
      JOIN orderitems oi ON o.orderid = oi.orderid
      JOIN menuitems m ON oi.menuitemid = m.menuitemid
      JOIN customer c ON o.custid = c.custid
      GROUP BY o.orderid, c.custname, c.houseno, c.street, c.area, c.city, c.phonenumber, o.totalprice
      ORDER BY o.orderid DESC
      LIMIT 1
    `);

    if (recentOrder.rows.length === 0) {
      return res.status(404).json({ message: 'No recent orders found' });
    }

    const order = recentOrder.rows[0]; // Change this line to access the first item in the array
    console.log('Recent order:', order);
    res.json({
      orderId: order.orderid,
      customerName: order.customername,
      houseno: order.houseno,
      street: order.street,
      area: order.area,
      city: order.city,
      phonenumber: order.phonenumber,
      items: order.items,
      totalPrice: order.totalprice
    });
  } catch (err) {
    console.error('Error fetching recent order:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// 11. GET order details by orderId
app.get('/api/order/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderQuery = `
      SELECT o.orderid, 
             c.custname AS customername, 
             c.houseno, c.street, c.area, c.city, c.phonenumber, 
             o.orderstatus AS orderStatus,
             ARRAY_AGG(json_build_object('menuitemid', oi.menuitemid, 
             'itemName', m.itemname, 'itemImage', m.itemimage, 'quantity', oi.quantity )) AS items,
             o.totalprice
      FROM orders o
      JOIN orderitems oi ON o.orderid = oi.orderid
      JOIN menuitems m ON oi.menuitemid = m.menuitemid
      JOIN customer c ON o.custid = c.custid
      WHERE o.orderid = $1
      GROUP BY o.orderid, c.custname, c.houseno, c.street, c.area, c.city, c.phonenumber, o.totalprice, o.orderstatus
    `;
    
    const { rows } = await pool.query(orderQuery, [orderId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = rows[0];
    res.json({
      orderId: order.orderid,
      customerName: order.customername,
      houseno: order.houseno,
      street: order.street,
      area: order.area,
      city: order.city,
      phonenumber: order.phonenumber,
      items: order.items,
      totalPrice: order.totalprice,
      orderStatus: order.orderstatus
    });
  } catch (err) {
    console.error('Error fetching order details:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ADMIN
// Routes

app.get('/test-auth', authenticateToken, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});

// Protected Routes
// 12. create a menuItem
app.post("/add", authenticateToken, async (req, res) => {
  try {
    const { itemName, itemDescription, itemImageUrl, price, category } = req.body;

    // Find the category ID based on the category name
    const categoryResult = await pool.query(
      "SELECT catId FROM menuCategory WHERE catName = $1",
      [category]
    );

    if (categoryResult.rows.length === 0) {
      return res.status(400).json({ error: "Category not found" });
    }

    const catId = categoryResult.rows[0].catid;

    // Find the maximum menuItemId and add 1
    const idResult = await pool.query("SELECT COALESCE(MAX(menuItemId), 0) + 1 AS newId FROM menuItems");
    const newId = idResult.rows[0].newid;

    const newItem = await pool.query(
      "INSERT INTO menuItems (menuItemId, itemName, itemDescriptiion, itemImage, price, catId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [newId, itemName, itemDescription, itemImageUrl, price, catId]
    );

    res.json(newItem.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// 13. get all menuItems

app.get("/list", authenticateToken, async (req, res) => {
  try {
      const allItems = await pool.query("SELECT * FROM menuItems ORDER BY menuItemId");
      res.json(allItems.rows);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
  }
});

//14. get a menuItem

app.get("/list/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const menuItem = await pool.query("SELECT m.menuItemId, m.itemName, m.itemDescriptiion, m.price,  m.itemImage, c.catName  FROM menuItems m JOIN menuCategory c ON m.catId = c.catId WHERE m.menuItemId = $1", [id]);
      res.json(menuItem.rows[0]);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
  }
});

//15. update a menuItem
app.put("/list/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl, price, catName } = req.body;

    // Find the categoryId based on the catName
    const categoryResult = await pool.query(
      "SELECT catId FROM menuCategory WHERE catName = $1",
      [catName]
    );

    if (categoryResult.rows.length === 0) {
      return res.status(400).json({ error: "Category not found" });
    }

    const catId = categoryResult.rows[0].catid;

    // Update the menu item
    const updateMenuItem = await pool.query(
      "UPDATE menuItems SET itemName=$1, itemDescriptiion=$2, itemImage=$3, price=$4, catId=$5 WHERE menuItemId=$6",
      [name, description, imageUrl, price, catId, id]
    );

    res.json("Item was updated!");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// 16. delete a menuItem
app.delete("/list/:id", authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;
      await pool.query("DELETE FROM menuItems WHERE menuItemId = $1", [id]);
      res.json("Item was deleted");
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Server error" });
  }
});

// 17. List all orders in admin panel
app.get("/orders", authenticateToken, async (req, res) => {
  try {
    const ordersResult = await pool.query(`
      SELECT 
   o.orderId,
   o.orderStatus,
   o.orderDate,
   o.totalPrice,
   o.specialInstruction,
   c.custName,
   c.houseNo,
   c.street,
   c.area,
   c.city,
   c.phoneNumber,
   json_agg(json_build_object(
     'menuItemId', oi.menuItemId,
     'quantity', oi.quantity,
     'unitPrice', oi.unitPrice,
     'itemName', mi.itemName)) as items
 FROM orders o
 LEFT JOIN orderItems oi ON o.orderId = oi.orderId
 LEFT JOIN menuItems mi ON oi.menuItemId = mi.menuItemId
 LEFT JOIN customer c ON o.custId = c.custId
 GROUP BY o.orderId, c.custName, c.houseNo, c.street, c.area, c.city, c.phoneNumber
 ORDER BY o.orderId DESC
`);

 res.json(ordersResult.rows);
} catch (err) {
 console.error(err.message);
}
});

// 18. Update order status
app.put("/orders/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    // Debugging logs
    console.log("Order ID:", id);
    console.log("Order Status:", orderStatus);

    // Validate inputs
    if (!id || !orderStatus) {
      return res.status(400).json({ error: "Order ID and Order Status are required" });
    }

    await pool.query("UPDATE orders SET orderStatus = $1 WHERE orderId = $2", [orderStatus, id]);
    res.json("Order status is updated!");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});


// 19. Register an admin
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

// 20.login admin

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

// 21. Get the categories data
app.get("/categories", async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT 
              c.catId, 
              c.catName, 
              c.catimg, 
              COUNT(m.menuItemId) AS itemCount
          FROM 
              menuCategory c
          LEFT JOIN 
              menuItems m 
          ON 
              c.catId = m.catId 
          GROUP BY 
              c.catId;
      `);

      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
  }
});

// 22. Get order statistics
app.get("/order-stats", async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT
              SUM(totalPrice) AS totalSales,
              COUNT(orderId) AS totalOrders,
              COUNT(CASE WHEN orderStatus = 'Processing' THEN 1 END) AS processingOrders,
              COUNT(CASE WHEN orderStatus = 'Out for delivery' THEN 1 END) AS outForDeliveryOrders,
              COUNT(CASE WHEN orderStatus = 'Delivered' THEN 1 END) AS completedOrders
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
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
