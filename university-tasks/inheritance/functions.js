(function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    const shape = function (spec) {
        const that = {};
        spec.name = 'shape';

        that.draw = function () {
            console.log("Draw " + spec.name);
            console.log("fill: " + spec.fill + "; border: " + spec.border + ";");
        };

        return that;
    };

    Object.method('superior', function (name) {
        const that = this;
        const method = that[name];
        return function () {
            return method.apply(that, arguments);
        };
    });
    // Object.prototype.superior = function (name) {  // method for getting parent methods
    //     const that = this;
    //     const method = that[name];
    //     return function () {
    //         return method.apply(that, arguments);
    //     };
    // };

    const triangle = function (spec) {
        const that = shape(spec);  // inherit from shape
        spec.name = 'triangle';

        const super_draw = that.superior('draw');  // get parent method
        that.draw = function () {
            super_draw();
            console.log("Coordinates:", spec.point1, spec.point2, spec.point3);
        };

        return that;
    };

    const circle = function (spec) {
        const that = shape(spec);  // inherit from shape
        spec.name = 'circle';

        const super_draw = that.superior('draw');  // get parent method
        that.draw = function () {
            super_draw();
            console.log("Centre: ", spec.centre);
            console.log("Radius: " + spec.diameter);
        };

        return that;
    };

    console.log('');
    console.log('');
    console.log('');
    console.log('FUNCTIONS');
    console.log("create shape:");
    const newshape = shape({
        fill: '#456789',
        border: '#543214'
    });
    console.log(newshape);
    newshape.draw();

    console.log("create triangle:");
    const point1 = new Point(0, 0);
    const point2 = new Point(10, 0);
    const point3 = new Point(20, 40);
    const newtriangle = triangle({
        fill: '#111111',
        border: '#222222',
        point1: point1,
        point2: point2,
        point3: point3
    });

    console.log(newtriangle);
    newtriangle.draw();

    console.log("create circle:");
    const centre = new Point(40, 40);
    const radius = 20;
    const newcircle = circle({
        fill: '#333333',
        border: '#444444',
        centre: centre,
        radius: radius
    });
    console.log(newcircle);
    newcircle.draw();

})();

