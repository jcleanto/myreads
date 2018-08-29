import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import * as Utils from './utils/Utils'

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired,
      	onUpdateQuery: PropTypes.func.isRequired
    }

	handleLinkClick = (event) => {
		this.props.updateQuery('');
	}

    render() {

        const { books, onMoveBook } = this.props;
        let groupedBookshelves = Utils.groupBy(books, 'shelf');

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {groupedBookshelves.map((bookshelf) => (
                        <div key={bookshelf.name}>
                            <BookShelf
                                bookshelf={bookshelf}
                                onMoveBook={onMoveBook}
                            />
                        </div>
                    ))}
                </div>
                <div className="open-search">
                    <Link to="/search">
						<div>
							<a onClick={(event) => this.handleLinkClick(event)}>Add a book</a>
						</div>
					</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks