import React from 'react'

const Shelf = (props) => {
    const handleChange = (value, id, index) => {
        props.onUpdate(value, id , index, props.currentBookShelf)
    }
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.heading}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.bookSelf.map((value)=>(
                        <li key={value.id}>     
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${value.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    <select>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading" onClick={(e)=>handleChange(e.target.value, value.id, value.index)}>Currently Reading</option>
                                    <option value="wantToRead" onClick={(e)=>handleChange(e.target.value, value.id, value.index)}>Want to Read</option>
                                    <option value="read" onClick={(e)=>handleChange(e.target.value, value.id, value.index)}>Read</option>
                                    <option value="none" >None</option>
                                    </select>
                                </div>
                                </div>
                                <div className="book-title">{value.title}</div>
                                {value.authors.map((x, index)=> (
                                    <div key={index} className="book-authors">{x}</div>
                                ))}
                                
                            </div>
                        </li> 
                    ))}   
                </ol>
            </div>
        </div>
    )
}

export default Shelf;