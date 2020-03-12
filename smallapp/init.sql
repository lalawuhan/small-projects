CREATE TABLE books (
  ID SERIAL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL
);

INSERT INTO books (author, title)
VALUES  ('Tsitsi Dangarembga', 'Nervous Conditions');
VALUES  ('Angela Makholwa', 'The Blessed Girl');
VALUES  ('Thirteen Months of Sunrise', 'Rania Mamoun');
VALUES  ('Transparent City', 'Ondjaki');

