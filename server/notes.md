### Intro to GraphQL

#### Tools
- Node.js
- MongoDB
- Mongoose
- Jest

GraphQL is a strongly typed query language for your data.
Gives clients the power to describe exactly what data they want.
If a type validation fails, your API request fails.
Enables excellent developer tooling and experiences.
__Can sit in front of any existing API because its just a query language.__

It can be described as a comparison to SQL but for your API.

#### GraphQL vs REST

- GraphQL only has one URL. It doesn't need a resource url + verb combo. The request details are in a `POST` body (sometimes `GET`).

- In REST, the shape and size of the data resource is determined by the server, with Graphql it's determined by the query (request).

- In REST, you have to make multiple API calls to retrieve relational data, with GraphQL you can start with an entry resource and traverse all the connections in one request.

- In REST, the shape of the response is determined by who created the server, in GraphQL the shape is determined by the query.

- In REST, a single request will execute one controller on the server, in GraphQL a request might execute MANY resolvers on the server.

#### Schemas

A GraphQL schema stricly defines what resources are available, how they relate, and how a client can consume it.

A Database Schema is for keeping data consistent when entering our database.
GraphQL schema is for defining what resources are available for querying, how they relate, and how clients can query them.

Both schemas can be the same, or not. DB schema is a good starting point for your GraphQL schema.

GraphQL schema sits in front of your DB queries, so it validates incoming request queries.
A query gets validated against the schema before any resolver runs.

The validation happens before any resolver gets executed.

A schema defines the structure of valid queries for the client-side, and resolvers are functions that match the schema name, they do the work of querying the database.

#### SDL (Schema Definition Language)

```
type Cat {
  name: String
  age: Int!
}

type Query {
  myCat: Cat
  hello: String
}

schema {
  query: Query
}
```
 
#### Scalar and Object Types
There are two value types in GraphQL: Scalar and Objecct types.

The different types in GraphQL describe resources that will be used in queries and mutations.

- Scalar types are built in primitives
    - String
    - Int
    - Float
    - Boolean
    - ID

Scalar types can hold only a single value.
Object types are shapes with fields that are either scalar types or other object types.

```sh
# `Cat` is an object type
type Cat {
  name: String!
  age: Int!
  bestFriend: Cat
}
```

Object type fields also describe any arguments and or validations.

__Types are the target for all the requests; A request would always resolve a type.__

__The whole point of a request coming in is to get a type. That is the objective of GraphQL, to resolve types. And the objective of a query is to get the type.__

#### Query and Mutation Types
In GraphQL queries and mutations are types.

```
extend type Query {
  products: [Product]!
  product(id: ID!): Product!
}

extend type Mutation {
  removeProduct(id: ID!): Product!,
  newProduct(input: NewProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
}
```
Queries and Mutations enable CRUD operations on your GraphQL API

Query type describes the different queries your API is capable of.

```
type Query {
  myCat: Cat
  hello: String
}
```
A query operation is just a name (with possible arguments) that eventually returns a type.
A mutation is the exact same, but with the intent of mutating the DB vs just reading.

```
type Mutation {
  newCat: NewCat!
}
```

__Queries and Mutations are what will be available to clients interacting with your API, think of them as your routes.__

#### Input types

Input types function in the exact same way as `type`'s in GraphQL, the only difference is that they are only used as arguments that are passed into mutations.

```
input NewProductInput {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  description: String
  liquidCooled: Boolean
  bikeType: BikeType
  range: String
}

extend type Mutation {
  newProduct(input: NewProductInput!): Product!
}
```

#### Resolvers

They resolve anything that can eventually be some type of value. They're similar to controllers in a REST API, you talk to your data source through resolvers.

They resolve types all the way down the tree. It depends on the query that came in, if the query has nested types the they would all need resolvers at each level.

Resolvers are like controllers in a REST API. They are responsible for retrieving data.

__Every query and mutation that your schema has, must have a resolver that returns the specified type.__

Types and field often have resolvers as well. E.g retrieving the `_id` field from a mongo database when `id` is accessed.

Incoming queries determine which resolvers are run and in what order.

#### Creating Resolvers

A resolver will return the same shape as descirbed in the schema, or delegate to another resolver that will.

Resolvers are defined by a one-to-one mapping of the queries and mutations that are declared in the schema.

```sh
# resolvers
extend type Query {
  products: [Product]!
  product(id: ID!): Product!
}

extend type Mutation {
  removeProduct(id: ID!): Product!,
  newProduct(input: NewProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
}
```

