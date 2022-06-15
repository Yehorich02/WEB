import container from "../model/Model.js";
import renderer from "../view/ArticleConstructorView.js"
class ArticlesManager {
    constructor() {
        this.add_button = document.getElementById('add_button');
        this.delete_button = document.querySelectorAll("delete_button");

        this.ConstructAddButton();
        this.ConstructDeleteButton();
    }

    ConstructAddButton() {
        this.add_button.addEventListener("click", () => {
            if (document.getElementById("title").value && document.getElementById("article").value && document.getElementById("short").value) {
                container.AddArticle(document.getElementById("title").value, document.getElementById("article").value, document.getElementById("short").value);
                renderer.AddArticle();
            }
            else {
                alert("Fill in all the fields. The reader will find it more interesting.");
            }
        });
    }

    ConstructDeleteButton() {
        this.delete_button.forEach((button, idx) => {
            button.addEventListener("click", () => {
                container.ideas.slice(idx, 1);
                location.reload();
            })
        });
    }
}

let controller = new ArticlesManager();
export default controller;