window.HUB_EVENTS={ASSET_ADDED:"ASSET_ADDED",ASSET_DELETED:"ASSET_DELETED",ASSET_DESELECTED:"ASSET_DESELECTED",ASSET_SELECTED:"ASSET_SELECTED",ASSET_UPDATED:"ASSET_UPDATED",CONSOLE_CHANGE:"CONSOLE_CHANGE",CONSOLE_CLOSED:"CONSOLE_CLOSED",CONSOLE_EVENT:"CONSOLE_EVENT",CONSOLE_OPENED:"CONSOLE_OPENED",CONSOLE_RUN_COMMAND:"CONSOLE_RUN_COMMAND",CONSOLE_SERVER_CHANGE:"CONSOLE_SERVER_CHANGE",EMBED_ACTIVE_PEN_CHANGE:"EMBED_ACTIVE_PEN_CHANGE",EMBED_ACTIVE_THEME_CHANGE:"EMBED_ACTIVE_THEME_CHANGE",EMBED_ATTRIBUTE_CHANGE:"EMBED_ATTRIBUTE_CHANGE",EMBED_RESHOWN:"EMBED_RESHOWN",FORMAT_FINISH:"FORMAT_FINISH",FORMAT_ERROR:"FORMAT_ERROR",FORMAT_START:"FORMAT_START",IFRAME_PREVIEW_RELOAD_CSS:"IFRAME_PREVIEW_RELOAD_CSS",IFRAME_PREVIEW_URL_CHANGE:"IFRAME_PREVIEW_URL_CHANGE",KEY_PRESS:"KEY_PRESS",LINTER_FINISH:"LINTER_FINISH",LINTER_START:"LINTER_START",PEN_CHANGE_SERVER:"PEN_CHANGE_SERVER",PEN_CHANGE:"PEN_CHANGE",PEN_EDITOR_CLOSE:"PEN_EDITOR_CLOSE",PEN_EDITOR_CODE_FOLD:"PEN_EDITOR_CODE_FOLD",PEN_EDITOR_ERRORS:"PEN_EDITOR_ERRORS",PEN_EDITOR_EXPAND:"PEN_EDITOR_EXPAND",PEN_EDITOR_FOLD_ALL:"PEN_EDITOR_FOLD_ALL",PEN_EDITOR_LOADED:"PEN_EDITOR_LOADED",PEN_EDITOR_REFRESH_REQUEST:"PEN_EDITOR_REFRESH_REQUEST",PEN_EDITOR_RESET_SIZES:"PEN_EDITOR_RESET_SIZES",PEN_EDITOR_SIZES_CHANGE:"PEN_EDITOR_SIZES_CHANGE",PEN_EDITOR_UI_CHANGE_SERVER:"PEN_EDITOR_UI_CHANGE_SERVER",PEN_EDITOR_UI_CHANGE:"PEN_EDITOR_UI_CHANGE",PEN_EDITOR_UI_DISABLE:"PEN_EDITOR_UI_DISABLE",PEN_EDITOR_UI_ENABLE:"PEN_EDITOR_UI_ENABLE",PEN_EDITOR_UNFOLD_ALL:"PEN_EDITOR_UNFOLD_ALL",PEN_ERROR_INFINITE_LOOP:"PEN_ERROR_INFINITE_LOOP",PEN_ERROR_RUNTIME:"PEN_ERROR_RUNTIME",PEN_ERRORS:"PEN_ERRORS",PEN_LIVE_CHANGE:"PEN_LIVE_CHANGE",PEN_LOGS:"PEN_LOGS",PEN_MANIFEST_CHANGE:"PEN_MANIFEST_CHANGE",PEN_MANIFEST_FULL:"PEN_MANIFEST_FULL",PEN_PREVIEW_FINISH:"PEN_PREVIEW_FINISH",PEN_PREVIEW_START:"PEN_PREVIEW_START",PEN_SAVED:"PEN_SAVED",POPUP_CLOSE:"POPUP_CLOSE",POPUP_OPEN:"POPUP_OPEN",POST_CHANGE:"POST_CHANGE",POST_SAVED:"POST_SAVED",PROCESSING_FINISH:"PROCESSING_FINISH",PROCESSING_START:"PROCESSED_STARTED"},"object"!=typeof window.CP&&(window.CP={}),window.CP.PenTimer={programNoLongerBeingMonitored:!1,timeOfFirstCallToShouldStopLoop:0,_loopExits:{},_loopTimers:{},START_MONITORING_AFTER:2e3,STOP_ALL_MONITORING_TIMEOUT:5e3,MAX_TIME_IN_LOOP_WO_EXIT:2200,exitedLoop:function(E){this._loopExits[E]=!0},shouldStopLoop:function(E){if(this.programKilledSoStopMonitoring)return!0;if(this.programNoLongerBeingMonitored)return!1;if(this._loopExits[E])return!1;var _=this._getTime();if(0===this.timeOfFirstCallToShouldStopLoop)return this.timeOfFirstCallToShouldStopLoop=_,!1;var o=_-this.timeOfFirstCallToShouldStopLoop;if(o<this.START_MONITORING_AFTER)return!1;if(o>this.STOP_ALL_MONITORING_TIMEOUT)return this.programNoLongerBeingMonitored=!0,!1;try{this._checkOnInfiniteLoop(E,_)}catch(N){return this._sendErrorMessageToEditor(),this.programKilledSoStopMonitoring=!0,!0}return!1},_sendErrorMessageToEditor:function(){try{if(this._shouldPostMessage()){var E={topic:HUB_EVENTS.PEN_ERROR_INFINITE_LOOP,data:{line:this._findAroundLineNumber()}};parent.postMessage(E,"*")}else this._throwAnErrorToStopPen()}catch(_){this._throwAnErrorToStopPen()}},_shouldPostMessage:function(){return document.location.href.match(/boomboom/)},_throwAnErrorToStopPen:function(){throw"We found an infinite loop in your Pen. We've stopped the Pen from running. More details and workarounds at https://blog.codepen.io/2016/06/08/can-adjust-infinite-loop-protection-timing/"},_findAroundLineNumber:function(){var E=new Error,_=0;if(E.stack){var o=E.stack.match(/boomboom\S+:(\d+):\d+/);o&&(_=o[1])}return _},_checkOnInfiniteLoop:function(E,_){if(!this._loopTimers[E])return this._loopTimers[E]=_,!1;var o;if(_-this._loopTimers[E]>this.MAX_TIME_IN_LOOP_WO_EXIT)throw"Infinite Loop found on loop: "+E},_getTime:function(){return+new Date}},window.CP.shouldStopExecution=function(E){var _=window.CP.PenTimer.shouldStopLoop(E);return!0===_&&console.warn("[CodePen]: An infinite loop (or a loop taking too long) was detected, so we stopped its execution. Sorry!"),_},window.CP.exitedLoop=function(E){window.CP.PenTimer.exitedLoop(E)};

