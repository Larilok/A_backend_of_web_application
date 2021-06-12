const grpc = require('@grpc/grpc-js')

const {
  getCategory,
  getCategories,
  getPost,
  addPost,
  updatePost,
  deletePost,
  getPosts,
  getPostsByUser,
  getPostsByCategoryId,
  getPostsByKeyword,
  getPostsByKeywordAndCategoryId
} = require('../db/queries')

const getCategoryRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const categories = await getCategory(call.request)
    callback(null, { categories })
    console.log(categories)
    return
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Category error'
    })
  }
}

const getCategoriesRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const categories = await getCategories()
    callback(null, { categories })
    console.log(categories)
    return
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Categories error'
    })
  }
}

const getPostRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const post = await getPost(call.request)
    console.log(post)
    callback(null, post)
    return
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'That Post does not exist'
    })
  }
}

const addPostRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const id = await addPost(call.request)
    console.log(id)
    callback(null, id)
    return
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Add post error'
    })
  }
}

const updatePostRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await updatePost(call.request)
    console.log(result)
    callback(null, result)
    return
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Update post error'
    })
  }
}

const deletePostRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await deletePost(call.request)
    console.log(result)
    callback(null, result)
    return
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Delete post error'
    })
  }
}

const listPostsRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await getPosts(call.request)
    console.log(result)
    callback(null, result)
    return
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'List posts error'
    })
  }
}

const listPostsByUserRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await getPostsByUser(call.request)
    console.log(result)
    callback(null, result)
    return
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'getPostsByUser posts error'
    })
  }
}

const listPostsByCategoryIdRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await getPostsByCategoryId(call.request)
    console.log(result)
    callback(null, result)
    return
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'getPostsByCategoryId posts error'
    })
  }
}

const listPostsByKeywordRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await getPostsByKeyword(call.request)
    console.log(result)
    callback(null, result)
    return
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'getPostsByKeyword posts error'
    })
  }
}

const listPostsByKeywordAndCategoryIdRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await getPostsByKeywordAndCategoryId(call.request)
    console.log(result)
    callback(null, result)
    return
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'getPostsByKeywordAndCategoryId posts error'
    })
  }
}
module.exports = {
  getPostRPC,
  getCategoryRPC,
  getCategoriesRPC,
  addPostRPC,
  updatePostRPC,
  deletePostRPC,
  listPostsRPC,
  listPostsByUserRPC,
  listPostsByCategoryIdRPC,
  listPostsByKeywordRPC,
  listPostsByKeywordAndCategoryIdRPC
}
