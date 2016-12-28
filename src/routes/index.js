import React from 'react'
import { IndexRoute, Route, IndexRedirect, browserHistory } from 'react-router'
import '../styles/core.scss'

import CheckView from './Home/components/check'
import MenuView from '../components/Header/Header'
import ManageView from './Manage/components/Manage'
import StatisticView from './Statistic/components/Statistic'
import BanuserView from './Forbidden/components/Forbidden'

// check 二级路由
import PostView from '../routes/Home/components/Post'
import ReplyView from '../routes/Home/components/Reply'

// manage 二级路由
import PostDetailView from '../routes/Manage/components/PostDetail'
import ReplyDetailView from '../routes/Manage/components/ReplyDetail'
import UserDetailView from '../routes/Manage/components/UserDetail'

// banuser 二级路由
import UnhandlelRecordView from './Forbidden/components/UnhandlelRecord'
import HandledlRecordView from './Forbidden/components/HandledlRecord'
import BanuserRecordView from './Forbidden/components/BanuserRecord'

const App = React.createClass ({
  render () {
    return (
      <div className='container'>
        <MenuView />
        {this.props.children}
      </div>
    )
  }
})

const routes = <Route path="/" component={App}>
                <IndexRedirect to="check" />
                <Route path="check" component={CheckView}>
                  <IndexRedirect to="post" />
                  <Route path='post' component={PostView} />
                  <Route path='reply' component={ReplyView} />
                </Route>
                <Route path="manage" component={ManageView}>
                  <IndexRedirect to="post_detail" />
                  <Route path='post_detail' component={PostDetailView} />
                  <Route path='reply_detail' component={ReplyDetailView} />
                  <Route path='user_detail' component={UserDetailView} />
                </Route>
                <Route path="statistics" component={StatisticView}/>
                <Route path="banuser" component={BanuserView}>
                  <IndexRedirect to="unhandle_record" />
                  <Route path='unhandle_record' component={UnhandlelRecordView} />
                  <Route path='handled_record' component={HandledlRecordView} />
                  <Route path='banuser_record' component={BanuserRecordView} />
                </Route>
              </Route>;

export default routes