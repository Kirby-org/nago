var nago=(()=>{var C=(h,r)=>()=>(r||h((r={exports:{}}).exports,r),r.exports);var O=C((ui,F)=>{function x(h,r){this.x=h,this.y=r}F.exports=x});var N=C((oi,L)=>{var z=O();function y(h){var{v:r=32,h:q=63,m:t=1,xpos:n=0,ypos:o=0}=h||{};this.v=r,this.h=q,this.m=t,this.a=new z(n,o)}L.exports=y});var W=C((vi,R)=>{var a=O(),k=.17435839227423353,b=5.934119456780721,d=.017453292519943295,c=114.59155902616465;function A(h){var{v:r=32,h:q=63,m:t=1,Cc:n=0,W:o=null,ca:i=null}=h||{};this.wa=null,this.Ig=null,this.Hg=null,this.Yj=0,this.Xd=null,this.W=o,this.ca=i,this.Cc=n,this.m=t,this.h=q,this.v=r,this.vb=1/0}A.prototype={Oc:function(h){if(h*=d,h<0){h=-h;var r=this.W;this.W=this.ca,this.ca=r,this.Cc=-this.Cc}h>k&&h<b&&(this.vb=1/Math.tan(h/2))},Co:function(){return 0*this.vb==0?c*Math.atan(1/this.vb):0},he:function(){if(0*this.vb==0){var r=this.ca.a,q=this.W.a,h=.5*(r.x-q.x),r=.5*(r.y-q.y),q=this.W.a,t=this.vb;this.Xd=new a(q.x+h-r*t,q.y+r+h*t),r=this.W.a,q=this.Xd,h=r.x-q.x,r=r.y-q.y,this.Yj=Math.sqrt(h*h+r*r),this.Hg=new a(-r,h),this.Ig=new a(this.ca.a.y-this.Xd.y,this.Xd.x-this.ca.a.x),this.vb<=0&&(r=h=this.Hg,h.x=-r.x,h.y=-r.y,r=h=this.Ig,h.x=-r.x,h.y=-r.y)}else r=this.W.a,q=this.ca.a,h=r.x-q.x,r=q.y-r.y,q=Math.sqrt(r*r+h*h),this.wa=new a(r/q,h/q)}};R.exports=A});var E=C((qi,B)=>{var ii=O();function ti(h){var{v:r=32,h:q=63,m:t=1,Ua:n=0,xnormal:o=0,ynormal:i=0}=h||{};this.v=r,this.h=q,this.m=t,this.Ua=n,this.wa=new ii(o,i)}B.exports=ti});var K=C((fi,J)=>{var G=O();function H(h){var{p0x:r=0,p0y:q=0,p1x:t=0,p1y:n=0}=h||{};this.ca=new G(t,n),this.W=new G(r,q)}H.prototype={C:function(h,r){var q=this.W,t=this.ca,n=r.x-h.x,o=r.y-h.y;return o*(q.x-h.x)-n*(q.y-h.y)>0==o*(t.x-h.x)-n*(t.y-h.y)>0?!1:(n=t.x-q.x,t=t.y-q.y,t*(h.x-q.x)-n*(h.y-q.y)>0!=t*(r.x-q.x)-n*(r.y-q.y)>0)}};J.exports=H});var I=C((Mi,Q)=>{var D=O();function ni(h){var{v:r=63,h:q=63,Ca:t=.99,aa:n=1,m:o=.5,Z:i=10,xgravity:u=0,ygravity:g=0,xspeed:m=0,yspeed:M=0,xpos:v=0,ypos:s=0}=h||{};this.v=r,this.h=q,this.Ca=t,this.aa=n,this.m=o,this.Z=i,this.oa=new D(u,g),this.D=new D(m,M),this.a=new D(v,s)}Q.exports=ni});var V=C((pi,U)=>{function ri(h){var{ne:r=1/0,ec:q=100,Hb:t=100,Zd:n=0,Yd:o=0}=h||{};this.ne=r,this.ec=q,this.Hb=t,this.Zd=n,this.Yd=o}U.exports=ri});var Z=C((wi,Y)=>{var hi=I();function X(h){hi.apply(this,[h])}X.prototype={addVelocity:function(h,r){var q=this.D;q.x+=h,q.y+=r},applyForce:function(h,r,q){var t=this.D,n=this.aa;t.x+=h*r*n,t.y+=h*q*n},isMoving:function(){var h=this.D;return h.x*h.x+h.y*h.y>0}};Y.exports=X});var P=C((gi,$)=>{function _(){this.F=[],this.J=[],this.qa=[],this.U=[],this.pb=[],this.tc=[]}_.prototype={C:function(h,r){for(var q=0,t=this.F;q<t.length;q++){var n=t[q],o=n.a,i=n.a,u=n.D;o.x=i.x+h*u.x,o.y=i.y+h*u.y,i=o=n.D,u=n.oa,n=n.Ca,o.x=n*(i.x+u.x),o.y=n*(i.y+u.y)}for(var g=0,q=this.F.length;g<q;g++){for(t=this.F[g],n=g+1;n<q;n++)if(i=this.F[n],!(!(i.h&t.v)||!(i.v&t.h))){var v=t.a,s=i.a,M=v.x-s.x,v=v.y-s.y,o=i.Z+t.Z,e=M*M+v*v;if(e>0&&e<=o*o){var m=i,e=Math.sqrt(e),M=M/e,v=v/e,s=t.aa/(t.aa+i.aa),o=o-e,e=o*s,u=t.a,f=t.a;u.x=f.x+M*e,u.y=f.y+v*e,f=u=i.a,o-=e,u.x=f.x-M*o,u.y=f.y-v*o,o=t.D,e=i.D,o=M*(o.x-e.x)+v*(o.y-e.y),o<0&&(o*=t.m*i.m+1,s*=o,u=e=t.D,e.x=u.x-M*s,e.y=u.y-v*s,i=e=i.D,s=o-s,e.x=i.x+M*s,e.y=i.y+v*s,r?._CDD_&&r?._CDD_(g,t.playerId,n,m.playerId))}}if(t.aa!=0){for(n=0,o=this.qa;n<o.length;n++)if(i=o[n],!(!(i.h&t.v)||!(i.v&t.h))){var u=i.wa,f=t.a,u=i.Ua-(u.x*f.x+u.y*f.y)+t.Z;if(u>0){var p=f=t.a,j=i.wa;f.x=p.x+u*j.x,f.y=p.y+u*j.y,u=t.D,f=i.wa,u=u.x*f.x+u.y*f.y,u<0&&(u*=t.m*i.m+1,p=f=t.D,i=i.wa,f.x=p.x-u*i.x,f.y=p.y-u*i.y,r?._CDP_&&r?._CDP_(g,t.playerId,n))}}for(n=0,o=this.U;n<o.length;n++)if(i=o[n],!(!(i.h&t.v)||!(i.v&t.h))){var w,e,s;if(0*i.vb!=0){w=i.W.a;var v=i.ca.a;e=v.x-w.x;var M=v.y-w.y,u=t.a;if(s=u.x-v.x,v=u.y-v.y,u=t.a,e*(u.x-w.x)+M*(u.y-w.y)<=0||s*e+v*M>=0)continue;e=i.wa,w=e.x,e=e.y,s=w*s+e*v}else{if(e=i.Xd,s=t.a,w=s.x-e.x,e=s.y-e.y,s=i.Hg,v=i.Ig,(w*s.x+e*s.y>0&&w*v.x+e*v.y>0)==i.vb<=0||(v=Math.sqrt(w*w+e*e),v==0))continue;s=v-i.Yj,w/=v,e/=v}if(v=i.Cc,v==0)s<0&&(s=-s,w=-w,e=-e);else if(v<0&&(v=-v,s=-s,w=-w,e=-e,s<-v))continue;t.Z<=s||(s=t.Z-s,M=v=t.a,v.x=M.x+w*s,v.y=M.y+e*s,s=t.D,s=w*s.x+e*s.y,s<0&&(s*=t.m*i.m+1,v=i=t.D,i.x=v.x-w*s,i.y=v.y-e*s,r?._CDS_&&r?._CDS_(g,t.playerId,n)))}for(n=0,o=this.J;n<o.length;n++)if(i=o[n],!(!(i.h&t.v)||!(i.v&t.h))&&(f=t.a,p=i.a,u=f.x-p.x,f=f.y-p.y,p=u*u+f*f,p>0&&p<=t.Z*t.Z)){var p=Math.sqrt(p),u=u/p,f=f/p,p=t.Z-p,S=j=t.a;if(j.x=S.x+u*p,j.y=S.y+f*p,p=t.D,p=u*p.x+f*p.y,!(p<0)){r?._CDV_&&r?._CDV_(g,t.playerId,n,!1);continue}p*=t.m*i.m+1,j=i=t.D,i.x=j.x-u*p,i.y=j.y-f*p,r?._CDV_&&r?._CDV_(g,t.playerId,n,!0)}}}for(g=0;g<2;g++)for(q=0,t=this.pb;q<t.length;q++){var v=t[q],M=this.F,e=M[v.Yd];if(M=M[v.Zd],!(!M||!e)){var s=e.a,n=M.a,o=s.x-n.x,s=s.y-n.y,i=Math.sqrt(o*o+s*s);if(!(i<=0)){o/=i,s/=i,n=e.aa/(e.aa+M.aa),isNaN(n)&&(n=.5);var u,f;if(v.Hb>=v.ec)u=v.Hb,f=0;else if(i<=v.Hb)u=v.Hb,f=1;else if(i>=v.ec)u=v.ec,f=-1;else continue;if(i=u-i,0*v.ne==0)n=v.ne*i*.5,o*=n,s*=n,f=n=e.D,e=e.aa,n.x=f.x+o*e,n.y=f.y+s*e,n=e=M.D,M=M.aa,e.x=n.x-o*M,e.y=n.y-s*M,r?._MJ_&&r?._MJ_(q,!1,!0);else{u=i*n;var p=e.a,j=e.a;p.x=j.x+o*u*.5,p.y=j.y+s*u*.5,j=p=M.a,i-=u,p.x=j.x-o*i*.5,p.y=j.y-s*i*.5,i=e.D,u=M.D,i=o*(i.x-u.x)+s*(i.y-u.y);var T=i*f<=0;T&&(n*=i,e=f=e.D,f.x=e.x-o*n,f.y=e.y-s*n,M=e=M.D,n=i-n,e.x=M.x+o*n,e.y=M.y+s*n),r?._MJ_&&r?._MJ_(q,!0,T)}}}}},aMCO:function(h){this.F.push(h)},rMCO:function(h){var r=this.F.indexOf(h);r<0||this.F.splice(r,1)}};$.exports=_});var ei=C((ji,l)=>{l.exports={Point:O(),DotObject:N(),FiniteArcObject:W(),InfiniteLinearObject:E(),FiniteLinearSensor:K(),CircularObject:I(),DistanceConstraint:V(),MoveableCircularObject:Z(),World:P()}});return ei();})();
