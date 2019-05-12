import React, { Component } from 'react';
import DeleteBtn from '../components/DeleteBtn';
import Jumbotron from '../components/Jumbotron';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, TextArea, FormBtn } from '../components/Form';

class Books extends Component {
  state = {
    books: [],
    search: ''
  };



  saveBook = data => {
    console.log(data);

    API.saveBook(data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    API.searchBook('clean code')
      .then(res => {
        console.log(
          `Search did mount. Default search 'Clean Code': 
`,
          res.data.items
        );

        this.setState({ books: res.data.items, search: '' });
      })
      .catch(err => console.log(err));
    console.log(this.state.books);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.search) {
      // will need to refactor
      API.searchBook(this.state.search)
        .then(res => {
          console.log(res.data.items);

          this.setState({ books: res.data.items, search: '' });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>What Books Should I Read?</h1>
          <Row>
            <Col size="md-2" />

            <Col size="md-8">
              <form>
                <Input
                  value={this.state.search}
                  onChange={this.handleInputChange}
                  name="search"
                  placeholder="Title (required)"
                />

                <FormBtn
                  disabled={!this.state.search}
                  onClick={this.handleFormSubmit}
                >
                  Search Book
                </FormBtn>
              </form>
            </Col>
          </Row>
        </Jumbotron>
        <Row>
          <Col size="md-2" />
          <Col size="md-8">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                    <Row>
                      <Col size="md-9">
                        <a href={book.volumeInfo.previewLink} target="_blank">
                          <strong>
                            {book.volumeInfo.title} by {book.volumeInfo.authors}
                          </strong>
                        </a>

                        <p> {book.volumeInfo.description}</p>

                        <DeleteBtn


                          onClick={() =>
                            this.saveBook({
                              saved: book.id,
                              title: book.volumeInfo.title,
                              author: book.volumeInfo.authors,
                              synopsis: book.volumeInfo.description,
                              image: book.volumeInfo.imageLinks
                                ? book.volumeInfo.imageLinks.thumbnail
                                : `http://books.google.com/books/content?id=${
                                book.id
                                }&printsec=frontcover&img=1&zoom=1&source=gbs_api`,
                              link: book.volumeInfo.previewLink
                            })
                          }
                        />

                        {/* <Col size="4 md-2 image" /> */}

                        {/* needs to be changed to save book button */}
                      </Col>
                      <Col size="md-3">
                        <img
                          className="float-right"
                          src={
                            book.volumeInfo.imageLinks
                              ? book.volumeInfo.imageLinks.thumbnail
                              : `http://books.google.com/books/content?id=${
                              book.id
                              }&printsec=frontcover&img=1&zoom=1&source=gbs_api`
                          }
                          alt={book.volumeInfo.title}
                        />
                      </Col>
                    </Row>
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
