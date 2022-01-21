const SavedArt = (prop) => {
  const {save, handleRemove} = prop;

  return (
    <div className="images wrapper">
      <h2>Your Saved Art</h2>
      <div className="saved">
        <ul>
          {save.map((art) => {
            return (
              <li key={art.key}>
                <img src={art.name.url} alt={art.name.title} />
                <button onClick={() => handleRemove(art.key)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SavedArt;