(function () {
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    class Shape {  // base class
        constructor(fill, border) {
            this.fill = fill;
            this.border = border;
            this.name = 'shape';
        }

        draw() {
            console.log("Draw " + this.name);
            console.log("fill: " + this.fill + "; border: " + this.border + ";");
        }
    }

    class Triangle extends Shape {
        constructor(fill, border, point1, point2, point3) {
            super(fill, border);  // call parent constructor
            this.point1 = point1;
            this.point2 = point2;
            this.point3 = point3;
            this.name = 'triangle';
        }

        draw() {
            super.draw();
            console.log("Coordinates:", this.point1, this.point2, this.point3);
        }
    }

    class Circle extends Shape {
        constructor(fill, border, centre, radius) {
            super(fill, border);  // call parent constructor
            this.centre = centre;
            this.radius = radius;
            this.name = 'circle';
        }

        draw() {
            super.draw();
            console.log("Centre: ", this.centre);
            console.log("Radius: " + this.radius);
        }
    }

    console.log('');
    console.log('');
    console.log('');
    console.log('CLASSES');
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