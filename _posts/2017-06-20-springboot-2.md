---
title: Spring Boot（二） Spring mvc + Mybatis整合
key: 2017-06-20-springboot-2
date: 2017-06-20 13:30
categories: Spring
tags: [Spring,Spring Boot,Mybatis]
---

* content
{:toc}

# 说明
本文旨在记录spring boot中创建spring mvc + mybatis的整合，网上的各种乱七八糟的整合方式都有，所以把自己的套路记录下来，我采用的整合方式为：**gradle + spring mvc + mybatis**

# 项目结构
新建项目完成之后，项目结构如下：

![][1]  
- **main**
主目录，放编写的所有代码
	- **Demo2Application**
启动文件，项目从这个文件直接部署到内置的tomcat运行
- **resource**
	- **static**
放静态文件，如`js` `css`
	- **templates**
模板文件的默认目录
	-  **application.properties**
spring配置文件
- **test**
测试目录，用于测试代码

# 准备工作
## 建数据库
先建立测试数据，我们在数据库中建两张表：`student`和`class`（其中有外键关系）：  

![][2]

![][3]

简单的数据库关系，其中学生信息中的班级和班级表构成外键关系，这里在数据库中不使用外键，而是在代码中维护外键关系

## 配置
由于spring boot的整合非常简洁，mybatis的配置不需要写一大串的xml文件，仅需要在默认的spring配置文件application.properties中配置即可  
### 数据库信息配置
application.properties
```
# 数据库参数
spring.datasource.url=jdbc:mysql://localhost:3306/springdemo?characterEncoding=utf-8
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```
非常简单，根据字段故名思义，包括数据库连接，用户名，密码和对应数据库的驱动，这四个属性配置好了就可以基本使用了，如果还有其他要求可以在后面继续补充添加配置信息，包括多个数据源或第三方连接池的配置等。  
此外`DataSource`类型的`@Bean`可以覆盖默认设置
### Mybatis配置
Demo里面关于Mybatis的配置只有两个，一个是指定`mapper`的xml文件扫描路径，第二个是给指定包中的类注册别名，这样在`mapper.xml`文件中使用`Type`的时候就不需要全名(带包名)，只需要类名即可
```
# mybatis
mybatis.mapper-locations=classpath*:mapper/*.xml
mybatis.type-aliases-package=com.example.demo.model
```
## 目录结构
接着是开始编写代码，按照分层，执行步骤为：`Url`→`Controller`→`Service`→`Mapper`，所以目录结构和相应文件位置如下图：  

![][4]  

## 建立model
这个文件夹叫什么名字都行，比如`pojo`之类的，总之是表示数据库表对应的实体类结构  
**为了篇幅简洁，以下代码均省略getter/setter/包名/异常，但是这些玩意儿还是要写的**  
Class.java
```java
public class Class {
    private int cid;
    private String cname;
}

```
Student.java
```java
public class Student {
    private int sid;
    private String sname;
    private Class clazz;
}

```
# 基本操作
## 增
界面如图：  

