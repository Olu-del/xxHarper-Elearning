
CREATE DATABASE user_elearning;

USE user_elearning;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    question TEXT NOT NULL
);


INSERT INTO videos (title, description, url, poster) VALUES
('THREE POWERFUL WEBSITES TO MAKE EASY MONEY', 'Learn about three powerful websites to make easy money.', '/video/THREE POWERFUL WEBSITES TO MAKE EASY MONEY.mp4', '/image/easy.jpg'),
('How To Install Wordpress Plugin Manually', 'Wordpress Plugins Install Tutorial 2021.', '/video/How To Install Wordpress Plugin Manually _ Wordpress Plugins Install Tutorial 2021.mp4', '/image/plug in.webp'),
('How to Make Money by Copying and Pasting on Google', 'Copy and Paste Earn Money Online.', '/video/How to Make Money by Copying and Pasting on Google _ Copy and Paste Earn Money Online.mp4', '/image/paste.webp');

INSERT INTO videos (title, description, url, poster) VALUES
('How To Add Widget On Wordpress in 2021', 'Widget Adding Process For Beginners.', '/video/How To Add Widget On Wordpress in 2021 __ Widget Adding Process For Beginners.mp4', '/image/widget.webp'),
('Fiverr Affiliate Program Tutorial for Beginners', 'Make Money with Fiverr Affiliates.', '/video/Fiverr Affiliate Program Tutorial for Beginners_ Make Money with Fiverr Affiliates.mp4', '/image/fiverr.webp'),
('How to Be Successful on Etsy', 'How to Start an Online T-Shirt Business in 2021 for Beginners.', '/video/How to Be Successful on Etsy _ How to Start an Online T-Shirt Business in 2021 for Beginners.mp4', '/image/tshirt.jpg');

INSERT INTO videos (title, description, url, poster) VALUES
('HOW TO MAKE MONEY ON FIVERR BY MAKING YOUTUBE THUMBNAILS', 'Learn how to make money on Fiverr by creating YouTube thumbnails.', '/video/HOW TO MAKE MONEY ON FIVERR BY MAKING YOUTUBE THUMBNAILS.mp4', '/image/thumbnail.jpg'),
('HOW TO MAKE MONEY ON UPWORK', 'Learn how to make money on Upwork.', '/video/HOW TO MAKE MONEY ON UPWORK.mp4', '/image/upwork.jpg'),
('HOW TO RE- UPLOAD YOUTUBE VIDEO', 'Learn how to re-upload YouTube videos.', '/video/HOW TO RE- UPLOAD YOUTUBE VIDEO.mp4', '/image/upload.webp');

INSERT INTO videos (title, description, url, poster) VALUES
('HOW TO SETUP YOAST SEO FOR BEGINNERS', 'Learn how to set up Yoast SEO for beginners.', '/video/HOW TO SETUP YOAST SEO FOR BEGINNERS.mp4', '/image/yoast seo.webp'),
('HOW TO SETUP RANK MATHS SEO TUTORIAL', 'Learn how to set up Rank Maths SEO.', '/video/HOW TO SETUP RANK MATHS SEO TUTORIAL.mp4', '/image/rank.webp'),
('HOW TO SETUP WORDFENCE SECURITY PLUGIN FOR FREE', 'Learn how to set up Wordfence Security Plugin for free.', '/video/HOW TO SETUP WORDFENCE SECURITY PLUGIN FOR FREE.mp4', '/image/wordfence.webp');

CREATE TABLE search_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    search_query VARCHAR(255),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE watched_videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    video_id INT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (video_id) REFERENCES videos(id)
);
CREATE DATABASE IF NOT EXISTS user_elearning;
USE user_elearning;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS search_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    search_query VARCHAR(255),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
SHOW TABLES;
CREATE TABLE IF NOT EXISTS search_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    search_query VARCHAR(255),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


select * from  search_history; 

select * from users;

CREATE USER 'harper_elearning_app'@'localhost' IDENTIFIED BY 'abquarmt'; 

GRANT ALL PRIVILEGES ON user_elearning.* TO 'harper_elearning_app'@'localhost';

CREATE TABLE IF NOT EXISTS videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url VARCHAR(255) NOT NULL
);
