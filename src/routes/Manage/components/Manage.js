import React from 'react'
import FirstTabs from './FirstTabs'
import FilterTabs from './FilterTabs'

export const ManageView = ({children}) => (
  <div className='content-container'>
    <FirstTabs />
    <FilterTabs />
    {children}
  </div>
)

export default ManageView
