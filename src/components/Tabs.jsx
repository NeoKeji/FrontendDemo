import React from 'react';
import TabsContentPanel from './TabsContentPanel.jsx';
import '../assets/style/tabs.less';


class Tabs extends React.Component {

  constructor(props){
    super(props);

    this.currentItem = null;
    this.currentSubItem = null;
    this.tabContent = null;

    this.state = {
      subItems:[],
      propOptions:{}
    }

    this.handleContentPanelSelection = this.handleContentPanelSelection.bind(this);
  }

  handleContentPanelSelection(selItem){
    if(selItem != null){
      this.props.view3dItemSelHandler(true, selItem.itemData.viewImage);
    }else{
      this.props.view3dItemSelHandler(false, '');
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
      let lastItem = this.currentItem;
      if(lastItem){
        lastItem.active = false;
      }
      this.currentItem = item;

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
        this.tabContent.tabChanged(item, index);
        this.forceUpdate();

      }
    }

    //display image for tab selection
    console.log("in _tabFocus");
    if(this.currentItem.tabImage){
      this.props.view3dItemSelHandler(true, this.currentItem.tabImage);
    }else{
      this.props.view3dItemSelHandler(false, '');
    }

  }

  _subTabFocus(item){
    //if(item && !item.active){
      let lastItem = this.currentSubItem;
      if(lastItem){
        lastItem.active = false;
      }
      item.active= true;
      this.currentSubItem = item;

      this.tabContent.subTabChanged(this.currentItem, item);
      this.forceUpdate();
    //}

  }

  componentWillMount(){
    //深拷贝props 避免多组件间的props指针问题
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
            <TabsContentPanel ref={(component) => this.tabContent = component} tabFocus={(index)=>{this.tabFocus(index)}} itemSel={this.handleContentPanelSelection}/>
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
      text: 'Tops',
      val: 'Tops',
    },{
      text: 'Jackets',
      val: 'Jackets',
    },{
      text: 'Dress',
      val: 'Dress',
    },{
      text: 'Pants',
      val: 'Pants',
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
    text: 'Fit',
    val: 'Fit',
    tabImage: '../src/assets/images/mainpage/neofit.png',
  },{
    text: 'Scenes',
    val: 'Scenes',
  },{
    text: 'NeoWorlds',
    val: 'Worlds',
  }]
};


export default Tabs;
