const Blog = ({ blog }) => (
    <div>
    <li> Title: {blog.title} Author: {blog.author} Url: {blog.url} Likes: {blog.likes}</li>
    </div>  
  )
  
  export default Blog