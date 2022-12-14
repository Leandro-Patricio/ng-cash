# NG-Cash Bank

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project was carried out with the intention of being the first FullStack project done by myself. The idea came from a job selection process (which I didn't pass), in which a simple bank should be made, only with transactions between users (no withdrawals or deposits). Thus, it is possible to create a user, log in to the site, view and carry out transactions.


## Technologies
Project is created with:
* Front-end
** Next.js
** Typescrypt
** React
** TailwindCSS
** Axios

* Back-end
** Prisma
** Typescrypt
** Fastify
** Zod

* Datebase
** Docker
** PostegreSQL

	
## Setup
To run this project, folow this steps:

* For Front-end
```
$ cd  web
$ npm install
$ npm run dev
```

* For Back-end
```
$ cd  server
$ npm install
$ npx prisma migrate dev
$ npm run dev
```

* For Database
```
Get docker installed in your pc
open docker
$ cd server
in ./server -> add file: .end with DATABASE_URL="postgresql://postgres:postgres@localhost:5432/Users?schema=public"
$ npm run dev
go to localhost:5555
log in with username pgadmin4@pgadmin.org and password admin
```

* Done! You are ready to use!

*** Important!
As this project was made with the intention of learning, some security parts were not explored, such as unhashed passwords, in addition to the postgres user and password. Normally this is not indicated, but it has been provided here for my future use.

