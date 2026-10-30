// Draws the firepit preview. The drawing code comes from the approved mockup.
/* eslint-disable */
var F={pat:'branches',size:600,mat:'mild',plate:false};
var M={
    mild:{n:'Mild steel, uncoated',a:'#6a4a35',b:'#3f2b1f',note:'Our lowest-cost option. It slowly rusts outdoors.'},
    paint:{n:'Mild steel, heat-resistant paint',a:'#3a3d40',b:'#1c1e20',note:'Painted mild steel, which rusts after a few years outdoors.'},
    s3cr:{n:'3CR12 stainless',a:'#7f8488',b:'#4b4f53',note:'Outlasts mild steel, with some mild corrosion.'},
    s304:{n:'304 stainless',a:'#c3c8cb',b:'#757b80',note:'Our highest corrosion resistance. It may discolour from heat.'}
  };
function prng(seed){return function(){seed=(seed*16807)%2147483647;return seed/2147483647}}
  function branch(x,y,a,len,w,d,r,o){
    if(d===0||len<5)return;
    var x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len;
    o.push('<path d="M'+x.toFixed(1)+' '+y.toFixed(1)+'L'+x2.toFixed(1)+' '+y2.toFixed(1)+'" stroke-width="'+w.toFixed(1)+'"/>');
    branch(x2,y2,a-.35-r()*.4,len*(.68+r()*.14),w*.72,d-1,r,o);
    branch(x2,y2,a+.3+r()*.4,len*(.62+r()*.16),w*.72,d-1,r,o);
  }
  function pattern(x0,x1,top,bot){
    var o=[],r=prng(41),w=x1-x0,h=bot-top,i;
    if(F.pat==='branches'){
      var n=w>300?4:3;
      for(i=0;i<n;i++)branch(x0+w*(i+.5)/n,bot+16,-1.57+(r()-.5)*.25,h*.32,6,6,r,o);
      return '<g fill="none" stroke="url(#emb)" stroke-linecap="round">'+o.join('')+'</g>';
    }
    if(F.pat==='ivy'){
      var vines=w>300?4:3;
      for(i=0;i<vines;i++){
        var vx=x0+w*(i+.5)/vines,d='M'+vx+' '+(bot+10),leaves='';
        for(var j=1;j<=5;j++){
          var y=bot+10-j*h/4.4,x=vx+(j%2?20:-20);
          d+='Q'+(x+(j%2?14:-14))+' '+(y+h/9)+' '+x+' '+y;
          var s=j%2?1:-1;
          leaves+='<path transform="translate('+x+' '+y+') scale('+s+' 1) rotate(-20)" d="M0 0C8 -14 26 -14 32 0C26 12 8 12 0 0Z" fill="url(#emb)"/>';
        }
        o.push('<path d="'+d+'" fill="none" stroke="url(#emb)" stroke-width="3"/>'+leaves);
      }
      return o.join('');
    }
    if(F.pat==='flowers'){
      var cols=w>300?5:4;
      for(i=0;i<cols;i++){
        var fx=x0+w*(i+.5)/cols,fy=top+h*(.34+.3*r()),rad=14+r()*6,pet='';
        o.push('<path d="M'+fx+' '+fy+'Q'+(fx+10)+' '+((fy+bot)/2)+' '+fx+' '+(bot+8)+'" fill="none" stroke="url(#emb)" stroke-width="3"/>');
        for(var q=0;q<6;q++){var a=q*Math.PI/3;pet+='<ellipse cx="'+(fx+Math.cos(a)*rad)+'" cy="'+(fy+Math.sin(a)*rad)+'" rx="'+rad*.55+'" ry="'+rad*.36+'" transform="rotate('+(q*60)+' '+(fx+Math.cos(a)*rad)+' '+(fy+Math.sin(a)*rad)+')" fill="url(#emb)"/>'}
        o.push(pet);
      }
      return o.join('');
    }
    var mx=x0+w*.76,my=top+h*.34;
    o.push('<path d="M'+(mx+4)+' '+(my-20)+'a22 22 0 1 0 0 40a17 17 0 1 1 0-40Z" fill="url(#emb)"/>');
    for(i=0;i<3;i++)o.push('<path d="M'+(x0-10)+' '+(top+h*(.5+i*.16))+'q'+w*.25+' -'+(24+i*6)+' '+w*.5+' 0t'+w*.6+' 0" fill="none" stroke="url(#emb)" stroke-width="'+(4-i)+'"/>');
    for(i=0;i<16;i++){
      var sx=x0+12+r()*(w-24),sy=top+10+r()*h*.42,sz=4+r()*6;
      o.push('<path d="M'+sx+' '+(sy-sz)+'L'+(sx+sz*.28)+' '+(sy-sz*.28)+'L'+(sx+sz)+' '+sy+'L'+(sx+sz*.28)+' '+(sy+sz*.28)+'L'+sx+' '+(sy+sz)+'L'+(sx-sz*.28)+' '+(sy+sz*.28)+'L'+(sx-sz)+' '+sy+'L'+(sx-sz*.28)+' '+(sy-sz*.28)+'Z" fill="url(#emb)"/>');
    }
    return o.join('');
  }
