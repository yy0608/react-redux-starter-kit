import React from 'react'
import { IndexLink, Link } from 'react-router'

const FirstTabs = React.createClass({
  getDefaultProps () {
    return {
      tabArr: ['全部', '未审核', '审核通过', '求祝福水贴', '其他无意义水贴', '负面、消极的情感信息', '广告或垃圾信息', '色情、淫秽或低速信息', '辱骂、人身攻击', '竞品相关或诋毁小恩爱', '其他原因']
    }
  },

  render () {
    return (
      <div className='filter-tabs'>
        {
          this.props.tabArr.map((tab, ind) => {
            return (
              <a href='#' key={ind} className='tab-item'>{tab}</a>
            )
          })
        }
      </div>
    )
  }
})

export default FirstTabs
