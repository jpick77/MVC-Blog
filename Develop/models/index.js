const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});



module.exports = { User, Post, Comment };
