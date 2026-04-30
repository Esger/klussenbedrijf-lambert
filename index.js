$(() => {
    let isMobile;

    const initMobile = () => {
        isMobile = window.innerWidth < 769;
        $('html').toggleClass('MOBILE', isMobile).toggleClass('DESKTOP', !isMobile);
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

    const activeSectionWatcher = _ => {

        const setActiveItem = element => {
            $('nav a').removeClass('active');
            $(element).addClass('active');
        };

        const $werkLink = $('.werkLink');

        const toggleWerklink = sectionClassname => {
            const hideClasses = 'fotosWerk contact';
            if (hideClasses.includes(sectionClassname))
                $werkLink.addClass('hide');
            else
                $werkLink.removeClass('hide');
        }

        const intersectionCallback = (entries) => {
            entries.forEach(entry => {
                console.log(entry.target);
                if (entry.isIntersecting) {
                    const visibleSection = entry.target;
                    if (entry.intersectionRatio > 0.6) {
                        $('section').not(visibleSection).removeClass('visible');
                        $(visibleSection).addClass('visible');
                        const sectionClassname = visibleSection.classList[0];
                        toggleWerklink(sectionClassname);
                        const menuItem = $('nav .' + sectionClassname)[0];
                        setActiveItem(menuItem);
                    }
                }
            });
        }

        const options = {
            root: null,
            threshold: 0.8,
            rootMargin: '0px',
        }

        const sectionObserver = new IntersectionObserver(intersectionCallback, options);

        const $sections = $('section');
        $sections.each(function () {
            sectionObserver.observe(this);
        });

        $('nav a').first().addClass('active');
        $('body').on('click', 'a', function (event) {
            $('html').removeClass('scrollSnap');
            target = $('#' + this.classList[0])[0];
            target.scrollIntoView();
            setActiveItem(event.target);
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

    activeSectionWatcher();

    resizeHandler();

    initSlick();

})