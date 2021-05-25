import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Container, Form, Button } from 'react-bootstrap';
import './styles.css';
export default class NewBlogPost extends Component {
  state = {
    readTime: {
      value: '',
      unit: '',
    },
    title: '',
    category: 'Category1',
    content: '',
    formData: [],
  };
  handleFileChange = (e) => {
    const formData = new FormData();
    if (e.target.files[0]) {
      formData.append('coverPicture', e.target.files[0]);
      this.setState((state) => {
        return { formData: formData };
      });
    }
  };

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  }
  fileUpload = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/blogPosts/${id}/uploadCover`,
        {
          method: 'POST',
          body: this.state.formData,
        }
      );
      if (!response.ok) throw 'something went wrong';
    } catch (error) {}
  };

  addNewPost = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch('http://localhost:3001/blogPosts/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      });
      if (!response.ok) {
        throw 'something went wrong';
      } else {
        let data = await response.json();
        this.fileUpload(data.id);
        alert('Succesfully added');
      }
    } catch (error) {}
  };
  editPost = async (e) => {};
  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={(e) => this.addNewPost(e)}>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              id="title"
              size="lg"
              placeholder="Title"
              onChange={(e) => this.handleChange(e)}
              value={this.state.title}
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              id="category"
              size="lg"
              as="select"
              onChange={(e) => this.handleChange(e)}
              value={this.state.category}
            >
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <Form.Control
              id="content"
              as="textarea"
              rows="20"
              classsName="new-blog-content"
              onChange={(e) => this.handleChange(e)}
              value={this.state.content}
            />
            {/* <ReactQuill
              id="content"
              value={this.state.content}
              onChange={this.handleContent}
              className="new-blog-content"
            /> */}
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: '1em' }}
            >
              Submit
            </Button>
          </Form.Group>
          <Form>
            <Form.File
              id="coverPicture"
              label="coverPicture"
              data-browse="Browse"
              onChange={(e) => this.handleFileChange(e)}
              custom
            />
          </Form>
        </Form>
      </Container>
    );
  }
}
