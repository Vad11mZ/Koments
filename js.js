async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    displayUsers(users);
}

function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'user';
        userElement.textContent = user.name;
        userElement.addEventListener('click', () => fetchPosts(user.id));
        usersList.appendChild(userElement);
    });
}

async function fetchPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await response.json();
    displayPosts(posts);
}

async function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    for (const post of posts) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <div class="comments" id="comments-${post.id}"></div>
        `;
        
        postsContainer.appendChild(postElement);
        const comments = await fetchComments(post.id);
        displayComments(post.id, comments);
    }
}

async function fetchComments(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    return await response.json();
}

function displayComments(postId, comments) {
    const commentsContainer = document.getElementById(`comments-${postId}`);
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <strong>${comment.name}</strong> (${comment.email})
            <p>${comment.body}</p>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

document.addEventListener('DOMContentLoaded', fetchUsers);