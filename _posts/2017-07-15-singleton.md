---
layout: post
title: 单例模式（Singleton Pattern）
date: 2017-07-15 22:05
categories: 设计模式
tags: [设计模式,单例模式]
---

* content
{:toc}

# 小插曲
关于单例模式其实我是没有准备这么早开始写的，不过确实是巧合，我这边刚好准备开始写单例模式，就遇到了一件和单例模式相关的小插曲，让我提前开始准备了单例模式的一些探讨，这个故事是这样的：  
> 今晚老大看我的项目框架，我在Demo里面写了一个关于Gson的单例，因为我们知道Gson没有提供静态方法，但是我们每次只是简单地把类转化为Json就要new一个Gson的实例，显然比较浪费，所以就写了一个单例，umm，我是这么写的

```java
public class GsonUtil {

	private static Gson gson = null;
	
	public Gson getGson () {
		if (gson == null) {
			gson = new Gson();
		}
		return gson;
	}
}
```
> 然后老大跟我说他也有一个Gson的单例模式，他是这样写的：

```java
public class Mygson {

	private static Gson instance = new GsonBuilder().setDateFormat("yyyy-MM-dd hh:mm:ss").create();
	
	public static Gson getInst() {
		return instance;
	}

}
```
> （忽略一些细节的差别，比如日期格式的设置和命名的不同）
> 然后老大说他的写法比较好，我的写法没有必要了，我愣了一下，难道单例模式也还有区别？

其实单例模式也是我接触地最多和最早的设计模式之一，而且我隐约记得单例模式还是无师自通的，因为应该是在哪一次项目中，觉得某个类到处new对象实在是太麻烦了，直觉到处new对象可能会造成资源的浪费，如果我可以new一个对象然后到处可以用就方便了，这就是我的单例模式的由来。  
关于我和老大的两种单例模式，我想了当时并没有反映过来，因为我的单例模式的写法用了很久，也没有深入去研究，我在回家的路上思考了一下，我关于这两种写法的想法初步是这样认为的：
- 老大的单例模式是在系统初始化的时候就构建了Gson的实例，然后每次调用都调用这个实例，那么会不会在系统初始化的时候因为某些原因构建失败导致实例为null，然后调用的时候整个系统每个调用的地方都会异常，导致系统有隐患？系统在使用的过程中如果出现了某些情况导致这个单例的实例被gc回收掉，那么单例无法重新创建，是不是也会造成隐患？因为这种单例的写法只构建一次Gson实例，**如果构建失败或者使用中被更改，那么这个实例不会再次被构建**。
- 我的单例的写法就没有上面的那个隐患，因为每次都会判断Gson实例是否存在，如果不存在就会重新new一个实例，但是，这样每次调用单例都会做一次判断，那么在大量**并发调用的时候会不会让系统的性能出现大幅度下降**？

基于这些疑问的存在，我对单例模式进行了一些研究。

# 简介
**单例模式（Singleton Pattern）** 是 Java 中最简单的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。  
实现单例模式的思路是：一个类能返回对象一个引用 **(永远是同一个)** 和一个获得该实例的方法 **（必须是静态方法，通常使用getInstance这个名称）** ；当我们调用这个方法时，如果类持有的引用不为空就返回这个引用，如果类保持的引用为空就创建该类的实例并将实例的引用赋予该类保持的引用；同时我们还将该类的构造函数定义为私有方法，这样其他处的代码就无法通过调用该类的构造函数来实例化该类的对象，只有通过该类提供的静态方法来得到该类的唯一实例。

# 实现
单例模式的实现实际上是有很多种变种的方式，基本的两种是**懒汉式**和**饿汉式**，然后在这个的基础上扩展出适应多线程和其他条件的一些模式。
## 饿汉式
饿汉式单例模式就是我老大的那种实现方式，至于这个名字，可以想象一下一个很饿的人，一到了吃饭的时候就立刻吃到饱，一旦系统开始运行的时候，就立刻把类的实例构建出来，供方法调用。  
这个方式有两个特点：
- **不能延时加载**
顾名思义，在系统运行开始的时候就把实例构建好，而不是要用的时候才开始构建
- **线程安全**
即使在多线程的环境下，每个线程都只能拿到同一个实例，因为在多线程还没开始启动的时候，实例就已经构建好了。
```java
package singleton;

/**
 * 饿汉式单例模式
 *
 * @author lanyuanxiaoyao
 * @create 2017-07-14 23:10
 */
public class SingletonHungry {

    private static SingletonHungry instance = new SingletonHungry();

    public static SingletonHungry getInstance(){
        return instance;
    }

}
```

