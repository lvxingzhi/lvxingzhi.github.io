---
title: 【方案】Redis+数据库双写问题
date: 2021-11-01 14:12:31
tags: 
categories:
---
>\[方案系列文章说明\]: 该类型的文章是我在使用和学习中认为不错的解决办法,当然会有更好的方案,也一定会有, 所以文章具有一定的局限性, 请结合自己的思考辩证的看.

业务中使用Redis进行数据缓存,通常会遇到数据一致性问题,这里进行分析和讨论几种方案.

## 常见使用方式及问题
### 场景一 
```bash
S1: update/delete redis
S2: open Transaction
S3: 处理业务
S4: commit Transaction
```
**问题**
1, 并发时, 缓存删除后事务执行期间,其他线程的读将造成缓存脏数据
**结论**
脏数据的概率非常大,方案淘汰
<!--more-->
### 场景二
```bash
S1: open Transaction
S2: 处理业务
S3: commit Transaction
S4: update/delete redis
```
**问题**
1,同样是并发操作, 删除redis业务处理快过写缓存的业务,将造成缓存脏数据
2,update效率要低于delete,不管是本身执行效率还是命中率低的情况下
**结论**
概率小, 通过缓存设置过期时间可降低脏数据的持续时间


### 场景三
```bash
S1: delete redis
S2: open Transaction
S3: 处理业务
S4: commit Transaction
S5: delete redis
```
**结论**
双删效果和场景二类似,效果不大,反而提高了并发读与写产生脏数据的概率,没必要

## 针对场景二继续优化
### 场景四  
```bash
S1: open Transaction
S2: 处理业务
S3: commit Transaction
S4: update/delete redis
S5: 发送延迟删除MQ消息/延迟执行定时任务
```
**结论**
1, 通过缩减延迟删除的间隔时间,将缓存产生脏数据的时间控制在可控范围内
2, 同时提供一个保障机制, 当redis处理失败有兜底和重试

## 补充
替代MQ/定时任务作为保障机制, 可以使用Mysql的binlog订阅去处理缓存
相关组件: alibaba的canal mysql组件,发送消息给程序完成通知


## 实践
* 回归缓存的本质, 在允许一定延迟的业务中使用缓存,可以考虑场景二的方案
* 当处理非常实时的数据时, 在性能支持的情况下, 请直接查库, 不要自找麻烦
* 当QPS查询量非常大,且对实时性有一定要求,那么不妨尝试使用场景四方案进行优化




