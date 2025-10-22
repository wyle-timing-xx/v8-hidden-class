function Point(x, y) {
    this.x = x;
    this.y = y;
}

const p1 = new Point(1, 2);
const p2 = new Point(3, 4);


// 检查两个对象是否共享相同的 Hidden Class
console.log("p1 和 p2 共享相同的 Hidden Class:", %HaveSameMap(p1, p2));


// 添加属性后再次检查
p1.z = 3; // 这一步对于对象来说是一个灾难性的破坏, 会导致 p1 从快速属性切换到慢速属性
console.log("添加属性后，p1 和 p2 共享相同的 Hidden Class:", %HaveSameMap(p1, p2));