---
layout: post
title: 2009.求数列的和
date: 2014-09-12 11:28
categories: 杭电HDU
tags: [杭电HDU]
---
## Problem
>**Problem Description**  
数列的定义如下：  
数列的第一项为n，以后各项为前一项的平方根，求数列的前m项的和。  
**Input**  
输入数据有多组，每组占一行，由两个整数n（n<10000）和m(m<1000)组成，n和m的含义如前所述。    
**Output**  
对于每组输入数据，输出该数列的和，每个测试实例占一行，要求精度保留2位小数。  
**Sample Input**  
81 4  
2 2  
**Sample Output**  
94.73  
3.41  

## Solution
```cpp
#include<stdio.h>
#include<math.h>
int main(void)
{
	int m,n,i;
	double sum,sqr;
	while(scanf("%d %d",&n,&m)!=EOF){
		sum=sqr=n;
		for(i=1;i<m;i++){
			sqr=sqrt(sqr);
			sum=sum+sqr;
		}
		printf("%.2f\n",sum);
	}
	return 0;
}
```