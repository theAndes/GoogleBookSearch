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
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBooks()
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        {this.state.book.map(book => (
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>
                  {book.title} by {book.author}
                </h1>
                <p>{book.synopsis}</p>
                <p>
                  <img src={book.image} />
                </p>
              </Jumbotron>
            </Col>
          </Row>
        ))}
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Synopsis</h1>
              <p>{}</p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Authors</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
