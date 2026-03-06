const Header = ({ user, onLogout }) => {
  return (
    <>
      <h2>Blogs</h2>

      <div>
        {user.name} logged in
        <br />
        <br />
        <button type="button" onClick={onLogout}>
          logout
        </button>
      </div>

      <br />
    </>
  );
};

export default Header;
