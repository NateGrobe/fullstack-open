(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),u=t.n(r),c=t(2),l=t(3),i=t.n(l),m="/api/persons",d=function(){return i.a.get(m).then((function(e){return e.data}))},s=function(e){return i.a.post(m,e).then((function(e){return e.data}))},f=function(e){i.a.delete("".concat(m,"/").concat(e))},b=function(e,n){return i.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){var n=e.value,t=e.onChange;return o.a.createElement("div",null,"filter shown with ",o.a.createElement("input",{value:n,onChange:t}))},p=function(e){return o.a.createElement("div",null,o.a.createElement("form",{onSubmit:e.onSubmit},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:e.newNameVal,onChange:e.onNameChange})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:e.newNumVal,onChange:e.onNumChange})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add"))))},v=function(e){var n=e.person,t=e.handleClick;return o.a.createElement("div",null,n.name," ",n.number," ",o.a.createElement("button",{onClick:t},"delete"))},g=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{style:{color:"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"}},n)},E=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{style:{color:"red",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"}},n)},w=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],u=Object(a.useState)(""),l=Object(c.a)(u,2),i=l[0],m=l[1],w=Object(a.useState)(""),k=Object(c.a)(w,2),C=k[0],j=k[1],O=Object(a.useState)(""),S=Object(c.a)(O,2),y=S[0],x=S[1],N=Object(a.useState)(null),T=Object(c.a)(N,2),V=T[0],B=T[1],z=Object(a.useState)(null),A=Object(c.a)(z,2),D=A[0],I=A[1];Object(a.useEffect)((function(){d().then((function(e){r(e)}))}),[]);var J=t.filter((function(e){return e.name.toUpperCase().includes(y.toUpperCase())}));return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(g,{message:V}),o.a.createElement(E,{message:D}),o.a.createElement(h,{value:y,onChange:function(e){return x(e.target.value)}}),o.a.createElement("h2",null,"Add a new"),o.a.createElement(p,{onSubmit:function(e){e.preventDefault();var n={name:i,number:C},a=t.find((function(e){return e.name===i}));if(a)if(a.number!==C){window.confirm("".concat(i," is already added to the phonebook, replace the old number with a new on ?"))&&(b(a.id,n).then((function(e){r(t.map((function(n){return n.id!==a.id?n:e}))),B("".concat(i,"'s number has been changed to ").concat(C)),setTimeout((function(){B(null)}),5e3)})).catch((function(e){I("Information of ".concat(i," has already been removed from server")),setTimeout((function(){I(null)}),5e3)})),m(""),j(""))}else m(""),j(""),alert("".concat(i," is already added to the phonebook"));else s(n).then((function(e){r(t.concat(e)),B("Added ".concat(i)),setTimeout((function(){B(null)}),5e3)})),m(""),j("")},newNameVal:i,onNameChange:function(e){return m(e.target.value)},newNumVal:C,onNumChange:function(e){return j(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),J.map((function(e){return o.a.createElement(v,{key:e.name,person:e,handleClick:function(){return n=e,void(window.confirm("Delete ".concat(n.name,"?"))&&(f(n.id),B("".concat(n.name," has been removed from the phonebook")),setTimeout((function(){B(null)}),5e3),r(t.filter((function(e){return e.id!==n.id})))));var n}})})))};u.a.render(o.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.7a310579.chunk.js.map