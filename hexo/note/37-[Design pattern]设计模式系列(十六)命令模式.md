---
title: 【Design pattern】设计模式系列(十六)命令模式
date: 2015-06-16 11:22:02
tags:
categories:
- 笔记
---
> \[Design pattern\]: 设计模式相关系列

介绍
----
**概念:** 将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤消的操作。
**应用场景:** 统一处理器的入口,由一个公共的入口来执行各种各样的请求
**好处:** 扩展方便,入口统一

#### CODE

> 处理器的接口定义
```java
package note.com.Command;

public interface ICommand {

    public void doICommand(String label);

}
```
<!--more-->
> 定义各种情况的处理实现
```java
package note.com.Command;

/**
 * 动物类处理
 * @author lxz
 *
 */
public class AnimalCommand  implements ICommand{

    public void doICommand(String label) {
        System.out.println(label+":由我动物类处理器处理");
    }

}
```
```java
package note.com.Command;

/**
 * 鱼类处理
 * @author lxz
 *
 */
public class FishCommand  implements ICommand{

    public void doICommand(String label) {
        System.out.println(label+":由我鱼类处理器处理");
    }

}
```
```java
package note.com.Command;

/**
 * 昆虫类处理
 * @author lxz
 *
 */
public class InsectCommand  implements ICommand{

    public void doICommand(String label) {
        System.out.println(label+":由我昆虫处理器处理");
    }
}
```
```java
package note.com.Command;

/**
 * 人类处理器
 * @author lxz
 *
 */
public class PersonCommand  implements ICommand{

    public void doICommand(String label) {
        System.out.println(label+":由我人类处理器处理");
    }
}
```
```java
package note.com.command;

/**
 * first处理器
 * @author lxz
 *
 */
public class FirstCommand  implements ICommand{

    public void doICommand(String label) {
        System.out.println(label+":由我first处理器处理");
    }
}
```

> 实现一个控制处理器的分配类
```java
package note.com.command;

import java.util.HashMap;
import java.util.Map;

/**
 * 命令执行入口
 * @author lxz
 *
 */
public class MainCommand{
    public static final String FISH = "fish";
    public static final String ANIMAL = "animal";
    public static final String INSECT = "insect";
    public static final String PERSON = "person";
    public static final String FIRST = "first";
    private Map<String,ICommand> Commands = new HashMap<String,ICommand>();
    public MainCommand(){
        Commands.put(FISH, new FishCommand());
        Commands.put(ANIMAL, new AnimalCommand());
        Commands.put(INSECT, new InsectCommand());
        Commands.put(PERSON, new PersonCommand());
        Commands.put(FIRST, new FirstCommand());

    }

    public void doICommand(String label) {
        ICommand ICommand = Commands.get(label);
        if(ICommand!=null){
            ICommand.doICommand(label);
        }
    }

}
```

> 测试类
```java
package note.com.Command;

/**
 * 测试类
 * @author lxz
 *
 */
public class CommandTest {
    public static void main(String[] args) {
        System.out.println("我这里有一个生物需要处理");
        String thing1 = MainCommand.INSECT;//昆虫
        String thing2 = MainCommand.ANIMAL;//动物
        new MainCommand().doICommand(thing1);
        new MainCommand().doICommand(thing2);
    }
}
```


> 结果
```text
我这里有一个生物需要处理
insect:由我昆虫处理器处理
animal:由我动物类处理器处理
```
______
由此,所有的待处理都从MainCommand入口进行处理,不需要知道具体是谁处理了.另外,有新增的物种需要处理时只需要扩张ICommand的实现,并且把该实现收MainCommand管理即可.  例子中没有将实际处理类与MainCommand进行分离,想要这么做也很简单,方式有很多,例如实现配置文件方式加载.

### 命令模式与职责链模式的区别
比较前文的职责链例子与本篇中的命令例子,命令模式的所有Command处理类最后由一个第三方的类来管理与分配具体的执行类.而职责链是直接请求到第一个处理类上,依次往下传递,直到有人处理.
####用两张图说明他们的工作方式:
> 责任链工作模式:
![](/images/37-01.png)
> 命令模式工作模式:
![](/images/37-02.png)