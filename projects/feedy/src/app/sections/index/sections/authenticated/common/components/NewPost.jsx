import React from 'react';

class NewPost extends React.Component {
  render() {
    return (<div>
      <div><p>New post</p></div>
      <div>
        <p>Title: <input type="text"/></p>
        <div>
          <p>Content:</p>
          <textarea></textarea>
        </div>
      </div>
    </div>);
  }
}
NewPost.displayName = 'NewPost';

export default NewPost;
