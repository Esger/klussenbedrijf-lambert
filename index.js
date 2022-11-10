$(() => {
    const isMobile = window.innerWidth < 769;
    const setActiveItem = element => {
        $('nav a').removeClass('active');
        $(element).addClass('active');
    };
    const setVisibleSection = element => {
        // $('section').not(element).removeClass('visible');
        $(element).addClass('visible');
    };

    const intersectionCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.intersectionRatio >= 0.7) {
                    const visibleSection = $(entry.target).closest('section')[0];
                    setVisibleSection(visibleSection);
                    const sectionClassName = visibleSection.classList[0];
                    const menuItem = $('nav .' + sectionClassName)[0];
                    console.log(menuItem, entry.intersectionRatio);
                    setActiveItem(menuItem);
                }
            }
        });
    }

    const initSlick = _ => {

        $('.slick').slick({
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


    activeSectionWatcher();

    initSlick();
    let resizeTimeout;
    $(window).on('resize', _ => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(_ => {
            initSlick();
        }, 50);
    });

})