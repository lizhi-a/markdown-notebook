# 一、项目简介
该项目的主要功能是增删改查笔记，笔记可以使用 markdown 语法编写，笔记内容展示 markdown 语法编译后内容。
# 二、项目技术栈
前端：
 - React 作为前端框架
 - UmiJS 作为前端应用框架，并用 Umi 管理路由
 - Ant Design 作为前端UI框架
 - Axios + ahooks 的 useRequest 发送网络请求
 - TypeScript 进行类型约束
 - Less 编写样式

后台：
 - 采用 Node.js + Express 作为后台框架
 - 使用 mongodb 数据库
#  三、最终效果
 - 首页
![在这里插入图片描述](https://img-blog.csdnimg.cn/59cd6758c3e64213b61a35041ef08cc3.png)
 - 搜索结果
![在这里插入图片描述](https://img-blog.csdnimg.cn/67f991c6705a41e4b1828dc9b1486134.png)

 - 新增笔记
![在这里插入图片描述](https://img-blog.csdnimg.cn/1bd31af4c55148a2938d00247e7c7ada.png)
 - 笔记详情
![在这里插入图片描述](https://img-blog.csdnimg.cn/57954a04510c4e7aa700b30d13d9add0.png)

 - 编辑页面
![在这里插入图片描述](https://img-blog.csdnimg.cn/4a10aa1f45dc4fb98b31365b75911621.png)
# 四、文件目录结构说明
![在这里插入图片描述](https://img-blog.csdnimg.cn/c9e160d3e7a54751b5530774a26c3aa3.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/90b86fd9366d4ec3a41c4b596e85f234.png)

前端：
 - assets：存放共用的图标、图片
 - common：存放共用的资源，如常量、全局 CSS、公共的 js 工具函数、context 文件
 - components：存放多个页面共享的组件 
 - pages：划分各个页面 
 - services：发送前端网络请求
 - .umirc.ts：配置文件，也可以配置前端路由

后台：
- app.js：进行网络请求配置、挂载路由
- router.js：后台路由
- modules：存放数据库的 Scheme
# 五、核心技术
### 1.	引入  normalize.css 对样式进行初始化
主要解决各大浏览器默认样式不同的问题。同时相比 reset.css ，normalize.css 可以模块化引入、修复了浏览器的一些 bug、还没有复杂的继承链。
### 2.  引入 classnames 库，对 className 进行管理
可以 ==通过状态 state 实现对类名的控制==
```javascript
import cs from 'classnames'

const [state, setState] = useState()
<Layout className={cs(
      globalStyles.layout,
      styles.layout, {
      'layout': state,
})} >
```
### 3. 使用 useContext 进行兄弟组件间的数据传输
还挺好用的，但是如果是深层传递数据，可能不能一下知道哪里提供数据、都提供了什么数据，会导致代码复杂一点。
```javascript
// createContext
const TopicListContext = React.createContext({} as IContextProps)

// 提供数据
<TopicListContext.Provider value={{ searchResult, setSearchResult }}>
   ...
</TopicListContext.Provider >

// 使用数据
const { setSearchResult } = useContext(TopicListContext)
```
### 4. 定义公共组件 Header ，实现组件的复用
通过 props 的 isSearch 参数来判断是否显示搜索框。
通过获取 url 里的 id 来判断是否显示二级目录。
![在这里插入图片描述](https://img-blog.csdnimg.cn/1a60f3db40144e3dba7cc3cec716bbe7.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/e9b030ee8270409d918cc3094c5bc40c.png)
### 5. 使用 umi 进行路由管理
umi 具有约定式路由，它不需要手写配置，文件系统即路由，通过目录和文件及其命名分析出路由配置。
我用的是配置式路由，主要是自己实习外没使用过 umi 的路由，所以想试一试。
### 6.	引入 marked 库，对 markdown 语法进行解析
解析后的内容可以通过 dangerouslySetInnerHTML 对 div 进行 InnerHTML 的替换。
```javascript
import { marked } from 'marked'

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
  gfm: true, // 允许 Git Hub标准的markdown.
  pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
  sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  // tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
  breaks: true, // 允许回车换行（该选项要求 gfm 为true）
  smartLists: true, // 使用比原生markdown更时髦的列表
  smartypants: false, // 使用更为时髦的标点
})

<div dangerouslySetInnerHTML={{ __html: marked.parse(res.topic.article)}}>
</div>
```
### 7.	引入 moment 库，对时间进行格式化
```javascript
import moment from 'moment'
import 'moment/locale/zh-cn'
// 使用中文时间
moment.locale('zh-cn')

{moment(topic?.created_time).format('LL')}
```

### 8. 后台部分
与博客系统的后台大致相同，使用技术可见该 [博客](https://blog.csdn.net/ladream/article/details/120806160?spm=1001.2014.3001.5501) 
# 六、遇到的问题
 - 报错：参数 “props” 隐式具有 “any” 类型

> 对 props 参数进行类型限制。

```typescript
type myProps = {
  isSearch: boolean;
}

export default function Header(props: myProps) {}
```
 - 报错：umi.js:373181 Uncaught Error: dangerouslySetInnerHTML does not make sense on < textarea>

> 设置 innerHTML 对 textarea 没有意义，因为 textarea 的内容都保存在它的 value 属性中，并且
> textarea 不能呈现 HTML。 如果想在一个容器里放 HTML，可以使用 div、p 等。

 - antd form initialvalues 属性失效

> initalvallues 只在第一次拿到初始值有效，不能初值是空之后再赋值，此时不会生效。不会根据其内容发生变化而进行对应更新。
> 此时我们可以通过 setFieldsValue 进行设置，setFieldsValue 可以动态的设置初始值。

```typescript
const [form] = Form.useForm()
form.setFieldsValue({
    title: res.topic.title,
    model: res.topic.model
})

<Form form={form}>
	...
</Form>
```
 - form.setFieldsValue() 不能对 textarea 设置

> 组件被div或者其他容器包裹，可以通过 getFiledDecorator 解决。
>[参考博客](https://segmentfault.com/q/1010000012357257)
```typescript
<Form.Item  name='article' >
    <div className={styles.markdownDiv}>
          <Input.TextArea />
    </div>
</Form.Item>
```
# 七、项目链接
[markdown-notebook 项目](https://github.com/lizhi-a/markdown-notebook)

