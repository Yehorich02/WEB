String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

let data = [
    {
        "title": "BEEF meat & wine",
        "image": "../example_img/Meet.jpg",
        "short": `<p class="lead">BEEF was opened in 2010, the restaurant has been awarded the Best Meat
        Restaurant of Ukraine three times (National Restaurant Award SALT 2013, 2016, 2019), and the
        restaurant has won the Wine Spectator Award.
    </p>
    <p class="lead">The architect of the restaurant is Alberto Foyo, professor of architecture at
        Columbia University (New York). Spacious, concise, honest - that's what its guests say about
        BEEF design.
    </p>
    <h2 class="card-title display-5">About meat</h2>
    <p class="lead">The main product of the restaurant is meat.</p>
    <p class="lead"> The American marble steaks of the organic farm Creekstone Farms in BEEF are
        cooked on a four-meter open Parrilla grill and in a wood-burning oven.
    </p>
    <h2 class="card-title display-5">In the menu:</h2>
    <p class="lead">breakfast with unlimited coffee on weekdays from 9:00 to 12:00 and from 9:00 to
        16:00 on weekends; lunches with a good selection of dishes from 12:00 to 16:00; dinners in a
        chamber atmosphere and for large companies.
    </p>
    <p class="lead">
        For a special acquaintance with the restaurant, choose Chef's table - a dinner prepared for
        you personally by the chef in the restaurant's kitchen.
    </p>
    <p class="lead">BEEF regularly conducts master classes: on steaks, cocktails and children's
        culinary master classes.
    </p>
    <p class="lead">In the warm season it is especially nice to sit on the terrace of BEEF, to
        observe the life of the city center.
    </p>`,
        "comments": [
            {
                "author": "@Nikshyn",
                "text": "Your meat tastes incredible. Thanks for the good service and deliciuos food."
            }
        ]
    }
];

let profiles = {
    "yehor.nikishyn@gmail.com": {
        "username": "Nikshyn",
        "email": "yehor.nikishyn@gmail.com",
        "date": "30 August 2002",
        "gender": "Male",
        "image": "../example_img/ProfilePhoto.png",
        "password": "Nikshyn52"
    }
}

class DataProcessor {
    constructor() {
        this.ideas = data;
        this.profiles = profiles;
    }

    Username() {
        return sessionStorage.getItem('username');
    }

    IsLogIn() {
        return sessionStorage.getItem('username');
    }

    AddComment(idx, text) {
        let obj = {};
        obj['author'] = this.Username();
        obj['text'] = text;
        this.ideas[idx].comments.push(obj);
    }

    AddArticle(title, text, short) {
        if (short.length > 250 || short.length < 210) {
            alert("Preview must have 200-250 characters.");
            return;
        }
        let full_text = text.replaceAll('<p', '<p class="lead"').replaceAll('<h2', '<h2 class="card-title display-5"');
        let obj = {
            "title": title,
            "image": "../example_img/ideas_title_1.jpg",
            "short": short,
            "full_text": full_text,
            "comments": []
        };
        console.log(obj);
        this.ideas.push(obj);
    }
}

let container = new DataProcessor();
export default container;
