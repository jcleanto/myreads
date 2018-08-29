import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

	static propTypes = {
		book: PropTypes.object.isRequired,
		onMoveBook: PropTypes.func.isRequired
	}

	render() {
		const { book, onMoveBook } = this.props;
		let bookURL = 'url()';

		if (book.imageLinks !== undefined && book.imageLinks.thumbnail !== undefined) {
			bookURL = 'url(' + book.imageLinks.thumbnail + ')';
		}

		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{
						width: 128,
						height: 193,
						backgroundImage: bookURL
					}} alt="No Thumbnail"></div>
					<div className="book-shelf-changer">
						<select name="shelf" value={(book.shelf)?book.shelf:'none'} onChange={(event) => onMoveBook(book, event.target.value)}>
							<option value="move" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors}</div>
			</div>
        )
	}

}

export default Book