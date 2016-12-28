import React from 'react'
import $ from 'jquery'
import API from '../../../utils/api'
import TableThead from '../../../components/TableSection/TableThead'
import TableBody from '../../../components/TableSection/TableBody'

const BanuserRecord = React.createClass({
  getInitialState () {
    return {
      list: {}
    }
  },

  componentWillMount () {
    $.get(API.host + '/snapper_filter/v1/user/ban_log?user_id=0&nickname=&limit=20&offset=0', (res) => {
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
      var titleArr = ['记录', '用户 id ', '用户昵称', '审核员', '操作记录', '操作时间']
      return (
        <div className='post-detail-content'>
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
                  <td colSpan='6'>页码区域</td>
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