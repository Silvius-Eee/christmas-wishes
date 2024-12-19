# 项目结构设计文档

## 目录结构 

.
├── src/ # 源码目录
│ ├── assets/ # 静态资源
│ ├── components/ # Vue组件
│ ├── App.vue # 根组件
│ ├── main.ts # 应用入口
│ ├── style.css # 全局样式
│ └── vite-env.d.ts # Vite类型声明
├── public/ # 公共资源目录
├── index.html # HTML模板
├── package.json # 项目配置
├── tsconfig.json # TypeScript配置
├── vite.config.ts # Vite配置
└── README.md # 项目说明


## 技术栈

- **框架**: Vue 3
- **开发语言**: TypeScript
- **构建工具**: Vite
- **包管理**: npm/yarn/pnpm

## 关键配置

### TypeScript配置
- 使用严格模式
- 支持Vue 3组件类型检查
- 分离项目和Node环境配置

### Vite配置
- Vue插件支持
- 开发服务器配置
- 构建优化

### 开发规范
- ESLint代码检查
- TypeScript类型检查
- Vue单文件组件规范

## 开发流程

1. 开发命令
   - `npm run dev`: 启动开发服务器
   - `npm run build`: 构建生产版本
   - `npm run preview`: 预览生产构建

2. 组件开发
   - 使用Vue 3 `<script setup>` 语法
   - TypeScript类型支持
   - 支持热更新(HMR)

3. 样式开发
   - 支持CSS模块化
   - 支持Scoped CSS
   - 全局样式配置

4. 构建部署
   - 自动类型检查
   - 生产环境优化
   - 静态资源处理