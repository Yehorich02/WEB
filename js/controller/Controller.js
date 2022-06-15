import container from "../model/Model.js";
import renderer from "../view/Render.js"

class EventManager {
    constructor() {
        this.comment_button = document.getElementById('comment_button');
        this.read_button = document.querySelectorAll("read_button");
        this.sign_in_form = document.getElementById('sign_in');
        this.sign_up_form = document.getElementById('sign_up');
        this.log_out_button = document.getElementById('log_out');

        this.ConstructCommentButton();
        this.ConstructReadButton();
        this.ConstructSignInButton();
        this.ConstructSignUpButton();
        this.ConstructLogOutButton();
    }

    ConstructCommentButton() {
        if (!this.comment_button) return;
        this.comment_button.addEventListener("click", () => {
            if (container.IsLogIn()) {
                if (document.getElementById("Comment").value) {
                    container.AddComment(parseInt(document.URL.split('#')[1]), document.getElementById("Comment").value);
                    renderer.RenderComments();
                }
                else
                    alert("We know you have something to say. Write more than nothing.");
            }
            else
                alert('You must be logged in to post a comment')
        });
    }

    ConstructReadButton() {
        if (!this.read_button) return;
        this.read_button.forEach((button, idx) => {
            button.addEventListener("click", () => {
                document.location.href = "Impression.html#" + idx;
            })
        });
    }

    ConstructLogOutButton() {
        if (!this.log_out_button) return;
        this.log_out_button.addEventListener("click", () => {
            sessionStorage.setItem('email', '');
            sessionStorage.setItem('username', '');
            document.location.href = "../Home.html";
        });
    }

    ConstructSignInButton() {
        if (!this.sign_in_form) return;
        this.sign_in_form.addEventListener("submit", () => {
            if (container.profiles[document.getElementById("inputEmail").value].password ==
                document.getElementById("inputPassword").value) {
                sessionStorage.setItem('username', container.profiles[document.getElementById("inputEmail").value].username);
                sessionStorage.setItem('email', document.getElementById("inputEmail").value);
            }
        });
    }

    ConstructSignUpButton() {
        if (!this.sign_up_button) return;
        this.sign_up_button.addEventListener("submit", () => {
            if (!container.profiles[document.getElementById("inputEmail").value]
            ) {
                container.profiles[document.getElementById("inputEmail").value] = {
                    "username": document.getElementById("inputUsername").value,
                    "email": document.getElementById("inputEmail").value,
                    "date": document.getElementById("date").value,
                    "password": document.getElementById("inputPassword").value,
                };
                sessionStorage.setItem('username', container.profiles[document.getElementById("inputEmail").value].username);
                sessionStorage.setItem('email', document.getElementById("inputEmail").value);
                document.location.href = "Profile.html";
            }
            else
                alert("Email is already taken.")
        });
    }
}

let controller = new EventManager();