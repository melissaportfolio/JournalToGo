CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    full_name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50)
);

CREATE TABLE journal (
    journal_id SERIAL PRIMARY KEY,
    journal_entry TEXT,
    journal_entry_date DATE,
    customer_id INT,
    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id)
            REFERENCES customer(customer_id)
);