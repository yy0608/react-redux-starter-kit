import React from 'react'
import $ from 'jquery'
import ReactPaginate from 'rc-pagination'
import API from '../../../utils/api'
import TableThead from '../../../components/TableSection/TableThead'
import TableBody from '../../../components/TableSection/TableBody'

const UnhandlelRecord = React.createClass({
  getInitialState () {
    return {
      list: {},
      userId: 0,
      nickname: '',
      status: 0,
      limit: 10,
      current: 1
    }
  },

  componentWillMount () {
    var limit = this.state.limit
    var optionsUrl = `?limit=${limit}`
    $.get(API.host + '/snapper_filter/v1/forum_checklog/list' + optionsUrl, (res) => {
      if(this.isMounted) {
        this.setState({
          list: res.data.list,
          total: res.data.total_count
        })
      }
    })
  },

  onChange (page) {
    var limit = this.state.limit
    var offset = limit * (page-1)
    var optionsUrl = `?limit=${limit}&offset=${offset}`
    $.get(API.host + '/snapper_filter/v1/forum_checklog/list' + optionsUrl, (res) => {
      if(this.isMounted && res.success) {
        this.setState({
          current: page,
          list: res.data.list
        })
      }
    })
  },

  render () {
    if (this.state.list && this.state.list.length) {
      var list = this.state.list
      var titleArr = ['记录', '帖子或回复 id ', '标题', '状态', '审核员', '审核时间']
      var statusArr = ['未审核', '审核通过', '未审核先发布', '写入队列失败', '审核超时', '广告或垃圾信息', '色情、淫秽或低俗信息', '负面、消极的情感信息', '求祝福水贴', '其他原因', '其他无意义水贴', '辱骂、人身攻击', '竞品相关或诋毁小恩爱']

      return (
        <div className='post-detail-content'>
          <div className='lists-wrapper'>
            <table width='100%'>
              <TableThead titleArr={titleArr} />
              <tbody>
              {
                list.map((li, i) => {
                  return (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{li.topic_id}</td>
                      <td>{li.title}</td>
                      <td>{statusArr[li.status-1]}</td>
                      <td>{li.checker_name}</td>
                      <td>{li.check_time}</td>
                    </tr>
                  )
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
        <div className='post-detail-content'>
          <div>暂无数据，刷新试试</div>
        </div>
      )
    }
  }
})

export default UnhandlelRecord