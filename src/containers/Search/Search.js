import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import * as BooksAPI from '../../BooksAPI'


class Search extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
    }
    state = {
        query: "",
        books: [],
        allCurrentBooks: this.props.books,
    }

    updateSearch = (query) => {
        
        this.setState(() => ({
            query: query.trim()
        }))

        const search = () => BooksAPI.search(query)
            .then((books) => {
                if (books.error !== "") {
                    this.setState({ books: [...books] })
                }
            })

        async function searchResults() {
            await search();
        }
        searchResults()

    }

    clearQuery = () => {
        this.updateSearch('')
    }

    handleChange = (book, shelf) => {
        this.props.onUpdate(book, shelf, this.props.currentBookShelf)
    }

    render() {
        const { query } = this.state;

        const showingBooks = this.state.books;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                        <input type="text" value={query} placeholder="Search by title or author" onChange={(event) => this.updateSearch(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((value, index) => {
                            const currentBooksOnShelf = this.props.books.find(
                                ({id}) => value.id === id
                            );
                            const shelf = currentBooksOnShelf ? currentBooksOnShelf.shelf : 'none'
                            return (
                            <li key = { value.id }>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${value.imageLinks.smallThumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select
                                                onChange={(e) => this.handleChange(value.id, e.target.value)}
                                                defaultValue={shelf}
                                            >
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead" >Want to Read</option>
                                                <option value="read" >Read</option>
                                                <option value="none" >None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{value.title}</div>
                                    <div key={index} className="book-authors">{value.authors}</div>
                                </div>
                            </li>
                            )
                        })} 
                    </ol>
            </div>
            </div >
        )
    }
}

export default Search