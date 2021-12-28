---
title: 【笔记】Oracle中的排序与分页踩坑实录
date: 2016-01-02 15:02:12
tags:
categories:
    - 笔记
---
> \[笔记系列文章说明\]: 该类型的文章是笔者学习过程中整理的学习笔记.

#### 起因
  在项目中有用到某表作为数据来源，在页面以列表的形式显示。使用的数据库是Oracle，分页的时候使用到了rownum这个关键字。  
  列表有排序功能，自然也用到了order by。
  接下来问题出现了，我在用order by查询数据库数据的时候显示的内容，和页面列表处显示的内容竟然不一致。心里想不明白，各种倒腾，终于弄明白了其中一二。

##### 首先说结论
当使用order by与rownum结合时,请一定保证order by后有一个能保证唯一的列
例如 select t.* from person t order by t.age,t.id; //id为主键,age可能重复

> 接下来验证之前的现象和我得出的结论

1,首先创建表
```sql
create table A_LXZ (id int ,name VARchar2(10),age int)
```

2,插入数据
```sql
insert into A_LXZ(id,name,age)values(1,'a',3);
insert into A_LXZ(id,name,age)values(2,'b',4);
insert into A_LXZ(id,name,age)values(3,'c',5);
insert into A_LXZ(id,name,age)values(4,'d',6);
insert into A_LXZ(id,name,age)values(8,'h',7);
insert into A_LXZ(id,name,age)values(9,'i',7);
insert into A_LXZ(id,name,age)values(6,'f',7);
insert into A_LXZ(id,name,age)values(5,'e',7);
insert into A_LXZ(id,name,age)values(7,'g',7);
insert into A_LXZ(id,name,age)values(10,'j',8);
insert into A_LXZ(id,name,age)values(11,'k',9);
```
<!--more-->
3,查询结果
![](/images/20-01.png)

4,使用order by age查询结果
![](/images/20-02.png)

5,使用order by + rownum 获取前面的N条结果时,结果如下
![](/images/20-03.png)

到这里,问题就出来了,ID为7的数据去了哪里? 本来想要得到的结果集是这样的:
![](/images/20-04.png)

却得到了这样
![](/images/20-05.png)

##### 原因是:
当order by 排序后遇到相同的数据时,rownum的确定是无序排列(不稳定排序),
比如打印出rownum的值:
![](/images/20-06.png)

可以看到id=7的rownum是9,所以我们获取rownum<=8时,是获取不到id=7的数据的,所以看到的和真正获取到的可能不一致.  

由此得出结论,当我们使用order by和rownum的时候,请保证order by 后至少有一个列是具有唯一值的.
例如:
![](/images/20-07.png)
![](/images/20-08.png)
这样数据就能够保证查询与获取是一致的了.