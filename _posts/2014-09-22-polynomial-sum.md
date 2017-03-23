---
layout: post
title: 2011.多项式求和
date: 2014-09-22 09:40
categories: 杭电HDU
tags: [杭电HDU]
---
## Problem
>**Problem Description**  
多项式的描述如下：  
1 - 1/2 + 1/3 - 1/4 + 1/5 - 1/6 + ...  
现在请你求出该多项式的前n项的和。  
**Input**  
输入数据由2行组成，首先是一个正整数m（m<100），表示测试实例的个数，第二行包含m个正整数，对于每一个整数(不妨设为n,n<1000），求该多项式的前n项的和。  
**Output**  
对于每个测试实例n，要求输出多项式前n项的和。每个测试实例的输出占一行，结果保留2位小数。  
**Sample Input**  
2  
1 2  
**Sample Output**  
1.00  
0.50  

## Solution
```cpp
#include<stdio.h>
int main(void)
{
	int count,i,j,k,a[10000];
    double sum,sign,num;
	scanf("%d",&count);
    for(i=1;i<=count;i++){
        scanf("%d",&a[i]);
    }  
    for(j=1;j<=count;j++){
        sign=1.0;
        sum=0.0;
        num=1.0;
        for(k=1;k<=a[j];k++){
            sum=sum+(1/num)*sign;
            sign=sign*-1;
            num=num+1;
        }
            printf("%.2lf\n",sum);
    }
    return 0;
}
```