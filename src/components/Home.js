import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.__fetchDataFromServer();
    }

    __fetchDataFromServer() {
        axios.get('http://localhost:5000/blog/posts').then(data => {
            this.setState({ posts: data.data })
        })
    }

    deletePost(id) {
        axios.delete(`http://localhost:5000/blog/delete?postID=${id}`).then(data => {
            window.location.reload()
        })
    }

    render() {
        const posts = this.state.posts;
        return (
            <div className="App">
                <div className="">

                    {posts.length === 0 && (
                        <div>
                            <p className={'post-placeholder'}>No post found at the moment</p>
                        </div>
                    )}

                    <div className="container">
                        <div className="row">
                            {posts && posts.map(post =>
                                <div className="col-md-4" key={post._id}>
                                    <div className="card mb-4 shadow-sm">
                                        <div className="card-body">
                                            <h2 className="card-img-top">{post.title}</h2>
                                            <p className="card-text">{post.body}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deletePost(post._id)}>Delete Post</button>
                                                </div>
                                            </div>

                                            <div className="card-footer">
                                                <small className="text-muted">by: {post.author} </small>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default Home;