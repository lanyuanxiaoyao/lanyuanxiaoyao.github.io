echo off
set /p name=请输入博文标题：
cd _posts
echo --->%date:~0,11%%name%.markdown
echo layout: post>>%date:~0,11%%name%.markdown
echo title: %name%>>%date:~0,11%%name%.markdown
echo --->>%date:~0,11%%name%.markdown