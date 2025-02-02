/* Replace with your SQL commands */
CREATE TYPE user_role AS ENUM ('customer', 'provider', 'admin');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50)  NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, 
    role user_role NOT NULL DEFAULT 'customer',
    phone_number VARCHAR(20), 
    access_token VARCHAR(255) DEFAULT '',
    salt VARCHAR(255) DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

INSERT INTO users (firstname, lastname, email, password_hash, salt, role, phone_number)
VALUES ('Quan',
        'Nguyen',
        'user1@gmail.com',
        'WoCvTiAVHGnjQFzOTmKGt6F1uMVPPRGfelt4LmdKYvQ=',
        'NvxPruJLPCaLrKPJ+QC2k8o9YViq23RII9UhBeJX43leeLofjK6Z7kxfuoArlutAiEoiwZqoXT4r5r0+Fr+J5g==',
        'customer', 
        '0123456789');