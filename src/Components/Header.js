// App Header
const Header = (prop) => {
  console.log(prop);
  return (
    <div>
      <header>
        <div className="header wrapper">
          <h1>Met <span>Highlights</span></h1>
          <p>See Met Museum Art Highlights. Get started by searching.</p>
          <form onSubmit={prop.submit}>
            <label className="sr-only">Search by keyword</label>
            <input
              type="text"
              id="userQuery"
              onChange={prop.input}
              autoFocus="autoFocus"
              value={prop.value} placeholder="Search by keyword"
            />
            <button>Search</button>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Header;
