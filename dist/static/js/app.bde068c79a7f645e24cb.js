webpackJsonp([1],{117:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(25),i=a(23),r=a.n(i);e.default={name:"app",data:function(){return{drawer:null,items:[{title:"Overview",icon:"fa-laptop",url:"/",exact:!0},{title:"Chat",icon:"fa-weixin",url:"/chat",exact:!1},{title:"Library",icon:"fa-book",url:"/library",exact:!1}],mini:!1,right:null,loginForm:!1,logout:!0,user:null}},methods:{redirectUrl:function(t){s.a.push(t)},toggleLogin:function(){this.loginForm=!0},closeLogin:function(){this.loginForm=!1},logOut:function(){this.logout=!this.logout,r.a.auth().signOut()}},created:function(){var t=this;r.a.auth().onAuthStateChanged(function(e){e?(t.logout=!1,t.user=e):(t.logout=!0,t.mini=!1,t.drawer=null,t.right=null,s.a.push("/login"))})}}},118:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"cards",props:["card"]}},119:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(37),i=s.a.ref("books");e.default={name:"book-shelf",firebase:{books:i},data:function(){return{newBook:{title:"",description:"",author:""},dialog:!1}},methods:{addBook:function(){i.push(this.newBook),this.newBook.title="",this.newBook.author="",this.newBook.description="",this.dialog=!1},removeBook:function(t){1==confirm("Do you wish to delete this book?")&&i.child(t[".key"]).remove()}}}},120:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(37),i=a(23),r=a.n(i),n=r.a.auth(),o="",l="",c=s.a.ref("users");e.default={name:"chat-room",firebase:{users:c},data:function(){return{user:null,newChat:{user:"",email:"",message:"",avatar:"",channel:""},e1:"general",channelChat:null,channelSubscribe:null}},methods:{addChat:function(){""!=this.newChat.message.trim()&&""!=this.newChat.user.trim()?(s.a.ref("chatlogs/"+this.e1).push(this.newChat),this.newChat.message=""):alert("Please Enter Message and your Name!")},removeChat:function(t){1==confirm("Do you wish to delete this message?")&&s.a.ref("chatlogs/"+this.e1).child(t[".key"]).remove()},loadChannel:function(){this.getUserKey(),this.$bindAsArray("channelChat",s.a.ref("chatlogs/"+this.e1)),this.$bindAsArray("channelSubscribe",s.a.ref("users").orderByChild("location").equalTo(this.e1))},getUserKey:function(){for(var t=0;t<this.users.length;t++)this.newChat.email==this.users[t].email&&(l=this.users[t][".key"],""==o?(console.log(l),o=s.a.ref("users/"+l),o.update({location:this.e1})):o.update({location:this.e1}))}},watch:{e1:function(){this.newChat.channel=this.e1,this.loadChannel()}},computed:{capitalizeFirstLetter:function(){return this.e1.charAt(0).toUpperCase()+this.e1.slice(1)}},created:function(){var t=this;n.onAuthStateChanged(function(e){e&&(t.user=e,t.newChat.email=t.user.email,t.newChat.user=t.user.displayName,t.newChat.avatar=t.user.photoURL,t.newChat.channel=t.e1,t.loadChannel())}),o.onDisconnect().update({online:!1,location:""})},mounted:function(){this.$nextTick(function(){this.getUserKey()})}}},121:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(201),i=a.n(s);e.default={name:"overview",components:{Cards:i.a},data:function(){return{cards:[{description:"Hey, I'm John. I just started learning vue. I have been always a back-end developer, so this kind of stuffs is new to me. This gives me a chance to showcase my attitude towards working and learning. I am eager to learn and to build wonderful Apps.",title:"Overview",visible:!0},{description:"Built using VueJs, Vuetify, and the database used is FireBase. A user can join any of our channels and view each messages from each channels that they are subscribed to.",title:"Chat App",visible:!1}]}}}},122:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(23),i=a.n(s),r=a(37),n=a(25),o=i.a.auth();e.default={name:"register",data:function(){return{newUser:{email:"",password:"",displayName:""},message:"",hasErrors:!1,isSuccess:!1}},methods:{Register:function(t){var e=this;if(e.message="",e.hasErrors=!1,""===e.newUser.email||""===e.newUser.password||""===e.newUser.displayName)return e.message="Please provide the name, email, and password",void(e.hasErrors=!0);o.createUserWithEmailAndPassword(e.newUser.email,e.newUser.password).then(function(t){var a="https://randomuser.me/api/portraits/men/"+Math.ceil(100*Math.random())+".jpg";t.updateProfile({displayName:e.newUser.displayName,photoURL:a}),r.a.ref("users").push({email:e.newUser.email,online:!0,location:"",user:e.newUser.displayName,avatar:a}),e.message="Successfully registered.",e.isSuccess=!0,n.a.push("/")}).catch(function(t){e.message=t.message,e.hasErrors=!0})}}}},123:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(23),i=a.n(s),r=a(25),n=i.a.auth();e.default={name:"register",data:function(){return{User:{email:"",password:""},message:"",hasErrors:!1,isSuccess:!1}},methods:{Login:function(t){var e=this;if(e.message="",e.hasErrors=!1,""===e.email||""===e.password)return e.message="Please provide the email and password",void(e.hasErrors=!0);n.signInWithEmailAndPassword(e.User.email,e.User.password).then(function(t){e.message="Successfully Login.",e.isSuccess=!0,r.a.push("/")}).catch(function(t){e.message=t.message,e.hasErrors=!0})}}}},124:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(52),i=a(97),r=a.n(i),n=a(25),o=a(99),l=a.n(o),c=a(98),u=a.n(c),v=a(96);a.n(v);s.a.use(u.a),s.a.use(l.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:n.a,template:"<App/>",components:{App:r.a}})},125:function(t,e){},126:function(t,e){},127:function(t,e){},128:function(t,e){},129:function(t,e){},130:function(t,e){},201:function(t,e,a){var s=a(17)(a(118),a(207),null,null,null);t.exports=s.exports},202:function(t,e,a){var s=a(17)(a(119),a(211),null,null,null);t.exports=s.exports},203:function(t,e,a){function s(t){a(129)}var i=a(17)(a(120),a(212),s,"data-v-a602e7d0",null);t.exports=i.exports},204:function(t,e,a){function s(t){a(126)}var i=a(17)(a(121),a(209),s,"data-v-24325a3e",null);t.exports=i.exports},205:function(t,e,a){function s(t){a(125)}var i=a(17)(a(122),a(208),s,"data-v-183cf668",null);t.exports=i.exports},206:function(t,e,a){function s(t){a(130)}var i=a(17)(a(123),a(213),s,"data-v-bc3d31b2",null);t.exports=i.exports},207:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"dark--text"},[a("v-card-title",{attrs:{"primary-title":"primary-title"}},[a("div",{staticClass:"headline"},[t._t("title")],2),a("br"),a("div",{staticClass:"content"},[t._t("default")],2)]),a("v-divider"),a("v-card-actions",{staticClass:"dark"},[a("v-spacer",[a("v-btn",{attrs:{icon:"icon"},nativeOn:{click:function(e){t.card.visible=!t.card.visible}}},[a("v-icon",[t._v(t._s(t.card.visible?"fa-chevron-up":"fa-chevron-down"))])],1)],1)],1)],1)},staticRenderFns:[]}},208:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-layout",{attrs:{row:"row"}},[a("v-flex",{staticClass:"blue frm-container img-container",attrs:{xs6:"xs6"}},[a("div",{staticClass:"txtHolder"},[a("h2",{staticClass:"white--text"},[a("strong",[t._v("Wutz")])]),a("h2",{staticClass:"white--text",staticStyle:{"line-height":"10px"}},[a("strong",[t._v("Application")])]),a("br"),a("p",{staticClass:"white--text"},[t._v("A place for every conversation.")]),a("p",{staticClass:"white--text"},[t._v("Have an account already?")]),a("v-btn",{staticClass:"lighten-1 white--text text-xs-right",attrs:{router:"router",to:"/login",primary:"primary",flat:"flat"}},[t._v("Click here to sign in")])],1)]),a("v-flex",{staticClass:"frm-container",attrs:{xs6:"xs6"}},[a("h3",{staticClass:"blue--text"},[t._v("Create Account")]),a("div",{staticClass:"mb-2"},[a("i",[t._v("Don't have an account yet? Create your account now.")])]),a("v-alert",{attrs:{error:"error",value:t.hasErrors}},[t._v(t._s(t.message))]),a("v-alert",{attrs:{success:"success",value:t.isSuccess}},[t._v(t._s(t.message))]),a("v-text-field",{attrs:{name:"displayName",label:"Name"},model:{value:t.newUser.displayName,callback:function(e){t.newUser.displayName=e},expression:"newUser.displayName"}}),a("v-text-field",{attrs:{name:"email",label:"Email Address"},model:{value:t.newUser.email,callback:function(e){t.newUser.email=e},expression:"newUser.email"}}),a("v-text-field",{attrs:{name:"password",type:"password",label:"Password"},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.Register(e)}},model:{value:t.newUser.password,callback:function(e){t.newUser.password=e},expression:"newUser.password"}}),a("v-btn",{attrs:{primary:"primary",dark:"dark"},nativeOn:{click:function(e){t.Register(e)}}},[t._v("Create Account")])],1)],1)},staticRenderFns:[]}},209:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",t._l(t.cards,function(e){return a("v-layout",{key:e.title,staticClass:"overview-list",attrs:{row:"row"}},[a("v-flex",{attrs:{xs10:"xs10","offset-xs1":"offset-xs1"}},[a("cards",{attrs:{card:e}},[a("p",{slot:"title"},[t._v(t._s(e.title))]),a("p",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"card.visible"}]},[t._v(t._s(e.description))])])],1)],1)}))},staticRenderFns:[]}},210:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{standalone:"standalone",id:"wutz-app"}},[a("v-navigation-drawer",{attrs:{temporary:"temporary","mini-variant":t.mini,light:"light",overflow:"overflow",absolute:"absolute"},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",{staticClass:"pa-0"},[t.mini?a("v-list-tile",{nativeOn:{click:function(e){e.stopPropagation(),t.mini=!t.mini}}},[a("v-list-tile-action",[a("v-icon",{attrs:{light:"light"}},[t._v("chevron_right")])],1)],1):t._e(),a("v-list-tile",{attrs:{avatar:"avatar",tag:"div"}},[a("v-list-tile-avatar",[a("img",{attrs:{src:t.logout?"":t.user.photoURL}})]),a("v-list-tile-content",[a("v-list-tile-title",[t._v(t._s(t.logout?"":t.user.displayName))])],1),a("v-list-tile-action",[a("v-btn",{attrs:{icon:"icon"},nativeOn:{click:function(e){e.stopPropagation(),t.mini=!t.mini}}},[a("v-icon",[t._v("chevron_left")])],1)],1)],1)],1),a("v-list",{staticClass:"pt-0",attrs:{dense:"dense"}},[a("v-divider",{attrs:{light:"light"}}),t._l(t.items,function(e){return a("v-list-tile",{key:e.title,attrs:{to:e.url,exact:e.exact,router:"router"}},[a("v-list-tile-action",[a("v-icon",[t._v(t._s(e.icon))])],1),a("v-list-tile-content",[a("v-list-tile-title",[t._v(t._s(e.title))])],1)],1)}),a("v-list-tile",{on:{click:t.logOut}},[a("v-list-tile-action",[a("v-icon",[t._v("fa-sign-out")])],1),a("v-list-tile-content",[a("v-list-tile-title",[t._v("Log Out")])],1)],1)],2)],1),a("v-toolbar",{attrs:{fixed:"fixed",light:"light"}},[t.logout?t._e():a("v-toolbar-side-icon",{nativeOn:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),a("v-toolbar-title",[t._v("Wutz App")]),a("v-spacer"),a("v-toolbar-items",{staticClass:"hidden-sm-and-down"},[t.logout?a("v-btn",{attrs:{flat:"flat"},on:{click:function(e){t.redirectUrl("login")}}},[t._v("Login")]):t._e(),t.logout?a("v-btn",{attrs:{flat:"flat"},on:{click:function(e){t.redirectUrl("register")}}},[t._v("Register")]):t._e()],1)],1),a("main",[a("v-container",[a("v-layout",[a("v-flex",{attrs:{md12:"md12"}},[a("router-view")],1)],1)],1)],1)],1)},staticRenderFns:[]}},211:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"elevation-0"},[a("v-card-text",[a("h4",{staticClass:"blue--text"},[t._v("Library")]),a("v-subheader",[t._v("VueJs & Firebase")]),a("v-layout",{attrs:{row:"row","justify-center":"justify-center"}},[a("v-btn",{attrs:{primary:"primary"},nativeOn:{click:function(e){t.dialog=!t.dialog}}},[t._v("New Book")]),a("v-dialog",{attrs:{persistent:"persistent",width:"600px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v("Book Details")])]),a("v-card-text",[a("v-text-field",{attrs:{label:"Title",required:"required"},model:{value:t.newBook.title,callback:function(e){t.newBook.title=e},expression:"newBook.title"}}),a("v-text-field",{attrs:{label:"Description",required:"required"},model:{value:t.newBook.description,callback:function(e){t.newBook.description=e},expression:"newBook.description"}}),a("v-text-field",{attrs:{label:"Author",required:"required"},model:{value:t.newBook.author,callback:function(e){t.newBook.author=e},expression:"newBook.author"}})],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"blue--text darken-1",attrs:{flat:"flat"},nativeOn:{click:function(e){t.dialog=!1}}},[t._v("Close")]),a("v-btn",{staticClass:"darken-1",attrs:{primary:"primary"},nativeOn:{click:function(e){t.addBook(e)}}},[t._v("Save")])],1)],1)],1)],1),a("v-container",{attrs:{fluid:"fluid","grid-list-md":"grid-list-md"}},[a("v-layout",{attrs:{row:"row",wrap:"wrap"}},t._l(t.books,function(e){return a("v-flex",t._b({key:e.title},"v-flex",(s={},s["xs"+t.books.flex]=!0,s),!1),[a("v-card",{staticClass:"dark--text"},[a("v-card-title",{attrs:{"primary-title":"primary-title"}},[a("div",{staticClass:"headline",domProps:{textContent:t._s(e.title)}}),a("v-divider"),a("div",{domProps:{textContent:t._s(e.description)}}),a("small",{domProps:{textContent:t._s(e.author)}})],1),a("v-divider"),a("v-card-actions",{staticClass:"dark"},[a("v-spacer",[a("v-btn",{staticClass:"red--text",attrs:{icon:"icon"},on:{click:function(a){t.removeBook(e)}}},[a("v-icon",[t._v("fa-trash")])],1)],1)],1)],1)],1);var s}))],1)],1)],1)},staticRenderFns:[]}},212:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"elevation-0"},[a("v-card-text",{attrs:{xs6:"xs6"}},[a("h4",{staticClass:"blue--text"},[t._v("Chat Room")]),a("v-tabs",{attrs:{dark:"dark",fixed:"fixed",icons:"icons",centered:"centered"}},[a("v-tabs-bar",{staticClass:"blue",slot:"activators"},[a("v-tabs-slider",{staticClass:"yellow"}),a("v-tabs-item",{attrs:{href:"#tab-1"},nativeOn:{click:function(e){t.e1="general"}}},[a("v-icon",[t._v("fa-briefcase")]),a("p",[t._v("General")])],1),a("v-tabs-item",{attrs:{href:"#tab-2"},nativeOn:{click:function(e){t.e1="development"}}},[a("v-icon",[t._v("fa-flash")]),a("p",[t._v("Development")])],1),a("v-tabs-item",{attrs:{href:"#tab-3"},nativeOn:{click:function(e){t.e1="designs"}}},[a("v-icon",[t._v("ondemand_video")]),a("p",[t._v("Designs")])],1)],1),t._l(3,function(e){return a("v-tabs-content",{key:e,attrs:{id:"tab-"+e}},[a("v-card",{attrs:{flat:"flat"}},[a("v-card-text",[a("v-subheader",[t._v("You are now chatting in "+t._s(t.capitalizeFirstLetter)+"'s Channel")]),a("v-container",[a("v-layout",{attrs:{row:"row"}},[a("v-flex",{attrs:{xs6:"xs6"}},[a("v-list",{attrs:{"three-line":"three-line"}},[a("v-subheader",[t._v("Today")]),a("v-divider"),a("div",{staticClass:"our-container",attrs:{id:"chatlogs"}},[t._l(t.channelChat,function(e){return[a("v-list-tile",{key:e.user,attrs:{avatar:"avatar"}},[a("v-list-tile-avatar",[a("img",{attrs:{src:e.avatar}})]),a("v-list-tile-content",[a("v-list-tile-title",{domProps:{innerHTML:t._s(e.user)}}),a("v-list-tile-sub-title",{domProps:{innerHTML:t._s(e.message)}})],1),a("v-list-tile-action",[e.email===t.user.email?a("v-btn",{attrs:{icon:"icon",ripple:"ripple"},on:{click:function(a){t.removeChat(e)}}},[a("v-icon",{staticClass:"red--text text--lighten-2",staticStyle:{"font-size":"20px"}},[t._v("fa-trash")])],1):t._e()],1)],1),a("v-divider")]})],2)],1)],1),a("v-flex",{attrs:{xs6:"xs6"}},[a("v-list",{attrs:{"three-line":"three-line"}},[a("v-subheader",[t._v("Subscribed in channel: "+t._s(t.capitalizeFirstLetter))]),a("v-divider"),a("div",{staticClass:"our-container",attrs:{id:"chatlogs"}},[t._l(t.channelSubscribe,function(e){return[a("v-list-tile",{key:e.user,attrs:{avatar:"avatar"}},[a("v-list-tile-avatar",[a("img",{attrs:{src:e.avatar}})]),a("v-list-tile-content",[a("v-list-tile-title",{domProps:{innerHTML:t._s(e.user)}})],1)],1),a("v-divider")]})],2)],1)],1)],1)],1),a("v-container",{attrs:{fluid:"fluid",height:"500px"}},[a("v-layout",{attrs:{row:"row"}},[a("v-flex",{attrs:{xs6:"xs6"}},[a("v-text-field",{attrs:{name:"username",label:"Name",readonly:"readonly"},model:{value:t.newChat.user,callback:function(e){t.newChat.user=e},expression:"newChat.user"}})],1)],1),a("v-layout",{attrs:{row:"row"}},[a("v-flex",{attrs:{xs6:"xs6"}},[a("v-text-field",{attrs:{name:"input-1",label:"Your message here..",textarea:"textarea"},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.addChat(e)}},model:{value:t.newChat.message,callback:function(e){t.newChat.message=e},expression:"newChat.message"}})],1)],1),a("v-layout",{attrs:{row:"row"}},[a("v-flex",{attrs:{xs6:"xs6"}},[a("v-btn",{attrs:{primary:"primary",dark:"dark"},on:{click:t.addChat}},[a("span",[t._v("Send"),a("v-icon",{staticStyle:{"font-size":"20px, line-height: 10px"}},[t._v("send")])],1)])],1)],1)],1)],1)],1)],1)})],2)],1)],1)},staticRenderFns:[]}},213:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-layout",{attrs:{row:"row"}},[a("v-flex",{staticClass:"blue frm-container img-container",attrs:{xs6:"xs6"}},[a("div",{staticClass:"txtHolder"},[a("h2",{staticClass:"white--text"},[a("strong",[t._v("Wutz")])]),a("h2",{staticClass:"white--text",staticStyle:{"line-height":"10px"}},[a("strong",[t._v("Application")])]),a("br"),a("p",{staticClass:"white--text"},[t._v("A place for every conversation.")]),a("p",{staticClass:"white--text"},[t._v("Join us now...")]),a("v-btn",{staticClass:"white--text lighten-1",attrs:{flat:"flat",router:"router",to:"/register"}},[t._v("click here to create your account")])],1)]),a("v-flex",{staticClass:"frm-container",attrs:{xs6:"xs6"}},[a("h3",{staticClass:"blue--text"},[t._v("Sign in")]),a("div",{staticClass:"mb-2"},[a("i",[t._v("Let's start chatting.")])]),a("v-alert",{attrs:{error:"error",value:t.hasErrors}},[t._v(t._s(t.message))]),a("v-alert",{attrs:{success:"success",value:t.isSuccess}},[t._v(t._s(t.message))]),a("v-text-field",{attrs:{name:"email",label:"Email Address"},model:{value:t.User.email,callback:function(e){t.User.email=e},expression:"User.email"}}),a("v-text-field",{attrs:{name:"password",type:"password",label:"Password"},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.Login(e)}},model:{value:t.User.password,callback:function(e){t.User.password=e},expression:"User.password"}}),a("v-btn",{attrs:{primary:"primary",dark:"dark"},on:{click:function(e){e.preventDefault(),t.Login(e)}}},[t._v("Sign in")])],1)],1)},staticRenderFns:[]}},25:function(t,e,a){"use strict";var s=a(52),i=a(214),r=a(204),n=a.n(r),o=a(203),l=a.n(o),c=a(202),u=a.n(c),v=a(205),d=a.n(v),h=a(206),f=a.n(h);s.a.use(i.a),e.a=new i.a({routes:[{path:"/",component:n.a},{path:"/chat",component:l.a},{path:"/library",component:u.a},{path:"/register",component:d.a},{path:"/login",component:f.a}],mode:"history",linkActiveClass:"is-active"})},37:function(t,e,a){"use strict";var s=a(23),i=a.n(s),r={apiKey:"AIzaSyA_ZzunWjPVMqXsY6DlTP3cGjRjziDnnks",authDomain:"chat-room-970c7.firebaseapp.com",databaseURL:"https://chat-room-970c7.firebaseio.com",projectId:"chat-room-970c7",storageBucket:"chat-room-970c7.appspot.com",messagingSenderId:"1080133854031"},n=i.a.initializeApp(r),o=n.database();e.a=o},97:function(t,e,a){function s(t){a(128),a(127)}var i=a(17)(a(117),a(210),s,null,null);t.exports=i.exports}},[124]);
//# sourceMappingURL=app.bde068c79a7f645e24cb.js.map