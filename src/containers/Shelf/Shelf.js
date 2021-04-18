
import React from 'react';


const Shelf = (props) => {

    const handleChange = (book, shelf ) => {
        props.onUpdate(book, shelf, props.currentBookShelf)
    }

    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.heading}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((value)=>(
                        props.bookSelf === value.shelf ? 
                        <li key={value.id}>     
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${value.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    <select onChange={(e)=>handleChange(value.id, e.target.value)} defaultValue={props.bookSelf}>       
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead" >Want to Read</option>
                                        <option value="read" >Read</option>
                                        <option value="none" >None</option>
                                    </select>
                                </div>
                                </div>
                                <div className="book-title">{value.title}</div>
                                {value.authors.map((x, index)=> (
                                    <div key={index} className="book-authors">{x}</div>
                                ))}
                                
                            </div>
                        </li> : null
                    ))}   
                </ol>
            </div>
        </div>
    )
}

export default Shelf;