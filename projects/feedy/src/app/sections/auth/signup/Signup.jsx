import Immutable from  'immutable';
import R from 'ramda';

import AppComponent from 'components/AppComponent';
import MainLayout from 'layouts/Main';
import { signupUser, } from 'helpers/user';
import getEmptyStrPropsObj from 'pure/getEmptyStrPropsObj';
import * as appStoreModule from 'store/app';

const textInputs = ['username', 'password', 'passwordC', ];
const emptyInputsObj = getEmptyStrPropsObj(textInputs);

class Signup extends AppComponent {
  getDefaultData() {
    const appState = appStoreModule.getState();

    return {
      ...emptyInputsObj,
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
    
    this.setData(emptyInputsObj);
  }
  isFormValid() {
    const isAnyInputEmpty = R.any(
      R.compose(R.isEmpty, input => this.state.data.get(input))
    )(textInputs);

    return !isAnyInputEmpty;
  }
  render() {
    const data = this.state.data;
    const user = data.get('user');

    return (<MainLayout>
      <h2>Signup</h2>
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
          {user.get('type') !== 'pending' ? 
            <input
              className='btn btn-default'
              disabled={!this.isFormValid()}
              onClick={()=> this.handleButtonClick()}
              type="button"
              value="Enter"
            /> : user.get('type') === 'pending' ? 
            <span>Pending...</span> : null}
        </p>
      </div>
    </MainLayout>);
  }
}

module.exports = Signup;