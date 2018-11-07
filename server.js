const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');
const { applySpec, prop, pipe, path, map } = require('ramda');

const apiKey = '';

// GraphQL Schema
const schema = buildSchema(`
  type Query {
    movies(search: String, page: Int): [Movie]
  }
  type Movie {
    title: String
    overview: String
    releaseDate: String
    popularity: Float
  }
`);

const movies = ({ search, page }) =>
  axios // Fetch movies
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${page}`,
    )
    .then(
      pipe(
        path(['data', 'results']), //Get results from response
        map(
          // For each item in response
          applySpec({
            // Map to Movie type
            title: prop('title'),
            overview: prop('overview'),
            releaseDate: prop('release_date'),
            popularity: prop('popularity'),
          }),
        ),
      ),
    );

// Root resolver
const root = {
  movies,
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(4000, () =>
  console.log('GraphQL server running on localhost:4000/graphql'),
);
