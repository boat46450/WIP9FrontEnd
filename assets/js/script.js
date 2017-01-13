$(document).ready(function(){
  var slideItems = $('div.slide');

  var carousel = new WipcampCarousel('.con');
  carousel.init();

  $('span.menu').click(function(event) {
    if(getTransform($(event.target).parents().filter('.slide'))[0] == 0){
      $('.con').addClass('idle');
      $('.slide').addClass('animate');
      $(event.target).parents().filter('.slide').removeClass('active');
      $(event.target).parents().filter('.slide').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
      event.stopPropagation();
    }
  });

  $('div.slide').click(function(event) {
    if(getTransform($(event.target).parents().filter('.slide'))[0] == 0){
      var transitionTime = /((?:[0-9])+(?:\.(?:[0-9])+)?)(ms|s)/.exec($('.animate').css('transition-duration'));
      transitionTime.shift();
      transitionTime = transitionTime[1] == "s" ? transitionTime[0]*1000 : transitionTime[0];

      var beforeAnimate = function() {
        var r = $.Deferred();
        $('.con').removeClass('idle');
        $(event.target).parents().filter('.slide').addClass('active');
        $(event.target).parents().filter('.slide').css({"transform": "perspective(100px) translate3d(0, 0, 0)"});
        return r;
      };

      var afterAnimate = function() {
        setTimeout(function() {
          $('.slide').removeClass('animate');
        }, transitionTime);
      };

      beforeAnimate().done(afterAnimate());
    }
  });

  marginSlideControl();
});

function getTransform(el) {
    var results = $(el).css('-webkit-transform');
    var resultTranform = results.split(", ");
    resultTranform[0] = resultTranform[0].replace("matrix3d(","");
    resultTranform[resultTranform.length - 1] = resultTranform[resultTranform.length - 1].replace(")","");
    var xyz = [resultTranform[12], resultTranform[13], resultTranform[14]];
    return xyz;
}

function marginSlideControl(){
  var dif = ($(window).width()-$('div.slide-control').width())/2;
  $('.slide-control').css({"margin-left": + dif +"px"});
}
