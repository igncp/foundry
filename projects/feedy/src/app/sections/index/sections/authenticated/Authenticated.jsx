import AppComponent from 'components/AppComponent';
import NewPost from 'components/NewPost';
import Feed from 'components/Feed';

import { getMessages } from 'helpers/api/message';

class Authenticated extends AppComponent {
  constructor(props) {
    super(props);

    getMessages().then((messages) => {
      this.setData({
        messages: messages,
      });
    });
  }
  getDefaultData() {
    return {
      messages: [],
    };
  }
  handleNewPost(message) {
    const data = this.getData();

    this.setData({
      messages: data.get('messages').unshift(message),
    });
  }
  render() {
    const data = this.state.data;

    return (<div>
      <div style={styles.newPostWr}>
        <NewPost onNewPost={message => this.handleNewPost(message)}/>
      </div>
      <Feed messages={data.get('messages')}/>
    </div>);
  }
}

module.exports = Authenticated;

const styles = {
  newPostWr: {
    marginBottom: 20,
  },
};
