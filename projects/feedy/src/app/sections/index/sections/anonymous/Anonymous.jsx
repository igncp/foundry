import { Link } from 'react-router';
import toastr from 'toastr/toastr';

import AppComponent from 'components/AppComponent';
import TextishInput from 'components/form/TextishInput';
import Box from 'components/Box';
import Row from 'components/bootstrap-grid/Row';

import { getUserByCredentials } from 'helpers/api/user';
import { login } from 'actions/user';
import { mask, unmask } from 'actions/display';

class Anonymous extends AppComponent {
  login() {
    const data = this.state.data;
    mask('Pending...');
    getUserByCredentials({
      username: data.get('username'),
      password: data.get('password'),
    }).then((user) => {
      unmask();
      if (user) {
        toastr.clear();
        toastr.info('Login successful');
        login(user);
      }
    });
  }
  render() {
    const data = this.state.data;

    return (<div>
      <Row>
        <Box>
          <div>
            <TextishInput
              onChange={event => this.setData(data.set('username', event.target.value))}
              text="Username"
              value={data.get('username')}
            />
          </div>
          <div>
            <TextishInput
              onChange={event => this.setData(data.set('password', event.target.value))}
              text="Password"
              type="password"
              value={data.get('password')}
            />
          </div>
          <p>
            <input
              className="btn btn-default"
              onClick={() => this.login()}
              type="button"
              value="Enter"
            />
          </p>
        </Box>
      </Row>
              <Row>
        <p><Link to="signup">Sign up</Link></p>
        <p><Link to="remember-password">Remember password</Link></p>
      </Row>
    </div>);
  }
}

module.exports = Anonymous;
