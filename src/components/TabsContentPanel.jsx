import React from 'react';
import Panel2 from './panel.jsx';

//class for tab content component
class TabsContentPanel extends React.Component  {
    constructor(props){
        super(props);

        this.curTabId = null;
        this.curSubTabId = null;

        this.selItem = {
            tabId: null,
            subTabId: null,
            itemIndex: null,
            itemData: null
        }

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

    // Brief: Function to change tab panel content according to selected tabItem
    // Params:
    // obj tabItem， the selected tabItem, use tabItem.id to find tab content data
    tabChanged(tabItem){
        this.curTabId = tabItem.id;
        this.curSubTabId = null;

        let datas = mockData[this.curTabId] || [];
        this.setState({
            datas
        });
        this.closeDetail();

    }

    // Brief: Function to change tab panel content according to selected subTabItem
    // Params:
    // obj tabItem, subTabItem, the selected tabItem and subTabItem, use their id to find tab content data
    subTabChanged(tabItem, subTabItem){
        this.curTabId = tabItem.id;
        this.curSubTabId = subTabItem.id;

        let datas = mockData[this.curTabId];
        datas = datas?(datas[this.curSubTabId] || []) :[];
        this.setState({
            datas
        });
        this.closeDetail();
    }

    // Brief: Function to handle user clicked on Menu Panel item
    // Params:
    // obj item，user selected data object of the menu panel item
    // int index, index of user selected data object in data array
    itemClicked(item,index){
        this.selItem = {
            tabId: this.curTabId,
            subTabId: this.curSubTabId,
            itemIndex: index,
            itemData: item
        };

        //call parent component's callback function to pass the user selected menu panel item to parent component
        this.props.itemSel(this.selItem);

        this.setState({
            isShowDetail : true,
            detailItem : item
        });
        this.forceUpdate();
    }

    // Brief: Close Menu Item Detail Page and return to Menu Panel Item List
    closeDetail(){
        this.selItem = null;
        this.props.itemSel(this.selItem);

        this.setState({
            isShowDetail : false,
            detailItem : {}
        });
        this.forceUpdate();
    }

    rawMarkup(content){
        return { __html: content };
    }

    render() {
        return (
            <div >
                <div className='content-items' style={{display: !this.state.isShowDetail?'block':'none'}}>
                {
                    this.state.datas.map((item,i)=>{
                        return <img src={item.img} key={item.code} className='view-item' onClick={()=>{this.itemClicked(item, i)}}/>
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


//Mock Data
var mockData = {
  Clothes : {
    Tops : [{
      code:'D6298118',
      desc: 'Kobe Lakers Home Jersey<br/>Sports Jersey<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u118.png',
      price: '$99',
      viewImage: '../src/assets/images/mainpage/3d_view_u47.PNG'
    },{
      code:'D6298497',
      desc: 'Printed Women T-Shirt<br/>T-shirt<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u97.png',
      price: '$29',
      viewImage: '../src/assets/images/mainpage/VirtualShopping2.PNG'
      },{
        code:'D6298495',
        desc: 'Printed Women T-Shirt<br/>T-shirt<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
        care: 'Professional launder recommended',
        img : '../src/assets/images/clothing/u95.png',
        price: '$39',
        viewImage: '../src/assets/images/mainpage/VirtualShopping3.PNG'
      }],
    Jackets : [
        {
          code:'D6398301',
          desc: 'Nike Kobe Sports Jacket<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
          care: 'Professional launder recommended',
          img : '../src/assets/images/clothing/u301.png',
          price: '$159',
          viewImage: '../src/assets/images/mainpage/VirtualShopping6.PNG'
          },{
            code:'D6398302',
            desc: 'Blue and White Sports Jacket<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : '../src/assets/images/clothing/u302.png',
            price: '$109',
            viewImage: '../src/assets/images/mainpage/VirtualShopping6.PNG'
          },{
            code:'D6398303',
            desc: 'Elegent Sports Coat<br/>Suit<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : '../src/assets/images/clothing/u303.png',
            price: '$439',
            viewImage: '../src/assets/images/mainpage/VirtualShopping6.PNG'
          },{
            code:'D6398304',
            desc: 'Elegent Nylon Navy Blue Jacket<br/>Suit<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : '../src/assets/images/clothing/u304.png',
            price: '$199',
            viewImage: '../src/assets/images/mainpage/VirtualShopping7.PNG'
          }
    ],
    Dress : [{
      code:'D609841',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u57.png',
      price: '$219',
      viewImage: '../src/assets/images/mainpage/VirtualShopping5.PNG'
    },{
      code:'D609842',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u59.png',
      price: '$568',
      viewImage: '../src/assets/images/mainpage/VirtualShopping5.PNG'
    },{
      code:'D609843',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u61.png',
      price: '$143',
      viewImage: '../src/assets/images/mainpage/VirtualShopping5.PNG'
    },{
      code:'D609844',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u63.png',
      price: '$257',
      viewImage: '../src/assets/images/mainpage/VirtualShopping5.PNG'
    },{
      code:'D609845',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u65.png',
      price: '$399',
      viewImage: '../src/assets/images/mainpage/VirtualShopping5.PNG'
    },{
      code:'D609846',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u67.png',
      price: '$125',
      viewImage: '../src/assets/images/mainpage/VirtualShopping5.PNG'
    },{
      code:'D609847',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u69.png',
      price: '$619',
      viewImage: '../src/assets/images/mainpage/VirtualShopping5.PNG'
    },{
      code:'D609848',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u73.png',
      price: '$203',
      viewImage: '../src/assets/images/mainpage/VirtualShopping5.PNG'
    },{
      code:'D609849',
      desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u71.png',
      price: '$315',
      viewImage: '../src/assets/images/mainpage/VirtualShopping5.PNG'
    }],
    Pants : [{
      code:'D6298213',
      desc: 'Lakers Practice Pants<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u213.png',
      price: '$119',
      viewImage: '../src/assets/images/mainpage/3d_view_u47.PNG'
    },{
      code:'D6298214',
      desc: 'Lakers Home Shorts<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u214.png',
      price: '$129',
      viewImage: '../src/assets/images/mainpage/3d_view_u47.PNG'
    },{
      code:'D6298215',
      desc: 'Blue Jeans For Men<br/>Jeans<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u215.png',
      price: '$129',
      viewImage: '../src/assets/images/mainpage/VirtualShopping4.PNG'
    },{
      code:'D6298216',
      desc: 'Dark Jeans For Men<br/>Jeans<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u216.png',
      price: '$129',
      viewImage: '../src/assets/images/mainpage/VirtualShopping6.PNG'
    },{
      code:'D6298217',
      desc: 'Fashionable Sports Pants<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
      care: 'Professional launder recommended',
      img : '../src/assets/images/clothing/u217.png',
      price: '$109',
      viewImage: '../src/assets/images/mainpage/VirtualShopping1.PNG'
    },{
        code:'D6098471',
        desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
        care: 'Professional launder recommended',
        img : '../src/assets/images/clothing/u76.png',
        price: '$219',
        viewImage: '../src/assets/images/mainpage/VirtualShopping4.PNG'
      },{
        code:'D6098482',
        desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
        care: 'Professional launder recommended',
        img : '../src/assets/images/clothing/u78.png',
        price: '$219',
        viewImage: '../src/assets/images/mainpage/VirtualShopping6.PNG'
      },{
        code:'D6098493',
        desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
        care: 'Professional launder recommended',
        img : '../src/assets/images/clothing/u80.png',
        price: '$219',
        viewImage: '../src/assets/images/mainpage/VirtualShopping6.PNG'
      }],
    Shoes : [{
              code:'D6498401',
              desc: 'Nike Kobe XI<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
              care: 'Professional launder recommended',
              img : '../src/assets/images/clothing/u401.png',
              price: '$142',
              viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
            },{
                code:'D6498402',
                desc: 'Air Jordan XI<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
                care: 'Professional launder recommended',
                img : '../src/assets/images/clothing/u402.png',
                price: '$168',
                viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
            },{
                code:'D6498403',
                desc: 'Dr Martens Boots Black<br/>Boots<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
                care: 'Professional launder recommended',
                img : '../src/assets/images/clothing/u403.png',
                price: '$156',
                viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
            },{
                code:'D6498404',
                desc: 'Addidas Stan Smith White Sneakers<br/>Sneakers<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
                care: 'Professional launder recommended',
                img : '../src/assets/images/clothing/u404.png',
                price: '$109',
                viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
            },{
                code:'D6498405',
                desc: 'Christian Louboutin High Heels<br/>High Heels<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
                care: 'Professional launder recommended',
                img : '../src/assets/images/clothing/u405.png',
                price: '$859',
                viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
            },{
                code:'D6498406',
                desc: 'Valentino High Heels<br/>High Heels<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
                care: 'Professional launder recommended',
                img : '../src/assets/images/clothing/u406.png',
                price: '$726',
                viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
            },
    ],

  },

  Hairstyles: {
      Short: [{
            code:'D501001',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1001.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u47.PNG'
        },{
            code:'D501002',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1002.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u47.PNG'
        },{
            code:'D501003',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1003.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
        },{
            code:'D501004',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1004.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
        },{
            code:'D501005',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1005.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
        },
      ],
      Mid: [{
            code:'D501101',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1101.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u47.PNG'
        },{
            code:'D501102',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1102.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u47.PNG'
        },{
            code:'D501103',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1103.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u47.PNG'
        },{
            code:'D501104',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1104.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
        },{
            code:'D501105',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1105.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
        },

      ],
      Long: [{
            code:'D501201',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1201.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
        },{
            code:'D501202',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1202.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
        },{
            code:'D501203',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1203.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u46.PNG'
        },{
            code:'D501204',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : '../src/assets/images/hairstyles/u1204.png',
            price: '',
            viewImage: '../src/assets/images/mainpage/3d_view_u47.PNG'
        },

      ]
  },

  Fit: [

  ],

  Scenes: [

  ],

  Worlds: [

  ]
}


export default TabsContentPanel;
