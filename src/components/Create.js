import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            description: '',
            body: '',
            author: 'Olususi Oluyemi',
            submitted: false,
        }
        this.createPost = this.createPost.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    createPost = (e) => {
        e.preventDefault();
        const postData = {
            id: this._timeInMilliseconds(),
            title: this.state.title,
            description: this.state.description,
            body: this.state.body,
            author: this.state.author
        }
        this.setState({ submitted: true });
        this.__submitToServerAndRedirect(postData);
    }

    __submitToServerAndRedirect(postData) {
        axios.post('http://localhost:5000/blog/post', postData).then(data => {
            this.__redirectToHome();
        })
    }

    __redirectToHome() {
        setTimeout(() => {
            this.props.history.push('/');
        }, 1500);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    _timeInMilliseconds() {
        const date = new Date();
        return date.getTime();
    }
    
    render() {
        const submitted = this.state.submitted;
        return (
            <div className="App">
                {submitted && (
                    <div className="alert alert-info" role="alert">
                        Post submitted successfully
                    </div>
                )}

                <h1>Cypress React App Test</h1>
                <p> End to end testing of a React.js application using Cypress.io </p>

                <div className={'col-md-12 form-wrapper'}>
                    <h2> Create Post </h2>
                    <form id="create-post-form" onSubmit={(e) => { this.createPost(e) }}>
                        <div className="form-group col-md-12">
                            <label htmlFor="title"> Title </label>
                            <input type="text" id="title" autoFocus name="title" onChange={(e) => { this.handleInput(e) }} className="form-control" placeholder="Enter title" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="description"> Description </label>
                            <input type="text" id="description" name="description" onChange={(e) => { this.handleInput(e) }} className="form-control" placeholder="Enter Description" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="body"> Write Content </label>
                            <input type="text" id="body" name="body" onChange={(e) => { this.handleInput(e) }} className="form-control" placeholder="Enter Content here" />
                        </div>

                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit"> Create Post </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create);