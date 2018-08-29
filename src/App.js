import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends Component {

  state = {
    books: [],
    searchingBooks: [],
    query: ''
  }

  async componentDidMount() {
  	const books = await BooksAPI.getAll()
  	this.setState({ books })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
	book.shelf = shelf;    
	this.setState(state => ({
  		books: state.books.filter(b => b.id !== book.id).concat(book),
	}));
  }

  searchBooks = () => {
    BooksAPI.search(this.state.query)
      .then((searchedBooks) => {
        if (searchedBooks.error === undefined) {
          this.setState({ searchingBooks: searchedBooks });
        } else {
          this.setState({ searchingBooks: [] });
        }
      })
      .catch((error) => {
      	this.setState({ searchingBooks: [] });
        console.log('An error ocurred: ' + error);
      });
  }

  updateQuery = (query) => {
    return new Promise((resolve, reject) => {
      resolve(this.setState({ query }));
    });
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            onMoveBook={this.moveBook}
            books={books}
      		updateQuery={this.updateQuery}
          />
        )} />
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            onMoveBook={this.moveBook}
            onSearchBooks={this.searchBooks}
            books={this.state.books}
            searchingBooks={this.state.searchingBooks}
            query={this.state.query}
            updateQuery={this.updateQuery}
          />
        )} />
      </div>
    )
  }

}

export default BooksApp
