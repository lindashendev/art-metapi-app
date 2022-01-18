// Main Content 
const MainContent = (prop) => {

  const {artistDisplayName, artistDisplayBio, department, dimensions, medium, primaryImageSmall, repository, title, isHighlight} = prop.art;

  return ( 
    <main className="wrapper">
      <div className="artDisplay">
        <div className="imgContainer">
          <img src={primaryImageSmall} alt={`${title} by ${artistDisplayName}`}  />
        </div>
        <div className="description">
          <h2>{title}</h2>
          <p><span>Highlight:</span> {isHighlight}</p>         
          <p><span>Artist Name:</span> {artistDisplayName}</p>
          <p><span>Biography:</span> {artistDisplayBio}</p>
          <p><span>Department:</span> {department}</p>
          <p><span>Dimensions:</span> {dimensions}</p>
          <p><span>Medium:</span> {medium}</p>  
          <p><span>Repository:</span> {repository}</p>  
        </div>
      </div>
    </main>
  )
}

export default MainContent;