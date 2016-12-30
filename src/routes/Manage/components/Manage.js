import React from 'react'
import FirstTabs from './FirstTabs'
import FilterTabs from './FilterTabs'

export const ManageView = React.createClass ({
  render () {
    // console.log(React.cloneElement);
    // let children = React.Children.map( (o, i)=>{
    //     return React.cloneElement(o, { style: {color:'#f00'}, key: i })
    // })
    return (
      <div className='content-container'>
        <FirstTabs />
        <FilterTabs />
        {this.props.children}
      </div>
    )
  }
})

export default ManageView
