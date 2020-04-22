# DevBootCamp API 


# Brad Traversy NodeJS API MasterClass Course Project

## Install Dependicies
```
npm install
```
## Run App
```
# Run in dev mode 
npm run dev

# Run in prod mode
npm start

```

# Project's Structer

## MVC(Model-View-Controller)
```
# Model
Model is actually tables(bootcamp,user,review and course) from db(mongoDb) or actually DTOs(for example user=>UserLogin,UserRegister...)
but when this application created , Dto objects were not used

# Controller
Controller is actually Model between to View and 
Controller's purpose is return to Http Status Code and result by incoming data from back end or logic filters


# View 
View is actually user interface by incoming result from Controller
View can be React,Angular,Vue,HTML...

```

## Middleware
```
Middleware is actually when we request(get,post...) to url first of all application looks to req object 
and if req object does not occur any problem from backend,application will do next and return to 200 status code response but
if req object or backend occurs,next function will be run but this time application return to error 

next function is actually req between to res
Next function reflect status to response object by backend or logic filters or request object

That's it this is middleware's workingflow.

Middleware using can be logging,errorHandler,your customize response,authentication,async...
```

##Some Dependicies
```
# Express
  Create http server and routes

# Bcrypt.JS
  Encrypt to text or any stuff as special password.When we created and saved user from db

# Express-Mongo-Sanitize 
  NoSQL Injection Preventition
  Preventation to something like '$gt:"" '=>text greater than " ".Actually text can be "" or different string

# NodeMailer
  Send to mail

# Helmet.JS
  A little bit to secure to API Header

# XSS-Clean
  clean to script tags from text or input

# Mongoose
  MongoDB ORM(Object Relational Mapping) from NodeJS

# Node-GeoCoder
  Resolve to geographical by adress city

# Express-Rate-Limiter
  Limiting to make a request
  You can prevent to many request with this package



```

- Version: 1.0.0
- Project Course Link:https://www.udemy.com/course/nodejs-api-masterclass/


