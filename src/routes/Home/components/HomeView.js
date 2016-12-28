import React from 'react'
import $ from 'jquery'
import API from '../../../utils/api'
import HeaderFirst from './HeaderFirst'
import EmptyTip from '../../../components/EmptyTip'
import PostView from './PostView'
import ReplyView from './ReplyView'

const HomeView = React.createClass ({

  getInitialState () {
    return {
      list: {},
      imgsUrlArr: []
    }
  },

  componentWillMount () {
    $.get(API.host+'/snapper_filter/v1/topic/list', (res) => {
      var list = res.data.list[0]
      if (this.isMounted) {
        if (list) {
          if (list.ext_info) {
            this.setState({
              imgsUrlArr: JSON.parse(res.data.list[0].ext_info).image_urls
            })
          }
          this.setState({
            list: res.data.list
          })
        } else {
          this.setState({
            listFlag: false
          })
        }
      }
    })
  },

  render () {
    var list = this.state.list
    if (!list.length) {
      return (
        <EmptyTip />
      )
    } else {
      return (
        // <Route>
        //   <Route path='/post' component={PostView} />
        //   <Route path='/reply' component={ReplyView} />
        // </Route>
        <div className='content-container'>
          <HeaderFirst />
          <div>
            <div className='check-content'>
              <div className='post-info'>
                <p className='title'>帖子标题：{list[0].title}</p>
                <p className='info'>
                  <a href='#' className='group'>帖子小组：{list[0].group_name}</a>
                  <span className='id'>帖子 ID : <i className='num'>{list[0].topic_id}</i></span>
                </p>
              </div>
              <div className='person-info'>
                <span className='head'>
                  <img src={list[0].avatar_url} />
                </span>
                <div className='guy-info'>
                  <span className='nickname'>发帖人：{list[0].nick_name}</span>
                  <span className='time'>发帖时间：{list[0].created_at}</span>
                </div>
              </div>
            </div>
            <div className='handle-content'>
              <h2>操作</h2>
              <div className='handle-btns'>
                <button className='push-into'>求祝福水贴</button>
                <button className='push-into'>其他无意义水贴</button>
                <button className='pass'>通过</button>
                <a href='#' className='check-record'>审核纪录</a>
              </div>
            </div>
            <div className='handle-content'>
              <h2>转移小组</h2>
              <div className='handle-btns'>
                <button className='pass'>晒恩爱</button>
                <button className='pass'>我们的故事</button>
                <button className='pass'>爱情碎碎念</button>
                <button className='pass'>小恩爱粉丝群</button>
              </div>
            </div>
            <div className='main-content'>
              <p className='text'>帖子内容：{list[0].content}</p>
              <ul className='imgs'>
                {
                  this.state.imgsUrlArr.map((imgUrl, i) => (
                    <li key={i}>
                      <img key={i} src={imgUrl.url} />
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      )
    }
  }
})

export default HomeView
