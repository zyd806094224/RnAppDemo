# RnAppDemo

这是一个基于 React Native 的示例项目，展示了多种动画效果和UI组件的实现。

## 项目概述

本项目主要包含以下功能演示：

1. 水平列表动画展示
2. 跑马灯效果展示

项目使用了 React Navigation 进行页面导航，并实现了多种自定义动画组件。

## 技术栈

- React Native 0.72.6
- React 18.2.0
- TypeScript
- React Navigation (用于路由和导航)
- react-native-safe-area-context
- react-native-screens

## 项目结构

```
src/
├── App.tsx (应用入口)
├── navigators/
│   └── AppNavigator.tsx (应用导航器)
├── screens/
│   ├── HomeScreen.tsx (主页)
│   ├── HorizontalListPage.tsx (水平列表页面)
│   └── MarqueeHorizontalPage.js (跑马灯效果页面)
├── view/
│   ├── HorizontalListAnimationView.tsx (水平列表动画组件)
│   └── MarqueeHorizontal.js (跑马灯组件)
└── styles/
    └── index.js (样式工具)
```

## 功能介绍

### 1. 水平列表动画 (HorizontalListAnimationView)

该组件实现了自动水平滚动的图片列表，具有以下特点：
- 自动往返滚动动画
- 图片加载状态管理
- 图片加载失败处理
- 平滑的动画过渡效果
- 支持Android和iOS平台

### 2. 跑马灯效果 (MarqueeHorizontal)

该组件提供了多种滚动文字效果，包括：
- 单向连续滚动
- 切换式滚动
- 可配置滚动方向（左/右）
- 可自定义滚动速度和持续时间
- 支持点击事件

## 运行环境

- Node.js >= 16
- React Native CLI
- Android Studio (用于Android开发)
- Xcode (用于iOS开发)

## 快速开始

### 安装依赖

```bash
# 使用 npm
npm install

# 或者使用 yarn
yarn install
```

### 启动 Metro 服务器

```bash
# 使用 npm
npm start

# 或者使用 yarn
yarn start
```

### 运行应用

#### Android

```bash
# 使用 npm
npm run android

# 或者使用 yarn
yarn android
```

#### iOS

```bash
# 使用 npm
npm run ios

# 或者使用 yarn
yarn ios
```

## 项目配置

项目配置信息可以在以下文件中找到：
- [package.json](package.json) - 项目依赖和脚本
- [tsconfig.json](tsconfig.json) - TypeScript 配置
- [babel.config.js](babel.config.js) - Babel 配置
- [metro.config.js](metro.config.js) - Metro 打包工具配置

## 页面导航

应用使用 React Navigation 实现页面导航：
1. 主页 (HomeScreen) - 包含两个功能按钮，可跳转到不同演示页面
2. 水平列表动画页面 (HorizontalListPage) - 展示水平图片列表动画
3. 跑马灯效果页面 (MarqueeHorizontalPage) - 展示文字滚动效果

## 自定义组件

### HorizontalListAnimationView

位于 [src/view/HorizontalListAnimationView.tsx](src/view/HorizontalListAnimationView.tsx)，是一个实现了自动往返滚动的水平图片列表组件。

主要特性：
- 使用 Animated API 实现流畅动画
- 支持图片加载状态管理
- 自动适配屏幕宽度
- 处理不同平台的兼容性问题

### MarqueeHorizontal

位于 [src/view/MarqueeHorizontal.js](src/view/MarqueeHorizontal.js)，是一个功能丰富的跑马灯组件。

支持两种模式：
- Simple 模式：连续滚动
- Swiper 模式：切换式滚动

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个示例项目。

## 许可证

该项目基于 React Native 初始化模板创建，遵循 React Native 相关许可证条款。

## 学习资源

- [React Native 官方文档](https://reactnative.dev)
- [React Navigation 文档](https://reactnavigation.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)