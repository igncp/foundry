import { PropTypes } from 'react';

import AppComponent from 'components/AppComponent';
import TextArea from 'components/form/TextArea';
import TextishInput from 'components/form/TextishInput';
import Box from 'components/Box';

import keyIn from 'helpers/pure/keyIn';
import { saveMessage } from 'helpers/api/message';
import * as appStoreModule from 'store/app';

const inputNames = ['title', 'content'];

class NewPost extends AppComponent {
  getDefaultData() {
    return {
      title: '',
      content: '',
    };
  }
  handleClick() {
    const data = this.state.data;
    const username = appStoreModule.getState().user.get('username');
    const createdOn = Math.floor(Date.now() / 1000);
    const message = data.filter(keyIn(inputNames)).merge({ username }).set('createdOn', createdOn);

    saveMessage(message).then((message) => {
      this.props.onNewPost(message);
    });

    this.setData(this.getDefaultData());
  }
  isFormValid() {
    const isAnyInputEmpty = this.isAnyOfDataEmpty(inputNames);

    return !isAnyInputEmpty;
  }
  render() {
    const data = this.state.data;

    return (<Box>
      <div><p>New post</p></div>
      <div>
        <div>
          <TextishInput onChange={this.dIOC('title')} text="Title" value={data.get('title')}/>
          <TextArea onChange={this.dIOC('content')} text="Content" value={data.get('content')}/>
        </div>
        <div>
          <input
            className="btn btn-default"
            disabled={!this.isFormValid()}
            onClick={() => this.handleClick()}
            style={styles.button} type="button" value="Post"
          /></div>
      </div>
    </Box>);
  }
}
NewPost.displayName = 'NewPost';

NewPost.propTypes = {
  onNewPost: PropTypes.func,
};

export default NewPost;

const styles = {
  button: {
    float: 'right',
  },
};
