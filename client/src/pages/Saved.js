import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
import { log } from 'util';
import Books from './Search';

class Detail extends Component {
  state = {
    book: []
  };
  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  };
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    this.loadBooks()
  }

  render() {
    return (
      <Container fluid>
        <Row>
          {this.state.book.map(book => (


            <Col size="md-3">

              <div className="card" style={{ width: '18rem' }}>
                <img src={book.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{book.title} by {book.author}</h5>
                  <p className="card-text">{book.synopsis}</p>
                  <button onClick={() => this.deleteBook(book._id)} className="btn btn-primary">Delete from library</button>
                </div>
              </div>

            </Col>

          ))}
        </Row>

        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Search</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
