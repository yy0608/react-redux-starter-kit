import React from 'react'
import $ from 'jquery'
import { IndexLink, Link } from 'react-router'
import STATUS from '../../../utils/status'

const FirstTabs = React.createClass({
  // 1:未审核，2:审核通过，3:未审核先发布,4:写入队列失败,5:审核超时,6:广告或垃圾信息,7:色情、淫秽或低俗信息,8:负面、消极的情感信息,
  // 9:求祝福水贴，10:其他原因,11:其他无意义水贴，12:辱骂、人身攻击，13:竞品相关或诋毁小恩爱
  getDefaultProps () {
    return {
      tabObj: [
        {type: 0, title: '全部'},
        {type: 1, title: '未审核'},
        {type: 2, title: '审核通过'},
        {type: 9, title: '求祝福水贴'},
        {type: 11, title: '其他无意义水贴'},
        {type: 8, title: '负面、消极的情感信息'},
        {type: 6, title: '广告或垃圾信息'},
        {type: 7, title: '色情、淫秽或低速信息'},
        {type: 12, title: '辱骂、人身攻击'},
        {type: 13, title: '竞品相关或诋毁小恩爱'},
        {type: 10, title: '其他原因'}
      ]
      // tabArr: ['全部', '未审核', '审核通过', '求祝福水贴', '其他无意义水贴', '负面、消极的情感信息', '广告或垃圾信息', '色情、淫秽或低速信息', '辱骂、人身攻击', '竞品相关或诋毁小恩爱', '其他原因']
    }
  },

  changeTab (e) {
    var tabList = this.refs.tabList
    var curEle = e.target
    var tabA = tabList.getElementsByTagName('a')
    $(curEle).addClass('active').siblings('a').removeClass('active')
    console.log(curEle.dataset.type)
  },

  render () {
    return (
      <div className='filter-tabs' ref='tabList'>
        {
          this.props.tabObj.map((tab, ind) => {
            return (
              <a href='#' key={ind} data-type={tab.type} className={tab.type ? 'tab-item' : 'tab-item active'}  onClick={this.changeTab}>{tab.title}</a>
            )
          })
        }
      </div>
    )
  }
})

export default FirstTabs
