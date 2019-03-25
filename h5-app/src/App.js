import './App.css'
import React from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css'

import Consult from './../src/pages/consult'
import Flash from './../src/pages/flash'
import Job from './../src/pages/job'
import JobSearch from './../src/pages/job/jobsearch'
import Agreement from './../src/pages/agreement'
import Page404 from './../src/pages/Page404'
import LongVideoDetail from './../src/pages/longVideo/detail'
import { GlobalStyle } from './statics/iconfont/iconfont';
const AppRouter = () => (
  <Router>
    <React.Fragment>
      <GlobalStyle/>
      <Switch>
        <Route path="/consult/:id" component={Consult} />
        <Route path="/flash/:id" component={Flash} />
        <Route path="/job/:id" component={Job} />
        <Route path="/jobsearch" component={JobSearch} />
        <Route path="/agreement" component={Agreement} />
        <Route path="/longVideo/:id/:token" component={LongVideoDetail} />
        <Route component={Page404}/>
      </Switch>
    </React.Fragment>
  </Router>
)

export default AppRouter