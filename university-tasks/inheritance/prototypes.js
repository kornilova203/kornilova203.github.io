(function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    function Shape(fill, border) {
        this.fill = fill;
        this.border = border;
        this.name = 'shape';
    }

    Shape.prototype.draw = function () {
        console.log("Draw " + this.name);
        console.log("fill: " + this.fill + "; border: " + this.border + ";");
    };

    function Triangle(fill, border, point1, point2, point3) {
        Shape.call(this, fill, border);  // call parent constructor
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.name = 'triangle';
    }

    Triangle.prototype = Object.create(Shape.prototype);
    Triangle.prototype.constructor = Triangle;

    Triangle.prototype.draw = function () {
        Shape.prototype.draw.apply(this);
        console.log("Coordinates:", this.point1, this.point2, this.point3);
    };

    function Circle(fill, border, centre, radius) {
        Shape.call(this, fill, border);  // call parent constructor
        this.centre = centre;
        this.radius = radius;
        this.name = 'circle';
    }

    Circle.prototype = Object.create(Shape.prototype);
    Circle.prototype.constructor = Circle;

    Circle.prototype.draw = function () {
        Shape.prototype.draw.apply(this);
        console.log("Centre: ", this.centre);
        console.log("Radius: " + this.radius);
    };

    console.log('PROTOTYPES');
    console.log("create shape:");
    const shape = new Shape('#456789', '#543214');
    console.log(shape);
    shape.draw();

    console.log("create triangle:");
    const point1 = new Point(0, 0);
    const point2 = new Point(10, 0);
    const point3 = new Point(20, 40);
    const triangle = new Triangle('#111111', '#222222', point1, point2, point3);
    console.log(triangle);
    triangle.draw();

    console.log("create circle:");
    const centre = new Point(40, 40);
    const radius = 20;
    const circle = new Circle('#333333', '#444444', centre, radius);
    console.log(circle);
    circle.draw();

})();
