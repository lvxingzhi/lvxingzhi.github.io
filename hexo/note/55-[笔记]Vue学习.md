---
title: 【笔记】Vue学习
date: 2022-01-10 11:34:35
tags:
categories:
	- 笔记
---
>\[笔记系列文章说明\]: 该类型的文章是笔者学习过程中整理的学习笔记.

Vue 是一种JS,HTML,CSS渲染框架,通过其独特的绑定渲染方式,使页面编程更加方便,容易(JS语法糖).

生态圈
1. Vue Router
2. Vuex
3. Vue Loader 
4. Vue Test Utils
5. Vue Dev-Tools
6. Vue CLI
7. Vetur 

#### 一,  Hello word
1, 下载vuejs文件
```text
地址: https://unpkg.com/vue@3.2.26/dist/vue.global.js
```
2, 新建HTML页面, 引入vuejs文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="vue.global.js" ></script>
</head>
<body>
<div id="mainModuleId">
    {{content}}
</div>


<script>
const HelloVueApp = {
    data(){
        return {
            content: '主模块内容'
        }
    }
}

let vm = Vue.createApp(HelloVueApp).mount('#mainModuleId')
document.write(vm.$data.content)
</script>
</body>
</html>
```
##### 页面元素定义
```html
<div id="mainModuleId">
    {{content}}
</div>
```
##### 页面元素组件声明(js对象称之为vue组件)
```js
const HelloVueApp = {
    data(){
        return {
            content: '主模块内容'
        }
    },
    methods:{
    	myContentFn(){
    		return this.content
    	}
    }
}
```
##### 组件与元素使用vue绑定
```html
let vm = Vue.createApp(HelloVueApp).mount('#mainModuleId') // 绑定与渲染
document.write(vm.$data.content) // 组件中data的管理和使用
document.write(vm.myContentFn()) // 组件中methods的管理和使用
// 固定格式名称 data, methods
```
#### 二,  语法
##### 1, 模板
1, 插入-文本
语法: {{ * }}
```html
<div id="app">
  <p>{{ message }}</p>
</div>
<script>
	const RenderHtmlApp = {
		data() {
			return {
				message: '内容'
			}
		}
	}
	Vue.createApp(RenderHtmlApp).mount('#app')
```
2, 插入-html
语法: <元素 v-html="dataName"></元素>
```html
<div id="example1" class="demo">
    <p>使用双大括号的文本插值: {{ rawHtml }}</p>
    <p>使用 v-html 指令: <span v-html="rawHtml"></span></p>
</div>
 
<script>
const RenderHtmlApp = {
  data() {
    return {
      rawHtml: '<span style="color: red">这里会显示红色！</span>'
    }
  }
}
 
Vue.createApp(RenderHtmlApp).mount('#example1')
</script>
```
3, 插入-属性(属性动态与页面空间绑定)
语法: v-bind:属性=""
```html
<button v-bind:disabled="isButtonDisabled">按钮</button>
<button v-bind:id="buttonId">按钮</button>
<div v-bind:class="{'class1': use}">
    v-bind:class 指令
</div>
<input type="checkbox" v-model="use" id="r1">
```
4, 插入-表达式
```html
<div id="app">
    {{5+5}}<br>
    {{ ok ? 'YES' : 'NO' }}<br>
    {{ message.split('').reverse().join('') }}
    <div v-bind:id="'list-' + id">菜鸟教程</div>
</div>
<script>
const app = {
  data() {
    return {
      ok: true,
      message: 'RUNOOB!!',
      id: 1
    }
  }
}
 
Vue.createApp(app).mount('#app')
</script>
```
##### 2, 指令
语法 属性 v-*:*(.修饰符)="*"

##### 3, 用户输入-反向设置
```html
<div id="app">
    <p>{{ message }}</p>
    <input v-model="message">
</div>
 
<script>
const app = {
  data() {
    return {
      message: 'Runoob!'
    }
  }
}
 
Vue.createApp(app).mount('#app')
</script>
```

##### 4, 缩写
```html
v-bind:href="ll"  =  :href="ll"
v-on:click="fn" = @click="fn"
```
#### 二,  指令
##### 控制显示
1, 是否显示该元素 v-if
```html
<p v-if="isShow">现在你看到我了</p>
```
2, 是否显示该元素 v-else
```html
<div v-if="Math.random() > 0.5">
</div>
<div v-else>
</div>
<script>
	Vue.createApp(app).mount('#app')
