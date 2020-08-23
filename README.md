# Back End Documentation: Co-Make App 
## Build Week, August 2020

Base URL for Deployed API: 
Run on local host: localhost:3000

## **Endpoints**

| Request | URL | Description | Requires Token |
|----------|----------|----------|----------|
|POST | /signup | register a new user | N |
|POST | /login | login an existing user | N |
|POST | /api/issues | add a new issue | Y |
|POST | /api/issues/:id/comments | add a new comment to a specific issue | Y|
|GET | /api/users | get all users | Y |
|GET | /api/users/:id | get  user by id | Y |
|GET | /api/issues | get all issues | Y |
|GET | /api/issues/:id | get issue by id | Y |
|GET | /api/issues/:id/comments | get comments of an issue by id | Y|
|GET | /api/issues/comments | get all comments | Y |
|GET | /api/issues/comments/:id | get specific comment | Y |
|PUT | /api/users/:id | update a specific user by id | Y |
|PUT | /api/issues/:id | update a specific issue by id | Y|
|PUT | /api/issues/comments/:id | update a specific comment by id | Y |
|DELETE | /api/issues/:id | delete a specific issue by id | Y |
|DELETE | /api/issues/comments/:id | delete a specific comment by id | Y |
|DELETE | /api/users/:id | delete a specific user by id | Y |

## **Table Requirements**

## **Users**
|Name | Type | Required | Unique | Notes |
|------|------|------|------|------|
| userId | integer | yes | yes | User id (auto generated by API) |
|username | string | yes | yes | User's username |
|password | string | yes | no| User's password |


## **Issues**
|Name | Type | Required | Unique | Notes |
|------|------|------|------|------|
| issueId | integer | yes | yes | Issue id (auto generated by API)|
|title | string | yes | no | Title of issue |
|description | string | yes | no | Description of issue |
|imageURL | string | no | no | Optional image url of issue |
|categoryId | integer | no | no | Foreign key references categoryId (?)
|userId | integer | yes | no | Foreign key references userId |

## **Categories**
|Name | Type | Required | Unique | Notes |
|------|------|------|------|------|
|categoryId | integer | yes | yes | Category id |
|categoryName | string | yes | yes | Category name |

## **Login**
If you need to login in before you make a POST request to add a new user with the signup form, you can use the following login info:
|Username | Password | 
|------|------|
|test | pass123 |

## **Requests and Returns**
**POST /signup**

Request Body: what is required to enter into the body of Postman or into the signup form. 
>NOTE: Each username must be unique, we cannot have a repeating username in the database.
```
{
    "username": "ryan",
    "password": "pass456"
}
```
Returns:
```
{
    "data": {
        "userId": 8,
        "username": "ryan",
        "password": "$2a$08$iS2T720CBab5mKBtOoAee.blOB0StON0VFUmWaRppzWlyERmpXIq6"
    }
}

```

**POST /login**

Request Body:
```
{
    "username": "ryan",
    "password": "pass456"
}
```

Returns:
```
{
    "message": "Welcome, ryan",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJ5YW4iLCJpYXQiOjE1OTgyMDg1MTYsImV4cCI6MTU5ODI5NDkxNn0.DbKCOERt2jNfYb3anBKv-PbHGxCmle7O2-_hwlqwYCg"
}
```

**POST /api/issues**

Request Body:

Returns: