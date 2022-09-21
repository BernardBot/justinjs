class Guesser {
    constructor(qa) {
        this.qa = qa;
        this.reset();
    }

    reset() {
        let questions = Object.keys(this.qa).shuffle();
        this.result = { total: 0, correct: 0, };
        this.exercises = [];
        for (let question of questions) {
            let answer = this.qa[question];
            let options = Object.values(this.qa).filter(x => x != answer).shuffle().slice(0, 4);
            options.push(answer);
            options.shuffle();
            this.exercises.push({ question, answer, options, });
        }
    }

    get_next_exercise() {
        return this.exercises.pop();
    }

    render_exercise(exercise) {
        self = this;
        function handle_event(event) {
            let is_correct = event.target.innerHTML == exercise.answer;

            self.result.total++;
            if (is_correct) {
                self.result.correct++;
            }

            let h2 = document.createElement("h2");
            h2.innerHTML = exercise.answer;
            h2.style.color = is_correct ? "green" : "red";
            document.body.append(h2);

            h2 = document.createElement("h2");
            h2.innerHTML = self.result.correct + "/" + self.result.total;
            document.body.append(h2);

            let button = document.createElement("button");
            button.innerHTML = "Next Question";
            button.onclick = self.run.bind(self);
            document.body.append(button);
        }
        let buttons = document.createElement("div");
        for (let option of exercise.options) {
            let p = document.createElement("p");
            let button = document.createElement("button");
            button.onclick = handle_event;
            button.innerHTML = option;
            p.append(button);
            buttons.append(p);
        }
        let div = document.createElement("div");
        let h1 = document.createElement("h1");
        h1.innerHTML = exercise.question;
        div.append(h1);
        div.append(buttons);

        return div;
    }

    run() {
        let exercise = this.get_next_exercise();
        if (exercise) {
            document.body.innerHTML = "";
            document.body.append(this.render_exercise(exercise));
        } else {
            let h2 = document.createElement("h2");
            h2.innerHTML = "Finished";
            document.body.append(h2);
        }
    }
}

Array.prototype.shuffle = function () {
    return this.sort((a, b) => Math.random() < 0.5);
}

function invert(o) {
    let obj = {};
    for (let key in o) {
        obj[o[key]] = key;
    }
    return obj;
}