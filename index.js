$(() => {
    let isMobile;

    const initMobile = () => {
        isMobile = window.innerWidth < 769;
        $('html').toggleClass('MOBILE', isMobile).toggleClass('DESKTOP', !isMobile);
        $(window).on('scroll', _ => {
            document.getElementById('nav').hidePopover();
        });
    }

    const initSlick = _ => {
        const $slickSlider = $('.slick');

        $slickSlider.not('.slick-initialized').slick({
            // dots: true,
            accessibility: true,
            lazyLoad: 'ondemand',
            // mobileFirst: true,
            infinite: true,
            speed: 300,
            initialSlide: 3,
            // slidesToShow: 4,
            // slidesToScroll: 3,
            centerMode: true,
            centerPadding: '60px',
            variableWidth: true,
            prevArrow: '<button type="button" class="slick-prev">&lt;</button >',
            nextArrow: '<button type="button" class="slick-next">&gt;</button >',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        // slidesToShow: 3,
                        // slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 769,
                    settings: 'unslick'
                }
            ]
        });

        const $slides = $('.slick-slide');
        $slides.on('mouseenter.zoom', event => $(event.target).closest('.slick-slide').addClass('slick-slide--onTop'))
            .on('mouseleave.zoom', event => {
                const $slide = $(event.target).closest('.slick-slide');
                $slide.one('transitionend.zoom', _ => {
                    $slide.removeClass('slick-slide--onTop');
                });
            });
    }

    const resizeHandler = _ => {
        let resizeTimeout;
        $(window).on('resize', _ => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(_ => {
                initMobile();
                initSlick();
            }, 50);
        });
    }

    initMobile();

    // Always run IntersectionObserver for mobile active state tracking,
    // because Chrome has a bug where scroll(root) fails inside top-layer popovers!
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $('nav a').removeClass('activeFallback');
                $(`nav a[href="#${entry.target.id}"]`).addClass('activeFallback');
            }
        });
    }, { threshold: 0.5 });

    $('section').each((_, el) => observer.observe(el));

    // Smooth scroll handler to fix Safari scroll-snap bouncing bug
    $('nav a, .werkLink').on('click', function (event) {
        event.preventDefault();

        const targetId = $(this).attr('href');
        const target = $(targetId)[0];

        if (target) {
            // Temporarily disable scroll snap to prevent jumping
            $('html').removeClass('scrollSnap');

            target.scrollIntoView({ behavior: 'smooth' });

            // Re-enable scroll snap after scrolling is finished
            setTimeout(() => {
                $('html').addClass('scrollSnap');
            }, 800);
        }
    });

    resizeHandler();

    initSlick();

})