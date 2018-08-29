import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {

    static propTypes = {
        bookshelf: PropTypes.object.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }

    render() {

        const { bookshelf, onMoveBook } = this.props;
        const bookshelfTitles = {
            'currentlyReading': 'Currently Reading',
            'wantToRead': 'Want to Read',
            'read': 'Read' 
        };

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelfTitles[bookshelf.name]}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {bookshelf.books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    onMoveBook={onMoveBook}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }

}

export default BookShelf