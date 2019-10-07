---
title: 2017编程提高第7节课——面向对象设计(7)
date: 2017-08-31 12:26
categories: 2017编程提高
tags: [设计模式,工厂模式,建造者模式,单例模式,面向对象设计,课件]
---

* content
{:toc}

# 讲解设计模式的思路
- 传统思路
	- 动机、定义
	- 结构、分析
	- 案例
- 先讲问题，然后讲一般的思路，最后引导出模式
	- Why → How
# 神书
![][1]

![][2]
# 模式的分类
![][3]

## 再次重申
- 设计模式本质上是面向对象设计原则的体现
	- 针对接口编程而不是针对实现编程
	- 优先使用组合而不是继承
	- 发现变化并且封装变化
- 学会设计模式，然后忘掉设计模式
	- 用设计模式的思想去编程

# 装饰者模式
## Java Inputstream设计
![][4]

![][5]

- Inpustream是基于字节的
	- 需求1： 直接读取Java 基本类型，而不是字节
	- 需求2： 需要支持缓冲
	- 需求3： 从Stream中读取的数据还可以放回Stream去

- 解决办法1： 把这些功能加入到父类InputStream中
	- 不可行！ 每个子类对数据的读取方法都不同， 父类无法知道每个子类的细节。
- 解决办法2： 子类化
	- DataFileInputStream
	- BufferredFileInputStream
	- PushBackFileInputStream
	- 每个子类例如FileInputStream都需要创建3个子类

### 子类的爆炸问题
- 根据排列组合， 仅仅FileInputStream就需要7个子类才能应对所有变化
	- Data + FileInputStream
	- Bufferred + FileInputStream
	- PushBack + FileInputStream
	- Bufferred + Data + FileInputStream
	- Bufferred + PushBack + FileInputStream
	- Data + PushBack + FileInputStream
	- Data + Bufferred + PushBack + FileInputStream

![][6]

![][7]

![][8]

### 使用
``` java
new FileInputStream(…)
new BufferredInputStream(new FileInputStream(...)))
new DataInputStream(new BufferredInputStream(new FileInputStream(...)))
new BufferredInputStream(new DataInputStream(new FileInputStream(...)))
```
![][9]

## Decorator模式类图
![][10]

# 代理模式
## ATM 和 银行主机的通信
- 细节，太多的细节, ATM无法专注于自己的业务
	- 网络
	- 协议
	- 安全
	- ……

![][11]

## 把细节隐藏起来
![][12]

![][13]

## 从数据库获得User对象
![][14]

## 增加缓存功能
![][15]

## 增加权限检查
![][16]

## Proxy模式的类图
![][17]

## 静态代理 vs 动态代理
- 静态代理要求Proxy(UserManagerProxy, ArticleServiceProxy,  BankProxy)需要手工编码生成
- 在很多时候需要动态给一个类增加行为
	- 例如增加事务，安全，日志等功能
- 动态代理
	- Java 动态代理
	- CGLib ASM javassist

# 桥接模式
## 画图程序
- 领导让你开发一个程序： 调用公司的图形库画出一个长方形来，你搜索了一下，发现公司有两个图形库可以使用：
	- Graphic Library 1 (GL1)
	- Graphic Library 2 (GL2)
- 你的程序需要调用这两个图形库之一才能画长方形

## 两个图形库的差别
![][18]

## 第一次设计
![][19]

## 新需求
- 领导要求支持一个新的形状： 圆形
- 看来需要抽象： Shape
	- 让Rectangle 和 Circle 去继承

![][20]

## 思考
- 现在有两个图形库GL1, GL2 , 如果再来一个图形库GL3怎么样？
	- 需要给Rectangle 添加一个子类RectangleGL3
	- 需要给Circle 添加一个子类CircleGL3
	- 就会有6个子类  （3个图形库 * 2个形状）
- 如果再加一个新的形状， 例如三角形
	- 就会有9个子类  （3个图形库 * 3个形状）
- 子类爆炸问题出现了

## 解决办法： 识别变化
- Shape 可以有多种多样
	- 长方形，圆形， 三角形…..
- 图形库可以有多种多样
	- 图形库1， 图形库2， 图形库3…
- 这是两个不同的维度！ 应该让他们独立的变化
	- 形状已经有了抽象： Shape
	- 关键是对图形库做个抽象!

![][21]

## 两个维度独立变化
![][22]

## Bridge 模式
![][23]

![][24]

## Bridge 模式的使用场景
- 当有两个正交的维度，这两个维度有一定的关联，但是还想独立变化的时候….
	- Shape   VS  Drawing
	- 文件格式 VS 文件序列化
	- 软件行为 VS 软件平台

