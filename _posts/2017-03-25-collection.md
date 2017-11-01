---
layout: post
title: 集合专题1 Collection
date: 2017-03-25 20:58
categories: 集合专题
tags: [排序专题]
---
# 简介
Collection的相关关系图如下

![](http://olwt21mf4.bkt.clouddn.com/17-3-25/34824476-file_1490451690240_d8e2.jpg)
Collection是一个接口，它主要的两个分支是：**List** 和 **Set**。  
List和Set都是接口，它们继承于Collection
- List 有序[^1x]，**可以有重复的元素**
- Set 无序，**不可以有重复元素**

List和Set都有它们各自的实现类。  
为了方便，我们抽象出了AbstractCollection抽象类，它实现了Collection中的绝大部分函数；这样，在Collection的实现类中，我们就可以通过继承AbstractCollection省去重复编码。AbstractList和AbstractSet都继承于AbstractCollection，具体的List实现类继承于AbstractList，而Set的实现类则继承于AbstractSet。  
另外，Collection中有一个iterator()函数，它的作用是返回一个Iterator接口。通常，我们通过Iterator迭代器来遍历集合。ListIterator是List接口所特有的，在List接口中，通过ListIterator()返回一个ListIterator对象  

# Collection
```java
public interface Collection<E> extends Iterable<E> {
    ......
}
```
Collection是一个接口，是高度抽象出来的集合，它包含了集合的基本操作：添加、删除、清空、遍历(读取)、是否为空、获取大小、是否保护某元素等等。  
**Collection API**
其中特别的是iterator()方法返回的是一个迭代器，retainAll()方法是求两个集合的交集
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

# List
```java
public interface List<E> extends Collection<E> {
    ......
}
```
List是一个继承于Collection的接口，即List是集合中的一种。List是有序的队列，List中的每一个元素都有一个索引；第一个元素的索引值是0，往后的元素的索引值依次+1。**List中允许有重复的元素**  
**List API[^2x]**
除了有继承自Collection的所有函数之外，List还特别得有listIterator()方法，返回的是一个List独有的迭代器，其余的方法里，由于List是一个类似数组的结构，可以直接通过索引找到目标，所以remove也多出了一个直接以索引所为参数的方法。
```java
void add(int index, E element) 
//在列表的指定位置插入指定元素（可选操作）。 
boolean addAll(int index, Collection<? extends E> c) 
//将指定 collection 中的所有元素都插入到列表中的指定位置（可选操作）。 
E get(int index) 
//返回列表中指定位置的元素。 
int indexOf(Object o) 
//返回此列表中第一次出现的指定元素的索引；如果此列表不包含该元素，则返回 -1。 
int lastIndexOf(Object o) 
//返回此列表中最后出现的指定元素的索引；如果列表不包含此元素，则返回 -1。 
ListIterator<E> listIterator() 
//返回此列表元素的列表迭代器（按适当顺序）。 
ListIterator<E> listIterator(int index) 
//返回列表中元素的列表迭代器（按适当顺序），从列表的指定位置开始。 
E remove(int index) 
//移除列表中指定位置的元素（可选操作）。 
E set(int index, E element) 
//用指定元素替换列表中指定位置的元素（可选操作）。 
List<E> subList(int fromIndex, int toIndex) 
//返回列表中指定的 fromIndex（包括 ）和 toIndex（不包括）之间的部分视图。 
```

# Set
```java
public interface Set<E> extends Collection<E> {
    ......
}
```
Set是一个继承于Collection的接口，即Set也是集合中的一种。**Set是没有重复元素的集合**  
*特别的，如果在代码中试图通过add()方法加入一个重复元素，那么这个操作将会被忽略（并不会报异常）*
**Set API**
*和Collection完全相同，并没有特有的API*

# Iterator
```java
public interface Iterator<E> {
    ......
}
```
这是比较重要的一个接口，它专门用于对集合进行遍历，并且接口中的remove()方法是在迭代过程中删除元素唯一安全的方法。  
Iterator遍历Collection时，是fail-fast机制的。即，当某一个线程A通过iterator去遍历某集合的过程中，若该集合的内容被其他线程所改变了；那么线程A访问集合时，就会抛出ConcurrentModificationException异常，产生fail-fast事件。
**Iterator API**
特别的，在Java1.5之前，next()方法返回的是Object对象
```java
boolean hasNext() 
//如果仍有元素可以迭代，则返回 true。 
E next() 
//返回迭代的下一个元素。 
void remove() 
//从迭代器指向的 collection 中移除迭代器返回的最后一个元素（可选操作）。 
```

# 参考
1. [Java 集合系列02之 Collection架构](http://www.cnblogs.com/skywang12345/p/3308513.html)
2. [Collection (Java Platform SE 7 )](http://docs.oracle.com/javase/7/docs/api/java/util/Collection.html)

[^1x]: 有序的概念不是指里面的元素按照一定的顺序排列好，而是其中元素存放的位置是有顺序的，按照什么顺序放进去，就会按照一定的顺序取出来，比如放进去是`1, 2, 3, 4`那么取出来的时候也是`1, 2, 3, 4`，如果是无序的，那么取出来时候的次序就是随机的，有可能是`2, 4, 1, 3`也有可能是`1, 2, 4, 3`
[^2x]: 继承关系下相同的API不再重复，只罗列不同的