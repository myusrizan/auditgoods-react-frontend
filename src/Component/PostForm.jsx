import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../redux/action/postAction";
class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const post = {
            title: this.state.title,
            body: this.state.body
        };
        this.props.createPost(post);
        /* ACTION        
    fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(post)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    */
    }
    render() {
        return (
            <React.Fragment>
                <h1 className="text-center">Add post</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Title:</label>
                        <br />
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                        />
                    </div>
                    <br />
                    <div>
                        <label>Body:</label>
                        <br />
                        <textarea
                            name="body"
                            onChange={this.onChange}
                            value={this.state.body}
                        />
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}

PostForm.PropTypes = {
    createPost: PropTypes.func.isRequired
};

const connected = connect(
    null,
    { createPost }
)(PostForm);

export { connected as PostForm };
