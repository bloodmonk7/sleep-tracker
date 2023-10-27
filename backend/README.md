# Sleep Tracker Backend

This project was setup using Node.js, Express.js and MongoDB Atlas.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Building Process](#building-process)

## Demo

Here are the few demo calls you can make to test the API in Postman.

- To get data of a user by `username`:
```
GET
curl --location 'https://sleep-tracker-api.onrender.com/user/getUserData/Test1'
```
Test1 is one username and it is variable.

- To create a user:
```
POST
curl --location 'https://sleep-tracker-api.onrender.com/user/createUser' \
--header 'Content-Type: application/json' \
--data '{
    "username": "name",
    "password": "abcd"
}'
```

- To create sleepdata against a user:
```
POST
curl --location 'https://sleep-tracker-api.onrender.com/sleep/addSleepData' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "653b88694e0cafec07182295",
    "bedtime": "21:00"
}'
```

## Features

- After Signup the password is being stored in Encrypted manner using `bcrypt`.
- API allows updating userdata once at a time without making changes to other existing details.

## Building Process

- First, I created basic server.js file after installing nessecary packages.
- I made the `models` folder after that including a file userModel.js which contains the schema for User
My sample data looks like:
```
{
    "sleepProblems": {
        "earlySleep": true,
        "sleepThroughNight": true,
        "wakeUpOnTime": true
    },
    "_id": "653a3230fd4186e16b020ef6",
    "username": "Test1",
    "password": "$2b$10$AIXuzieRlo4hDQNBhLb5Ie0HcrHTABwDJ/HMBwLtP89dArS1g2Dam",
    "__v": 0,
    "totalSleepHours": "6",
    "bedtime": "22:00",
    "wakeupTime": "06:00",
    "createdAt": "2023-10-27T07:49:43.821Z",
    "updatedAt": "2023-10-27T07:49:50.497Z",
    "__v": 0
}
```
- I made routes folder after this to handle Creating a User, Getiing a User by Username and then Adding Sleepdata against the user by the User ID.
