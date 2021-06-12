'use strict'

const { readFileSync } = require('fs')
const { buildSchema } = require('graphql')
const path = require('path')

const { login, signup } = require('../rpc_clients/authClient')

const {
  getPost,
  addPost,
  deletePost,
  updatePost,
  getCategory,
  getCategories,
  listPosts,
  listPostsByUser,
  listPostsByCategoryId,
  listPostsByKeyword,
  listPostsByKeywordAndCategoryId
} = require('../rpc_clients/postsClient')

const {
  createUser,
  getUser,
  removeUser,
  updateField
} = require('../rpc_clients/usersClient')

const Client = require('../session/client')
const Session = require('../session/session')

const createSchema = () =>
  buildSchema(
    readFileSync(path.resolve(__dirname, './schema.graphql')).toString()
  )

const resolvers = async (req, res) => {
  const client = await Client.getInstance(req, res)
  Session.start(client)
  const { method, url, headers } = req
  console.log(`${method} ${url} ${headers.cookie}`)
  res.on('finish', () => {
    console.log('FINISH')
    if (client.session) client.session.save()
  })
  return {
    signup: async ({ cred }) => {
      let password
      try {
        password = await signup(cred)
        console.log(`Password ${password}`)
      } catch (err) {
        console.log(err)
      }
      client.sendCookie()
      return 'OK'
    },
    login: async ({ cred }) => {
      const userId = await login(cred)
      if (userId) {
        client.session.set('user_id', userId)
        client.session.set('logged_in', 1)
      }
      client.sendCookie()
      return 'OK'
    },
    addPost: async ({ post }) => {
      if (!client.session.get('logged_in')) return
      post.user_id = client.session.get('user_id')

      const result = await addPost(post)
      console.log('result in addPost: ', result.data)
      client.sendCookie()
      return result.data
    },
    updatePost: async ({ post }) => {
      if (!client.session.get('logged_in')) return
      const result = await updatePost(post)
      client.sendCookie()
      return result
    },
    deletePost: async ({ post }) => {
      if (!client.session.get('logged_in')) return
      const result = await deletePost(post)
      client.sendCookie()
      return result
    },
    createUser: async ({ info }) => {
      const result = await createUser(info)
      client.sendCookie()
      return result.data
    },
    getUser: async ({ id }) => {
      const result = await getUser(id)
      client.sendCookie()
      return result
    },
    removeUser: async ({ id }) => {
      if (
        !client.session.get('logged_in') &&
        client.session.get('user_id') != id
      )
        return
      const result = await removeUser(id)
      client.sendCookie()
      return result
    },
    modifyUserField: async ({ data }) => {
      if (!client.session.get('logged_in')) return
      data.id = client.session.get('user_id')
      const result = await updateField(data)
      client.sendCookie()
      return result
    },
    getPost: async ({ data }) => {
      const post = await getPost(data)
      console.log(post)
      const user = await getUser(post.user_id)
      console.log(user)
      const category = await getCategory({ id: post.category_id })
      console.log(category)
      const result = {
        id: post.id,
        category_name: category.name,
        user_phone: user.phone,
        user_name: user.name,
        user_surname: user.surname,
        title: post.title,
        description: post.description,
        price: post.price,
        picture_url: post.picture_url,
        is_active: post.is_active,
        created_at: post.created_at,
        updated_at: post.updated_at
      }
      client.sendCookie()
      return result
    },
    listPosts: async ({ pagination }) => {
      console.log(pagination)
      const result = await listPosts(pagination)
      console.log(result)
      client.sendCookie()
      return result
    },
    listPostsByUser: async ({ paginationByUser }) => {
      console.log(paginationByUser)
      const result = await listPostsByUser(paginationByUser)
      console.log(result)
      client.sendCookie()
      return result
    },
    listPostsByCategoryId: async ({ paginationByCategoryId }) => {
      console.log(paginationByCategoryId)
      const result = await listPostsByCategoryId(paginationByCategoryId)
      console.log(result)
      client.sendCookie()
      return result
    },
    listPostsByKeyword: async ({ paginationByKeyword }) => {
      console.log(paginationByKeyword)
      const result = await listPostsByKeyword(paginationByKeyword)
      console.log(result)
      client.sendCookie()
      return result
    },
    listPostsByKeywordAndCategoryId: async ({
      paginationByKeywordAndCategoryId
    }) => {
      console.log(paginationByKeywordAndCategoryId)
      const result = await listPostsByKeywordAndCategoryId(
        paginationByKeywordAndCategoryId
      )
      console.log(result)
      client.sendCookie()
      return result
    },
    getCategories: async () => {
      const result = await getCategories()
      console.log(result)
      client.sendCookie()
      return result
    }
  }
}

const context = ({ req, res }) => {
  return {
    req: req,
    res: res
  }
}

module.exports = {
  resolvers,
  createSchema,
  context
}
