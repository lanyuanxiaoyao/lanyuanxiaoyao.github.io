---
layout: post
title: Oracle数据库常用操作
date: 2017-12-15 19:11
categories: 数据库
tags: [数据库,Oracle]
---

* content
{:toc}

# 前言
数据库的基本操作说少不少，往往学习数据库操作的时候会因为没有一个比较完善的练习数据库（包含主外键，一对多，多对多等）而起步困难，正值学期末Oracle数据库课准备考试，老师下发了一套练习题，其中恰好包含了一个比较完整的练习数据库以及各种操作题目，因此特地记录下来

# 表结构
Student 学生信息表

| sno | sname | sex | birthday    | class |
| --- | ----- | --- | ----------- | ----- |
| 108 | 曾华  | 男  | 09/01/1977  | 95033 |
| 105 | 匡明  | 男  | 10/02/1975  | 95031 |
| 107 | 王丽  | 女  | 01/23/1976 | 95033 |
| 101 | 李军  | 男  | 02/20/1976  | 95033 |
| 109 | 王芳  | 女  | 02/10/1975  | 95031 |
| 103 | 陆军  | 男  | 06/03/1974  | 95031 |

Teacher 老师信息表

| tno | tname | sex | birthday   | prof   | depart     |
| --- | ----- | --- | ---------- | ------ | ---------- |
| 804 | 李诚  | 男  | 12/02/1958 | 副教授 | 计算机系   |
| 856 | 李旭  | 男  | 03/12/1969 | 讲师   | 电子工程系 |
| 825 | 王萍  | 女  | 05/05/1972 | 助教   | 计算机系   |
| 831 | 刘冰  | 女  | 08/14/1977 | 助教   | 电子工程系 |

Course 课程信息表

| cno   | cname      | tno |
| ----- | ---------- | --- |
| 3-105 | 计算机导论 | 825 |
| 3-245 | 操作系统   | 804 |
| 6-166 | 数字电路   | 856 |
| 9-888 | 高等数学   | 825 |

Score 成绩表

| sno | cno   | degree |
| --- | ----- | ------ |
| 103 | 3-245 | 86     |
| 109 | 3-245 | 68     |
| 105 | 3-245 | 75     |
| 103 | 3-105 | 92     |
| 105 | 3-105 | 88     |
| 109 | 3-105 | 76     |
| 101 | 3-105 | 64     |
| 107 | 3-105 | 91     |
| 108 | 3-105 | 78     |
| 101 | 6-166 | 85     |
| 107 | 6-166 | 79     |
| 108 | 6-166 | 81     |

*文末会附上由数据库导出的sql文件*

# 问题
**这里是问题，下面会有答案，最好就是先自己做一遍吧**

1. 列出`Student`表中所有记录的`sname`、`sex`和``class``列
2. 显示教师所有的单位即不重复的`depart`列
3. 显示学生表的所有记录
4. 显示`Score`表中成绩在60到80之间的所有记录
5. 显示`Score`表中成绩为85,86或88的记录
6. 显示`Student`表中"95031"班或性别为"女"的同学记录
7. 以`Class`降序显示`Student`表的所有记录
8. 以`cno`升序、`degree`降序显示`Score`表的所有记录
9. 显示"98031"班的学生人数
10. 显示`Score`表中的最高分的学生学号和课程号
11. 显示"3-105"号课程的平均分
12. 显示`Score`表中至少有5名学生选修的并以3开头的课程号的平均分数
13. 显示最低分大于70,最高分小于90 的sno列
14. 显示所有学生的 `sname`、 `cno`和`degree`列
15. 显示所有学生的 `sname`、 cname和`degree`列
16. 列出"95033"班所选课程的平均分
17. 显示选修"3-105"课程的成绩高于"109"号同学成绩的所有同学的记录
18. 显示`Score`中选修多门课程的同学中分数为非最高分成绩的记录
19. 显示成绩高于学号为"109"、课程号为"3-105"的成绩的所有记录
20. 显示出和学号为"108"的同学同年出生的所有学生的sno、`sname`和 birthday列
21. 显示"李旭"老师任课的学生成绩
22. 显示选修某课程的同学人数多于5人的老师姓名
23. 显示"95033"班和"95031"班全体学生的记录
24. 显示存在有85分以上成绩的课程`cno`
25. 显示"计算机系"老师所教课程的成绩表
26. 显示"计算机系"和"电子工程系"不同职称的老师的tname和prof
27. 显示选修编号为"3-105"课程且成绩至少高于"3-245"课程的同学的`cno`、sno和`degree`,并按`degree`从高到低次序排列
28. 显示选修编号为"3-105"课程且成绩高于"3-245"课程的同学的`cno`、sno和``degree``
29. 列出所有任课老师的tname和`depart`
30. 列出所有未讲课老师的tname和`depart`
31. 列出所有老师和同学的 姓名、性别和生日
32. 检索所学课程包含学生"103"所学课程的学生学号
33. 检索选修所有课程的学生姓名

