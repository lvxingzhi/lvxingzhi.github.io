---
title: 【笔记】MongoDB学习
date: 2016-02-11 18:01:56
tags:
categories:
- 笔记
---
> \[笔记系列文章说明\]: 该类型的文章是笔者学习过程中整理的学习笔记.

### NOSQL
#### 认识MongoDB
流行的数据库Oracle,SqlServer,MySql为关系性数据库,相对的,也有非关系性数据库,统称为NoSql,而MongoDB就是NoSql的其中一种.

#### 关系性数据库特点
* 高度组织化结构化数据
* 结构化查询语言（SQL） (SQL)
* 数据和关系都存储在单独的表中。
* 数据操纵语言，数据定义语言
* 严格的一致性
* 基础事务

#### 非关系型数据库特点
* 代表着不仅仅是SQL
* 没有声明性查询语言
* 没有预定义的模式
* 键 - 值对存储，列存储，文档存储，图形数据库
* 最终一致性，而非ACID属性
* 非结构化和不可预知的数据
* CAP定理
* 高性能，高可用性和可伸缩性
>由上可以看出,关系型数据库更加安全,严谨,而非关系型数据库更加追求性能.从他们遵从的原则同样可以得出以上结论

![](/images/18-01.png)
<!--more-->
### MongoDB
#### MongoDB简介
> 文档型数据库,由C++编写.

#### MongoDB使用场景
1. 海量数据,经常用来分析,查询.
2. 数据通常较为固定.
3. 数据格式不固定.
从下图亦可得出以上结论
![](/images/18-02.png)
   
#### mongodb中基本的概念
文档、集合、数据库
与关系数据库的概念对比更容易理解
![](/images/18-03.png)

关系型数据库数据形式与mongodb数据形式
![](/images/18-04.png)

mongodb支持的数据类型
![](/images/18-05.png)

#### MongoDB命令
|    名称   |      命令    |                     注释                    |
|----------|-------------|---------------------------------------------|
| 创建数据库 | use DATABASE_NAME | 有则使用,无则创建(添加了数据才算是真正的创建)  |
| 查询所有数据库 | show dbs |   |
| 删除数据库 | db.dropDatabase() |  删除前需use |
| 查看当前数据库 | db |   |
| 创建集合 |db.createCollection(name, {capped: <Boolean>, autoIndexId: <Boolean>, size: <number>, max <number>} )  | name:集合的名字capped:是否启用集合限制，如果开启需要制定一个限制条件，默认为不启用，这个参数没有实际意义size:限制集合使用空间的大小，默认为没有限制max:集合中最大条数限制，默认为没有限制autoIndexId:是否使用_id作为索引，默认为使用(true或false)size的优先级比max要高注意:集合也可在插入数据时创建  |
| 删除集合 | db.集合名称.drop() |   |
| 插入文档 | db.集合.insert(document) |  文档格式为BSON格式(二进制JSON) |
| 插入多个文档 | db.集合.insert([document,document,document]) |  数组形式 |
| 更新文档 | db.collection.update(<query>,<update>,{upsert: <boolean>,multi: <boolean>,writeConcern: <document>}) |  query : update的查询条件，类似sql update查询内where后面的。update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。writeConcern :可选，抛出异常的级别。 |
| 替换文档 | db.collection.save(<document>,{writeConcern: <document>}) |  document : 文档数据。writeConcern :可选，抛出异常的级别。注意:document中必须有"_id" : ObjectId("56064f89ade2f21f36b03136") |
| 定义变量 | xxx=({xxx:xxx}); |   |
| 查询文档 | db.集合.find(<条件><显示控制>) |  具体条件和显示控制这里略形如:{}{name:1,age:0} 1:显示,0:不显示 |
| 格式化查询结果 | db.集合.find(<条件><显示控制>).pretty() | 容易看  |
| 删除文档 | db.collection.remove(<query>,{justOne: <boolean>,writeConcern: <document>}) |  query :（可选）删除的文档的条件。justOne : （可选）如果设为 true 或 1，则只删除一个文档。writeConcern :（可选）抛出异常的级别。 |
| 限制获取数量 |  db.集合.find().limit(num) |  限制取多少个 |
| 从哪里开始取 | db.集合.find().skip(num) | 从第几个开始取,第一个为0  |
| 排序 | db.集合.find().sort({KEY:1}) |  1:升序  -1:降序默认升序 |
| 创建索引 | db.集合.ensureIndex({KEY:1},{参数}) |  1:升序  -1:降序默认升序参数略 |
| 删除索引 | db.集合.dropIndex({KEY:1}) |   |
| 使用管道 | db.集合.aggregate([{$操作:{}},{$操作:{}}]) | 利用管道可使用各种查询组合具体管道表达式支持 略  |

#### 维护
##### 主从复制
MongoDB有主从复制技术,解决高可用和容灾问题,也就是备份.
![](/images/18-06.png)
配置主从的特点:
* N 个节点的集群
* 任何节点可作为主节点
* 所有写入操作都在主节点上
* 自动故障转移
* 自动恢复

数据分布式存储:
MongoDB支持分布式存储
推荐网址:http://www.lanceyan.com/tech/arch/mongodb_shard1.html

MongoDB数据备份
```shell
mongodump -h dbhost -d dbname -o dbdirectory
```
- h：
MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017
- d：
需要备份的数据库实例，例如：test
- o：
备份的数据存放位置，例如：c:\data\dump，当然该目录需要提前建立，在备份完成后，系统自动在dump目录下建立一个test目录，这个目录里面存放该数据库实例的备份数据。

MongoDB数据恢复
```shell
mongorestore -h dbhost -d dbname --directoryperdb dbdirectory
```
- h：
MongoDB所在服务器地址

- d：
需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2

- directoryperdb：
备份数据所在位置，例如：c:\data\dump\test，这里为什么要多加一个test，而不是备份时候的dump，读者自己查看提示吧！

- drop：
恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用哦！

##### MongoDB运行情况监控
参考地址:http://my.oschina.net/costaxu/blog/189406
##### mongostat查看当前运行情况
参考地址:http://blog.csdn.net/samxx8/article/details/36640037
##### mongotop查看效率