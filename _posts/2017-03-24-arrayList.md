---
layout: post
title: 集合专题2 ArrayList
date: 2017-03-24 11:05
categories: 集合专题
tags: [集合专题]
---

* content
{:toc}

# 简介
ArrayList 可以理解为动态数组，用 MSDN 中的说法，就是 Array 的复杂版本。与 Java 中的数组相比，它的容量能动态增长。ArrayList 是 List 接口的可变数组的实现。实现了所有可选列表操作，并允许包括 null 在内的所有元素。除了实现 List 接口外，此类还提供一些方法来操作内部用来存储列表的数组的大小。  
每个 ArrayList 实例都有一个容量，该容量是指用来存储列表元素的数组的大小。它总是至少等于列表的大小。随着向 ArrayList 中不断添加元素，其容量也自动增长。自动增长会带来数据向新数组的重新拷贝，因此，如果可预知数据量的多少，可在构造 ArrayList 时指定其容量。在添加大量元素前，应用程序也可以使用 ensureCapacity 操作来增加 ArrayList 实例的容量，这可以减少递增式再分配的数量。  
```java
public class ArrayList<E> extends AbstractList<E>  implements List<E>, RandomAccess, Cloneable, java.io.Serializable{
	.......
}
```
继承：
- AbstractList
继承了AbstractList，实现了List。它是一个数组队列，提供了相关的添加、删除、修改、遍历等功能。

接口：
- List
- RandomAccess
实现了RandmoAccess接口，即提供了随机访问功能。RandmoAccess是java中用来被List实现，为List提供快速访问功能的。在ArrayList中，我们即可以通过元素的下标快速获取元素对象，就好像数组一样，这就是快速随机访问。
- Cloneable
实现了Cloneable接口，即覆盖了函数clone()，能被克隆。
- java.io.Serializable
实现java.io.Serializable接口，这意味着ArrayList支持序列化，能通过序列化去传输。

### ArrayList中的操作不是线程安全的！
>如果多个线程同时访问一个 ArrayList 实例，而其中至少一个线程从结构上修改了列表，那么它必须 保持外部同步。（结构上的修改是指任何添加或删除一个或多个元素的操作，或者显式调整底层数组的大小；仅仅设置元素的值不是结构上的修改。）这一般通过对自然封装该列表的对象进行同步操作来完成。如果不存在这样的对象，则应该使用 Collections.synchronizedList 方法将该列表“包装”起来。这最好在创建时完成，以防止意外对列表进行不同步的访问：  
` List list = Collections.synchronizedList(new ArrayList(...)); `  
此类的 iterator 和 listIterator 方法返回的迭代器是快速失败的：在创建迭代器之后，除非通过迭代器自身的 remove 或 add 方法从结构上对列表进行修改，否则在任何时间以任何方式对列表进行修改，迭代器都会抛出 ConcurrentModificationException。因此，面对并发的修改，迭代器很快就会完全失败，而不是冒着在将来某个不确定时间发生任意不确定行为的风险。  

所以，建议在单线程中才使用ArrayList，而在多线程中可以选择Vector或者CopyOnWriteArrayList。

### ArrayList的构造函数
```java
ArrayList() 
//构造一个初始容量为 10 的空列表。
ArrayList(Collection<? extends E> c) 
//构造一个包含指定 collection 的元素的列表，这些元素是按照该 collection 的迭代器返回它们的顺序排列的。
ArrayList(int initialCapacity) 
//构造一个具有指定初始容量的空列表。
```
### ArrayList的API
```java
boolean add(E e) 
//将指定的元素添加到此列表的尾部。
void add(int index, E element) 
//将指定的元素插入此列表中的指定位置。
boolean	addAll(Collection<? extends E> c) 
//按照指定 collection 的迭代器所返回的元素顺序，将该 collection 中的所有元素添加到此列表的尾部。
boolean addAll(int index, Collection<? extends E> c) 
//从指定的位置开始，将指定 collection 中的所有元素插入到此列表中。
void clear() 
//移除此列表中的所有元素。
Object clone() 
//返回此 ArrayList 实例的浅表副本。
boolean	contains(Object o) 
//如果此列表中包含指定的元素，则返回 true。
void ensureCapacity(int minCapacity) 
//如有必要，增加此 ArrayList 实例的容量，以确保它至少能够容纳最小容量参数所指定的元素数。
E get(int index) 
//返回此列表中指定位置上的元素。
int indexOf(Object o) 
//返回此列表中首次出现的指定元素的索引，或如果此列表不包含元素，则返回 -1。
boolean	isEmpty() 
//如果此列表中没有元素，则返回 true
int	lastIndexOf(Object o) 
//返回此列表中最后一次出现的指定元素的索引，或如果此列表不包含索引，则返回 -1。
E remove(int index) 
//移除此列表中指定位置上的元素。
 boolean	remove(Object o) 
//移除此列表中首次出现的指定元素（如果存在）。
protected  void	removeRange(int fromIndex, int toIndex) 
//移除列表中索引在 fromIndex（包括）和 toIndex（不包括）之间的所有元素。
E set(int index, E element) 
//用指定的元素替代此列表中指定位置上的元素。
int size() 
//返回此列表中的元素数。
Object[]	toArray() 
//按适当顺序（从第一个到最后一个元素）返回包含此列表中所有元素的数组。
<T> T[] toArray(T[] a) 
//按适当顺序（从第一个到最后一个元素）返回包含此列表中所有元素的数组；返回数组的运行时类型是指定数组的运行时类型。
void trimToSize() 
//将此 ArrayList 实例的容量调整为列表的当前大小。
```

