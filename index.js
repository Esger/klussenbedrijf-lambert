$(() => {
    const setActiveItem = element => {
        $('nav a').removeClass('active');
        $(element).addClass('active');
    };

    const intersectionCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.intersectionRatio >= 0.9) {
                    const sectionClassName = $(entry.target).closest('section')[0].classList[0];
                    const menuItem = $('nav .' + sectionClassName)[0];
                    console.log(menuItem, entry.intersectionRatio);
                    setActiveItem(menuItem);
                }
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

    $('.slick').slick({
        // dots: true,
        lazyLoad: 'ondemand',
        infinite: true,
        speed: 300,
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
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
})