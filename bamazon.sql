CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(
item_id INT(15) NOT NULL AUTO_INCREMENT,
-- item_id (unique id for each product)
product_name VARCHAR(300) NOT NULL, -- (Name of product)
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL, -- (cost to customer)
stock_quantity INT(100) NOT NULL, -- (how much of the product is available in stores)
PRIMARY KEY (item_id)
); 

INSERT INTO products VALUES(1,'Fender Squier Classic Vibe 50s Stratocaster','Guitars',349.99,43),(2,'Fender American Original 60s Stratocaster','Guitars',1949.95,15),(3,'Gibson SG Standard Bass','Bass Guitars',1499.00,21),(4,'Fodera Monarch Standard Classic','Bass Guitars',4850.00,2),(5,'DW Performance Series 5-Piece Shell Pack','Drum Sets',2479.95,4),(6,'Pearl Roadshow 5-piece Complete Drum Set with Cymbals','Drum Sets',499.00,10),(7,'Shure Beta 58A Supercardioid Dynamic Vocal Microphone','Microphones',159.00,24),(8,'Neumann TLM 67','Microphones',2399.99,2),(9,'Apogee Symphony i/o MkII','Studio Recording Equipment',5495.00,3),(10,'Universal Audio Apollo Twin X DUO','Studio Recording Equipment',899.00,5);
SELECT * from products