# 数据结构
### ArrayList的继承关系
```
java.lang.Object
   ↳     java.util.AbstractCollection<E>
         ↳     java.util.AbstractList<E>
               ↳     java.util.ArrayList<E>

public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, java.io.Serializable {
	......
}
```
### ArrayList与Collection关系如下图：
![](http://olwt21mf4.bkt.clouddn.com/17-3-24/44549749-file_1490369824248_16371.jpg)

ArrayList包含了两个重要的对象：**elementData** 和 **size**
- elementData 是"Object[]类型的数组"，它保存了添加到ArrayList中的元素。实际上，elementData是个动态数组，我们能通过构造函数 ArrayList(int initialCapacity)来执行它的初始容量为initialCapacity；如果通过不含参数的构造函数ArrayList()来创建ArrayList，则elementData的容量默认是10。elementData数组的大小会根据ArrayList容量的增长而动态的增长
- size 则是动态数组的实际大小

# 分析
**总结**
1. ArrayList 实际上是通过一个数组去保存数据的。当我们构造ArrayList时；若使用默认构造函数，则ArrayList的默认容量大小是10。
2. 当ArrayList容量不足以容纳全部元素时，ArrayList会重新设置容量：新的容量=“(原始容量x3)/2 + 1”。
3. ArrayList的克隆函数，即是将全部元素克隆到一个数组中。
4. ArrayList实现java.io.Serializable的方式。当写入到输出流时，先写入“容量”，再依次写入“每一个元素”；当读出输入流时，先读取“容量”，再依次读取“每一个元素”。

# 遍历
ArrayList的遍历有三种方式
1. 迭代器遍历
```java
Iterator<Integer> iterator = list.iterator();
while (iterator.hasNext()) {
	value = (Integer)iterator.next();
}
```
2. foreach遍历
```java
for (Integer i : list) {
	value = i;
}
```
3. 随机访问遍历
由于ArrayList实现了RandomAccess接口，它支持通过索引值去随机访问元素。
```java
for (int i = 0; i < list.size(); i++) {
	value = (Integer)list.get(i);
}
```

### 遍历速度比较
下面是关于三种遍历方式速度的一个比较
```
Traversal_Iterator：25 ms
Traversal_Foreach：13 ms
Traversal_RandomAccess：7 ms
```
可以看到随机访问遍历是最快的，使用迭代器遍历是最慢的

测试相关代码
```java
import java.util.ArrayList;
import java.util.Iterator;

public class ArrayListInfo {
	ArrayList<Integer> list = new ArrayList<Integer>();

	public ArrayListInfo() {
		for (int i = 0; i < 1000000; i++)
			list.add(i);
	}

	public void Traversal_Iterator() {
		long startTime;
		long endTime;
		startTime = System.currentTimeMillis();
		Iterator<Integer> iterator = list.iterator();
		while (iterator.hasNext()) {
			iterator.next();
		}
		endTime = System.currentTimeMillis();
		long interval = endTime - startTime;
		System.out.println("Traversal_Iterator：" + interval + " ms");
	}

	public void Traversal_RandomAccess() {
		long startTime;
		long endTime;
		startTime = System.currentTimeMillis();
		for (int i = 0; i < list.size(); i++) {
			list.get(i);
		}
		endTime = System.currentTimeMillis();
		long interval = endTime - startTime;
		System.out.println("Traversal_RandomAccess：" + interval + " ms");
	}

	public void Traversal_Foreach() {
		long startTime;
		long endTime;
		startTime = System.currentTimeMillis();
		for (Integer i : list) {
			;
		}
		endTime = System.currentTimeMillis();
		long interval = endTime - startTime;
		System.out.println("Traversal_Foreach：" + interval + " ms");
	}

	public static void main(String[] args) {
		ArrayListInfo info = new ArrayListInfo();
		info.Traversal_Iterator();
		info.Traversal_Foreach();
		info.Traversal_RandomAccess();
	}
}
```


# 参考
1. [Java 集合系列03之 ArrayList详细介绍(源码解析)和使用示例](http://www.cnblogs.com/skywang12345/p/3308556.html)
2. [ArrayList 的实现原理](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html)
3. [ArrayList (Java Platform SE 8 )](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html)