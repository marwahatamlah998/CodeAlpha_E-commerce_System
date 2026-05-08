import { pool } from "./db.js";
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import "dotenv/config";

const server = express();
server.use(cors());
server.use(express.json());

//console.log("Server ready");
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};


// Add roles
server.post("/api/roles", async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO roles (name) VALUES ($1) RETURNING *",
      [name.toLocaleLowerCase()],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Users
server.post("/api/users", async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    country,
    phoneNo,
    email,
    password,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (firstName , lastName, age, country, phoneNo ,email , password , role_id) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8) RETURNING *",
      [
        firstName.toLocaleLowerCase(),
        lastName.toLocaleLowerCase(),
        age,
        country.toLocaleLowerCase(),
        phoneNo,
        email.toLocaleLowerCase(),
       await hashPassword(password),
        1,
      ],
    );
 const user = result.rows[0];
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role_id },
    process.env.NEXTAUTH_SECRET ,
    {
      expiresIn: "1h",
    }
  );

   return res.json({
      user,
      token,
    });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Products
server.post("/api/products", async (req, res) => {
  const {
    productName,
    image,
    discount,
    price,
    quantity,
    brand,
    rate,
    category,
    des_product,
    user_id,
    is_deleted,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO products (productName ,image, discount , price , quantity,  brand , rate , category, des_product , user_id , is_deleted) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10 , $11) RETURNING *",
      [
        productName.toLocaleLowerCase(),
        image,
        discount,
        price,
        quantity,
        brand.toLocaleLowerCase(),
        rate,
        category.toLocaleLowerCase(),
        des_product.toLocaleLowerCase(),
        user_id,
        is_deleted,
      ],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single Product
server.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM products WHERE id=$1", [id]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a best-sellers those have rate more than 6
server.get("/api/best-sellers/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE rate > 6 ORDER BY rate DESC LIMIT 5",
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single best-sellers product those have rate more than 6
server.get("/api/best-sellers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id=$1 AND rate > 6",
      [id],
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Products
server.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add cart
server.post("/api/carts", async (req, res) => {
  const { user_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO carts (user_id  , is_deleted) VALUES ($1 , $2 ) RETURNING *",
      [user_id, false],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// // get a carts
// server.get("/api/carts", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM carts ");

//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Add cart_items
server.post("/api/cartItems/", async (req, res) => {
  const { product_id, user_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO cart_items (product_id, user_id )
       VALUES ($1, $2) RETURNING *;`,
      [product_id, user_id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add single a cart
server.get("/api/cartItems/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM cart_items WHERE user_id =$1",
      [id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get carts for user
server.get("/api/carts/:id", async (req, res) => {
    const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT ci.id , p.productName , p.price, p.image ,p.quantity, u.firstName FROM cart_items ci JOIN products p ON ci.product_id =p.id JOIN users u ON u.id = ci.user_id WHERE u.id = $1",[id],
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.delete("/api/cartItems/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM cart_items WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json({ message: "Deleted successfully", item: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Orders
server.post("/api/orders/", async (req, res) => {
  const { user_id, is_deleted } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO orders ( user_id , is_deleted) VALUES ($1 , $2) RETURNING *",
      [user_id, is_deleted],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add ordersItems
server.post("/api/ordersItems/", async (req, res) => {
  const { order_id, product_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO order_items (order_id , product_id) VALUES ($1 , $2) RETURNING *",
      [order_id, product_id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get orders
server.get("/api/your-orders/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT o.id ,p.productName , p.price , u.firstName FROM order_items oi JOIN products p ON oi.product_id =p.id JOIN orders o ON o.id = oi.order_id JOIN users u ON u.id=o.user_id ",
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add payment
server.post("/api/payment/", async (req, res) => {
  const { paymentMethod, user_id, order_id, total } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO payments (paymentMethod, user_id, order_id,total) VALUES ($1 , $2 , $3 , $4 ) RETURNING *",
      [paymentMethod.toLocaleLowerCase(), user_id, order_id, total],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add payment
server.post("/api/billing_address/", async (req, res) => {
  const { address1, address2, city, state, zip } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO payments (paymentMethod, user_id, order_id,total) VALUES ($1 , $2 , $3 , $4 ) RETURNING *",
      [paymentMethod.toLocaleLowerCase(), user_id, order_id, total],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add images company
server.post("/api/imagesCompany", async (req, res) => {
  const { productName, image } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO imagesCompany (productName , image) VALUES ($1 , $2 ) RETURNING *",
      [productName.toLocaleLowerCase(), image],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get images company
server.get("/api/imagesCompany", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT productName , image FROM imagesCompany ",
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



server.get("/api/login", async (req, res) => {
  const { email , password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email.toLowerCase()]
    );
    console.log(result.rows[0])

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        roleId: user.role_id,
      },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: "1d" }
    );
    return res.json({
      user,
      token,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});



server.listen(5001, () => {
  console.log("Server is running");
});