## Haiku-Generator

Haiku-Generator is a simple application created for a client using a MERN stack.

<a href="https://gyazo.com/d599404299d046733074e184bc96385b"><img src="https://i.gyazo.com/d599404299d046733074e184bc96385b.gif" alt="Image from Gyazo" width="576"/></a>

The requierements were to make a generator where users could create their own database, input verses to populate said database and display 3 lines chosen randomly following this design:

![Alt text](client/public/FIGMA.png)

## Running the app

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

GET: https://toolzbox.herokuapp.com/allHaikus/:id

returns an object with a dataBase array containing 3 random verses.

```java
fetch("https://toolzbox.herokuapp.com/allHaikus/MyAwesomeHaikus")
      .then((res) => res.json())
      .then((randomHaiku) => {
        console.log(randomHaiku)
      });
```

Object  
dataBaseArray: Array(3)  
0: "Aux pignons rouges "  
1: "du vent de lichen"  
2: "La cheminée qui s’étire"  
length: 3  
status: 201
