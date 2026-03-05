import User from './User.js'
import Post from './Post.js'
//One-to-One
// User.hasOne(Post, { foreignKey: "userId", as: "post" });
// Post.belongsTo(User, { foreignKey: "userId", as: "user" });

//One-to-Many
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' })

//Many-To-Many
/* User.belongsToMany(Post, {
  through: 'UserPosts',
  as: 'posts',
  foreignKey: 'userId',
})
Post.belongsToMany(User, {
  through: 'UserPosts',
  as: 'users',
  foreignKey: 'postId',
})
 */
export { User, Post }
