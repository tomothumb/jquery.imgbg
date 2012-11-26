/**
 * jQuery imgbg v1.0 - 2012-11-25
 * (c) 2012 Tomoyuki Tsujmioto
 * license: www.opensource.org/licenses/mit-license.php
 */
;(function($) {

  $.fn.imgbg = function(options){

    var elements = this;

    // marge default option and argument option
    var opts = $.extend({},
                        $.fn.imgbg.defaults,
                        options
                        );

    /**
     * initialize variable
     */
    var clientW, clientH, clientAspect;
    var bgAreaW, bgAreaH, bgAreaAspect;

    /**
     * [object for storeing default image property.]
     * @type {Object}
     */
    var init = {};

    /**
     * [Object of css setting when images are outputed.]
     * @type {Object}
     */
    var output = {
      width :1,
      height:1,
      left  :0,
      top   :0
    }


    /**
     * setCSS
     *
     * @description
     * set image style for putting background.
     *
     * @param {object} $E [jQuery element of image which you want to use background.]
     * @param {object} output [css style setting]
     */
    var setCSS = function($E, output){
      // console.log("setCSS");
      $E.css({width  : output.width,
              height : output.height,
              top    : output.top,
              left   : output.left
             })
            ;
    };

    /**
     * chkAspectRate
     *
     * @description
     * it check window size and aspect rate.
     * and also check size and aspect rate of image area.
     * @param {object} $E [jQuery element of image which you want to use background.]
     */
    var chkAspectRate = function($E){
      clientW = document.documentElement.clientWidth;
      clientH = document.documentElement.clientHeight;
      clientAspectRate = clientH / clientW;
      bgAreaW = clientW - (opts.left + opts.right);
      bgAreaH = clientH - (opts.top  + opts.bottom);
      bgAreaAspectRate = bgAreaH / bgAreaW;
    };

    /**
     * resize
     *
     * @description
     * When window is resized, it check browser aspect rate.
     * and calculate images size properly.
     * @param  {object} $E [jQuery element of image which you want to use background.]
     */
    var resize = function($E){
      console.log("resize", init[$E[0].id].aspectRate);
      chkAspectRate();
      console.log(1, init[$E[0].id].aspectRate, bgAreaAspectRate);
      if(init[$E[0].id].aspectRate > bgAreaAspectRate ){
        // case of Width shortage.
        output.width = bgAreaW * (opts.widthRate/100);
        output.height = output.width * init[$E[0].id].aspectRate;
        output.left = 0 + opts.left;
        output.top = opts.top -( (output.height - bgAreaH) / (100/opts.centerX) );
        setCSS($E, output);
      }else{
        // case of Height shortage.
        output.height = bgAreaH * (opts.heightRate/100);
        output.width = output.height / init[$E[0].id].aspectRate;
        output.top = 0 + opts.top;
        output.left = opts.left -( (output.width - bgAreaW) / (100/opts.centerY) );
        setCSS($E, output);
      }
    };


    // Main process
    $(elements).each(function(index, Ele){
      var $E = $(Ele);
      init[Ele.id] = {};
      init[Ele.id].aspectRate = $E.height() / $E.width();

      $(window).on("ready",function(){
        $E.addClass("imgbg");
        resize($E);
      });

      $(window).on("resize",function(){
        resize($E);
      });

    });

    return this;
  };


  // Default Options
  $.fn.imgbg.defaults = {
    widthRate  : 100,
    heightRate : 100,
    centerX : 50 ,
    centerY : 50 ,
    left    : 0 ,
    right   : 0 ,
    top     : 0 ,
    bottom  : 0 ,
    aspectRate: 1.0
  };

  //////////////////////////////////////////

  // how to use //
  ////////////////////////////////
  // IMGBG CONFIG (example) //
  ////////////////////////////////
  /**
   * @type {Object}
   * widthRate/heightRate  : Rate of magnification (percent  0 to 100)
   * centerX/centerY       : Center position (percent 0 to 100)
   * left/right/top/bottom : Offset position (px)
   */
  // DEFAULT
  // imgbgconfig = {
  //   widthRate  : 100,
  //   heightRate : 100,
  //   centerX : 50 ,
  //   centerY : 50 ,
  //   left    : 0 ,
  //   right   : 0 ,
  //   top     : 0 ,
  //   bottom  : 0
  //  };
  // $("#sample").imgbg(imgbgconfig);

})(jQuery);