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
      this.sortBooks();      
    }) 
    setTimeout(()=> {
      this.setState({isLoading: false})
      // console.log(this.state.books) 
    },1000)
    
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
  }   

  handleChange(book, shelf){
    
    BooksAPI.update(book, shelf)
    .then((books)=>{
      const updatedBooks = this.state.books.map(b => {
        if (b.id === book) {
          b.shelf = shelf; 
        }
        return b;
      });

      this.setState({books: updatedBooks})

      this.setState((currentState) => 
        ({ books: currentState.books.filter((b) => 
            b.id !== book).concat([book]) 
          })
      );

      BooksAPI.getAll()
      .then((books)=> {
        this.setState({books: books})       
      }) 
      
      setTimeout(()=> {
        console.log(books)
      },500)
      
    })


    // //Remove the book from the shelf 
    // if(currentBookShelf !== value){
    //   this.setState({
    //     [`${currentBookShelf}`]: 
    //     [...this.state[`${currentBookShelf}`].filter( 
    //       el => {
    //         return el.id !== id
    //       }
    //     )]
    //   })
    // }
    
    // //Move the book to the newly selected shelf
    // if(!this.state[`${value}`].some(books => books.id === id)){
    //   this.setState({
    //     [`${value}`]: 
    //     [...this.state[`${value}`].concat( 
    //       this.state.books.filter(el => {
    //         return el.id === id
    //       })
    //     )]
    //   })
    // }
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
