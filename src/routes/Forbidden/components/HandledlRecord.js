import React from 'react'
import $ from 'jquery'
import { browserHistory } from 'react-router'
import ReactPaginate from 'rc-pagination'
import Layer from '../../../utils/_layer'
import API from '../../../utils/api'
import STATUS from '../../../utils/status'
import TableThead from '../../../components/TableSection/TableThead'
import TableBody from '../../../components/TableSection/TableBody'

const HandledlRecord = React.createClass({
  getInitialState () {
    return {
      list: {},
      limit: 10,
      current: 1
    }
  },

  componentWillMount () {
    var limit = this.state.limit
    var optionsUrl = `?limit=${limit}&status=1`
    $.get(API.host + '/snapper_filter/v1/user/ban_list' + optionsUrl, (res) => { // ?user_id=0&nickname=&status=0&limit=20&offset=0
      if(this.isMounted) {
        this.setState({
          list: res.data.list,
          total: res.data.total_count
        })
      }
    })
  },

  searchRecord (e) {
    e.preventDefault()
    // browserHistory.push('/banuser/unhandle_record')
    var url = '/snapper_filter/v1/user/ban_list'
    var user_id = this.refs.userId.value.trim()
    var nickname = this.refs.userName.value.trim()
    var param_url = `?user_id=${user_id}&nickname=${nickname}&limit=${this.state.limit}&status=1`
    $.get(API.host + url + param_url, (res) => {
      var list = res.data.list
      if (this.isMounted) {
        this.setState({
          list: list,
          total: res.data.total_count
        })
      }
    })
  },

  onChange (page) { // 页码切换
    var limit = this.state.limit
    var offset = limit * (page-1)
    var optionsUrl = `?limit=${limit}&offset=${offset}&status=1`
    $.get(API.host + '/snapper_filter/v1/user/ban_list' + optionsUrl, (res) => {
      if(this.isMounted && res.success) {
        this.setState({
          current: page,
          list: res.data.list
        })
      }
    })
  },

  goDetail (e) {
    var value = e.target.dataset
    var topic_id = value.topic_id
    var reply_id = value.reply_id
    var topic_type = value.topic_type
    var routeUrl = `/banuser/detail?topic_id=${topic_id}&reply_id=${reply_id}&topic_type=${topic_type}`
    console.log(routeUrl)
    browserHistory.push(routeUrl)
  },

// 1:未审核，2:审核通过，3:未审核先发布,4:写入队列失败,5:审核超时,6:广告或垃圾信息,7:色情、淫秽或低俗信息,8:负面、消极的情感信息,
// 9:求祝福水贴，10:其他原因,11:其他无意义水贴，12:辱骂、人身攻击，13:竞品相关或诋毁小恩爱
  render () {
    if (this.state.list.length) {
      var list = this.state.list
      var titleArr = ['记录', '用户 id ', '用户昵称', '审核时间', '状态', '审核员', '操作']

      return (
        <div className='post-detail-content'>
          <form className='search-content' onSubmit={this.searchRecord}>
            <span>
              <input type='text' ref='userId' className='post-search' placeholder='请输入用户 id ' />
            </span>
            <span>
              <input type='text' ref='userName' className='post-search' placeholder='请输入用户昵称' />
            </span>
            <span>
              <button type='submit' className='search-btn'>搜索</button>
            </span>
          </form>
          <div className='lists-wrapper'>
            <table width='100%'>
              <TableThead titleArr={titleArr} />
              <tbody>
              {
                list.map((li, i) => {
                  return (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{li.user_id}</td>
                      <td>{li.nickname}</td>
                      <td>{li.add_time}</td>
                      <td>{STATUS[li.status-1]}</td>
                      <td>{li.checker_name}</td>
                      <td>
                        <button data-topic_id={li.topic_id} data-reply_id={li.reply_id} data-topic_type={li.topic_type} onClick={this.goDetail} className='see-detail' id={li.topic_id}>查看详情</button>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='7'>
                    <ReactPaginate onChange={this.onChange} pageSize={this.state.limit} current={this.state.current} total={this.state.total} ref='pageList'></ReactPaginate>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )
    } else {
      return (
        <div className='post-detail-content'>
          <form className='search-content' onSubmit={this.searchRecord}>
            <span>
              <input type='text' ref='userId' className='post-search' placeholder='请输入用户 id ' />
            </span>
            <span>
              <input type='text' ref='userName' className='post-search' placeholder='请输入用户昵称' />
            </span>
            <span>
              <button type='submit' className='search-btn'>搜索</button>
            </span>
          </form>
          <div>no data</div>
        </div>
      )
    }
  }
})

export default HandledlRecord