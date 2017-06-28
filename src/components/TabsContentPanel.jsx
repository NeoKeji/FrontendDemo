import React from 'react';
import Panel2 from './Panel.jsx';

var mockData = {
  Clothes : {
    Dress : [{
      code:'D609841',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u57.png',
      price: '$219'
    },{
      code:'D609842',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u59.png',
      price: '$568'
    },{
      code:'D609843',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u61.png',
      price: '$143'
    },{
      code:'D609844',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u63.png',
      price: '$257'
    },{
      code:'D609845',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u65.png',
      price: '$399'
    },{
      code:'D609846',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u67.png',
      price: '$125'
    },{
      code:'D609847',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u69.png',
      price: '$619'
    },{
      code:'D609848',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u73.png',
      price: '$203'
    },{
      code:'D609849',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u71.png',
      price: '$315'
    }],
    Pants : [{
      code:'D6298213',
      desc: 'Lakers Practice Pants<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u213.png',
      price: '$119'
    },{
      code:'D6298214',
      desc: 'Lakers Home Shorts<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u214.png',
      price: '$129'
    },{
      code:'D6298215',
      desc: 'Blue Jeans For Men<br/>Jeans<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u215.png',
      price: '$129'
    },{
      code:'D6298216',
      desc: 'Dark Jeans For Men<br/>Jeans<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u216.png',
      price: '$129'
    },{
      code:'D6298217',
      desc: 'Fashionable Sports Pants<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u217.png',
      price: '$109'
    },{
        code:'D6098471',
        desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
        care: 'Professional launder recommended',
        img : '../src/assets/images/clothing/u76.png',
        price: '$219'
      },{
        code:'D6098482',
        desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
        care: 'Professional launder recommended',
        img : '../src/assets/images/clothing/u78.png',
        price: '$219'
      },{
        code:'D6098493',
        desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
        care: 'Professional launder recommended',
        img : '../src/assets/images/clothing/u80.png',
        price: '$219'
      }],
    Tops : [{
      code:'D6298118',
      desc: 'Kobe Lakers Home Jersey<br/>Sports Jersey<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u118.png',
      price: '$99'
    },{
      code:'D6298497',
      desc: 'Printed Women T-Shirt<br/>T-shirt<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u97.png',
      price: '$29'
      },{
        code:'D6298495',
        desc: 'Printed Women T-Shirt<br/>T-shirt<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
        care: 'Professional launder recommended',
        img : '../src/assets/images/clothing/u95.png',
        price: '$39'
      }],
    Jackets : [
        {
          code:'D6398301',
          desc: 'Nike Kobe Sports Jacket<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
          care: 'Professional launder recommended',
          img : '../src/assets/images/clothing/u301.png',
          price: '$159'
          },{
            code:'D6398302',
            desc: 'Blue and White Sports Jacket<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : '../src/assets/images/clothing/u302.png',
            price: '$109'
          },{
            code:'D6398303',
            desc: 'Elegent Sports Coat<br/>Suit<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : '../src/assets/images/clothing/u303.png',
            price: '$439'
          },{
            code:'D6398304',
            desc: 'Elegent Nylon Navy Blue Jacket<br/>Suit<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : '../src/assets/images/clothing/u304.png',
            price: '$199'
          }
    ],
    Shoes : [{
              code:'D6498401',
              desc: 'Nike Kobe XI<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
              care: 'Professional launder recommended',
              img : '../src/assets/images/clothing/u401.png',
              price: '$142'
            },{
                code:'D6498402',
                desc: 'Air Jordan XI<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
                care: 'Professional launder recommended',
                img : '../src/assets/images/clothing/u402.png',
                price: '$168'
            },{
                code:'D6498403',
                desc: 'Dr Martens Boots Black<br/>Boots<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
                care: 'Professional launder recommended',
                img : '../src/assets/images/clothing/u403.png',
                price: '$156'
            },{
                code:'D6498404',
                desc: 'Addidas Stan Smith White Sneakers<br/>Sneakers<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
                care: 'Professional launder recommended',
                img : '../src/assets/images/clothing/u404.png',
                price: '$109'
            },{
                code:'D6498405',
                desc: 'Christian Louboutin High Heels<br/>High Heels<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
                care: 'Professional launder recommended',
                img : '../src/assets/images/clothing/u405.png',
                price: '$859'
            },{
                code:'D6498406',
                desc: 'Valentino High Heels<br/>High Heels<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
                care: 'Professional launder recommended',
                img : '../src/assets/images/clothing/u406.png',
                price: '$726'
            },
    ],

  },

  Hairstyles: {
      Short: [{
            code:'D501001',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1001.png',
            price: ''
        },{
            code:'D501002',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1002.png',
            price: ''
        },{
            code:'D501003',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1003.png',
            price: ''
        },{
            code:'D501004',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1004.png',
            price: ''
        },{
            code:'D501005',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1005.png',
            price: ''
        },
      ],
      Mid: [{
            code:'D501101',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1101.png',
            price: ''
        },{
            code:'D501102',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1102.png',
            price: ''
        },{
            code:'D501103',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1103.png',
            price: ''
        },{
            code:'D501104',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1104.png',
            price: ''
        },{
            code:'D501105',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1105.png',
            price: ''
        },

      ],
      Long: [{
            code:'D501201',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1201.png',
            price: ''
        },{
            code:'D501202',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1202.png',
            price: ''
        },{
            code:'D501203',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1203.png',
            price: ''
        },{
            code:'D501204',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1204.png',
            price: ''
        },

      ]
  }
}


class TabsContentPanel extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      content:'',
      datas:[],
      isShowDetail:false,
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
      isShowDetail : true,
      detailItem : item
    });
    this.forceUpdate();
  }

  closeDetail(){
    this.setState({
      isShowDetail : false,
      detailItem : {}
    });
    this.forceUpdate();
  }

  rawMarkup(content){
      //var md = new Remarkable();
      return { __html: content };
  }

  render() {
    return (
      <div >
        <div className='content-items' style={{display: !this.state.isShowDetail?'block':'none'}}>
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
        <div className='detail' style={{display: this.state.isShowDetail?'flex':'none'}}>
          <div className='detail-image'>
            <img src={this.state.detailItem?this.state.detailItem.img:''}/>
            <div className='detail-price'>{this.state.detailItem.price}</div>
          </div>
          <div className='detail-msg'>
            <section>
              <h4>Product code</h4>
              <span>{this.state.detailItem.code}</span>
            </section>
            <section>
              <h4>Product Description</h4>
              <div dangerouslySetInnerHTML={this.rawMarkup(this.state.detailItem.desc)} />
            </section>
            <section>
              <h4>Care Instructions</h4>
              <div>{this.state.detailItem.care}</div>
            </section>
            <div className='detail-msg-action'>
                <button onClick={()=>{}}>购买</button>
                <button onClick={()=>{this.closeDetail()}}>返回</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default TabsContentPanel;
