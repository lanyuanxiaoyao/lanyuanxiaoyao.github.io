---
layout: post
title: 插入排序(Insertion sort)
date: 2017-03-08 20:31
categories: 总结
tags: [总结,排序]
---
## 概念
>将整个序列分割成若干小的子序列，再分别对子序列进行直接插入排序，使得原来序列成为基本有序。这样通过对较小的序列进行插入排序，然后对基本有序的数列进行插入排序，能够提高插入排序算法的效率。

希尔排序也是插入排序的一种,使用了分治的思想,让排序的时间复杂度较插入排序有大幅的提升,于是单独拿出来作为一张.

## 代码实现
```java
private static int[] Sort(int[] num) {
  int gap = 1;
  int i, j, len = num.length;
  int temp;
  while (gap < len / 3)
  gap = gap * 3 + 1;
  for (; gap > 0; gap /= 3)
    for (i = gap; i < len; i++) {
      temp = num[i];
      for (j = i - gap; j >= 0 && num[j] > temp; j -= gap)
        num[j + gap] = num[j];
      num[j + gap] = temp;
    }
    return num;
}
```
## 实际测试
可以看到时间提升得非常多,这是一种高效的排序法

数组大小(整数个数) | 运行时间(ms)
100 | 0
1000 | 0
10000 | 5
100000 | 17
1000000 | 213
10000000 | 2823