## Bridge 模式 类图
![][25]

# 适配器模式
![][26]

## 还是图形化的例子
![][27]

## 适配一下
![][28]

## Adapter 模式类图
![][29]

## 如何描述带有组合关系的树形结构
![][30]

![][31]

![][32]

# Composite 模式
适用场景：
1. 想表达整体和部分的关系
2. 调用方想忽略整体和部分的区别

![][33]

## Composite 变体
![][34]

# 外观(Facade)模式
![][35]

适用场景
- 需要一个简单的接口去访问一个负责的系统
- 如果一个系统非常复杂，难于理解
- 在层次化结构中，可以使用外观模式定义系统中每一层的入口，层与层之间不直接产生联系，而通过外观类建立联系，降低层之间的耦合度。

![][36]

## Facade就在身边
![][37]

![][38]

# 围棋软件的例子
每个围棋棋子都是一个对象，属性有：
1. 图标 
2. 位置 

一个棋盘上的棋子很多，怎么设计才能尽可能的节省空间？

![][39]

## 第一种思路
![][40]

## 第二种思路
![][41]

![][42]

## 创建共享的Icon
![][43]

## 使用
![][44]

## UML类图
![][45]

# Flyweight（享元） 模式
- 以共享的方式高效地支持大量细粒度对象的重用
- 共享的关键是区分内部状态(图标)和外部状态（位置）
	- 内部状态：可以共享，不随环境的变化而变化（图标）
	- 外部状态： 不可以共享，随环境变化而变化 (位置）

![][46]

## 练习一下
![][47]

## Java String
![][48]

## Java Boolean, Integer,Long
![][49]

# 作业
## 作业1 自制Builder 创建xml 字符串
![][50]

![][51]

## 作业2 从JDK中找出3个使用Singleton模式的类
参考链接：[https://stackoverflow.com/questions/1673841/examples-of-gof-design-patterns-in-javas-core-libraries?rq=1](https://stackoverflow.com/questions/1673841/examples-of-gof-design-patterns-in-javas-core-libraries?rq=1)

## 作业3 实现装饰者
![][52]

- 需求1
如果是对外发送的邮件，需要在邮件的末尾增加上公司的声明：本邮件仅为个人观点，并不代表公司立场
- 需求2
对邮件内容加密

## 作业4 实现Composite
![][53]

## 作业5 实现Bridge
![][54]


  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/25/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%871.jpg "神书1"
  [2]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/25/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%872.jpg "神书2"
  [3]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/25/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%873.png "模式分类"
  [4]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/25/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%874.png "InputStream和子类"
  [5]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/25/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%875.png "子类介绍"
  [6]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%876.png "子类爆炸的解决"
  [7]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%877.png "图片7"
  [8]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%878.png "图片8"
  [9]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%879.png "图片9"
  [10]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8710.png "类图"
  [11]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8711.png "ATM机"
  [12]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8712.png
  [13]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8713.png
  [14]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8714.png "User对象"
  [15]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8715.png "缓存"
  [16]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8716.png "权限检查"
  [17]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8717.png "类图"
  [18]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8718.png "图形库差别"
  [19]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8719.png
  [20]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8720.png
  [21]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8721.png "抽象"
  [22]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8722.png "独立变化"
  [23]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8723.png "桥接模式"
  [24]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8724.png "桥接模式"
  [25]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8725.png "类图"
  [26]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8726.png "适配器"
  [27]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/27/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8727.png
  [28]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8728.png
  [29]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8729.png "类图"
  [30]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8730.png "树形结构"
  [31]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8731.png "树形结构"
  [32]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8732.png "树形结构"
  [33]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8733.png "composite"
  [34]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8734.png "变体"
  [35]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8735.png "外观模式"
  [36]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8736.png "外观模式"
  [37]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8737.png "外观模式"
  [38]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8738.png "外观模式"
  [39]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8739.png "围棋"
  [40]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8740.png "第一种思路"
  [41]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8741.png "第二种思路"
  [42]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8742.png "第二种思路"
  [43]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8743.png
  [44]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8744.png "使用"
  [45]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8745.png "类图"
  [46]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8746.png "享元模式"
  [47]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8747.png "练习"
  [48]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8748.png "String"
  [49]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/28/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8749.png
  [50]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/8/31/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8750.png "自制builder"
  [51]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/8/31/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8751.png "自制builder"
  [52]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/8/31/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8752.png "装饰者"
  [53]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/8/31/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8753.png "Composite"
  [54]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/8/31/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC7%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%287%29/%E5%9B%BE%E7%89%8754.png "Bridge"