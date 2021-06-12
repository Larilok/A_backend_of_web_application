'use strict'

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const path = require('path')

const postsServerAddress = 'reservation-web-application_posts_1:4242'

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(path.resolve(__dirname, '../protos/posts.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
)

const postsClient = new proto.PostsService(
  postsServerAddress,
  grpc.credentials.createInsecure()
)

const getCategories = () =>
  new Promise((res, rej) => {
    console.log('getCategories func Client: ')
    postsClient.GetCategories({}, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.categories)
    })
  })

const getCategory = id =>
  new Promise((res, rej) => {
    console.log('getCategory func Client: ')
    postsClient.GetCategory(id, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.categories)
    })
  })

const getPost = postOp =>
  new Promise((res, rej) => {
    console.log('getPost func Client: ', postOp)
    postsClient.GetPost(postOp, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp)
    })
  })

const addPost = newPost =>
  new Promise((res, rej) => {
    console.log('addPost func Client', newPost)
    postsClient.AddPost(newPost, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.data)
    })
  })

const updatePost = updatePostOp =>
  new Promise((res, rej) => {
    console.log('updatePost func Client: ', updatePostOp)
    postsClient.UpdatePost(updatePostOp, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.data)
    })
  })

const deletePost = postOp =>
  new Promise((res, rej) => {
    console.log('deletePost func Client: ', postOp)
    postsClient.DeletePost(postOp, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.data)
    })
  })

const listPosts = pagination =>
  new Promise((res, rej) => {
    console.log('listPosts func Client', pagination)
    postsClient.ListPosts(pagination, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp)
    })
  })

const listPostsByUser = paginationByUser =>
  new Promise((res, rej) => {
    console.log('ListPostsByUser func Client', paginationByUser)
    postsClient.ListPostsByUser(paginationByUser, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp)
    })
  })

const listPostsByCategoryId = paginationByCategoryId =>
  new Promise((res, rej) => {
    console.log('ListPostsByCategoryId func Client', paginationByCategoryId)
    postsClient.ListPostsByCategoryId(paginationByCategoryId, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp)
    })
  })

const listPostsByKeyword = paginationByKeyword =>
  new Promise((res, rej) => {
    console.log('ListPostsByKeyword func Client', paginationByKeyword)
    postsClient.ListPostsByKeyword(paginationByKeyword, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp)
    })
  })

const listPostsByKeywordAndCategoryId = paginationByKeywordAndCategoryId =>
  new Promise((res, rej) => {
    console.log(
      'ListPostsByKeywordAndCategoryId func Client',
      paginationByKeywordAndCategoryId
    )
    postsClient.ListPostsByKeywordAndCategoryId(
      paginationByKeywordAndCategoryId,
      (err, resp) => {
        if (err) {
          console.log('Error: ', err)
          rej(err.message)
          return
        }
        console.log(resp)
        res(resp)
      }
    )
  })
module.exports = {
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
}
