# IT Project - Dental Practice Management Software

![VScode](https://img.shields.io/badge/VScode-v1.96.2-blue?style=for-the-badge&logo=visual-studio-code&logoColor=white&labelColor=000000)
![Node.js](https://img.shields.io/badge/Node.js-v20.18.1-green?style=for-the-badge&logo=node.js&logoColor=white&labelColor=000000)
![MySQL](https://img.shields.io/badge/MySQL-v8.0.40-yellow?style=for-the-badge&logo=MySQL&logoColor=white&labelColor=000000)
![Laravel](https://img.shields.io/badge/Laravel-v11.36.1-red?style=for-the-badge&logo=Laravel&logoColor=white&labelColor=000000)
![Composer](https://img.shields.io/badge/Composer-v2.7.4-brown?style=for-the-badge&logo=Composer&logoColor=white&labelColor=000000)
![PHP](https://img.shields.io/badge/PHP-v8.2.12-lightblue?style=for-the-badge&logo=PHP&logoColor=white&labelColor=000000)
![Stripe](https://img.shields.io/badge/Stripe-v11-purple?style=for-the-badge&logo=Stripe&logoColor=white&labelColor=000000)
![Twillio](https://img.shields.io/badge/Twillio-v5.4.0-darkred?style=for-the-badge&logo=Twillio&logoColor=white&labelColor=000000)
![AWS](https://img.shields.io/badge/AWS-v2-orange?style=for-the-badge&logo=AWS&logoColor=white&labelColor=000000)

## Table of Contents

1. [Overview](#overview)
2. [Team Members](#team-members)
3. [Project Overview](#project-overview)
4. [Problem Statement](#problem-statement)
5. [Solution Overview](#solution-overview)
6. [Key Objectives & Goals](#key-objectives--goals)
7. [Technology Stack](#technology-stack)
8. [Installation Process](#installation-process)
9. [Usage](#usage)

---

## Overview

Our project is a software application designed to streamline the management of first-time appointments and administrative tasks in dental practices. It provides an intuitive experience for both patients and staff, improving efficiency and satisfaction.

---

## Team Members

- **Xander Wauters**: Product Owner, Scrum Master, Frontend Developer  
  *Focused on team coordination and delivering seamless user interfaces.*
- **Jorn De Smet**: UX Designer, Backend Developer  
  *Passionate about creating intuitive user experiences and building reliable systems.*
- **Lars Paridaens**: UX Designer, Database Developer, Backend Developer  
  *Skilled in crafting user-centric designs and ensuring robust data structures.*
- **Lucas Moons**: Security Manager, Database Developer  
  *Dedicated to safeguarding systems and optimizing database efficiency.*
- **Matteo Sprimont**: Head of Planning, Full Stack Developer  
  *Excels at developing scalable solutions across the tech stack.*

---

## Project Overview

This software application targets dental practices to simplify appointment scheduling and management. Key functionalities include waitlist management, automated reminders, a Q&A feature, and fine tracking.

### Target Audience

- **Dental Practices**: Seeking to streamline new patient appointment management.
- **Patients**: Needing an easy and intuitive way to book their first appointment.

---

## Problem Statement

Dental practices often struggle with:

- **Missed appointments**: Leading to wasted time and revenue loss.
- **Outdated systems**: Making scheduling complex and unintuitive.
- **Inefficient communication**: Requiring excessive staff intervention.
- **No proper fine or payment tracking**: Complicating financial management.

---

## Solution Overview

Our software focuses on simplifying first-time appointment scheduling for dental practices. 

### Key Features

- **Waitlist Management**: Automatically notify patients when slots become available.
- **Reminders System**: Automated alerts for upcoming appointments.
- **Q&A Feature**: Chatbot or FAQ for patient inquiries.
- **Fine Management**: Track and process no-show fines with Stripe integration.
- **Database Management**: Securely store patient data.
- **Website Redesign**: Modernized design for better usability using React.js.

---

## Key Objectives & Goals

1. Enhance the usability of the practice’s website.
2. Enable users to join a waitlist and receive timely notifications.
3. Provide admin tools for managing users, issuing fines, and monitoring operations.

---

## Technology Stack

- **Frontend**: React.js
- **Backend**: Laravel, PHP
- **Database**: MySQL
- **Payment Integration**: Stripe
- **Development Tools**: Visual Studio Code, AWS, Figma, Trello, Canvas

---

## Installation Process

1. Clone the repository:
   ```bash
   git clone https://github.com/XanderWTRS/IT-Project.git
   ```

2. Install dependencies:
   ```bash
   composer install
   npm install && npm run dev
   ```
3. Install additional PHP libraries for functionality:
   ```bash
   composer require stripe/stripe-php twilio/sdk
   ```

4. Set up `.env` file:
   ```bash
   cp .env.example .env
   ```

5. Generate the application key:
   ```bash
   php artisan key:generate
   ```

6. Link storage:
   ```bash
   php artisan storage:link
   ```

7. Configure database and email service in `.env`:

   - Create a MySQL database locally (e.g., `dental_management`).
   - Update `.env` with your database and email service details.

---

## Usage

1. Run migrations and seed the database:
   ```bash
   php artisan migrate --seed
   ```

2. Start the development server:
   ```bash
   php artisan serve
   ```

3. Access the application in your browser:
   [http://127.0.0.1:8000](http://127.0.0.1:8000)

### Admin Access

- **Email**: `admin@ehb.be`
- **Password**: `Password!321`

### Public Access

Users can register or log in to access profile and appointment features.

---
## Environment Configuration

The `.env` file is crucial for the configuration of the application. Below are the essential keys required:

1. **Stripe Keys**:
   - `STRIPE_KEY`: Public key for Stripe integration.
   - `STRIPE_SECRET`: Secret key for processing payments.

2. **Twilio Keys** (for notifications and communication):
   - `TWILIO_SID`: Twilio Account SID.
   - `TWILIO_AUTH_TOKEN`: Twilio Auth Token.
   - `TWILIO_PHONE_NUMBER`: Twilio Phone Number for sending messages.

3. **Database Configuration**:
   - `DB_CONNECTION`: Set to `mysql`.
   - `DB_HOST`: Hostname of your database server (e.g., `127.0.0.1`).
   - `DB_PORT`: Database port (default is `3306`).
   - `DB_DATABASE`: Name of the database (e.g., `dental_management`).
   - `DB_USERNAME`: Username for the database.
   - `DB_PASSWORD`: Password for the database.

4. **Email Service**:
   - `MAIL_MAILER`: Set to your mail service (e.g., `smtp`).
   - `MAIL_HOST`: Host of your mail server.
   - `MAIL_PORT`: Port for mail server.
   - `MAIL_USERNAME`: Email service username.
   - `MAIL_PASSWORD`: Email service password.
   - `MAIL_ENCRYPTION`: Encryption type (e.g., `tls`).
   - `MAIL_FROM_ADDRESS`: Sender email address.
   - `MAIL_FROM_NAME`: Sender name.

Ensure these keys are correctly set to avoid issues during runtime.

---

## Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Composer Documentation](https://getcomposer.org/doc/)
- [Node.js and NPM](https://nodejs.org/)
- [MySQL Guide](https://dev.mysql.com/doc/)
- [Stripe Documentation](https://stripe.com/docs)

---

## License

This project is licensed under the MIT License.