## 懒汉式
懒汉式单例模式就是我的那种实现方式，我们又想象一个很懒的人，等到要做事的时候才开始做事，从来不会提前准备，这就是懒汉式，等到了要使用这个实例的时候才开始构建实例，果然是很懒。  
这个方式也有两个特点：
- **实现了延迟加载**
这里的延迟，就是由饿汉式的一开始就加载好实例延迟到要用的时候才构建实例
- **线程安全但是系统开销大**
很好想象，我们在多线程环境下使用了`synchronized`关键字，如果没有这个关键字的话，那么在并发的情况下，后面的线程构建的实例就会覆盖前面的那个，造成线程不安全。除此之外，每次调用都要判断实例是否存在，在大量并发的情况下，会造成性能的降低。
```java
package singleton;

/**
 * 懒汉式单例模式
 *
 * @author lanyuanxiaoyao
 * @create 2017-07-14 23:15
 */

public class SingletonLazy {

    private static SingletonLazy instance = null;

    public static synchronized SingletonLazy getInstance() {
        if (instance == null) {
            instance = new SingletonLazy();
        }
        return instance;
    }

}
```

## 双重检测锁式
双重检验锁式单例模式的写法主要也是实现两个目的
- **延迟加载**
- **线程安全**

至于双重检验这个说法，是因为我们在判断单例是否为`null`的时候，进行了两次检验，一次是在同步块外面，一次是在同步块中，因为在多线程的环境下，可能会同时有多个线程访问到同步块外面的`if`判断语句，这样就会造成后面的线程创建的实例覆盖前面线程的实例，所以我们需要在同步块中再判断一次。  
我们通常会有这样的写法：
```java
package singleton;

/**
 * 双重检验锁式单例模式
 *
 * @author lanyuanxiaoyao
 * @create 2017-07-16 10:25
 */

public class SingletonDoubleLockCheck extends BaseSingleton {

    private static SingletonDoubleLockCheck instance = null;

    public static SingletonDoubleLockCheck getInstance() {
        if (instance == null) {
            synchronized (SingletonDoubleLockCheck.class) {
                if (instance == null) {
                    instance = new SingletonDoubleLockCheck();
                }
            }
        }
        return instance;
    }
}
```
这种写法是有问题的。  
主要在于`instance = new SingletonDoubleLockCheck()`这句，这不是一个**原子操作**，事实上在 JVM 中这句话大概做了下面 3 件事情：
1. 给`instance`分配内存
2. 调用构造函数来初始化成员变量
3. 将`instance`对象指向分配的内存空间（执行完这步`instance`就为非`null`了）

但是在JVM的即时编译器中存在指令重排序的优化。也就是说上面的第二步和第三步的顺序是不能保证的，最终的执行顺序可能是 1-2-3 也可能是 1-3-2。如果是后者，则在 3 执行完毕、2 未执行之前，被线程二抢占了，这时`instance`已经是非`null`了（但却没有初始化），所以线程二会直接返回`instance`，然后使用，然后顺理成章地报错。

所以我们需要将`instance`变量声明成`volatile`。
```java
package singleton;

/**
 * 双重检验锁式单例模式改版1
 *
 * @author lanyuanxiaoyao
 * @create 2017-07-16 10:28
 */

public class SingletonDoubleLockCheck_1 {

    private volatile static SingletonDoubleLockCheck_1 instance = null;

    public static SingletonDoubleLockCheck_1 getInstance() {
        if (instance == null) {
            synchronized (SingletonDoubleLockCheck_1.class) {
                if (instance == null) {
                    instance = new SingletonDoubleLockCheck_1();
                }
            }
        }
        return instance;
    }
}
```
> 有些人认为使用 `volatile` 的原因是可见性，也就是可以保证线程在本地不会存有 `instance` 的副本，每次都是去主内存中读取。但其实是不对的。使用 `volatile` 的主要原因是其另一个特性：禁止指令重排序优化。也就是说，在 `volatile` 变量的赋值操作后面会有一个内存屏障（生成的汇编代码上），读操作不会被重排序到内存屏障之前。比如上面的例子，取操作必须在执行完 1-2-3 之后或者 1-3-2 之后，不存在执行到 1-3 然后取到值的情况。从「先行发生原则」的角度理解的话，就是对于一个 `volatile` 变量的写操作都先行发生于后面对这个变量的读操作（这里的“后面”是时间上的先后顺序）。  
但是特别注意在 Java 5 以前的版本使用了 `volatile` 的双检锁还是有问题的。其原因是 Java 5 以前的 JMM （Java 内存模型）是存在缺陷的，即时将变量声明成 volatile 也不能完全避免重排序，主要是 `volatile` 变量前后的代码仍然存在重排序问题。这个 `volatile` 屏蔽重排序的问题在 Java 5 中才得以修复，所以在这之后才可以放心使用 `volatile`。

