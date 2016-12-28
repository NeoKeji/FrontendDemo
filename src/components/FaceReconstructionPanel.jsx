import React from 'react';
import '../assets/style/tabPanel4face.less';


class FaceReconstructionPanel extends React.Component  {
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

  buildItem(datas){
    /*datas.map((item, i)=>{
      let subs = item.subTabs || [];
    })*/
    this.setState({
      datas
    });
    this.forceUpdate();
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

  showContentPanel(index){
    this.props.tabFocus(index);
    //this.state.displayIndex = index;
    //this.forceUpdate();
  }

  onLoadImg(index){
    let file = this.refs[index];
    let src = this.getFileUrl(file);
    let previewImages = this.state.previewImages;
    previewImages[index] = src;
    this.setState({
      previewImages
    })
    console.log('加载图片啦~');
  }
  resetImg(index){
    let previewImages = this.state.previewImages;
    previewImages[index] = '';
    this.setState({
      previewImages
    })
  }
  finish(){
    this.context.router.push('/body')
  }

  /**
   * 从 file 域获取 本地图片 url
   */
  getFileUrl(source) {
    var url;
    if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
      url = source.value;
    } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
      url = window.URL.createObjectURL(source.files.item(0));
    } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
      url = window.URL.createObjectURL(source.files.item(0));
    }
    return url;
  }




  render() {
    return (
      <div >
        <div className='face-content-front' style={{display: this.state.displayIndex===0?'block':'none'}}>
          <div className='face-content-box'>
            <div className='face-content-preview'
                  style={{backgroundImage:'url('+(this.state.previewImages.front||this.state.previewImages.default)+')'}}>
              <input type='file' onChange={()=>{this.onLoadImg('front')}} ref='front' />
            </div>
            <div className='face-content-sample'>
              <img src='../src/assets/images/mainpage/guideimage_u172.PNG'/>
            </div>
          </div>
          <div className='face-content-button-group'>
            <button onClick={()=>{this.resetImg('front')}}>重置</button>
            <button disabled>上一步</button>
            <button onClick={()=>{this.showContentPanel(1)}}>下一步</button>
          </div>

        </div>
        <div className='face-content-left' style={{display: this.state.displayIndex===1?'block':'none'}}>
          <div className='face-content-box'>
            <div className='face-content-preview'
                  style={{backgroundImage:'url('+(this.state.previewImages.left||this.state.previewImages.default)+')'}}>
              <input type='file' onChange={()=>{this.onLoadImg('left')}} ref='left' />
            </div>
            <div className='face-content-sample'>
              <img src='../src/assets/images/mainpage/guideimage_u187.PNG'/>
            </div>
          </div>
          <div className='face-content-button-group'>
            <button onClick={()=>{this.resetImg('left')}}>重置</button>
            <button  onClick={()=>{this.showContentPanel(0)}}>上一步</button>
            <button onClick={()=>{this.showContentPanel(2)}}>下一步</button>
          </div>

        </div>
        <div className='face-content-right' style={{display: this.state.displayIndex===2?'block':'none'}}>
          <div className='face-content-box'>
            <div className='face-content-preview'
                  style={{backgroundImage:'url('+(this.state.previewImages.right||this.state.previewImages.default)+')'}}>
              <input type='file' onChange={()=>{this.onLoadImg('right')}} ref='right' />

            </div>
            <div className='face-content-sample'>
              <img src='../src/assets/images/mainpage/guideimage_u202.PNG'/>
            </div>
          </div>
          <div className='face-content-button-group'>
            <button onClick={()=>{this.resetImg('right')}}>重置</button>
            <button onClick={()=>{this.showContentPanel(1)}}>上一步</button>
            <button onClick={()=>{this.finish()}} disabled={this.state.previewImages.front===''}>完成</button>
          </div>

        </div>
      </div>
    );
  }
}
FaceReconstructionPanel.contextTypes = {
    router: React.PropTypes.object
}
/*TabsContentPanel.defaultProps  = {
    content : <div>我是控制面板ss</div>,
};*/

export default FaceReconstructionPanel;
