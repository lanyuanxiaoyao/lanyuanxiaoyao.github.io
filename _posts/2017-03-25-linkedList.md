---
layout: post
title: 集合专题3 LinkedList
date: 2017-03-25 01:37
categories: 集合专题
tags: 集合专题
---

* content
{:toc}

# 简介
LinkedList 和 ArrayList 一样，都实现了 List 接口，但其内部的数据结构有本质的不同。LinkedList 是基于链表实现的（通过名字也能区分开来），所以它的插入和删除操作比 ArrayList 更加高效。但也是由于其为基于链表的，所以随机访问的效率要比 ArrayList 差。
```java
public class LinkedList<E> extends AbstractSequentialList<E> implements List<E>, Deque<E>, Cloneable, java.io.Serializable{
	......
}
```
继承：
- AbstractSequentialList
继承于AbstractSequentialList的双向链表。它也可以被当作堆栈、队列或双端队列进行操作。

接口：
- List
实现 List 接口，能对它进行队列操作。
- Deque
实现 Deque 接口，即能将LinkedList当作双端队列使用。
- Cloneable
实现了Cloneable接口，即覆盖了函数clone()，能克隆。
- java.io.Serializable
实现java.io.Serializable接口，这意味着LinkedList支持序列化，能通过序列化去传输。

AbstractSequenceList 提供了List接口骨干性的实现以减少实现 List 接口的复杂度，Deque 接口定义了双端队列的操作。  
在 LinkedList 中除了本身自己的方法外，还提供了一些可以使其作为栈、队列或者双端队列的方法。这些方法可能彼此之间只是名字不同，以使得这些名字在特定的环境中显得更加合适。

### AbstractSequentialList简介

在介绍LinkedList之前，先介绍一下AbstractSequentialList。毕竟，LinkedList是AbstractSequentialList的子类。
AbstractSequentialList 实现了get(int index)、set(int index, E element)、add(int index, E element) 和 remove(int index)这些函数。这些接口都是随机访问List的，LinkedList是双向链表；既然它继承于AbstractSequentialList，就相当于已经实现了“get(int index)这些接口”。  
此外，我们若需要通过AbstractSequentialList自己实现一个列表，只需要扩展此类，并提供 listIterator() 和 size() 方法的实现即可。若要实现不可修改的列表，则需要实现列表迭代器的 hasNext、next、hasPrevious、previous 和 index 方法即可。

### LinkedList中的操作不是线程安全的！
>如果多个线程同时访问一个链接列表，而其中至少一个线程从结构上修改了该列表，则它必须 保持外部同步。（结构修改指添加或删除一个或多个元素的任何操作；仅设置元素的值不是结构修改。）这一般通过对自然封装该列表的对象进行同步操作来完成。如果不存在这样的对象，则应该使用 Collections.synchronizedList 方法来“包装”该列表。最好在创建时完成这一操作，以防止对列表进行意外的不同步访问，如下所示：  
`List list = Collections.synchronizedList(new LinkedList(...));`  
此类的 iterator 和 listIterator 方法返回的迭代器是快速失败 的：在迭代器创建之后，如果从结构上对列表进行修改，除非通过迭代器自身的 remove 或 add 方法，其他任何时间任何方式的修改，迭代器都将抛出 ConcurrentModificationException。因此，面对并发的修改，迭代器很快就会完全失败，而不冒将来不确定的时间任意发生不确定行为的风险。  