![][5]  
页面代码如下：  
*页面用了一点amazeui前端UI框架组件，显示好看点*  
insert.html
```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>insert</title>
    <link rel="stylesheet" href="/css/amazeui.min.css" type="text/css">
    <script type="text/javascript" src="/js/jquery.min.js"></script>
    <script type="text/javascript" src="/js/amazeui.min.js"></script>
    <style>
        #content {
            width: 500px;
            margin-top: 50px;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body>
<div id="content">
    <table class="am-table-bordered am-table-radius">
        <thead>
        <tr>
            <th>编号</th>
            <th>班别</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="class : ${classList}">
            <td th:text="${class.cid}">10</td>
            <td th:text="${class.cname}">十班</td>
        </tr>
        </tbody>
    </table>
    <table class="am-table-bordered am-table-radius">
        <thead>
        <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>班别</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="student : ${studentList}">
            <td th:text="${student.sid}">10</td>
            <td th:text="${student.sname}">张三</td>
            <td th:text="${student.clazz.cname}">十班</td>
        </tr>
        </tbody>
    </table>
    <div id="insert-class" class="am-form-inline">
        <input id="cname" type="text" class="am-form-field" placeholder="班别">
        <button id="insert-button-1" type="button" class="am-btn am-btn-primary">添加</button>
    </div>
    <div id="insert-student" class="am-form-inline">
        <input id="sname" type="text" class="am-form-field" placeholder="姓名">
        <select id="class-select"  data-am-selected>
            <option th:each="class : ${classList}" th:value="${class.cid}"><span th:text="${class.cname}">选项</span></option>
        </select>
        <button id="insert-button-2" type="button" class="am-btn am-btn-primary">添加</button>
    </div>
</div>
</body>
<script>
    $("#insert-button-1").click(function () {
        //alert("/addclass?cname=" + $("#cname").val());
        window.location = "/addclass?cname=" + $("#cname").val();
    })

    $("#insert-button-2").click(function () {
        alert("/addstudent?sname=" + $("#sname").val() + "&cid=" + $("#class-select").val());
        window.location = "/addstudent?sname=" + $("#sname").val() + "&cid=" + $("#class-select").val();
    })
</script>
</html>
```
对应的控制器为：  
InsertController.java
```java
@Controller
public class InsertController {

    // 自动装载注解
    @Autowired
    private StudentService studentService;
    @Autowired
    private ClassService classService;

    // 显示页面
    @RequestMapping("/insert")
    public String InsertNewItem(ModelMap map){
        List<Class> classList = classService.getAllClass();
        map.addAttribute("classList", classList);
        List<Student> studentList = studentService.getAllStudent();
        map.addAttribute("studentList",studentList);
        return "insert";
    }

    // 新增Class
    @RequestMapping(value = "/addclass",method = RequestMethod.GET)
    public String InsertClass(@RequestParam("cname") String cname){
        DemoApplication.logger.info(cname);
        classService.addClass(cname);
        return "redirect:/insert";
    }

    // 新增Student
    @RequestMapping(value = "/addstudent",method = RequestMethod.GET)
    public String InsertStudent(@RequestParam("sname") String sname,@RequestParam("cid") int cid){
        Student student = new Student();
        student.setSname(sname);
        student.setClazz(classService.getClassByCid(cid));
        studentService.addStudent(student);
        return "redirect:/insert";
    }
}
```
在Service层的代码分别为只有一句，毕竟Service层是做业务操作整合的，而增删改查均是一个操作完成，所以一句搞定，就不多贴整个Service的结构了：  
ClassService.java
```java
public void addClass(String cname) {
	classMapper.insert(cname);
}
```
StudentService.java
```java
public void addStudent(Student student) {
	studentMapper.insert(student);
}
```
Mapper层理由同上：  
*这里`insert`的正确写法应该是传入Class实体类，然后通过`resultMap`来映射字段和属性，这里是因为想尝试不同的插入方式，和`class`表确实只需要插入一个字段即可，所以以下面`Student`类的插入方式为准*
ClassMapper.java
```java
// @Param 注解为传入到xml文件的sql语句中的变量别名
void insert(@Param("cname") String cname);
```
ClassMapper.xml
```xml
<insert id="insert">
	INSERT INTO class
	SET cname = #{cname}
</insert>
```
Student.java
```java
// 这里直接传入一个实体类，这是一个区别于直接传入字段的方式，需要在xml文件中定义resultMap来映射实体类属性和字段
void insert(Student student);
```
Student.xml
```xml
<!-- 这里映射数据库字段和实体类属性 -->
<resultMap id="Student" type="Student">
	<id column="sid" property="sid" jdbcType="INTEGER"/>
	<result column="sname" property="sname" jdbcType="VARCHAR"/>
	<association property="clazz" javaType="Class">
	<id column="cid" property="cid" jdbcType="INTEGER"/>
	<result column="cname" property="cname" jdbcType="VARCHAR"/>
	</association>
</resultMap>

<!-- 所以这里必须指定传入参数类型，由于我们在配置文件中设置了mybatis.type-aliases-package属性，所以这里的Student可以直接打类名，如果没有设置这个属性，这里的Student必须带包名，即com.example.demo.model.Student -->
<insert id="insert" parameterType="Student">
	INSERT INTO student(sid, sname, cid)
	VALUES (#{sid,jdbcType=INTEGER}, #{sname, jdbcType=VARCHAR}, #{clazz.cid, jdbcType=INTEGER})
</insert>
```
## 删
在四大操作里面删除永远是最简单的，这里不再赘述，直接贴代码作为参考  

