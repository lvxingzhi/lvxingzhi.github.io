---
title: 【笔记】GIT代码管理&提交规范
date: 2020-04-10 11:14:18
tags:
categories:
- 笔记
---
> \[笔记系列文章说明\]: 该类型的文章是笔者学习过程中整理的学习笔记.


本篇整理一下项目中用到的管理代码的规范

#### 一, 项目分支结构
分支环境:
开发环境:dev
测试环境:test
预生产环境:prev
生产环境:master

根据需要会分出test_2.0、test_bug等次级分支，测试到上线都会在这个分支进行。最终会同步到test、master分支。

#### 二, 需求&BUG分支创建与命名
__分支代码从prev拉取__ 

分支命名规则: 项目名+_+日期+_+类型+_+开发名称/bug号/bug名称(+_+修复人标识)

__需求开发分支命名:__ 
```text
stc_20210629_dev_version2

或

stc_20210629_dev_version2_lxz
```
<!--more-->

__BUG修复分支命名:__ 
```text
stc_20210629_bug_205

或

stc_20210629_bug_205_lxz
```


#### 三, 项目开发GIT代码提交规范
1. 多人协作分支开发提交(单人使用分支可直接提交到分支)
```shell
git stash 保存代码
git pull --rebase 拉取最新代码
git stash pop 还原保存的修改代码
git commit -m "[BUG修复][V1.0-资产管理-车辆借调][无] "
git push
```

__提示: 如使用idea ui提交, 遇到下图提示,选择rebase, 遇到冲突解决冲突后提交,注意不要覆盖和遗漏代码,解决冲突时请慎重对比！！！__ 
![](/images/51-01.png)


2. 分支开发结束后合并dev

原则: 分支合并dev的最新代码后再合并到dev

* 第零步, 切换到dev分支
```shell
git pull --rebase // 确保本地dev分支代码为最新的
```

* 第一步, 切换到开发分支
```shell
git pull --rebase
git merge remotes/origin/dev
git push
```
有冲突解决冲突


* 第二步, 切换到dev分支
```shell
git pull --rebase
git merge remotes/origin/stc_20210629_bug_205
git commit "[合并][BUG修复][V1.0-资产管理-车辆借调][无] 修复页面展示bug"
git push
```



3. dev分支合并到test分支

* 第一步, 切换到test分支
```shell
git pull --rebase
git merge remotes/origin/dev
git commit
git push
```

4. test分支合并到prev分支

* 第一步, 切换到prev分支
```shell
git pull --rebase
git merge remotes/origin/test
git commit
git push
```

5. prev分支合并到master分支

* 第一步, 切换到master分支
```shell
git pull --rebase
git merge --squash remotes/origin/prev
git commit "[合并] [V1.0-代码合并][特殊说明]"
git push
```
合并提交，保证有问题可以快速回滚部署



6. 原则上不需要提交自己使用分支。允许提交自己分支，但是上线完成后自行删除



#### 四, 常见问题
1. commit后还未push,如何撤销
```shell
git reset --soft HEAD~1 // 未达到效果继续执行, 数字代表reset commit的次数

2.  本地commit后还未push, 如何修改提交的注释
```shell
git commit--amend
```



