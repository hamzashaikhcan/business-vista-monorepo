import { combineReducers } from 'redux';

import Common from './Common';
import Dashboard from './Dashboard';
import TaskList from './TaskList';
import MailApp from './MailApp';
import Chat from './Chat';
import ContactApp from './ContactApp';
import ProfileApp from './ProfileApp';
import WallApp from './WallApp';
import Users from './Users';

export default combineReducers({
  common: Common,
  taskList: TaskList,
  dashboard: Dashboard,
  mailApp: MailApp,
  chat: Chat,
  contactApp: ContactApp,
  profileApp: ProfileApp,
  wallApp: WallApp,
  usersReducer: Users,
});
