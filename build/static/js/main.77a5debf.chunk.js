(this["webpackJsonpchart-demo"]=this["webpackJsonpchart-demo"]||[]).push([[0],{184:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(34),l=a.n(o),i=(a(83),a(13)),c=a(14),s=a(17),u=a(15),m=a(18),h=(a(54),a(84),a(75)),p=a(26),d=a(27),b=a(21),f=a(19),v=a(9),g=a.n(v),E=a(48);a(178);var k=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){fetch("https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/users").then((function(e){return e.json()})).then((function(e){return e})).then((function(e){var t=JSON.stringify(e);(t=JSON.parse(t)).map((function(e){(function(e){var t="https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/noise_observation/user/";return t+=e,fetch(t).then((function(e){return e.json()})).then((function(e){return e}))})(e.user_id).then((function(t){var a=JSON.stringify(t);a=JSON.parse(a);var n=Math.floor((new Date).getTime()/1e3),r=Math.round(n-7200),o=a.filter((function(e){if(e.time_obs>=r&&e.time_obs<n)return e.time_obs})),l=new Object;o.map((function(e){var t,a,n,r=function(e){var t=e.getHours(),a=e.getMinutes(),n=t>=12?"pm":"am";return(t=(t%=12)||12)+":"+(a=a<10?"0"+a:a)+" "+n}(new Date(1e3*e.time_obs));t=r,a=e.db_reading,t in(n=l)?n[t]<a&&(n[t]=a):n[t]=a}));var i=document.createElement("canvas"),c="chart"+e.user_id;i.id=c;document.createElement("H2"),document.createTextNode(e.user_id);document.querySelector("#chartContainer").appendChild(i);var s=document.getElementById(c).getContext("2d");window[c]=new g.a(s,{type:"line",data:{labels:Object.keys(l).reverse(),datasets:[{label:"DB Levels",data:Object.values(l).reverse(),borderColor:"rgb(135, 188, 200)",backgroundColor:"rgba(147, 215, 245, 0.5)",lineTension:0}]},options:{title:{display:!0,text:e.user_id,position:"top",fontSize:30,fontColor:"#000000"},layout:{padding:{top:20,bottom:20}},scales:{xAxes:[{scaleLabel:{display:!0,labelString:"Time (hh:mm 12-Hour)"},ticks:{maxTicksLimit:20}}],yAxes:[{scaleLabel:{display:!0,labelString:"Recorded Decibels (dB)"},ticks:{beginAtZero:!0}}]}}})}))}))}))}},{key:"render",value:function(){return r.a.createElement("div",null)}}]),t}(n.Component);function y(e){(console.log("making user api call"),fetch("https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/users").then((function(e){return e.json()})).then((function(e){return e}))).then((function(t){var a=JSON.stringify(t);(a=JSON.parse(a)).map((function(t){(function(e){var t="https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/noise_observation/user/";return t+=e,console.log("making api call (users)"),fetch(t).then((function(e){return e.json()})).then((function(e){return e}))})(t.user_id).then((function(a){var n=JSON.stringify(a);n=JSON.parse(n);var r=Math.floor((new Date).getTime()/1e3),o=Math.round(r-7200),l=n.filter((function(e){if(e.time_obs>=o&&e.time_obs<r)return e.time_obs})),i=new Object;l.map((function(e){var t,a,n,r=function(e){var t=e.getHours(),a=e.getMinutes(),n=t>=12?"pm":"am";return(t=(t%=12)||12)+":"+(a=a<10?"0"+a:a)+" "+n}(new Date(1e3*e.time_obs));t=r,a=e.db_reading,t in(n=i)?n[t]<a&&(n[t]=a):n[t]=a}));var c=Object.keys(i).reverse(),s=Object.values(i).reverse();!function(e,t,a){console.log(e),e.data.labels=t;var n=a.map((function(e){return+e}));e.data.datasets.forEach((function(e){e.data.pop()})),e.data.datasets.forEach((function(e){e.data.push(n)})),e.update()}(window["chart"+t.user_id],c,s),setTimeout((function(){y(e-1)}),6e4)}))}))}))}var w=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Noise Manager WebApp"),r.a.createElement("p",null,"Real time data of each section/device"),r.a.createElement("div",{id:"chartContainer"},r.a.createElement(k,null)),r.a.createElement("script",null,"$(document).ready(function() ",setTimeout((function(){y(100)}),7e4),";"))};r.a.Component;var M=0;function O(e,t){var a=["rgb(25, 129, 102)","rgba(171,185,255)","rgb(19, 72, 250)","rgb(174, 255, 171)","rgb(255, 205, 139)","rgb(252, 58, 113)","rgb(232, 222, 46)","rgb(178, 62, 207)","rgb(158, 56, 5)"],n=function(e){for(var t=0,a={},n=0,r=0,o=[],l=0,i=0,c=0,s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],u=0;u<e.length;u++){var m=new Date(1e3*e[u].time_obs);0==l?l=m.getHours():m.getHours()!=l?(o.push([Math.round(i/c),l]),l=m.getHours(),i=0,c=0):u==e.length-1&&o.push([Math.round(i/c),l]),i+=e[u].db_reading,e[u].db_reading>=t&&(delete a[t],t=e[u].db_reading,a[e[u].db_reading]?a[e[u].db_reading].push(m.toLocaleString()):a[e[u].db_reading]=[m.toLocaleString()]),c++}for(var h=0;h<o.length;h++){s[o[h][1]]=o[h][0],0!==o[h][0]&&(n+=o[h][0],r++)}return[s,Math.round(n/r),t,a[t]]}(e),r={label:t,fill:!1,backgroundColor:a[M],borderColor:a[M],data:n[0],avg:n[1],peak:n[2],peaktimes:n[3]};return M++,r}var _={showScale:!0,pointDot:!0,title:{display:!0,text:"Average Noise Levels in the Past 24 Hours (Hourly)",fontSize:20},scales:{yAxes:[{scaleLabel:{display:!0,labelString:"Noise (dB) Levels"}}]}};var j=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).changeText=function(){"Weekly Report"==a.state.text?a.setState({text:"Daily Report"}):a.setState({text:"Weekly Report"})},a.chartReference=r.a.createRef(),a.label=["12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"],a.state={text:"Weekly Report",chartData:{labels:a.label,datasets:[]},json_files:[]},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=[];fetch("https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/users").then((function(e){return e.json()})).then((function(e){return e})).then((function(a){var n=JSON.stringify(a);(n=JSON.parse(n)).forEach((function(a,r){var o;(o=a.user_id,fetch("https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/noise_observation/user/"+o).then((function(e){return e.json()})).then((function(e){return e}))).then((function(a){var r=JSON.stringify(a),o=O(r=JSON.parse(r),r[0].user_id);if(console.log(o),t.push(o),t.length==n.length)return e.setState({chartData:{datasets:t}}),t}))}))}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"lineChart"},r.a.createElement(E.a,{ref:this.chartReference,data:this.state.chartData,options:_,height:250,width:600})),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement("h3",null,"Daily Summary Table"),r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",{id:"table-header"},"Section Name"),r.a.createElement("th",{id:"table-header"},"Average dB"),r.a.createElement("th",{id:"table-header"},"Peak dB"),r.a.createElement("th",{id:"table-header"},"Peak dB Time")),this.state.chartData.datasets.map((function(e){return r.a.createElement("tr",{key:e.label},r.a.createElement("td",null,e.label),r.a.createElement("td",null,e.avg),r.a.createElement("td",null," ",e.peak),r.a.createElement("td",null,e.peaktimes))}))))))}}]),t}(r.a.Component),S=a(49),N=function(){var e=new Date;return r.a.createElement("div",null,r.a.createElement("div",{className:"no-print print-btn"},r.a.createElement(S.a,{variant:"info",size:"lg",onClick:function(e){e.preventDefault(),window.print()}},"Print report")),r.a.createElement("h1",null,"Your Noise Report Summary"),r.a.createElement("p",null,"Generated on ",r.a.createElement("b",null,e.toLocaleDateString())),r.a.createElement(j,null),r.a.createElement("br",null),r.a.createElement("br",null))},x=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Help"),r.a.createElement("p",null,"Please contact UCI's team Chubby Cats."),r.a.createElement("p",null,"ziv@uci.edu"))},A=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(h.a,null,r.a.createElement(b.a,{basename:"/"},r.a.createElement(p.a,{bg:"dark",variant:"dark",expand:"sm"},r.a.createElement(p.a.Brand,{as:b.b,to:"/"},"Wall Mount Tracking"),r.a.createElement(p.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(p.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(d.a,{className:"mr-auto"},r.a.createElement(d.a.Link,{as:b.c,to:"/host-website"},"Home"),r.a.createElement(d.a.Link,{as:b.c,to:"/report"},"Report"),r.a.createElement(d.a.Link,{as:b.c,to:"/help"},"Help")))),r.a.createElement("br",null),r.a.createElement(f.d,null,r.a.createElement(f.b,{exact:!0,path:"/host-website",component:w}),r.a.createElement(f.b,{exact:!0,path:"/report",component:N}),r.a.createElement(f.b,{exact:!0,path:"/help",component:x}),r.a.createElement(f.a,{from:"/",to:"/host-website"}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(b.a,null,r.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},54:function(e,t,a){},78:function(e,t,a){e.exports=a(184)},83:function(e,t,a){}},[[78,1,2]]]);
//# sourceMappingURL=main.77a5debf.chunk.js.map