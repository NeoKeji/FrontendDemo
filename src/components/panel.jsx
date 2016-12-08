import React from 'react';


class Panel extends React.Component {
  
  
  render() {
    return (
      <div className='ctrlPanel'>
        {this.props.content}
      </div>
    );
  }
}

Panel.defaultProps  = {
  content : <div>我是控制面板</div>,
};

export default Panel;
