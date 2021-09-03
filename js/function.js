$(function(){

	//로딩 애니메이션
	$(".loading > ol").fadeOut();
	$(".loading").delay(350).fadeOut(1500, function(){
		$(this).remove();
	});

  // window 이벤트 구문
  const arrTopVal = [];

  for(let i=0;i<5;i++){
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

    for(let i=0; i<5; i++){
      if(scrollTop >= arrTopVal[i]-200){
        // 네비게이션 활성화표시
        $mnu.eq(i).parent().addClass('on').siblings().removeClass('on');
      }else if(scrollTop < arrTopVal[0]-100){
        $mnu.parent().removeClass('on');
      }
    }
  });

  // rw-mnu
  const rw_moveFn = function(idx){
    $('html,body').stop().animate({scrollTop: arrTopVal[idx]-60}, 800, 'easeInOutCubic');
  };

  const $rw_mnu = $('.rw-gnb>li>a');

  // mnu click 이벤트 구문
  $rw_mnu.on('click', function(evt){

    evt.preventDefault();

    const rw_nowIdx = $rw_mnu.index(this);
    
    rw_moveFn(rw_nowIdx);
  });

  $(window).on('scroll', function(){
    
    // 현재 시점 스크롤바의 top값을 추출
    const rw_scrollTop = $(window).scrollTop();

    for(let i=0; i<5; i++){
      if(rw_scrollTop >= arrTopVal[i]-200){
        // 네비게이션 활성화표시
        $rw_mnu.eq(i).parent().addClass('onn').siblings().removeClass('onn');
      }else if(rw_scrollTop < arrTopVal[0]-100){
        $rw_mnu.parent().removeClass('onn');
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
  }); // <= 잠시 꺼둠

  
  // .mnu-btn click 이벤트
  $('.mnu-btn').on('click', function(){
    $('.rw-nav').fadeIn(200);
    $(this).css({display: 'none'});
    $('.clse-btn').css({display: 'block'});
  });
  $('.clse-btn').on('click', function(){
    $('.rw-nav').fadeOut(200);
    $(this).css({display: 'none'});
    $('.mnu-btn').css({display: 'block'});
  });


  // about-me 페이지네이션
  const $pagi_btn = $('ol.btn-pagi > li > a');
  let pagiIdx = 0;
  $pagi_btn.on('click', function(evt){
    evt.preventDefault();

    pagiIdx = $pagi_btn.index(this)
    $pagi_btn.eq(pagiIdx).parent().addClass('on').siblings().removeClass('on');
  });

  $pagi_btn.eq(0).on('click', function(evt){
    evt.preventDefault();

    $('article.center').css({display: 'flex'});
    $('article.last').css({display: 'none'});
  });
  $pagi_btn.eq(1).on('click', function(evt){
    evt.preventDefault();

    $('article.last').css({display: 'flex'});
    $('article.center').css({display: 'none'});
  });

  // section.portfolio
  const $container = $('.portfolio > .slide-pf > .all-container > .all');
  const $indicator = $('.portfolio > .slide-pf > .pagination > .pagi > li > a');
  const $btnPrev = $('.portfolio > .slide-pf > .prev');
  const $btnNext = $('.portfolio > .slide-pf > .next');

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

  // 이전버튼
  $btnPrev.on('click', function(evt){
    evt.preventDefault();

    if (fadeIdx > 0) {
      fadeIdx--;
    } else {
      fadeIdx = 2;
    }

    fadeFn();
  });

  // 다음버튼
  $btnNext.on('click', function(evt){
    evt.preventDefault();

    if (fadeIdx < 2) {
      fadeIdx++;
    } else {
      fadeIdx = 0;
    }

    fadeFn();
  }); 
  
  $('.portfolio > .slide-pf > .design-pf').on('click',function(evt){
    evt.preventDefault();

    alert('아직 미완성입니다~!');
  });

  // be-awarded > cont2
  // cont-1
  const $process = $('.portfolio > .slide-pf > .all-container > .cont-1 > .process');
  const $shadow = $('.portfolio > .slide-pf > .all-container > .cont-1 > .shadow');
  const $lightbox = $('.portfolio > .slide-pf > .all-container > .cont-1 > .shadow > .lightbox');

  // 작업 과정
  $process.on('click', function (evt) {
    evt.preventDefault();

    $lightbox.children('img').attr({
        src: $(this).attr('href'),
        alt: $(this).children('img').attr('alt')
    });

    $shadow.fadeIn();
  });

  // 그림자 영역을 클릭해도 닫힘
  $shadow.on('click', function () {
    $(this).fadeOut();
  });


  // cont-2
  const $process2 = $('.portfolio > .slide-pf > .all-container > .cont-2 > .process');
  const $shadow2 = $('.portfolio > .slide-pf > .all-container > .cont-2 > .shadow');
  const $lightbox2 = $('.portfolio > .slide-pf > .all-container > .cont-2 > .shadow > .lightbox');

  // 작업 과정
  $process2.on('click', function (evt) {
    evt.preventDefault();

    $lightbox2.children('img').attr({
        src: $(this).attr('href'),
        alt: $(this).children('img').attr('alt')
    });

    $shadow2.fadeIn();
  });

  // 그림자 영역을 클릭해도 닫힘
  $shadow2.on('click', function () {
    $(this).fadeOut();
  });


  // cont3 작업과정 버튼
  $('.portfolio > .slide-pf > .all-container > .cont-3 > .all-plan > a').on('click', function (evt) {
    evt.preventDefault();
    
    $('.portfolio > .slide-pf > .all-container > .cont-3 > .all-plan > .site-plan').slideToggle(200);
  });
  
  // cont-3
  const $process3 = $('.portfolio > .slide-pf > .all-container .site-plan > li:nth-child(1) > a');
  const $shadow3 = $('.portfolio > .slide-pf > .all-container > .cont-3 > .shadow');
  const $lightbox3 = $('.portfolio > .slide-pf > .all-container > .cont-3 > .shadow > .lightbox');

  const $process4 = $('.portfolio > .slide-pf > .all-container .site-plan > li:nth-child(2) > a');
  const $shadow4 = $('.portfolio > .slide-pf > .all-container > .cont-3 > .shadow2');
  const $lightbox4 = $('.portfolio > .slide-pf > .all-container > .cont-3 > .shadow2 > .lightbox');

  const $process5 = $('.portfolio > .slide-pf > .all-container .site-plan > li:nth-child(3) > a');
  const $shadow5 = $('.portfolio > .slide-pf > .all-container > .cont-3 > .shadow3');
  const $lightbox5 = $('.portfolio > .slide-pf > .all-container > .cont-3 > .shadow3 > .lightbox');

  // 작업 과정
  $process3.on('click', function (evt) {
    evt.preventDefault();

    $lightbox3.children('img').attr({
        src: $(this).attr('href'),
        alt: $(this).children('img').attr('alt')
    });

    $shadow3.fadeIn();
  });

  // 그림자 영역을 클릭해도 닫힘
  $shadow3.on('click', function () {
    $(this).fadeOut();
  });


  $process4.on('click', function (evt) {
    evt.preventDefault();

    $lightbox4.children('img').attr({
        src: $(this).attr('href'),
        alt: $(this).children('img').attr('alt')
    });

    $shadow4.fadeIn();
  });

  // 그림자 영역을 클릭해도 닫힘
  $shadow4.on('click', function () {
    $(this).fadeOut();
  });


  $process5.on('click', function (evt) {
    evt.preventDefault();

    $lightbox5.children('img').attr({
        src: $(this).attr('href'),
        alt: $(this).children('img').attr('alt')
    });

    $shadow5.fadeIn();
  });

  // 그림자 영역을 클릭해도 닫힘
  $shadow5.on('click', function () {
    $(this).fadeOut();
  });
  // end of section.portfolio


  // section.ux-design
  const $uiux = $('.ux-design > .ui-vs-ux > .cont1');
  const $uiux_2 = $('.ux-design > .ui-vs-ux > .cont2');
  const $ui = $('.ux-design > .ui-vs-ux > .ui');
  const $ux = $('.ux-design > .ui-vs-ux > .ux');

  $uiux.on('mouseover', function () {
    $ui.css({
      top: '470px',
      marginLeft: '-630px'
    });
    $ux.css({
      top: '470px',
      marginRight: '-640px'
    });
  });
  $uiux.on('mouseout', function () {
    $ui.css({
      top: '290px',
      marginLeft: '-200px'
    });
    $ux.css({
      top: '290px',
      marginRight: '-200px'
    });
  });

  $uiux_2.on('mouseover', function(){
    $ui.css({
      top: '800px',
      marginLeft: '-630px',
      transition: 'ease-out 0.2s'
    });
    $ux.css({
      top: '800px',
      marginRight: '-640px',
      transition: 'ease-out 0.2s'
    });
  });
  $uiux_2.on('mouseout', function(){
    $ui.css({
      top: '290px',
      marginLeft: '-200px',
      transition: 'ease-out 0.2s'
    });
    $ux.css({
      top: '290px',
      marginRight: '-200px',
            transition: 'ease-out 0.2s'
    });
  }); // end of section.ux-design


  // section.rwd
  const $rwdProcess = $('.rwd > .process');
  const $rwdShadow = $('.rwd > .shadow');
  const $rwdLightB = $('.rwd > .shadow > .lightbox');

  // 작업 과정
  $rwdProcess.on('click', function (evt) {
    evt.preventDefault();

    $rwdLightB.children('img').attr({
        src: $(this).attr('href'),
        alt: $(this).children('img').attr('alt')
    });

    $rwdShadow.fadeIn();
  });

  // 그림자 영역을 클릭해도 닫힘
  $rwdShadow.on('click', function () {
    $(this).fadeOut();
  });


  // article.qna
  // 사전면접 질문
  $('.qna > .box > dl > dt > a').on('click', function(evt){
    evt.preventDefault();

    $(this).parent().toggleClass('on').next().stop().slideToggle();
  });
  // rw-사전면접 질문
  $('.qna > .box-2 > dl > dt > a').on('click', function(evt){
    evt.preventDefault();

    $(this).parent().toggleClass('on').next().stop().slideToggle();
  });


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

}); //end of ready