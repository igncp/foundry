import { PropTypes } from 'react';
import moment from 'moment';
import { map } from 'ramda';

import Row from 'components/bootstrap-grid/Row';
import TwoThirds from 'components/bootstrap-grid/TwoThirds';
import ButtonDefault from 'components/form/ButtonDefault';

import { s } from 'helpers/responsive';

const Feed = (props) => {
  return (<div>
    <ul style={s(styles.list)}>
      <li style={styles.listItem}><ButtonDefault className="active" value="All"/></li>
      <li style={styles.listItem}><ButtonDefault value="Own posts"/></li>
      <li style={styles.listItem}><ButtonDefault value="Following's posts"/></li>
    </ul>
    <div>
      {map((message) => {
        return (
          <TwoThirds style={styles.message}>
            <Row><strong>{message.get('title')}</strong></Row>
            <Row><span style={styles.from}>from {message.get('username')}
              {` ${moment.unix(message.get('createdOn')).fromNow()}`}</span></Row>
            <Row>{message.get('content')}</Row>
          </TwoThirds>
        );
      })(props.messages.toArray())}
    </div>
  </div>);
};
Feed.displayName = 'Feed';

Feed.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
};

export default Feed;

const styles = {
  list: {
    mobile: {
      listStyle: 'none',
      margin: 0,
      textAlign: 'center',
    },
    tablet: {
      margin: '0 10px',
    },
  },
  listItem: {
    display: 'inline-block',
  },
  message: {
    marginBottom: 20,
  },
  from: {
    color: '#777',
  },
};
