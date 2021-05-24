'use strict'
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { bodyParserGraphQL } = require('body-parser-graphql')

const { resolvers, createSchema, context } = require('./gql/resolver')

const app = express()

;(async () => {
  const schema = createSchema()
  const root = 
  app.use(bodyParserGraphQL()) // to correctly parse the body
  app.use(express.static(__dirname + '/static'))
  app.use('/graphql', graphqlHTTP(async (request, response, graphQLParams) => ({
    schema: schema,
    rootValue: await resolvers(request, response),
    context: context
  })))
})()

app.listen(4241, () => console.log('Server is up on http://localhost:4241/graphql'))