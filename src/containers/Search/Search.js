import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

class Search extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
    }

    state = {
        query: "",
    }

    updateSearch = (query) => {
        this.setState(()=> ({
            query: query.trim()
        }))
    }

    clearQuery = () => {
        this.updateSearch('')
    }

    render(){
        const {query} = this.state;
        const { books } = this.props;

        

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
                    <ol className="books-grid"></ol>
                </div>
            </div>
        )
    }   
}

export default Search