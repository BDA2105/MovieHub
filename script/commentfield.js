let posts;

loadComments();

function loadComments(){
    posts = JSON.parse(JSON.stringify(comments));
    showComments();
}

function showComments(){
    let commentField = document.getElementById('comment-field');
    let out = '';
    posts.forEach(function (item){
        out +=`<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
        out +=`<p class="alert alert-primary">${item.username}</p>`;
        out +=`<p class="alert alert-primary">${item.film}</p>`;
        out +=`<p class="alert alert-success">${item.text}</p>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}