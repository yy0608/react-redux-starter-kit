import React from 'react'
import $ from 'jquery'
import API from '../../../utils/api'
import TableThead from '../../../components/TableSection/TableThead'
import TableBody from '../../../components/TableSection/TableBody'

const HandledlRecord = React.createClass({
  getInitialState () {
    return {
      list: {}
    }
  },

  componentWillMount () {
    $.get(API.host + '/snapper_filter/v1/user/ban_list?user_id=0&nickname=&status=1&limit=20&offset=0', (res) => {
      if(this.isMounted) {
        this.setState({
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
      var titleArr = ['记录', '用户 id ', '用户昵称', '审核时间', '状态', '审核员', '操作']
      var statusArr = ['未审核', '审核通过', '未审核先发布', '写入队列失败', '审核超时', '广告或垃圾信息', '色情、淫秽或低俗信息', '负面、消极的情感信息', '求祝福水贴', '其他原因', '其他无意义水贴', '辱骂、人身攻击', '竞品相关或诋毁小恩爱']

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
                      <td>{statusArr[li.status-1]}</td>
                      <td>{li.checker_name}</td>
                      <td>
                        <button id={li.topic_id}>查看详情</button>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='7'>页码区域</td>
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