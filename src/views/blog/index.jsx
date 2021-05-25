import React, { Component } from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import BlogAuthor from '../../components/blog/blog-author';
// import posts from '../../data/posts.json';
import './styles.css';
class Blog extends Component {
  state = {
    blog: {},
    loading: true,
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    try {
      let response = await fetch('http://localhost:3001/blogPosts');
      if (response.ok) {
        let data = await response.json();
        console.log(data[1]._id);
        const blog = data.find((post) => post._id === id);
        if (blog) {
          console.log(blog);
          this.setState({ blog, loading: false });
        } else {
          this.props.history.push('/404');
        }
      } else {
        console.log('Error while getting response');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   console.log(posts);
  //   const blog = posts.find((post) => post._id.toString() === id);
  //   if (blog) {
  //     this.setState({ blog, loading: false });
  //   } else {
  //     this.props.history.push("/404");
  //   }
  // }

  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            <div className="d-flex">
              <Button variant="success">EDIT</Button>

              <Button variant="danger">Delete</Button>
            </div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
