# Back End Documentation: Co-Make App 
## Build Week, August 2020

Base URL for Deployed API: https://bw-co-make-8-21.herokuapp.com/
Run on local host: localhost:3000

## **Endpoints**

| Request | URL | Description | Requires Token |
|----------|----------|----------|----------|
|POST | /signup | register a new user | N |
|POST | /login | login an existing user | N |
|POST | /api/issues | add a new issue | Y |
|POST | /api/issues/:id/comments | add a new comment to a specific issue | Y|
|POST | /api/categories | add a new category | Y |
|GET | /api/users | get all users | Y |
|GET | /api/users/:id | get  user by id | Y |
|GET | /api/issues | get all issues | Y |
|GET | /api/issues/:id | get issue by id | Y |
|GET | /api/issues/:id/comments | get comments of an issue by id | Y|
|GET | /api/issues/comments | get all comments | Y |
|GET | /api/issues/comments/:id | get specific comment | Y |
|GET | /api/categories | get all categories | Y |
|GET | /api/categories/:id | get category by id | Y |
|GET | /api/categories/:id/issues | get issues under a certain category | Y |
|PUT | /api/users/:id | update a specific user by id | Y |
|PUT | /api/issues/:id | update a specific issue by id | Y|
|PUT | /api/issues/comments/:id | update a specific comment by id | Y |
|PUT | /api/categories/:id | update a category name by id | Y |
|DELETE | /api/users/:id | delete a specific user by id | Y |
|DELETE | /api/issues/:id | delete a specific issue by id | Y |
|DELETE | /api/issues/comments/:id | delete a specific comment by id | Y |
|DELETE | /api/categories/:id | delete a specific category by id | Y |

## **Table Requirements**

## **Users**
|Name | Type | Required | Unique | Notes |
|------|------|------|------|------|
| userId | integer | yes | yes | User id (auto generated by API) |
|username | string | yes | yes | User's username |
|password | string | yes | no| User's password |
|email | string | yes | yes | User's email must be unique|
|phone number | string | no | yes | Optional phone number |


## **Issues**
|Name | Type | Required | Unique | Notes |
|------|------|------|------|------|
| issueId | integer | yes | yes | Issue id (auto generated by API)|
|title | string | yes | no | Title of issue |
|description | string | yes | no | Description of issue |
|imageURL | string | no | no | Optional image url of issue |
|categoryId | integer | no | no | Foreign key references categoryId |
|username | string | yes | no | Foreign key references username in users tbl |

## **Comments**
|Name | Type | Required | Unique | Notes |
|------|------|------|------|------|
|commentId | integer | yes | yes | Comment id (auto generated by API)|
|comment | string | yes | no | Comment regarding the issue |
|issueId | integer | no | no | References the issueId |

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
Request Body: what is required to enter into the body of Postman or into the signup form. For example: username, password, and email are REQUIRED for signup, and phone number is optional.
>NOTE: Each username must be unique, we cannot have a repeating username in the database. Each email must be unique as well. 
```
{
    "username" : "hailey",
    "password": "pass123",
    "email": "hailey@gmail.com"
}
```
Returns:
```
{
    "data": {
        "userId": 5,
        "username": "hailey",
        "password": "$2a$08$Rrjbh.9xP3OPQsMzIstqDegU1e8O5.P8JqpJM57/YeznqfmIK1DDe",
        "email": "hailey@gmail.com",
        "phoneNumber": null
    }
}

```

**POST /login**

Request Body:
```
{
    "username": "hailey",
    "password": "pass123"
}
```

Returns:
```
{
    "message": "Welcome, hailey",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJ5YW4iLCJpYXQiOjE1OTgyMDg1MTYsImV4cCI6MTU5ODI5NDkxNn0.DbKCOERt2jNfYb3anBKv-PbHGxCmle7O2-_hwlqwYCg"
}
```

**POST /api/issues**

Request Body:
```
    {
        "title": "Missing dog.",
        "description": "I cannot find my sweet dog. Let me know if you see her.",
        "categoryId": 4,
        "username": "hailey"
    }
```
Returns:
```
{
    "issueId": 5,
    "title": "Missing dog.",
    "description": "I cannot find my sweet dog. Let me know if you see her.",
    "imageURL": null,
    "categoryId": 4,
    "username": "hailey",
    "userId": 2
}
```

**POST /api/issues/:id/comments**

Request Body: the id in the post request url should match the id you write into the request body (localhost:3000/api/issues/1/comments)
```
{
    "comment": "Thank you for your commitment to our neighborhood",
    "issueId": 1
}
```
Returns:
```
{
    "issueTitle": "lawn sale",
    "commentId": 1,
    "comment": "Thank you for your commitment to our neighborhood"
}
```

**POST /api/categories**

Request Body:
```
    {
        "categoryName": "Missing Pets"
    }
``` 
Returns:
```
{
    "categoryId": 4,
    "categoryName": "Missing Pets"
}
```   

