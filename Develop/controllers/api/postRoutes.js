const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/comment/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      postId: req.body.id,
      comment: req.body.comment,
      name: req.session.user_id,
}
      );

    res.status(200).json(newComment);
  } catch (err) {
    //res.status(400).json(err);
    console.log(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/comment/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id/edit', withAuth, async (req, res) => {
  console.log('route');
  Post.update(
    {
      name: req.body.name,
      content: req.body.content
    }, {
    where:  {
      id: req.params.id,
    },  }
  )
 
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
 
 
  });
 
  // try {

  //   const editPost = await Post.create({
  //     ...req.body,
  //     user_id: req.session.user_id,
  //   });

  //   Post.findByIdAndUpdate(req.params.id, req.body) 
  //     .then(post => {
  //       res.redirect(`/edit/${post._id}`)
  //     }
  //   )

  //   res.status(200).json(newPost);
  // } catch (err) {
  //   //res.status(400).json(err);
  //   console.log(err);
  // }

module.exports = router;
