'use strict'

const { readFileSync } = require('fs')
const { buildSchema } = require('graphql')
const path = require('path')

const { login, signup } = require('../rpc_clients/authClient')

const {
  getPost,
  addPost,
  deletePost,
  listPosts,
  updatePost,
  getUserPosts
} = require('../rpc_clients/postsClient')

const {
  removeUser,
  createUser,
  getUser,
  modifyField
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
    singup: async ({ cred }) => {
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
    addPost: async ({ post }) => {
      if (!client.cookie.logged_in) return
      const result = await addPost(post)
      console.log('result in addPost: ', result.data)
      client.sendCookie()
      return result.data
    },
    updatePost: async ({ post }) => {
      if (!client.cookie.logged_in) return
      const result = await updatePost(post)
      client.sendCookie()
      return result
    },
    deletePost: async ({ post }) => {
      if (!client.cookie.logged_in) return
      const result = await deletePost(post)
      client.sendCookie()
      return result
    },
    createUser: async ({ info }) => {
      const { password } = await signup({
        email: info.email,
        password: info.password
      })
      info.password = password
      const result = await createUser(info)
      client.sendCookie()
      return result.data
    },
    getUser: async ({ id }) => {
      if (!client.cookie.logged_in) return
      const result = await getUser(id)
      client.sendCookie()
      return result
    },
    removeUser: async ({ id }) => {
      if (!client.cookie.logged_in) return
      const result = await removeUser(id)
      client.sendCookie()
      return result
    },
    modifyUserField: async ({ data }) => {
      if (!client.cookie.logged_in) return
      const result = await modifyField(data)
      client.sendCookie()
      return result
    },
    login: async ({ cred }) => {
      const userId = await login(cred)
      if (userId) {
        client.setCookie('user_id', userId)
        client.setCookie('logged_in', 1)
      }
      client.sendCookie()
      return 'OK'
    },
    getPost: async ({ data }) => {
      const result = await getPost(data)
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
      if (!client.cookie.logged_in) return
      console.log(paginationByUser)
      const result = await getUserPosts(paginationByUser)
      console.log(result)
      client.sendCookie()
      return result
    },
    listPostsByCategoryId: async ({ paginationByCategoryId }) => {
      console.log(paginationByCategoryId)
      const result = await listPosts(paginationByCategoryId)
      console.log(result)
      client.sendCookie()
      return result
    },
    listPostsByKeyword: async ({ pagination }) => {
      console.log(pagination)
      const result = await listPosts(pagination)
      console.log(result)
      client.sendCookie()
      return result
    },
    listPostsByKeywordAndCategoryId: async ({
      paginationByKeywordAndCategoryId
    }) => {
      console.log(paginationByKeywordAndCategoryId)
      const result = await listPosts(paginationByKeywordAndCategoryId)
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
