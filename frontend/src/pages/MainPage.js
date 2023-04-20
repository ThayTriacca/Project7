import React, { Component} from "react";
import { BACKEND } from "../global";
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import PostCard from '../components/PostCard';

import '../styles/App.css';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetch(`${BACKEND}/post`)
            .then((res) => res.json())
            .then((data) => {
                this.setState({ loaded: true, posts: data });
            })
            .catch((error) => { });
    }


    render() {
        const {posts, loaded} = this.state;
        return (
            <div className="App">
                <ResponsiveAppBar />
                <div className='Body'>
                    {loaded && this.state.posts.length > 0 ? (
                        this.state.posts.map(item => (
                            <PostCard post={item} key={item.id} />
                        ))
                    ) : (
                        <p>No posts found.</p>
                    )}
                </div>
            </div>
        );
    }

};


export default MainPage;
