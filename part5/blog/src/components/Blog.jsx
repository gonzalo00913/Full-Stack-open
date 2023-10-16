const Blog = ({ blog }) => (
    <div>
    <li>{blog.title} {blog.author} {blog.url} {blog.likes}</li>
    </div>  
  )
  
  export default Blog