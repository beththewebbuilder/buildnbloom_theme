// Draws the firepit: flat artwork wrapped around a drum that can be turned, or the flat-pack design.
// The drawing code comes from the approved mockup. Artwork comes from each pattern option, so new
// patterns only need an image uploading in the editor.
/* eslint-disable */
var F={style:'round',size:600,mat:'mild',plate:false,rot:.02,swap:false,art:null};
var current={};
var els={};
var cache={};
var M={
    mild:{n:'Mild steel, uncoated',a:'#7a5138',b:'#3f2b1f',note:'Our lowest-cost option. It slowly rusts outdoors.'},
    paint:{n:'Mild steel, heat-resistant paint',a:'#3a3d40',b:'#141618',note:'Painted mild steel, which rusts after a few years outdoors.'},
    s3cr:{n:'3CR12 stainless',a:'#8d9296',b:'#4b4f53',note:'Far outlasts mild steel, with some mild corrosion.'},
    s304:{n:'304 stainless',a:'#d4d9dc',b:'#7c8287',note:'Our highest corrosion resistance. It may discolour from heat.'}
  };
function blank(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;return c}
/* Stand-in drawn from the Safari photo until the flat artwork is supplied */
  function safari(){
    var c=blank(1500,270),x=c.getContext('2d');
    x.fillStyle='#000';x.fillRect(0,0,1500,270);x.fillStyle='#fff';
    var rhino=new Path2D('M4 46L14 18L22 34L34 22L40 10L48 24Q80 10 112 26Q126 36 124 78L108 78L104 58L70 62L56 62L52 78L36 78L34 58Q14 62 4 46Z');
    function put(p,px,py,s,flip){x.save();x.translate(px,py);x.scale(flip?-s:s,s);x.fill(p);x.restore()}
    function acacia(px,flip){
      x.save();x.translate(px,0);if(flip)x.scale(-1,1);
      x.fill(new Path2D('M-8 235L-4 150L-52 92L-44 88L0 132L38 84L46 88L8 150L12 235Z'));
      [[-74,84,46,14],[-20,70,62,18],[46,78,54,15],[0,92,84,11]].forEach(function(e){x.beginPath();x.ellipse(e[0],e[1],e[2],e[3],0,0,6.3);x.fill()});
      x.restore();
    }
    function bird(px,py,s){x.lineWidth=4;x.strokeStyle='#fff';x.beginPath();x.moveTo(px-s,py-4);x.quadraticCurveTo(px-s/2,py-10,px,py);x.quadraticCurveTo(px+s/2,py-10,px+s,py-4);x.stroke()}
    [-375,375,1125].forEach(function(o){
      acacia(o+85,false);put(rhino,o+212,137,1.25,false);put(rhino,o+556,137,1.25,true);
      acacia(o+665,true);bird(o+320,62,20);bird(o+375,42,15);bird(o+430,70,17);
    });
    return c;
  }
/* Fits uploaded artwork twice around the drum, keeping its proportions */
  function artStrip(img){
    var c=blank(1500,270),x=c.getContext('2d');
    x.fillStyle='#fff';x.fillRect(0,0,1500,270);
    var s=Math.min(600/img.width,214/img.height),w=img.width*s,h=img.height*s;
    [0,750,1500].forEach(function(m){x.drawImage(img,m-w/2,135-h/2,w,h)});
    return c;
  }
  function promptStrip(){
    var c=blank(1500,270),x=c.getContext('2d');
    x.fillStyle='#000';x.fillRect(0,0,1500,270);x.fillStyle='#fff';
    x.font='700 70px "Barlow Condensed",Arial,sans-serif';x.textAlign='center';x.textBaseline='middle';
    [0,750,1500].forEach(function(m){x.fillText('YOUR DESIGN HERE',m,135)});
    return c;
  }
function invertArtwork(p){
  if(p.custom)return F.art?!F.swap:F.swap;
  return !!p.invert;
}
function source(p){
  if(p.custom)return F.art||(cache.prompt=cache.prompt||promptStrip());
  if(p.draw)return cache.safari=cache.safari||safari();
  if(!p.src)return cache.none=cache.none||blank(1500,270);
  if(!cache[p.src]){
    var img=new Image();
    img.onload=function(){img.ready=true;pitCut()};
    img.src=p.src;
    cache[p.src]=img;
  }
  return cache[p.src];
}
/* trim is the plain border around the artwork, as fractions: left, right, top, bottom */
function region(p,img){
  var W=img.naturalWidth||img.width,H=img.naturalHeight||img.height,t=p.i||[0,0,0,0];
  return{x:W*t[0],y:H*t[2],w:W*(1-t[0]-t[1]),h:H*(1-t[2]-t[3])};
}
function geo(){
    var big=F.size===900,w=big?350:250;
    return{w:w,R:w/2,h:big?172:142,ry:w*.13,cx:260,top:158};
  }
