import './App.css'
import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css'

import Consult from './../src/pages/consult'
import Flash from './../src/pages/flash'
import Job from './../src/pages/job'

const AppRouter = () => (
  <Router>
    <article>
      <Route path="/consult/:id" component={Consult} />
      <Route path="/flash/:id" component={Flash} />
      <Route path="/job/:id" component={Job} />
    </article>
  </Router>
)

export default AppRouter