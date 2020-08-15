# bucknet_api
This is a backend api I used to integrate with the 'BuckNet' React Native App in my repo<br>
It is not finished and lacks a lot of things <br>
This project is only a way of trying out how to develop a backend architecture using NodeJS <br>

## Models
User - which identifies an app user
Entries - which identifies a wish entry

### Requests
## User Model
'/signup' - for signing up a user <br>
'/login' - to sign in a user <br>
'/:userId' - to delete a user record <br>

## Entry Model
'/' - to get all entries from all users <br>
'/:entryId' - to get an entry record by entry id (GET) <br>
'/:entryId' - to update an entry (PUT/PATCH) <br>
'/:entryId' - to delete an entry (DELETE) <br>
'/user/:userId' - to get entries by user id <br>
