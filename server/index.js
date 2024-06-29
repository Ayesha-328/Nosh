const express = require("express");
const app= express();
const cors=require("cors");
const pool= require("./db")

// middleware
app.use(cors());
app.use(express.json()); //req.body

// Routes

// create a menuItem

app.post("/add", async(req,res)=>{
    try {
       const {itemName,itemDescription,itemImageUrl,price,category}= req.body;
       const newItem = await pool.query("INSERT INTO menuItem(itemName,itemDescription,itemImageUrl,price,category) VALUES($1,$2,$3,$4,$5) RETURNING *", [itemName,itemDescription,itemImageUrl,price,category]
       );

       res.json(newItem.rows[0])
        
    } catch (error) {
        console.error(err.message)
    }
})

// get all menuItems

app.get("/list", async(req,res)=>{
try {
    const allItems = await pool.query("SELECT * FROM menuItem ORDER BY menuItemId")
    res.json(allItems.rows);
} catch (error) {
    console.error(err.message)
    
}
})

// get a menuItem

app.get("/list/:id", async (req,res) => {
    try {
     const {id}= req.params;
     const menuItem= await pool.query("SELECT * FROM menuItem WHERE menuItemId=$1",[id]);
     res.json(menuItem.rows[0])  
    } catch (error) {
        console.error(err.message)
        
    }
})

// update a menuItem
app.put("/list/:id", async (req,res)=>{
    try {
        const {id}= req.params;
        const {itemName,itemDescription,itemImageUrl,price,category} = req.body;
        const updateMenuItem = await pool.query("UPDATE menuItem SET itemName=$1, itemDescription=$2, itemImageUrl=$3, price=$4, category=$5 WHERE menuItemId=$6", [itemName,itemDescription,itemImageUrl,price,category, id]);
        res.json("item was updated!")
    } catch (error) {
        console.error(err.message)
        
    }
})

// delete a menuItem
app.delete("/list/:id", async(req,res)=>{
    try {
        const {id}= req.params;
        const deleteItem = await pool.query("DELETE FROM menuItem WHERE menuItemId=$1" , [id])

        res.json("item was deleted")
    } catch (error) {
        console.error(err.message)
    }
})

// Place an order
app.post("/order",async(req,res)=>{
    try {
        const { custId, oDate, totalPrice, oStatus, pId, items } = req.body;
    // Insert into orders table
    const orderResult = await pool.query(
        "INSERT INTO orders (custId, oDate, totalPrice, oStatus, pId) VALUES ($1, $2, $3, $4, $5) RETURNING orderId",
        [custId, oDate, totalPrice, oStatus, pId]
    );
    const orderId = orderResult.rows[0].orderid;

    // Prepare data for orderItems
    const orderItemsData = items.map(item => [
        orderId,
        item.menuItemId,
        item.quantity,
        item.specialInst,
        item.unitPrice
    ]);

    // Insert into orderItems table
    const insertOrderItemsQuery =
        "INSERT INTO orderItems (orderId, menuItemId, quantity, specialInst, unitPrice) VALUES ($1, $2, $3, $4, $5)";
    for (const orderItem of orderItemsData) {
        await pool.query(insertOrderItemsQuery, orderItem);
    }
    res.json({ orderId, message: "Order placed successfully!" });
    } catch (error) {
        console.error(err.message)
    }
    
})

// List all orders in admin panel
app.get("/orders", async (req, res) => {
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
    }
});

// Update order status
app.put("/orders/:id", async (req,res)=>{
    try {
        const {id}= req.params;
        const {ostatus} = req.body;
        const updateMenuItem = await pool.query("UPDATE orders SET oStatus=$1 WHERE orderId=$2", [ostatus, id]);
        res.json("order status is updated!")
    } catch (error) {
        console.error(error.message)
        
    }
})


app.listen(5000, ()=> {
    console.log("Server has started on port 5000 ")
})