(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a88cfc2"],{"1be7":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"commdstatisti"},[a("h1",[t._v("商品统计")]),a("div",[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"status-icon":"","label-width":"100px"}},[a("el-form-item",{attrs:{label:"时间范围",prop:" "}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),a("el-button",{attrs:{type:"primary"}},[t._v("搜索")])],1)],1),a("div",{staticClass:"box"},[a("div",{style:{width:"1000px",height:"400px"},attrs:{id:"myChart"}})])])},n=[],l={data:function(){return{value:""}},mounted:function(){this.drawLine()},methods:{drawLine:function(){var t=this.$echarts.init(document.getElementById("myChart"));t.setOption({title:{text:"堆叠区域图"},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},legend:{data:["邮件营销","联盟广告","视频广告","直接访问","搜索引擎"]},toolbox:{feature:{saveAsImage:{}}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",boundaryGap:!1,data:["周一","周二","周三","周四","周五","周六","周日"]}],yAxis:[{type:"value"}],series:[{name:"邮件营销",type:"line",stack:"总量",areaStyle:{},data:[120,132,101,134,90,230,210]},{name:"联盟广告",type:"line",stack:"总量",areaStyle:{},data:[220,182,191,234,290,330,310]},{name:"视频广告",type:"line",stack:"总量",areaStyle:{},data:[150,232,201,154,190,330,410]},{name:"直接访问",type:"line",stack:"总量",areaStyle:{normal:{}},data:[320,332,301,334,390,330,320]},{name:"搜索引擎",type:"line",stack:"总量",label:{normal:{show:!0,position:"top"}},areaStyle:{normal:{}},data:[820,932,901,934,1290,1330,1320]}]})}}},i=l,s=(a("369f"),a("2877")),o=Object(s["a"])(i,r,n,!1,null,"437aee36",null);e["default"]=o.exports},"369f":function(t,e,a){"use strict";var r=a("f101"),n=a.n(r);n.a},f101:function(t,e,a){}}]);
//# sourceMappingURL=chunk-5a88cfc2.a6eae92a.js.map