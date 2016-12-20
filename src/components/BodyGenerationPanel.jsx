import React from 'react';
import ScrollBar from './ScrollBar.jsx';
import '../assets/style/tabPanel4face.less';


class BodyGenerationPanel extends React.Component  {
  constructor(props, context){
    super(props, context);
    this.state = {
      content:'',
      displayIndex:0,
      previewImages:{
        default:'../src/assets/images/mainpage/u168.PNG',
        front:'',
        left:'',
        right:''
      }
    }
  }
  
  
  tabChanged(tabItem, index){
    /*let datas = mockData[tabItem.val] || [];
    this.setState({
      datas
    });*/
    this.state.displayIndex = index;
    this.forceUpdate();
  }
  
  subTabChanged(tabItem, subTabItem){
    /*let datas = mockData[tabItem.val];
    datas = datas?(datas[subTabItem.val] || []) :[];
    this.setState({
      datas
    });*/
  }
  
  finish(){
    this.context.router.push('/body')
  }
  
  

  
  
  render() {
    return (
      <div >
        <ScrollBar min={0} max={400} step={11}/>
      </div>
    );
  }
}
BodyGenerationPanel.contextTypes = {
    router: React.PropTypes.object
}
/*TabsContentPanel.defaultProps  = {
    content : <div>我是控制面板ss</div>,
};*/

export default BodyGenerationPanel;
