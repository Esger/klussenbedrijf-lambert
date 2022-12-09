$(() => {
    let isMobile;

    const initMobile = () => {
        isMobile = window.innerWidth < 769;
        if (isMobile) {
            $('html').removeClass('DESKTOP');
            $('html').addClass('MOBILE');
        } else {
            $('html').removeClass('MOBILE');
            $('html').addClass('DESKTOP');
        }
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
            slidesToShow: 4,
            slidesToScroll: 3,
            centerMode: true,
            centerPadding: '60px',
            variableWidth: true,
            prevArrow: '<button type="button" class="slick-prev">&lt;</button >',
            nextArrow: '<button type="button" class="slick-next">&gt;</button >',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
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

    const onScrollStop = callback => {
        let isScrolling;
        window.addEventListener(
            'scroll',
            e => {
                clearTimeout(isScrolling);
                isScrolling = setTimeout(() => {
                    callback();
                }, 150);
            },
            { passive: true }
        );
    };

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
                const visibleSection = $(entry.target).closest('section')[0];
                if (entry.isIntersecting) {
                    if (entry.intersectionRatio > 0.5) {
                        setTimeout(() => {
                            $(visibleSection).addClass('visible');
                        }, 500);
                        const sectionClassname = visibleSection.classList[0];
                        toggleWerklink(sectionClassname);
                        const menuItem = $('nav .' + sectionClassname)[0];
                        setActiveItem(menuItem);
                    }
                    if (entry.intersectionRatio <= 0.5) {
                        $(visibleSection).removeClass('visible');
                    }
                } else {
                    $(visibleSection).removeClass('visible');
                }
            });
        }

        const options = {
            root: null,
            threshold: 1.0
        }

        const sectionObserver = new IntersectionObserver(intersectionCallback, options);

        const $sections = $('.activeMenuIndicator');
        $sections.each(function () {
            sectionObserver.observe(this);
        })

        const setScrollSnap = _ => {
            $('html').addClass('scrollSnap');
        }
        onScrollStop(setScrollSnap);

        $('nav a').first().addClass('active');
        $('header').on('click', 'a', function (event) {
            $('html').removeClass('scrollSnap');
            target = $('#' + this.classList[0])[0];
            target.scrollIntoView({ behavior: "smooth" });
            setActiveItem(event.target);
        });
    }

    const initHamburger = _ => {
        const $nav = $('header nav');
        const $hamburger = $('.hamburger');
        const $navItem = $('nav a');
        const setMobile = _ => {
            $nav.hide('slow');
            $hamburger.show('slow');
        }
        const setDesktop = _ => {
            $nav.show('slow');
            $hamburger.hide('slow');
        }
        isMobile ? setMobile() : setDesktop();

        $hamburger.off('click').on('click', _ => {
            setDesktop();
        });
        $navItem.off('click').on('click', _ => {
            if (isMobile) {
                setMobile();
            }

        });
    }

    const resizeHandler = _ => {
        let resizeTimeout;
        $(window).on('resize', _ => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(_ => {
                initMobile();
                initSlick();
                initHamburger();
            }, 50);
        });
    }

    initMobile();

    initHamburger();

    activeSectionWatcher();

    resizeHandler();

    initSlick();

})