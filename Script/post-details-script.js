//     На сторінці post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
let url = new URL(location.href);
let userId = JSON.parse(url.searchParams.get('userid'));
let url2 = new URL(location.href);
let postId = JSON.parse(url2.searchParams.get('postid'));

let mainBlock = document.getElementById('mainBlock');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then(posts => posts.json())
    .then(posts => {
        let h = document.createElement('h1');

        h.innerText = 'Title' + ' ' + postId;
        mainBlock.appendChild(h)

        for (let post of posts) {
            if (postId === post.id){
                for (let item in post) {
                    let div = document.createElement('div');
                    div.classList.add('block');

                    mainBlock.appendChild(div);

                    div.innerText = item + ':' + ' ' + post[item];
                }
            }
        }
    })

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(comments => comments.json())
    .then(comments => {
        let postBlock = document.getElementById('postBlock');

        for (let comment in comments) {
            console.log(comments[comment]);
            let mainDiv = document.createElement('div');
            let postIdDiv = document.createElement('div');
            let idDiv = document.createElement('div');
            let nameDiv = document.createElement('div');
            let emailDiv = document.createElement('div');
            let bodyDiv = document.createElement('div');

            postBlock.appendChild(mainDiv);
            mainDiv.append(postIdDiv, idDiv, nameDiv, emailDiv, bodyDiv);

            mainDiv.classList.add('post');
            postIdDiv.classList.add('block-post');
            idDiv.classList.add('block-post');
            nameDiv.classList.add('block-post');
            emailDiv.classList.add('block-post');
            bodyDiv.classList.add('block-post');

            postIdDiv.innerText = 'Post Id:' + comments[comment].postId;
            idDiv.innerText = 'Id:' + comments[comment].id;
            nameDiv.innerText = 'Name:' + comments[comment].name;
            emailDiv.innerText = 'Email:' + comments[comment].email;
            bodyDiv.innerText = 'Body:' + comments[comment].body;
        }
})
