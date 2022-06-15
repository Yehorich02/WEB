import container from "../model/Model.js";

function IdeaTemplate(idea) {
    let result = `<div class="card shadow-sm">
        <img class="card-img-top" src="${idea.image}" alt="Card image cap">
        <div class="card-body">
        <h1 class="card-title display-4">${idea.title}</h1>
        <p class="card-text">`
    result += idea.full_text;
    result += `</div></div>`;
    return result;
}

function CommentTemplate(comment) {
    return ` <div class="card bg-light">
            <div class="card-body">
                <h5 class="card-title">@${comment.author}</h5>
                <p class="card-text">${comment.text}</p>
            </div>
        </div>`;
}

function ProfileTemplate() {
    let path = '';
    if (document.URL.indexOf('source') === -1)
        path = 'source\\';
    if (container.IsLogIn()) {
        return `<a class="btn btn-outline-link" href="${path}Profile.html">@${container.Username()}</a>`;
    }
    else {
        return `<a class="btn btn-outline-link" href="${path}SigIn.html">Sign in</a>
        <a class="btn btn-outline-secondary" href="${path}SignUp.html">Sign up</a>`
    }
}

function ShortIdeaTemplate(idea) {
    return `<div class="col">
        <div class="card shadow-sm">
            <img class="card-img-top" src="${idea.image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${idea.title}</h5>
                <p class="card-text">${idea.short}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <a type="button" class="btn btn-sm btn-outline-secondary read_btn">Read more...</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}

function ProfileInfoTemplate(profile) {
    return `
        <tbody>
        <tr>
            <th scope="row"></th>
            <td>E-mail</td>
            <td>${profile.email}</td>
        </tr>
        <tr>
            <th scope="row"></th>
            <td>Date of birdth</td>
            <td>${profile.date}</td>
        </tr>
        <tr>
            <th scope="row"></th>
            <td>Gender</td>
            <td>${profile.gender}</td>
        </tr>
        </tbody>
    `;
}

class Renderer {
    constructor() {
        this.RenderArticle();
        this.RenderComments();
        this.RenderProfile();
        this.RenderArticlesAlbum();
        this.RenderProfileInfo();
    };

    RenderProfile() {
        const profile_container = document.querySelector(".profile");
        if (!profile_container) return;
        profile_container.innerHTML += ProfileTemplate();
    }

    RenderArticle() {
        const idea_container = document.querySelector(".idea");
        if (!idea_container) return;
        const idea = container.ideas[parseInt(document.URL.split('#')[1])];
        idea_container.innerHTML += IdeaTemplate(idea);
    }

    RenderComments() {
        const comments_container = document.querySelector(".comment");
        if (!comments_container) return;
        const comments = container.ideas[parseInt(document.URL.split('#')[1])].comments;
        comments_container.innerHTML = '';
        for (let idx = comments.length - 1; idx >= 0; --idx)
            comments_container.innerHTML += CommentTemplate(comments[idx]);
    }

    RenderArticlesAlbum() {
        let ideas_list = document.querySelector(".ideas_list");
        if (!ideas_list) return;
        container.ideas.forEach((idea, idx) => { ideas_list.innerHTML += ShortIdeaTemplate(idea) });
    }

    RenderProfileInfo() {
        const profile_info = document.querySelector(".profile_info");
        if (!profile_info) return;
        let profile = container.profiles[sessionStorage.getItem("email")];
        console.log(profile);
        profile_info.innerHTML += ProfileInfoTemplate(profile);
    }
}

let renderer = new Renderer();
export default renderer;






