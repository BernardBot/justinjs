class Turtle {
    constructor () {
        this.canvas = document.createElement("canvas");;

        this.width = this.canvas.width = 600;
        this.height = this.canvas.height = 600;

        this.ctx = this.canvas.getContext('2d');

        this.canvas.style.border = "1px solid black";
        document.body.appendChild(this.canvas);

        this.position = [0, 0];
        this.angle = 0;
        this.isdown = true;
    }

    draw_line (x0, y0, x1, y1) {
        if (this.isdown) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.width / 2 + x0, this.height / 2 - y0);
            this.ctx.lineTo(this.width / 2 + x1, this.height / 2 - y1);
            this.ctx.stroke();
        }
    }

    draw_arc (x, y, r, start, end, counterclockwise) {
        if (this.isdown) {
            this.ctx.beginPath();
            this.ctx.arc(this.width / 2 + x, this.height / 2 - y, r, start, end, counterclockwise);
            this.ctx.stroke();
        }
    }
    
    reset() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.position = [0, 0];
        this.angle = 0;
        this.isdown = true;
    }

    goto (x, y) {
        this.draw_line(this.position[0], this.position[1], x, y);
        this.position = [x, y];
    }

    up() {
        this.isdown = false;
    }

    down() {
        this.isdown = true;
    }

    setheading (angle) {
        this.angle = angle;
    }

    forward (distance) {
        let x = this.position[0] + distance * Math.cos(this.angle * Math.PI / 180);
        let y = this.position[1] + distance * Math.sin(this.angle * Math.PI / 180);
        this.goto(x, y);
    }

    right (angle) {
        this.angle -= angle;
    }

    left (angle) {
        this.angle += angle;
    }

    heading() {
        return this.angle;
    }

    pos() {
        return this.position;
    }

    circle(radius, extent=360) {
        let x = this.position[0] - radius * Math.cos((this.angle - 90) * Math.PI / 180);
        let y = this.position[1] - radius * Math.sin((this.angle - 90) * Math.PI / 180);
        let start = Math.PI / 2 - this.angle * Math.PI / 180;
        let end = start - extent * Math.PI / 180;
        this.draw_arc(x, y, radius, start, end, extent > 0);
        this.angle += extent;
        this.position = [
            x + radius * Math.cos((this.angle - 90) * Math.PI / 180),
            y + radius * Math.sin((this.angle - 90) * Math.PI / 180),
        ];
    }
}

const turtle = new Turtle();

function reset() { turtle.reset(); }
function goto(x, y) { turtle.goto(x, y); }
function up() { turtle.up(); }
function down() { turtle.down(); }
function setheading(angle) { turtle.setheading(angle); }
function forward(distance) { turtle.forward(distance); }
function right(angle) { turtle.right(angle); }
function left(angle) { turtle.left(angle); }
function heading() { return turtle.heading(); }
function pos() { return turtle.pos(); }
function circle(radius, extent=360) { turtle.circle(radius, extent); }
