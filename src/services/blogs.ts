import request from './request'

interface topicType {
  nickname: string,
  title: string,
  model: number,
  article: string,
  id: string,
}

// 获取全部文章
export function getTotal(): Promise<any> {
  return request({
    method: 'get',
    url: '/'
  })
}

// 获取文章详情
export function getArticleDetail(id: string): Promise<any> {
  return request({
    method: 'get',
    url: '/topics/show',
    params: {
      id
    }
  })
}

// 新建文章
export function newTopic({ nickname, title, article, model }: topicType): Promise<any> {
  return request({
    method: 'post',
    url: '/topics/new',
    data: {
      nickname,
      title,
      article,
      model,
    }
  })
}

// 修改文章
export function editTopic({ nickname, title, article, model, id }: topicType): Promise<any> {
  return request({
    method: 'post',
    url: '/myblog/update',
    data: {
      nickname,
      title,
      article,
      model,
      id
    }
  })
}

// 删除文章
export function deleteTopic(id: string): Promise<any> {
  return request({
    method: 'get',
    url: '/settings/myblog/delete',
    params: {
      id
    }
  })
}