function pit(){
    var w=F.size===900?350:250,cx=260,x0=cx-w/2,x1=cx+w/2,top=170,bot=top+(F.size===900?170:140),ry=w*.13,m=M[F.mat]||M.mild;
    var body='M'+x0+' '+top+'L'+x0+' '+bot+'A'+(w/2)+' '+ry+' 0 0 0 '+x1+' '+bot+'L'+x1+' '+top+'A'+(w/2)+' '+ry+' 0 0 1 '+x0+' '+top+'Z';
    var plate=F.plate?'<g><ellipse cx="'+cx+'" cy="'+(top-16)+'" rx="'+(w/2-4)+'" ry="'+(ry-2)+'" fill="#1d2023" stroke="#55595d" stroke-width="3"/><path d="M'+(cx-w*.3)+' '+(top-26)+'L'+(cx+w*.3)+' '+(top-26)+'M'+(cx-w*.36)+' '+(top-16)+'L'+(cx+w*.36)+' '+(top-16)+'M'+(cx-w*.3)+' '+(top-6)+'L'+(cx+w*.3)+' '+(top-6)+'" stroke="#55595d" stroke-width="3"/></g>':'';
    return '<defs><linearGradient id="body" x1="0" x2="1"><stop offset="0" stop-color="'+m.b+'"/><stop offset=".45" stop-color="'+m.a+'"/><stop offset="1" stop-color="'+m.b+'"/></linearGradient>'+
      '<linearGradient id="emb" gradientUnits="userSpaceOnUse" x1="0" y1="'+top+'" x2="0" y2="'+bot+'"><stop offset="0" stop-color="#ffb347"/><stop offset="1" stop-color="#ff5a0a"/></linearGradient>'+
      '<clipPath id="drum"><path d="'+body+'"/></clipPath><filter id="pg" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'+
      '<ellipse cx="'+cx+'" cy="'+(bot+ry+18)+'" rx="'+(w*.66)+'" ry="18" fill="#000" opacity=".4"/>'+
      '<path d="M'+(x0+34)+' '+(bot+ry*.55)+'l-10 34M'+(x1-34)+' '+(bot+ry*.55)+'l10 34" stroke="'+m.b+'" stroke-width="9" stroke-linecap="round"/>'+
      '<ellipse cx="'+cx+'" cy="'+top+'" rx="'+(w/2)+'" ry="'+ry+'" fill="#120c08"/>'+
      '<path class="flame" d="M'+(cx-w*.3)+' '+(top+6)+'C'+(cx-w*.3)+' '+(top-60)+' '+(cx-20)+' '+(top-70)+' '+(cx-6)+' '+(top-130)+'C'+(cx+34)+' '+(top-80)+' '+(cx+w*.3)+' '+(top-50)+' '+(cx+w*.3)+' '+(top+6)+'Z" fill="#ff6a13" opacity=".9"/>'+
      '<path class="flame b" d="M'+(cx-w*.16)+' '+(top+6)+'C'+(cx-w*.16)+' '+(top-30)+' '+(cx-8)+' '+(top-40)+' '+(cx+4)+' '+(top-84)+'C'+(cx+24)+' '+(top-44)+' '+(cx+w*.16)+' '+(top-30)+' '+(cx+w*.16)+' '+(top+6)+'Z" fill="#ffc35a"/>'+
      plate+
      '<path d="'+body+'" fill="url(#body)"/>'+
      '<g clip-path="url(#drum)"><g filter="url(#pg)">'+pattern(x0,x1,top+ry*.6,bot+ry*.7)+'</g></g>'+
      '<path d="M'+x0+' '+top+'A'+(w/2)+' '+ry+' 0 0 0 '+x1+' '+top+'" fill="none" stroke="'+m.a+'" stroke-width="5"/>';
}

// selection comes from the option groups with the keys pattern, size, material and plate
export function renderFirepit( selection ) {
	F.pat = selection.pattern || 'branches';
	F.size = Number( selection.size ) || 600;
	F.mat = selection.material || 'mild';
	F.plate = Boolean( selection.plate );
	return pit();
}
