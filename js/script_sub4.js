//nav 기본
$(function () {
  //.submenu를 숨긴다.
  $(".submenu").hide();

  //.gnb li에 마우스를 올리면,
  $(".gnb li").mouseenter(function () {
    //.gnb li(this)의 자식요소인 submenu(=children)의 이전 움직임을 멈추고 슬라이드 다운한다.
    //자식이 a랑 submenu 2개라 .submenu 자식 이름도 지정해줘야 함
    $(this).children(".submenu").stop().slideDown();
  });

  //.gnb li에 마우스가 벗어나면 
  $(".gnb li").mouseleave(function () {
    //.gnb li(=this)의 자식요소인 .submenu(=children)의 이전 움직임을 멈추고 슬라이드 업 한다.
    $(this).children(".submenu").stop().slideUp();
  });
});


// #으로 이동하는 a 태그 클릭 시 상단 이동 방지
$(function () {
    $('#wrap a[href="#"]').on('click', e => e.preventDefault());
});

//top 버튼
$(function () {
    $('.btn-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });
});

//top 스크롤 했을때만 보이게
$(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
        $('.btn-top').addClass('show');
    } else {
        $('.btn-top').removeClass('show');
    }
});
