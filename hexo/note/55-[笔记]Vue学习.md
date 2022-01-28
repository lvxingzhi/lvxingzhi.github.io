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

<!--more-->
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
```js
let vm = Vue.createApp(HelloVueApp).mount('#mainModuleId') // 绑定与渲染
document.write(vm.$data.content) // 组件中data的管理和使用
document.write(vm.myContentFn()) // 组件中methods的管理和使用
// 固定格式名称 data, methods
```
#### 二,  语法

##### 1, 模板
1, 插入-文本
```html
语法: { { * } }
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
    <div v-bind:id="'list-' + id">Note</div>
</div>
<script>
const app = {
  data() {
    return {
      ok: true,
      message: 'note!!',
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
      message: 'note!'
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
        { text: 'note' },
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
        { text: 'note' },
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
        name: 'Note',
        url: 'http://www.note.com',
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
						title: '上 note 学习'
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
    <note></note>
</div>
```
2, js中创建vue应用
```js
const app = Vue.createApp({});
// 为应用创建组件
app.component('note', {template: `<h1>自定义组件!</h1>`});
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
4, 组件与应用分离定义
```js
const comA = {
  data() {
    return {
      count: 0
    }
  },
  template: `<button @click="count++">点了 {{ count }} 次！</button>`
}
const comB = {
	data() {
		return {
			count: 0
		}
	},
	template: `<button @click="count++">点了 {{ count }} 次！</button>`
}
var app = Vue.createApp({
	components:{'a1':comA,'a2':comB}
});
```
5, 元素与组件数据传递,使用
```html
<div id="app">
  <site-name title="Google"></site-name>
  <site-name title="note"></site-name>
  <site-name title="Taobao"></site-name>
</div>
 
<script>
const app = Vue.createApp({})
 
app.component('site-name', {
  props: ['title'],
  template: `<h4>{{ title }}</h4>`
})
 
app.mount('#app')
</script>
```
6, 组件与组件数据传递,使用
```html
<div id="app">
  <site-info
    v-for="site in sites"
    :id="site.id"
    :title="site.title"
  ></site-info>
</div>
<script>
const Site = {
  data() {
    return {
      sites: [
        { id: 1, title: 'Google' },
        { id: 2, title: 'note' },
        { id: 3, title: 'Taobao' }
      ]
    }
  }
}
const app = Vue.createApp(Site)
app.component('site-info', {
  props: ['id','title'],
  template: `<h4>{{ id }} - {{ title }}</h4>`
})
app.mount('#app')
</script>
```
7, 利用组件验证父组件对象
```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```
> 当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。
type 可以是下面原生构造器：
String
Number
Boolean
Array
Object
Date
Function
Symbol
type 也可以是一个自定义构造器，使用 instanceof 检测。
 
#### 四 计算属性(对data中的属性值操作计算,并且返回值也作为data的属性(fn属性)存在)
1, demo1 利用computed反转字符串
```html
<div id="app">
  <p>原始字符串: {{ message }}</p>
  <p>计算后反转字符串: {{ reversedMessage }}</p>
</div>
<script>
const app = {
	data() {
		return {
			message: 'ABCDEFG'
		}
	},
	computed: {
		// 计算属性的 getter
		reversedMessage: function () {
			// `this` 指向 vm 实例
			return this.message.split('').reverse().join('')
		}
	}
}
Vue.createApp(app).mount('#app')
</script>
```
2, demo2 利用methods反转字符串
```js
const app = {
	data() {
		return {
			message: 'ABCDEFG'
		}
	},
	methods: {
		reversedMessage: function () {
			return this.message.split('').reverse().join('')
		}
	}
}
Vue.createApp(app).mount('#app')
```
3, computed与methods有什么区别
1. computed会缓存返回值
2. methods不会缓存值
4, 给computed添加set方法
```js
var vm = new Vue({
    el: '#app',
    data: {
        name: 'Google',
        url: 'http://www.google.com'
    },
    computed: {
        site: {
            // getter
            get: function () {
                return this.name + ' ' + this.url
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(' ')
                this.name = names[0]
                this.url = names[names.length - 1]
            }
        }
    }
})
// 调用 setter， vm.name 和 vm.url 也会被对应更新
vm.site = '旺仔QQ糖';
document.write('name: ' + vm.name);
document.write('<br>');
document.write('url: ' + vm.url);
```
#### 五 监听(data属性变化)
```html
<div id = "app">
    <p style = "font-size:25px;">计数器: {{ counter }}</p>
    <button @click = "counter++" style = "font-size:25px;">点我</button>
