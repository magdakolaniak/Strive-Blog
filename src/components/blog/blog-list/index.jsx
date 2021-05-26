import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import BlogItem from '../blog-item';
// import posts from "../../../data/posts.json";
export default class BlogList extends Component {
  state = {
    posts: [],
  };

  componentDidMount = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      let response = await fetch(`${apiUrl}/blogPosts`);
      if (response.ok) {
        let data = await response.json();
        this.setState({
          posts: data,
        });
      } else {
        console.log('Error while getting response');
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Row>
        {this.state.posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
