import container from "../model/Model.js";

function ArticleCardTemplate(article, idx) {
    return `           
    <div class="card bg-light m-3">
        <div class="m-3 d-flex justify-content-between">
            <a href="Impression.html#${idx}"><strong>${article.title}</strong></a>
            <button class=" btn btn-sm btn-danger delete_btn">Delete</button>
        </div>
    </div>`
}

class AdminRenderer {
    constructor() {
        this.RenderArticlesList();
    };

    RenderArticlesList() {
        const articles = document.querySelector(".articles");
        articles.innerHTML = '';
        container.ideas.forEach((idea, idx) => { articles.innerHTML += ArticleCardTemplate(idea, idx) });
    }

    AddArticle() {
        const articles = document.querySelector(".articles");
        articles.innerHTML += ArticleCardTemplate(container.ideas[container.ideas.length - 1], container.ideas.length - 1);
    }
}


let renderer = new AdminRenderer()
export default renderer;





