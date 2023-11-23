async function loadPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    return data
}
async function PostPages() {
        const posts = await loadPosts()
    return <div>
        {
            posts.map(post => (
                <div key={post.id}>
                    <h3>{post.id}. {post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))
        }
    </div>
}
export default PostPages