![][6]  
delete.html
```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>update</title>
    <link rel="stylesheet" href="/css/amazeui.min.css" type="text/css">
    <script type="text/javascript" src="/js/jquery.min.js"></script>
    <script type="text/javascript" src="/js/amazeui.min.js"></script>
    <style>
        #content {
            width: 500px;
            margin-top: 50px;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body>
<div id="content">
    <table class="am-table-bordered am-table-radius">
        <thead>
        <tr>
            <th>编号</th>
            <th>班别</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="class : ${classList}">
            <td class="cid" th:text="${class.cid}">10</td>
            <td><input class="am-form-field cname" type="text" th:value="${class.cname}" value="十班"></td>
            <td>
                <button type="button" class="am-btn am-btn-danger delete-class-btn">删除</button>
            </td>
        </tr>
        </tbody>
    </table>
    <table class="am-table-bordered am-table-radius">
        <thead>
        <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>班别</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="student : ${studentList}">
            <td class="sid" th:text="${student.sid}">10</td>
            <td><input class="am-form-field sname" type="text" th:value="${student.sname}" value="张三"></td>
            <td>
                <select class="cid" data-am-selected>
                    <option th:each="class : ${classList}" th:value="${class.cid}"
                            th:attr="selected=(${class.cid} eq ${student.clazz.cid} ? true : false)">
                        <span th:text="${class.cname}">十班</span>
                    </option>
                </select>
            </td>
            <td>
                <button type="button" class="am-btn am-btn-danger delete-student-btn">删除</button>
            </td>
        </tr>
        </tbody>
    </table>
</div>
</body>
<script>
    $(document).ready(function () {
        $(".delete-class-btn").click(function () {
            var row = $(this).parents("tr");
            var cid = row.find(".cid").text();
            window.location = "/deleteclass?cid=" + cid;
        });
        $(".delete-student-btn").click(function () {
            var row = $(this).parents("tr");
            var sid = row.find(".sid").text();
            location = "/deletestudent?sid=" + sid;
        });
    })
</script>
</html>
```
DeleteController.java
```java
@Controller
public class DeleteController {

    @Autowired
    private StudentService studentService;
    @Autowired
    private ClassService classService;

    @RequestMapping("/delete")
    public String UpdateSomething(ModelMap map) {
        List<Class> classList = classService.getAllClass();
        map.addAttribute("classList", classList);
        List<Student> studentList = studentService.getAllStudent();
        map.addAttribute("studentList", studentList);
        return "delete";
    }

    @RequestMapping("/deleteclass")
    public String DeleteClass(@RequestParam("cid") int cid){
        classService.deleteClass(cid);
        return "redirect:/delete";
    }

    @RequestMapping("/deletestudent")
    public String DeleteStudent(@RequestParam("sid") int sid){
        studentService.deleteStudent(sid);
        return "redirect:/delete";
    }
}
```
ClassService.java
```java
public void deleteClass(int cid) {
	classMapper.delete(cid);
}
```
StudentService.java
```java
public void deleteStudent(int sid) {
	studentMapper.delete(sid);
}
```
ClassMapper.java:
```java
void delete(@Param("cid") int cid);
```
ClassMapper.xml
```xml
<delete id="delete">
	DELETE FROM class
	WHERE cid = #{cid}
</delete>
```
StudentMapper.java
```java
void delete(@Param("sid") int sid);
```
StudentMapper.xml
```xml
<delete id="delete">
	DELETE FROM student
	WHERE sid = #{sid}
</delete>
```
## 改
在四大操作里面删除永远是最简单的，这里不再赘述，直接贴代码作为参考  

