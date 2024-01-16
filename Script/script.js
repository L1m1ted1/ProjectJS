// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули
fetch('https://jsonplaceholder.typicode.com/users')
    .then(users => users.json())
    .then(users => {

        let mainBlock = document.createElement('div');
        document.body.appendChild(mainBlock);
        mainBlock.classList.add('mainBlock')

        for (let user of users) {
            let div = document.createElement('div');
            let h = document.createElement('h2');
            let button = document.createElement('button');

            mainBlock.appendChild(div);
            div.append(h, button);
            div.classList.add('block');

            h.innerText = user.id + '.' + user.name;
            button.innerText = 'More Info'
            button.onclick= ()=> {
                location.href = './user-details.html?id=' + user.id;
            }
        }
    })

// Стилизація проєкта -
//     index.html - всі блоки з user - по 2 в рядок. кнопки/посилання розташувати під інформацією про user.
//     user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//     блоки з короткою іфною про post - в ряд по 5 .
//     post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)