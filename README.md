## What is this?
This dummy application demonstrates performing authentication and authorization
on a typical Express application with [Passport.js](https://passportjs.org).
It requires that Guest/User must sign in or register before they see the important
secret message embedded inside.

## Installation
- It requires that you, of course, clone this repo
```bash
git clone https://github.com/ionware/passport-auth-sample.git
```
- Create a **.env** file at the root of the folder, and copy the content of **.env.example** into it. Then
update the defaults, particularly the *DB_CONNECTION*. You can easily spin a 
[MongoDB cluster](https://cloud.mongodb.com) instead of having to install MongoDB.
- Install the dependencies by running
```npm
npm install
```
- Start the server 
```bash
npm start
```
## Todo
- [x] Implement Passport Local strategy.
- [ ] Implement passport-facebook strategy
- [ ] Implement passport-twitter strategy
- [ ] Implement passport-linkedIn strategy
