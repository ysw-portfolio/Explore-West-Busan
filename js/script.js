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


//링크 클릭 시 페이시 상단으로 안튀게



//메인배너 슬라이드
var swiper = new Swiper(".mainbanner", {
  slidesPerView: 1,   // ★ 항상 1개만 보이게
  spaceBetween: 0,
  centeredSlides: true,    //센터모드

  loop: true,         // 무한 반복
  centeredSlides: false, // ❌ 끄기 (중요)

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // effect: 'fade',
  // fadeEffect: {
  //     crossFade: true,
  // },
});


// =============================
// 서부산 일몰 계산 + 카운트다운 (FIXED)
// =============================

document.addEventListener("DOMContentLoaded", function () {

  const LAT = 35.1047;   // 서부산 위도
  const LNG = 128.9747;  // 서부산 경도
  const TIMEZONE = 9;    // KST

  const today = new Date();

  // 날짜 표시
  document.getElementById("sunset-date").textContent =
    today.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
    });

  // ==========================
  // NOAA 일몰 계산 (KST 기준)
  // ==========================
  function getSunset(date, lat, lng, tz) {
    const rad = Math.PI / 180;

    const day =
      Math.floor(
        (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
          Date.UTC(date.getFullYear(), 0, 0)) / 86400000
      );

    const gamma = (2 * Math.PI / 365) * (day - 1);

    const eqTime =
      229.18 *
      (0.000075 +
        0.001868 * Math.cos(gamma) -
        0.032077 * Math.sin(gamma) -
        0.014615 * Math.cos(2 * gamma) -
        0.040849 * Math.sin(2 * gamma));

    const decl =
      0.006918 -
      0.399912 * Math.cos(gamma) +
      0.070257 * Math.sin(gamma) -
      0.006758 * Math.cos(2 * gamma) +
      0.000907 * Math.sin(2 * gamma);

    const ha = Math.acos(
      (Math.cos(90.833 * rad) /
        (Math.cos(lat * rad) * Math.cos(decl))) -
      Math.tan(lat * rad) * Math.tan(decl)
    );

    const sunsetMinutes =
      720 - 4 * lng - eqTime + (ha / rad) * 4 + tz * 60;

    const hours = Math.floor(sunsetMinutes / 60);
    const minutes = Math.floor(sunsetMinutes % 60);

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
      0
    );
  }

  const sunsetTime = getSunset(today, LAT, LNG, TIMEZONE);

  // 일몰 시각 표시
  document.getElementById("sunset-time").textContent =
    sunsetTime.getHours().toString().padStart(2, "0") +
    ":" +
    sunsetTime.getMinutes().toString().padStart(2, "0");

  // ==========================
  // 카운트다운
  // ==========================
  function updateCountdown() {
    const now = new Date();
    const diff = sunsetTime - now;

    const countdownWrap = document.querySelector(".sunset-inner .countdown");
    const countdownStrong = document.getElementById("sunset-countdown");

    if (diff <= 0) {
      countdownWrap.classList.add("ended");
      countdownWrap.textContent = "오늘의 노을은 내일 다시 만나요 🌙";
      return;
    } else {
      countdownWrap.classList.remove("ended");
    }

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);

    countdownStrong.textContent =
      h.toString().padStart(2, "0") +
      ":" +
      m.toString().padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
});

// ==========================
// 인트로 섹션 애니메이션
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".animate-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
          observer.unobserve(entry.target); // 1번만 실행
        }
      });
    },
    {
      threshold: 0.3
    }
  );

  sections.forEach(section => observer.observe(section));
});


//==================== 추천 스팟 ====================
//무한 슬라이드용 복제
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".spot-track");
  track.innerHTML += track.innerHTML; // 슬라이드 복제
});

//==================== 추천 코스 ====================
// 상단 탭 버튼
const courseTabs = document.querySelectorAll('.course-tab');

courseTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    courseTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// 카드 선택 효과
// const courseItems = document.querySelectorAll('.course-item');

// courseItems.forEach(item => {
//   item.addEventListener('click', () => {
//     courseItems.forEach(i => i.classList.remove('active'));
//     item.classList.add('active');
//   });
// });

// ==================== 로컬 가게 ====================
document.addEventListener("DOMContentLoaded", () => {
  const sliderWrap = document.querySelector(".shop-slider-wrap");
  const slider = sliderWrap.querySelector(".shop-slider");
  const track = sliderWrap.querySelector(".shop-track");

  const prevBtn = sliderWrap.querySelector(".shop-arrow.prev");
  const nextBtn = sliderWrap.querySelector(".shop-arrow.next");

  let cards = Array.from(track.children);
  const total = cards.length;

  const gap = 24; // 카드 간격(px)
  const cardWidth = cards[0].offsetWidth + gap;

  let isMoving = false;

  /* =========================
     화면에 보이는 카드 수
  ========================= */
  const visibleCount = Math.round(
    slider.offsetWidth / cardWidth
  );

  /* =========================
     CLONE 생성
  ========================= */

  // 앞쪽 clone
  for (let i = total - visibleCount; i < total; i++) {
    const clone = cards[i].cloneNode(true);
    clone.classList.add("clone");
    track.insertBefore(clone, track.firstChild);
  }

  // 뒤쪽 clone
  for (let i = 0; i < visibleCount; i++) {
    const clone = cards[i].cloneNode(true);
    clone.classList.add("clone");
    track.appendChild(clone);
  }

  // clone 포함 카드 다시 수집
  cards = Array.from(track.children);

  /* =========================
     시작 위치 세팅
  ========================= */
  let index = visibleCount;
  track.style.transform =
    `translateX(${-cardWidth * index}px)`;

  /* =========================
     슬라이드 이동 함수
  ========================= */
  function moveSlide(newIndex) {
    if (isMoving) return;
    isMoving = true;

    track.style.transition = "transform 0.4s ease";
    track.style.transform =
      `translateX(${-cardWidth * newIndex}px)`;

    index = newIndex;

    track.addEventListener(
      "transitionend",
      () => {
        track.style.transition = "none";

        // 앞쪽 clone 영역 진입 시
        if (index < visibleCount) {
          index = total + index;
          track.style.transform =
            `translateX(${-cardWidth * index}px)`;
        }

        // 뒤쪽 clone 영역 진입 시
        if (index >= total + visibleCount) {
          index = index - total;
          track.style.transform =
            `translateX(${-cardWidth * index}px)`;
        }

        isMoving = false;
      },
      { once: true }
    );
  }

  /* =========================
     버튼 이벤트
  ========================= */
  nextBtn.addEventListener("click", () => {
    moveSlide(index + 1);
  });

  prevBtn.addEventListener("click", () => {
    moveSlide(index - 1);
  });

  /* =========================
     리사이즈 대응
  ========================= */
  window.addEventListener("resize", () => {
    track.style.transition = "none";
    track.style.transform =
      `translateX(${-cardWidth * index}px)`;
  });
});

