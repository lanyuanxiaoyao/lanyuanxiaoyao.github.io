var flag = 0;
function checkuser() {
{% for name in site.users %}
if($('password') == "{{name}}") {
	flag = 1;
    return true;
    }
	{% endfor %}
	if(flag == 0){
	alert("你没有访问权限，请联系lanyuanxiaoyao@qq.com");
	}
	return false;
}
		
function $(id) {
    return document.getElementById(id).value;
}