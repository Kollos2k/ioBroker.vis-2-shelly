"use strict";(self.webpackChunkiobroker_vis_2_shelly=self.webpackChunkiobroker_vis_2_shelly||[]).push([["src_components_Device_jsx-src_components_DeviceConfig_jsx"],{60318:(e,t,a)=>{a.d(t,{A:()=>m});var n=a(28437),o=a.n(n),s=a(32719),i=a(37449),c=a(67085),r=a(70579);class l extends o().Component{constructor(e){super(e),this.state={currentTab:this.props.typeConfig.dialog.tabs[0].name}}async propertiesUpdate(){}async componentDidMount(){await this.propertiesUpdate()}hideDeviceOptions(){this.props.parentThis.hideDeviceOptions()}render(){return(0,r.jsxs)("div",{className:this.props.classes.dialog,children:[(0,r.jsxs)("div",{id:"responsive-dialog-title",className:this.props.classes.dialogHead,children:[(0,r.jsx)(c.Button,{onClick:()=>{this.hideDeviceOptions()},className:this.props.classes.closeButton,autoFocus:!0,children:"\u2190"}),(0,r.jsx)("span",{className:this.props.classes.titleLabel,onClick:()=>{this.hideDeviceOptions()},children:"object"===typeof this.props.name?this.props.name.val:""})]}),(0,r.jsx)(c.Tabs,{orientation:"vertical",indicatorColor:"secondary",value:this.state.currentTab||this.props.typeConfig.dialog.tabs[0].name,onChange:(e,t)=>{this.setState({currentTab:t})},className:this.props.classes.tabs,children:this.props.typeConfig.dialog.tabs.map(((e,t)=>(0,r.jsx)(c.Tab,{value:e.name,label:i.I18n.t(e.title),className:[this.props.classes.tab,0===t?this.props.classes.tabFirst:{},t===this.props.typeConfig.dialog.tabs.length-1?this.props.classes.tabLast:{}],title:e.tooltip?i.I18n.t(e.tooltip):void 0},e.name)))}),this.props.typeConfig.dialog.tabs.map(((e,t)=>{if(this.state.currentTab){if(this.state.currentTab!==e.name)return null}else if(0!==t)return null;return(0,r.jsxs)("div",{value:e.name,className:this.props.classes.tabContent,children:[(0,r.jsx)("div",{className:this.props.classes.tabContentTitle,children:e.content.title}),"function"===typeof e.content.body?e.content.body({dataPoint:this.props.dataPoint,state:this.props.state,socket:this.props.socket,maxVisibleHeight:window.innerHeight-130,typeConfig:this.props.typeConfig}):e.content.body]},e.name)}))]})}}const p=(0,s.withStyles)((e=>({dialog:{position:"fixed",backgroundColor:"gray",color:"aliceblue",width:"100%",maxWidth:"500px",height:"calc(100dvh - 20px)",zIndex:"2",top:"0px",marginTop:"5px",padding:"5px",borderTopLeftRadius:"15px",borderTopRightRadius:"15px",display:"grid",gridTemplateAreas:"'head head' 'tabs content'",gridTemplateColumns:"50px auto",gridTemplateRows:"50px auto",gridGap:"0"},dialogHead:{gridArea:"head",display:"grid",gridTemplateAreas:"'back title'",gridTemplateColumns:"100px auto"},tabs:{gridArea:"tabs"},tab:{color:"white",backgroundColor:"#222",border:"1px solid gray",minWidth:"45px"},tabFirst:{borderTopLeftRadius:"10px"},tabLast:{borderBottomLeftRadius:"10px"},tabContent:{gridArea:"content",padding:"10px",color:"white",backgroundColor:"#222"},tabContentTitle:{verticalAlign:"center"},closeButton:{color:"white",fontSize:"35pt",paddingTop:"0px",height:"40px","&:hover":{border:"1px solid darkgray"}},titleLabel:{marginLeft:"10px",fontWeight:"bold"}})))(l);class d extends o().Component{constructor(e){super(e),this.el=o().createRef(null),this.components={},this.state={showDeviceDialog:!1,hasDeviceDialog:"object"===typeof this.props.typeConfig.dialog},e.socket.subscribeState(Object.values(e.dataPoint),((e,t)=>{this.stateChange(e,t)}))}async stateChange(e,t){if(this.props.state[e]=t,"undefined"===typeof this.props.typeConfig.update)return!1;let a;if(Object.entries(this.props.dataPoint).forEach((t=>{let[n,o]=t;o===e&&(a=n)})),"undefined"===typeof this.props.typeConfig.update[a])return!1;const n="undefined"!==typeof this.props.typeConfig.update[a].viewPoint?this.props.typeConfig.update[a].viewPoint:a;if("undefined"===typeof this.components[n])return!1;if("function"===typeof this.props.typeConfig.update[a].updateValue){const e="undefined"===typeof t||null===t?"":t.val;this.props.typeConfig.update[a].updateValue({dom:this.components[n].current,newVal:e,config:this.props.typeConfig.update[a],socket:this.props.socket,dataPoint:this.props.dataPoint,state:this.props.state})}if("function"===typeof this.props.typeConfig.update[a].updateAck){const e="undefined"===typeof t||null===t?"":t.ack;this.props.typeConfig.update[a].updateAck({dom:this.components[a].current,newAck:e,config:this.props.typeConfig.update[a],socket:this.props.socket,dataPoint:this.props.dataPoint,state:this.props.state})}return!0}async propertiesUpdate(){"undefined"!==typeof this.props.state&&null!==this.props.state&&Object.values(this.props.dataPoint).forEach((e=>{"undefined"!==typeof this.props.state[e]&&this.stateChange(e,this.props.state[e])}))}async componentDidMount(){await this.propertiesUpdate()}showDeviceOptions(){this.state.hasDeviceDialog&&this.setState({showDeviceDialog:!this.state.showDeviceDialog},(()=>{}))}hideDeviceOptions(){this.setState({showDeviceDialog:!1},(()=>{}))}render(){return"undefined"===typeof this.props.typeConfig.action&&(this.props.typeConfig.action={}),this.components.icon=o().createRef(null),this.components.name=o().createRef(null),(0,r.jsxs)("div",{id:this.props.deviceDomID,className:"vis2_shelly_DeviceBody",title:this.props.stateID,ref:this.el,children:[(0,r.jsx)("span",{name:"status",children:(0,r.jsx)("span",{children:(0,r.jsx)("span",{className:"connectionState connectionStateOnline"})})}),(0,r.jsx)("span",{name:"icon",ref:this.components.icon}),(0,r.jsx)("span",{name:"name",ref:this.components.name,onClick:()=>{this.showDeviceOptions()},className:this.state.hasDeviceDialog?this.props.classes.showDialogButton:{},children:this.props.id}),(0,r.jsx)("span",{name:"info",className:this.state.hasDeviceDialog?this.props.classes.showDialogButton:{},onClick:()=>{this.showDeviceOptions()},children:Object.entries(this.props.typeConfig.view.info).map((e=>{let[t,a]=e;return this.components[a.name]=o().createRef(null),(0,r.jsx)("span",{name:a.name,className:a.class,ref:this.components[a.name],children:a.html})}))}),(0,r.jsxs)("span",{name:"action",children:[Object.entries(this.props.typeConfig.view.action).map((e=>{let[t,a]=e;return this.components[a.name]=o().createRef(null),(0,r.jsx)("span",{name:a.name,className:a.class,style:a.style,ref:this.components[a.name],children:a.html})})),Object.values(this.props.typeConfig.action).map((e=>(0,r.jsx)("div",{className:"actionButton",style:{top:e.y,left:e.x,height:e.h,width:e.w},onClick:t=>{e.click({dom:this.el.current,dataPoint:this.props.dataPoint,options:e,socket:this.props.socket,state:this.props.state,event:t})}})))]}),this.state.hasDeviceDialog&&this.state.showDeviceDialog&&(0,r.jsx)(p,{parentThis:this,dataPoint:this.props.dataPoint,state:this.props.state,typeConfig:this.props.typeConfig,name:this.props.state[this.props.dataPoint.name],socket:this.props.socket})]})}}const m=(0,s.withStyles)((e=>({showDialogButton:{cursor:"pointer"}})))(d)},15713:(e,t,a)=>{a.d(t,{A:()=>y});const n=e=>{e.dom.innerHTML=e.newVal},o=e=>{e.dom.classList.remove("motionyes"),e.dom.classList.remove("motionno"),!0===e.newVal?(e.dom.classList.add("motionyes"),e.dom.innerHTML="Ja"):(e.dom.classList.add("motionno"),e.dom.innerHTML="Nein")},s=e=>{e.dom.innerHTML=e.newVal},i=e=>{e.dom.innerHTML="".concat(e.newVal," ").concat(e.config.unit)},c=e=>{e.dom.innerHTML="".concat(e.newVal," ").concat(e.config.unit)},r=e=>{let t=null,a=null;Object.entries(e.state).map((n=>{let[o,s]=n;"undefined"!==typeof e.dataPoint.externalPower&&e.dataPoint.externalPower===o?t=s:"undefined"!==typeof e.dataPoint.batteryPercent&&e.dataPoint.batteryPercent===o&&(a=s)})),e.dom.classList.remove("externalPower"),e.dom.classList.remove("battery"),null!==t&&"object"===typeof t&&!0===t.val?(e.dom.classList.add("externalPower"),e.dom.innerHTML="Energie"):(e.dom.classList.add("battery"),e.dom.innerHTML="".concat(null===a||"object"!==typeof a?a:a.val," %"))},l=e=>{const t=e.dom.querySelector("[name='svgShellyTRVButton']");if(null===t)return!1;if(null===t.contentDocument)return!1;const a=t.contentDocument.firstChild;return null!==a&&(!0===e.newAck?a.classList.remove("animatedAction"):a.classList.add("animatedAction"),!0)},p=e=>{const t=e.dom.querySelector("[name='svgShellyButton']");if(t.hasAttribute("loadAck")||(t.addEventListener("load",(()=>{p(e)}),!0),t.setAttribute("loadAck","true")),null===t)return!1;if(null===t.contentDocument)return!1;const a=t.contentDocument.firstChild;return null!==a&&(!0===e.newAck?a.classList.remove("animatedAction"):a.classList.add("animatedAction"),!0)},d=e=>{const t=e.dom.querySelector("[name='svgShellyButton']");if(t.hasAttribute("loadValue")||(t.addEventListener("load",(()=>{d(e)}),!0),t.setAttribute("loadValue","true")),null!==t){if(null===t.contentDocument)return;const a=t.contentDocument.firstChild;if(null===a)return;e.newVal?a.classList.add("active"):a.classList.remove("active")}},m=e=>{const t=e.dataPoint[e.options.dataPoint];if("undefined"===typeof t)return!1;if("undefined"===typeof e.state[t])return!1;let a="undefined"===typeof e.state[t]||null===e.state[t]?e.options.minValue:e.state[t].val;return a+=e.options.step,a<e.options.minValue&&(a=e.options.minValue),a>e.options.maxValue&&(a=e.options.maxValue),e.socket.setState(t,a,!1),!0},u=e=>{const t=e.dataPoint[e.options.dataPoint];if("undefined"===typeof t)return!1;if("undefined"===typeof e.state[t])return!1;const a=null!==e.state[t]&&!0!==e.state[t].val;return e.socket.setState(t,a,!1),!0};var h=a(67085),w=a(70579);const v=e=>(0,w.jsxs)("div",{style:{margin:"20px",textAlign:"center",height:"100%",maxHeight:"".concat(e.maxVisibleHeight,"px")},children:[e.maxVisibleHeight>200&&(0,w.jsx)("div",{children:e.state[e.dataPoint.power].val}),(0,w.jsx)(h.Slider,{sx:{'& input[type="range"]':{WebkitAppearance:"slider-vertical"},"& .MuiSlider-thumb":{borderRadius:"5px",width:"85px",color:"white"}},orientation:"vertical",defaultValue:"object"===typeof e.state[e.dataPoint.brightness]?e.state[e.dataPoint.brightness].val:0,"aria-label":"Temperature",valueLabelDisplay:"auto",style:{width:"80px"},onChange:(t,a)=>{((t,a)=>{e.socket.setState(e.dataPoint.brightness,a,!1)})(0,a)}})]}),y=async(e,t,a,h)=>{let y={};const g=(0,w.jsx)("object",{name:"svgShellyButton",type:"image/svg+xml",data:"/vis-2/widgets/vis-2-shelly/vis2/img/shellySwitchButton.svg",title:"Switch"}),f=(0,w.jsx)("object",{name:"svgShellyTRVButton",type:"image/svg+xml",data:"/vis-2/widgets/vis-2-shelly/vis2/img/shellyTRVButton.svg",style:{margin:"5px",width:"125px"},title:"TRVSwitch"});switch(e){case"SHDM-2":y={domID:t,update:{power:{name:"power",unit:"W",updateValue:i},brightness:{name:"brightness",unit:"%",updateValue:c},name:{name:"name",updateValue:s},oname:{name:"name",updateValue:s},switch:{name:"switch",updateAck:p,updateValue:d}},view:{info:{power:{name:"power",class:"icon",html:""},brightness:{name:"brightness",class:"icon",html:""}},action:{switch:{name:"switch",style:{width:"70px"},class:"",html:g}}},action:{switch:{name:"switch",x:"0px",y:"0px",w:"100%",h:"100%",dataPoint:"switch",click:u}},dataPoint:{0:{power:"".concat(a.stateID,".lights.Power"),switch:"".concat(a.stateID,".lights.Switch"),brightness:"".concat(a.stateID,".lights.brightness"),name:"".concat(h,".0.name"),room:"".concat(h,".0.room"),deviceID:a.id}},dialog:{tabs:[{name:"main",title:"1",icon:"",content:{title:"Main content",body:v}}]}};break;case"SHPLG-S":y={domID:t,update:{power:{name:"power",unit:"W",updateValue:i},name:{name:"name",updateValue:s},oname:{name:"name",updateValue:s},switch:{name:"switch",updateAck:p,updateValue:d}},view:{info:{power:{name:"power",class:"icon",html:""}},action:{switch:{name:"switch",style:{width:"70px"},class:"",html:g}}},action:{switch:{name:"switch",x:"0px",y:"0px",w:"100%",h:"100%",dataPoint:"switch",click:u}},dataPoint:{0:{power:"".concat(a.stateID,".Relay0.Power"),switch:"".concat(a.stateID,".Relay0.Switch"),name:"".concat(h,".0.name"),room:"".concat(h,".0.room"),deviceID:a.id}}};break;case"shellyplus1pm":case"shellyplusplugs":y={domID:t,update:{power:{name:"power",unit:"W",updateValue:i},voltage:{name:"voltage",unit:"V",updateValue:i},name:{name:"name",updateValue:s},oname:{name:"name",updateValue:s},switch:{name:"switch",updateAck:p,updateValue:d}},view:{info:{power:{name:"power",class:"icon",html:""},voltage:{name:"voltage",class:"icon",html:""}},action:{switch:{name:"switch",style:{width:"70px"},class:"",html:g}}},action:{switch:{name:"switch",x:"0px",y:"0px",w:"100%",h:"100%",dataPoint:"switch",click:u}},dataPoint:{0:{power:"".concat(a.stateID,".Relay0.Power"),switch:"".concat(a.stateID,".Relay0.Switch"),voltage:"".concat(a.stateID,".Relay0.Voltage"),name:"".concat(h,".0.name"),room:"".concat(h,".0.room"),deviceID:a.id}}};break;case"shellyplus2pm":y={domID:t,update:{power:{name:"power",unit:"W",updateValue:i},voltage:{name:"voltage",unit:"V",updateValue:i},name:{name:"name",updateValue:s},oname:{name:"name",updateValue:s},switch:{name:"switch",updateAck:p,updateValue:d}},view:{info:{power:{name:"power",class:"icon",html:""},voltage:{name:"voltage",class:"icon",html:""}},action:{switch:{name:"switch",style:{width:"70px"},class:"",html:g}}},action:{switch:{name:"switch",x:"0px",y:"0px",w:"100%",h:"100%",dataPoint:"switch",click:u}},dataPoint:{0:{power:"".concat(a.stateID,".Relay0.Power"),switch:"".concat(a.stateID,".Relay0.Switch"),voltage:"".concat(a.stateID,".Relay0.Voltage"),name:"".concat(h,".0.name"),room:"".concat(h,".0.room"),deviceID:a.id},1:{power:"".concat(a.stateID,".Relay1.Power"),switch:"".concat(a.stateID,".Relay1.Switch"),voltage:"".concat(a.stateID,".Relay1.Voltage"),name:"".concat(h,".1.name"),room:"".concat(h,".1.room"),deviceID:a.id}}};break;case"shellyplusht":y={domID:t,update:{humidity:{name:"humidity",unit:"%",updateValue:i},batteryPercent:{name:"devicePower",viewPoint:"devicePower",updateValue:r},externalPower:{name:"devicePower",viewPoint:"devicePower",updateValue:r},temperature:{name:"temperature",unit:"\xb0C",updateValue:i},name:{name:"name",updateValue:s},oname:{name:"name",updateValue:s}},view:{info:{humidity:{name:"humidity",class:"icon",html:""},externalPower:{name:"devicePower",class:"icon",html:""}},action:{temperature:{name:"temperature",style:{width:"70px"},class:"temperature",html:""}}},dataPoint:{0:{temperature:"".concat(a.stateID,".Temperature0.Celsius"),humidity:"".concat(a.stateID,".Humidity0.Relative"),externalPower:"".concat(a.stateID,".DevicePower0.ExternalPower"),batteryPercent:"".concat(a.stateID,".DevicePower0.BatteryPercent"),name:"".concat(h,".0.name"),room:"".concat(h,".0.room"),deviceID:a.id}}};break;case"SHTRV-01":y={domID:t,update:{valvePosition:{name:"valvePosition",unit:"%",updateValue:i},batteryPercent:{name:"devicePower",viewPoint:"devicePower",updateValue:r},externalPower:{name:"devicePower",viewPoint:"devicePower",updateValue:r},temperature:{name:"temperature",unit:"\xb0C",updateValue:i},name:{name:"name",updateValue:s},oname:{name:"name",updateValue:s},temperatureTarget:{name:"temperatureTarget",unit:"\xb0C",updateAck:l,updateValue:i}},view:{info:{temperature:{name:"temperature",class:"icon",html:""},valvePosition:{name:"valvePosition",class:"icon",html:""},devicePower:{name:"devicePower",class:"icon",html:""}},action:{temperatureTarget:{name:"temperatureTarget",style:{},class:"TRVValue",html:""},buttons:{name:"buttons",style:{width:"135px"},class:"TRVButton",html:f}}},action:{down:{name:"buttons",x:"5px",y:"5px",w:"45px",h:"50px",minValue:15,maxValue:30,step:-.5,dataPoint:"temperatureTarget",click:m},up:{name:"buttons",x:"85px",y:"5px",w:"45px",h:"50px",minValue:15,maxValue:30,step:.5,dataPoint:"temperatureTarget",onClick:{find:"[name='svgShellyTRVButton']",contentDocument:!0,className:"animatedAction"},click:m}},dataPoint:{0:{temperature:"".concat(a.stateID,".tmp.temperatureC"),temperatureTarget:"".concat(a.stateID,".tmp.temperatureTargetC"),valvePosition:"".concat(a.stateID,".tmp.valvePosition"),externalPower:"".concat(a.stateID,".bat.charger"),batteryPercent:"".concat(a.stateID,".bat.value"),name:"".concat(h,".0.name"),room:"".concat(h,".0.room"),deviceID:a.id}}};break;case"SHMOS-02":y={domID:t,update:{lux:{name:"lux",unit:"Lux",updateValue:i},batteryPercent:{name:"devicePower",unit:"%",viewPoint:"devicePower",updateValue:r},motion:{name:"motion",updateValue:o},temperature:{name:"temperature",unit:"\xb0C",updateValue:i},name:{name:"name",updateValue:s},oname:{name:"name",updateValue:s}},view:{info:{temperature:{name:"temperature",class:"icon",html:""},batteryPercent:{name:"devicePower",class:"icon",html:""},lux:{name:"lux",class:"icon",html:""}},action:{motion:{name:"motion",style:{width:"70px"},class:"",html:""}}},dataPoint:{0:{temperature:"".concat(a.stateID,".sensor.temperatureC"),motion:"".concat(a.stateID,".sensor.motion"),lux:"".concat(a.stateID,".sensor.lux"),batteryPercent:"".concat(a.stateID,".sensor.battery"),name:"".concat(h,".0.name"),room:"".concat(h,".0.room"),deviceID:a.id}}};break;case"SHDW-2":y={domID:t,update:{lux:{name:"lux",unit:"Lux",updateValue:i},batteryPercent:{name:"devicePower",unit:"%",viewPoint:"devicePower",updateValue:r},door:{name:"door",updateValue:n},temperature:{name:"temperature",unit:"\xb0C",updateValue:i},name:{name:"name",updateValue:s}},view:{info:{temperature:{name:"temperature",class:"icon",html:""},batteryPercent:{name:"devicePower",class:"icon",html:""},lux:{name:"lux",class:"icon",html:""}},action:{door:{name:"door",style:{width:"70px"},class:"darkBack",html:""}}},dataPoint:{0:{temperature:"".concat(a.stateID,".sensor.temperatureC"),door:"".concat(a.stateID,".sensor.door"),lux:"".concat(a.stateID,".sensor.lux"),batteryPercent:"".concat(a.stateID,".sensor.battery"),name:"".concat(h,".0.name"),room:"".concat(h,".0.room"),deviceID:a.id}}}}const x=await a.socket.getState("".concat(h,".customConfig"));if("object"===typeof x&&null!==x)try{const e=JSON.parse(x.val);"object"===typeof e.dataPoint&&Object.entries(e.dataPoint).forEach((e=>{let[t,a]=e;Object.entries(a).forEach((e=>{let[a,n]=e;y.dataPoint[t][a]=n}))})),"object"===typeof e.update&&Object.entries(e.update).forEach((e=>{let[t,a]=e;y.update[t]=a})),"object"===typeof e.view&&Object.entries(e.view).forEach((e=>{let[t,a]=e;y.view[t]=a}))}catch(b){}return y}}}]);
//# sourceMappingURL=src_components_Device_jsx-src_components_DeviceConfig_jsx.c8ae1faa.chunk.js.map