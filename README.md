# kanban-server
API untuk managing task, yang akan di hit oleh kanban client

## API DOCUMENTATIONS

This app has:
1. RESTful endpoints 
2. CRUD operation
2. JSON formatted sessions

This app has dependency:
1. Express JS Framework
2. PostgreSQL
3. Sequelize ORM
4. JSON Web Tokens JS
5. Bcrypt JS
6. Axios JS
7. Cors JS
8. Dotenv JS
9. google-auth-library Oauth JS

EndPonints list:
1. POST /register
2. POST /login
3. POST /loginGoogle
4. GET /kanban
5. POST /kanban/add
6. PATCH /kanban/:id
7. GET /kanban/:id
8. PUT /kanban/:id
9. DELETE /kanban/:id

## RESTful Endpoints

### GLOBAL Response
- Response (401) UNAUTHORIZE
``` JSON
    [
        {
            "message": [
                "Unauthorize User"
            ]
        },
    ]
```

- Response (500) Internal Server Error
``` JSON
    [
        {
            "message": [
                "Internal Server Error"
            ]
        },
    ]
```

- Response (404) Bad Request
``` JSON
    [
        {
            "message": "Data not Found"
        },
    ]
```

### POST /register

- Request Header
```JSON
    not needed        
```

- Request body
```JSON
    {
        "name": "name",
        "email": "email",
        "password": "password",
    }
```

- Response (201) Created
```JSON
    {
        "id": "id",
        "name": "name",
        "email": "email",
        "password": "Hashed password",
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": [
                "Name is required",
                "Name must Unique",
                "Email is required",
                "Password is required",
                "Password must be at least 6 characters"
            ]
        },
    ]
```

### POST /login

- Request Header
```JSON
    not needed        
```

- Request body
```JSON
    {
        "email": "email",
        "password": "password",
    }
```

- Response (200) Ok
```JSON
    {
        "id": "id",
        "name": "name",
        "email": "email",
        "access_token": "access_token"
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": [
                "Email / Password wajib diisi"
            ]
        },
    ]
```

- Response (401) Unauthorized
``` JSON
    [
        {
            "message": [
                "Email / Password is wrong, try again."
            ]
        },
    ]
```

### POST /loginGoogle

- Request Header
```JSON
    not needed        
```

- Request body
```JSON
    {
        "id_token": "id_token"
    }
```

- Response (201) Created
```JSON
    {
        "id": "id",
        "name": "name",
        "email": "email",
        "access_token": "access_token"
    }
```

- Response (200) Ok
```JSON
    {
        "id": "id",
        "name": "name",
        "email": "email",
        "access_token": "access_token"
    }
```

### GET /kanban

- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```
    not needed
```

- Response (200) Ok
```JSON
    [
        {
            "id": 1,
            "title": "mencuci baju",
            "description": "ganti menjadi mencuci baju karena sibuk",
            "point": "10",
            "assign_to": "agung",
            "UserId": 1,
            "category": "doing",
            "createdAt": "2021-03-11T02:24:23.110Z",
            "updatedAt": "2021-03-11T02:38:34.341Z"
        },
    ]
```


### POST /kanban/add

- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```JSON
    {
        "title": "title",
        "description": "description",
        "point": 10,
        "assign_to": "assignto"
    }
```

- Response (201) Created
```JSON
    {
        "id": 4,
        "title": "title",
        "description": "description",
        "point": "10",
        "assign_to": "assignto",
        "UserId": 2,
        "updatedAt": "2021-03-11T02:48:47.400Z",
        "createdAt": "2021-03-11T02:48:47.400Z",
        "category": "backlog"
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": [
                "Title is required",
                "Description is required",
                "Point is required",
                "Assign to is needed"
            ]
        },
    ]
```


### PATCH /kanban/:id

- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```JSON
    {
        "category": "todo"
    }
```

- Response (200) Ok
```JSON
    {
        "message": "success moving to doing's Table",
        "data": 4   
    }
```

### GET /kanban/:id

- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```JSON
   not needed
```

- Response (200) Ok
```JSON
    {
        "title": "title",
        "description": "description",
        "point": "10",
        "assign_to": "assignto",
    }
```

### PUT /kanban/:id

- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```JSON
   {
        "title": "title",
        "description": "description",
        "point": "20",
        "assign_to": "assignto",
    }
```

- Response (200) Ok
```JSON
    {
        "title": "title",
        "description": "description",
        "point": "10",
        "assign_to": "assignto",
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": [
                "Data harus Diisi semua"
            ]
        },
    ]
```

### DELETE /kanban/:id
- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```
   not needed
```

- Response (200) Ok
```JSON
    {
        "message": "task deleted"
    }
```


