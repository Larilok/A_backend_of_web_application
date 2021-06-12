'use strict'

const config = require('../knexfile')

const knex = require('knex')(config)

const selectTable = type => {
  return type === 'REQ' ? knex('posts_request') : knex('posts_offer')
}

const getCategories = async () => {
  console.log('getCategories ')
  let result
  try {
    result = await knex('categories').select()
    console.log(result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result
}

const getPost = async ({ id, type }) => {
  console.log('getPost ', id, type)
  let result
  try {
    result = await selectTable(type)
      .where('id', id)
      .select()
    console.log(result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result[0]
}

const addPost = async newPost => {
  console.log('addPost ', newPost)
  let id
  try {
    id = await selectTable(newPost.type).insert(
      {
        category_id: newPost.category_id,
        user_id: newPost.user_id,
        title: newPost.title,
        description: newPost.description,
        price: newPost.price,
        picture_url: newPost.picture_url,
        is_active: newPost.is_active
      },
      ['id']
    )
    console.log(id)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return id[0]
}

const updatePost = async ({ id, type, fieldname, value }) => {
  console.log('getPost ', id, type, fieldname, value)
  let result
  try {
    result = await selectTable(type)
      .where('id', id)
      .update(fieldname, value)
    console.log(result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result
}

const deletePost = async ({ id, type }) => {
  console.log('deletePost ', id, type)
  let result
  try {
    result = await selectTable(type)
      .where('id', id)
      .del()
    console.log(result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result[0]
}

const countPosts = async type => {
  console.log('CountPosts', type)
  let result
  try {
    result = await selectTable(type).count({ total: 'id' })
    console.log(result)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return result[0].total
}

const getPosts = async ({ page_num = 0, limit = 20, type }) => {
  console.log('getPosts ', page_num, limit, type)
  let posts, total
  try {
    posts = await selectTable(type)
      .where('id', '>', page_num * limit)
      .limit(limit)
    console.log(posts)
    total = await countPosts(type)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return { posts, total }
}

const getPostsByUser = async ({ page_num = 0, limit = 20, type, user_id }) => {
  console.log('getPostsByUser ', page_num, limit, type, user_id)
  let posts, total
  try {
    posts = await selectTable(type)
      .where('user_id', user_id)
      .andWhere('id', '>', page_num * limit)
      .limit(limit)
    console.log(posts)
    total = await countPosts(type)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return { posts, total }
}

const getPostsByCategoryId = async ({
  page_num = 0,
  limit = 20,
  type,
  category_id
}) => {
  console.log('getPostsByCategoryId ', page_num, limit, type, category_id)
  let posts, total
  try {
    posts = await selectTable(type)
      .where('category_id', category_id)
      .andWhere('id', '>', page_num * limit)
      .limit(limit)
    console.log(posts)
    total = await countPosts(type)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return { posts, total }
}

const getPostsByKeyword = async ({
  page_num = 0,
  limit = 20,
  type,
  keyword
}) => {
  console.log('getPostsByKeyword ', page_num, limit, type, keyword)
  let posts, total
  try {
    posts = await selectTable(type)
      .whereRaw("title like '%??%'", [keyword])
      .andWhere('id', '>', page_num * limit)
      .limit(limit)
    console.log(posts)
    total = await countPosts(type)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return { posts, total }
}

const getPostsByKeywordAndCategoryId = async ({
  page_num = 0,
  limit = 20,
  type,
  keyword,
  category_id
}) => {
  console.log(
    'getPostsByKeywordAndCategoryId ',
    page_num,
    limit,
    type,
    keyword,
    category_id
  )
  let posts, total
  try {
    posts = await selectTable(type)
      .whereRaw("title like '%??%'", [keyword])
      .andWhere('id', '>', page_num * limit)
      .andWhere('category_id', category_id)
      .limit(limit)
    console.log(posts)
    total = await countPosts(type)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  return { posts, total }
}

module.exports = {
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
}