# 答案
1. 列出`Student`表中所有记录的`sname`、`sex`和``class``列
```sql
SELECT
  "sname",
  "sex",
  "class"
FROM "Student";
```
2. 显示教师所有的单位即不重复的`depart`列
```sql
SELECT DISTINCT "depart"
FROM "Teacher";
```
3. 显示学生表的所有记录
```sql
SELECT *
FROM "Student";
```
4. 显示`Score`表中成绩在60到80之间的所有记录
```sql
SELECT *
FROM "Score"
WHERE "degree" BETWEEN 60 AND 80;
```
5. 显示`Score`表中成绩为85,86或88的记录
```sql
SELECT *
FROM "Score"
WHERE "degree" IN (85, 86, 88);
```
6. 显示`Student`表中"95031"班或性别为"女"的同学记录
```sql
SELECT *
FROM "Student"
WHERE "class" = '95031' OR "sex" = '女';
```
7. 以`Class`降序显示`Student`表的所有记录
```sql
SELECT *
FROM "Student"
ORDER BY "class" DESC;
```
8. 以`cno`升序、`degree`降序显示`Score`表的所有记录
```sql
SELECT *
FROM "Score"
ORDER BY "cno" ASC, "degree" DESC;
```
9. 显示"98031"班的学生人数
```sql
SELECT COUNT(*) AS "人数"
FROM "Student";
```
10. 显示`Score`表中的最高分的学生学号和课程号
```sql
SELECT
  "sno",
  "cno",
  "degree" AS "最高分"
FROM "Score"
WHERE "degree" = (
  SELECT MAX("degree")
  FROM "Score"
);
```
11. 显示"3-105"号课程的平均分
```sql
SELECT AVG("degree") AS "平均分"
FROM "Score"
WHERE "cno" = '3-105';
```
12. 显示`Score`表中至少有5名学生选修的并以3开头的课程号的平均分数
```sql
SELECT
  "cno",
  AVG("degree") AS "平均分"
FROM "Score"
WHERE "cno" LIKE '3%'
GROUP BY "cno"
HAVING COUNT(*) >= 5;
```
13. 显示最低分大于70,最高分小于90 的sno列
```sql
SELECT "sno"
FROM "Score"
GROUP BY "sno"
HAVING MIN("degree") > 70 AND MAX("degree") < 90;
```
14. 显示所有学生的 `sname`、 `cno`和`degree`列
```sql
SELECT
  "sname",
  "cno",
  "degree"
FROM "Score", "Student"
WHERE "Student"."sno" = "Score"."sno";
```
15. 显示所有学生的 `sname`、 cname和`degree`列
```sql
SELECT
  "sname",
  "cname",
  "degree"
FROM "Score", "Student", "Course"
WHERE "Student"."sno" = "Score"."sno" AND "Score"."cno" = "Course"."cno";
```
16. 列出"95033"班所选课程的平均分  
```sql
--解法1
SELECT
  "cno",
  AVG("degree")
FROM "Student", "Score"
WHERE "Student"."sno" = "Score"."sno" AND "class" = '95033'
GROUP BY "cno";

--解法2
SELECT
  "cno",
  AVG("degree")
FROM "Score"
WHERE "sno" IN (
  SELECT "sno"
  FROM "Student"
  WHERE "class" = '95033'
)
GROUP BY "cno";
```
17. 显示选修"3-105"课程的成绩高于"109"号同学成绩的所有同学的记录
```sql
-- 解法1
SELECT
  s1."cno",
  s1."sno",
  s1."degree"
FROM "Score" s1, "Score" s2
WHERE s1."cno" = '3-105' AND s1."degree" > s2."degree" AND s2."sno" = 109 AND s2."cno" = '3-105';

-- 解法2
SELECT
  "cno",
  "sno",
  "degree"
FROM "Score"
WHERE "cno" = '3-105' AND "degree" > (
  SELECT "degree"
  FROM "Score"
  WHERE "cno" = '3-105' AND "sno" = 109
);
```
18. 显示`Score`中选修多门课程的同学中分数为非最高分成绩的记录
```sql
SELECT
  s1."cno",
  s1."sno",
  s1."degree"
FROM "Score" s1, "Score" s2
WHERE s1."sno" = s2."sno" AND s1."degree" < s2."degree";
```
19. 显示成绩高于学号为"109"、课程号为"3-105"的成绩的所有记录
```sql
-- 解法1
SELECT
  s1."cno",
  s1."sno",
  s1."degree"
FROM "Score" s1, "Score" s2
WHERE s1."degree" > s2."degree" AND s2."sno" = 109 AND s2."cno" = '3-105';

-- 解法2
SELECT
  "cno",
  "sno",
  "degree"
FROM "Score"
WHERE "degree" > (
  SELECT "degree"
  FROM "Score"
  WHERE "sno" = 109 AND "cno" = '3-105'
);
```
20. 显示出和学号为"108"的同学同年出生的所有学生的sno、`sname`和 birthday列
```sql
SELECT
  "sno",
  "sname",
  "birthday"
FROM "Student"
WHERE TO_CHAR("birthday", 'yyyy') = (
  SELECT TO_CHAR("birthday", 'yyyy')
  FROM "Student"
  WHERE "sno" = 108
);
```
21. 显示"李旭"老师任课的学生成绩
```sql
SELECT
  "cno",
  "sno",
  "degree"
FROM "Score"
WHERE "cno" = (
  SELECT "Course"."cno"
  FROM "Course", "Teacher"
  WHERE "Course"."tno" = "Teacher"."tno" AND "tname" = '李旭'
);
```
22. 显示选修某课程的同学人数多于5人的老师姓名
```sql
```
23. 显示"95033"班和"95031"班全体学生的记录
```sql
SELECT *
FROM "Student"
WHERE "class" IN ('95033', '95031');
```
24. 显示存在有85分以上成绩的课程`cno`
```sql
-- 解法1
SELECT DISTINCT "cno"
FROM "Score"
WHERE "degree" > 85;

-- 解法2
SELECT DISTINCT "cno"
FROM "Score"
WHERE "degree" IN (
  SELECT "degree"
  FROM "Score"
  WHERE "degree" > 85
);

-- 解法3
SELECT "cno"
FROM "Score"
GROUP BY "cno"
HAVING MAX("degree") > 85;
```
25. 显示"计算机系"老师所教课程的成绩表
```sql
SELECT
  "sno",
  "degree"
FROM "Score"
WHERE "cno" IN (
  SELECT "cno"
  FROM "Course", "Teacher"
  WHERE "Course"."tno" = "Teacher"."tno" AND "depart" = '计算机系'
);
```
26. 显示"计算机系"和"电子工程系"不同职称的老师的tname和prof
```sql
SELECT
  "tname",
  "prof"
FROM "Teacher"
WHERE "depart" = '计算机系' AND "prof" NOT IN (
  SELECT "prof"
  FROM "Teacher"
  WHERE "depart" = '电子工程系'
);
```
27. 显示选修编号为"3-105"课程且成绩至少高于"3-245"课程的同学的`cno`、sno和`degree`,并按`degree`从高到低次序排列
```sql
SELECT
  "cno",
  "sno",
  "degree"
FROM "Score"
WHERE "cno" = '3-105' AND "degree" > ANY (
  SELECT "degree"
  FROM "Score"
  WHERE "cno" = '3-245'
)
ORDER BY "degree" DESC;
```
28. 显示选修编号为"3-105"课程且成绩高于"3-245"课程的同学的`cno`、sno和``degree``
```sql
SELECT
  "cno",
  "sno",
  "degree"
FROM "Score"
WHERE "cno" = '3-105' AND "degree" > ALL (
  SELECT "degree"
  FROM "Score"
  WHERE "cno" = '3-245'
);
```
29. 列出所有任课老师的tname和`depart`
```sql
-- 解法1
SELECT
  "tname",
  "depart"
FROM "Teacher"
WHERE EXISTS(
    SELECT *
    FROM "Course"
    WHERE "Teacher"."tno" = "Course"."tno"
);

--解法2
SELECT
  "tname",
  "depart"
FROM "Teacher"
WHERE "tno" IN (
  SELECT "tno"
  FROM "Course"
);
```
30. 列出所有未讲课老师的tname和`depart`
```sql
SELECT
  "tname",
  "depart"
FROM "Teacher"
WHERE NOT EXISTS(
    SELECT *
    FROM "Course"
    WHERE "Teacher"."tno" = "Course"."tno"
);
```
31. 列出所有老师和同学的 姓名、性别和生日
```sql
SELECT
  "tname",
  "sex",
  "birthday"
FROM "Teacher"
UNION SELECT
        "sname",
        "sex",
        "birthday"
      FROM "Student";
```
32. 检索所学课程包含学生"103"所学课程的学生学号
```sql
SELECT DISTINCT "sno"
FROM "Score" s1
WHERE NOT EXISTS(
    SELECT *
    FROM "Score" s2
    WHERE s2."sno" = 103 AND NOT EXISTS(
        SELECT *
        FROM "Score" s3
        WHERE s3."sno" = s1."sno" AND s3."sno" = s2."sno"
    )
);
```
33. 检索选修所有课程的学生姓名
```sql
SELECT "sname"
FROM "Student"
WHERE NOT EXISTS(
    SELECT *
    FROM "Course"
    WHERE NOT EXISTS(
        SELECT *
        FROM "Score"
        WHERE "Score"."sno" = "Student"."sno" AND "Score"."cno" = "Course"."cno"
    )
);
```