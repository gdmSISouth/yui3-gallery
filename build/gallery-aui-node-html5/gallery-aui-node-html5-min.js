YUI.add("gallery-aui-node-html5",function(B){if(B.UA.ie){var D=B.namespace("HTML5"),C=B.DOM._create;if(!D._fragHTML5Shived){D._fragHTML5Shived=YUI.AUI.html5shiv(document.createDocumentFragment());}B.mix(D,{IECreateFix:function(F,E){var A=D._fragHTML5Shived;A.appendChild(F);F.innerHTML=E;A.removeChild(F);return F;},_doBeforeCreate:function(F,H,E){var G=C.apply(this,arguments);var A=D.IECreateFix(G,F);return new B.Do.Halt(null,A);}});B.Do.before(D._doBeforeCreate,B.DOM,"_create",B.DOM);}},"gallery-2010.06.02-20-36",{requires:["collection","gallery-aui-base"]});