```js
// resolvers
export default {
  Query: {
    products,
    product
  },
  Mutation: {
    newProduct,
    updateProduct,
    removeProduct
  },
  Product: {
    __resolveType(product) {
      return productsTypeMatcher[product.type];
    },
    createdBy(product) {
      return User.findById(product.createdBy)
        .lean()
        .exec();
    }
  }
}
```

Resolvers take a few arguments:
  - starting object (what the parent resolver returned or starting value from server)
  - `args` (any arguments from the incoming request)
  - `context` (shared context object across all resolvers, similar to the `req` object in Express)
  - `info` (advanced AST of the incoming request)

A resolver only gets triggered when a specific query requests its corresponding data.

- https://www.apollographql.com/docs/graphql-tools/resolvers.html

#### Interfaces

Inheritable types for your schema.

Some types are very similar with the exception of a few fields.
You can use an interface as a base type and have other types implement that interface.

Just like a language type system.

```
interface Animal {
  species: String!
  location: String!
}

type Tiger implements Animal {
  species: String!
  location: String!
  stripes: Int
}
```

#### Unions

They are much like interfaces, the difference is that they can be one of many different types that may not relate to each other.

Sometimes you want a query to return a possibility of more than just one type. Unions allow you to create a type that is composed of many types where any of them may be fulfilled.

They can be great for search queries.

```
union SearchItem = Person | Place | Review
```

#### Authentication

There are different ways to implement authentication in a GraphQL schema:

You can lock down the entire API by checking auth outside of GraphQL or when creating the context object.
You can also handle auth in the resolvers (just make sure you enhance the context object with all that you need)

```js
const product = (obj, args, context) => {

  if (!context.user) {
    throw new AuthenticationError();
  }
  return Product.findById(args.id)
    .lean()
    .exec();

};
```
Use custom directives in your SDL to lock fields down

```sh
type Bike implements Product {
  name: String! @auth(role: "Admin")
  price: Float!
  image: String!
  type: ProductType!
  createdBy: User!
  description: String
  bikeType: BikeType!
}
```

#### Mutations

- Add a new user
```sh
mutation addNewUser {
  signup(input: {email: "hi@mail.com", password: "password", firstName: "john", lastName: "doe"}) {
    email
    firstName
    lastName
    _id
    apiKey
  }
}
```

