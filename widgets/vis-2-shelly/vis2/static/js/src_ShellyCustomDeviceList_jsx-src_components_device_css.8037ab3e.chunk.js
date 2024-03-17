/*! For license information please see src_ShellyCustomDeviceList_jsx-src_components_device_css.8037ab3e.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkiobroker_vis_2_shelly=self.webpackChunkiobroker_vis_2_shelly||[]).push([["src_ShellyCustomDeviceList_jsx-src_components_device_css","node_modules_react_jsx-runtime_js-_c9180","node_modules_react_jsx-runtime_js-_c9181","node_modules_react_jsx-runtime_js-_c9182"],{29822:(e,t,s)=>{s.r(t),s.d(t,{default:()=>l});s(28437);var i=s(67085),a=(s(37449),s(59797)),o=s(60318),n=s(15713),c=s(70579);class d extends(window.visRxWidget||a.VisRxWidget){constructor(e){super(e),this.state.allDevices={},this.state.deviceList={},console.debug("THIS DEVICES"),console.debug(this)}static getWidgetInfo(){return{id:"tplCustomDeviceListWidget",visSet:"vis-2-shelly",visSetLabel:"vis_2_widgets_shelly",visSetColor:"#cf00ff",visName:"CustomDeviceList",visAttrs:[{name:"common",fields:[{name:"display",label:"vis_2_widgets_shelly_display",type:"select",options:[{value:"block",label:"block"},{value:"flex",label:"flex"}],noTranslation:!0,default:"block"},{name:"count",type:"number",default:1,label:"vis_2_widgets_shelly_device_count",onChange:(e,t,s)=>s(t)}]},{name:"devices",label:"vis_2_widgets_shelly_group_devices",indexFrom:1,indexTo:"count",fields:[{name:"device",label:"vis_2_widgets_shelly_device",type:"custom",component:(e,t,s,i,a,o,n)=>{const d="undefined"!==typeof i.context.socket.states.deviceList?i.context.socket.states.deviceList:{};return(0,c.jsxs)("select",{name:"ShellyDeviceList_DeviceSelect",style:{width:"100%"},value:t[e.name],onChange:t=>{s({[e.name]:t.target.value})},children:[(0,c.jsx)("option",{value:"",children:"-- Select device --"}),Object.entries(d).map((e=>{let[t,s]=e;return(0,c.jsx)("option",{value:t,children:null!==s.name&&s.name.length>0?s.name:s.id})}))]})}}]}],visPrev:"widgets/vis-2-shelly/vis2/img/editor/allDevices.png"}}async propertiesUpdate(){this.updateDeviceList()}async updateDeviceList(){this.state.deviceList={};for(let e=1;e<=this.state.data.count;e++)"undefined"!==typeof this.state.data["device".concat(e)]&&"undefined"!==typeof this.state.allDevices[this.state.data["device".concat(e)]]&&(this.state.deviceList[e]=this.state.allDevices[this.state.data["device".concat(e)]])}async updateTypeConfig(e){this.state.typeConfig={};for(const t in e){const s=e[t];this.vsID="vis-2-shelly.".concat(s.instance,".devices.").concat(s.id),this.domID=s.id.replaceAll("#",""),console.log(t),s.typeConfig=await(0,n.A)(s.type,this.domID,{stateID:s.stateId,type:s.type,id:s.id,socket:this.props.context.socket},this.vsID)}this.setState({deviceList:e})}async componentDidMount(){super.componentDidMount(),this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.ids"],((e,t)=>{this.state.allDevices=JSON.parse(t.val),this.props.context.socket.states.deviceList=this.state.allDevices,this.updateDeviceList(),this.forceUpdate()})),await this.propertiesUpdate()}getWidgetInfo(){return d.getWidgetInfo()}async onRxDataChanged(){console.debug("onRxDataChanged"),await this.propertiesUpdate()}async onRxStyleChanged(){}async onStateUpdated(e,t){}renderWidgetBody(e){return super.renderWidgetBody(e),(0,c.jsx)(i.Card,{style:{width:"100%",height:"100%"},children:(0,c.jsx)(i.CardContent,{children:Object.values(this.state.deviceList).map((e=>{this.vsID="vis-2-shelly.".concat(e.instance,".devices.").concat(e.id),this.domID=e.id.replaceAll("#","");const t=(0,n.A)(e.type,this.domID,{stateID:e.stateId,type:e.type,id:e.id,socket:this.props.context.socket},this.vsID);if("undefined"!==typeof t&&"undefined"!==typeof t.dataPoint&&"undefined"!==typeof t.dataPoint[e.relay]){const s=t.domID+e.relay;return(0,c.jsx)(o.A,{stateID:e.stateId,type:e.type,id:e.id,typeConfig:t,deviceDomID:s,relay:e.relay,state:this.state,dataPoint:t.dataPoint[e.relay],socket:this.props.context.socket,widID:this.props.id})}}))})})}}const l=d},51153:(e,t,s)=>{var i=s(28437),a=Symbol.for("react.element"),o=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,c=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,s){var i,o={},l=null,r=null;for(i in void 0!==s&&(l=""+s),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(r=t.ref),t)n.call(t,i)&&!d.hasOwnProperty(i)&&(o[i]=t[i]);if(e&&e.defaultProps)for(i in t=e.defaultProps)void 0===o[i]&&(o[i]=t[i]);return{$$typeof:a,type:e,key:l,ref:r,props:o,_owner:c.current}}t.Fragment=o,t.jsx=l,t.jsxs=l},70579:(e,t,s)=>{e.exports=s(51153)}}]);
//# sourceMappingURL=src_ShellyCustomDeviceList_jsx-src_components_device_css.8037ab3e.chunk.js.map