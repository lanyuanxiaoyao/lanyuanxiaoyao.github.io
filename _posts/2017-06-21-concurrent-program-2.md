---
title: 2017编程提高第2.5节课——Java并发编程(2)
key: 2017-06-21-concurrent-program-2
date: 2017-06-21 23:29
categories: 2017编程提高
tags: [Java,多线程]
---

* content
{:toc}

# 作业讲评
## OCP重构作业
### 题目
![][1]

![][2]
### 分析
#### 需要抽象的重点概念
**Formatter 和 Sender**  

![][3]

#### 如何得到Formatter和Sender 实例？
- 直接new 出来
```java
Logger logger = new Logger(new RawFormatter(), new MailSender());
```
- 使用工厂

![][4]

## SRP重构作业
- 原始程序：使用面向对象的语言编写面向过程的程序
	- toAddress, subject, message 应该和某个实例相关， 但是他们遍布程序的各个方法
- 隐藏的业务问题
	- 在原始的代码中似乎只读取了文件的第一行
- User 和Product 是什么关系？
- 如果一个用户订阅了多个产品， 应该发送几个邮件?

### 需要抽象的核心概念
1. User
2. Product
3. Mail
4. MailSender

- 情况1： 如果每次只有一个产品促销， 原来的促销文件写错了
- 情况2： 如果确实有多个产品促销

### 扩展
- 现在的邮件都是纯文本， 将来会不会扩展为富文本？
- 怎么扩展？

# 正课
## 线程池
- 常见使用场景
	- Web/数据库/文件/邮件 服务器
	- 请求来自远程的客户端
	- 请求数量很大， 任务执行时间较短
- 一个请求一个线程
	- 创建线程，销毁线程的开销比较大
	- 太多的线程导致内存耗尽

- 系统预先创建指定数量的线程
- 对多任务重用线程， 线程创建的开销被分摊
- 请求到来时， 线程已经存在， 立刻就可以服务
- 通过限制线程池中的线程数量， 防止资源不足

![][5]
### 关于线程池的思考
1. 当线程池刚刚创立，还没有Task到来的时候， 池中的线程处于什么状态？
2. 当Task到来的时候，线程池中的线程如何得到通知？
3. 当线程池中的线程完成工作，如何回到池中？
3. Task是个什么东西？

### 例子
![][6]

![][7]

![][8]

### WorkerThread
![][9]

![][10]

### 从JDK1.5以后， 不用自己写线程池了
![][11]

![][12]

![][13]

![][14]

## CAS(Compare And Swap)
![][15]

### CAS的应用
#### 线程不安全
![][16]
#### 悲观锁
同一时刻，只有一个线程可以获得锁，进入方法执行， 其他的线程只能等待（阻塞）等待持有锁的线程执行完 ----  悲观锁

![][17]
#### 乐观锁
多个线程都可以读取同一变量， 但是当他们使用CAS同时更新同一个变量时，只有其中一个线程能更新变量的值，而其它线程都失败，失败的线程并不会被挂起，而是被告知这次竞争中失败，并可以再次尝试。

![][18]
### CAS的优点
- 非阻塞
	- 线程并不会阻塞， 只是不停的检查下去
- CAS 不会出现死锁
	- 线程不会挂起， 不会出现互相等待
- 在轻度到中度的争用情况下，非阻塞算法的性能会超越阻塞算法
	- 只不过多了几个循环而已
- 问题：  可以用CAS来实现更复杂的数据结构吗？

### CAS实现非阻塞的栈
![][19]

![][20]
### ABA问题
1. 线程1从内存取到值A
2. 线程1停止执行（如时间片用尽）
3. 线程2也从内存取到值A
4. 线程2把A -> B ， 然后又从B ->A
5. 线程1开始操作， 发现内存值还是A ,没有变化， 操作成功

好像没有什么问题吧？

![][21]
#### ABA解决办法
- 版本戳version来对记录或对象标记
- AtomicStampedReference
先检查当前引用是否等于预期引用，并且检查当前标志是否等于预期标志，如果全部相等，则以原子方式将该引用和该标志的值设置为给定的更新值。

## ThreadLocal
### 例子
![][22]
#### 方法一
把Context 对象一层层传递

![][23]
#### 方法二
把Context 的 setTransactionID和getTransactionID两个方法都改成static

![][24]

### 改造Context类，使用ThreadLocal
![][25]

### ThreadLocal的实现
![][26]

![][27]

## 不变类
- 对象是可变的
	- 多个线程可以对同一个对象并发读写导致竞争条件
- 如果把对象设置为只读的呢？
	- 对象的数据在创建时就已经提供， 在生命周期保持不变
	- 简单， 只有一个状态， 就是被创建时的状态
	- 线程安全 ：实例只能读，不存在并发的问题

### 如何成为不变类
- 不能有改变对象的方法
- 不能被扩展（子类化）， 使用final或者静态工厂
- 所有的字段都应该是私有的，final的

### 例子
![][28]

### 不变类的坏处
- 对于不同的值都需要一个单独的对象，可能存在浪费
	- 一个上百万位的BigInteger, 如果只改变其中一位，就会创建一个和原来几乎一模一样对象（只有一位不同）
	- 对String 对象的操作，每次都会生成新对象
- 可以提供一个公有的可变配套类
	- StringBuilder

### 可变  vs 不可变
![][29]  
奔跑者儿童手翻书, 当我们希望插图有所改变时，就画另一幅图，加到手翻书的末尾。翻动书页的动作，表示状态随时间改变。停到给定页面，观察特定图片，表示某一时刻奔跑者的状态  

![][30]
可变的奔跑者将状态改变建模为可变的，需要准备一些橡皮擦。书只有一页，状态改变时，我们必须物理擦除，根据修改重绘图片的一部分。采用这样的模型可以看出，可变性摧毁了时间、状态这些概念，变成了只有一个


  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%871.png "OCP"
  [2]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%872.png "OCP"
  [3]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%873.png "OCP重构"
  [4]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%874.png "工厂模式"
  [5]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%875.png "线程池"
  [6]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%876.png "例子"
  [7]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%877.png "例子"
  [8]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%878.png "例子"
  [9]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%879.png "WorkerThread"
  [10]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8710.png "WorkerThread"
  [11]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8711.png "Java SDk"
  [12]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8712.png "Java SDk"
  [13]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8713.png "Java SDk"
  [14]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8714.png "Java SDk"
  [15]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8715.png "CAS"
  [16]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8716.png "线程不安全"
  [17]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8717.png "悲观锁"
  [18]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8718.png "乐观锁"
  [19]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8719.png "非阻塞栈"
  [20]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8720.png "非阻塞栈"
  [21]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8721.png "ABA"
  [22]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8722.png "ThreadLocal"
  [23]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8723.png "方法一"
  [24]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8724.png "方法二"
  [25]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8725.png "改造"
  [26]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8726.png "ThreadLocal 的实现"
  [27]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8727.png "ThreadLocal 的实现"
  [28]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8728.png "例子"
  [29]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8729.jpg "不可变"
  [30]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/6/26/Java%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%EF%BC%882%EF%BC%89/%E5%9B%BE%E7%89%8730.jpg "可变"
