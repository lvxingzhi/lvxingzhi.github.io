---
title: 【笔记】Zookeeper应用
date: 2016-04-11 12:22:55
tags:
categories:
- 笔记
---
> [笔记系列文章说明]: 该类型的文章是笔者学习过程中整理的学习笔记.

#### 说明
zookeeper是一个分布式的,为分布式应用提供数据一致性服务的程序.

#### Zookeeper是怎么来的?
**分布式系统：** 是一个硬件或软件组件分布在不同的网络计算机上，彼此之间仅仅通过 __消息传递__ 进行通信和协调的系统。

**在这个消息传递的过程中遇到的问题:** 传输中数据被篡改,数据丢失处理,数据超时处理,数据的事务控制,可以统称为数据的一致性问题.

解决分布式系统中数据传输的一致性问题的理论基础:CAID，CAP（一致性，可用性，分区容错性）,BASE等一致性方面的理论

结合理论基础,演变出分布式数据一致性协议算法,如2PC,3PC，Raft ，Paxos算法等.

##### 解决消息传递过程中的两个问题:
###### 1，消息传递中的消息篡改，消息容错机制
拜占庭将军问题：

      拜占庭帝国有许多支军队，不同军队的将军之间必须制定一个统一的行动计划，从而做出进攻或者撤退的决定，同时，各个将军在地理上都是被分隔开来的，只能依靠军队的通讯员来进行通讯。然而，在所有的通讯员中可能会存在叛徒，这些叛徒可以任意篡改消息，从而达到欺骗将军的目的。

解决方式:比如系统中的数字签名,数据加密
<!--more-->
###### 2，消息在分布式中的数据一致性问题
故事描述一致性遇到的问题：

      在古希腊有一个Paxos小岛，岛上以议会的形式通过法令。议会中的议员通过信使传递消息，议员和信使都是兼职的，随时可能离开议会厅，并且信使可能重复投递消息，也可能一去不返。议会协议要保证在这种情况下法令仍然能够正确的产生，并且不会出现冲突。
故事来自于Paxos算法论文,该论文通篇用故事的形式讲述了小岛议会是如何解决这个问题的.

**基于算法的应用实践：** 
Google Chubby：分布式锁服务，以Paxos算法为基础
雅虎  ZooKeeper: 分布式协调服务 ， 以ZAB算法为基础

#### Zookeeper介绍
```text
官网：http://zookeeper.apache.org/
源码地址： https://github.com/apache/zookeeper
```

**Zookeeper提供的特性** 
1. 顺序一致性 ：同一个客户端连续的请求能够被ZooKeeper顺序的处理，尤其是写命令的顺序执行
2. 原子性 ：Zookeeper集群上的数据操作具有原子性
3. 单一视图 ：Zookeeper集群上的数据一致
4. 可靠性：保证被修改的数据持久不变,提供了数据的可靠性
5. 实时性：Zookeeper仅仅能保证最终一致性，而不是实时的（CAP定理）

**Zookeeper的几个基本概念** 
1. 集群：zookeeper采用leader(写)，follower(读,推举leader)，observer(读)的方式实现集群
2. 会话：客户端与zookeeper的连接会话
3. 数据节点：树形结构的节点，每个节点可以存储信息
4. 版本：每个节点维护的版本信息
5. 事件监听器：可以为用户在节点上注册事件，节点改动触发注册的事件(监听者模式)
6. ACL：权限控制，控制节点操作访问的权限

**应用场景**
在分布式的场景中,Zookeeper可应用于数据发布/订阅，负载均衡，命名服务，分布式协调/通知，集群管理等。

