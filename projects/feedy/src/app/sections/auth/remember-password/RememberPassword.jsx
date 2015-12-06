import MainLayout from 'layouts/Main';
import AppComponent from 'components/AppComponent';
import TextishInput from 'components/form/TextishInput';

import {mask, unmask, } from 'actions/display';
import {getUserByOnlyUsername, } from 'api/user';

class RememberPassword extends AppComponent {
  rememberPassword() {
    const username = this.state.data.get('username');

    mask();
    getUserByOnlyUsername(username).then((username)=> {
      unmask();
      if (username) this.setData({
        userInfo: username,
      });
    });
  }
  render() {
    const data = this.state.data;
    const userInfo = data.get('userInfo');

    return (<MainLayout>
      <h2>Remember password</h2>
      <p>Enter your username: <small>(The password will be displayed directly!)</small></p>
      <div>
        <TextishInput
          onChange={event=> this.setData({
            username: event.target.value,
            userInfo: null,
          })}
          text="Username"
          value={data.get('username')}
        />
        {data.get('userInfo') &&
          <div>
            <p>Username: <strong>{userInfo.get('username')}</strong></p>
            <p>Password: <strong>{userInfo.get('password')}</strong></p>
          </div>
        }
        <input className="btn btn-info" disabled={!data.get('username')}
          onClick={()=> this.rememberPassword()} type="button" value="Remember"
        />
      </div>
    </MainLayout>);
  }
}

module.exports = RememberPassword;