import React from 'react';
import '../assets/style/scrollBar.less';


class ScrollBar extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      name:'',
      hasMouseDown:false,
      step:5,
      value:0,
      min:0,
      max:400
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
      
      let stepX = Math.round(offsetX/this.state.step)*this.state.step;
      console.log(stepX);
      
      if(offsetX>=this.state.min && offsetX<=this.state.max){
        this.setState({
          value : stepX
        });
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
    
    this.unitWidth = this.refs.scrollBar.clientWidth/(this.state.max/this.state.step);
    console.log('unit: '+this.unitWidth);
    
    let props = Object.assign({},this.props)
    console.log(props)
    this.setState({
      min : this.props.min,
      max : this.props.max,
      step : this.props.step,
    })
  }
  
  render() {
    return (
      <div className='scroll-bar' ref='scrollBar' style={{width:this.state.max+'px'}}>
        <div className='scroll-bar-btn' 
              onMouseDown={(e)=>{this.btnFocus(e)}} 
              style={{left:this.state.value+'px'}}>
          <div className='scroll-bar-value'>
            {this.state.value}
          </div>
        </div>
      </div>
    );
  }
}

export default ScrollBar;
