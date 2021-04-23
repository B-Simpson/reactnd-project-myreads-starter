# MyReads Project

This is the working version of the Udacity's React Fundamentals course. This system allows users to filter thier book choices into one of the three categories Currently Reading, What to Read and Read which is done by using the drop down assigned to each book. Users are able to search the database and add more books to thier desired shelf. The search terms are limited to the following 

<!-- https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md -->

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. 
    ├── App.js # This is the root of the app. Contains all the funcionality needed to navigate the system. 
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── container  
    │   ├──Search #Search to add more books to the shelves 
    │   │   ├── Search.js 
    │   ├──Shelf #Current selection of books for each of these sections currently reading. wante to read and read.
    │   │   ├── Shelf.js 
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── ui

    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```