### LinkedList的构造函数
```java
LinkedList() 
//构造一个空列表。
LinkedList(Collection<? extends E> c) 
//构造一个包含指定 collection 中的元素的列表，这些元素按其 collection 的迭代器返回的顺序排列。
```
### LinkedList的API
```java
boolean	add(E e) 
//将指定元素添加到此列表的结尾。
 void add(int index, E element) 
//在此列表中指定的位置插入指定的元素。
boolean addAll(Collection<? extends E> c) 
//添加指定 collection 中的所有元素到此列表的结尾，顺序是指定 collection 的迭代器返回这些元素的顺序。
boolean	addAll(int index, Collection<? extends E> c) 
//将指定 collection 中的所有元素从指定位置开始插入此列表。
void addFirst(E e) 
//将指定元素插入此列表的开头。
void addLast(E e) 
//将指定元素添加到此列表的结尾。
void clear() 
//从此列表中移除所有元素。
Object clone() 
//返回此 LinkedList 的浅表副本。
boolean	contains(Object o) 
//如果此列表包含指定元素，则返回 true。
Iterator<E>	descendingIterator() 
//返回以逆向顺序在此双端队列的元素上进行迭代的迭代器。
E element() 
//获取但不移除此列表的头（第一个元素）。
E	get(int index) 
//返回此列表中指定位置处的元素。
E getFirst() 
//返回此列表的第一个元素。
E getLast() 
//返回此列表的最后一个元素。
int	indexOf(Object o) 
//返回此列表中首次出现的指定元素的索引，如果此列表中不包含该元素，则返回 -1。
int	lastIndexOf(Object o) 
//返回此列表中最后出现的指定元素的索引，如果此列表中不包含该元素，则返回 -1。
ListIterator<E>	listIterator(int index) 
//返回此列表中的元素的列表迭代器（按适当顺序），从列表中指定位置开始。
boolean	offer(E e) 
//将指定元素添加到此列表的末尾（最后一个元素）。
boolean	offerFirst(E e) 
//在此列表的开头插入指定的元素。
boolean	offerLast(E e) 
//在此列表末尾插入指定的元素。
E peek() 
//获取但不移除此列表的头（第一个元素）。
E peekFirst() 
//获取但不移除此列表的第一个元素；如果此列表为空，则返回 null。
E peekLast() 
//获取但不移除此列表的最后一个元素；如果此列表为空，则返回 null。
E poll() 
//获取并移除此列表的头（第一个元素）
E pollFirst() 
//获取并移除此列表的第一个元素；如果此列表为空，则返回 null。
E pollLast() 
//获取并移除此列表的最后一个元素；如果此列表为空，则返回 null。
E pop() 
//从此列表所表示的堆栈处弹出一个元素。
void push(E e) 
//将元素推入此列表所表示的堆栈。
E remove() 
//获取并移除此列表的头（第一个元素）。
E remove(int index) 
//移除此列表中指定位置处的元素。
boolean	remove(Object o) 
//从此列表中移除首次出现的指定元素（如果存在）。
E removeFirst() 
//移除并返回此列表的第一个元素。
boolean	removeFirstOccurrence(Object o) 
//从此列表中移除第一次出现的指定元素（从头部到尾部遍历列表时）。
E removeLast() 
//移除并返回此列表的最后一个元素。
boolean	removeLastOccurrence(Object o) 
//从此列表中移除最后一次出现的指定元素（从头部到尾部遍历列表时）。
E set(int index, E element) 
//将此列表中指定位置的元素替换为指定的元素。
int	size() 
//返回此列表的元素数。
Object[] toArray() 
//返回以适当顺序（从第一个元素到最后一个元素）包含此列表中所有元素的数组。
<T> T[] toArray(T[] a) 
//返回以适当顺序（从第一个元素到最后一个元素）包含此列表中所有元素的数组；返回数组的运行时类型为指定数组的类型。
```

