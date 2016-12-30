import React from 'react'
import $ from 'jquery'
import ReactPaginate from 'rc-pagination'
import Layer from '../../../utils/_layer'
import API from '../../../utils/api'
import STATUS from '../../../utils/status'
import TableThead from '../../../components/TableSection/TableThead'
import TableBody from '../../../components/TableSection/TableBody'

const BanuserRecord = React.createClass({
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
    $.get(API.host + '/snapper_filter/v1/user/ban_log' + optionsUrl, (res) => { // ?user_id=0&nickname=&status=0&limit=20&offset=0
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

// 1:未审核，2:审核通过，3:未审核先发布,4:写入队列失败,5:审核超时,6:广告或垃圾信息,7:色情、淫秽或低俗信息,8:负面、消极的情感信息,
// 9:求祝福水贴，10:其他原因,11:其他无意义水贴，12:辱骂、人身攻击，13:竞品相关或诋毁小恩爱
  render () {
    if (this.state.list.length) {
      var list = this.state.list
      var titleArr = ['记录', '用户 id ', '用户昵称', '审核员', '操作记录', '操作时间']
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
                  if (li.status) {
                    return (
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td>{li.user_id}</td>
                        <td>{li.nickname}</td>
                        <td>{li.checker_name}</td>
                        <td className='emphasis'>封禁{li.status}天</td>
                        <td>{li.updated_at}</td>
                      </tr>
                    )
                  } else {
                    return (
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td>{li.user_id}</td>
                        <td>{li.nickname}</td>
                        <td>{li.checker_name}</td>
                        <td>解封</td>
                        <td>{li.updated_at}</td>
                      </tr>
                    )
                  }
                })
              }
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='6'>
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
        <div>no data</div>
      )
    }
  }
})

export default BanuserRecord