</div>
    
<script>
const app = {
  data() {
    return {
      counter: 1
    }
  }
}
vm = Vue.createApp(app).mount('#app')
vm.$watch('counter', function(nval, oval) {// 两个参数分别为变化后, 变化前的值
    alert('计数器值的变化 :' + oval + ' 变为 ' + nval + '!');
});
</script>
```
另一种写法
```js
 const watchExampleVM = Vue.createApp({
    data() {
      return {
		  counter: ''
      }
    },
    watch: {
		counter(nval, oval) {// 两个参数分别为变化后, 变化前的值
			alert('计数器值的变化 :' + oval + ' 变为 ' + nval + '!');
		}
    }
  }).mount('#watch-example')
```

#### 六 class绑定
1, 定义元素
```html
<div ></div>
```
2, 添加vue class
```html
<div :class="{ 'active': isActive }"></div>
或
<div v-bind:class="{ 'active': isActive }"></div>
// 当isActive = true时
<div class="active"></div>
// 否则
<div ></div>
```
3, 添加点复杂运算
```html
<div id="app">
	<div class="static" :class="classObject"></div>
</div>
<script>
const app = Vue.createApp({
	data() {
	  return {
		isActive: true,
		error: null
	  }
	},
	computed: {
	  classObject() {
		return {
		  active: this.isActive && !this.error,
		  'text-danger': this.error && this.error.type === 'fatal'
		}
	  }
	}
});
</script>
```
4, 原生class与vue class 共存自动合并, 且支持数组
```html
<div class="static" :class="[activeClass, errorClass]"></div>
<div class="static" :class="[isActive ? activeClass : '', errorClass]"></div>
```
5, vue style
```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }">Note</div>
或
<div :style="styleObject">Note</div>
或
<div :style="[baseStyles, overridingStyles]">Note</div>

```

#### 七 vue 事件处理
1, 写法: v-on:* 或@*
```text
v-on:click="methodName"
或
@click="methodName"
```

2, 关联方法(methods)
```html
<button @click="greet">点我</button>
<button @click="say('what')">Say what</button>
<button @click="one($event), two($event)">

```

#### 八 表单(input, textarea, select, checkbox, radio等)指令
1, 指令 v-model
2, 数据元素双向绑定
```html
文本
<input v-model="message" placeholder="编辑我……">
文本域
<textarea v-model="message2" placeholder="多行文本输入……"></textarea>
单选
<input type="radio" id="note" value="note" v-model="picked">
<input type="radio" id="google" value="Google" v-model="picked">
下拉
<select v-model="selected" name="fruit">
	<option value="">选择一个网站</option>
	<option value="www.note.com">note</option>
	<option value="www.google.com">Google</option>
</select>
```
3, 原理
```text
v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
text 和 textarea 元素使用 value 属性和 input 事件；
checkbox 和 radio 使用 checked 属性和 change 事件；
select 字段将 value 作为属性并将 change 作为事件。
```
4, 误区
```html
<!-- 错误 -->
<textarea>{{ text }}</textarea>

<!-- 正确 -->
<textarea v-model="text"></textarea>
```
5, demo1 输入框,文本域
```html
<input v-model="message" placeholder="编辑我……">
<textarea v-model="message2" placeholder="多行文本输入……"></textarea>
<script>
	const app = {
		data() {
			return {
				message: '',
				message2: 'Note'
			}
		}
	}
	Vue.createApp(app).mount('#app')
</script>
```
6, demo2 复选框
```html
<p>单个复选框：</p>
  <input type="checkbox" id="checkbox" v-model="checked">
<p>多个复选框：</p>
<input type="checkbox" id="google" value="google" v-model="checkedNames">
<label for="google">google</label>
<input type="checkbox" id="google" value="Google" v-model="checkedNames">
<label for="google">Google</label>
<input type="checkbox" id="taobao" value="Taobao" v-model="checkedNames">
<script>
	const app = {
		data() {
			return {
				checked : false,
				checkedNames: []
			}
		}
	}
	Vue.createApp(app).mount('#app')
