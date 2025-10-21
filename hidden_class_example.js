// 示例1：相同的属性顺序会共享 Hidden Class
function Point(x, y) {
    this.x = x;
    this.y = y;
}

const p1 = new Point(1, 2);
const p2 = new Point(3, 4);
// p1 和 p2 会共享相同的 Hidden Class，因为它们的属性添加顺序相同

// 示例2：不同的属性顺序会创建不同的 Hidden Class
function createObjectA() {
    const obj = {};
    obj.x = 1;
    obj.y = 2;
    return obj;
}

function createObjectB() {
    const obj = {};
    obj.y = 2;
    obj.x = 1;
    return obj;
    // 虽然最终属性相同，但因为添加顺序不同，会创建不同的 Hidden Class
}

// 示例3：动态添加属性会导致 Hidden Class 的转换
const car1 = {
    brand: "Toyota",
    model: "Camry"
};

const car2 = {
    brand: "Toyota",
    model: "Camry"
};

// car1 和 car2 initially 共享相同的 Hidden Class
car1.year = 2023; // 这会创建一个新的 Hidden Class

// car1 和 car2 现在有不同的 Hidden Class