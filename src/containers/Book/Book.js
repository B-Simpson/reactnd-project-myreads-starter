import React from 'react'

const Book = (props) => {
    return(
        <ol className="books-grid">
            {props.bookSelf.map((value)=>(
                <li key={value.id}>     
                    <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${value.imageLinks.smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select  onChange={(e)=>props.handleChange(e.target.value, value.id)} defaultValue={props.currentBookShelf}>       
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
                </li> 
            ))}   
        </ol>
    )
}

export default Book