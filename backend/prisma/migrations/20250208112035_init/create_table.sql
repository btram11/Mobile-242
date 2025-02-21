------------------ Create tables ---------------------
CREATE TABLE DATABASE_BOOK (
    book_id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publisher VARCHAR(255),
    publishing_year INT,
    summary TEXT,
    price DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE LISTED_BOOK (
    listing_id UUID,  --partial key
    book_id UUID,
    condition VARCHAR(255),
    is_sold BOOLEAN,
    sold_price DECIMAL(10, 2),
    is_leased BOOLEAN,
    leased_price DECIMAL(10, 2),
    PRIMARY KEY(book_id, listing_id),
    FOREIGN KEY (book_id) REFERENCES DATABASE_BOOK(book_id)
);

CREATE TABLE "user" (
    user_id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hased VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    faculty VARCHAR(255),
    phone_number VARCHAR(20), 
    access_token VARCHAR(255) DEFAULT '',
    salt VARCHAR(255) DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE PROVIDER (
    provider_id UUID PRIMARY KEY,
    average_rating DECIMAL(3, 2),
    preferred_location VARCHAR(255),
    policy VARCHAR(4095),
    FOREIGN KEY (provider_id) REFERENCES "user"(user_id)
);

CREATE TABLE IS_SOLD (
    book_id UUID,
    listing_id UUID,
    provider_id UUID,
    PRIMARY KEY (book_id, listing_id, provider_id),
    FOREIGN KEY (book_id, listing_id) REFERENCES LISTED_BOOK(book_id, listing_id),
    FOREIGN KEY (provider_id) REFERENCES PROVIDER(provider_id)
);

CREATE TABLE IS_LEASED (
    book_id UUID,
    listing_id UUID,
    provider_id UUID,
    rented_period INT,  -- in days
    PRIMARY KEY (book_id, listing_id, provider_id),
    FOREIGN KEY (book_id, listing_id) REFERENCES LISTED_BOOK(book_id, listing_id),
    FOREIGN KEY (provider_id) REFERENCES PROVIDER(provider_id)
);

CREATE TABLE IS_BOUGHT (
    book_id UUID,
    listing_id UUID,
    user_id UUID,
    location VARCHAR(255),
    pickup_date DATE,
    modifiable BOOLEAN,
    PRIMARY KEY (book_id, listing_id, user_id),
    FOREIGN KEY (book_id, listing_id) REFERENCES LISTED_BOOK(book_id, listing_id),
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

CREATE TABLE IS_RENTED (
    book_id UUID,
    listing_id UUID,
    user_id UUID,
    location VARCHAR(255),
    pickup_date DATE,
    modifiable BOOLEAN,
    end_date DATE,
    policy TEXT,
    PRIMARY KEY (book_id, listing_id, user_id),
    FOREIGN KEY (book_id, listing_id) REFERENCES LISTED_BOOK(book_id, listing_id),
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

------------------ Insert data ---------------------
-- Insert data into DATABASE_BOOK
INSERT INTO DATABASE_BOOK (book_id, title, author, publisher, publishing_year, summary, price) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'The Great Gatsby', 'F. Scott Fitzgerald', 'Charles Scribner''s Sons', 1925, 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.', 20.50),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '1984', 'George Orwell', 'Secker & Warburg', 1949, 'A dystopian novel set in Airstrip One, formerly Great Britain, a province of the superstate Oceania.', 30.50);

-- Insert data into LISTED_BOOK
INSERT INTO LISTED_BOOK (listing_id, book_id, condition, is_sold, sold_price, is_leased, leased_price) VALUES
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Good', TRUE, 15.99, FALSE, NULL),
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Excellent', FALSE, NULL, TRUE, 20.50);

-- Insert data into USER
INSERT INTO "user" (user_id, username, password_hased, email, faculty, phone_number, access_token, salt) VALUES
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'john_doe', 'hashed_password_123', 'john.doe@example.com', 'Computer Science', '123-456-7890', 'token123', 'salt123'),
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'jane_smith', 'hashed_password_456', 'jane.smith@example.com', 'Literature', '987-654-3210', 'token456', 'salt456');

-- Insert data into PROVIDER
INSERT INTO PROVIDER (provider_id, average_rating, preferred_location, policy) VALUES
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 4.5, 'New York', 'No late returns'),
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 4.7, 'London', 'Flexible return policy');

-- Insert data into IS_SOLD
INSERT INTO IS_SOLD (book_id, listing_id, provider_id) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15'),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16');

-- Insert data into IS_LEASED
INSERT INTO IS_LEASED (book_id, listing_id, provider_id, rented_period) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 30),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 60);

-- Insert data into IS_BOUGHT
INSERT INTO IS_BOUGHT (book_id, listing_id, user_id, location, pickup_date, modifiable) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'New York', '2023-10-01', TRUE),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'London', '2023-10-05', FALSE);

-- Insert data into IS_RENTED
INSERT INTO IS_RENTED (book_id, listing_id, user_id, location, pickup_date, modifiable, end_date, policy) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'New York', '2023-10-01', TRUE, '2023-11-01', 'No late returns'),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'London', '2023-10-05', FALSE, '2023-12-05', 'Flexible return policy');