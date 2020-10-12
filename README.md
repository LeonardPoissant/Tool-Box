## Haiku-Generator

Haiku-Generator is a simple application created for a client using a MERN stack.

<a href="https://gyazo.com/d599404299d046733074e184bc96385b"><img src="https://i.gyazo.com/d599404299d046733074e184bc96385b.gif" alt="Image from Gyazo" width="576"/></a>

The requierements were to make a generator where users could create their own database, input verses to populate said database and display 3 lines chosen randomly following this design:

![Alt text](client/public/FIGMA.png)

## Fetching from the API

The API works as follow:

POST: https://toolzbox.herokuapp.com/createHaikus

POST is used to send data to the server and then to create/update the data base in MongoDB.

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

GET: https://toolzbox.herokuapp.com/randomHaiku/:id

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

GET: https://toolzbox.herokuapp.com/allVerses/:id

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