![][7]  
update.html
```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>update</title>
    <link rel="stylesheet" href="/css/amazeui.min.css" type="text/css">
    <script type="text/javascript" src="/js/jquery.min.js"></script>
    <script type="text/javascript" src="/js/amazeui.min.js"></script>
    <!-- <link rel="stylesheet" type="text/css" href="css/amazeui.min.css"> -->
    <!-- <script type="text/javascript" src="js/jquery.min.js"></script> -->
    <!-- <script type="text/javascript" src="js/amazeui.min.js"></script> -->
    <style>
        #content {
            width: 500px;
            margin-top: 50px;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body>
<div id="content">
    <table class="am-table-bordered am-table-radius">
        <thead>
        <tr>
            <th>编号</th>
            <th>班别</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="class : ${classList}">
            <td class="cid" th:text="${class.cid}">10</td>
            <td><input class="am-form-field cname" type="text" th:value="${class.cname}" value="十班"></td>
            <td>
                <button type="button" class="am-btn am-btn-warning update-class-btn">更新</button>
            </td>
        </tr>
        </tbody>
    </table>
    <table class="am-table-bordered am-table-radius">
        <thead>
        <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>班别</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="student : ${studentList}">
            <td class="sid" th:text="${student.sid}">10</td>
            <td><input class="am-form-field sname" type="text" th:value="${student.sname}" value="张三"></td>
            <td>
                <select class="cid" data-am-selected>
                    <option th:each="class : ${classList}" th:value="${class.cid}"
                            th:attr="selected=(${class.cid} eq ${student.clazz.cid} ? true : false)">
                        <span th:text="${class.cname}">十班</span>
                    </option>
                </select>
            </td>
            <td>
                <button type="button" class="am-btn am-btn-warning update-student-btn">更新</button>
            </td>
        </tr>
        </tbody>
    </table>
</div>
</body>
<script>
    $(document).ready(function () {
        $(".update-class-btn").click(function () {
            var row = $(this).parents("tr");
            var cid = row.find(".cid").text();
            var cname = row.find(".cname").val();
            alert("/updateclass?cid=" + cid + "&cname=" + cname);
            window.location = "/updateclass?cid=" + cid + "&cname=" + cname;
        });
        $(".update-student-btn").click(function () {
            var row = $(this).parents("tr");
            var sid = row.find(".sid").text();
            var sname = row.find(".sname").val();
            var cid = row.find(".cid").val();
            alert("/updatestudent?sid=" + sid + "&sname=" + sname + "&cid=" + cid);
            location = "/updatestudent?sid=" + sid + "&sname=" + sname + "&cid=" + cid;
        });
    })
</script>
</html>
```
UpdateController.java
```java
@Controller
public class UpdateController {

    @Autowired
    private ClassService classService;
    @Autowired
    private StudentService studentService;

    @RequestMapping("/update")
    public String UpdateSomething(ModelMap map) {
        List<Class> classList = classService.getAllClass();
        map.addAttribute("classList", classList);
        List<Student> studentList = studentService.getAllStudent();
        map.addAttribute("studentList", studentList);
        return "update";
    }

    @RequestMapping("/updateclass")
    public String UpdateClass(@RequestParam("cid") int cid, @RequestParam("cname") String cname) {
        classService.updateClass(cid, cname);
        return "redirect:/update";
    }

    @RequestMapping("/updatestudent")
    public String UpdateStudent(@RequestParam("sid") int sid, @RequestParam("sname") String sname, @RequestParam("cid") int cid) {
        studentService.updateStudent(sid, sname, cid);
        return "redirect:/update";
    }

}

```
ClassService.java
```java
public void updateClass(int cid, String cname) {
	classMapper.update(cid, cname);
}
```
StudentService.java
```java
public void updateStudent(int sid, String sname, int cid) {
	studentMapper.update(sid, sname, cid);
}
```
ClassMapper.java:
```java
void update(@Param("cid") int cid, @Param("cname") String cname);
```
ClassMapper.xml
```xml
<insert id="insert">
	INSERT INTO class
	SET cname = #{cname}
</insert>
```
StudentMapper.java
```java
void update(@Param("sid") int sid, @Param("sname") String sname, @Param("cid") int cid);
```
StudentMapper.xml
```xml
<update id="update">
	UPDATE student
	SET sname = #{sname}, cid = #{cid}
	WHERE sid = #{sid}
</update>
```
## 查
查询是最重要的，查询不止这么一点点的单向查询，但是这里只是列举了简单的查询，复杂的查询还要另起一篇文档着重写

