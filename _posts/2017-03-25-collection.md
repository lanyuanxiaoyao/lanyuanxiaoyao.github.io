---
layout: post
title: 集合专题1 Collection和Map
date: 2017-03-25 20:58
tags: [排序专题]
---
# 简介
Java里的集合也被我们成为容器，容器顾名思义就是可以装东西的器具，在Java里面，我们在容器里面存放对象。  
我们学习的数组也是容器的一种，但是和集合相比，数组有个缺点：**数组长度确定后无法改变**，这就极大限制了数组使用的灵活性，Java提供的集合就解决了这个问题，所有的集合的实现类都是可以动态改变容器的大小，比数组的使用更加灵活。
Java的集合大致的可以被划分为四个部分：
1. List列表
2. Set集合
3. Map映射
4. 工具类(Iterator迭代器、Enumeration枚举类、Arrays和Collections)

Java集合工具包框架图如下
![](http://olwt21mf4.bkt.clouddn.com/17-3-25/82042258-file_1490420009660_350c.jpg)
从图中可以看到，集合主要有Collection和Map
- Collection
Collection主要有两大分类
    - List **元素有序[^1x]可重复**
    List的实现类有LinkedList, ArrayList, Vector, Stack
    - Set **元素无序不可重复**
    Set的实现类有HastSet和TreeSet。HashSet依赖于HashMap，它实际上是通过HashMap实现的；TreeSet依赖于TreeMap，它实际上是通过TreeMap实现的

[^1x]: 有序的概念不是指里面的元素按照一定的顺序排列好，而是其中元素存放的位置是有顺序的，按照什么顺序放进去，就会按照一定的顺序取出来，比如放进去是`1, 2, 3, 4`那么取出来的时候也是`1, 2, 3, 4`，如果是无序的，那么取出来时候的次序就是随机的，有可能是`2, 4, 1, 3`也有可能是`1, 2, 4, 3`