```sh
{
  "data": {
    "signup": {
      "email": "admin@mail.com",
      "firstName": "joan",
      "lastName": "holloway",
      "_id": "5c620f2ad1addf247a78f5ce",
      "apiKey": "cjs10gznp00017eddohfvtwt4"
    }
  }
}
```
```sh
mutation addUser {
  signup(input: {firstName: "joan", lastName: "holloway", role: "admin", messages: 15, offers: 32, orders: 25, email: "joan.holloway@mail.com", password: "admin"}) {
    id
    apiKey
    email
    role
    firstName
    lastName
  }
}

query getUser {
  me {
    id
    firstName
    lastName
    email
    role
  }
}

mutation addNewContact {
  newContact(input: {firstName: "alice", lastName: "bob", email: "alice.bob@mail.com", role: "artist", bio: "This is sample biography text for contact Alice Bob. The maximum character count for a bio is 500 words"}) {
    id
    firstName
    lastName
    role
    bio
  }
}

query getContacts {
  contacts {
    id
    firstName
    lastName
    messages {
      text
      from {
        email
        firstName
      }
    }
  }
}

mutation addNewUser {
  signup(input: {email: "joan.holloway@scdp.com", password: "joan", firstName: "joan", lastName: "holloway", role: "admin", orders: 32, offers: 12, messages: 5, image: {src: "http://localhost:8080/assets/avatar/avatar3.jpg", alt: "profile image for joan holloway", caption: ""}, 
social: [{platform: "linkedin", link: "https://www.linkedin.com"}, {platform: "facebook", link: "https://www.facebook.com"}, {platform: "twitter", link: "https://www.twitter.com"}] }) {
    email
    firstName
    lastName
    apiKey
  }
}

mutation messageContact {
	messageContact(id: "5c65d0f37ebff7711a5cc9e3", input: {text: "foo text again and again2"}) {
		firstName
		lastName
		messages {
			text
		}
	}
}

mutation addNewContact($firstName:String!, $lastName:String!, $email:String!, $role:String, $bio:String, $image:NewImageInput, $social:NewSocialInput) {
  newContact(input: {firstName: $firstName, lastName: $lastName, email: $email, role: $role, bio: $bio, image: $image, social: $social}) {
    id
    firstName
    lastName
    role
    bio
  }
}

{
	"firstName": "alice",
	"lastName": "bob",
	"email": "alice.bob@scdp.com",
	"role": "account manager",
	"bio": "This is a sample bio for a new contact",
	"image": {"src": "http://localhost:8080/assets/avatar/avatar3.jpg", "alt": "a profile image of alice bob"},
	"social": {"platform": "twitter", "link": "https://www.twitter.com"}
}

mutation messageContact($id:ID!, $text:String!) {
	messageContact(id: $id, input: {text: $text}) {
		firstName
		lastName
		messages {
			text
		}
	}
}

{
	"id": "5c6a5f7e145f9cd1b9809391",
	"text": "This is a sample text message to alice bob"
}

mutation updateContact($id:ID!, $firstName:String, $lastName:String, $email:String, $role:String, $bio:String, $social:UpdateSocialInput) {
  updateContact(id: $id, input: {firstName: $firstName, lastName: $lastName, email: $email, role: $role, bio: $bio, social: $social}) {
    id
    firstName
    lastName
    role
    bio
  }
}

{
	"id": "5c6b513aadcdeb4ea0d38faa",
	"firstName": "updateFirstName",
	"lastName": "updateLastName",
	"role": "updateRole",
	"email": "fooz@mail.com",
	"bio": "updated bio",
	"social": {
		"link": "https://www.facebook.com"
	}
}

mutation removeContact($id:ID!) {
	removeContact(id:$id) {
		email
	}
}

{
	"id": "5c6b32d9adcdeb4ea0d38dc9"
}

mutation addNewCompany($name:String!, $location:String!, $quantity:String!, $image:NewImageInput!) {
  newCompany(input: {name: $name, location: $location, quantity: $quantity, image: $image}) {
    id    
    name
    location
    quantity
    image {
			src
			alt
		}
    products {
			name
		}
  }
}

{
	"name": "test company",
	"location": "test location",
	"quantity": "retail",
	"image": {"src": "https://www.image-url.com", "alt": "alternate text"}
}

mutation removeCompany($id:ID!) {
	removeCompany(id:$id) {
		name
	}
}

{
	"id": "5c6badf33e5d1f5bb403c1db"
}

mutation sendOrder($id:ID!, $input:NewOrderInput!) {
	sendOrder(id:$id, input:$input) {
		name
		location
		orders {
			products {
				name
			}
			lead {
				firstName
				lastName
			}
		}
	}
}

{
	"id": "5c6baba03e5d1f5bb403bf91",
	"input": {
  "units": 5,
  "products": [
    {
      "name": "test product 3",
      "units": 5,
      "price": 80,
      "quantity": "retail",
      "supplier": "test store 3",
      "saleBy": "2019-09-01 12:55:08.777",
      "image": {"src": "http:localhost:8080/assets/product/product3.jpg", "alt": "alternate product text"}
    }
  ]
}

mutation updateUser($input:UpdateUserInput!) {
	updateMe(input:$input) {
		email
		firstName
		lastName
	}
}

{
	"input": {
		"email": "j.h@scdp.com"
	}
}
```
mutation addNewUser {
  signup(input: {email: "joan.holloway@scdp.com", password: "joan", firstName: "joan", lastName: "holloway", role: "admin", image: {src: "https://analis.obie.dev/assets/avatar/avatar3.jpg", alt: "profile image for joan holloway", caption: "chief economist"}, 
social: [{platform: "linkedin", link: "https://www.linkedin.com"}, {platform: "facebook", link: "https://www.facebook.com"}, {platform: "twitter", link: "https://www.twitter.com"}] }) {
    email
    firstName
    lastName
    apiKey
  }
}

mutation addNewUser {
  signup(input: {email: "joan.holloway@scdp.com", password: "joan", firstName: "joan", lastName: "holloway", role: "admin", orders: 32, offers: 12, messages: 5, image: {src: "assets/avatar/avatar3.jpg", alt: "profile image for joan holloway", caption: ""}, 
social: [{platform: "linkedin", link: "https://www.linkedin.com"}, {platform: "facebook", link: "https://www.facebook.com"}, {platform: "twitter", link: "https://www.twitter.com"}] }) {
    email
    firstName
    lastName
    apiKey
  }
}
