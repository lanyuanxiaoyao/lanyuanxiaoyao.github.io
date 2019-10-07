---
title: 2017编程提高第6节课——面向对象设计(6)
date: 2017-07-20 12:26
categories: 2017编程提高
tags: [设计模式,工厂模式,建造者模式,单例模式,面向对象设计,课件]
---

* content
{:toc}

# 从数据库谈起
![][1]
## 获取数据库连接是关键
![][2]
## 创建数据库连接
![][3]
## 简单工厂
![][4]
## 使用简单工厂
![][5]
## 优点
- 假设 ConnectionFactory ,Connection 这些类已经打包形成了jar 文件， 无法修改源码。
- 需求：
	1. 改名 com.mysql.MySqlConnection→com.mysql.jdbc.MySqlConnectionImpl  
	2. 添加一个新的数据库

## 使用配置文件增加灵活性
```java
Connnection-type.properties

mysql =  com.mysql.jdbc.MySqlConnectionImpl
db2 = com.ibm.db2.Db2ConnectionImpl
oracle = com.oracle.jdbc.OracleConnection
sqlserver = com.Microsoft.jdbc.SqlServerConnection
```

![][6]

## 工厂方法
![][7]

![][8]

![][9]

![][10]

![][11]

## 隐藏Factory实现
![][12]

![][13]

![][14]

## 使用ConnectionFactoryManager
![][15]

## 工厂方法UML 类图
![][16]

![][17]

# 建造者模式
![][18]

## 使用构造函数
![][19]

![][20]

其实我想设置的是 name， idCardNum, phone这三个参数，但是我得额外设置里 -1 , null。  
因为没有User(String name, String idCardNum, String phone)这样的构造函数

![][21]

![][22]

## 使用Builder
![][23]
### 用Builder来代替构造函数
- 优点
	- 支持多个可变参数
	- 对于使用者清晰易读
	- 在构造期给每个参数都赋予有意义的名称
- 缺点
	- 为了创建对象，必须创建构造器
	- 代码重复
### 类图
![][24]
### Builder模式
![][25]

# 单例模式
![][26]

# 原型模式
## 需求
假设你开发了一个类似Phtoshop的图片处理程序， 可以编辑图片。  
你做了如下操作  
1.从文件中打开一个图片 (会创建一个内存的对象)， 放到画布中 2
2..把图片中的背景去掉，只留下人物图像 
3.把它缩小为原来的30%
4.增加一个边框 
5.设置阴影效果 
6.设置透明度为50%

现在你用Ctrl +C  , Ctrl +V  要复制出10个这样的图片， 程序该怎么处理呢？

## 需求
你在开发一个数据的分析程序， 这个程序需要从数据库中读取成千上万条数据， 然后封装成Java 对象进行处理，这个过程很耗时。

假设另外一个程序也需要对同样的一组Java对象进行处理（可能要修改）， 该怎么办？

## Prototype模式
原型模式多用于创建复杂的或者耗时的实例，这种情况下，复制一个已经存在的实例使程序运行更高效；或者创建值相等，只是命名不一样的同类数据。

## Java clone
![][27]

![][28]

![][29]

![][30]

## 浅复制
![][31]

![][32]

## 深复制
![][33]

# 作业
## 自制Builder 创建xml 字符串
![][34]

![][35]

![][36]

![][37]

## 从JDK中找出3个使用Singleton模式的类


  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%871.png "数据库"
  [2]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%872.png "获取数据库连接"
  [3]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%873.png "创建数据库连接"
  [4]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%874.png "简单工厂"
  [5]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%875.png "使用简单工厂"
  [6]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%876.png "使用配置文件"
  [7]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%877.png "工厂方法"
  [8]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%878.png "工厂方法"
  [9]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%879.png "工厂方法"
  [10]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8710.png "工厂方法"
  [11]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8711.png "工厂方法"
  [12]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8712.png "隐藏Factory"
  [13]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8713.png "隐藏Factory"
  [14]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8714.png "隐藏Factory"
  [15]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8715.png "ConnectionFactoryManagement"
  [16]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8716.png "UML"
  [17]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8717.png "UML"
  [18]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8718.png "建造者"
  [19]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8719.png "使用构造函数"
  [20]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8720.png "使用构造函数"
  [21]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8721.png "构造函数"
  [22]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8722.png "构造函数"
  [23]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8723.png "Builder"
  [24]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8724.png "类图"
  [25]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8725.png "Builder模式"
  [26]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8726.png "单例模式"
  [27]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8727.png "clone"
  [28]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8728.png "clone"
  [29]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8729.png "clone"
  [30]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8730.png "clone"
  [31]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8731.png "浅复制"
  [32]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8732.png "浅复制"
  [33]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8733.png "深复制"
  [34]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8734.png "作业"
  [35]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8735.png "作业"
  [36]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8736.png "作业"
  [37]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8737.png "作业"