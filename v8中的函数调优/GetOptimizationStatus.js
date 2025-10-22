// 使用 %GetOptimizationStatus 观察函数优化状态
// 运行命令：
// node --allow-natives-syntax --trace-opt --trace-deopt GetOptimizationStatus.js

function statusToText(status) {
  const bits = status.toString(2);
  return {
    raw: status,
    bits,
    // 以下位标志在不同 V8 版本可能略有差异，仅供参考
    neverOptimized: !!(status & (1 << 1)),      // 永不优化（比如包含禁用优化的模式）
    alwaysOptimized: !!(status & (1 << 2)),     // 总是优化（内建或特殊情况）
    maybeDeoptimized: !!(status & (1 << 3)),    // 可能已去优化
    optimized: !!(status & (1 << 4)),           // 已优化
    optimizedByTurboFan: !!(status & (1 << 5)), // TurboFan 优化的顶层代码
    interpreted: !!(status & (1 << 6)),         // 以解释模式运行（未被编译到更高层）
    markedForOptimization: !!(status & (1 << 7)), // 已标记准备优化
    optimizingConcurrently: !!(status & (1 << 9)), // 并发优化中
  };
}

function printStatus(name, fn) {
  const s = %GetOptimizationStatus(fn);
  const t = statusToText(s);
  console.log(`\n[${name}] status=${t.raw} bits=${t.bits}`);
  console.log(`  - optimized: ${t.optimized}`);
  console.log(`  - optimizedByTurboFan: ${t.optimizedByTurboFan}`);
  console.log(`  - interpreted: ${t.interpreted}`);
  console.log(`  - maybeDeoptimized: ${t.maybeDeoptimized}`);
  console.log(`  - neverOptimized: ${t.neverOptimized}`);
  console.log(`  - alwaysOptimized: ${t.alwaysOptimized}`);
  console.log(`  - markedForOptimization: ${t.markedForOptimization}`);
  console.log(`  - optimizingConcurrently: ${t.optimizingConcurrently}`);
}

// 示例 1：普通可优化函数
function add(a, b) { return a + b; }

%PrepareFunctionForOptimization(add); // 给v8下指令, 接下来准备函数进行优化, 准备好收集信息
printStatus('add (初始)', add);

// 喂类型反馈，让编译器了解参数类型
for (let i = 0; i < 1e4; i++) { add(i, i + 1); }

// 下一次调用时触发优化
%OptimizeFunctionOnNextCall(add); // 给v8下指令, 在下一次强制调用时触发优化
add(1, 2);
printStatus('add (优化后)', add);

// // 示例 2：触发去优化（类型突变）
function addDeopt(a, b) { return a + b; }
%PrepareFunctionForOptimization(addDeopt); // 给v8下指令, 接下来准备函数进行优化, 准备好收集信息
addDeopt(1, 2);
%OptimizeFunctionOnNextCall(addDeopt); // 给v8下指令, 在下一次强制调用时触发优化
addDeopt(1, 2);
printStatus('addDeopt (优化后)', addDeopt);

// // 类型突然变化，可能导致去优化
addDeopt('1', 2);
printStatus('addDeopt (类型变化后)', addDeopt);

// // 示例 3：包含优化杀手的函数（eval / with 等通常会阻止优化）
function killer(a) { eval(''); return a; } // 包含 eval 会阻止优化, v8会直接 bailout 掉
%PrepareFunctionForOptimization(killer);
killer(1);
%OptimizeFunctionOnNextCall(killer);
killer(2);
printStatus('killer (可能永不优化)', killer);



