import React from 'react';
import '../assets/style/scrollBar.less';


class ScrollBar extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      unit:0,
      name:'',
      hasMouseDown:false,
      step:5,
      value:0,
      min:0,
      max:400,
      offsetLeft:0
    }
    
  }
  
  btnFocus(e){
    this.setState({
      hasMouseDown:true
    });
  }
  btnBlur(e){
    if(this.state.hasMouseDown){
      this.setState({
        hasMouseDown:false
      });
      let eventHandle =  this.props.onScrollTo;
      eventHandle && eventHandle.call(this,this.state.value,this.state.name);
    }
  }
  btnMove(e){
    //console.log(this.state.hasMouseDown);
    if(this.state.hasMouseDown){
      let scrollBarLeft = this.refs.scrollBar.screenX;
      let x = e.screenX;//e.pageX;
      let offsetX = this.getOffsetX(e, this.refs.scrollBar);
      let width = this.refs.scrollBar.getBoundingClientRect().width;
      
      let value = this.state.max*(offsetX/width);
      value = Math.round(value/this.state.step)*this.state.step;
      let offsetLeft = Math.round((value/this.state.max*width)/this.state.step)*this.state.step;
      let oldValue = this.state.value;
      if(value<=this.state.min){
        value = offsetLeft = 0;
      }else if(value>=this.state.max){
        value = this.state.max;
        offsetLeft = width;
      }
      //如果值有变化再更新
      if(value !== oldValue){
        this.setState({
          value : value,
          offsetLeft 
        });
        if(this.props.onScrollValueChanged){
          this.props.onScrollValueChanged(this.state.name, value);
        }
      }
      
      
    }
    
  }
  
  getOffsetX(event, srcObj){
      var evt =event||window.event;
      //var srcObj = evt.target || evt.srcElement;
      var rect = srcObj.getBoundingClientRect();
      var clientx = evt.clientX;
      return clientx - rect.left;
  
      //return evt.offsetX || (evt.clientX - srcObj.getBoundingClientRect().left);
  }
  
  componentDidMount (){
    window.document.body.addEventListener('mouseup',(e)=>{
      this.btnBlur(e);
    },false)
    window.document.body.addEventListener('mousemove',(e)=>{
      this.btnMove(e);
    },false);
    
    //this.unitWidth = this.refs.scrollBar.clientWidth/(this.state.max/this.state.step);
    //console.log('unit: '+this.unitWidth);
    
    let props = Object.assign({},this.props)
    //console.log(props)
    
    let width = this.refs.scrollBar.getBoundingClientRect().width;
    let unit = width/100;
    
    this.setState({
      unit,
      name: this.props.name,
      min : this.props.min,
      max : this.props.max,
      step : this.props.step,
    })
  }
  
  render() {
    return (
      <div className='scroll-bar' ref='scrollBar' style={{width:'100%'}}>
        <div className='scroll-bar-btn' 
              onMouseDown={(e)=>{this.btnFocus(e)}} 
              style={{left:this.state.offsetLeft+'px'}}>
          <div className='scroll-bar-value'>
            {this.state.value}
          </div>
        </div>
      </div>
    );
  }
}

export default ScrollBar;
