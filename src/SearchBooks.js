import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		searchingBooks: PropTypes.array.isRequired,
		onMoveBook: PropTypes.func.isRequired,
		onSearchBooks: PropTypes.func.isRequired,
		updateQuery: PropTypes.func.isRequired,
		query: PropTypes.string.isRequired
	}

	handleInputChange = (event) => {
		event.preventDefault();
		this.props.updateQuery(event.target.value)
			.then(() => {
				if (this.props.query) {
					this.props.onSearchBooks();
				}
			});
	}

	clearQuery = () => {
		this.updateQuery('');
	}

	render() {
		const { books, searchingBooks, onMoveBook, query } = this.props;
		let searchingBooksWithShelfProp = null;
		let showingBooks = null;

		if (query && searchingBooks.length) {
			/**
			 * merge my books list with searching books, adding the property shelf
			 */
			searchingBooksWithShelfProp = searchingBooks.map((book) => ({ ...book, shelf: '' }));
			if (books.length) {
				books.forEach((book) => {
					searchingBooksWithShelfProp = searchingBooksWithShelfProp.filter((b) => b.id !== book.id);
				});
			}
			showingBooks = Object.assign(searchingBooksWithShelfProp, books);
		}

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>

					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							value={query}
							onChange={(event) => this.handleInputChange(event)}
						/>
					</div>
				</div>

				<div className="search-books-results">
					<ol className="books-grid">
						{showingBooks !== null && showingBooks.map((book) => (
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

export default SearchBooks