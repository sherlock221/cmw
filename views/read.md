

//测试任务列表url
http://localhost:3001/cmw/task/list?token=50ff0a04-597a-4b27-9f08-8ff6321f74d5&version=1.3.1.65

//测试班级
http://localhost:3001/cmw/share/invite/class?classId=14900&uId=34504&version=1.3.1.65

//测试产品
http://localhost:3001/cmw/share/invite/product?uId=34504&version=1.3.1.65


//正式库

//任务
http://imzhiliao.com:3000/cmw/task/list?token=50ff0a04-597a-4b27-9f08-8ff6321f74d5&version=1.3.1.65

//班级
http://imzhiliao.com:3000/cmw/share/invite/class?classId=14900&uId=34504&version=1.3.1.65

//产品
http://imzhiliao.com:3000/cmw/share/invite/product?uId=34504&version=1.3.1.65

//测试库
http://10.10.68.11:3000/cmw/task/list?token=50ff0a04-597a-4b27-9f08-8ff6321f74d5&version=1.3.1.65

//班级
http://10.10.68.11:3000/cmw/share/invite/class?classId=14900&uId=34504&version=1.3.1.65

//产品
http://10.10.68.11:3000/cmw/share/invite/product?uId=34504&version=1.3.1.65



token :
0ab554cf-488a-4b7a-8801-c5ffdae04e4e

nginx 配置


 nginx 修改配置





  #开启GZIP 静态资源 aobo
         gzip on;

         #大于10k才进行压缩
         gzip_min_length 1k;

         gzip_buffers 4 16k;

         #压缩级别 级别越高 大小越小 速度越慢
         gzip_comp_level 3;

         #GZIP类型 目前只对js css进行gzip
         gzip_types   text/css application/x-javascript application/javascript;

         #ie6关闭gzip
          gzip_disable "msie6";



 # 3000前端动态项目 aobo
        server {

           listen  3000;
           server_name  10.10.68.11;
           location /cmw/ {
                     #对接cicada客户端
                      proxy_pass http://10.10.68.11:3001;
                }
                location /wx/ {
                        #微信服务
                        proxy_pass http://10.10.68.11:3002;
                }
        }
