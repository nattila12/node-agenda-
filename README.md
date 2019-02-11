# Agenda App


A simple app using node & express for managing phone books

## Content 
- CRUD operation 
   - **C**reate new contact 
   - **R**ead contacts from [contacts.json](public/contacts.json)
   file
   - **U**pdate contacts
   - **D**elete contact 
- Search contacts(TODO)

## Setup

```
git clone git@github.com:nattila12/node-agenda-.git
cd node-agenda
npm install
```
## Running app
```
npm run devstart
```

open http://localhost:3000/


## installing and running mariaDb from mac
1. install homebrew:
   ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

2. install mariaDb:
   brew install mariadb

3. start mariaDb server:  
   mysql.server start

4. login: 
   mysql -u root -p

5. run only once: 
   CREATE DATABASE phone_book;
   USE phone_book;
   CREATE TABLE contacts (id INT AUTO_INCREMENT, firstName TEXT, lastName TEXT, phone TEXT, PRIMARY KEY(id));
   SHOW TABLES;

   INSERT INTO contacts (firstName,lastName,phone) VALUES("andrei","vasile","123");
