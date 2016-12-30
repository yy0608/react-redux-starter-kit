import React from 'react'
import $ from 'jquery'
import ReactPaginate from 'rc-pagination'
import API from '../../../utils/api.js'
import STATUS from '../../../utils/status.js'
import TableThead from '../../../components/TableSection/TableThead'
import TableBody from '../../../components/TableSection/TableBody'

const PostDetailView = React.createClass({
  getInitialState () {
    return {
      list: {},
      limit: 10,
      current: 1
    }
  },

  componentWillMount () {
    var limit = this.state.limit
    var optionsUrl = `?limit=${limit}`
    $.get(API.host + '/snapper_filter/v1/topic/history_list' + optionsUrl, (res) => {
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
    var url = '/snapper_filter/v1/topic/history_list'
    var topic_id = this.refs.userId.value.trim()
    var param_url = `?topic_id=${topic_id}&limit=${this.state.limit}&status=0`
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
    var optionsUrl = `?limit=${limit}&offset=${offset}`
    $.get(API.host + '/snapper_filter/v1/topic/history_list' + optionsUrl, (res) => {
      if(this.isMounted && res.success) {
        this.setState({
          current: page,
          list: res.data.list,
          total: res.data.total_count
        })
      }
    })
  },

  render () {
    if (this.state.list && this.state.list.length) {
      var list = this.state.list
      var titleArr = ['帖子ID', '审核时间', '标题', '状态', '审核员', '操作']

      return (
        <div className='post-detail-content'>
          <form className='search-content' onSubmit={this.searchRecord}>
            <span>
              <input type='text' ref='userId' className='post-search' placeholder='请输入用户 id ' />
            </span>
            <span>
              <button type='submit' className='search-btn'>搜索</button>
            </span>
          </form>
          <div className='lists-wrapper'>
            <table width='100%'>
              <TableThead titleArr={titleArr} />
              <TableBody list={list} />
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
        <div className='post-detail-content'>
          <form className='search-content' onSubmit={this.searchRecord}>
            <span>
              <input type='text' ref='userId' className='post-search' placeholder='请输入用户 id ' />
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

export default PostDetailView
