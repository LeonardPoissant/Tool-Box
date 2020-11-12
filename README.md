## Haiku-Generator

Haiku-Generator is a simple application created for a client using a MERN stack.

<a href="https://gyazo.com/d599404299d046733074e184bc96385b"><img src="https://i.gyazo.com/d599404299d046733074e184bc96385b.gif" alt="Image from Gyazo" width="576"/></a>

The requierements were to make a generator where users could create their own database, generate 3 random lines and have the ability to manage their data following this design:

![Alt text](client/public/FIGMA.png)

## Fetching from the API

The API works as follow:

POST: https://toolzbox.herokuapp.com/createHaikus

POST is used to send data to the server and then to create/update the data base in MongoDB.

Example:

```java

fetch("https://toolzbox.herokuapp.com/createHaikus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          dataBaseTitle,
          verse,
        }),
      })
        .then((res) => res.json())
        .then((db) => {
          console.log(db);
        })
```

GET: https://toolzbox.herokuapp.com/:id/randomHaiku

returns 3 random verses from a specific database.

```java
fetch("https://toolzbox.herokuapp.com/randomHaiku/MyAwesomeHaikus")
      .then((res) => res.json())
      .then((randomHaiku) => {
        console.log(randomHaiku)
      });
```

```java
{
  "status": 201,
  "dataBaseArray": [
    "Donohue papers",
    "University of Chicago",
    "hot hand fallacy"
  ]
}
```

GET: https://toolzbox.herokuapp.com/dbInfo/:id

Returns all the information from a specific database

```java
fetch("https://toolzbox.herokuapp.com/allVerses/MyAwesomeHaikus")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      });
```

```java
{
  "status": 201,
  "dataBaseArray": [
    {
      "_id": "5f7ee58d58463b0a95c0cee0",
      "haikuDataBaseName": "MyAwesomeHaiku",
      "haikuArray": [
        "hot hand fallacy",
        "University of Chicago",
        "Donohue papers",
        "sdf"
      ]
    }
  ]
}
```

DELETE: https://toolzbox.herokuapp.com/delete

Deletes selected verses

```java
fetch("https://toolzbox.herokuapp.com/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          urlTitle,
          deletedArray,
        }),
      })
        .then((res) => res.json())
        .then((db) => {
          console.log(db)
        })
```

```java

{
  "status": 201,
  "dataBase": {
    "result": {
      "n": 1,
      "nModified": 1,
      ...
```