# 数据结构
### LinkedList的继承关系
```
java.lang.Object
   ↳     java.util.AbstractCollection<E>
         ↳     java.util.AbstractList<E>
               ↳     java.util.AbstractSequentialList<E>
                     ↳     java.util.LinkedList<E>

public class LinkedList<E> extends AbstractSequentialList<E> implements List<E>, Deque<E>, Cloneable, java.io.Serializable {
	......
}
```
### LinkedList与Collection关系如下图
![](http://olwt21mf4.bkt.clouddn.com/17-3-25/45932597-file_1490373484499_1643.jpg)

LinkedList 是基于链表结构实现，所以在类中包含了 first 和 last 两个指针(Node)。Node 中包含了上一个节点和下一个节点的引用，这样就构成了双向的链表。每个 Node 只能知道自己的前一个节点和后一个节点，但对于链表来说，这已经足够了。  
LinkedList包含两个重要的成员：header 和 size。
- header是双向链表的表头，它是双向链表节点所对应的类Entry的实例。Entry中包含成员变量： previous, next, element。其中，previous是该节点的上一个节点，next是该节点的下一个节点，element是该节点所包含的值。 
- size是双向链表中节点的个数。

# 分析
LinkedList实际上是通过双向链表去实现的。既然是双向链表，那么它的顺序访问会非常高效，而随机访问效率比较低。  
既然LinkedList是通过双向链表的，但是它也实现了List接口{也就是说，它实现了get(int location)、remove(int location)等“根据索引值来获取、删除节点的函数”}。LinkedList是如何实现List的这些接口的，如何将“双向链表和索引值联系起来的”？  
实际原理非常简单，它就是通过一个计数索引值来实现的。例如，当我们调用get(int location)时，首先会比较“location”和“双向链表长度的1/2”；若前者大，则从链表头开始往后查找，直到location位置；否则，从链表末尾开始先前查找，直到location位置。  
这就是“双线链表和索引值联系起来”的方法。  

**总结**
1. LinkedList 实际上是通过双向链表去实现的。它包含一个非常重要的内部类：Entry。Entry是双向链表节点所对应的数据结构，它包括的属性有：当前节点所包含的值，上一个节点，下一个节点。  
2. 从LinkedList的实现方式中可以发现，它不存在LinkedList容量不足的问题。
3. LinkedList的克隆函数，即是将全部元素克隆到一个新的LinkedList对象中。
4. LinkedList实现java.io.Serializable。当写入到输出流时，先写入“容量”，再依次写入“每一个节点保护的值”；当读出输入流时，先读取“容量”，再依次读取“每一个元素”。
5. 由于LinkedList实现了Deque，而Deque接口定义了在双端队列两端访问元素的方法。提供插入、移除和检查元素的方法。每种方法都存在两种形式：一种形式在操作失败时抛出异常，另一种形式返回一个特殊值（null 或 false，具体取决于操作）。

|第一个元素（头部）| |最后一个元素（尾部）| |
| --- | --- | --- | --- |
|抛出异常|特殊值|抛出异常|特殊值|
|插入|addFirst(e)|offerFirst(e)|addLast(e)|offerLast(e)|
|移除|removeFirst()|pollFirst()|removeLast()|pollLast()|
|检查|getFirst()|peekFirst()|getLast()|peekLast()|

6.LinkedList可以作为FIFO(先进先出)的队列，作为FIFO的队列时，下表的方法等价

|队列方法|等效方法|
| --- | --- |
|add(e)|addLast(e)|
|offer(e)|offerLast(e)|
|remove()|removeFirst()|
|poll()|pollFirst()|
|element()|getFirst()|
|peek()|peekFirst()|

7. LinkedList可以作为LIFO(后进先出)的栈，作为LIFO的栈时，下表的方法等价

|栈方法|等效方法|
| --- | --- |
|push(e)|addFirst(e)|
|pop()|removeFirst()|
|peek()|peekFirst()|

# 遍历
LinkedList的遍历方式有很多
1. 迭代器遍历
```java
Iterator<Integer> iterator = list.iterator();
	while (iterator.hasNext()) {
		value = iterator.next();
}
```
2. 随机访问遍历
```java
for (int i = 0; i < size; i++) {
	value = list.get(i);
}
```
3. foreach遍历
```java
for (Integer i : list) {
	value = list.get(i);
}
```
4. pollFirst遍历
```java
while (list.pollFirst() != null)
	value = list.pollFirst();
```
5. pollLast遍历
```java
while (list.pollLast() != null)
	value = list.pollLast();
```
6. removeFirst遍历
```java
while (list.removeFirst() != null)
	value = list.removeFirst();
```
7. removeLast遍历
```java
while (list.removeLast() != null)
	value = list.removeLast();
```
### 遍历速度比较
下面是关于三种遍历方式速度的一个比较
```
Traversal_Iterator：6 ms
Traversal_RandomAccess：3998 ms
Traversal_Foreach：4 ms
Traversal_pollFirst：4 ms
Traversal_pollLast：0 ms
Traversal_removeFirst：0 ms
Traversal_removeLast：4 ms
```
使用removeFist()或removeLast()效率最高。但用它们遍历时，会删除原始数据；若单纯只读取，而不删除，应该使用第3种遍历方式。
**千万不要通过随机访问去遍历LinkedList**

测试相关代码
```java
import java.util.Iterator;
import java.util.LinkedList;
import java.util.NoSuchElementException;

public class LinkedListInfo {
	LinkedList<Integer> list = new LinkedList<Integer>();

	public LinkedListInfo() {
		for (int i = 0; i < 100000; i++) {
			list.add(i);
		}
	}

	public void Traversal_Iterator() {
		if (list == null)
			return;

		long start = System.currentTimeMillis();
		Iterator<Integer> iterator = list.iterator();
		while (iterator.hasNext()) {
			iterator.next();
		}
		long end = System.currentTimeMillis();
		long interval = end - start;
		System.out.println("Traversal_Iterator：" + interval + " ms");
	}

	public void Traversal_RandomAccess() {
		if (list == null)
			return;

		long start = System.currentTimeMillis();
		int size = list.size();
		for (int i = 0; i < size; i++) {
			list.get(i);
		}
		long end = System.currentTimeMillis();
		long interval = end - start;
		System.out.println("Traversal_RandomAccess：" + interval + " ms");
	}

	public void Traversal_Foreach() {
		if (list == null)
			return;

		long start = System.currentTimeMillis();
		for (Integer i : list) {
			;
		}
		long end = System.currentTimeMillis();
		long interval = end - start;
		System.out.println("Traversal_Foreach：" + interval + " ms");
	}

	public void Traversal_pollFirst() {
		if (list == null)
			return;

		long start = System.currentTimeMillis();
		while (list.pollFirst() != null)
			;
		long end = System.currentTimeMillis();
		long interval = end - start;
		System.out.println("Traversal_pollFirst：" + interval + " ms");
	}

	public void Traversal_pollLast() {
		if (list == null)
			return;

		long start = System.currentTimeMillis();
		while (list.pollLast() != null)
			;
		long end = System.currentTimeMillis();
		long interval = end - start;
		System.out.println("Traversal_pollLast：" + interval + " ms");
	}

	public void Traversal_removeFirst() {
		if (list == null)
			return;

		long start = System.currentTimeMillis();
		try {
			while (list.removeFirst() != null)
				;
		} catch (NoSuchElementException e) {
		}
		long end = System.currentTimeMillis();
		long interval = end - start;
		System.out.println("Traversal_removeFirst：" + interval + " ms");
	}

	public void Traversal_removeLast() {
		if (list == null)
			return;

		long start = System.currentTimeMillis();
		try {
			while (list.removeLast() != null)
				;
		} catch (NoSuchElementException e) {
		}
		long end = System.currentTimeMillis();
		long interval = end - start;
		System.out.println("Traversal_removeLast：" + interval + " ms");
	}

	public static void main(String[] args) {
		LinkedListInfo info = new LinkedListInfo();
		info.Traversal_Iterator();
		info.Traversal_RandomAccess();
		info.Traversal_Foreach();
		info.Traversal_pollFirst();
		info.Traversal_pollLast();
		info.Traversal_removeFirst();
		info = new LinkedListInfo();
		info.Traversal_removeLast();
	}
}
```

# 参考
1. [Java 集合系列05之 LinkedList详细介绍(源码解析)和使用示例](http://www.cnblogs.com/skywang12345/p/3308807.html)
2. [LinkedList 的实现原理](http://wiki.jikexueyuan.com/project/java-collection/linkedlist.html)
3. [LinkedList (Java Platform SE 7 )](https://docs.oracle.com/javase/7/docs/api/java/util/LinkedList.html)