const api = process.env.REACT_APP_CONTACTS_API_URL || "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
fetch(`${api}/posts`, { headers })
  .then(res => res.json())
  .then(data => data)

export const getAllComments = (postId) =>
fetch(`${api}/posts/${postId}/comments`, { headers })
  .then(res => res.json())
  .then(data => data)

export const votePost = (id, voteOption) =>
fetch(`${api}/posts/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({option:voteOption})
}).then(res => res.json()).then(data => data)

export const voteComment = (id, voteOption) =>
fetch(`${api}/comments/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({option:voteOption})
}).then(res => res.json()).then(data => data)

export const addComment = (insertComment) =>
fetch(`${api}/comments`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(insertComment)
}).then(res => res.json()).then(data => data)

export const addPost = (insertPost) =>
fetch(`${api}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(insertPost)
}).then(res => res.json()).then(data => data)

export const deletePost = (id) =>
fetch(`${api}/posts/${id}`, {
  method: 'DELETE',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
})

export const deleteComment = (id) =>
fetch(`${api}/comments/${id}`, {
  method: 'DELETE',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
})

export const editPost = ({title,body,id}) =>
fetch(`${api}/posts/${id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({title,body})
}).then(res => res.json()).then(data => data)

export const editComment = ({timestamp,body,id}) =>
fetch(`${api}/comments/${id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({body,timestamp})
}).then(res => res.json()).then(data => data)

    

// export const getAll = () =>
//   fetch(`${api}/books`, { headers })
//     .then(res => res.json())
//     .then(data => data.books)

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())

// export const search = (query, maxResults) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query, maxResults })
//   }).then(res => res.json())
//     .then(data => data.books)
