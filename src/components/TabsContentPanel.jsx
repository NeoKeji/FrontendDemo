import React from 'react';
import Panel2 from './Panel.jsx';

var mockData = {
  Clothes : {
    Dress : [{
      code:'D609841',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u57.png'
    },{
      code:'D609842',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u59.png'
    },{
      code:'D609843',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u61.png'
    },{
      code:'D609844',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u63.png'
    },{
      code:'D609845',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u65.png'
    },{
      code:'D609846',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u67.png'
    },{
      code:'D609847',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u69.png'
    },{
      code:'D609848',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u73.png'
    },{
      code:'D609849',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u71.png'
    }],
    Pants : [{
      code:'D6098471',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u76.png'
    },{
      code:'D6098482',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u78.png'
    },{
      code:'D6098493',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u80.png'
    }],
    Tops : [],
    Suits : [],
    Shoes : [],

  }
}


class TabsContentPanel extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      content:'',
      datas:[],
      isShowDeail:false,
      detailItem:{}
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
  
  tabChanged(tabItem){
    let datas = mockData[tabItem.val] || [];
    this.setState({
      datas
    });
    this.closeDetail();
    
  }
  
  subTabChanged(tabItem, subTabItem){
    let datas = mockData[tabItem.val];
    datas = datas?(datas[subTabItem.val] || []) :[];
    this.setState({
      datas
    });
    this.closeDetail();
  }
  
  itemClicked(item){
    console.log(item.code);
    this.setState({
      isShowDeail : true,
      detailItem : item
    });
    this.forceUpdate();
  }
  
  closeDetail(){
    this.setState({
      isShowDeail : false,
      detailItem : {}
    });
    this.forceUpdate();
  }
  
  render() {
    return (
      <div >
        <div className='content-items' style={{display: !this.state.isShowDeail?'block':'none'}}>
          {
            this.state.datas.map((item,i)=>{
              let subs = item.subTabs;
              if(subs){
                subs.map((sub, i)=>{
                  return <img src={sub.img} key={sub.code} className='view-item' onClick={()=>{this.itemClicked(sub)}}/>
                })
              }else{
                return <img src={item.img} key={item.code} className='view-item' onClick={()=>{this.itemClicked(item)}}/>
              }
            })
          }
        </div>
        <div className='detail' style={{display: this.state.isShowDeail?'flex':'none'}}>
          <div className='detail-image'>
            <img src={this.state.detailItem?this.state.detailItem.img:''}/>
            <div>$219</div>
          </div>
          <div className='detail-msg'>
            <section>
              <h4>Product code : </h4>
              <span>{this.state.detailItem.code}</span>
            </section>
            <section>
              <h4>Product Description</h4>
              <div>{this.state.detailItem.desc}</div>
            </section>
            <section>
              <h4>Care Instructions</h4>
              <div>{this.state.detailItem.care}</div>
            </section>
            <button onClick={()=>{this.closeDetail()}}>返回</button>
          </div>
        </div>
      </div>
    );
  }
}

/*TabsContentPanel.defaultProps  = {
    content : <div>我是控制面板ss</div>,
};*/

export default TabsContentPanel;
