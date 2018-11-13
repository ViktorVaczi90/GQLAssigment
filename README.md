## LittleLives GraphQL assigment

Run `yarn` to install packages, `yarn start` to start the server.

The server will be availale on `localhost:4000`, you can test it in GraphiQL with
```
{
  movies(search: "Jedi", page: 1){
    title,
    popularity,
    releaseDate,
    overview
  }
}
```
