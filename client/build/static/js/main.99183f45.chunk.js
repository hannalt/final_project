(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{113:function(e,t,s){"use strict";s.r(t);var n=s(7),a=s.n(n),r=s(47),i=s.n(r),o=(s(57),s(2)),c=s.n(o),u=s(9),l=s(48),h=s(17),d=s(49),p=s(52),b=s(51),j=s(50),m=s.n(j),g=(s(23),s(0)),f=function(){var e,t="clicked",s=document.body,n="light",a="dark";localStorage&&(e=localStorage.getItem("theme")),e===n||e===a?s.classList.add(e):s.classList.add(n);return Object(g.jsx)("button",{className:"dark"===e?t:"",id:"darkMode",onClick:function(r){return function(r){e===a?(s.classList.replace(a,n),r.target.classList.remove(t),localStorage.setItem("theme","light"),e=n):(s.classList.replace(n,a),r.target.classList.remove(t),localStorage.setItem("theme","dark"),e=a)}(r)},children:"Color Mode"})},v=function e(t,s,n,a,r,i){Object(h.a)(this,e),this.show=function(){this.p5.fill(this.red,this.green,this.blue),this.p5.ellipse(this.pos.x,this.pos.y,2*this.r,2*this.r),this.p5.fill(255),this.p5.textAlign(this.p5.CENTER),this.p5.textSize(3),this.p5.text(this.name,this.pos.x,this.pos.y+this.r)},this.update=function(){var e=this.p5.createVector(this.p5.mouseX-this.p5.width/2,this.p5.mouseY-this.p5.height/2);e.setMag(3),this.vel.lerp(e,.1),this.pos.add(this.vel)},this.constrain=function(){this.pos.x=this.p5.constrain(this.pos.x,-this.p5.width,this.p5.width),this.pos.y=this.p5.constrain(this.pos.y,-this.p5.height,this.p5.height)},this.eats=function(e){if(Math.sqrt(Math.pow(e.pos.x-this.pos.x,2)+Math.pow(e.pos.y-this.pos.y,2))<this.r+e.r&&this.r>e.r){var t=this.p5.PI*this.r*this.r+this.p5.PI*e.r*e.r;return this.r=this.p5.sqrt(t/this.p5.PI),!0}return!1},this.p5=t,this.pos=t.createVector(n,a),this.r=s,this.vel=t.createVector(0,0),this.red=t.random(35,255),this.blue=t.random(35,255),this.green=t.random(35,255),this.name=i,this.id=r,this.alive=!0},x=(s(60),s(95)),O=function(e){Object(p.a)(s,e);var t=Object(b.a)(s);function s(e){var n;return Object(h.a)(this,s),(n=t.call(this,e)).state={username:"",password:"",question:"",answer:"",attempting_answer:"",loggedin:!1,msg:"Put in your info!",register:!1,retrieving:!1,joke:"placeholder",playing:!1},n.handleChange=function(e){var t=e.target;n.setState(Object(l.a)({},t.name,t.value))},n.submitRegister=function(){var e=Object(u.a)(c.a.mark((function e(t){var s,a,r,i,o,u;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),s=n.state.username,a=n.state.password,r=n.state.question,i=n.state.answer,e.next=7,x.get("/api");case 7:if(o=e.sent,!o.data.map((function(e){return e.username})).includes(s)){e.next=13;break}return n.state.msg="That username is taken. Please try another!",n.resetUserInputs(),e.abrupt("return");case 13:if(!(s.indexOf(" ")>=0||a.indexOf(" ")>=0)){e.next=18;break}return n.state.msg="No whitespace allowed in username and password. Please try again!",n.resetUserInputs(),e.abrupt("return");case 18:if(""!==s&&""!==a&&""!==i&&""!==r){e.next=23;break}return n.state.msg="You have to fill out all fields. Please try again!",n.resetUserInputs(),e.abrupt("return");case 23:n.state.msg="Put in your info!",u={username:n.state.username,password:n.state.password,question:n.state.question,answer:n.state.answer},x({url:"/api/save",method:"POST",data:u}).then((function(){n.resetUserInputs()})).catch((function(){}));case 26:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.resetUserInputs=function(){n.setState({username:"",password:"",question:"",answer:""})},n.componentDidMount=function(){n.dosomething()},n.dosomething=function(){},n.submitLogin=function(){var e=Object(u.a)(c.a.mark((function e(t){var s,a,r,i,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log("submitlogin"),s=n.state.username,a=n.state.password,e.next=6,x.get("/api");case 6:if(r=e.sent,i=r.data.map((function(e){return{username:e.username,password:e.password,question:e.question,answer:e.answer}})),""!==s&&""!==a){e.next=12;break}return n.state.msg="You have to fill out all fields. Please try again!",n.resetUserInputs(),e.abrupt("return");case 12:if(void 0!=(o=i.find((function(e){return e.username===s})))){e.next=17;break}return n.state.msg="Wrong username. Try again or make a new account!",n.resetUserInputs(),e.abrupt("return");case 17:o.password===a?(n.getJoke(),n.setState({loggedin:!0,username:o.username,password:o.password,question:o.question,answer:o.answer}),n.state.msg="You are logged in!"):(n.state.msg="That was not correct. Try again!",n.resetUserInputs());case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.goToRegister=function(e){e.preventDefault(),n.setState({register:!0}),n.resetUserInputs()},n.goToLogin=function(e){e.preventDefault(),n.setState({register:!1,retrieving:!1,loggedin:!1,playing:!1}),n.resetUserInputs()},n.getPassword=function(){var e=Object(u.a)(c.a.mark((function e(t){var s,a,r,i;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),s=n.state.username,n.state.retrieving=!0,""!==s){e.next=7;break}return n.state.msg="Please go back to login, put in your username, then click the 'Get your Password' button again.",n.resetUserInputs(),e.abrupt("return");case 7:return n.state.msg="Put in your info!",e.next=10,x.get("/api");case 10:a=e.sent,r=a.data.map((function(e){return{username:e.username,password:e.password,question:e.question,answer:e.answer}})),void 0===(i=r.find((function(e){return e.username===s})))&&(n.state.msg="We don't have a user by that name. Go back and retry it or make a new account."),n.setState({question:i.question,answer:i.answer,password:i.password});case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.resetAttempting=function(){n.setState({attempting_answer:""})},n.submitRetrieving=function(){var e=Object(u.a)(c.a.mark((function e(t){var s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),s=t.target[0].value,n.state.answer===s?(n.state.msg="Good job! Your password is "+n.state.password+". Go back to Login!",n.resetUserInputs()):(n.state.msg="That was not right. Try again!",t.target[0].value="",n.resetAttempting());case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.getJoke=function(){var e=Object(u.a)(c.a.mark((function e(t){var s,a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.get("https://official-joke-api.appspot.com/random_joke");case 2:s=e.sent,a=s.data.punchline,r=s.data.setup,n.setState({joke:r+" "+a});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.onPlayGame=function(e){e.preventDefault(),n.setState({playing:!0})},n.canvasInfo={blob:void 0,zoom:1,blobs:[],counter:30,timer:void 0,interval:void 0},n.timeIt=function(){n.state.playing&&(n.canvasInfo.counter<=0?n.canvasInfo.counter=0:n.canvasInfo.counter--,n.canvasInfo.timer.html(n.canvasInfo.counter))},n.setup=function(e){n.canvasInfo.timer=e.select("#timer"),n.canvasInfo.timer.html(n.canvasInfo.counter),n.canvasInfo.interval=setInterval(n.timeIt,1e3);var t=e.createCanvas(600,600),s=(e.windowWidth-e.width)/2,a=(e.windowHeight-e.height)/2;t.position(s,a);for(var r=[],i=0;i<200;i++)r[i]=new v(e,e.random(3,5),e.random(-600,600),e.random(-600,600),i,"no user");n.canvasInfo.blobs=r,n.canvasInfo.blob=new v(e,13,e.random(600),e.random(600),6573454,n.state.username),console.log(n.canvasInfo.blob)},n.draw=function(e){if(n.canvasInfo.blob.alive){e.background(0),e.translate(e.width/2,e.height/2);var t=64/n.canvasInfo.blob.r;n.canvasInfo.zoom=e.lerp(n.canvasInfo.zoom,t,.02),e.scale(n.canvasInfo.zoom),e.translate(-n.canvasInfo.blob.pos.x,-n.canvasInfo.blob.pos.y);for(var s=n.canvasInfo.blobs.length-1;s>=0;s--){n.canvasInfo.blobs[s].id!==n.canvasInfo.id&&(n.canvasInfo.blob.eats(n.canvasInfo.blobs[s])?(n.canvasInfo.blobs.splice(s,1),n.canvasInfo.blobs.push(new v(e,e.random(1,5),e.random(-600,600),e.random(-600,600),s,"no user"))):n.canvasInfo.blobs[s].show())}n.canvasInfo.blob.show(),e.mouseIsPressed&&n.canvasInfo.blob.update(),n.canvasInfo.blob.constrain(),0===n.canvasInfo.counter&&(n.canvasInfo.blob.alive=!1)}else e.background(0),e.fill(n.canvasInfo.blob.red,n.canvasInfo.blob.green,n.canvasInfo.blob.blue),e.textSize(60),e.textAlign(e.CENTER),e.text("Game Over",300,300),e.textSize(30),e.text("Your Score:",300,400),e.text(Math.round(n.canvasInfo.blob.r),300,450)},n.goBack=function(e){e.preventDefault(),clearInterval(n.canvasInfo.interval),n.setState({register:!1,retrieving:!1,loggedin:!0,playing:!1}),n.canvasInfo.counter=30},n.myRef=a.a.createRef(),n}return Object(d.a)(s,[{key:"render",value:function(){return this.state.playing?Object(g.jsxs)("div",{className:"App",children:[Object(g.jsx)("h1",{children:"Play the Game!"}),Object(g.jsx)("p",{children:"You have these many seconds remaining:"}),Object(g.jsx)("h3",{id:"timer",children:"2:00"}),Object(g.jsx)("p",{children:"Eat as many balls as you can before time runs out!"}),Object(g.jsx)(m.a,{setup:this.setup,draw:this.draw,className:"App"}),Object(g.jsx)("button",{onClick:this.goBack,children:"Go Back"})]}):this.state.loggedin?Object(g.jsxs)("div",{className:"app",children:[Object(g.jsx)("h1",{children:"Welcome to my Game!"}),Object(g.jsx)(f,{}),Object(g.jsx)("div",{className:"menu",children:Object(g.jsx)("button",{onClick:this.goToLogin,children:"Log Out"})}),Object(g.jsx)("h3",{children:"Before you play here's a joke!"}),Object(g.jsx)("p",{children:this.state.joke}),Object(g.jsx)("button",{onClick:this.getJoke,children:"New Joke"}),Object(g.jsx)("br",{}),Object(g.jsx)("button",{onClick:this.onPlayGame,children:"Play the game!"})]}):this.state.retrieving?Object(g.jsxs)("div",{className:"app",children:[Object(g.jsx)("h2",{children:"Answer your security question"}),Object(g.jsx)("p",{children:this.state.question}),Object(g.jsxs)("form",{onSubmit:this.submitRetrieving,children:[Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsxs)("label",{children:["Answer:",Object(g.jsx)("br",{})]}),Object(g.jsx)("input",{type:"text",name:"attempting_answer",value:this.state.attempting_answer,onChange:this.handleChange,placeholder:"Fluffy"})]}),Object(g.jsx)("p",{children:this.state.msg}),Object(g.jsx)("button",{children:"Submit"}),Object(g.jsxs)("div",{children:[Object(g.jsx)("p",{children:"Got it?"}),Object(g.jsx)("button",{onClick:this.goToLogin,children:"Log in!"})]})]})]}):this.state.loggedin||this.state.register?!this.state.loggedin&&this.state.register?Object(g.jsxs)("div",{className:"app",children:[Object(g.jsx)("h2",{children:"Make a User Profile"}),Object(g.jsxs)("form",{onSubmit:this.submitRegister,children:[Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsxs)("label",{children:["Username:",Object(g.jsx)("br",{})]}),Object(g.jsx)("input",{type:"text",name:"username",placeholder:"john_smith",value:this.state.username,onChange:this.handleChange})]}),Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsxs)("label",{children:["Password:",Object(g.jsx)("br",{})]}),Object(g.jsx)("input",{type:"text",name:"password",placeholder:"unsafe123",value:this.state.password,onChange:this.handleChange})]}),Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsxs)("label",{children:["Security Question:",Object(g.jsx)("br",{})]}),Object(g.jsx)("input",{type:"text",name:"question",placeholder:"Name of my first cat?",value:this.state.question,onChange:this.handleChange})]}),Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsxs)("label",{children:["Answer:",Object(g.jsx)("br",{})]}),Object(g.jsx)("input",{type:"text",name:"answer",placeholder:"Fluffy",value:this.state.answer,onChange:this.handleChange})]}),Object(g.jsx)("p",{children:this.state.msg}),Object(g.jsx)("button",{children:"Create"}),Object(g.jsxs)("div",{children:[Object(g.jsx)("p",{children:"Have an account?"}),Object(g.jsx)("button",{onClick:this.goToLogin,children:"Log in!"})]})]})]}):void 0:Object(g.jsxs)("div",{className:"app",children:[Object(g.jsx)("h2",{children:"Login"}),Object(g.jsxs)("form",{onSubmit:this.submitLogin,children:[Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsxs)("label",{children:["Username:",Object(g.jsx)("br",{})]}),Object(g.jsx)("input",{type:"text",name:"username",placeholder:"john_smith",value:this.state.username,onChange:this.handleChange})]}),Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsxs)("label",{children:["Password:",Object(g.jsx)("br",{})]}),Object(g.jsx)("input",{type:"text",name:"password",placeholder:"unsafe123",value:this.state.password,onChange:this.handleChange})]}),Object(g.jsx)("p",{children:this.state.msg}),Object(g.jsx)("button",{children:"Log in"}),Object(g.jsxs)("div",{children:[Object(g.jsx)("p",{children:"Don't have an account?"}),Object(g.jsx)("button",{onClick:this.goToRegister,children:"Make one!"})]}),Object(g.jsxs)("div",{children:[Object(g.jsx)("p",{children:"Forgot your info? Put in your username we'll help!"}),Object(g.jsx)("button",{onClick:this.getPassword,children:"Get your password!"})]})]})]})}}]),s}(a.a.Component),w=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,114)).then((function(t){var s=t.getCLS,n=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;s(e),n(e),a(e),r(e),i(e)}))};i.a.render(Object(g.jsx)(a.a.StrictMode,{children:Object(g.jsx)(O,{})}),document.getElementById("root")),w()},23:function(e,t,s){},57:function(e,t,s){}},[[113,1,2]]]);
//# sourceMappingURL=main.99183f45.chunk.js.map