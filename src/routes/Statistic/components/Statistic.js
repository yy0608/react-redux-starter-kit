import React from 'react'
import TableThead from '../../../components/TableSection/TableThead'

// const MyContainer = React.createClass({
//   getInitialState () {
//     return {
//       checked: false
//     }
//   },

//   onChildChanged (newState) {
//     this.setState({
//       checked: newState
//     })
//   },

//   render () {
//     var isChecked = this.state.checked ? 'yes' : 'no'
//     return (
//       <div>
//         <div>checked: {isChecked}</div>
//         <ToggleButton text='toggle me' initialChecked={this.state.checked} callbackParent={this.onChildChanged} />
//       </div>
//     )
//   }
// })

// const ToggleButton = React.createClass({
//   getInitialState () {
//     return {
//       checked: this.props.initialChecked
//     }
//   },

//   onTextChange () {
//     var newState = !this.state.checked
//     this.setState({
//       checked: newState
//     })
//     this.props.callbackParent(newState)
//   },

//   render () {
//     var text = this.props.text
//     var checked = this.state.checked
//     return (
//       <label>
//         {text}: <input type='checkbox' checked={checked} onChange={this.onTextChange} />
//       </label>
//     )
//   }
// })

const StatisticView = React.createClass({
  render () {
    var titleArr = ['日期', '总帖数', '通过数', '不通过数', '求祝福水贴', '其他无意义水贴', '负面、消极的信息', '广告或垃圾信息', '色情淫秽、低俗', '辱骂、人身攻击', '竞品相关或诋毁小恩爱', '其他原因']

    return (
      <div className='content-container'>
        <div className='lists-wrapper'>
          <table width='100%'>
            <TableThead titleArr={titleArr} />
          </table>
        </div>
      </div>
    )
  }
})

export default StatisticView
