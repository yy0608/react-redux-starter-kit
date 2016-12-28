import React from 'react'
import $ from 'jquery'
import API from '../../../utils/api'
import TableThead from '../../../components/TableSection/TableThead'
import TableBody from '../../../components/TableSection/TableBody'

const PostDetailView = React.createClass({
  getInitialState () {
    return {
      list: {}
    }
  },

  componentWillMount () {
    $.get(API.host + '/snapper_filter/v1/user/ban_list', (res) => {
      if(this.isMounted) {
        this.setState({
          list: res.data.list
        })
      }
    })
  },

  render () {
    if (this.state.list.length) {
      var list = this.state.list
      var titleArr = ['帖子ID', '审核时间', '标题', '状态', '审核员', '操作']

      return (
        <div className='post-detail-content'>
          <form className='search-content'>
            <span>
              <input type='text' className='post-search' placeholder='请输入要搜索的帖子 id ' />
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

export default PostDetailView
