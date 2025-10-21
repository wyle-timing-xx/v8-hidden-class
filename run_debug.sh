#!/bin/bash

echo "运行基本调试..."
node --allow-natives-syntax debug_hidden_class.js

echo -e "\n运行 Hidden Class 跟踪..."
node --allow-natives-syntax --trace-maps debug_hidden_class.js

echo -e "\n运行优化跟踪..."
node --allow-natives-syntax --trace-opt debug_hidden_class.js