//==================== 이벤트 배너 슬라이드 ====================
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.event-banner-slider');
  const track = document.querySelector('.event-banner-track');

  const intervalTime = 3500;
  let currentIndex = 1;
  let slideWidth = getSlideWidth();

  /* ===== 슬라이드 폭 계산 (정수화) ===== */
  function getSlideWidth() {
    return Math.round(slider.getBoundingClientRect().width);
  }

  /* ===== 무한 슬라이드용 복제 ===== */
  const items = track.children;
  const firstClone = items[0].cloneNode(true);
  const lastClone = items[items.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, items[0]);

  const totalSlides = track.children.length;

  /* ===== 위치 세팅 함수 ===== */
  function setPosition(transition = true) {
    track.style.transition = transition ? 'transform 0.6s ease' : 'none';
    track.style.transform = `translate3d(${-slideWidth * currentIndex}px, 0, 0)`;
  }

  // 초기 위치
  setPosition(false);

  /* ===== 자동 슬라이드 ===== */
  function moveSlide() {
    currentIndex++;
    setPosition(true);

    if (currentIndex === totalSlides - 1) {
      setTimeout(() => {
        currentIndex = 1;
        setPosition(false);
      }, 600);
    }
  }

  let autoSlide = setInterval(moveSlide, intervalTime);

  /* ===== resize + zoom 대응 ===== */
  window.addEventListener('resize', () => {
    clearInterval(autoSlide);

    requestAnimationFrame(() => {
      slideWidth = getSlideWidth();
      setPosition(false);
      autoSlide = setInterval(moveSlide, intervalTime);
    });
  });
});

// ==================== SNS 자동 슬라이드+드래그 ====================
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.sns-slider');
  const track = document.querySelector('.sns-track');
  const originalItems = Array.from(track.children);
  const links = document.querySelectorAll('.sns-item');

  /* ===== 무한 루프용 복제 (1회만) ===== */
  originalItems.forEach(item => {
    track.appendChild(item.cloneNode(true));
  });

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  let autoSpeed = 0.4;
  let rafId;
  let isAutoPlay = true;

  let dragDistance = 0;
  const CLICK_THRESHOLD = 8;

  // 🔑 원본 트랙 너비
  let originalWidth = 0;

  function calculateWidth() {
    originalWidth = 0;
    originalItems.forEach(item => {
      originalWidth += item.offsetWidth + 20; // gap 20px
    });
  }

  calculateWidth();
  window.addEventListener('resize', calculateWidth);

  /* ===== 자동 흐름 ===== */
  function autoMove() {
    if (!isAutoPlay) return;

    currentTranslate -= autoSpeed;

    // 🔁 절반 지나면 위치 리셋
    if (Math.abs(currentTranslate) >= originalWidth) {
      currentTranslate = 0;
    }

    track.style.transform = `translateX(${currentTranslate}px)`;
    rafId = requestAnimationFrame(autoMove);
  }

  autoMove();

  /* ===== 드래그 ===== */
  function dragStart(e) {
    isDragging = true;
    isAutoPlay = false;
    cancelAnimationFrame(rafId);

    slider.classList.add('dragging');
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    prevTranslate = currentTranslate;
    dragDistance = 0;
  }

  function dragMove(e) {
    if (!isDragging) return;

    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = currentX - startX;

    dragDistance = Math.abs(diff);
    currentTranslate = prevTranslate + diff;

    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function dragEnd() {
    isDragging = false;
    slider.classList.remove('dragging');

    isAutoPlay = true;
    autoMove();
  }

  slider.addEventListener('mousedown', dragStart);
  slider.addEventListener('mousemove', dragMove);
  slider.addEventListener('mouseup', dragEnd);
  slider.addEventListener('mouseleave', dragEnd);

  slider.addEventListener('touchstart', dragStart, { passive: true });
  slider.addEventListener('touchmove', dragMove, { passive: true });
  slider.addEventListener('touchend', dragEnd);

  /* ===== hover 시 자동 멈춤 ===== */
  slider.addEventListener('mouseenter', () => {
    isAutoPlay = false;
    cancelAnimationFrame(rafId);
  });

  slider.addEventListener('mouseleave', () => {
    if (!isDragging) {
      isAutoPlay = true;
      autoMove();
    }
  });

  /* ===== 클릭 vs 드래그 ===== */
  links.forEach(link => {
    link.addEventListener('click', e => {
      if (dragDistance > CLICK_THRESHOLD) {
        e.preventDefault();
      }
    });
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