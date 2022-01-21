// Main Content 
const MainContent = (prop) => {
  const artObject = prop.art;

  // destructure prop
  const {artistDisplayName, artistDisplayBio, department, dimensions, medium, primaryImageSmall, repository, title, GalleryNumber, creditLine, tags} = prop.art;

  // save function
  const handleSave = prop.save;

  return ( 
    <main className="wrapper">
      {
        artObject.objectID &&
        (
        <>
        <p>An art piece for {prop.search}</p>
        <div className="artDisplay">
          <div className="imgContainer">
            <img src={primaryImageSmall} alt={`${title} by ${artistDisplayName}`}  />
          </div>

          <div className="description">  
            <button className="save-btn" onClick={() => handleSave(primaryImageSmall, title)}>Save</button>
            <h2>{title}</h2>       
            {artistDisplayName && <p><span>Artist Name:</span> {artistDisplayName}</p>}
            {creditLine && <p><span>Credit Line:</span> {creditLine}</p>}         
            {GalleryNumber && <p><span>Gallery:</span> {GalleryNumber}</p>}
            {artistDisplayBio && <p><span>Biography:</span> {artistDisplayBio}</p>}
            {department && <p><span>Department:</span> {department}</p>}
            {dimensions && <p><span>Dimensions:</span> {dimensions}</p>}
            {medium && <p><span>Medium:</span> {medium}</p>  }
            {repository && <p><span>Repository:</span> {repository}</p>}
            {tags && (
              
              <ul className="tags">
                <p>Tag Info</p>
                  {
                    tags.map((tag, index) => {
                      return (
                      <li key={index}>
                        <p>{tag.term}</p>
                      </li>
                      )
                    })
                  }                
              </ul>
              )
            }
          </div>              
        </div>
        </>
        ) 
      }
    </main>
  )
}

export default MainContent;