当然我也看到了另一种写法，不加`volatile`，然后使用两个同步块，当然这种写法不如上面那个简洁，仅作记录
```java
package singleton;

/**
 * 双重检测锁式单例模式改版2
 *
 * @author lanyuanxiaoyao
 * @create 2017-07-14 23:20
 */

public class SingletonDoubleLockCheck_2 extends BaseSingleton {

    private static SingletonDoubleLockCheck_2 instance = null;

    public static SingletonDoubleLockCheck_2 getInstance() {
        if (instance == null) {
            SingletonDoubleLockCheck_2 tempInstance;
            synchronized (SingletonDoubleLockCheck_2.class) {
                tempInstance = instance;
                if (tempInstance == null) {
                    synchronized (SingletonDoubleLockCheck_2.class) {
                        if (tempInstance == null) {
                            tempInstance = new SingletonDoubleLockCheck_2();
                        }
                    }
                    instance = tempInstance;
                }
            }
        }
        return instance;
    }

}
```

## 静态内部类式
```java
package singleton;

/**
 * 静态内部类式单例模式
 *
 * @author lanyuanxiaoyao
 * @create 2017-07-15 21:22
 */

public class SingletonStaticInnerClass extends BaseSingleton {

    private SingletonStaticInnerClass instance = null;

    /**
     * 外部类初始化的时候不会初始化内部类，只有当调用getInstance方法的时候才会初始化内部类
     */
    public static class inner {
        public static final SingletonStaticInnerClass instance = new SingletonStaticInnerClass();
    }

    public static SingletonStaticInnerClass getInstance() {
        return inner.instance;
    }
}
```

## 枚举式
```java
package singleton;

/**
 * 枚举式单例模式
 *
 * @author lanyuanxiaoyao
 * @create 2017-07-15 21:30
 */

public enum SingletonEnum {

    INSTANCE;

}
```

# 测试
## 实例一致性测试
单例模式的基本功能就是我们每次调用单例模式的时候都可以获取到一个唯一的对象，如果这个对象不唯一的话，那么单例模式就没有起到什么作用了，所以我们做一个简答的测试
```java
package singleton.test;

import singleton.*;

/**
 * 测试各个单例模式获得单例对象是否唯一
 *
 * @author lanyuanxiaoyao
 * @create 2017-07-15 21:35
 */

public class SingletonObjectUniqueTest {

    public static void main(String[] args) {
        /**
         * 饿汉式单例模式
         */
        SingletonHungry singletonHungry_1 = SingletonHungry.getInstance();
        SingletonHungry singletonHungry_2 = SingletonHungry.getInstance();
        System.out.println("饿汉式单例模式：" + (singletonHungry_1 == singletonHungry_2));

        /**
         * 懒汉式单例模式
         */
        SingletonLazy singletonLazy_1 = SingletonLazy.getInstance();
        SingletonLazy singletonLazy_2 = SingletonLazy.getInstance();
        System.out.println("懒汉式单例模式：" + (singletonLazy_1 == singletonLazy_2));

        /**
         * 双重检测锁式单例模式
         */
        SingletonLockCheck singletonLockCheck_1 = SingletonLockCheck.getInstance();
        SingletonLockCheck singletonLockCheck_2 = SingletonLockCheck.getInstance();
        System.out.println("双重检测锁式单例模式：" + (singletonLockCheck_1 == singletonLockCheck_2));

        /**
         * 静态内部类式单例模式
         */
        SingletonStaticInnerClass singletonStaticInnerClass_1 = SingletonStaticInnerClass.getInstance();
        SingletonStaticInnerClass singletonStaticInnerClass_2 = SingletonStaticInnerClass.getInstance();
        System.out.println("静态内部类式单例模式：" + (singletonStaticInnerClass_1 == singletonStaticInnerClass_2));

        /**
         * 枚举式单例模式
         */
        SingletonEnum singletonEnum_1 = SingletonEnum.INSTANCE;
        SingletonEnum singletonEnum_2 = SingletonEnum.INSTANCE;
        System.out.println("枚举式单例模式：" + (singletonEnum_1 == singletonEnum_2));
        System.out.println(singletonEnum_1.getClass());
    }

}
```
结果也是当然是可以的咯，不然就不叫单例模式了

![实例一致性测试][1]


  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/15/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F%EF%BC%88Singleton%20Pattern%EF%BC%89/Ashampoo_Snap_2017%E5%B9%B47%E6%9C%8815%E6%97%A5_23h27m52s_002_.png "实例一致性测试"