#### Zookeeper使用
下载地址：http://zookeeper.apache.org/releases.html
要求:
```text
JAVA1.6+
系统多平台支持
目录解释
支持三种模式：单机模式，集群模式，伪集群模式
```
配置文件:
```text
tickTime=2000 : 服务器或者客户端与服务器之间维持心跳的时间间隔

dataDir=/var/lib/zookeeper : 数据存放目录

clientPort=2181 : 监听的端口

dataLogDir=E:\\test-tool\\zookeeper-3.4.8\\log : 日志目录

集群相关配置

initLimit=5  : 集群初始化连接超时时间

syncLimit=2  ：集群心跳超时时间

server.1=127.0.0.1:2888:3888 

server.2=127.0.0.2:2888:3888
```
IP:程序通讯监听端口:选举端口
当使用集群模式时
在DataDir目录下创建myid文件，里面是集群编号

**单机模式配置** 
```text
tickTime=2000

dataDir=/var/lib/zookeeper

clientPort=2181

dataLogDir=E:\\test-tool\\zookeeper-3.4.8\\log initLimit=5

syncLimit=2 

server.1=127.0.0.1:2888:3888 
```

**集群模式配置** 
```text
tickTime=2000

dataDir=/var/lib/zookeeper

clientPort=2181

dataLogDir=E:\\test-tool\\zookeeper-3.4.8\\log initLimit=5

syncLimit=2 

server.1=127.0.0.1:2888:3888 

server.2=127.0.0.2:2888:3888
```

**伪集群模式配置** 
```text
tickTime=2000

dataDir=/var/lib/zookeeper

clientPort=2181

dataLogDir=E:\\test-tool\\zookeeper-3.4.8\\log initLimit=5

syncLimit=2 

server.1=127.0.0.1:2888:3888

server.2=127.0.0.1:2889:3889     //多进程运作
```

**启动方式有两种** 
1.         bin脚本
2.         jar包Main方法

> 命令解释

+ zkCleanup：清理ZooKeeper历史数据，包括shiwu日志文件和快照数据文件
+ zkCli：ZooKeeper的一个简易客户端，可以做一些简易操作
+ zkEnv：设置ZooKeeper的环境变量
+ zkServer：ZooKeeper服务器的启动，停止和重启脚本
+ 启动：zkServer.Sh
+ 停止：zkServer.sh  stop
+ 客户端连接：zkCli –server ip：port

> zkCli操作Zookeeper基本命令

1. 创建节点
Create [-s] [-e] path data acl
-s顺序   -e临时节点   path节点路径和名称   data节点存储的数据    acl权限控制
2. 列出节点列表
ls path [watch]
path节点路径和名称  watch事件监听器
3. 查看节点数据和信息
get path [watch]
4. 设置节点数据
get path data [version]
5. 删除
Delete path [version]

##### 查看日志
基于Zookeeper API的开发提供了更加丰富的接口,如创建会话,创建节点,删除节点,读取数据,更新数据,检测节点是否存在,权限控制,事件监听等

对zookeeper API封装的工具,他们提供了更方便的调用方式：
Zkclient：地址https://github.com/sgroschupf/zkclient
Curator：地址https://github.com/Netflix/curator

### Dubbo如何在zookeeper上工作
![](/images/47-01.png)

Zookeeper在Dubbo的整个体系中充当服务注册中心的作用.
通常的服务注册中心可以有多种形式去实现,比如:数据库,zookeeper,redis,文件系统等

**Dubbo数据信息在Zookeeper中的存储方式**
![](/images/47-02.png)
```text
/dubbo dubbo根节点

/dubbo/com.foo.BarService 服务节点

/dubbo/com.foo.BarService/providers 提供者根节点

/dubbo/com.foo.BarService/consumers 消费者根节点
```


1. 服务提供者
在/dubbo/com.foo.BarService/providers节点下创建提供者节点
2. 服务消费者
在/dubbo/com.foo.BarService/consumers节点下创建提供者节点
   
**注册与消费过程** 
1. dubbo服务提供者启动,向Zookeeper上的提供者根节点下创建服务提供临时节点,包括地址类型等信息
2. dubbo服务消费者启动,向Zookeeper请求服务提供列表,并向服务消费根节点下创建消费者临时节点
3. 启动dubbo监控中心,向Zookeeper中获取提供者与消费者的节点列表,并在节点上注册事件监听器进行变化监控.