var pc,pctx,oA,oB,oC,queued=false;
function pitCut(){
  if(queued)return;queued=true;
  requestAnimationFrame(function(){queued=false;paint()});
}
/* The flat artwork is sliced into columns and wrapped around the drum. Cut-outs are
     then knocked out of the metal, so they read the same on dark and bright finishes. */
  function paint(){
    var g=geo(),S=2,R=g.R*S,cx=g.cx*S,top=g.top*S,h=g.h*S,ry=g.ry*S,p=current;
    if(p.c)return;
    var img=source(p),a=oA.getContext('2d');
    a.globalCompositeOperation='source-over';a.filter='none';a.fillStyle='#000';a.fillRect(0,0,1040,840);
    if(img.ready||img.getContext){
      var r=region(p,img);
      a.filter='grayscale(1) contrast(1.5)';
      for(var px=-R;px<R;px++){
        var th=Math.asin(Math.max(-1,Math.min(1,(px+.5)/R))),cos=Math.cos(th);
        var u=((th/(2*Math.PI)+F.rot)%1+1)%1,sx=r.x+u*r.w,sw=Math.max(.6,r.w/(2*Math.PI*R)/cos);
        a.drawImage(img,sx,r.y,sw,r.h,cx+px,top+ry*cos,1.6,h);
      }
      a.filter='none';
    }
    if(invertArtwork(p)){a.globalCompositeOperation='difference';a.fillStyle='#fff';a.fillRect(0,0,1040,840)}
    var b=oB.getContext('2d');
    b.globalCompositeOperation='source-over';b.drawImage(oA,0,0);
    b.globalCompositeOperation='difference';b.fillStyle='#fff';b.fillRect(0,0,1040,840);
    var c=oC.getContext('2d');
    c.globalCompositeOperation='source-over';c.drawImage(oA,0,0);
    var em=c.createLinearGradient(0,top,0,top+h+ry);em.addColorStop(0,'#ffc14f');em.addColorStop(1,'#ff5a0a');
    c.globalCompositeOperation='multiply';c.fillStyle=em;c.fillRect(0,0,1040,840);

    var m=M[F.mat],x0=cx-R,x1=cx+R,bot=top+h;
    pctx.clearRect(0,0,1040,840);
    pctx.save();
    pctx.beginPath();pctx.moveTo(x0,top);pctx.lineTo(x0,bot);
    pctx.ellipse(cx,bot,R,ry,0,Math.PI,0,true);pctx.lineTo(x1,top);
    pctx.ellipse(cx,top,R,ry,0,0,Math.PI,false);pctx.closePath();pctx.clip();
    var mg=pctx.createLinearGradient(x0,0,x1,0);
    mg.addColorStop(0,m.b);mg.addColorStop(.38,m.a);mg.addColorStop(.62,m.a);mg.addColorStop(1,m.b);
    pctx.fillStyle=mg;pctx.fillRect(x0,top,R*2,h+ry*2);
    pctx.globalCompositeOperation='multiply';pctx.drawImage(oB,0,0);
    pctx.globalCompositeOperation='lighter';pctx.drawImage(oC,0,0);
    pctx.restore();
    pctx.strokeStyle=m.a;pctx.lineWidth=6;
    pctx.beginPath();pctx.ellipse(cx,top,R,ry,0,0,Math.PI,false);pctx.stroke();
  }
