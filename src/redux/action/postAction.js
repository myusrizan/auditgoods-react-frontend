import { FETCH_POSTS, NEW_POST, GET_TEST } from "./types";

/*
export function fetchPosts() {
    return function(dispatch) {
  
*/
export const fetchPosts = () => dispatch => {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        //.then(data => console.log(data));
        .then(posts => dispatch({ type: FETCH_POSTS, payload: posts }));
};

export const createPost = postData => dispatch => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(postData)
    })
        .then(res => res.json())
        .then(post => dispatch({ type: NEW_POST, payload: post }));
};

export const getTest = getTest => dispatch => {
    fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: getTest
    })
        .then(res => res.json())
        .then(coba => dispatch({ type: GET_TEST, payload: coba }));
};
