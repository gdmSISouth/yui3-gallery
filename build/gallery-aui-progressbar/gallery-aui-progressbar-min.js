YUI.add("gallery-aui-progressbar",function(M){var G=M.Lang,m=G.isNumber,J=G.isString,N="",R=".",B=" ",W="auto",h="boundingBox",O="complete",T="contentBox",Y="height",K="horizontal",j="label",d="lineHeight",k="max",Q="min",a="offsetHeight",I="orientation",U="progress-bar",n="px",c="ratio",H="status",l="statusNode",o="step",g="text",Z="textNode",e="value",P="vertical",C="width",b=function(A){return parseFloat(A)||0;},D=M.ClassNameManager.getClassName,V=D(U,K),F=D(U,H),E=D(U,g),S=D(U,P),i='<div class="'+F+'"></div>',f='<div class="'+E+'"></div>';var X=M.Component.create({NAME:U,ATTRS:{height:{valueFn:function(){return this.get(h).get(a)||25;}},label:{value:N},max:{validator:m,value:100},min:{validator:m,value:0},orientation:{value:K,validator:function(A){return J(A)&&(A===K||A===P);}},ratio:{getter:"_getRatio",readOnly:true},step:{getter:"_getStep",readOnly:true},statusNode:{valueFn:function(){return M.Node.create(i);}},textNode:{valueFn:function(){return M.Node.create(f);}},value:{setter:b,validator:function(A){return m(b(A))&&((A>=this.get(Q))&&(A<=this.get(k)));},value:0}},HTML_PARSER:{label:function(A){var L=A.one(R+E);if(L){return L.html();}},statusNode:R+F,textNode:R+E},UI_ATTRS:[j,I,e],prototype:{renderUI:function(){var A=this;A._renderStatusNode();A._renderTextNode();},_getContentBoxSize:function(){var A=this;var L=A.get(T);return b(L.getStyle(this.get(I)===K?C:Y));},_getPixelStep:function(){var A=this;return A._getContentBoxSize()*A.get(c);},_getRatio:function(){var A=this;var L=A.get(Q);var p=(A.get(e)-L)/(A.get(k)-L);return Math.max(p,0);},_getStep:function(){return this.get(c)*100;},_renderStatusNode:function(){var A=this;A.get(T).append(A.get(l));},_renderTextNode:function(){var A=this;A.get(T).append(A.get(Z));},_uiSetLabel:function(A){this.get(Z).html(A);},_uiSetOrientation:function(q){var A=this;var p=A.get(h);var L=(q===K);p.toggleClass(V,L);p.toggleClass(S,!L);A._uiSizeTextNode();},_uiSetValue:function(r){var A=this;var p=A.get(l);var L=A._getPixelStep();var q={};if(A.get(I)===K){q={height:"100%",top:W,width:L+n};}else{q={height:L+n,top:b(A._getContentBoxSize()-L)+n,width:"100%"};}if(A.get(o)>=100){A.fire(O);}p.setStyles(q);},_uiSizeTextNode:function(){var A=this;var L=A.get(T);var p=A.get(Z);p.setStyle(d,L.getStyle(Y));}}});M.ProgressBar=X;},"gallery-2010.06.02-20-36",{skinnable:true,requires:["gallery-aui-base"]});