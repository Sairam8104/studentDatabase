import {Link} from 'react-router-dom'

import './index.css'

const TableItem = props => {
  const {tableData} = props
  const {
    StudentID,
    Name,
    StudentCourse,
    StudentYear,
    State,
    Address,
  } = tableData
  console.log(typeof(StudentID))
  return (
    <tr>
      <td>
        <Link
          to='/about' StudentID={StudentID}
          className="item-link"
        >
          {StudentID}
        </Link>
        
      </td>
      <td>{Name}</td>

      <td>{StudentYear}</td>
      <td>{StudentCourse}</td>

      <td>{Address}</td>
      <td>{State}</td>
    </tr>
  )
}

export default TableItem;