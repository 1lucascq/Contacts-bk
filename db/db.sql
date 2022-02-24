DROP DATABASE IF EXISTS Phone_Book;
CREATE DATABASE Phone_Book;

CREATE TABLE Phone_Book.contacts(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) engine = InnoDB;

INSERT INTO Phone_Book.contacts (`name`, `email`, `image`)
VALUES
  ('Bruce Wayne', 'brucin.1990@batmail.com', 'img1'),
	('Selina Kyle', 'selinahtinha@catmail.com', 'img2'),
	('Diana Prince', 'dianinha3000a.c.@wondermail.com', 'img3'),
  ('Peter Parker', 'pparker2000@spidermail.com', 'img4'),
	('Tony Stark', 'mr.stark@ironmail.com', 'img5'),
	('T\'Chala', 'wakandaforever@pantermail.com', 'img6')
  ;
  
CREATE TABLE Phone_Book.phone_numbers(
    `id` INT NOT NULL AUTO_INCREMENT,
    `contact_id` INT NOT NULL,
    `phone` BIGINT NOT NULL,
		PRIMARY KEY (id),
		FOREIGN KEY (contact_id) REFERENCES Phone_Book.contacts (id)
) engine = InnoDB;

INSERT INTO Phone_Book.phone_numbers (`contact_id`, `phone`)
VALUES
  (1, '38999999999'),
  (2, '38999999999'),
  (3, '38999999999'),
  (4, '38999999999'),
  (5, '38999999999'),
  (5, '38999999999'),
  (5, '38999999999'),
  (6, '38999999999'),
  (6, '38999999999')
  ;