</script>
```
3, 是否显示该元素 v-else-if
```html
<div id="app">
    <div v-if="type === 'A'">
	  A
    </div>
    <div v-else-if="type === 'B'">
      B
    </div>
    <div v-else-if="type === 'C'">
      C
    </div>
    <div v-else>
      Not A/B/C
    </div>
</div>
```
4, 是否显示该元素 v-show
```html
<h1 v-show="ok">Hello!</h1>
```
##### 控制遍历
1, 循环数组显示多个 v-for
```html
<div id="app">
  <ol>
    <li v-for="site in sites">
      {{ site.text }}
    </li>
  </ol>
</div>
<script>
const app = {
  data() {
    return {
      sites: [
        { text: 'Google' },
        { text: 'Runoob' },
        { text: 'Taobao' }
      ]
    }
  }
}

Vue.createApp(app).mount('#app')
</script>
```
2, 循环数组显示多个 v-for 使用index
```html
<div id="app">
  <ol>
    <li v-for="(site, index) in sites">
      {{ index }} -{{ site.text }}
    </li>
  </ol>
</div>
<script>
const app = {
  data() {
    return {
      sites: [
        { text: 'Google' },
        { text: 'Runoob' },
        { text: 'Taobao' }
      ]
    }
  }
}

Vue.createApp(app).mount('#app')
</script>
```
3, 循环数组显示多个 v-for 迭代对象
```html
<div id="app">
  <ul>
    <li v-for="value in object">
//     <li v-for="(value, key) in object"> 第二种
//    <li v-for="(value, key, index) in object"> 第三种
  {{ value }}
    </li>
  </ul>
</div>
 
<script>
const app = {
  data() {
    return {
      object: {
        name: '菜鸟教程',
        url: 'http://www.runoob.com',
        slogan: '学的不仅是技术，更是梦想！'
      }
    }
  }
}
 
Vue.createApp(app).mount('#app')
</script>
```
3, 循环数组显示多个 v-for 迭代整数
```html
 <li v-for="n in 10">
     {{ n }}
    </li>
```
4, 循环数组显示多个 v-for 迭代方法结果
```html
<div id="app">
  <ul>
    <li v-for="n in evenNumbers">{{ n }}</li>
  </ul>
</div>
<script>
const app = {
    data() {
        return {
            numbers: [ 1, 2, 3, 4, 5 ]
	     }
    },
    computed: {
        evenNumbers() {
            return this.numbers.filter(number => number % 2 === 0)
        }
    }
}
Vue.createApp(app).mount('#app')
</script>
```
5, 循环组件元素, v-for
```html
<div id="todo-list-example">
	<ul>
        <my-component
          v-for="(item, index) in items"
          :item="item"
          :index="index"
          :key="item.id"
        ></my-component>
	</ul>
</div>
<script>
	const app = Vue.createApp({
		data() {
			return {
				newTodoText: '',
				todos: [
					{
						id: 1,
						title: '看电影'
					},
					{
						id: 2,
						title: '吃饭'
					},
					{
						id: 3,
						title: '上 RUNOOB 学习'
					}
				],
				nextTodoId: 4
			}
		}
	})
	app.component('my-component', {
		template: ` <li>
                  {{ title }}
                  <button @click="$emit('remove')">删除</button>
                </li>`,
		props: ['title'],
		emits: ['remove']
	})
	app.mount('#todo-list-example')

</script>
```
#### 三 组件
1, 定义一个页面元素
```html
<div id="app">
    <runoob></runoob>
</div>
```
2, js中创建vue应用
```js
const app = Vue.createApp({});
// 为应用创建组件
app.component('runoob', {template: `<h1>自定义组件!</h1>`});
// 应用于页面元素绑定
app.mount('#app');
```
3, demo1: 组件控制元素事件
```html
<div id="app">
    <button-counter></button-counter>
	<button-counter></button-counter>
	<button-counter></button-counter>
</div>
<script>
// 创建一个Vue 应用
const app = Vue.createApp({})

// 定义一个名为 button-counter 的新全局组件
app.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  template: `<button @click="count++">点了 {{ count }} 次！</button>`
})
app.mount('#app')
</script>
</body>
</html>
```










