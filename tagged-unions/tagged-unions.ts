interface Circle {
    kind: "circle";
    radius: number
}

interface Square {
    kind: "square"
    sideLength: number;
}

type Shape = Circle | Square

function getArea(shape: Shape) {
    // Error - can't be sure if 'shape' is a circle.
    shape.radius

    if (shape.kind === "circle") {
        // We know 'shape' is a circle here.
        return (shape.radius ** 2) * Math.PI;
    }
    // We know 'shape' is a square here.
    return shape.sideLength ** 2;
}