// CREATE TABLE roles (
//   role_id  SERIAL NOT NULL ,
//   name VARCHAR(255) NOT NULL,
//   PRIMARY KEY(role_id)
//  UNIQUE (name)
// );

//https://i.pinimg.com/736x/51/e0/b4/51e0b47782b9876e56e8441cad79c0e7.jpg

// CREATE TABLE users (
//   id SERIAL NOT NULL,
//   firstName VARCHAR(255) NOT NULL,
//   lastName VARCHAR(255) NOT NULL,
//    age int ,
//    PRIMARY KEY(id),
//   country VARCHAR(255),
//   phoneNo int UNIQUE NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   email VARCHAR(255) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   role_id INT NOT NULL ,
//   FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE,
//   is_deleted BOOLEAN  DEFAULT FALSE,
// );
//productName , price , brand , rate , des_product , user_id , is_deleted

// CREATE TABLE products (
//   id SERIAL NOT NULL,
//   productName VARCHAR(255) NOT NULL,
// image VARCHAR(255) NOT NULL DEFAULT 'https://i.pinimg.com/736x/51/e0/b4/51e0b47782b9876e56e8441cad79c0e7.jpg',
//  discount DECIMAL(10, 2),
//    price DECIMAL(10, 2),
//  quantity INT DEFAULT 1,
//    PRIMARY KEY(id),
//   brand VARCHAR(255),
//   rate int  NOT NULL,
// category VARCHAR(255)  NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   des_product VARCHAR(255)  NOT NULL,
//     user_id INT NOT NULL ,
//   FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
//   is_deleted BOOLEAN  DEFAULT FALSE
// );

// NOT USED ////
// CREATE TABLE inventory (
//   id SERIAL NOT NULL,
//   quantity int NOT NULL,
//    PRIMARY KEY(id),
//   user_id INT NOT NULL ,
//   FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
// );

// CREATE TABLE carts (
//   id SERIAL NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     user_id INT NOT NULL ,
//   FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
//   PRIMARY KEY(id),
//   is_deleted BOOLEAN  DEFAULT FALSE
//  UNIQUE (user_id)
// );

// CREATE TABLE cart_items (
//   id SERIAL NOT NULL,
//   PRIMARY KEY(id),
// No_Cart INT DEFAULT 0,
//       product_id INT NOT NULL ,
//   FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
//     user_id INT NOT NULL ,
//   FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
// UNIQUE (product_id, user_id)
// );

// CREATE TABLE orders (
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   id SERIAL NOT NULL,
// user_id INT NOT NULL ,
//    PRIMARY KEY(id),
//   FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
//   is_deleted BOOLEAN  DEFAULT FALSE
// UNIQUE (user_id)
// );

// CREATE TABLE order_items (
//   id SERIAL PRIMARY KEY,
// order_id INT NOT NULL ,
//   FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
// product_id INT NOT NULL ,
//   FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
// UNIQUE (order_id , product_id)
// );

// CREATE TYPE payment_method AS ENUM (
//   'CARD',
//   'WALLET',
//   'COD'
// );

// CREATE TABLE payments (
//   id SERIAL NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// paymentMethod payment_method  NOT NULL DEFAULT 'CARD',
//  PRIMARY KEY(id),
// user_id INT NOT NULL ,
//   FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
// order_id INT NOT NULL ,
//   FOREIGN KEY (order_id) REFERENCES order_items (id) ON DELETE CASCADE,
// total DECIMAL(10, 2),
// UNIQUE (user_id, order_id)
// );

// CREATE TABLE imagesCompany(
//    id SERIAL NOT NULL,
//      PRIMARY KEY(id),
//   productName VARCHAR(255) NOT NULL,
// image VARCHAR(255) NOT NULL DEFAULT 'https://i.pinimg.com/736x/51/e0/b4/51e0b47782b9876e56e8441cad79c0e7.jpg'

// );
