# cowry-cli

## Install.

```bash
  npm i -g cowry-cli

  // or
  yarn add -g cowry-cli

  // or
  npx cowry-cli
```

## Usage.

- 初始化项目

```bash
  cowry init
```

- 在当前项目中创建组件

```bash
  # 创建如下组件
  # .
  # +- src
  # | +- components
  # | +-- MyComponent
  # | +--- index.vue

  cowry -c MyComponent
  cowry -c MyComponent -d ./src/components
  cowry --component my-component --dest ./src/components


  # 创建如下组件
  # .
  # +- src
  # | +- components
  # | +-- MyComponent
  # | +--- index.vue
  # | +--- index.scss

  cowry -c MyComponent -s
  cowry -c MyComponent --style index.scss
  cowry -c MyComponent --style index.less
```
