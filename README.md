# 代码说明

## 0.简介

* 本代码示例适用于vue2.0
* 官网：<https://cn.vuejs.org/>
* 官网教程：<https://cn.vuejs.org/v2/guide/>
* 官网API：<https://cn.vuejs.org/v2/api/>

## 1.入门

1.1. 入门、数据和变量、生命周期: [chapter01/helloword.html](chapter01/helloword.html)

1.2. 插值与表达式: [chapter01/expression.html](chapter01/expression.html)

1.3. 过滤器: [chapter01/filter.html](chapter01/filter.html)

1.4. 事件、指令、语法糖: [chapter01/event.html](chapter01/event.html)

## 2.计算属性

2.1. 简单示例: [chapter02/simple.html](chapter02/simple.html)

2.2. 计算属性的用法: [chapter02/useage.html](chapter02/useage.html)

2.3. 计算属性的缓存: [chapter02/cache.html](chapter02/cache.html)

## 3.绑定样式

3.1. 绑定样式: [chapter03/bindclass.html](chapter03/bindclass.html)

## 4.内置指令

4.1. 基本指令与条件渲染指令：[chapter04/base-if.html](chapter04/base-if.html)

4.2. 列表渲染指令v-for与数组操作：[chapter04/for.html](chapter04/for.html)

4.3. 方法与事件、修饰符：[chapter04/event.html](chapter04/event.html)

4.4. 实战：购物车：[chapter04/cart](chapter04/cart)

## 5.表单与v-model

5.1. 表单：[chapter05/form.html](chapter05/form.html)

## 6.组件详解

6.1. 组件基本用法：[chapter06/base.html](chapter06/base.html)

6.2. 使用props传递数据：[chapter06/props.html](chapter06/props.html)

6.3. 子组件向父组件传递数据：[chapter06/child2parent.html](chapter06/child2parent.html)

6.4. 任意组件的通信（非父子组件）：[chapter06/any.html](chapter06/any.html)

6.5. 使用slot（插槽）分发内容：[chapter06/slot.html](chapter06/slot.html)
>props传递数据、events触发事件和slot内容分发就构成了Vue组件的3个API来源，再复杂的组件也是由这3部分构成的。

6.6. 组件的高级用法(递归组件、内联组件、动态组件、异步组件)：[chapter06/advanced.html](chapter06/advanced.html)

6.7. 其他($nextTick与异步更新队列、X-templates、手动挂载实例)：[chapter06/other.html](chapter06/other.html)

6.8. 实战：数字输入框组件：[chapter06/numbercom](chapter06/numbercom)

## 7.自定义指令

7.1. 自定义指令基本用法：[chapter07/base.html](chapter07/base.html)

## 8.Render函数

> Virtual Dom并不是真正意义上的Dom，而是一个轻量级的JavaScript对象，在状态发生变化时，Virtual Dom会进行Diff运算，来更新只需要被替换的Dom，而不是全部重绘。与Dom操作相比，Virtual Dom是基于JavaScript计算的，因此开销会小很多。  
> Virtual Dom运行过程：  
Object --> render(生成虚拟节点) --> createElement(h)（基于虚拟节点创建dom节点）--> diff（状态更新后，进行对比，生成补丁对象）--> patch（遍历补丁对象，更新dom节点）  
> 使用Virtual Dom就可以完全发挥JavaScript的编程能力。在多数场景中，我们使用template就足够了，但在一些特定场景下，使用Virtual Dom会更简单。

8.1. render函数入门示例-锚点标题：[chapter08/anchor.html](chapter08/anchor.html)

```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div',

  // {Object}
  // 一个与模板中 attribute 对应的数据对象。可选。
  {
    // (详情见下一节)
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

数据对象

```js
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```

8.2. createElement用法：[chapter08/createElement.html](chapter08/createElement.html)

## 9. webpack

9.1. webpack入门：[chapter09/demo](chapter09/demo)