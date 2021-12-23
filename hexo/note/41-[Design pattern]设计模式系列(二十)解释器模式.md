---
title: 【Design pattern】设计模式系列(二十)解释器模式
date: 2015-06-20 11:22:02
tags:
categories:
- 笔记
---
> [Design pattern]: 设计模式相关系列

介绍
----
**概念：** 给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。
**应用场景：** 语言解释器（把我们能看懂的代码转换成了难看懂的机器码）
**好处：** 以简单的方式使用复杂的东西。


#### CODE

> 解释器
```java
package note.com.interpreter;

/**
 * 解释器
 * @author lxz
 *
 */
public class Interpreter {

    public void say(String lag){
        if("nh".equals(lag)){
            System.out.println("你好");
        }
    }
}
```

> 调用解释器的人
```java
package note.com.interpreter;


public class People {

    private Interpreter interpreter;

    public People(Interpreter interpreter){
        this.interpreter = interpreter;
    }

    /*
     * 简单语言输入
     */
    public void say(String lag){
        interpreter.say(lag);//调用解释器
    }
    public Interpreter getInterpreter() {
        return interpreter;
    }
    public void setInterpreter(Interpreter interpreter) {
        this.interpreter = interpreter;
    }

}
```

> 测试类
```java
package note.com.interpreter;

public class InterpreterTest {
    public static void main(String[] args) {
        Interpreter i = new Interpreter();
        People people = new People(i);
        people.say("nh");
    }
}
```

> 结果
```text
你好
```
