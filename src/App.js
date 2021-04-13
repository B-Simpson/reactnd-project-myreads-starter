import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './containers/Shelf/Shelf'

class BooksApp extends React.Component {
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
    
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      books:[],
      currentlyReading: [],
      wantToRead: [],
      read:[],
      showSearchPage: false,
    }    
  }
  
  componentDidMount(){
    BooksAPI.getAll()
    .then((books)=> {
      this.setState({books: books})   
      this.sortBooks(); 
    })
   
  }

  //Push books to corret array.
  sortBooks(){  
    for(let current of this.state.books){
      if(current.shelf === "currentlyReading"){
        this.setState({currentlyReading: [...this.state.currentlyReading, current]})
      }
      if(current.shelf === "wantToRead"){
        this.setState({wantToRead: [...this.state.wantToRead, current]})
      }
      if(current.shelf === "read"){
        this.setState({read: [...this.state.read, current]})
      }
    }
    console.log(this.state.books)
  }   

  handleChange(value, id, index, currentBookShelf){

    //Remove the book from the shelf 
    if(currentBookShelf !== value){
      this.setState({
        [`${currentBookShelf}`]: 
        [...this.state[`${currentBookShelf}`].filter( 
          el => {
            return el.id !== id
          }
        )]
      })
    }
    
    //Move the book to the newly selected shelf
    if(!this.state[`${value}`].some(books => books.id === id)){
      this.setState({
        [`${value}`]: 
        [...this.state[`${value}`].concat( 
          this.state.books.filter(el => {
            return el.id === id
          })
        )]
      })
    }


    setTimeout(()=> {
      console.log(this.state.currentlyReading)
    },500)
    
  }

  render() {

    //Get all books all to all books. 
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf 
                  bookSelf={this.state.currentlyReading}
                  heading ="Currently Reading"
                  currentBookShelf="currentlyReading"
                  onUpdate ={this.handleChange}
                />
                <Shelf 
                  bookSelf={this.state.wantToRead}
                  heading ="Want to Read"
                  currentBookShelf="wantToRead"
                  onUpdate ={this.handleChange}
                />
                <Shelf 
                  bookSelf={this.state.read}
                  heading ="Read"
                  currentBookShelf="read"
                  onUpdate ={this.handleChange}
                />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
