## 项目
前端技术栈：react+redux+react-router-dom+sass实现的一个PWA

后端技术栈：node+koa+各个中间件，提供cors接口和静态文件服务

## 项目运行
1. 按顺序运行如下命令
```
npm i 
npm run start  // 开启本地调试
npm run server // 开启后台服务
```
2. 浏览器访问 http://127.0.0.1:3000/

## 亮点
1. 数据fetch封装
2. promise，async/await应用
3. 首页列表懒加载和预加载
4. 搜索框输入节流
5. node端提供静态文件服务

## TODO
1. 服务端应该要返回错误码
2. 没有详情页
3. 搜索只是简单的正则匹配字符，这里就不做分词了哈，也不做匹配的相似度排序，标红逻辑也没有做
4. 没有做搜索历史和智能提示
5. 样式全靠预估，希望有设计稿