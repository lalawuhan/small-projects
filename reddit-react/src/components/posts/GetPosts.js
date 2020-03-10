import React, { Component } from "react";
import axios from "axios";

class GetPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            posts: []
        };
    }
    componentDidMount() {
        //I will use the 'fake api' json by reddit and it will return 100 posts
        /* fetch("https://www.reddit.com/r/Showerthoughts/hot/.json")
            .then(response => response.json())
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        redditposts: result.data.children
                    });
                },
                //handling the error
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            ); */
        axios
            .get(`https://www.reddit.com/r/Showerthoughts/hot/.json`)
            .then(response => {
                const posts = response.data.data.children.map(obj => obj.data);
                this.setState({
                    posts
                });
            });
    }
    render() {
        //assign state values as variables, so we ca refer to them as redditposts instead of this.state.posts
        const { error, isLoaded } = this.setState;
        if (error) {
            return <div>Error in loading posts</div>;
        } else if (!isLoaded) {
            return (
                <div className="main">
                    {this.state.posts.map(post => (
                        <div className="postholder" key={post.id}>
                            <p>Author : {post.author}</p>
                            <p>{post.title}</p>
                        </div>
                    ))}
                </div>
            );
        }
    }
}
export default GetPosts;