**GET /api/users**

Returns:
```
[
    {
        "userId": 1,
        "username": "test"
    },
    {
        "userId": 2,
        "username": "hailey"
    },
    {
        "userId": 3,
        "username": "dominique"
    },
]
```

**GET /api/users/:id**

Returns:
```
{
    "userId": 1,
    "username": "test",
    "password": "pass123",
    "email": "test@gmail.com",
    "phoneNumber": "323-555-5555"
}
```

**GET /api/issues**

Returns:
```
[
    {
        "issueId": 1,
        "title": "Yard sale",
        "description": "Please make sure your yard sale is only on your own lawn. We have noticed yard sales getting out of control.",
        "imageURL": null,
        "categoryId": 1,
        "username": "hailey",
        "userId": 2
    },
    {
        "issueId": 2,
        "title": "Block Party BBQ",
        "description": "We'd like to invite everyone to our backyard at 12pm Saturday 8/22 for a BBQ!",
        "imageURL": null,
        "categoryId": 2,
        "username": "test",
        "userId": 1
    },
]
```

**GET /api/issues/:id**
Returns:
```
{
    "issueId": 1,
    "title": "Yard sale",
    "description": "Please make sure your yard sale is only on your own lawn. We have noticed yard sales getting out of control.",
    "imageURL": null,
    "categoryId": 1,
    "username": "hailey",
    "userId": 2
}
```

**GET /api/issues/:id/comments**
Returns:
```
[
    {
        "issueTitle": "lawn sale",
        "commentId": 1,
        "comment": "Thank you for your commitment to our neighborhood"
    },
    {
        "issueTitle": "lawn sale",
        "commentId": 2,
        "comment": "It's great to share and re-use!"
    }
]
```

**GET /api/issues/comments**
Returns:
```
[
    {
        "commentId": 1,
        "comment": "Thank you for your commitment to our neighborhood",
        "issueId": 1
    },
    {
        "commentId": 2,
        "comment": "It's great to share and re-use!",
        "issueId": 1
    },
    {
        "commentId": 3,
        "comment": "Please bring your own meats and veggies to grill",
        "issueId": 2
    }
]
```

**GET /api/issues/comments/:id**

Returns:
```
{
    "commentId": 2,
    "comment": "It's great to share and re-use!",
    "issueId": 1
}
```
**GET /api/categories**

Returns:
```
[
    {
        "categoryId": 1,
        "categoryName": "Yard and Lawn"
    },
    {
        "categoryId": 2,
        "categoryName": "Community Activities"
    },
    {
        "categoryId": 3,
        "categoryName": "Safety"
    }
]
```
**GET /api/categories/:id/**

Returns:
```
{
    "categoryId": 1,
    "categoryName": "Yard and Lawn"
}
```
**GET /api/categories/:id/issues**

Returns:
```
[
    {
        "categoryName": "Yard and Lawn",
        "issueId": 1,
        "title": "Yard sale",
        "description": "Please make sure your yard sale is only on your own lawn. We have noticed yard sales getting out of control."
    },
    {
        "categoryName": "Yard and Lawn",
        "issueId": 3,
        "title": "Trim your sidewalk plants",
        "description": "Please keep the trees, shrubs, and plants on your sidewalk trimmed neatly so that runners are not tripping, thanks!"
    }
]
```


**PUT /api/users/:id**

Request Body:
```
{
    "username" : "jules",
    "password": "pass123"
}
```

Returns:
```
{
    "message": "User updated successfully",
    "updated": {
        "userId": 2,
        "username": "jules",
        "password": "$2a$08$iG.id5c.QYShPDifYkgrZebplsrVPj5S.aDhxwuujXHY6RX20yQke"
    }
}
```

**PUT /api/issues/:id**
Request Body:
```
    {
        "title": "lawn sale",
        "description": "please contain your lawn sales to only your own lawn",
        "categoryId": 2,
        "username": "hailey"
    }
```
Returns:
```
{
    "issueId": 1,
    "title": "lawn sale",
    "description": "please contain your lawn sales to only your own lawn",
    "imageURL": null,
    "categoryId": 2,
    "username": "hailey",
    "userId": 2
}
```

**PUT /api/issues/comments/:id**

Request Body:
```
{
    "comment": "Good thinking!",
    "commentId": 6,
    "issueId": 2
}
 ```

 Returns:
 ```
{
    "comment": "Good thinking!",
    "commentId": 6,
    "issueId": 2
}
 ```

 **DELETE /api/issues/:id**

 Returns:
 ```
 "Successfully Removed"
 ```

 **DELETE /api/issues/comments/:id**

Returns:
```
{
    "message": "Successfully Removed"
}
```

 **DELETE /api/users/:id**

 Returns:
 ```
 {
    "Removed": "user with id: 9"
}
 ```

 **DELETE /api/categories/:id**

 Returns:
```
{
    "Removed": "category 4"
}
```