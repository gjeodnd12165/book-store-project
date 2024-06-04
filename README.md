# Book Store Project
This is backend of book store project.  
Currently using nestjs with sequelize as ORM.  

## To do
1. Implement entities in db represented by table
    - Book
    - Cart Item
    - Category
    - Delivery
    - Like
    - Order
    - Ordered Book

 ## Some rules
 ### File structure
> To work with future me.  

These are all for `./src`  

- /[Each Entity Folder]
    - /dto
        - some dtos named like: [method]-[name].dto.ts
    - an entity named like: [name].entity.ts
    - a controller named like: [name].controller.ts
    - a module named like: [name].module.ts
    - a service named like: [name].service.ts

#### Things to consider
- repository: for abstracting db or orm  

