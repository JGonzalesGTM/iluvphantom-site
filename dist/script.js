const canvas=document.querySelector('#field'),ctx=canvas.getContext('2d'),motion=document.querySelector('#motion');
let width=0,height=0,t=0,frame,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,pointer={x:.72,y:.42};
function resize(){const box=canvas.getBoundingClientRect();width=box.width;height=box.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);if(paused)draw()}
function draw(){ctx.clearRect(0,0,width,height);const cx=width*(.77+(pointer.x-.5)*.035),cy=height*(.45+(pointer.y-.5)*.025);ctx.lineWidth=.7;for(let i=0;i<86;i++){const phase=i/86;const radius=70+phase*Math.min(width*.44,560);ctx.beginPath();for(let j=0;j<=180;j++){const a=j/180*Math.PI*2;const ripple=Math.sin(a*3+t*.3+phase*8)*19+Math.cos(a*5-t*.2+phase*4)*11;const x=cx+Math.cos(a)*(radius+ripple),y=cy+Math.sin(a)*(radius+ripple)*.83;if(j===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.closePath();ctx.strokeStyle=`rgba(204,255,130,${.08+Math.sin(phase*Math.PI)*.21})`;ctx.stroke()} }
function animate(){t+=.014;draw();if(!paused&&!document.hidden)frame=requestAnimationFrame(animate)}
function update(){motion.setAttribute('aria-pressed',String(paused));motion.innerHTML=`Motion: ${paused?'off':'on'} <span>◉</span>`;cancelAnimationFrame(frame);if(paused)draw();else animate()}
motion.addEventListener('click',()=>{paused=!paused;update()});
document.addEventListener('pointermove',e=>{pointer.x=e.clientX/innerWidth;pointer.y=e.clientY/innerHeight});
document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);if(!document.hidden&&!paused)animate()});
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{paused=e.matches;update()});
addEventListener('resize',resize);resize();update();document.querySelector('#year').textContent=new Date().getFullYear();
