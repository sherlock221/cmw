

//测试任务列表url
http://localhost:3001/task/list?token=50ff0a04-597a-4b27-9f08-8ff6321f74d5&version=1.3.1.65

//测试班级
http://localhost:3001/share/invite/class?classId=14900&uId=34504&version=1.3.1.65

//测试产品
http://localhost:3001/share/invite/product?uId=34504&version=1.3.1.65


//正式库

//任务
http://imzhiliao.com:3001/task/list?token=50ff0a04-597a-4b27-9f08-8ff6321f74d5&version=1.3.1.65

//班级
http://imzhiliao.com:3001/share/invite/class?classId=14900&uId=34504&version=1.3.1.65

//产品
http://imzhiliao.com:3001/share/invite/product?uId=34504&version=1.3.1.65


//测试库
http://10.10.68.11:3001/task/list?token=50ff0a04-597a-4b27-9f08-8ff6321f74d5&version=1.3.1.65

//班级
http://10.10.68.11:3001/share/invite/class?classId=14900&uId=34504&version=1.3.1.65

//产品
http://10.10.68.11:3001/share/invite/product?uId=34504&version=1.3.1.65



nginx 配置


 server {

           listen  3000;
           server_name  10.10.68.11;
           location /cmw/ {
                     #对接cicada客户端
                     # proxy_pass http://10.10.68.11:3001;

                }
                location /wx/ {
                        #微信服务
                        proxy_pass http://10.10.68.11:3000;
                }

        }