![][8]  
select.html
```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>select</title>
    <link rel="stylesheet" href="/css/amazeui.min.css" type="text/css">
    <script type="text/javascript" src="/js/jquery.min.js"></script>
    <script type="text/javascript" src="/js/amazeui.min.js"></script>
    <style>
        #content {
            width: 500px;
            margin-top: 50px;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body>
<div id="content">
    <table class="am-table-bordered am-table-radius">
        <thead>
        <tr>
            <th>编号</th>
            <th>班别</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="class : ${classList}">
            <td th:text="${class.cid}">10</td>
            <td th:text="${class.cname}">十班</td>
        </tr>
        </tbody>
    </table>
    <table class="am-table-bordered am-table-radius">
        <thead>
        <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>班别</th>
        </tr>
        </thead>
        <tbody>
        <tr th:each="student : ${studentList}">
            <td th:text="${student.sid}">10</td>
            <td th:text="${student.sname}">张三</td>
            <td th:text="${student.clazz.cname}">十班</td>
        </tr>
        </tbody>
    </table>
</div>
</body>
</html>
```
IndexController.java(不要纠结类名不叫SelectController)
```java
@Controller
public class IndexController {

    // 自动装载
    @Autowired
    private StudentService studentService;
    @Autowired
    private ClassService classService;

    @RequestMapping("/")
    public String index(){
        return "index";
    }

    @RequestMapping("/select")
    public String ShowAllStudent(ModelMap map){
        List<Class> classList = classService.getAllClass();
        map.addAttribute("classList", classList);
        List<Student> studentList = studentService.getAllStudent();
        map.addAttribute("studentList",studentList);
        return "select";
    }
}
```
ClassService.java
```java
public List<Class> getAllClass() {
	return classMapper.findAll();
}
```
StudentService.java
```java
public List<Student> getAllStudent() {
	return studentMapper.findAll();
}
```
在查询的`Mapper`和前面不同的是，返回值是一个`List`，这需要在`xml`文件中指定`resultMap`为定义好的`resultMap`映射模块
ClassMapper.java:
```java
List<Class> findAll();
```
ClassMapper.xml
```xml
<resultMap id="BaseResultMap" type="com.example.demo.model.Class">
	<id column="cid" property="cid" jdbcType="INTEGER"/>
	<result column="cname" property="cname" jdbcType="VARCHAR"/>
</resultMap>

<select id="findAll" resultMap="BaseResultMap">
	SELECT *
	FROM class
</select>
```
StudentMapper.java
```java
List<Student> findAll();
```
StudentMapper.xml
```xml
<select id="findAll" resultMap="Student">
	SELECT *
	FROM student s, class c
	WHERE s.cid = c.cid
</select>
```
# 小结
整个整合的过程并没有很困难，首先在配置文件上就简单了不少，这也是spring boot的重要作用就是减少了整合配置里的繁琐的各种配置文件，包括spring mvc和mybatis，即使是不得不设置的一些设置项，也改为了非常直观的配置方式，比如.properties文件，还支持.yml文件作为配置文件，很灵活也很简洁

# 整合遇到的问题
## gradle下载maven主仓库速度太慢
这个问题一度浪费了我将近3个小时的时间，在完成任务创建之后，gradle会自动帮助我们下载需要用到的第三方组件包，这些个包会从maven主仓库下载，但是由于国内连接maven主仓库的速度并不快（不是不能访问，maven主仓库并没有被墙，就是物理距离导致的网速慢），加上要检索G级别的索引文件，导致下载极慢，解决方法有几个：
1. 自建maven仓库索引文件加快索引速度
2. 自建maven仓库，把要用的jar包直接放入本地仓库引用
3. 改用阿里云提供的maven镜像

我使用的是第三个方式，因为最简单，使用方法也很简单：  
```gradle
// 添加阿里云的镜像
allprojects {
	repositories {
		maven { url 'http://maven.aliyun.com/nexus/content/groups/public/' }
	}
}
repositories {
	// 把默认的主仓库注释掉
	//mavenCentral()
	maven { url "https://repo.spring.io/snapshot" }
	maven { url "https://repo.spring.io/milestone" }
}
```
## Invocation of init method failed;
```
Invocation of init method failed; nested exception is java.lang.IllegalArgumentException: No Spring Session store is configured: set the 'spring.session.store-type' property
```
遇到了一个错误，这个就很坑了，我在创建项目的时候引入了这个组件，实际上用不上，所以这个错误是因为一个和session有关的设置项没有设置，解决方法是在配置文件里加上这个配置
```
# 设置为none是因为我们还用不上
spring.session.store-type=none
```

  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_11h47m55s_009_.png "项目结构"
  [2]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_11h59m28s_011_.png "student"
  [3]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_11h59m48s_012_.png "class"
  [4]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8821%E6%97%A5_15h41m15s_001_.png "目录结构"
  [5]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8821%E6%97%A5_15h53m52s_002_.png "insert页面"
  [6]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8821%E6%97%A5_16h20m50s_003_.png "delete界面"
  [7]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8821%E6%97%A5_16h29m08s_004_.png "update界面"
  [8]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8821%E6%97%A5_16h34m01s_005_.png "select界面"
