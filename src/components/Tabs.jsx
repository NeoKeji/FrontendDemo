import React from 'react';
import '../assets/style/tabs.less';


class Tabs extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      currentItem:null,
      currentSubItem:null,
      subItems:[],
      propOptions:{}
      
    }
  }
  
  tabFocus(index){
    let tabItem = this.state.propOptions.tabItems;
    let item = tabItem[index];
    if(item){
      this._tabFocus(item, index)
    }
  }
  
  _tabFocus(item, index){
    if(!item.active){
      item.active= true;
      let lastItem = this.state.currentItem;
      if(lastItem){
        lastItem.active = false;
      }
      this.setState({
        currentItem : item
      });
      if(item.subTabs && (item.subTabs instanceof Array) && item.subTabs.length>0){
        this.setState({
          subItems : item.subTabs
        });
        setTimeout(()=>{
          this._subTabFocus(item.subTabs[0]);
        },0)
      }else{
        this.setState({
          subItems : []
        })
        this.refs.tabsContentPanel.tabChanged(item, index);
        this.forceUpdate();
        
      }
    }
    
  }
  
  _subTabFocus(item){
    //if(item && !item.active){
      let lastItem = this.state.currentSubItem;
      if(lastItem){
        lastItem.active = false;
      }
      item.active= true;
      this.setState({
        currentSubItem : item
      });
      this.refs.tabsContentPanel.subTabChanged(this.state.currentItem, item);
      this.forceUpdate();
    //}
    
  }
  
  componentWillMount(){
    //深拷贝props 避免多组件见的props指针问题
    //let propOptions = Object.assign({},this.props);
    let propOptions = this.props;
    if(this.props === Tabs.defaultProps){ 
      propOptions = JSON.parse(JSON.stringify(this.props));
    }
    this.setState({
      propOptions
    });
  }
  
  componentDidMount (){
    
    this.state.propOptions.tabItems.map((item,i)=>{
      delete item.active;
      if(i===this.state.propOptions.defaultActive){
        this._tabFocus(item, i);
      }
    });
  }
  
  render() {
    return (
      <div  className="tab-wrap ">
        <div className='tab-item-group'>
          <ul>
            {
              this.state.propOptions.tabItems.map((item,i)=>{
                let itemClass = item.active?'active':'';
                return <li  className={itemClass} 
                            key={item.val} 
                            onClick={()=>{this._tabFocus(item, i)}}>{item.text}</li>
              })
            }
          </ul>
        </div>
        <div className='sub-tab-item-group'>
          <ul>
            {
              this.state.subItems.map((item,i)=>{
                let itemClass = item.active?'active':'';
                return <li  className={itemClass} 
                            key={item.val} 
                            onClick={()=>{this._subTabFocus(item)}}>{item.text}</li>
              })
            }
          </ul>
        </div>
        <div className='tabs-content-panel'>
            <this.props.tabsContentPanel ref='tabsContentPanel' tabFocus={(index)=>{this.tabFocus(index)}}/>
        </div>
        
      </div>
    );
  }
}

Tabs.defaultProps  = {
  defaultActive: 0,
  tabItems : [{
    text: 'Clothes',
    val: 'Clothes',
    subTabs:[{
      text: 'Dress',
      val: 'Dress',
    },{
      text: 'Pants',
      val: 'Pants',
    },{
      text: 'Tops',
      val: 'Tops',
    },{
      text: 'Suits',
      val: 'Suits',
    },{
      text: 'Shoes',
      val: 'Shoes',
    }]
  },{
    text: 'Hairstyles',
    val: 'Hairstyles',
    subTabs:[{
      text: 'Short',
      val: 'Short',
    },{
      text: 'Mid',
      val: 'Mid',
    },{
      text: 'Long',
      val: 'Long',
    }]
  },{
    text: 'Scenes',
    val: 'Scenes',
  },{
    text: 'Movies',
    val: 'Movies',
  },{
    text: 'Worlds',
    val: 'Worlds',
  }]
};


export default Tabs;
