"use strict";(self.webpackChunkiobroker_vis_2_shelly=self.webpackChunkiobroker_vis_2_shelly||[]).push([["src_bootstrap_js-webpack_sharing_consume_default_mui_material_styles_mui_material_styles"],{47879:(e,t,s)=>{s.r(t);var a=s(769),i=s(28437),o=s.n(i),n=s(32719),c=s(39609),l=s(37449),d=s(67085),r=s(59797),p=(s(86820),s(70579));class m extends i.Component{constructor(e){super(e),this.el=o().createRef(null),this.components={},e.socket.subscribeState(Object.values(e.dataPoint),((e,t)=>{this.stateChange(e,t)}))}async stateChange(e,t){if(this.props.state[e]=t,"undefined"===typeof this.props.typeConfig.update)return!1;let s;if(Object.entries(this.props.dataPoint).forEach((t=>{let[a,i]=t;i===e&&(s=a)})),"undefined"===typeof this.props.typeConfig.update[s])return!1;const a="undefined"!==typeof this.props.typeConfig.update[s].viewPoint?this.props.typeConfig.update[s].viewPoint:s;if("undefined"===typeof this.components[a])return!1;if("function"===typeof this.props.typeConfig.update[s].updateValue){const e="undefined"===typeof t||null===t?"":t.val;this.props.typeConfig.update[s].updateValue({dom:this.components[a].current,newVal:e,config:this.props.typeConfig.update[s],socket:this.props.socket,dataPoint:this.props.dataPoint,state:this.props.state})}if("function"===typeof this.props.typeConfig.update[s].updateAck){const e="undefined"===typeof t||null===t?"":t.ack;this.props.typeConfig.update[s].updateAck({dom:this.components[s].current,newAck:e,config:this.props.typeConfig.update[s],socket:this.props.socket,dataPoint:this.props.dataPoint,state:this.props.state})}return!0}async propertiesUpdate(){"undefined"!==typeof this.props.state&&null!==this.props.state&&Object.values(this.props.dataPoint).forEach((e=>{"undefined"!==typeof this.props.state[e]&&this.stateChange(e,this.props.state[e])}))}async componentDidMount(){await this.propertiesUpdate()}render(){return"undefined"===typeof this.props.typeConfig.action&&(this.props.typeConfig.action={}),this.components.icon=o().createRef(null),this.components.name=o().createRef(null),(0,p.jsxs)("div",{id:this.props.deviceDomID,className:"vis2_shelly_DeviceBody",title:this.props.stateID,ref:this.el,children:[(0,p.jsx)("span",{name:"status",children:(0,p.jsx)("span",{children:(0,p.jsx)("span",{className:"connectionState connectionStateOnline"})})}),(0,p.jsx)("span",{name:"icon",ref:this.components.icon}),(0,p.jsx)("span",{name:"name",ref:this.components.name,children:this.props.id}),(0,p.jsx)("span",{name:"info",children:Object.entries(this.props.typeConfig.view.info).map((e=>{let[t,s]=e;return this.components[s.name]=o().createRef(null),(0,p.jsx)("span",{name:s.name,className:s.class,ref:this.components[s.name],children:s.html})}))}),(0,p.jsxs)("span",{name:"action",children:[Object.entries(this.props.typeConfig.view.action).map((e=>{let[t,s]=e;return this.components[s.name]=o().createRef(null),(0,p.jsx)("span",{name:s.name,className:s.class,style:s.style,ref:this.components[s.name],children:s.html})})),Object.values(this.props.typeConfig.action).map((e=>(0,p.jsx)("div",{className:"actionButton",style:{top:e.y,left:e.x,height:e.h,width:e.w},onClick:t=>{e.click({dom:this.el.current,dataPoint:this.props.dataPoint,options:e,socket:this.props.socket,state:this.props.state,event:t})}})))]})]})}}const u=(0,n.withStyles)((e=>({})))(m),h=e=>{e.dom.classList.remove("motionyes"),e.dom.classList.remove("motionno"),!0===e.newVal?(e.dom.classList.add("motionyes"),e.dom.innerHTML="Ja"):(e.dom.classList.add("motionno"),e.dom.innerHTML="Nein")},v=e=>{e.dom.innerHTML=e.newVal},y=e=>{e.dom.innerHTML="".concat(e.newVal," ").concat(e.config.unit)},g=e=>{e.dom.innerHTML="".concat(e.newVal," ").concat(e.config.unit)},w=e=>{let t=null,s=null;Object.entries(e.state).map((a=>{let[i,o]=a;"undefined"!==typeof e.dataPoint.externalPower&&e.dataPoint.externalPower===i?t=o:"undefined"!==typeof e.dataPoint.batteryPercent&&e.dataPoint.batteryPercent===i&&(s=o)})),e.dom.classList.remove("externalPower"),e.dom.classList.remove("battery"),null!==t&&"object"===typeof t&&!0===t.val?(e.dom.classList.add("externalPower"),e.dom.innerHTML="Energie"):(e.dom.classList.add("battery"),e.dom.innerHTML="".concat(null===s||"object"!==typeof s?s:s.val," %"))},_=e=>{const t=e.dom.querySelector("[name='svgShellyTRVButton']");if(null===t)return!1;if(null===t.contentDocument)return!1;const s=t.contentDocument.firstChild;return null!==s&&(!0===e.newAck?s.classList.remove("animatedAction"):s.classList.add("animatedAction"),!0)},f=e=>{const t=e.dom.querySelector("[name='svgShellyButton']");if(t.hasAttribute("loadAck")||(t.addEventListener("load",(()=>{f(e)}),!0),t.setAttribute("loadAck","true")),null===t)return!1;if(null===t.contentDocument)return!1;const s=t.contentDocument.firstChild;return null!==s&&(!0===e.newAck?s.classList.remove("animatedAction"):s.classList.add("animatedAction"),!0)},D=e=>{const t=e.dom.querySelector("[name='svgShellyButton']");if(t.hasAttribute("loadValue")||(t.addEventListener("load",(()=>{D(e)}),!0),t.setAttribute("loadValue","true")),null!==t){if(null===t.contentDocument)return;const s=t.contentDocument.firstChild;if(null===s)return;e.newVal?s.classList.add("active"):s.classList.remove("active")}},x=e=>{const t=e.dataPoint[e.options.dataPoint];if("undefined"===typeof t)return!1;if("undefined"===typeof e.state[t])return!1;let s="undefined"===typeof e.state[t]||null===e.state[t]?e.options.minValue:e.state[t].val;return s+=e.options.step,s<e.options.minValue&&(s=e.options.minValue),s>e.options.maxValue&&(s=e.options.maxValue),e.socket.setState(t,s,!1),!0},b=e=>{const t=e.dataPoint[e.options.dataPoint];if("undefined"===typeof t)return!1;if("undefined"===typeof e.state[t])return!1;const s=null!==e.state[t]&&!0!==e.state[t].val;return e.socket.setState(t,s,!1),!0},P=(e,t,s,a)=>{let i={};const o=(0,p.jsx)("object",{name:"svgShellyButton",type:"image/svg+xml",data:"/vis-2/widgets/vis-2-shelly/vis2/img/shellySwitchButton.svg",title:"Switch"}),n=(0,p.jsx)("object",{name:"svgShellyTRVButton",type:"image/svg+xml",data:"/vis-2/widgets/vis-2-shelly/vis2/img/shellyTRVButton.svg",style:{margin:"5px",width:"125px"},title:"TRVSwitch"});switch(e){case"SHDM-2":i={domID:t,update:{power:{name:"power",unit:"W",updateValue:y},brightness:{name:"brightness",unit:"%",updateValue:g},name:{name:"name",updateValue:v},oname:{name:"name",updateValue:v},switch:{name:"switch",updateAck:f,updateValue:D}},view:{info:{power:{name:"power",class:"icon",html:""},brightness:{name:"brightness",class:"icon",html:""}},action:{switch:{name:"switch",style:{width:"70px"},class:"",html:o}}},action:{switch:{name:"switch",x:"0px",y:"0px",w:"100%",h:"100%",dataPoint:"switch",click:b}},dataPoint:{0:{power:"".concat(s.stateID,".lights.Power"),switch:"".concat(s.stateID,".lights.Switch"),brightness:"".concat(s.stateID,".lights.brightness"),name:"".concat(a,".0.name"),room:"".concat(a,".0.room"),deviceID:s.id}}};break;case"SHPLG-S":i={domID:t,update:{power:{name:"power",unit:"W",updateValue:y},name:{name:"name",updateValue:v},oname:{name:"name",updateValue:v},switch:{name:"switch",updateAck:f,updateValue:D}},view:{info:{power:{name:"power",class:"icon",html:""}},action:{switch:{name:"switch",style:{width:"70px"},class:"",html:o}}},action:{switch:{name:"switch",x:"0px",y:"0px",w:"100%",h:"100%",dataPoint:"switch",click:b}},dataPoint:{0:{power:"".concat(s.stateID,".Relay0.Power"),switch:"".concat(s.stateID,".Relay0.Switch"),name:"".concat(a,".0.name"),room:"".concat(a,".0.room"),deviceID:s.id}}};break;case"shellyplus1pm":case"shellyplusplugs":i={domID:t,update:{power:{name:"power",unit:"W",updateValue:y},voltage:{name:"voltage",unit:"V",updateValue:y},name:{name:"name",updateValue:v},oname:{name:"name",updateValue:v},switch:{name:"switch",updateAck:f,updateValue:D}},view:{info:{power:{name:"power",class:"icon",html:""},voltage:{name:"voltage",class:"icon",html:""}},action:{switch:{name:"switch",style:{width:"70px"},class:"",html:o}}},action:{switch:{name:"switch",x:"0px",y:"0px",w:"100%",h:"100%",dataPoint:"switch",click:b}},dataPoint:{0:{power:"".concat(s.stateID,".Relay0.Power"),switch:"".concat(s.stateID,".Relay0.Switch"),voltage:"".concat(s.stateID,".Relay0.Voltage"),name:"".concat(a,".0.name"),room:"".concat(a,".0.room"),deviceID:s.id}}};break;case"shellyplus2pm":i={domID:t,update:{power:{name:"power",unit:"W",updateValue:y},voltage:{name:"voltage",unit:"V",updateValue:y},name:{name:"name",updateValue:v},oname:{name:"name",updateValue:v},switch:{name:"switch",updateAck:f,updateValue:D}},view:{info:{power:{name:"power",class:"icon",html:""},voltage:{name:"voltage",class:"icon",html:""}},action:{switch:{name:"switch",style:{width:"70px"},class:"",html:o}}},action:{switch:{name:"switch",x:"0px",y:"0px",w:"100%",h:"100%",dataPoint:"switch",click:b}},dataPoint:{0:{power:"".concat(s.stateID,".Relay0.Power"),switch:"".concat(s.stateID,".Relay0.Switch"),voltage:"".concat(s.stateID,".Relay0.Voltage"),name:"".concat(a,".0.name"),room:"".concat(a,".0.room"),deviceID:s.id},1:{power:"".concat(s.stateID,".Relay1.Power"),switch:"".concat(s.stateID,".Relay1.Switch"),voltage:"".concat(s.stateID,".Relay1.Voltage"),name:"".concat(a,".1.name"),room:"".concat(a,".1.room"),deviceID:s.id}}};break;case"shellyplusht":i={domID:t,update:{humidity:{name:"humidity",unit:"%",updateValue:y},batteryPercent:{name:"devicePower",viewPoint:"devicePower",updateValue:w},externalPower:{name:"devicePower",viewPoint:"devicePower",updateValue:w},temperature:{name:"temperature",unit:"\xb0C",updateValue:y},name:{name:"name",updateValue:v},oname:{name:"name",updateValue:v}},view:{info:{humidity:{name:"humidity",class:"icon",html:""},externalPower:{name:"devicePower",class:"icon",html:""}},action:{temperature:{name:"temperature",style:{width:"70px"},class:"temperature",html:""}}},dataPoint:{0:{temperature:"".concat(s.stateID,".Temperature0.Celsius"),humidity:"".concat(s.stateID,".Humidity0.Relative"),externalPower:"".concat(s.stateID,".DevicePower0.ExternalPower"),batteryPercent:"".concat(s.stateID,".DevicePower0.BatteryPercent"),name:"".concat(a,".0.name"),room:"".concat(a,".0.room"),deviceID:s.id}}};break;case"SHTRV-01":i={domID:t,update:{valvePosition:{name:"valvePosition",unit:"%",updateValue:y},batteryPercent:{name:"devicePower",viewPoint:"devicePower",updateValue:w},externalPower:{name:"devicePower",viewPoint:"devicePower",updateValue:w},temperature:{name:"temperature",unit:"\xb0C",updateValue:y},name:{name:"name",updateValue:v},oname:{name:"name",updateValue:v},temperatureTarget:{name:"temperatureTarget",unit:"\xb0C",updateAck:_,updateValue:y}},view:{info:{temperature:{name:"temperature",class:"icon",html:""},valvePosition:{name:"valvePosition",class:"icon",html:""},devicePower:{name:"devicePower",class:"icon",html:""}},action:{temperatureTarget:{name:"temperatureTarget",style:{},class:"TRVValue",html:""},buttons:{name:"buttons",style:{width:"135px"},class:"TRVButton",html:n}}},action:{down:{name:"buttons",x:"5px",y:"5px",w:"45px",h:"50px",minValue:15,maxValue:30,step:-.5,dataPoint:"temperatureTarget",click:x},up:{name:"buttons",x:"85px",y:"5px",w:"45px",h:"50px",minValue:15,maxValue:30,step:.5,dataPoint:"temperatureTarget",onClick:{find:"[name='svgShellyTRVButton']",contentDocument:!0,className:"animatedAction"},click:x}},dataPoint:{0:{temperature:"".concat(s.stateID,".tmp.temperatureC"),temperatureTarget:"".concat(s.stateID,".tmp.temperatureTargetC"),valvePosition:"".concat(s.stateID,".tmp.valvePosition"),externalPower:"".concat(s.stateID,".bat.charger"),batteryPercent:"".concat(s.stateID,".bat.value"),name:"".concat(a,".0.name"),room:"".concat(a,".0.room"),deviceID:s.id}}};break;case"SHMOS-02":i={domID:t,update:{lux:{name:"lux",unit:"Lux",updateValue:y},batteryPercent:{name:"devicePower",unit:"%",viewPoint:"devicePower",updateValue:w},motion:{name:"motion",updateValue:h},temperature:{name:"temperature",unit:"\xb0C",updateValue:y},name:{name:"name",updateValue:v},oname:{name:"name",updateValue:v}},view:{info:{temperature:{name:"temperature",class:"icon",html:""},batteryPercent:{name:"devicePower",class:"icon",html:""},lux:{name:"lux",class:"icon",html:""}},action:{motion:{name:"motion",style:{width:"70px"},class:"",html:""}}},dataPoint:{0:{temperature:"".concat(s.stateID,".sensor.temperatureC"),motion:"".concat(s.stateID,".sensor.motion"),lux:"".concat(s.stateID,".sensor.lux"),batteryPercent:"".concat(s.stateID,".sensor.battery"),name:"".concat(a,".0.name"),room:"".concat(a,".0.room"),deviceID:s.id}}}}return i};class I extends(window.visRxWidget||r.VisRxWidget){constructor(e){super(e),this.state.allDevices={},console.debug("THIS"),console.debug(this)}static getWidgetInfo(){return{id:"tplAllDevicesWidget",visSet:"vis-2-shelly",visSetLabel:"vis_2_widgets_shelly",visSetColor:"#cf00ff",visName:"AllDevices",visAttrs:[{name:"common",fields:[{name:"display",label:"vis_2_widgets_shelly_display",type:"select",options:[{value:"block",label:"block"},{value:"flex",label:"flex"}],noTranslation:!0,default:"block"}]}],visPrev:"widgets/vis-2-shelly/vis2/img/editor/allDevices.png"}}async propertiesUpdate(){}async componentDidMount(){super.componentDidMount(),this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.ids"],((e,t)=>{this.state.allDevices=JSON.parse(t.val),this.forceUpdate()})),await this.propertiesUpdate()}getWidgetInfo(){return I.getWidgetInfo()}async onRxDataChanged(){console.debug("onRxDataChanged"),await this.propertiesUpdate()}async onRxStyleChanged(){}async onStateUpdated(e,t){}renderWidgetBody(e){return super.renderWidgetBody(e),console.debug(this.props.context.socket),(0,p.jsx)(d.Card,{style:{width:"100%",height:"100%"},children:(0,p.jsx)(d.CardContent,{children:Object.values(this.state.allDevices).map((e=>{this.vsID="vis-2-shelly.".concat(e.instance,".devices.").concat(e.id),this.domID=e.id.replaceAll("#","");const t=P(e.type,this.domID,{stateID:e.stateId,type:e.type,id:e.id},this.vsID);if("undefined"!==typeof t.dataPoint&&"undefined"!==typeof t.dataPoint[e.relay]){const s=t.domID+e.relay;return(0,p.jsx)(u,{stateID:e.stateId,type:e.type,id:e.id,typeConfig:t,deviceDomID:s,relay:e.relay,state:this.state,dataPoint:t.dataPoint[e.relay],socket:this.props.context.socket,widID:this.props.id})}}))})})}}const k=I;class S extends(window.visRxWidget||r.VisRxWidget){constructor(e){super(e),this.state.allDevices={},this.state.roomDevices={},console.debug("THIS ROOM"),console.debug(this)}static getWidgetInfo(){return{id:"tplByRoomDevicesWidget",visSet:"vis-2-shelly",visSetLabel:"vis_2_widgets_shelly",visSetColor:"#cf00ff",visName:"ByRoomDevices",visAttrs:[{name:"common",fields:[{name:"display",label:"vis_2_widgets_shelly_display",type:"select",options:[{value:"block",label:"block"},{value:"flex",label:"flex"}],noTranslation:!0,default:"block"},{name:"rooms",label:"vis_2_widgets_shelly_rooms",type:"custom",component:(e,t,s,a,i,o,n)=>{const c="undefined"!==typeof a.context.socket.states.roomList?a.context.socket.states.roomList:{};return(0,p.jsxs)("select",{name:"ShellyByRoom_RoomSelect",style:{width:"100%"},value:t[e.name],onChange:i=>{s({[e.name]:i.target.value}),console.debug(e),console.debug(t),console.debug(s),console.debug(a)},children:[(0,p.jsx)("option",{value:"",children:"-- Select room --"}),Object.entries(c).map((e=>{let[t,s]=e;return(0,p.jsx)("option",{value:t,children:s})}))]})}}]}],visPrev:"widgets/vis-2-shelly/vis2/img/editor/allDevices.png"}}async propertiesUpdate(){this.updateRoomDevices()}async updateRoomDevices(){this.state.roomDevices={},"undefined"!==typeof this.state.data.rooms&&(Object.entries(this.state.allDevices).forEach((e=>{let[t,s]=e;s.room===this.state.data.rooms&&(this.state.roomDevices[t]=s)})),this.forceUpdate())}async componentDidMount(){super.componentDidMount(),"undefined"===typeof this.props.context.socket.states.roomList&&this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.roomIds"],((e,t)=>{this.state.rooms=JSON.parse(t.val),this.props.context.socket.states.roomList=this.state.rooms})),this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.ids"],((e,t)=>{this.state.allDevices=JSON.parse(t.val),this.updateRoomDevices(),this.forceUpdate()})),await this.propertiesUpdate()}getWidgetInfo(){return S.getWidgetInfo()}async onRxDataChanged(){console.debug("onRxDataChanged"),await this.propertiesUpdate()}async onRxStyleChanged(){}async onStateUpdated(e,t){}renderWidgetBody(e){return super.renderWidgetBody(e),console.debug("room devices"),console.debug(this.state.roomDevices),(0,p.jsx)(d.Card,{style:{width:"100%",height:"100%"},children:(0,p.jsx)(d.CardContent,{children:Object.values(this.state.roomDevices).map((e=>{this.vsID="vis-2-shelly.".concat(e.instance,".devices.").concat(e.id),this.domID=e.id.replaceAll("#","");const t=P(e.type,this.domID,{stateID:e.stateId,type:e.type,id:e.id},this.vsID);if("undefined"!==typeof t.dataPoint&&"undefined"!==typeof t.dataPoint[e.relay]){const s=t.domID+e.relay;return(0,p.jsx)(u,{stateID:e.stateId,type:e.type,id:e.id,typeConfig:t,deviceDomID:s,relay:e.relay,state:this.state,dataPoint:t.dataPoint[e.relay],socket:this.props.context.socket,widID:this.props.id})}}))})})}}const V=S;class C extends(window.visRxWidget||r.VisRxWidget){constructor(e){super(e),this.state.allDevices={},this.state.deviceList={},console.debug("THIS DEVICES"),console.debug(this)}static getWidgetInfo(){return{id:"tplCustomDeviceListWidget",visSet:"vis-2-shelly",visSetLabel:"vis_2_widgets_shelly",visSetColor:"#cf00ff",visName:"CustomDeviceList",visAttrs:[{name:"common",fields:[{name:"display",label:"vis_2_widgets_shelly_display",type:"select",options:[{value:"block",label:"block"},{value:"flex",label:"flex"}],noTranslation:!0,default:"block"},{name:"count",type:"number",default:1,label:"vis_2_widgets_shelly_device_count",onChange:(e,t,s)=>s(t)}]},{name:"devices",label:"vis_2_widgets_shelly_group_devices",indexFrom:1,indexTo:"count",fields:[{name:"device",label:"vis_2_widgets_shelly_device",type:"custom",component:(e,t,s,a,i,o,n)=>{const c="undefined"!==typeof a.context.socket.states.deviceList?a.context.socket.states.deviceList:{};return(0,p.jsxs)("select",{name:"ShellyDeviceList_DeviceSelect",style:{width:"100%"},value:t[e.name],onChange:t=>{s({[e.name]:t.target.value})},children:[(0,p.jsx)("option",{value:"",children:"-- Select device --"}),Object.entries(c).map((e=>{let[t,s]=e;return(0,p.jsx)("option",{value:t,children:null!==s.name&&s.name.length>0?s.name:s.id})}))]})}}]}],visPrev:"widgets/vis-2-shelly/vis2/img/editor/allDevices.png"}}async propertiesUpdate(){this.updateDeviceList()}async updateDeviceList(){this.state.deviceList={};for(let e=1;e<=this.state.data.count;e++)"undefined"!==typeof this.state.data["device".concat(e)]&&"undefined"!==typeof this.state.allDevices[this.state.data["device".concat(e)]]&&(this.state.deviceList[e]=this.state.allDevices[this.state.data["device".concat(e)]]);this.forceUpdate()}async componentDidMount(){super.componentDidMount(),this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.ids"],((e,t)=>{this.state.allDevices=JSON.parse(t.val),this.props.context.socket.states.deviceList=this.state.allDevices,this.updateDeviceList(),this.forceUpdate()})),await this.propertiesUpdate()}getWidgetInfo(){return C.getWidgetInfo()}async onRxDataChanged(){console.debug("onRxDataChanged"),await this.propertiesUpdate()}async onRxStyleChanged(){}async onStateUpdated(e,t){}renderWidgetBody(e){return super.renderWidgetBody(e),(0,p.jsx)(d.Card,{style:{width:"100%",height:"100%"},children:(0,p.jsx)(d.CardContent,{children:Object.values(this.state.deviceList).map((e=>{this.vsID="vis-2-shelly.".concat(e.instance,".devices.").concat(e.id),this.domID=e.id.replaceAll("#","");const t=P(e.type,this.domID,{stateID:e.stateId,type:e.type,id:e.id},this.vsID);if("undefined"!==typeof t.dataPoint&&"undefined"!==typeof t.dataPoint[e.relay]){const s=t.domID+e.relay;return(0,p.jsx)(u,{stateID:e.stateId,type:e.type,id:e.id,typeConfig:t,deviceDomID:s,relay:e.relay,state:this.state,dataPoint:t.dataPoint[e.relay],socket:this.props.context.socket,widID:this.props.id})}}))})})}}const j=C,R={en:s(75553),de:s(46477),ru:s(63715),pt:s(74606),nl:s(86164),fr:s(74554),it:s(66851),es:s(72706),pl:s(23638),"zh-cn":s(80222)};class L extends c.A{constructor(e){super(e),this.onConnectionChanged=e=>{e&&this.socket.getSystemConfig().then((e=>this.setState({systemConfig:e})))},l.i18n.extendTranslations(R),this.socket.registerConnectionHandler(this.onConnectionChanged)}renderWidget(){const e={allDevices:k.getWidgetInfo(),roomDevices:V.getWidgetInfo(),customDeviceList:j.getWidgetInfo()};return(0,p.jsx)("div",{className:this.props.classes.app,children:(0,p.jsx)("div",{children:Object.keys(e).map((e=>(0,p.jsx)("div",{style:{display:"flex",alignItems:"center"},children:e},e)))})})}}const W=(0,n.withStyles)((e=>({app:{}})))(L);(0,a.A)(W)},46477:e=>{e.exports=JSON.parse('{"My Demo widget: ":"Mein Demo-Widget:","vis_2_widgets_template":"Widgets-Vorlage","vis_2_widgets_template_oid":"Objekt Identifikation","vis_2_widgets_template_private":"Privatgel\xe4nde","vis_2_widgets_template_type":"Typ"}')},75553:e=>{e.exports=JSON.parse('{"vis_2_widgets_shelly":"VIS-2 Shelly","AllDevices":"All Devices","vis_2_widgets_shelly_display":"Display type","vis_2_widgets_shelly_rooms":"Room","vis_2_widgets_shelly_device_count":"Count","vis_2_widgets_shelly_device":"Device","vis_2_widgets_shelly_group_devices":"Device"}')},72706:e=>{e.exports=JSON.parse('{"My Demo widget: ":"Mi widget de demostraci\xf3n:","vis_2_widgets_template":"Plantilla de widgets","vis_2_widgets_template_oid":"ID de objeto","vis_2_widgets_template_private":"Privado","vis_2_widgets_template_type":"Escribe"}')},74554:e=>{e.exports=JSON.parse('{"My Demo widget: ":"Widget Ma d\xe9mo\xa0:","vis_2_widgets_template":"Mod\xe8le de widget","vis_2_widgets_template_oid":"ID d\'objet","vis_2_widgets_template_private":"Priv\xe9","vis_2_widgets_template_type":"Taper"}')},66851:e=>{e.exports=JSON.parse('{"My Demo widget: ":"Il mio widget demo:","vis_2_widgets_template":"Modello di widget","vis_2_widgets_template_oid":"ID oggetto","vis_2_widgets_template_private":"Privato","vis_2_widgets_template_type":"Tipo"}')},86164:e=>{e.exports=JSON.parse('{"My Demo widget: ":"Mijn demo-widget:","vis_2_widgets_template":"Widgetsjabloon","vis_2_widgets_template_oid":"Object-ID","vis_2_widgets_template_private":"Privaat","vis_2_widgets_template_type":"Type"}')},23638:e=>{e.exports=JSON.parse('{"My Demo widget: ":"Wid\u017cet Moje demo:","vis_2_widgets_template":"Szablon wid\u017cet\xf3w","vis_2_widgets_template_oid":"Identyfikator obiektu","vis_2_widgets_template_private":"Prywatny","vis_2_widgets_template_type":"Rodzaj"}')},74606:e=>{e.exports=JSON.parse('{"My Demo widget: ":"Meu widget de demonstra\xe7\xe3o:","vis_2_widgets_template":"Modelo de widgets","vis_2_widgets_template_oid":"ID do objeto","vis_2_widgets_template_private":"Privado","vis_2_widgets_template_type":"Modelo"}')},63715:e=>{e.exports=JSON.parse('{"My Demo widget: ":"\u041c\u043e\u0439 \u0434\u0435\u043c\u043e\u043d\u0441\u0442\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u0432\u0438\u0434\u0436\u0435\u0442:","vis_2_widgets_template":"\u0428\u0430\u0431\u043b\u043e\u043d \u0432\u0438\u0434\u0436\u0435\u0442\u043e\u0432","vis_2_widgets_template_oid":"\u0418\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440 \u043e\u0431\u044a\u0435\u043a\u0442\u0430","vis_2_widgets_template_private":"\u0427\u0430\u0441\u0442\u043d\u044b\u0439","vis_2_widgets_template_type":"\u0422\u0438\u043f"}')},80222:e=>{e.exports=JSON.parse('{"My Demo widget: ":"\u6211\u7684\u6f14\u793a\u5c0f\u90e8\u4ef6\uff1a","vis_2_widgets_template":"\u5c0f\u90e8\u4ef6\u6a21\u677f","vis_2_widgets_template_oid":"\u5bf9\u8c61 ID","vis_2_widgets_template_private":"\u79c1\u4eba\u7684","vis_2_widgets_template_type":"\u7c7b\u578b"}')}}]);
//# sourceMappingURL=src_bootstrap_js-webpack_sharing_consume_default_mui_material_styles_mui_material_styles.dda70314.chunk.js.map