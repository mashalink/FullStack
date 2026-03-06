import Blog from "./Blog";

const Blogs = ({ blogs, user, onLike, onRemove }) => {
  return (
    <div>
      {[...blogs]
        .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
        .map((blog) => {
          const canRemove =
            blog.user?.username === user.username || blog.user?.id === user.id;

          return (
            <Blog
              key={blog.id}
              blog={blog}
              onLike={() => onLike(blog)}
              onRemove={() => onRemove(blog)}
              canRemove={canRemove}
            />
          );
        })}
    </div>
  );
};

export default Blogs;
