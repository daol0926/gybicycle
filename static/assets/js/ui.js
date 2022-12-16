$(document).ready(function(){
  user_event();
});

/* faq list */
const faqs = document.querySelectorAll(".faq-list-loop");

faqs.forEach(faq => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  })
});

/* main swiper */
const swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var modalOpener = null;
function user_event() {
  $(document).on('click', '.top-nav > ul > li.modal-view-01', function (e) {
    var tg = "#layerBanner1";
    modalOpen(tg, $(this));
    e.preventDefault();
  }).on('click', '.js-modal-close', function () {
    var target = $(this).closest('.modal-popup').attr('id');
    modalClose('#' + target, modalOpener);
  }).on('click', '#layerBanner1', function () { //패밀리사이트 팝업추가 js
    var target = $(this).closest('.modal-popup').attr('id');
  }).on('keydown', '.modal-popup .btn-close-modal', function (e) {
    if (e.keyCode == 9 && !e.shiftKey) { // tab
      e.preventDefault();
      $(this).siblings('.modal-title').attr('tabindex', '0').focus();
    }
  }).on('keydown', '.modal-title', function (e) {
    if (e.keyCode == 9 && e.shiftKey) { // shift + tab
      e.preventDefault();
      $(this).siblings('.btn-close-modal').focus();
    }
  });
}

function modalOpen(_target, _opener) {
	modalOpener = _opener;
	$(_target).fadeIn('fast').addClass('show').removeClass('hide');
	$(_target).attr('tabindex', '0').focus();
	bodyScroll(true, $('body').width());
}

function modalClose(_target, _opener) {

	bodyScroll(false);
	var tg = null;

	if (_opener) {
		tg = $(_target);
		modalOpener = $(_opener);
	} else {
		tg = $('.modal-popup.show');
		modalOpener = null;
	}

	$(tg).hide().removeClass('show').addClass('hide');
	if (modalOpener !== null) {
		modalOpener.focus();
		modalOpener = null;
	}
}

function bodyScroll(_status, _orgWidth) {
	var $fixedObj = $('body, .fixed #breadcrumb');
	if (_status) {
		$('body').addClass('modal-opened');
		if ($('html').get(0).scrollWidth > $('html').width() === false) {
			$fixedObj.css('margin-right', $('body').width() - _orgWidth);
		}
	} else {
		$fixedObj.css('margin-right', '');
		$('body').removeClass('modal-opened');
	}
}