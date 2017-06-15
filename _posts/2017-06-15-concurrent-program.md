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
*并发编程中最重要的两个概念：进程、线程  
这里的栈、堆等概念都是操作系统层面的概念，并不特指某一种语言的设计方式，如Java虚拟机实际上是操作系统的一个进程*

![][2]  
*操作系统中使用虚拟内存映射的方式扩展每个进程可用的内存，好像每个进程都拥有全部的内存空间，实际上是通过操作系统调度让一个进程空闲的内存释放出来给其他进程使用*
# 线程和进程
![][3]  
*多线程中的代码、数据和文件均是各个线程共享的，每个线程拥有一套独立的寄存器和堆栈（逻辑上独立，实际上是同一个寄存器和堆栈空间的不同片），*
# 为什么要用线程？
- 浏览器
	- 线程1显示图像
	- 线程2从网络接收数据
- 文字处理器
	- 线程1显示图形
	- 线程2读取用户键盘输入
	- 线程3自动定时的保存文档

*进程→资源独立，不方便共享资源  
线程→资源可以方便地在各个线程间共享  
线程还可以提高cpu的使用率，因为cpu速度远远快于IO速度，通过时间片法让线程切换着运行，让cpu使用率大大提高，响应速度快，体验好，效率高*  

## 所以总结起来关于线程优点
1. 在很多程序中，需要多个线程互相同步或互斥的并行完成工作，而将这些工作分解到不同的线程中去无疑简化了编程模型。
2. 因为线程相比进程来说，更加的轻量，所以线程的创建和销毁的代价变得更小。
3. 线程提高了性能，虽然线程宏观上是并行的，但微观上却是串行。从CPU角度线程并无法提升性能，但如果某些线程涉及到等待资源（比如IO，等待输入）时，多线程允许进程中的其它线程继续执行而不是整个进程被阻塞，因此提高了CPU的利用率，从这个角度会提升性能。
# 线程的实现
## 完全在用户层实现
>当线程在用户空间下实现时，操作系统对线程的存在一无所知，操作系统只能看到进程，而不能看到线程。所有的线程都是在用户空间实现。在操作系统看来，每一个进程只有一个线程。过去的操作系统大部分是这种实现方式，这种方式的好处之一就是即使操作系统不支持线程，也可以通过库函数来支持线程  
在这种模式下，每一个进程中都维护着一个线程表来追踪本进程中的线程，这个表中包含每个线程独占的资源，比如栈，寄存器，状态等

![][4]
### 优点
1. 在用户空间下进行进程切换的速度要远快于在操作系统内核中实现
2. 程序员可以实现自己的线程调度算法。比如进程可以实现垃圾回收器来回收线程
3. 当线程数量过多时，由于在用户空间维护线程表，不会占用大量的操作系统空间
### 缺点
但是这种方式的缺点是致命的：由于操作系统不知道线程的存在，因此当一个进程中的某一个线程进行系统调用时，比如缺页中断而导致线程阻塞，此时操作系统会阻塞整个进程，即使这个进程中其它线程还在工作  
还有一个问题是假如进程中一个线程长时间不释放CPU，因为用户空间并没有时钟中断机制，会导致此进程中的其它线程得不到CPU而持续等待

> JVM本身就是一个进程，如果用这种方式实现，有什么缺点？

## 在操作系统内核中实现
>内核线程建立和销毁都是由操作系统负责、通过系统调用完成的。在内核的支持下运行，无论是用户进程的线程，或者是系统进程的线程，他们的创建、撤销、切换都是依靠内核实现的。  
线程管理的所有工作由内核完成，应用程序没有进行线程管理的代码，只有一个到内核级线程的编程接口. 内核为进程及其内部的每个线程维护上下文信息，调度也是在内核基于线程架构的基础上完成

![][5]
*这是一种一对一的实现方式，即一个用户线程对应一个内核线程*
### 优点
1.  多处理器系统中，内核能够并行执行同一进程内的多个线程
2.  如果进程中的一个线程被阻塞，能够切换同一进程内的其他线程继续执行（用户级线程的一个缺点）
3.  所有能够阻塞线程的调用都以系统调用的形式实现，代价可观
4.  当一个线程阻塞时，内核根据选择可以运行另一个进程的线程，而用户空间实现的线程中，运行时系统始终运行自己进程中的线程
5.  信号是发给进程而不是线程的，当一个信号到达时，应该由哪一个线程处理它？线程可以“注册”它们感兴趣的信号
### 缺点
开销大，创建和销毁线程都需要内核的参与

## 组合实现方式
>线程创建完全在用户空间中完成，线程的调度和同步也在应用程序中进行. 一个应用程序中的多个用户级线程被映射到一些（小于或等于用户级线程的数目）内核级线程上。

![][6]
*这是现代操作系统常见的实现方式，是一种多对一的实现，效率高，Java虚拟机即采用这种方式*
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


  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%9B%BE%E7%89%871.png "操作系统结构"
  [2]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image5.png "虚拟内存映射"
  [3]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image6.png "单线程与多线程"
  [4]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/image7_1.png "线程完全在用户层实现"
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