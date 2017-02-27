---
layout: post
title: 1001.Sum Problem
date: 2014-09-10 16:45
categories: 杭电HDU
tags: [杭电HDU]
---
## Problem
>**Problem Description**<br>
Hey, welcome to HDOJ(Hangzhou Dianzi University Online Judge).<br>
In this problem, your task is to calculate SUM(n) = 1 + 2 + 3 + ... + n.<br>
计算1 + 2 + 3 + …… + n的值<br>
**Input**<br>
The input will consist of a series of integers n, one integer per line.<br>
**Output**<br>
For each case, output SUM(n) in one line, followed by a blank line. You may <br>assume the result will be in the range of 32-bit signed integer.<br>
**Sample Input**<br>
1<br>
100<br>
**Sample Output**<br>
1<br>
5050<br>

## Solution
　　这个就是按照题意，直接for循环到n就可以解决了
```cpp
#include<stdio.h>
int main()
{
 int i,n,sum=0;
 while(scanf("%d",&n) != EOF) 
  { for(i=0;i<=n;i++)
     {sum=sum+i;}
      printf("%d\n\n",sum);
      sum=0;
  }
 return 0;
}
```