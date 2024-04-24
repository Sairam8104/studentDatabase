import {Component} from 'react'
import {TailSpin} from 'react-loader-spinner'
import TableItem from '../TableItem'
import FilterData from '../FilterData'
import './index.css'

class StudentTable extends Component {
  state = {
    isLoading: true,
    tableData: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {searchInput} = this.state

    if (searchInput === '') {
      
      const apiUrl = `/student/:StudentId/`
      const response = await fetch(apiUrl)

      const data = await response.json()
      const formattedData = data.map(eachItem => ({
        Name: eachItem.Name,
        StudentID: eachItem.StudentID,
        StudentCourse: eachItem.StudentCourse,
        StudentYear: eachItem.StudentYear,
        State: eachItem.State,
        Address: eachItem.Address,
      }))
      this.setState({tableData: formattedData, isLoading: false})
    } else {
      const apiUrl = `https://studentdatabase-production-3a0c.up.railway.app/Student/${searchInput}`
      const response = await fetch(apiUrl)
      const SearchedData = await response.json()
      let newArray = []
      newArray = [...newArray, SearchedData]
      this.setState({tableData: newArray, isLoading: false})
    }
  }

  enterSearchInput = () => {
    this.getData()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  render() {
    const {isLoading, tableData, searchInput} = this.state

    return (
      <div className="blog-list-container">
        {isLoading ? (
          <TailSpin type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          <div>
            <FilterData
              searchInput={searchInput}
              changeSearchInput={this.changeSearchInput}
              enterSearchInput={this.enterSearchInput}
            />
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Year</th>
                  <th>Course</th>
                  <th>Address</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map(item => (
                  <TableItem tableData={item} key={item.StudentID} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}
export default StudentTable
