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
            code:'I000000000',
            desc: 'Kobe Lakers Home Jersey<br/>Sports Jersey<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000000000.png',
            price: '$99',
            viewImage: '',
            modelUrl: 'Clothes/LakersJersey/LakerJersey.obj',
            mtlUrl: 'Clothes/LakersJersey/LakerJersey.mtl'
        },{
            code:'I000000001',
            desc: 'Printed Women T-Shirt<br/>T-shirt<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000000001.png',
            price: '$29',
            viewImage: 'src/assets/images/mainpage/VirtualShopping2.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000000002',
            desc: 'Printed Women T-Shirt<br/>T-shirt<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000000002.png',
            price: '$39',
            viewImage: 'src/assets/images/mainpage/VirtualShopping3.PNG',
            modelUrl: '',
            mtlUrl: ''
        }],
        Jackets : [{
            code:'I000010000',
            desc: 'Nike Kobe Sports Jacket<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000010000.png',
            price: '$159',
            viewImage: 'src/assets/images/mainpage/VirtualShopping6.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000010001',
            desc: 'Blue and White Sports Jacket<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000010001.png',
            price: '$109',
            viewImage: 'src/assets/images/mainpage/VirtualShopping6.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000010002',
            desc: 'Elegent Sports Coat<br/>Suit<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000010002.png',
            price: '$439',
            viewImage: 'src/assets/images/mainpage/VirtualShopping6.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000010003',
            desc: 'Elegent Nylon Navy Blue Jacket<br/>Suit<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000010003.png',
            price: '$199',
            viewImage: 'src/assets/images/mainpage/VirtualShopping7.PNG',
            modelUrl: '',
            mtlUrl: ''
        }],
        Dress : [{
            code:'I000020000',
            desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000020000.png',
            price: '$219',
            viewImage: 'src/assets/images/mainpage/VirtualShopping5.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000020001',
            desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000020001.png',
            price: '$568',
            viewImage: 'src/assets/images/mainpage/VirtualShopping5.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000020002',
            desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000020002.png',
            price: '$143',
            viewImage: 'src/assets/images/mainpage/VirtualShopping5.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000020003',
            desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000020003.png',
            price: '$257',
            viewImage: 'src/assets/images/mainpage/VirtualShopping5.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000020004',
            desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000020004.png',
            price: '$399',
            viewImage: 'src/assets/images/mainpage/VirtualShopping5.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000020005',
            desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000020005.png',
            price: '$125',
            viewImage: 'src/assets/images/mainpage/VirtualShopping5.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000020006',
            desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000020006.png',
            price: '$619',
            viewImage: 'src/assets/images/mainpage/VirtualShopping5.PNG'
        },{
            code:'I000020007',
            desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000020007.png',
            price: '$203',
            viewImage: 'src/assets/images/mainpage/VirtualShopping5.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000020008',
            desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000020008.png',
            price: '$315',
            viewImage: 'src/assets/images/mainpage/VirtualShopping5.PNG',
            modelUrl: '',
            mtlUrl: ''
        }],
        Pants : [{
            code:'I000030000',
            desc: 'Lakers Practice Pants<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000030000.png',
            price: '$119',
            viewImage: 'src/assets/images/mainpage/3d_view_u47.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000030001',
            desc: 'Lakers Home Shorts<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000030001.png',
            price: '$129',
            viewImage: '',
            modelUrl: 'Clothes/LakersShorts/LakerShorts.obj',
            mtlUrl: 'Clothes/LakersShorts/LakerShorts.mtl'
        },{
            code:'I000030002',
            desc: 'Blue Jeans For Men<br/>Jeans<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000030002.png',
            price: '$129',
            viewImage: 'src/assets/images/mainpage/VirtualShopping4.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000030003',
            desc: 'Dark Jeans For Men<br/>Jeans<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000030003.png',
            price: '$129',
            viewImage: 'src/assets/images/mainpage/VirtualShopping6.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000030004',
            desc: 'Fashionable Sports Pants<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000030004.png',
            price: '$109',
            viewImage: 'src/assets/images/mainpage/VirtualShopping1.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000030005',
            desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000030005.png',
            price: '$219',
            viewImage: 'src/assets/images/mainpage/VirtualShopping4.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000030006',
            desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000030006.png',
            price: '$219',
            viewImage: 'src/assets/images/mainpage/VirtualShopping6.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000030007',
            desc: 'Untold Broderie lace fit and flare dress<br/>Gowns<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000030007.png',
            price: '$219',
            viewImage: 'src/assets/images/mainpage/VirtualShopping6.PNG',
            modelUrl: '',
            mtlUrl: ''
        }],
        Shoes : [{
            code:'I000040000',
            desc: 'Nike Kobe XI<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000040000.png',
            price: '$142',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000040001',
            desc: 'Air Jordan XI<br/>Sports Wear<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000040001.png',
            price: '$168',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000040002',
            desc: 'Dr Martens Boots Black<br/>Boots<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000040002.png',
            price: '$156',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000040003',
            desc: 'Addidas Stan Smith White Sneakers<br/>Sneakers<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000040003.png',
            price: '$109',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000040004',
            desc: 'Christian Louboutin High Heels<br/>High Heels<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000040004.png',
            price: '$859',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000040005',
            desc: 'Valentino High Heels<br/>High Heels<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000040005.png',
            price: '$726',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        }],
        Glasses : [{
            code:'I000050000',
            desc: 'Gucci Fashion Glasses<br/>Regular Glasses<br/>Gray<br/>Composite Plastic<br/>With Prescription',
            care: 'Twice clean per month',
            img : 'src/assets/images/clothing/I000050000.png',
            price: '$559',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000050001',
            desc: 'Gucci Fashion Glasses<br/>Regular Glasses<br/>Gray<br/>Composite Plastic<br/>With Prescription',
            care: 'Twice clean per month',
            img : 'src/assets/images/clothing/I000050001.png',
            price: '$324',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },],
        Hats : [{
            code:'I000060000',
            desc: 'Black baseball hat<br/>Baseball Cap<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000060000.png',
            price: '$59',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I000060001',
            desc: 'Elegent hat for women<br/>Hat<br/>Crew Neck<br/>Shell/lining/net: 100% polyester<br/>Professional launder recommended',
            care: 'Professional launder recommended',
            img : 'src/assets/images/clothing/I000060001.png',
            price: '$49',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },],
    },

    Hairstyles: {
        Short: [{
            code:'I010000000',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010000000.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u47.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I010000001',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010000001.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u47.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I010000002',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010000002.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I010000003',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010000003.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I010000004',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010000004.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },],
        Mid: [{
            code:'I010010000',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010010000.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u47.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I010010001',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010010001.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u47.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I010010002',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010010002.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u47.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I010010003',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010010003.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I010010004',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010010004.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },],
        Long: [{
            code:'I010020000',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010020000.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I010020001',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010020001.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I010020002',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010020002.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u46.PNG',
            modelUrl: '',
            mtlUrl: ''
        },{
            code:'I010020003',
            desc: '(1)Side: Buzz 2cm<br/>(2)Top: 10cm, Messy texture, Gel applied<br/>(3)Back: Slide down<br/>(4)Time: 30min',
            care: 'Wash at least once/day',
            img : 'src/assets/images/hairstyles/I010020003.png',
            price: '',
            viewImage: 'src/assets/images/mainpage/3d_view_u47.PNG',
            modelUrl: '',
            mtlUrl: ''
        },]
    },

    Fit: [

    ],

    Scenes: [

    ],

    Worlds: [

    ]
}


export default TabsContentPanel;