</script>
```
7, demo3 单选按钮
```html
<input type="radio" id="google" value="google" v-model="picked">
<input type="radio" id="google" value="Google" v-model="picked">
<script>
	const app = {
		data() {
			return {
				picked : 'google'
			}
		}
	}
	Vue.createApp(app).mount('#app')
</script>
```
8, demo4 下拉列表-单选
```html
<select v-model="selected" name="fruit">
<option value="">选择一个网站</option>
<option value="www.note.com">note</option>
<option value="www.google.com">Google</option>
</select>
<script>
	new Vue({
		el: '#app',
		data: {
			selected: ''
		}
	})
</script>
```
9, demo5 下拉列表-多选
```html
<select v-model="selected" name="fruit" multiple>
<option value="www.google.com">google</option>
<option value="www.google.com">Google</option>
<option value="www.taobao.com">Taobao</option>
</select>
<script>
const app = {
	data() {
		return {
			selected: ''
		}
	}
}
Vue.createApp(app).mount('#app')
</script>
```
10, demo6 下拉列表-动态选项
```html
<div id="app" class="demo">
  <select v-model="selected">
    <option v-for="option in options" :value="option.value">
      {{ option.text }}
    </option>
  </select>
  <span>选择的是: {{ selected }}</span>
</div>
<script>
const app = {
  data() {
    return {
      selected: 'www.google.com',
      options: [
        { text: 'google', value: 'www.google.com' },
        { text: 'Google', value: 'www.google.com' },
        { text: 'Taobao', value: 'www.taobao.com' }
      ]
    }
  }
}
Vue.createApp(app).mount('#app')
</script>
```
11, demo7 值绑定(单选框,复选框,下拉框)
```html
复选框, 选中时 vm.toggle='好学生'
<input type="checkbox" v-model="toggle" true-value="好学生" false-value="no" />
单选框, 选中时 vm.pick = vm.name
<input type="radio" v-model="pick" v-bind:value="name" />
下拉框, 选中时 vm.selected.number = 123
<select v-model="selected">
	<!-- 内联对象字面量 -->
	<option :value="{ number: 123 }">123</option>
</select>
```

12, input数据处理工具
指令.lazy 更新数据在change事件中触发
```html
<input v-model.lazy="msg" >
```
指令.number 接收转为number类型
```html
<input v-model.number="age" type="number">
```
指令.trim 自动过滤收尾空格
```html
<input v-model.trim="msg">
```

#### 九 自定义指令
1, 自定义v-fff, 元素自动获取焦点
```html
<div id="app">
    <p>页面载入时，input 元素自动获取焦点：</p>
    <input v-fff>
</div>
<script>
	const app = Vue.createApp({})
	// 注册一个全局自定义指令 `v-focus`
	app.directive('fff', {
		// 当被绑定的元素挂载到 DOM 中时……
		mounted(el) {
			// 聚焦元素
			el.focus()
		}
	})
	app.mount('#app')
