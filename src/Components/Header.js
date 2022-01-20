import Navigation from "./Navigation.js";
// App Header
const Header = (prop) => {
  
  return (
    <div>
      <header>
        <Navigation />
        <div className="header wrapper">
          <h1>Met Highlights</h1>
          <p>See Met Museum Art Highlights. Get started by searching.</p>
          <form onSubmit={prop.submit}>
            <span className="sr-only">Search by keyword</span>
            <input
              type="text"
              id="userQuery"
              onChange={prop.input}
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
