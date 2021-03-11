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

INSERT INTO customer (full_name, email, password)
VALUES('Admin User', 'admin@journaltogo.com', 'Admin1234!');

INSERT INTO journal (journal_entry, journal_entry_date, customer_id)
VALUES('Today I bought shoes', '2021-03-10', 1);