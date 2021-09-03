$(function () {

  //로딩 애니메이션
	$(".loading > ol").fadeOut();
	$(".loading").delay(350).fadeOut(1500, function(){
		$(this).remove();
	});
    
  // window 이벤트 구문
  const arrTopVal = [];

  for(let i=0;i<2;i++){
    arrTopVal[i] = $('section').eq(i).offset().top;
  }

  console.log('arrTopVal =', arrTopVal);
  
  const moveFn = function(idx){
    $('html,body').stop().animate({scrollTop: arrTopVal[idx]-100}, 800, 'easeInOutCubic');
  };

  const $mnu = $('.gnb>li>a');

  // mnu click 이벤트 구문
  $mnu.on('click', function(evt){

    evt.preventDefault();

    const nowIdx = $mnu.index(this);
    
    moveFn(nowIdx);
  });

  $(window).on('scroll', function(){
    
    // 현재 시점 스크롤바의 top값을 추출
    const scrollTop = $(window).scrollTop();

    for(let i=0; i<2; i++){
      if(scrollTop >= arrTopVal[i]-200){
        // 네비게이션 활성화표시
        $mnu.eq(i).parent().addClass('on').siblings().removeClass('on');
      }else if(scrollTop < arrTopVal[0]-100){
        $mnu.parent().removeClass('on');
      }
    }
  });

  // logo에 대한 click 이벤트 구문
  $('header > .container > .logo').on('click', function(){
    $('html,body').stop().animate({scrollTop:0}, 800, 'easeInOutCubic');
  });

  $('footer > .footer_logo > a').on('click', function(){
    $('html,body').stop().animate({scrollTop:0}, 800, 'easeInOutCubic');
  });

  // load 이벤트는 화면에 내용이 나타난 시점에 발생
  $(window).on('load', function(){

    // 이벤트 강제발생 API
    $('header > .container > .logo ').trigger('click');
  });

    // be-awarded > cont1
  const $indicator = $('.be-awarded > .cont1 > .visual > .visual-pagination > li > a');
  const $container = $('.be-awarded > .cont1 > .visual > .visual-container > li');

  let fadeIdx = 0;

  // 페이드 함수
  const fadeFn = function(){
    // 이전 슬라이드 사라지게
    $container.filter('.on').stop().fadeOut(200).removeClass('on');

    // 이번에 나타날 슬라이드
    $container.eq(fadeIdx).stop().fadeIn().addClass('on');

    $indicator.eq(fadeIdx).parent().addClass('on').siblings().removeClass('on');
  };

  $indicator.on('click', function(evt){
    evt.preventDefault();

    fadeIdx = $indicator.index(this);

    fadeFn();
  });

  $container.on('click', function(evt){
    evt.preventDefault();
  });

  // auto play
  const $autoBtn = $('.be-awarded > .cont1 > .visual > .auto-play');
  let intervalKey;

  $autoBtn.on('click', function(evt){
    evt.preventDefault();

    if($(this).hasClass('pause')){
      clearInterval(intervalKey);
      $(this).removeClass('pause');
    }else{
      autoPlay();
      $(this).addClass('pause');
    }
  });

  const autoPlay = function(){
    intervalKey = setInterval(function(){
      if (fadeIdx<4) {
        fadeIdx++;
      } else {
        fadeIdx = 0;
      }

      fadeFn();
    }, 3000);
  };

  // load하면 자동 슬라이드
  $(window).on('load', function(){
      autoPlay();
  });


  // be-awarded > cont2
  const $panels = $('.be-awarded > .cont2 > .slides > p > a');
  const $shadow = $('.be-awarded > .cont2 > .shadow');
  const $lightbox = $('.be-awarded > .cont2 > .shadow > .lightbox');
  const $clse = $('.be-awarded > .cont2 > .shadow > .lightbox > .clse');

  // 판넬 썸네일
  $panels.on('click', function (evt) {
    evt.preventDefault();

    $lightbox.children('img').attr({
        src: $(this).attr('href'),
        alt: $(this).children('img').attr('alt')
    });

    $shadow.show();
  });

  $('.certificate > .cer-cont > .cer > li > a').on('click', function (evt) {
    evt.preventDefault();
  });

  // 닫기x 버튼
  $clse.on('click', function (evt) {
    evt.preventDefault();

    $shadow.hide();
  });

  // 그림자 영역을 클릭해도 닫힘
  $shadow.on('click', function () {
    $(this).hide();
  });

  // 자손에게 일어난 이벤트를 조상에게 전파되는 걸 차단
  // $lightbox.on('click', function (evt) {
  //   evt.stopPropagation();
  // });
  
  // top 버튼
  // top 버튼 이벤트 구문
  $('.top').on('click', function(){
    $('html,body').stop().animate({scrollTop:0}, 800, 'easeInOutCubic');
  });

  $(window).scroll(function(){
    if($(this).scrollTop() < 1){
      $('.top').fadeOut();
    }else{
      $('.top').fadeIn();
    }
  });
  $('.top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 400);
    return false;
  });

});