var colors = ["#A109FF", "#FD372A", "#FED022", "#00C3E6",
             "#A109FF", "#FD372A", "#FED022", "#00C3E6"];
var prizes = ["TRY AGAIN", "75% UP TO 100€", "100 FS", "75 FS", "NO WIN", "50% UP TO 100€", "20 FS", "  100% UP  TO 250€"];

var startAngle = 0*Math.PI/180;
var arc = (2 * Math.PI) / colors.length;
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var textColor = '#fff';

var ctx;
var ans = document.getElementById('ans');

// third outermost circle  

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 120;
    var insideRadius = 40;
   
    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = "center";
   
    for(var i = 0; i < colors.length; i++) {
      var angle = startAngle + i * arc;
      ctx.beginPath();
      ctx.strokeStyle = "#412b6d";
      ctx.lineWidth = 0;
      ctx.arc(250, 250, 200, angle, angle + arc, false);
      ctx.stroke();
      ctx.fillStyle = colors[i];
      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.strokeStyle = '#412b6d';
      ctx.lineWidth = 0;
      ctx.lineTo(250, 250);
      if ( i === colors.length - 1) {
        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
        ctx.strokeStyle = '#412b6d';
        ctx.lineWidth = 0;
        ctx.lineTo(250, 250);
        ctx.fill();
        ctx.stroke();
      } else {
         ctx.fill();
         ctx.stroke(); 
      }
      ctx.beginPath();
      ctx.strokeStyle = '#412b6d';
      ctx.arc(250, 250, insideRadius, angle, angle + arc, false);
      ctx.lineWidth = 2;
      ctx.stroke();
     
      ctx.save();
      ctx.fillStyle = textColor;
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                    250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2 + 0); // rotate вертеть

      var text = prizes[i];
      
      if([i] == 0) {
        printAt(ctx, text, -ctx.measureText(text).width / 18, -30, 20, 100 );
        ctx.restore();
      } else if([i] == 1){
        printAt(ctx, text, -ctx.measureText(text).width / 800, -35, 20, 85 );
        ctx.restore();
      } else if([i] == 2){
        printAt(ctx, text, -ctx.measureText(text).width / 25, -15, 20, 58 );
        ctx.restore();
      } else if([i] == 3){
        printAt(ctx, text, -ctx.measureText(text).width / 28, -15, 20, 65 );
        ctx.restore();
      } else if([i] == 4){
        printAt(ctx, text, -ctx.measureText(text).width / 30, -15, 20, 80 );
        ctx.restore();
      } else if([i] == 5){
        printAt(ctx, text, -ctx.measureText(text).width / 30, -30, 20, 78 );
        ctx.restore();
      } else if([i] == 6){
        printAt(ctx, text, -ctx.measureText(text).width / 25, -20, 20, 58 ); 
        ctx.restore();
      } else if([i] == 7){
        printAt(ctx, text, -ctx.measureText(text).width / 25, -30, 20, 78 );
        ctx.restore();
      }
    
    }
    
  function printAt( context , text, x, y, lineHeight, fitWidth){
        fitWidth = fitWidth || 0;
        
        if (fitWidth <= 0)
        {
            context.fillText( text, x, y );
            return;
        }
        
        for (var idx = 1; idx <= text.length; idx++)
        {
            var str = text.substr(0, idx);
            if (context.measureText(str).width > fitWidth)
            {
                context.fillText( text.substr(0, idx-1), x, y );
                printAt(context, text.substr(idx-1), x, y + lineHeight, lineHeight,  fitWidth);
                return;
            }
        }
        context.fillText( text, x, y );
        
    }
       //Arrow
    ctx.save();
    const arrowImage = document.getElementById('arrow');
    ctx.beginPath();
    // ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.drawImage(arrowImage, 250 - 0 - 25, 250 - (outsideRadius + 5) - 45, 60, 110);
    // ctx.drawImage(arrowImage, 250 - (outsideRadius + 5) - 25, 250 - 25, 50, 50);
    ctx.restore();

    
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(250, 250, 38, 0, Math.PI*2, false);
    ctx.fill();
    ctx.restore();
    
    
    // // center logo    
    // const logoImage = document.getElementById('center-logo');
    // ctx.beginPath();
    // // ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    // ctx.drawImage(logoImage, 250 - 60, 250 - 80, 130, 145);
    
    
  }
}



