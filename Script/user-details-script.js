// На сторінці user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для отримання постів використовуйте https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Кожному посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
let url = new URL(location.href);
let userId = url.searchParams.get('id')

let mainBlock = document.getElementById('main');
let h = document.createElement('h1');
let button = document.getElementById('postOf');
let postBlock = document.getElementById('postBlock')

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(user => user.json())
    .then(user =>{

        mainBlock.appendChild(h);
        h.innerText = user.name;

        function iterator (arr){
            for (let item in arr) {
                if (typeof arr[item] === "object"){
                    iterator(arr[item]);
                } else {
                    let div = document.createElement('div');

                    div.classList.add('block');
                    div.innerText = item + ':' +' '+ arr[item];
                    mainBlock.appendChild(div);
                }
            }
        }
        iterator(user);
    })


button.onclick = (ev) => {
    button.style.display = 'none';
    ev.preventDefault();

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(posts => posts.json())
        .then(posts => {
            for (let item in posts) {
                let div = document.createElement('div');
                let h = document.createElement('h3');
                let p = document.createElement('p');
                let button = document.createElement('button')

                div.classList.add('post');
                postBlock.appendChild(div);
                div.append(h, p,button);

                h.innerText = 'Title' + ' ' + posts[item].id;
                p.innerText = posts[item].title;
                button.innerText = 'More...'


                button.onclick = () =>{
                    location.href = 'post-details.html?userid=' + posts[item].userId + '&postid=' + posts[item].id;
                }
            }
        })
}