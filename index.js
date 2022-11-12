$(() => {
    let isMobile;

    const initMobile = () => {
        isMobile = window.innerWidth < 769;
        if (isMobile) {
            $('body').removeClass('DESKTOP');
            $('body').addClass('MOBILE');
        } else {
            $('body').removeClass('MOBILE');
            $('body').addClass('DESKTOP');
        }
    }

    const initSlick = _ => {
        const $slickSlider = $('.slick');

        $slickSlider.slick({
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
                    breakpoint: 768,
                    settings: 'unslick'
                },
                // {
                //     breakpoint: 768,
                //     settings: {
                //         arrows: false,
                //         slidesToShow: 2,
                //         slidesToScroll: 1
                //     }
                // },
                // {
                //     breakpoint: 480,
                //     settings: {
                //         arrows: false,
                //         slidesToShow: 1,
                //         slidesToScroll: 1
                //     }
                // }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });

    }

    const activeSectionWatcher = _ => {

        const setActiveItem = element => {
            $('nav a').removeClass('active');
            $(element).addClass('active');
        };

        const setVisibleSection = element => {
            $(element).addClass('visible');
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
                    if (entry.intersectionRatio >= 0.7) {
                        setVisibleSection(visibleSection);
                        const sectionClassname = visibleSection.classList[0];
                        toggleWerklink(sectionClassname);
                        const menuItem = $('nav .' + sectionClassname)[0];
                        setActiveItem(menuItem);
                    }
                } else {
                    // $(visibleSection).removeClass('visible');
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

        $('nav a').first().addClass('active');
        $('nav a').on('click', event => {
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

    initMobile();

    initHamburger();

    activeSectionWatcher();

    initSlick();

    let resizeTimeout;
    $(window).on('resize', _ => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(_ => {
            initMobile();
            initSlick();
            initHamburger();
        }, 50);
    });

})