</script>
```
2, 自定义指令可绑定的触发逻辑(钩子)
```text
mounted: 在绑定元素的父组件被挂载后调用
unmounted: 当指令与元素解除绑定且父组件已卸载时,只调用一次
created: 在绑定元素的属性或事件监听器被应用之前调用
updated: 在包含组件的VNode及其子组件的VNode更新后调用
beforeMount: 指令第一次绑定到元素并且在挂在父组件之前调用
beforeUnmount: 当指令与在绑定元素父组件卸载之前时, 只调用一次
beforeUpdate: 在更新包含组件的VNode之前调用
```
```text 
============vue2->vue3的变化(参考: https://www.cnblogs.com/caijinghong/p/14368369.html)
bind->beforeMount
inserted->mounted
        ->beforeUpdate
update  ->remove
componentUpdated->updated
        ->beforeUnmount
unbind->unmounted
```
```js
import { createApp } from 'vue'
const app = createApp({})
 
// 注册
app.directive('my-directive', {
  // 指令是具有一组生命周期的钩子：
  // 在绑定元素的 attribute 或事件监听器被应用之前调用
  created() {},
  // 在绑定元素的父组件挂载之前调用
  beforeMount() {},
  // 绑定元素的父组件被挂载时调用
  mounted() {},
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate() {},
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated() {},
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount() {},
  // 卸载绑定元素的父组件时调用
  unmounted() {}
})
// 注册 (功能指令)
app.directive('my-directive', () => {
  // 这将被作为 `mounted` 和 `updated` 调用
})
// getter, 如果已注册，则返回指令定义
const myDirective = app.directive('my-directive')
```
3, 绑定触发逻辑参数
```text
el(第一个参数): 指令绑定到的元素,这可用于直接操作DOM
binding(第二个参数): 对象,包含一系列属性
	instance: 使用指令的组件实例
	value: 传递给指令的值,例如,在v-my-directive="1+1"中,该值为2
	oldValue: 先前的值,仅在beforeUpdate和updated中可用,值是否已更改都可用
	arg: 参数传递给指令(如果有)的对象.例如在v-my-directive.foo.bar中,修饰符对象为{foo:true,bar:true}.
	dir: 一个对象,在注册指令时作为参数传递. 例如,在以下指令中
		app.directive('focus', {
  			mounted(el) {
    			el.focus()
  			}
		})
		dir 将会是以下对象：
		{
  			mounted(el) {
   				 el.focus()
  			}
		}
vnode(第三个参数): 作为el参数收到的真实DOM元素的蓝图
prevNode(第四个参数): 上一个虚拟节点, 仅在bforeUpdate和updated钩子中可用
```
4, 绑定简写默认绑定mounted
```html
<div id="app">
    <div v-google="{ color: 'green', text: 'Note!' }"></div>
</div>
<script>
Vue.directive('google', function (el, binding) {
    // 简写方式设置文本及背景颜色
    el.innerHTML = binding.value.text
    el.style.backgroundColor = binding.value.color
})
new Vue({
  el: '#app'
})
</script>
```

#### 十 VUE路由(利用#缓存访问, 或利用H5新特性history)
1, 介绍
```text
这个VUEJS插件提供一系列组件标签,提供路由的各种功能
<router-link>: 设置导航,指定不同的路径,本标签不包含展示,由router-view负责渲染位置
<router-view>: 显示路由组件的视图

```
2, 使用
步骤1: 下载或使用CDN或NPM安装
```text
https://unpkg.com/vue-router@4
```
npm安装
```text
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install vue-router@4
```
步骤2: 使用,举个例子
```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>
 
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```
```js
// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }
 
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]
 
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
 
// 5. 创建并挂载根实例
const app = Vue.createApp({})
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)
 
app.mount('#app')
 
// 现在，应用已经启动了！
```
3, router-link标签的属性
to: 表示目标路由的链接, 当点击后调用router.push(to值),to值可以是一个字符串或者是描述目标位置的对象
```html
<!-- 字符串 -->
<router-link to="home">Home</router-link>
<!-- 渲染结果 -->
<a href="home">Home</a>

<!-- 使用 v-bind 的 JS 表达式 -->
<router-link v-bind:to="'home'">Home</router-link>

<!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
<router-link :to="'home'">Home</router-link>

<!-- 同上 -->
<router-link :to="{ path: 'home' }">Home</router-link>

<!-- 命名的路由 -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

<!-- 带查询参数，下面的结果为 /register?plan=private -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>
```
replace: 当添加了replace属性, 点击时会调用router.replace(to值)而不是router.push(to值),导航后不会留下history记录
```html
<router-link :to="{ path: '/abc'}" replace></router-link>
```
append: 表示是否附加在当前路径后,仅to值是相对路径时生效 例如:当前路径/base, to路径value(/value不生效), 添加后跳转路径为/base/value,而不是/value
```html
<router-link :to="{ path: 'value'}" append></router-link>
```
tag: 渲染成指定的标签,相当于包括了router-view功能
```html
<router-link to="/foo" tag="li">foo</router-link>
<!-- 渲染结果 -->
<li>foo</li>
```
active-class: 设置激活时添加的class名, 匹配方式为前匹配
```html
<style>
   ._active{
      background-color : red;
   }
</style>
<p>
   <router-link v-bind:to = "{ path: '/route1'}" active-class = "_active">Router Link 1</router-link>
   <router-link v-bind:to = "{ path: '/route2'}" tag = "span">Router Link 2</router-link>
