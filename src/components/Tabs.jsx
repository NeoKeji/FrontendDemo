import React from 'react';
import '../assets/style/tabs.less';
import TabsContentPanel from './TabsContentPanel.jsx';


class Tabs extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      currentItem:null,
      currentSubItem:null,
      subItems:[]
    }
  }
  
  _tabFocus(item){
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
        this.refs.tabsContentPanel.tabChanged(item);
        this.forceUpdate();
        
      }
    }
    
  }
  
  _subTabFocus(item){
    if(item && !item.active){
      item.active= true;
      let lastItem = this.state.currentSubItem;
      if(lastItem){
        lastItem.active = false;
      }
      this.setState({
        currentSubItem : item
      });
      this.refs.tabsContentPanel.subTabChanged(this.state.currentItem, item);
      this.forceUpdate();
    }
    
  }
  
  
  componentDidMount (){
    this.props.tabItems.map((item,i)=>{
      if(i===this.props.defaultActive){
        this._tabFocus(item);
      }
    });
  }
  
  render() {
    return (
      <div  className="tab-wrap ">
        <div className='tab-item-group'>
          <ul>
            {
              this.props.tabItems.map((item,i)=>{
                let itemClass = item.active?'active':'';
                return <li  className={itemClass} 
                            key={item.val} 
                            onClick={()=>{this._tabFocus(item)}}>{item.text}</li>
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
        <TabsContentPanel  ref='tabsContentPanel' />
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