/* Flat-pack firepit and BBQ: an octagonal top over a faceted bowl on crossed legs */
  function flatPit(){
    var m=M[F.mat],cx=260,cy=166,rx=186,ry=74,s='';
    function oct(y,a,b){var o=[];for(var n=0;n<8;n++){var t=(22.5+45*n)*Math.PI/180;o.push([cx+a*Math.cos(t),y+b*Math.sin(t)])}return o}
    function pts(p){return p.map(function(q){return q[0].toFixed(1)+','+q[1].toFixed(1)}).join(' ')}
    function poly(p,fill,extra){return '<polygon points="'+pts(p)+'" fill="'+fill+'" '+(extra||'')+'/>'}
    function slots(){
      var o='',j;
      for(j=0;j<7;j++){
        var sy=cy+(j-3)*9,len=150-Math.abs(j-3)*22,lx=cx+24-len/2;
        o+='<rect x="'+lx+'" y="'+(sy-2.5)+'" width="'+len+'" height="5" rx="2" fill="url(#fpEmber)"/>';
      }
      return o+'<rect x="'+(cx-126)+'" y="'+(cy-7)+'" width="46" height="14" rx="6" fill="#0d0a08"/>';
    }
    s='<defs><linearGradient id="fpTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+m.a+'"/><stop offset=".55" stop-color="'+m.b+'"/><stop offset="1" stop-color="'+m.a+'"/></linearGradient>'+
      '<linearGradient id="fpSide" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+m.b+'"/><stop offset="1" stop-color="'+m.a+'"/></linearGradient>'+
      '<linearGradient id="fpEmber" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff5a0a"/><stop offset=".5" stop-color="#ffc14f"/><stop offset="1" stop-color="#ff5a0a"/></linearGradient></defs>';
    var T=oct(cy,rx,ry),L=oct(cy+6,rx,ry),B=oct(cy+112,rx*.42,ry*.42);
    s+='<ellipse cx="'+cx+'" cy="362" rx="165" ry="24" fill="#000" opacity=".42"/>';
    s+=poly([[352,262],[294,232],[168,352],[220,364]],m.a)+poly([[168,262],[226,232],[352,352],[300,364]],'url(#fpSide)');
    [[7,m.b],[3,m.b],[0,'url(#fpSide)'],[2,'url(#fpTop)'],[1,m.a]].forEach(function(f){
      var a=f[0],b=(a+1)%8;
      s+=poly([T[a],T[b],B[b],B[a]],f[1],'stroke="'+m.b+'" stroke-width="1"');
    });
    s+=poly(L,m.b)+poly(T,'url(#fpTop)')+slots();
    els.svg.innerHTML=s;
  }
