import React from 'react';

class Feed extends React.Component {
  render() {
    return (<div>
      <ul style={styles.list}>
        <li style={styles.listItem}><a className="btn btn-default">All</a></li>
        <li style={styles.listItem}><a className="btn btn-default">Own posts</a></li>
        <li style={styles.listItem}><a className="btn btn-default">Followers posts</a></li>
      </ul>
    </div>);
  }
}
Feed.displayName = 'Feed';

export default Feed;

const styles = {
  list: {
    listStyle: 'none',
  },
  listItem: {
    display: 'inline-block',
  },
};
