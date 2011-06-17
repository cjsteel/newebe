(function(){var e,m,i,j,n,o,p,k,f,r=Object.prototype.hasOwnProperty,g=function(b,a){function c(){this.constructor=b}for(var d in a)if(r.call(a,d))b[d]=a[d];c.prototype=a.prototype;b.prototype=new c;b.__super__=a.prototype;return b};o=function(){function b(){var a;a=document.createElement("div");a.id="info-dialog";a.className="dialog";a.innerHTML="Test";$("body").prepend(a);this.element=$("#info-dialog");this.element.hide()}b.prototype.display=function(a){this.element.empty();this.element.append(a);
this.element.show();return this.element.fadeOut(4E3)};return b}();n=function(){function b(){var a;a=document.createElement("div");a.id="confirmation-dialog";a.className="dialog";a.innerHTML='<div id="confirmation-text"></div>';a.innerHTML+='<div id="confirmation-buttons"><span href="" id="confirmation-yes">Yes</span><span href="" id="confirmation-no">No</span></div>';$("body").prepend(a);this.element=$("#confirmation-dialog");this.element.hide();this.setNoButton()}b.prototype.setNoButton=function(){var a;
a=this.element;return $("#confirmation-no").click(function(){a.fadeOut();return false})};b.prototype.display=function(a,c){$("#confirmation-text").empty();$("#confirmation-text").append("<span>"+a+"</span>");$("#confirmation-yes").click(c);return this.element.show()};b.prototype.hide=function(){return this.element.fadeOut()};return b}();p=function(){function b(){var a;a=document.createElement("div");a.id="loading-indicator";a.innerHTML='<img src="/static/images/clock_32.png" />';$("body").prepend(a);
this.element=$("#loading-indicator");this.element.hide()}b.prototype.display=function(){return this.element.show()};b.prototype.hide=function(){return this.element.hide()};return b}();m=function(){function b(a){var c;b.__super__.constructor.apply(this,arguments);this.set("author",a.author);this.set("authorKey",a.authorKey);this.set("date",a.date);this.set("docId",a.docId);this.set("verb",a.verb);this.set("docType",a.docType);this.set("method",a.method);this.set("errors",a.errors);this.set("mid",a._id);
this.attributes.mid=a._id;this.setDisplayDate();this.id=a._id;if(a.date){c=Date.parseExact(a.date,"yyyy-MM-ddTHH:mm:ssZ");c=c.toString("yyyy-MM-dd-HH-mm-ss/");this.attributes.urlDate=c}this.attributes.errorNumber="";if(a.errors.length)this.attributes.errorNumber="("+a.errors.length+")"}g(b,Backbone.Model);b.prototype.url="/activities/all/";b.prototype.getDisplayDate=function(){return this.attributes.displayDate};b.prototype.setDisplayDate=function(){return this.setDisplayDateFromDbDate(this.attributes.date)};
b.prototype.setDisplayDateFromDbDate=function(a){a=Date.parseExact(a,"yyyy-MM-ddTHH:mm:ssZ");this.attributes.displayDate=a.toString("dd MMM yyyy, HH:mm");return a};b.prototype.getAuthor=function(){return this.get("author")};b.prototype.getDate=function(){return this.get("date")};b.prototype.getUrlDate=function(){return this.attributes.urlDate};b.prototype.getDocType=function(){return this.attributes.docType};b.prototype.getDocId=function(){return this.get("docId")};b.prototype.getMethod=function(){return this.get("method")};
b.prototype.getAuthorKey=function(){return this.get("authorKey")};b.prototype.getMid=function(){return this.get("mid")};b.prototype.getErrors=function(){return this.get("errors")};return b}();i=function(){function b(){b.__super__.constructor.apply(this,arguments)}g(b,Backbone.Collection);b.prototype.model=m;b.prototype.url="/activities/all/";b.prototype.comparator=function(a){return a.getDate()};b.prototype.parse=function(a){return a.rows};return b}();j=function(){function b(a){this.model=a;b.__super__.constructor.apply(this,
arguments);this.id=this.model.id;this.model.view=this}g(b,Backbone.View);b.prototype.tagName="div";b.prototype.className="activity-row";b.prototype.template=_.template('<span class="activity-date">\n <%= displayDate %> -\n</span>\n<a href="#" class="activity-author"><%= author %></a>\n<span class="activity-verb"><%= verb %></span>\na\n<a href="#" class="doc-ref">\n<span class="activity-verb"><%= docType %></span>\n</a>\n<span class="activity-error-number">\n<%= errorNumber %>\n</span>\n<div class="activity-errors">\nErrors :\n<% _.each(errors, function(error) { %>\n  <div class="activity-error">\n    <%= error.contactName %> |\n    <%= error.contactUrl %> ->\n    <span id="<%= error.contactKey%>"\n          class="activity-error-resend">\n      resend\n    </span>\n</div>\n<% }); %>\n</div>');
b.prototype.events={mouseover:"onMouseOver",mouseout:"onMouseOut","click .doc-ref":"onDocRefClicked","click .activity-author":"onActivityAuthorClicked","click .activity-error-number":"onErrorNumberClicked","click .activity-error-resend":"onErrorResendClicked"};b.prototype.onMouseOver=function(){return this};b.prototype.onMouseOut=function(){return this};b.prototype.onDocRefClicked=function(a){this.model.getDocType()==="micropost"&&$.get("/news/micropost/"+this.model.getDocId()+"/html/",function(c){return $("#activities-preview").html(c)});
a.preventDefault();return false};b.prototype.onActivityAuthorClicked=function(a){$.get("/contacts/render/"+this.model.getAuthorKey()+"/",function(c){return $("#activities-preview").html(c)});a.preventDefault();return false};b.prototype.onErrorNumberClicked=function(){return this.$(".activity-errors").show()};b.prototype.onErrorResendClicked=function(a){var c,d,h,q,l;if(this.model.getDocType()==="micropost")switch(this.model.getMethod()){case "POST":$("#"+a.target.id).html("resending...");return $.ajax({type:"POST",
url:"/news/micropost/"+this.model.getDocId()+"/retry/",data:'{"contactId": "'+a.target.id+'", "activityId":"'+this.model.id+'"}',dataType:"json",success:function(){return $("#"+a.target.id).html("resending succeeds.")},error:function(){k.display("Sending data fails again.");return $("#"+a.target.id).html("resend")}});case "DELETE":d="";l=this.model.getErrors();h=0;for(q=l.length;h<q;h++){c=l[h];if(c.contactKey&&c.contactKey===a.target.id)d=c.extra}$("#"+a.target.id).html("resending...");return $.ajax({type:"PUT",
url:"/news/micropost/"+this.model.getDocId()+"/retry/",data:'{"contactId": "'+a.target.id+'", "activityId":"'+this.model.id+'", "extra":"'+d+'"}',dataType:"json",success:function(){return $("#"+a.target.id).html("resending succeeds.")},error:function(){k.display("Sending data fails again.");return $("#"+a.target.id).html("resend")}})}};b.prototype.render=function(){this.model.getDisplayDate()||this.model.setDisplayDate();$(this.el).html(this.template(this.model.toJSON()));this.$(".activity-errors").hide();
return this.el};return b}();e=function(){function b(){b.__super__.constructor.apply(this,arguments)}g(b,Backbone.View);b.prototype.el=$("#activities");b.prototype.events={"click #activities-my-button":"onMineClicked","click #activities-all-button":"onAllClicked","click #activities-more":"onMoreActivitiesClicked"};b.prototype.initialize=function(){_.bindAll(this,"appendOne","prependOne","addAll");_.bindAll(this,"displayMyActivities","onMoreActivtiesClicked","addAllMore");_.bindAll(this,"onDatePicked");
this.tutorialOn=true;this.activities=new i;this.activities.bind("add",this.prependOne);this.activities.bind("refresh",this.addAll);this.moreActivities=new i;this.moreActivities.bind("refresh",this.addAllMore);return this.currentPath="/activities/all/"};b.prototype.onMineClicked=function(a){$("#activities-my-button").button("disable");$("#activities-all-button").button("enable");this.clearActivities(null);$("#activities-from-datepicker").val(null);this.currentPath="/activities/mine/";this.reloadActivities(null);
return a};b.prototype.onAllClicked=function(a){$("#activities-all-button").button("disable");$("#activities-my-button").button("enable");this.clearActivities(null);$("#activities-from-datepicker").val(null);this.currentPath="/activities/all/";this.reloadActivities(null);return a};b.prototype.onDatePicked=function(a){a=Date.parse(a).toString("yyyy-MM-dd");this.clearActivities();return this.reloadActivities(a)};b.prototype.clearActivities=function(){$("#activity-list").empty();return $("#activities-more").show()};
b.prototype.addAllMore=function(){var a;a=this.moreActivities.toArray().reverse();a=_.rest(a);_.each(a,this.appendOne);this.lastDate=this.moreActivities.last().getUrlDate();a.length<30&&$("#activities-more").hide();f.hide();return this.lastDate};b.prototype.addAll=function(){if(this.activities.length>0){this.tutorialOn=false;this.lastDate=this.activities.first().getUrlDate();this.activities.length<30&&$("#activities-more").hide()}else{this.tutorialOn?this.displayTutorial(1):$("#tutorial").html(null);
$("#activities-more").hide()}this.activities.each(this.prependOne);f.hide();return this.activities.length};b.prototype.appendOne=function(a){var c;c=new j(a);a=c.render();$("#activity-list").append(a);return c};b.prototype.prependOne=function(a){var c;c=new j(a);a=c.render();$("#activity-list").prepend(a);f.hide();if(this.tutorialOn){this.displayTutorial(2);this.tutorialOn=false}return c};b.prototype.displayTutorial=function(a){return $.get("/activities/tutorial/"+a+"/",function(c){return $("#tutorial-activities").html(c)})};
b.prototype.reloadActivities=function(a){f.display();this.activities.url=this.currentPath;if(a)this.activities.url=this.currentPath+a+"-23-59-00/";this.activities.fetch();return this.activities};b.prototype.fetch=function(){this.activities.fetch();return this.activties};b.prototype.onMoreActivitiesClicked=function(){f.display();this.moreActivities.url=this.lastDate?this.currentPath+this.lastDate:this.currentPath;this.moreActivities.fetch();return this.moreActivities};b.prototype.setListeners=function(){return $("input#activities-from-datepicker").datepicker({onSelect:this.onDatePicked})};
b.prototype.setWidgets=function(){$("#activities-my-button").button();$("#activities-all-button").button();$("#activities-all-button").button("disable");$("#activities-more").button();return $("#activities-from-datepicker").val(null)};return b}();f=new p;new n;k=new o;e=new e;e.setWidgets();e.setListeners();e.fetch()}).call(this);