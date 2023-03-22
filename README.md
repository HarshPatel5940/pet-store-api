<h1 align="center"> Express - Pet Store API </h1>
<h4 align="center"> A task given by the club gdscsrm.com </h4>

---

## Steps 

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