var box = document.querySelector("#click");
   
function spin() {
  spinAngleStart = 15.5;
  spinTime = 0;
  spinTimeTotal = 1700;
  rotateWheel();
  box.classList.toggle("no-click");
}

$('#click').click(function(){
  $('body').addClass('one')
})

function rotateWheel() {
  spinTime += 7;
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
      if($('body').hasClass('one') && !$('body').hasClass('two')) {
          if (document.documentElement.clientWidth < 992) {
            setTimeout(() => $('.this').trigger('click'), 1000);
          } else {
            setTimeout(() => $('.this').trigger('click'), 1000);
          };
        } else {
          if (document.documentElement.clientWidth < 992) {
            setTimeout(() => $('.this2').trigger('click'), 1000);
          } else {
            setTimeout(() => $('.this2').trigger('click'), 1000);
          };
        }
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0.3, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  // spinTimeout = setTimeout('rotateWheel()', 30);
  requestAnimationFrame(rotateWheel);
}

function stopRotateWheel() {
  ans.textContent = '';
  // clearTimeout(spinTimeout);
  // var degrees = startAngle * 180 / Math.PI + 90;
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ans.textContent = prizes[index];
  box.classList.toggle("no-click");
}

function $_GET(e,t){return!!(t=t.match(new RegExp(e+"=([^&=]+)")))&&t[1]}
var getStag = $_GET("stag", window.location.href);
var stag = "?stag=" + getStag;
console.log("STAG -" + stag);

$('.btn-1').click(function(){
  $('body').addClass('two')
  $('button.carousel__button.is-close').trigger('click')
  spin()

})

$('.btn-2').click(function(){     
    window.location.href = 'https://arlekincasino.net/en-CA/users/sign_up' + stag;
})



$('.btn-2').click(function(){
  window.location.href = 'https://www.casinokakadu.com/users/sign_up' + stag;
})

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
  b + c*((t/=d)*t*t + -3*(t/=d)*t + 3*t);
}

drawRouletteWheel();
