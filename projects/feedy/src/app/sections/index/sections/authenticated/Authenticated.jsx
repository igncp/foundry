import React from 'react';

import AppComponent from 'components/AppComponent';
import NewPost from 'components/NewPost';
import Feed from 'components/Feed';

class Authenticated extends AppComponent {
  render() {
    return (<div>
      <div style={styles.newPostWr}><NewPost/></div>
      <Feed/>
    </div>);
  }
}

module.exports = Authenticated;

const styles = {
  newPostWr: {
    marginBottom: 20,
  },
};
