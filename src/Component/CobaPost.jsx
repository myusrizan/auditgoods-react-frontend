import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../redux/action/postAction";

class CobaPost extends Component {
    /*
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }
*/
    componentWillMount() {
        this.props.fetchPosts();
        /*    fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            //.then(data => console.log(data));
            .then(data => this.setState({ posts: data }));
    */
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost);
            //this.props.posts.push(nextProps.newPost) kalo mau ditaro di belakang
        }
    }

    render() {
        const postItems = this.props.posts.map(post => (
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        ));
        return (
            <React.Fragment>
                <h1 className="text-center">Ini content</h1>
                <div className="m-auto w-90">{postItems}</div>
            </React.Fragment>
        );
    }
}

CobaPost.PropTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
};

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
});

const connected = connect(
    mapStateToProps,
    { fetchPosts }
)(CobaPost);
export { connected as CobaPost };
