Here is an example of how I created my website and explaining how I set up the application:

Harper E-learning Platform

Overview
Harper is an e-learning platform that allows users to register, log in, browse, and watch educational videos. The platform includes user authentication, video search, and tracking user search history.

Architecture
The application uses Node.js and Express, EJS for templating, and MySQL for the database. The front end is styled with CSS.

Advanced Techniques
Session Management and Authentication: Using express-session for session management and bcryptjs for password hashing.

Responsive Design: 
Using CSS media queries to ensure the website is responsive and adapts to different screen sizes.

Features
User Registration and Login
Video Browsing and Watching
Video Search
Contact Form
Search History


Data Model
The application uses the following database tables:
users: Stores user information.
contacts: Stores contact form submissions.
videos: Stores information about the educational videos.
Search history: Tracks the search queries made by users.
watched videos: Tracks which videos have been watched by which users.

Setup Instructions
Node.js 
ejs
express
MySQL

Step1:
I used npm installer to install the Dependencies.
Node.js, express, ejs and MySQL

How I Set Up the Database
Step 2:
I Open MySQL and create the database:
    CREATE DATABASE user_eLearning.

    USE user_eLearning.

Step3:
 Create the tables:
    
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first name VARCHAR(255) NOT NULL,
        last name VARCHAR(255) NOT NULL,
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

    CREATE TABLE videos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        url VARCHAR(255) NOT NULL,
        poster VARCHAR(255) NOT NULL
    );

    CREATE TABLE search_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        search query VARCHAR(255),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE watched videos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        video_id INT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (video_id) REFERENCES videos(id)
    );
    
Step4:
 I Insert videos title, description and poster data into the videos table:
    INSERT INTO videos (title, description, url, poster) VALUES
    ('THREE POWERFUL WEBSITES TO MAKE EASY MONEY', 'Learn about three powerful websites to make easy money.', '/video/THREE POWERFUL WEBSITES TO MAKE EASY MONEY.mp4', '/image/easy.jpg'),
    ('How To Install Wordpress Plugin Manually', 'Wordpress Plugins Install Tutorial 2021.', '/video/How To Install Wordpress Plugin Manually _ Wordpress Plugins Install Tutorial 2021.mp4', '/image/plug in.webp'),
    ('How to Make Money by Copying and Pasting on Google', 'Copy and Paste Earn Money Online.', '/video/How to Make Money by Copying and Pasting on Google _ Copy and Paste Earn Money Online.mp4', '/image/paste.webp');
    

Step5:
I Create a .env file in the root directory and add your database configuration:
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=my_password
    DB_NAME=user_elearning
   

Step6: 
I Run the Application
Node index.js

Step7:
My Application can be access on browser
http://localhost:8000.





