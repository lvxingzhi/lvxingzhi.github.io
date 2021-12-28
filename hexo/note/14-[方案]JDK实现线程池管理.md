---
title: 【方案】JDK实现线程池管理 
date: 2017-11-01 22:01:21 
tags:
categories:
---
> \[方案系列文章说明\]: 该类型的文章是我在使用和学习中认为不错的解决办法,当然会有更好的方案,也一定会有, 所以文章具有一定的局限性, 请结合自己的思考辩证的看.

#### 线程池的特点

1. 迅速响应.
2. 线程之间无优先级.
3. 线程执行时间短,不阻塞其他任务.
4. 线程不可绑定操作,不可被跟踪.

#### 优点

1. 对象线程不用重复的创建与销毁,节省时间,资源.
2. 可以对线程的数量进行控制.

#### CODE
<!--more-->
```java
import java.util.LinkedList;

public class ThreadPool extends ThreadGroup {

    private boolean isAlive;// 是否活着

    private LinkedList<Runnable> taskQueue;// 任务队列

    private int threadID;// 线程ID

    private static int threadPoolID;// 线程池ID

    public ThreadPool(int threadNums) {
        super("线程池-" + (threadPoolID++));
        setDaemon(true);// 设置线程组为守护线程组
        isAlive = true;// 设置线程组的初始状态
        taskQueue = new LinkedList<Runnable>();// 初始化任务队列
        for (int i = 0; i < threadNums; i++) {
            //  启动组中的线程(初始化线程,线程一直保持运行状态,不断地获取线程池里面的待执行任务)
            new PooledThread().start();
        }
    }

    /**
     * 运行任务的入口,线程安全(有序的到达线程池)
     *
     * @param task
     */
    public synchronized void runTask(Runnable task) {
        // 如果线程池关闭状态,抛出异常
        if (!isAlive) {
            throw new IllegalStateException();
        }
        // 如果任务不为null
        if (task != null) {
            // 加入任务队列
            taskQueue.add(task);
            notify();// 激活该方法上的其他线程之一
        }
    }

    /**
     * 获取等待执行的任务,线程安全(保证一次获取一个,不重复)
     * @return
     * @throws InterruptedException
     */
    protected synchronized Runnable getTask() throws InterruptedException {
        //当线程池没有可运行的任务时,并且线程池在工作状态,挂起线程池
        while (taskQueue.size() == 0) {
            if (!isAlive) {
                return null;
            }
            wait();
        }
        //否则,返回一条任务
        return (Runnable) taskQueue.removeFirst();
    }

    /**
     * 关闭线程池,停止所有在运行的任务
     */
    public synchronized void close() {
        //如果线程池是活的
        if (isAlive) {
            //关闭
            isAlive = false;//
            //清空任务
            taskQueue.clear();
            interrupt();//关闭线程组里面的所有线程(此方法不一定能够停止线程,只是更改了isInterrupted()方法的状态)
        }
    }

    /**
     * 关闭线程池,不停止在运行的任务
     */
    public void join() {
        synchronized (this) {
            isAlive = false;
            notifyAll();
        }
        //执行未完成的任务
        Thread[] threads = new Thread[activeCount()];//创建池中的线程数量一致的数组
        int count = enumerate(threads);//复制本线程池中的线程到刚才创建的线程数组
        //然后依次执行线程数组中的线程
        for (int i = 0; i < count; i++) {
            try {
                threads[i].join();//效果相当于执行
            } catch (InterruptedException ei) {
                ei.printStackTrace();
            }
        }
    }

    public class PooledThread extends Thread {

        /**
         * 创建线程的时候指定线程池
         * @param tg
         * @param threadPoolName
         */
        public PooledThread() {
            super(ThreadPool.this, "线程(ID号)" + threadID++);
        }

        /**
         * 重写run方法
         */
        public void run() {
            while (!isInterrupted()) {
                Runnable task = null;
                try {
                    task = getTask();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                if (task == null) {
                    return;
                }
                try {
                    System.out.println(this.getId());
                    task.run();
                } catch (Throwable e) {
                    // 处理异常
                    uncaughtException(this, e);
                }
            }
        }
    }
}
```

#### Test

```java
public class Test {
    public static void main(String[] args) {
        for (int i = 0; i < args.length; i++) {
            System.out.println(args[i]);
        }
        if (args.length != 2) {
            System.out.println("测试自定义线程池开始");
            System.out.println("使用方法,两个参数[任务数,线程数]");
            System.out.println("任务数-int:需要执行的任务数");
            System.out.println("线程数-int:线程池初始化数量");
        }
        int numTasks = 20;
        int numThreads = 5;
        ThreadPool threadPool = new ThreadPool(numThreads);
        for (int i = 0; i < numTasks; i++) {
            threadPool.runTask(createTask(i));
        }
        threadPool.join();
    }

    private static Runnable createTask(final int taskID) {
        return new Runnable() {

            @Override
            public void run() {
                System.out.println("任务" + taskID + "开始");
                try {
                    Thread.sleep(500);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                System.out.println("任务" + taskID + "结束");
            }
        };
    }

}
```