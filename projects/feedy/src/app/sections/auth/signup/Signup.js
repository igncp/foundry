import { Link, } from 'react-router';
import Immutable from  'immutable';

import AppComponent from 'components/AppComponent';
import { signupUser, } from 'helpers/user';
import * as appStoreModule from 'store/app';

class Signup extends AppComponent {
  getDefaultData() {
    const appState = appStoreModule.getState();

    return {
      username: '',
      password: '',
      passwordC: '',
      user: appState.user,
    };
  }
  componentDidMount() {
    this.unsubscribeFromAppStore = appStoreModule.get().subscribe(()=> {
      const appState = appStoreModule.getState();

      this.setData({
        user: appState.user,
      });
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAppStore();
  }
  handleButtonClick() {
    signupUser(Immutable.fromJS({
      username: this.state.data.get('username'),
      password: this.state.data.get('password'),
    }));
    
    this.setData({
      username: '',
      password: '',
      passwordC: '',
    });
  }
  render() {
    const data = this.state.data;
    const user = data.get('user');

    return (<div>
      <p>signup</p>
      <div>
        <p>Username:
          <input
            onChange={event=> this.setData(data.set('username', event.target.value))}
            value={data.get('username')}
          />
        </p>
        <p>Password:
          <input
            onChange={event=> this.setData(data.set('password', event.target.value))}
            type="password"
            value={data.get('password')}
          />
        </p>
        <p>Password Confirmation:
          <input
            onChange={event=> this.setData(data.set('passwordC', event.target.value))}
            type="password"
            value={data.get('passwordC')}
          />
        </p>
        <p>
          {user.get('type') === 'anonymous' ? 
            <input
              onClick={()=> this.handleButtonClick()}
              type="button"
              value="Enter"
            /> : user.get('type') === 'pending' ? 
            <span>Pending...</span> : null}
        </p>
      </div>
      <p><Link to="/">index</Link></p>
    </div>);
  }
}

module.exports = Signup;