// 使用 %DebugPrint 来查看对象的 Hidden Class
function Point(x, y) {
    this.x = x;
    this.y = y;
}

const p1 = new Point(1, 2);
const p2 = new Point(3, 4);

// 打印对象的内部结构
%DebugPrint(p1);
%DebugPrint(p2);

// 创建具有不同属性顺序的对象
// const obj1 = {};
// obj1.x = 1;
// obj1.y = 2;

// const obj2 = {};
// obj2.y = 3;
// obj2.x = 4;

// // 打印这些对象的内部结构
// %DebugPrint(obj1);
// %DebugPrint(obj2);