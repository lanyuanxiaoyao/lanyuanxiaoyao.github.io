---
layout: post
title: 2017编程提高第1节课——Java并发编程
date: 2017-06-15 20:29
categories: 2017编程提高
tags: [软件工程,SRP,单一职责原则,作业]
---

* content
{:toc}

# 回顾一下
![][1]

![][2]
# 线程和进程
![][3]
# 为什么要用线程？
- 浏览器
	- 线程1显示图像
	- 线程2从网络接收数据
- 文字处理器
	- 线程1显示图形
	- 线程2读取用户键盘输入
	- 线程3自动定时的保存文档

# 线程的实现：完全在用户层实现
![][4]
> JVM本身就是一个进程，如果用这种方式实现，有什么缺点？

![][5]

![][6]
# 多线程编程的特点
![][7]
- 同一份代码，可以有多个线程执行
	- 既可以在一个CPU核上并发执行
	- 也可以在多个CPU核上并行执行
- 线程的执行默认是乱序的
	- 程序员不能假定执行次序
- 线程会共享数据（对象的变量）
	- 需要互斥
- 线程之间也需要合作（同步）

# 如何实现互斥 ？
## 锁
- 只有获得了锁的线程，才能够对共享资源做操作， 换句话说：进入临界区
- 对共享资源做完操作（即使发生异常），一定要释放锁！

![][8]
## 锁到底是个什么东西？
- “锁”本身如果是软件， 也没法保证原子性！
	- 多个CPU对“锁”操作的时候也会出错
- 最底层需要硬件指令的支持
	- TestAndSet
	- Swap
	- CAS

### 硬件指令：TestAndSet
![][9]

![][10]
### 硬件指令： Swap
![][11]
## 设计“锁”需要考虑的问题
- 线程申请锁的时候， 发现已经被别的线程持有， 线程该怎么办？
- 继续尝试，无限循环
	- 时间片用完了， 变为就绪状态，等待下次调度
	- **自旋锁**
- 把线程放到阻塞队列中

## 可重入性
- 自旋锁无法重入
![][12]
- 解决办法
	- 记录这个锁被谁持有
	- 记录重入的次数

# 线程之间的通信
## 通过共享变量
![][13]
##  wait /notify
![][14]
## join
![][15]
### Join的实现
![][16]

# 线程的状态
![][17]
# JDK中常用的锁
## 可重入互斥锁
![][18]
## 信号量
![][19]
**在同一时刻，只能有3个线程能够获得锁**

##  Reader Writer
![][20]
##  CountDownLatch
![][21]
##  CyclicBarrier
![][22]

# 死锁
![][23]

![][24]
## 死锁的预防
- 每个线程申请锁的时候都按照特定的次序
![][25]
- 申请锁的时候加上timeout
![][26]
# 例子： 银行转账
![][27]

![][28]


  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%9B%BE%E7%89%871.png "回顾"
  [2]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image5.png "回顾"
  [3]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image6.png "image6"
  [4]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image7_1.png "image7_1"
  [5]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image8.png "image8"
  [6]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image9_1.png "image9_1"
  [7]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image10.png "image10"
  [8]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/pic.png "pic"
  [9]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image11.png "image11"
  [10]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image12.png "image12"
  [11]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image13.png "image13"
  [12]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image14.png "image14"
  [13]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image15.png "image15"
  [14]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image16.png "image16"
  [15]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image17.png "image17"
  [16]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image18.png "image18"
  [17]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/state-machine-example-java-6-thread-states.png "state-machine-example-java-6-thread-states"
  [18]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image21.png "image21"
  [19]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image22.png "image22"
  [20]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image23.png "image23"
  [21]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image24.png "image24"
  [22]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image25.png "image25"
  [23]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image26.png "image26"
  [24]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image27.png "image27"
  [25]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image28.png "image28"
  [26]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image29.png "image29"
  [27]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image30.png "image30"
  [28]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image31.png "image31"