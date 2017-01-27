$(document).ready(function(){
  var slideItems = $('div.slide');

  var carousel = new WipcampCarousel('.con');
  carousel.init();

  $(window).on('resize orientation', function(e){
    orientationStatus = e.orientation;
    $('body').on('click', function(e) {
      if (orientationStatus = 'landscape') {
        e.preventDefault();
      }
    });
  });

  $('img').on('dragstart', function (e) {
    e.preventDefault();
  });
  $('.idle .slide a').on('click', function (e) {
    e.preventDefault();
  });

  $('[data-toggle="tooltip"]').tooltip({
    html: true
  });

  $('.card-btn-back').click(function (event) {
    if(getTransform($(event.target).parents().filter('.slide'))[0] == 0){
      $('.con').addClass('idle');
      $('.slide').addClass('animate');
      $('.wave1, .wave2, .wave3').addClass('pause');
      $('.cloud1, .cloud2, .cloud3').addClass('pause');
      $('.ship').addClass('pause');
      $(event.target).parents().filter('.slide').removeClass('active');
      $(event.target).parents().filter('.slide').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
      event.stopPropagation();
    }
  });
  $('.card-btn-main').click(function (event) {
    if(getTransform($(event.target).parents().filter('.slide'))[0] == 0){
      $('.con').addClass('idle');
      $('.slide').addClass('animate');
      $('.wave1, .wave2, .wave3').addClass('pause');
      $('.cloud1, .cloud2, .cloud3').addClass('pause');
      $('.ship').addClass('pause');
      $(event.target).parents().filter('.slide').removeClass('active');
      $(event.target).parents().filter('.slide').css({"transform": "perspective(100px) translate3d(0, -100px, -50px)"});
      event.stopPropagation();
    }
    carousel.next();
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
    $('.wave1, .wave2, .wave3').removeClass('pause');
    $('.cloud1, .cloud2, .cloud3').removeClass('pause');
    $('.ship').removeClass('pause');
  });
});

function getTransform(el) {
    var results = $(el).css('-webkit-transform');
    var resultTranform = results.split(", ");
    resultTranform[0] = resultTranform[0].replace("matrix3d(","");
    resultTranform[resultTranform.length - 1] = resultTranform[resultTranform.length - 1].replace(")","");
    var xyz = [resultTranform[12], resultTranform[13], resultTranform[14]];
    return xyz;
}
