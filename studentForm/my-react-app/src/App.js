import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from './components/Header'
import StudentTable from './components/StudentTable'
import TableItem from './components/TableItem'
import StudentForm from './components/StudentFrom';
const App = () => (
  <Router>
    <Header/>
  <Routes>
    <Route exact path="/student" element={<StudentTable />} />
    <Route exact path="/about" element={<StudentForm />} />  {/* Define your root route here */}
    <Route exact path="/tableItem" component={TableItem} />
   
  </Routes>
</Router>
)

export default App