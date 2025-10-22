function Point(x, y) {
    this.x = x;
    this.y = y;
}

const p1 = new Point(1, 2);
const p2 = new Point(3, 4);


// 检查对象是否使用快速属性
console.log("p1 使用快速属性:", %HasFastProperties(p1));