</p>
```
exact-active-class: 功能同上, 匹配方式为精确匹配
event: 配置用啦触发导航的事件, 可以是一个字符串或是一个包含字符串的数组
```html
<router-link v-bind:to = "{ path: '/route1'}" event = "mouseover">Router Link 1</router-link>
此代码设置了event为mouseover, 及在鼠标移动到Router Link1上时导航的HTML内容会发生改变
```
#### 十一 对象自动合并(mixins)
略
#### 十二 Ajax(依赖axios第三方包)
```text
Vue 版本推荐使用 axios 来完成 ajax 请求。
Axios 是一个基于 Promise 的 HTTP 库，可以用在浏览器和 node.js 中。
Github开源地址： https://github.com/axios/axios
```
1, 安装axios(下载|CDN|npm|其他)
CDN
```text
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
```
NPM
```text
$ npm install axios
```
bower
```text
$ bower install axios
```
yarn
```text
$ yarn add axios
```
2, 使用axios发起请求
```js
第一种
Vue.axios.get(api).then((response) => {
  console.log(response.data)
})
第二种
this.axios.get(api).then((response) => {
  console.log(response.data)
})
第三种
this.$http.get(api).then((response) => {
  console.log(response.data)
})
```
3, Vue使用axios-GET
```html
<div id="app">
  <h1>网站列表</h1>
  <div v-for="site in info" >
    {{ site.name }}
  </div>
</div>
<script type = "text/javascript">
const app = {
  data() {
    return {
      info: 'Ajax 测试!!'
    }
  },
  mounted () {
    axios
      .get('https://www.runoob.com/try/ajax/json_demo.json')
      .then(response => (this.info = response))
      .catch(function (error) { // 请求失败处理
        console.log(error);
    });
  }
}
 
Vue.createApp(app).mount('#app')
</script>
```
添加params
```js
// 直接在 URL 上添加参数 ID=12345
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 
// 也可以通过 params 设置参数：
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
4, Vue使用axios-POST
```js
axios.post('/user', {
    firstName: 'Fred',        // 参数 firstName
    lastName: 'Flintstone'    // 参数 lastName
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
5, axios其他API
```text
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```
6, 并发多个执行 API
```text
axios.all(iterable)
axios.spread(callback)
```
7, 自定义axios
A, 创建axios实例, 配置参数
```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',// 当没有url时默认地址
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```
B, 利用实例创建请求
```js
axios.get('/user/12345');
axios.get('/user/12345',[config]);
axios.request([config])
axios.get(url, [config])
axios.delete(url, [config])
axios.head(url, [config])
axios.post(url,[data],[config])
axios.put(url,[data],[config])
axios.patch(url,[data],[config])
```
config可配置值
```text
{
  // `url` 是用于请求的服务器 URL
  url: "/user",

  // `method` 是创建请求时使用的方法
  method: "get", // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: "https://some-domain.com/api/",

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 "PUT", "POST" 和 "PATCH" 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {"X-Requested-With": "XMLHttpRequest"},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: "brackets"})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 "PUT", "POST", 和 "PATCH"
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: "Fred"
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求花费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认的

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: "janedoe",
    password: "s00pers3cret"
  },

  // `responseType` 表示服务器响应的数据类型，可以是 "arraybuffer", "blob", "document", "json", "text", "stream"
  responseType: "json", // 默认的

  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: "XSRF-TOKEN", // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: "X-XSRF-TOKEN", // 默认的

  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status &gt;= 200 &amp;&amp; status &lt; 300; // 默认的
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // 默认的

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // "proxy" 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: "127.0.0.1",
    port: 9000,
    auth: : {
      username: "mikeymike",
      password: "rapunz3l"
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```
C 接收响应
```js
axios.get("/user/12345")
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```
response响应格式
```text
{
	// `data` 由服务器提供的响应
	data: {},

	// `status`  HTTP 状态码
	status: 200,

			// `statusText` 来自服务器响应的 HTTP 状态信息
			statusText: "OK",

			// `headers` 服务器响应的头
			headers: {},

	// `config` 是为请求提供的配置信息
	config: {}
}
```
8, axios默认值
```properties
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```
修改默认值
```js
// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 在实例已创建后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
```
配置优先顺序(1<2<3)
1, lib/defaults.js默认值配置
2, defaults属性配置
3, config入参

9, 拦截器
添加拦截器
```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// 另一种写法
var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```
删除拦截器
```js
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```
异常处理
```js
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```
十, 请求格式
A, 默认(axios中lib默认配置不是这个,但是默认却用这个, 挺奇怪)
application/json;charset=utf-8
B, 使用application/x-www-form-urlencoded
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);













