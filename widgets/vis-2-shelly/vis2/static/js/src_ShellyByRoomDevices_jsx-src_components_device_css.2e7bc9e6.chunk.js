/*! For license information please see src_ShellyByRoomDevices_jsx-src_components_device_css.2e7bc9e6.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkiobroker_vis_2_shelly=self.webpackChunkiobroker_vis_2_shelly||[]).push([["src_ShellyByRoomDevices_jsx-src_components_device_css","node_modules_react_jsx-runtime_js-_c9180","node_modules_react_jsx-runtime_js-_c9181","node_modules_react_jsx-runtime_js-_c9182"],{7702:(e,t,s)=>{s.r(t),s.d(t,{default:()=>l});s(28437);var o=s(67085),i=(s(37449),s(59797)),a=s(60318),r=s(15713),n=s(70579);class c extends(window.visRxWidget||i.VisRxWidget){constructor(e){super(e),this.state.allDevices={},this.state.roomDevices={},console.debug("THIS ROOM"),console.debug(this)}static getWidgetInfo(){return{id:"tplByRoomDevicesWidget",visSet:"vis-2-shelly",visSetLabel:"vis_2_widgets_shelly",visSetColor:"#cf00ff",visName:"ByRoomDevices",visAttrs:[{name:"common",fields:[{name:"display",label:"vis_2_widgets_shelly_display",type:"select",options:[{value:"block",label:"block"},{value:"flex",label:"flex"}],noTranslation:!0,default:"block"},{name:"rooms",label:"vis_2_widgets_shelly_rooms",type:"custom",component:(e,t,s,o,i,a,r)=>{const c="undefined"!==typeof o.context.socket.states.roomList?o.context.socket.states.roomList:{};return(0,n.jsxs)("select",{name:"ShellyByRoom_RoomSelect",style:{width:"100%"},value:t[e.name],onChange:i=>{s({[e.name]:i.target.value}),console.debug(e),console.debug(t),console.debug(s),console.debug(o)},children:[(0,n.jsx)("option",{value:"",children:"-- Select room --"}),Object.entries(c).map((e=>{let[t,s]=e;return(0,n.jsx)("option",{value:t,children:s})}))]})}}]}],visPrev:"widgets/vis-2-shelly/vis2/img/editor/allDevices.png"}}async propertiesUpdate(){this.updateRoomDevices()}async updateRoomDevices(){this.state.roomDevices={},"undefined"!==typeof this.state.data.rooms&&(Object.entries(this.state.allDevices).forEach((e=>{let[t,s]=e;s.room===this.state.data.rooms&&(this.state.roomDevices[t]=s)})),this.forceUpdate())}async componentDidMount(){super.componentDidMount(),"undefined"===typeof this.props.context.socket.states.roomList&&this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.roomIds"],((e,t)=>{this.state.rooms=JSON.parse(t.val),this.props.context.socket.states.roomList=this.state.rooms})),this.props.context.socket.subscribeState(["vis-2-shelly.0.devices.ids"],((e,t)=>{this.state.allDevices=JSON.parse(t.val),this.updateRoomDevices(),this.forceUpdate()})),await this.propertiesUpdate()}getWidgetInfo(){return c.getWidgetInfo()}async onRxDataChanged(){console.debug("onRxDataChanged"),await this.propertiesUpdate()}async onRxStyleChanged(){}async onStateUpdated(e,t){}renderWidgetBody(e){return super.renderWidgetBody(e),console.debug("room devices"),console.debug(this.state.roomDevices),(0,n.jsx)(o.Card,{style:{width:"100%",height:"100%"},children:(0,n.jsx)(o.CardContent,{children:Object.values(this.state.roomDevices).map((e=>{this.vsID="vis-2-shelly.".concat(e.instance,".devices.").concat(e.id),this.domID=e.id.replaceAll("#","");const t=(0,r.A)(e.type,this.domID,{stateID:e.stateId,type:e.type,id:e.id,socket:this.props.context.socket},this.vsID);if("undefined"!==typeof t.dataPoint&&"undefined"!==typeof t.dataPoint[e.relay]){const s=t.domID+e.relay;return(0,n.jsx)(a.A,{stateID:e.stateId,type:e.type,id:e.id,typeConfig:t,deviceDomID:s,relay:e.relay,state:this.state,dataPoint:t.dataPoint[e.relay],socket:this.props.context.socket,widID:this.props.id})}}))})})}}const l=c},51153:(e,t,s)=>{var o=s(28437),i=Symbol.for("react.element"),a=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,n=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,s){var o,a={},l=null,d=null;for(o in void 0!==s&&(l=""+s),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(d=t.ref),t)r.call(t,o)&&!c.hasOwnProperty(o)&&(a[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===a[o]&&(a[o]=t[o]);return{$$typeof:i,type:e,key:l,ref:d,props:a,_owner:n.current}}t.Fragment=a,t.jsx=l,t.jsxs=l},70579:(e,t,s)=>{e.exports=s(51153)}}]);
//# sourceMappingURL=src_ShellyByRoomDevices_jsx-src_components_device_css.2e7bc9e6.chunk.js.map