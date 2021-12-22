---
title: 【方案】业务中MQ的使用方案分析
date: 2021-11-01 14:12:31
tags: 
categories:
---
>[方案系列文章说明]: 该类型的文章是我在使用和学习中认为不错的解决办法,当然会有更好的方案,也一定会有, 所以文章具有一定的局限性, 请结合自己的思考辩证的看.

### 使用命令
```sql
----删除
TRUNCATE TABLE mlog$_xxx_lxz_tmp;
DROP MATERIALIZED VIEW LOG ON xxx_lxz_tmp;

drop materialized view mv_xxx_lxz_tmp

----原表创建增量刷新日志
CREATE MATERIALIZED VIEW LOG ON xxx_lxz_tmp WITH  PRIMARY KEY INCLUDING NEW VALUES;

----创建物化视图
CREATE MATERIALIZED VIEW mv_xxx_lxz_tmp
   Build immediate                                                  //默认方式    创建即刷新     DEFERRED    下次刷新填入数据
    REFRESH fast START WITH SYSDATE + 2/24      // fast刷新       开始时间  凌晨两点
   NEXT round(sysdate+1) + 2/24                          //下次刷新        明天两点
   AS SELECT * FROM xxx_lxz_tmp;                       //语句
```

### 物化视图刷新
需创建定时任务
```sql
declare joblxz NUMBER;
begin
dbms_job.submit(job=>joblxz,what=>'mv_xxx_lxz_tmp;',next_date=>to_date('20191120 21:30:00','yyyyMMdd hh24:mi:ss'),interval=>'sysdate+1+30/(24*60)',no_parse=>false);
end;
```

启动
```sql
BEGIN
  DBMS_JOB.RUN(23);
  commit;
END;

23 就是定时器得索引  可根据下面方式查出
select * from user_jobs；——查看调度任务
select * from dba_jobs_running；——查看正在执行的调度任务
select * from dba_jobs；——查看执行完的调度任务
```

### 关于 interval 的一些设置技巧
```text
关于job运行时间
1:每分钟执行
Interval => TRUNC(sysdate,'mi') + 1/(24*60)
2:每天定时执行
例如：每天的凌晨1点执行
Interval => TRUNC(sysdate) + 1 +1/(24)
3:每周定时执行
例如：每周一凌晨1点执行
Interval => TRUNC(next_day(sysdate,'星期一'))+1/24
4:每月定时执行
例如：每月1日凌晨1点执行
Interval =>TRUNC(LAST_DAY(SYSDATE))+1+1/24
5:每季度定时执行
例如每季度的第一天凌晨1点执行
Interval => TRUNC(ADD_MONTHS(SYSDATE,3),'Q') + 1/24
6:每半年定时执行
例如：每年7月1日和1月1日凌晨1点
Interval => ADD_MONTHS(trunc(sysdate,'yyyy'),6)+1/24
7:每年定时执行
例如：每年1月1日凌晨1点执行
Interval =>ADD_MONTHS(trunc(sysdate,'yyyy'), 12)+1/24
```

job的运行频率设置
```text
1.每天固定时间运行，比如早上8:10分钟：Trunc(Sysdate+1) + (8*60+10)/24*60
2.Toad中提供的：
每天：trunc(sysdate+1)
每周：trunc(sysdate+7)
每月：trunc(sysdate+30)
每个星期日：next_day(trunc(sysdate),'星期日')
每天6点：trunc(sysdate+1)+6/24
半个小时：sysdate+30/(24*60)
3.每个小时的第15分钟运行，比如：8:15，9:15，10:15…：trunc(sysdate,'hh')+(60+15)/(24*60)。
```


#### 定时器得多种操作
1.设置定时器开关
```text
dbms_job.broken(jobid,off);
jobid:user_jobs表中的jobid（主键），数字格式
off:定时任务开关，true or false，true关闭，false开启
```

2.运行定时器
```text
dbms_job.run(23);
jobid:user_jobs表中的jobid（主键），数字格式
```

3.删除定时器
```text
dbms_job.remove(jobid);
jobid:user_jobs表中的jobid（主键），数字格式
```

4.修改定时器
```text
dbms_job.change(jobid,what,next_date,interval);
jobid:user_jobs表中的jobid（主键），数字格式
what:要执行的存储过程，不用写begin end 但在结尾要加分号
next_date:下一次执行的时间，这个参数是时间格式的，而不是字符串
interval:执行频率，也就是计算下一次执行时间的公式，是字符串格式的
```
