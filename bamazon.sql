DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,

  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Computer", "Electronics", 2000, 5),
		("Sunglasses", "Clothing", 200, 7),
		("Hoody", "Clothing", 60, 25),
		("Washer", "Appliances", 3000, 3),
		("Infinite", "Books", 14.99, 100),
		("Polo Shirt", "Clothing", 15, 50),
		("Shoe Dog", "Books", 2000, 50),
		("Laptop", "Electronics", 1500, 5),
		("Charger", "Electronics", 10, 5),
		("Camera", "Electronics", 200, 5);

SELECT * FROM products;
