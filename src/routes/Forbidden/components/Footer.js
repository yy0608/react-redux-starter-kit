import FilterLink from '../containers/FilterLink'

const Footer = () => (
  <p>
    SHOW:
    {' '}
    <FilterLink filter='SHOW_ALL'>
      ALL
    </FilterLink>
    {', '}
    <FilterLink filter='SHOW_ACTIVE'>
      Active
    </FilterLink>
    <FilterLink filter='SHOW_COMPLETED'>
      Completed
    </FilterLink>
  </p>
)

export default Footer
