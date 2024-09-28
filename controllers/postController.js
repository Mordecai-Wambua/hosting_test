let posts = [
  { id: 1, title: 'Post One' },
  { id: 2, title: 'Post Two' },
  { id: 3, title: 'Post Three' },
];

// @desc: Get all posts
// @route: GET /api/posts
export function getPosts(req, res, next) {
  const limit = req.query.limit;

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
}

// @desc: Get single post
// @route: GET /api/posts/:id
export function getPost(req, res, next) {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} does not exist`);
    error.status = 404;
    return next(error);
  }
  /*
    if (!post) {
      return res
        .status(404)
        .json({ message: `A post with the id of ${id} does not exist` });
    }
        */
  res.status(200).json(post);
}

// @desc: Create new post
// @route: POST /api/posts
export function createPost(req, res, next) {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error('Title is required');
    error.status = 400;
    return next(error);
  }
  posts.push(newPost);
  res.status(201).json(posts);
}

// @desc: Update a post
// @route: UPDATE /api/posts/:id
export function updatePost(req, res, next) {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} does not exist`);
    error.status = 404;
    return next(error);
  }
  post.title = req.body.title;
  res.status(200).json(posts);
}

// @desc: Delete a post
// @route: DELETE /api/posts/:id
export function deletePost(req, res, next) {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} does not exist`);
    error.status = 404;
    return next(error);
  }
  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
}