function roundPit(){
var g=geo(),cx=g.cx,x0=cx-g.R,x1=cx+g.R,top=g.top,bot=top+g.h,ry=g.ry,w=g.w,m=M[F.mat],bars='',i;
    if(F.plate)for(i=-5;i<=5;i++){var bx=cx+i*w*.085;bars+='<path d="M'+bx+' '+(top-ry)+'V'+(top+ry)+'" stroke="#24272a" stroke-width="5"/>'}
    var plate=F.plate?'<clipPath id="plateClip"><ellipse cx="'+cx+'" cy="'+top+'" rx="'+(g.R-3)+'" ry="'+(ry-1)+'"/></clipPath><g clip-path="url(#plateClip)">'+bars+'</g><ellipse cx="'+cx+'" cy="'+top+'" rx="'+(g.R-3)+'" ry="'+(ry-1)+'" fill="none" stroke="#24272a" stroke-width="5"/>':'';
    function leg(x,dir){
      return '<path d="M'+(x-9)+' '+(bot+ry*.5)+'Q'+(x-9+dir*4)+' '+(bot+ry+22)+' '+(x+dir*20)+' '+(bot+ry+44)+'L'+(x+dir*32)+' '+(bot+ry+44)+'L'+(x+dir*32)+' '+(bot+ry+38)+'Q'+(x+11+dir*6)+' '+(bot+ry+16)+' '+(x+11)+' '+(bot+ry*.5)+'Z" fill="'+m.b+'"/>';
    }
    els.svg.innerHTML=
      '<ellipse cx="'+cx+'" cy="'+(bot+ry+44)+'" rx="'+(w*.68)+'" ry="17" fill="#000" opacity=".42"/>'+
      leg(x0+38,-1)+leg(x1-38,1)+
      '<path d="M'+(cx-10)+' '+bot+'L'+(cx-4)+' '+(bot+ry+56)+'H'+(cx+4)+'L'+(cx+10)+' '+bot+'Z" fill="'+m.b+'"/>'+
      '<ellipse cx="'+cx+'" cy="'+top+'" rx="'+g.R+'" ry="'+ry+'" fill="#120c08"/>'+
      '<path class="flame" d="M'+(cx-w*.3)+' '+(top+6)+'C'+(cx-w*.3)+' '+(top-52)+' '+(cx-20)+' '+(top-62)+' '+(cx-6)+' '+(top-118)+'C'+(cx+34)+' '+(top-72)+' '+(cx+w*.3)+' '+(top-44)+' '+(cx+w*.3)+' '+(top+6)+'Z" fill="#ff6a13" opacity=".9"/>'+
      '<path class="flame b" d="M'+(cx-w*.16)+' '+(top+6)+'C'+(cx-w*.16)+' '+(top-28)+' '+(cx-8)+' '+(top-36)+' '+(cx+4)+' '+(top-76)+'C'+(cx+24)+' '+(top-40)+' '+(cx+w*.16)+' '+(top-28)+' '+(cx+w*.16)+' '+(top+6)+'Z" fill="#ffc35a"/>'+
      plate;
}
function render(){
  if(F.style==='flat'){
    pc.hidden=true;els.photo.hidden=true;els.turn.hidden=true;
    flatPit();
    return;
  }
  roundPit();
  pitCut();
  var photo=!!current.c;
  els.photo.hidden=!photo;pc.hidden=photo;els.turn.hidden=photo;
  if(photo)els.photo.src=current.src;
}
function trimFrom(text){
  var parts=(text||'').split(',').map(Number);
  return parts.length===4&&parts.every(function(n){return n>=0})?parts.map(function(n){return n/100}):null;
}
function turnControls(){
  var turn=document.createElement('div');
  turn.className='luffman-config__turn';
  [['‹','Turn firepit left',-.06],['Drag to turn'],['›','Turn firepit right',.06]].forEach(function(item){
    var el=document.createElement(item[1]?'button':'span');
    el.textContent=item[0];
    if(item[1]){
      el.type='button';el.setAttribute('aria-label',item[1]);
      el.addEventListener('click',function(){F.rot+=item[2];pitCut()});
    }
    turn.appendChild(el);
  });
  return turn;
}
function dragToTurn(){
  var from=null;
  pc.addEventListener('pointerdown',function(e){from=e.clientX;pc.setPointerCapture(e.pointerId)});
  pc.addEventListener('pointermove',function(e){
    if(from===null)return;
    F.rot-=(e.clientX-from)/pc.getBoundingClientRect().width*.4;from=e.clientX;pitCut();
  });
  pc.addEventListener('pointerup',function(){from=null});
  pc.addEventListener('pointercancel',function(){from=null});
}

// selection comes from the option groups with the keys style, pattern, size, material and plate
export function createFirepitPreview( stage, container ) {
	els.svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
	els.svg.setAttribute( 'viewBox', '0 0 520 420' );
	els.svg.setAttribute( 'aria-hidden', 'true' );
	pc = blank( 1040, 840 );
	pc.className = 'luffman-config__drum';
	pctx = pc.getContext( '2d' );
	oA = blank( 1040, 840 );
	oB = blank( 1040, 840 );
	oC = blank( 1040, 840 );
	els.photo = document.createElement( 'img' );
	els.photo.alt = '';
	els.photo.hidden = true;
	els.turn = turnControls();
	container.append( els.svg, pc, els.photo );
	stage.appendChild( els.turn );
	dragToTurn();

	if ( document.fonts && document.fonts.ready ) {
		document.fonts.ready.then( () => {
			cache.prompt = null;
			pitCut();
		} );
	}

	return {
		update( selection ) {
			const pattern = selection.pattern || {};
			F.style = selection.style && selection.style.value === 'flat' ? 'flat' : 'round';
			F.size = Number( selection.size && selection.size.value ) === 900 ? 900 : 600;
			F.mat = ( selection.material && selection.material.value ) || 'mild';
			F.plate = Boolean( selection.plate );
			current = {
				src: pattern.image,
				i: trimFrom( pattern.trim ),
				c: pattern.mode === 'photo',
				invert: pattern.invert === 'true',
				custom: Boolean( pattern.uploadLabel ),
				draw: ! pattern.image && pattern.value === 'sa',
			};
			render();
		},
		setUpload( image ) {
			F.art = image ? artStrip( image ) : null;
			pitCut();
		},
		setSwap( swap ) {
			F.swap = swap;
			pitCut();
		},
	};
}
