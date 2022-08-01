import React from 'react';
import axios from 'axios';

const url = "https://jsonplaceholder.typicode.com/users"

export default function Fetch() {
    const [post, setPost] = React.useState([]);

    React.useEffect(() => {
        axios.get(url).then((response) => {
            setPost(response.data);
            });
        }, []);
        // console.log(post)
    return (
        <div>
            <h3>Usernames:</h3>
            {post.map((user)=>{
                return <p>{user["username"]}</p>
            })}
        </div>
    )
}
