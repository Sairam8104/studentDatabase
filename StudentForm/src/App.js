import {Route, Switch, BrowserRouter} from 'react-router-dom'

import Header from './components/Header'
import StudentTable from './components/StudentTable'
import StudentForm from './components/About'
import TableItem from './components/TableItem'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={StudentTable} />
      <Route exact path="/about" component={StudentForm} />
      <Route exact path="/tableItem" component={TableItem} />
    </Switch>
  </BrowserRouter>
)

export default App
