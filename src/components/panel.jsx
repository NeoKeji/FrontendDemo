import React from 'react';


class Panel extends React.Component {
  
  
  render() {
    return (
      <div className={'ctrlPanel '+this.props.clazz}>
        {this.props.content}
      </div>
    );
  }
}

Panel.defaultProps  = {
  clazz:'',
  content : <div>我是控制面板</div>,
};

export default Panel;
