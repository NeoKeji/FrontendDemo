import React from 'react';
import '../assets/style/tabs.less';

//class for tab controls
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

    // Brief: Callback function to handle user selection of Menu Panel item
    // This function call parent component's callback function to send user selected menu panel item information to the parent component
    // Params:
    // obj selItem, user selected Menu Panel item, a data object contains information about user selection including selected tab, subtab, itemIndex and itemData
    handleContentPanelSelection(selItem){
        if(this.props.view3dItemSelHandler){
            if(selItem != null){
                this.props.view3dItemSelHandler(true, selItem.itemData.viewImage);
            }else{
                this.props.view3dItemSelHandler(false, '');
            }
        }
    }

    // Brief: callback function to handle tab changes
    // Params: int index, index of selected tab
    tabFocus(index){
        let tabItem = this.state.propOptions.tabItems;
        let item = tabItem[index];
        if(item){
            this._tabFocus(item, index)
        }
    }

    // Brief: function to change tab focus, expand subTabs and call tab or subTab content change handler
    // Params:
    // obj item, a tab item selected. if subTabs is not empty, then this tab has subTabs
    // int index, index of selected tab
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
        //Call parent component's callback function to send user selected tab item information to the parent component
        if(this.props.view3dItemSelHandler){
            if(this.currentItem.tabImage){
                this.props.view3dItemSelHandler(true, this.currentItem.tabImage);
            }else{
                this.props.view3dItemSelHandler(false, '');
            }
        }

    }

    //Brief: function to change subTab focus
    // Params:
    // obj item, a subTab item selected.
    _subTabFocus(item){
        let lastItem = this.currentSubItem;
        if(lastItem){
            lastItem.active = false;
        }
        item.active= true;
        this.currentSubItem = item;

        this.tabContent.subTabChanged(this.currentItem, item);
        this.forceUpdate();
    }

    //Brief: Functon to read defaultProps
    componentWillMount(){
        //Liu Fei: deep copy of props, to avoid conflict pointer of props between components
        let propOptions = this.props;
        if(this.props === Tabs.defaultProps){
            propOptions = JSON.parse(JSON.stringify(this.props));
        }
        this.setState({
            propOptions
        });
    }

    //Brief: Function to clear active tab and activate tab based on this value of this.state.defaultProps.defaultActive
    componentDidMount (){

        this.state.propOptions.tabItems.map((item,i)=>{
            delete item.active;
            if(item.subTabs && (item.subTabs instanceof Array) && item.subTabs.length>0){
                item.subTabs.map((subItem, i) => {
                    delete subItem.active;
                })
            }

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
                                        key={item.id}
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
                                        key={item.id}
                                        onClick={()=>{this._subTabFocus(item)}}>{item.text}</li>
                        })
                    }
                    </ul>
                </div>
                <div className='tabs-content-panel'>
                    <this.props.tabsContentPanel ref={(component) => this.tabContent = component} tabFocus={(index)=>{this.tabFocus(index)}} itemSel={this.handleContentPanelSelection}/>
                </div>

            </div>
        );
    }

}

Tabs.defaultProps  = {
    defaultActive: 0,
    tabItems : [{
        text: 'Clothes',
        id: 'Clothes',
        subTabs:[{
            text: 'Tops',
            id: 'Tops',
        },{
            text: 'Jackets',
            id: 'Jackets',
        },{
            text: 'Dress',
            id: 'Dress',
        },{
            text: 'Pants',
            id: 'Pants',
        },{
            text: 'Shoes',
            id: 'Shoes',
        }]
    },{
        text: 'Hairstyles',
        id: 'Hairstyles',
        subTabs:[{
            text: 'Short',
            id: 'Short',
        },{
            text: 'Mid',
            id: 'Mid',
        },{
            text: 'Long',
            id: 'Long',
        }]
    },{
        text: 'Fit',
        id: 'Fit',
        tabImage: '../src/assets/images/mainpage/neofit.png',
    },{
        text: 'Scenes',
        id: 'Scenes',
    },{
        text: 'NeoWorlds',
        id: 'Worlds',
    }]
};


export default Tabs;
