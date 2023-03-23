<h1 align="center"> Express - Pet Store API </h1>
<h4 align="center"> A task given by the club gdscsrm.com </h4>

---

#### Summary of the Task

I have used **ExpressJS** with **Typescript** to build the backbone of the API. Then i have used **Yup** which validates the object structure and i have also used **MongoDB** as a database to store the data.

---

### 🟢 Endpoints

-   GET `/` - Returns Hello World `:)`
-   GET `/api/checkconnection` - Return's the Status of connection with uptime
-   `/api/pets/:PetID`
    -   GET - Get's info about single Pet from DB
    -   DELETE - Delete the pet data from DB
-   `/api/pets`
    -   POST - Create and store the pet data in the DB
    -   PUT - Updates the Pet data in the DB
-   `/api/allpets/:OwnerID`
    -   GET - Get all the pet's of a owner
-   `/api/owners/:OwnerID`
    -   GET - Get the owner's data from DB
    -   DELETE - Deletes the owner's data from the DB
-   `/api/owners`
    -   POST - Create and store owner data in the DB
    -   PUT - Updates the Pet data in the DB

---

### 📜 Steps for Installation

<details>
<summary> <a href="https://nodejs.org/en/download">Install Nodejs First.</a> <a> (Click the dropdown for more info)</a></summary>

First create `.env` file and fill out the credentials like below

```
MONGO_URI="mongodb+srv://<user>:<passwd>@cluster1.xzubd4k.mongodb.net/?retryWrites=true&w=majority"
PORT=3000 # you can chan
```

Then run the following command to install all the dependencies

```
npm i
```

---

<details>
<summary> Steps for Production Run </summary>

Run the following command to compile the code to javascript

```
tsc
```

Then run the following command to start the server

```
npm run prod
```

</details>

---

<details>
<summary> Steps for Dev Run </summary>

Run the following command to start the server

```
ts-node-dev --respawn --transpile-only src/index.ts
```

</details>
</details>

---
