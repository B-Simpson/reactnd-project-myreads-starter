import React from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";

import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './containers/Shelf/Shelf'
import Search from './containers/Search/Search'

class BooksApp extends React.Component {
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      sections: [
        {   
          heading :"Currently Reading",
          id:"currentlyReading"
        },
        {   
          heading :"Want to Read",
          id:"wantToRead"
        },
        {   
          heading :"Read",
          id:"read"
        }
      ],
      books:[],
      currentlyReading: [],
      wantToRead: [],
      read:[],
      isLoading: true
    }    
  }
  
  componentDidMount(){
    BooksAPI.getAll()
    .then((books)=> {
      this.setState({books: books})   
    }) 
    setTimeout(()=> {
      this.setState({isLoading: false})
    },1000)   
  }


  handleChange = async (book, shelf)=>{

    await BooksAPI.update(book,shelf).then(
      this.setState((currentState) => ({
          books: currentState.books.filter((b) => {
            if (b.id === book.id) {
              b.shelf = shelf;  
            }
          return b;
        }) 
      }))
    );
    await BooksAPI.getAll()
    .then((books)=> {
      this.setState({books: books})   
    }) 
  }

  render() {

    //Get all books all to all books. 
    return (
      <BrowserRouter>
        {!this.state.loading ?
          <div className="app">
            <Route path="/search" exact render={ ()=>
              <Search 
                books={this.state.books}
                onUpdate ={this.handleChange}
              />
            }/>
            
            <Route path="/" exact render={ ()=>
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {this.state.sections.map((value)=>(
                      <Shelf 
                        key={value.id}
                        bookSelf={value.id}
                        books={this.state.books}
                        heading ={value.heading}
                        onUpdate ={this.handleChange}
                      />
                    ))}
                </div>
                <div className="open-search">
                <Link to="/search"><button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button></Link>
                </div>
              </div>
            } /> 
          </div>
        : null
        }
      </BrowserRouter> 
    )
  }
}

export default BooksApp
