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
Collection是一个接口，是高度抽象出来的集合，它包含了集合的基本操作和属性，Collection主要有两大分类
    - List **元素有序[^1x]可重复**
    List的实现类有LinkedList, ArrayList, Vector, Stack
    - Set **元素无序不可重复**
    Set的实现类有HastSet和TreeSet。HashSet依赖于HashMap，它实际上是通过HashMap实现的；TreeSet依赖于TreeMap，它实际上是通过TreeMap实现的
- Map是一个映射接口，即key-value键值对。Map中的每一个元素包含“一个key”和“key对应的value”

# Collection
## Collection API
Collection接口定义了所有List和Set的基本方法，比较特别的是retainAll()方法用于求两个Collection的交集和iterator()方法返回一个迭代器对象
```java
boolean add(E e) 
//确保此 collection 包含指定的元素（可选操作）。 
boolean addAll(Collection<? extends E> c) 
//将指定 collection 中的所有元素都添加到此 collection 中（可选操作）。 
void clear() 
//移除此 collection 中的所有元素（可选操作）。 
boolean contains(Object o) 
//如果此 collection 包含指定的元素，则返回 true。 
boolean containsAll(Collection<?> c) 
//如果此 collection 包含指定 collection 中的所有元素，则返回 true。 
boolean equals(Object o) 
//比较此 collection 与指定对象是否相等。 
int hashCode() 
//返回此 collection 的哈希码值。 
boolean isEmpty() 
//如果此 collection 不包含元素，则返回 true。 
Iterator<E> iterator() 
//返回在此 collection 的元素上进行迭代的迭代器。 
boolean remove(Object o) 
//从此 collection 中移除指定元素的单个实例，如果存在的话（可选操作）。 
boolean removeAll(Collection<?> c) 
//移除此 collection 中那些也包含在指定 collection 中的所有元素（可选操作）。 
boolean retainAll(Collection<?> c) 
//仅保留此 collection 中那些也包含在指定 collection 的元素（可选操作）。 
int size() 
//返回此 collection 中的元素数。 
Object[] toArray() 
//返回包含此 collection 中所有元素的数组。 
<T> T[] toArray(T[] a) 
//返回包含此 collection 中所有元素的数组；返回数组的运行时类型与指定数组的运行时类型相同。 
```


[^1x]: 有序的概念不是指里面的元素按照一定的顺序排列好，而是其中元素存放的位置是有顺序的，按照什么顺序放进去，就会按照一定的顺序取出来，比如放进去是`1, 2, 3, 4`那么取出来的时候也是`1, 2, 3, 4`，如果是无序的，那么取出来时候的次序就是随机的，有可能是`2, 4, 1, 3`也有可能是`1, 2, 4, 3`