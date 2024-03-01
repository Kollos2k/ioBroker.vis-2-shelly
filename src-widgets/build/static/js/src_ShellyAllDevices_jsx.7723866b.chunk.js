/*! For license information please see src_ShellyAllDevices_jsx.7723866b.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkiobroker_vis_2_shelly=self.webpackChunkiobroker_vis_2_shelly||[]).push([["src_ShellyAllDevices_jsx","node_modules_react_jsx-runtime_js-_c9180","node_modules_react_jsx-runtime_js-_c9181","node_modules_react_jsx-runtime_js-_c9182","node_modules_react_jsx-runtime_js-_c9183"],{57087:(e,t,a)=>{a.r(t),a.d(t,{default:()=>l});a(28437);var n=a(67085),o=(a(37449),a(59797)),s=a(92525),i=a(33659),c=a(70579);class r extends(window.visRxWidget||o.VisRxWidget){constructor(e){super(e),this.state.allDevices={},console.debug("THIS"),console.debug(this)}static getWidgetInfo(){return{id:"tplAllDevicesWidget",visSet:"vis-2-shelly",visSetLabel:"vis_2_widgets_shelly",visSetColor:"#cf00ff",visName:"AllDevices",visAttrs:[{name:"common",fields:[{name:"display",label:"vis_2_widgets_shelly_display",type:"select",options:[{value:"block",label:"block"},{value:"flex",label:"flex"}],noTranslation:!0,default:"block"}]}],visPrev:"widgets/vis-2-shelly/vis2/img/editor/allDevices.png"}}async propertiesUpdate(){}async componentDidMount(){super.componentDidMount(),this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.ids"],((e,t)=>{this.state.allDevices=JSON.parse(t.val),this.forceUpdate()})),await this.propertiesUpdate()}getWidgetInfo(){return r.getWidgetInfo()}async onRxDataChanged(){console.debug("onRxDataChanged"),await this.propertiesUpdate()}async onRxStyleChanged(){}async onStateUpdated(e,t){}renderWidgetBody(e){return super.renderWidgetBody(e),console.debug(this.props.context.socket),(0,c.jsx)(n.Card,{style:{width:"100%",height:"100%"},children:(0,c.jsx)(n.CardContent,{children:Object.values(this.state.allDevices).map((e=>{this.vsID="vis-2-shelly.0.devices.".concat(e.id),this.domID=e.id.replaceAll("#","");const t=(0,i.A)(e.type,this.domID,{stateID:e.stateId,type:e.type,id:e.id},this.vsID),a="undefined"===typeof t.dataPoint?[]:t.dataPoint;return Object.entries(a).map((a=>{let[n,o]=a;const i=t.domID+n;return(0,c.jsx)(s.A,{stateID:e.stateId,type:e.type,id:e.id,typeConfig:t,deviceDomID:i,relay:n,state:this.state,dataPoint:o,socket:this.props.context.socket,widID:this.props.id})}))}))})})}}const l=r},92525:(e,t,a)=>{a.d(t,{A:()=>r});var n=a(28437),o=a.n(n),s=(a(86820),a(32719)),i=(a(10614),a(70579));class c extends n.Component{constructor(e){super(e),this.el=o().createRef(null),this.components={},e.socket.subscribeState(Object.values(e.dataPoint),((e,t)=>{this.stateChange(e,t)}))}async stateChange(e,t){if(this.props.state[e]=t,"undefined"===typeof this.props.typeConfig.update)return!1;let a;if(Object.entries(this.props.dataPoint).forEach((t=>{let[n,o]=t;o===e&&(a=n)})),"undefined"===typeof this.props.typeConfig.update[a])return!1;const n="undefined"!==typeof this.props.typeConfig.update[a].viewPoint?this.props.typeConfig.update[a].viewPoint:a;if("undefined"===typeof this.components[n])return!1;if("function"===typeof this.props.typeConfig.update[a].updateValue){const e="undefined"===typeof t||null===t?"":t.val;this.props.typeConfig.update[a].updateValue({dom:this.components[n].current,newVal:e,config:this.props.typeConfig.update[a],socket:this.props.socket,dataPoint:this.props.dataPoint,state:this.props.state})}if("function"===typeof this.props.typeConfig.update[a].updateAck){const e="undefined"===typeof t||null===t?"":t.ack;this.props.typeConfig.update[a].updateAck({dom:this.components[a].current,newAck:e,config:this.props.typeConfig.update[a],socket:this.props.socket,dataPoint:this.props.dataPoint,state:this.props.state})}return!0}async propertiesUpdate(){}async componentDidMount(){const e=this;"undefined"!==typeof e.props.state&&null!==e.props.state&&Object.values(e.props.dataPoint).forEach((t=>{"undefined"!==typeof e.props.state[t]&&e.stateChange(t,e.props.state[t])})),await this.propertiesUpdate()}render(){return"undefined"===typeof this.props.typeConfig.action&&(this.props.typeConfig.action={}),this.components.icon=o().createRef(null),this.components.name=o().createRef(null),(0,i.jsxs)("div",{id:this.props.deviceDomID,className:"vis2_shelly_DeviceBody",title:this.props.stateID,ref:this.el,children:[(0,i.jsx)("span",{name:"status",children:(0,i.jsx)("span",{children:(0,i.jsx)("span",{className:"connectionState connectionStateOnline"})})}),(0,i.jsx)("span",{name:"icon",ref:this.components.icon}),(0,i.jsx)("span",{name:"name",ref:this.components.name,children:this.props.id}),(0,i.jsx)("span",{name:"info",children:Object.entries(this.props.typeConfig.view.info).map((e=>{let[t,a]=e;return this.components[a.name]=o().createRef(null),(0,i.jsx)("span",{name:a.name,className:a.class,ref:this.components[a.name],children:a.html})}))}),(0,i.jsxs)("span",{name:"action",children:[Object.entries(this.props.typeConfig.view.action).map((e=>{let[t,a]=e;return this.components[a.name]=o().createRef(null),(0,i.jsx)("span",{name:a.name,className:a.class,style:a.style,ref:this.components[a.name],children:a.html})})),Object.values(this.props.typeConfig.action).map((e=>(0,i.jsx)("div",{className:"actionButton",style:{top:e.y,left:e.x,height:e.h,width:e.w},onClick:t=>{e.click({dom:this.el.current,dataPoint:this.props.dataPoint,options:e,socket:this.props.socket,state:this.props.state,event:t})}})))]})]})}}const r=(0,s.withStyles)((e=>({})))(c)},32416:(e,t,a)=>{a.d(t,{J6:()=>m,Xo:()=>c,Z8:()=>r,_M:()=>p,d7:()=>s,fO:()=>n,g6:()=>o,lz:()=>d,qn:()=>i,rx:()=>l});const n=e=>{e.dom.classList.remove("motionyes"),e.dom.classList.remove("motionno"),!0===e.newVal?(e.dom.classList.add("motionyes"),e.dom.innerHTML="Ja"):(e.dom.classList.add("motionno"),e.dom.innerHTML="Nein")},o=e=>{e.dom.innerHTML=e.newVal},s=e=>{e.dom.innerHTML="".concat(e.newVal," ").concat(e.config.unit)},i=e=>{e.dom.innerHTML="".concat(e.newVal," ").concat(e.config.unit)},c=e=>{let t=null,a=null;Object.entries(e.state).map((n=>{let[o,s]=n;"undefined"!==typeof e.dataPoint.externalPower&&e.dataPoint.externalPower===o?t=s:"undefined"!==typeof e.dataPoint.batteryPercent&&e.dataPoint.batteryPercent===o&&(a=s)})),e.dom.classList.remove("externalPower"),e.dom.classList.remove("battery"),null!==t&&"object"===typeof t&&!0===t.val?(e.dom.classList.add("externalPower"),e.dom.innerHTML="Energie"):(e.dom.classList.add("battery"),e.dom.innerHTML="".concat(null===a||"object"!==typeof a?a:a.val," %"))},r=e=>{const t=e.dom.querySelector("[name='svgShellyTRVButton']");if(null===t)return!1;if(null===t.contentDocument)return!1;const a=t.contentDocument.firstChild;return null!==a&&(!0===e.newAck?a.classList.remove("animatedAction"):a.classList.add("animatedAction"),!0)},l=e=>{const t=e.dom.querySelector("[name='svgShellyButton']");if(null===t)return!1;if(null===t.contentDocument)return!1;const a=t.contentDocument.firstChild;return null!==a&&(!0===e.newAck?a.classList.remove("animatedAction"):a.classList.add("animatedAction"),!0)},p=e=>{const t=e.dom.querySelector("[name='svgShellyButton']");if(null!==t){if(null===t.contentDocument)return;const a=t.contentDocument.firstChild;if(null===a)return;!0===e.newVal?a.classList.add("active"):a.classList.remove("active")}},d=e=>{const t=e.dataPoint[e.options.dataPoint];if("undefined"===typeof t)return!1;if("undefined"===typeof e.state[t])return!1;let a="undefined"===typeof e.state[t]||null===e.state[t]?e.options.minValue:e.state[t].val;return a+=e.options.step,a<e.options.minValue&&(a=e.options.minValue),a>e.options.maxValue&&(a=e.options.maxValue),e.socket.setState(t,a,!1),!0},m=e=>{const t=e.dataPoint[e.options.dataPoint];if("undefined"===typeof t)return!1;if("undefined"===typeof e.state[t])return!1;const a=null!==e.state[t]&&!0!==e.state[t].val;return e.socket.setState(t,a,!1),!0}},33659:(e,t,a)=>{a.d(t,{A:()=>s});var n=a(32416),o=a(70579);const s=(e,t,a,s)=>{let i={};const c=(0,o.jsx)("object",{name:"svgShellyButton",type:"image/svg+xml",data:"/vis-2/widgets/vis-2-shelly/vis2/img/shellySwitchButton.svg",title:"Switch"}),r=(0,o.jsx)("object",{name:"svgShellyTRVButton",type:"image/svg+xml",data:"/vis-2/widgets/vis-2-shelly/vis2/img/shellyTRVButton.svg",style:{margin:"5px",width:"125px"},title:"TRVSwitch"});switch(e){case"SHDM-2":i={domID:t,update:{power:{name:"power",unit:"W",updateValue:n.d7},brightness:{name:"brightness",unit:"%",updateValue:n.qn},name:{name:"name",updateValue:n.g6},oname:{name:"name",updateValue:n.g6},switch:{name:"switch",updateAck:n.rx,updateValue:n._M}},view:{info:{power:{name:"power",class:"icon",html:""},brightness:{name:"brightness",class:"icon",html:""}},action:{switch:{name:"switch",style:{width:"70px"},class:"",html:c}}},action:{switch:{name:"switch",x:"0px",y:"0px",w:"100%",h:"100%",dataPoint:"switch",click:n.J6}},dataPoint:{0:{power:"".concat(a.stateID,".lights.Power"),switch:"".concat(a.stateID,".lights.Switch"),brightness:"".concat(a.stateID,".lights.brightness"),name:"".concat(s,".0.name"),room:"".concat(s,".0.room"),deviceID:a.id}}};break;case"SHPLG-S":i={domID:t,update:{power:{name:"power",unit:"W",updateValue:n.d7},name:{name:"name",updateValue:n.g6},oname:{name:"name",updateValue:n.g6},switch:{name:"switch",updateAck:n.rx,updateValue:n._M}},view:{info:{power:{name:"power",class:"icon",html:""}},action:{switch:{name:"switch",style:{width:"70px"},class:"",html:c}}},action:{switch:{name:"switch",x:"0px",y:"0px",w:"100%",h:"100%",dataPoint:"switch",click:n.J6}},dataPoint:{0:{power:"".concat(a.stateID,".Relay0.Power"),switch:"".concat(a.stateID,".Relay0.Switch"),name:"".concat(s,".0.name"),room:"".concat(s,".0.room"),deviceID:a.id}}};break;case"shellyplus1pm":case"shellyplusplugs":i={domID:t,update:{power:{name:"power",unit:"W",updateValue:n.d7},voltage:{name:"voltage",unit:"V",updateValue:n.d7},name:{name:"name",updateValue:n.g6},oname:{name:"name",updateValue:n.g6},switch:{name:"switch",updateAck:n.rx,updateValue:n._M}},view:{info:{power:{name:"power",class:"icon",html:""},voltage:{name:"voltage",class:"icon",html:""}},action:{switch:{name:"switch",style:{width:"70px"},class:"",html:c}}},action:{switch:{name:"switch",x:"0px",y:"0px",w:"100%",h:"100%",dataPoint:"switch",click:n.J6}},dataPoint:{0:{power:"".concat(a.stateID,".Relay0.Power"),switch:"".concat(a.stateID,".Relay0.Switch"),voltage:"".concat(a.stateID,".Relay0.Voltage"),name:"".concat(s,".0.name"),room:"".concat(s,".0.room"),deviceID:a.id}}};break;case"shellyplus2pm":i={domID:t,update:{power:{name:"power",unit:"W",updateValue:n.d7},voltage:{name:"voltage",unit:"V",updateValue:n.d7},name:{name:"name",updateValue:n.g6},oname:{name:"name",updateValue:n.g6},switch:{name:"switch",updateAck:n.rx,updateValue:n._M}},view:{info:{power:{name:"power",class:"icon",html:""},voltage:{name:"voltage",class:"icon",html:""}},action:{switch:{name:"switch",style:{width:"70px"},class:"",html:c}}},action:{switch:{name:"switch",x:"0px",y:"0px",w:"100%",h:"100%",dataPoint:"switch",click:n.J6}},dataPoint:{0:{power:"".concat(a.stateID,".Relay0.Power"),switch:"".concat(a.stateID,".Relay0.Switch"),voltage:"".concat(a.stateID,".Relay0.Voltage"),name:"".concat(s,".0.name"),room:"".concat(s,".0.room"),deviceID:a.id},1:{power:"".concat(a.stateID,".Relay1.Power"),switch:"".concat(a.stateID,".Relay1.Switch"),voltage:"".concat(a.stateID,".Relay1.Voltage"),name:"".concat(s,".1.name"),room:"".concat(s,".1.room"),deviceID:a.id}}};break;case"shellyplusht":i={domID:t,update:{humidity:{name:"humidity",unit:"%",updateValue:n.d7},batteryPercent:{name:"devicePower",viewPoint:"externalPower",updateValue:n.Xo},externalPower:{name:"devicePower",viewPoint:"externalPower",updateValue:n.Xo},temperature:{name:"temperature",unit:"\xb0C",updateValue:n.d7},name:{name:"name",updateValue:n.g6},oname:{name:"name",updateValue:n.g6}},view:{info:{humidity:{name:"humidity",class:"icon",html:""},externalPower:{name:"devicePower",class:"icon",html:""}},action:{temperature:{name:"temperature",style:{width:"70px"},class:"temperature",html:""}}},dataPoint:{0:{temperature:"".concat(a.stateID,".Temperature0.Celsius"),humidity:"".concat(a.stateID,".Humidity0.Relative"),externalPower:"".concat(a.stateID,".DevicePower0.ExternalPower"),batteryPercent:"".concat(a.stateID,".DevicePower0.BatteryPercent"),name:"".concat(s,".0.name"),room:"".concat(s,".0.room"),deviceID:a.id}}};break;case"SHTRV-01":i={domID:t,update:{valvePosition:{name:"valvePosition",unit:"%",updateValue:n.d7},batteryPercent:{name:"devicePower",updateValue:n.Xo},externalPower:{name:"devicePower",updateValue:n.Xo},temperature:{name:"temperature",unit:"\xb0C",updateValue:n.d7},name:{name:"name",updateValue:n.g6},oname:{name:"name",updateValue:n.g6},temperatureTarget:{name:"temperatureTarget",unit:"\xb0C",updateAck:n.Z8,updateValue:n.d7}},view:{info:{temperature:{name:"temperature",class:"icon",html:""},valvePosition:{name:"valvePosition",class:"icon",html:""},devicePower:{name:"devicePower",class:"icon",html:""}},action:{temperatureTarget:{name:"temperatureTarget",style:{},class:"TRVValue",html:""},buttons:{name:"buttons",style:{width:"135px"},class:"TRVButton",html:r}}},action:{down:{name:"buttons",x:"5px",y:"5px",w:"45px",h:"50px",minValue:15,maxValue:30,step:-.5,dataPoint:"temperatureTarget",click:n.lz},up:{name:"buttons",x:"85px",y:"5px",w:"45px",h:"50px",minValue:15,maxValue:30,step:.5,dataPoint:"temperatureTarget",onClick:{find:"[name='svgShellyTRVButton']",contentDocument:!0,className:"animatedAction"},click:n.lz}},dataPoint:{0:{temperature:"".concat(a.stateID,".tmp.temperatureC"),temperatureTarget:"".concat(a.stateID,".tmp.temperatureTargetC"),valvePosition:"".concat(a.stateID,".tmp.valvePosition"),externalPower:"".concat(a.stateID,".bat.charger"),batteryPercent:"".concat(a.stateID,".bat.value"),name:"".concat(s,".0.name"),room:"".concat(s,".0.room"),deviceID:a.id}}};break;case"SHMOS-02":i={domID:t,update:{lux:{name:"lux",unit:"Lux",updateValue:n.d7},batteryPercent:{name:"devicePower",unit:"%",updateValue:n.Xo},motion:{name:"motion",updateValue:n.fO},temperature:{name:"temperature",unit:"\xb0C",updateValue:n.d7},name:{name:"name",updateValue:n.g6},oname:{name:"name",updateValue:n.g6}},view:{info:{temperature:{name:"temperature",class:"icon",html:""},batteryPercent:{name:"devicePower",class:"icon",html:""},lux:{name:"lux",class:"icon",html:""}},action:{motion:{name:"motion",style:{width:"70px"},class:"",html:""}}},dataPoint:{0:{temperature:"".concat(a.stateID,".sensor.temperatureC"),motion:"".concat(a.stateID,".sensor.motion"),lux:"".concat(a.stateID,".sensor.lux"),batteryPercent:"".concat(a.stateID,".sensor.battery"),name:"".concat(s,".0.name"),room:"".concat(s,".0.room"),deviceID:a.id}}}}return i}},51153:(e,t,a)=>{var n=a(28437),o=Symbol.for("react.element"),s=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,c=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,r={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,a){var n,s={},l=null,p=null;for(n in void 0!==a&&(l=""+a),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(p=t.ref),t)i.call(t,n)&&!r.hasOwnProperty(n)&&(s[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===s[n]&&(s[n]=t[n]);return{$$typeof:o,type:e,key:l,ref:p,props:s,_owner:c.current}}t.Fragment=s,t.jsx=l,t.jsxs=l},70579:(e,t,a)=>{e.exports=a(51153)},10614:()=>{}}]);
//# sourceMappingURL=src_ShellyAllDevices_jsx.7723866b.chunk.js.map