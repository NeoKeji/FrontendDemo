import React from 'react';
import ScrollBar from './ScrollBar.jsx';
import '../assets/style/tabPanel4face.less';

let basicDatas = [
  {
    type : 'Basic',
    options: [
      {
        name:'Gender',
        min:0,max:1,step:1
      },
      {
        name:'Age',
        min:0,max:100,step:1
      },
      {
        name:'Height',
        min:0,max:100,step:1
      },
      {
        name:'Weight',
        min:0,max:100,step:1
      }
    ]
  }
]

let menDatas = [{
  type : 'Tops',
  options : [
    {
      name:'NeckCircumference',
      min:0,max:100,step:1
    },
    {
      name:'ChestCircumference',
      min:0,max:100,step:1
    },
    {
      name:'WaistCircumference',
      min:0,max:100,step:1
    },
    {
      name:'HipCircumference',
      min:0,max:100,step:1
    },
    { name:'SeatCircumference',
      min:0,max:100,step:1
    },
    {
      name:'UpperArmCircumference',
      min:0,max:100,step:1
    },
    { name:'WristCircumference',
      min:0,max:100,step:1
    },
    {
      name:'ShoulderWidth',
      min:0,max:100,step:1
    },
    { name:'ArmLength',
      min:0,max:100,step:1
    },
    {
      name:'ShirtLength',
      min:0,max:100,step:1
    },
    {
      name:'JacketLength',
      min:0,max:100,step:1
    },
    {
      name:'SuitLength',
      min:0,max:100,step:1
    }
  ]
},{
  type : 'Bottom',
  options : [
    {
      name:'Hip Measurement',
      min:0,max:100,step:1
    },
    {
      name:'Seat Measurement',
      min:0,max:100,step:1
    },
    {
      name:'Thigh Circumference',
      min:0,max:100,step:1
    },
    {
      name:'Calf Circumference',
      min:0,max:100,step:1
    },
    {
      name:'Inseam',
      min:0,max:100,step:1
    },
    {
      name:'Outseam',
      min:0,max:100,step:1
    },
    {
      name:'Rise',
      min:0,max:100,step:1
    }
  ]
}];

let womenDatas =  [{
  type : 'Tops',
  options : [
    {
      name:'NeckCircumference',
      min:0,max:100,step:1
    },
    {
      name:'WaistCircumference',
      min:0,max:100,step:1
    },
    {
      name:'HipCircumference',
      min:0,max:100,step:1
    },
    {
      name:'SeatCircumference',
      min:0,max:100,step:1
    },
    {
      name:'UpperArmCircumference',
      min:0,max:100,step:1
    },
    {
      name:'WristCircumference',
      min:0,max:100,step:1
    },
    {
      name:'ShoulderWidth',
      min:0,max:100,step:1
    },
    {
      name:'ArmLength',
      min:0,max:100,step:1
    },
    {
      name:'ShirtLength',
      min:0,max:100,step:1
    },
    {
      name:'JacketLength',
      min:0,max:100,step:1
    },
    {
      name:'SuitLength',
      min:0,max:100,step:1
    },
    {
      name:'BreastPoint(肩膀到胸部最高点)',
      min:0,max:100,step:1
    },
    {
      name:'WaistPoint（肩膀到肋骨下沿）',
      min:0,max:100,step:1
    },
    {
      name:'BandSize(UnderBustCircumference)',
      min:0,max:100,step:1
    },
    {
      name:'CupSize(BustCircumference)',
      min:0,max:100,step:1
    }
  ]
},{
  type : 'Bottom',
  options : [
    {
      name:'HipMeasurement',
      min:0,max:100,step:1
    },
    {
      name:'SeatMeasurement',
      min:0,max:100,step:1
    },
    {
      name:'ThighCircumference',
      min:0,max:100,step:1
    },
    {
      name:'CalfCircumference',
      min:0,max:100,step:1
    },
    {
      name:'Inseam',
      min:0,max:100,step:1
    },
    {
      name:'Outseam',
      min:0,max:100,step:1
    },
    {
      name:'Rise',
      min:0,max:100,step:1
    },
    {
      name:'SkirtLength',
      min:0,max:100,step:1
    },
    {
      name:'DressLength',
      min:0,max:100,step:1
    },
    {
      name:'BackLength',
      min:0,max:100,step:1
    }
  ]
}];


class BodyGenerationPanel extends React.Component  {
  constructor(props, context){
    super(props, context);
    this.state = {
      content:'',
      showMenOptions: false,
      displayIndex:0,
      previewImages:{
        default:'src/assets/images/mainpage/u168.PNG',
        front:'',
        left:'',
        right:''
      },
      /*basicDatas:[],
      menDatas:[],
      womenDatas:[],*/
      basicDatas,menDatas,womenDatas
    }
  }

  componentWillMount (){
    this.setState({
      //basicDatas,menDatas,womenDatas
    })

    //console.log(this.state);
  }


  tabChanged(tabItem, index){
    /*let datas = mockData[tabItem.val] || [];
    this.setState({
      datas
    });
    this.state.displayIndex = index;*/
    this.forceUpdate();
  }

  subTabChanged(tabItem, subTabItem){
    /*let datas = mockData[tabItem.val];
    datas = datas?(datas[subTabItem.val] || []) :[];
    this.setState({
      datas
    });*/
  }

  finish(){
    this.context.router.push('/')
  }

  onScrollValueChanged(name, value){
    //console.log(name+'--'+value);
    let showMen;
    if(name==='Gender' && value===1){
      showMen = true;
    }else{
      showMen = false;
    }
    this.setState({
      showMenOptions:showMen
    });
    this.forceUpdate();
  }



  render() {
    return (
      <div>
        {
          this.state.basicDatas.map((item,i)=>{
            return <div key={item.type} className='scrollItemsWrap'>
              <h2>{item.type}</h2>
              {
                item.options.map((data,i)=>{
                  return <div key={data.name} className='scrollItem'>
                    <h3>{data.name}</h3>
                    <ScrollBar name={data.name} min={data.min} max={data.max} step={data.step} onScrollValueChanged={(name,val)=>{this.onScrollValueChanged(name,val)}}/>
                  </div>
                })
              }
            </div>
          })
        }

        <div className='menOptsWrap' style={{display:this.state.showMenOptions?'block':'none'}}>
        {
          this.state.menDatas.map((item,i)=>{
            return <div key={item.type} className='scrollItemsWrap'>
              <h2>{item.type}</h2>
              {
                item.options.map((data,i)=>{
                  return <div key={data.name} className='scrollItem'>
                    <h3>{data.name}</h3>
                    <ScrollBar name={data.name} min={data.min} max={data.max} step={data.step}/>
                  </div>
                })
              }
            </div>
          })
        }
        </div>

        <div className='womenOptsWrap' style={{display:!this.state.showMenOptions?'block':'none'}}>
        {
          this.state.womenDatas.map((item,i)=>{
            return <div key={item.type} className='scrollItemsWrap'>
              <h2>{item.type}</h2>
              {
                item.options.map((data,i)=>{
                  return <div key={data.name} className='scrollItem'>
                    <h3>{data.name}</h3>
                    <ScrollBar name={data.name} min={data.min} max={data.max} step={data.step}/>
                  </div>
                })
              }
            </div>
          })
        }
        </div>
        <button onClick={()=>{this.finish()}}>完成</button>
      </div>
    );
  }
}
BodyGenerationPanel.contextTypes = {
    router: React.PropTypes.object
}
/*TabsContentPanel.defaultProps  = {
    content : <div>我是控制面板ss</div>,
};*/

export default BodyGenerationPanel;
