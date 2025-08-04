// تسجيل Service Worker للعمل دون اتصال بالإنترنت
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../service-worker.js')
            .then(registration => {
                console.log('تم تسجيل Service Worker بنجاح:', registration.scope);
            })
            .catch(error => {
                console.log('فشل تسجيل Service Worker:', error);
            });
    });
}

// انتظار تحميل المستند بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل القائمة المتجاوبة
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // تبديل حالة القائمة
        nav.classList.toggle('active');

        // تحريك عناصر القائمة
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // تحريك زر البرجر
        burger.classList.toggle('toggle');
    });

    // زر العودة للأعلى
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // تصفية معرض السيارات
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // إزالة الفلتر النشط
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة الفلتر النشط للزر المضغوط
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            carCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // تفعيل التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            // إغلاق القائمة المتجاوبة عند النقر على رابط
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // تفعيل نموذج الاتصال
    const contactForm = document.getElementById('inquiry-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكن إضافة كود للتحقق من صحة البيانات
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const inquiryType = document.getElementById('inquiry-type').value;
            const message = document.getElementById('message').value;

            // التحقق من صحة البيانات
            if (!name || !email || !phone || !inquiryType || !message) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }

            // يمكن هنا إضافة كود لإرسال البيانات إلى الخادم
            // في هذا المثال سنعرض رسالة نجاح فقط
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            contactForm.reset();
        });
    }

    // تفعيل النشرة البريدية
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('يرجى إدخال بريدك الإلكتروني');
                return;
            }
            
            // يمكن هنا إضافة كود لإرسال البيانات إلى الخادم
            alert('تم الاشتراك في النشرة البريدية بنجاح!');
            this.reset();
        });
    }

    // تفعيل تأثيرات التمرير
    const scrollElements = document.querySelectorAll('.about-content, .cars-grid, .services-grid, .testimonials-slider, .contact-content');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementHeight = el.getBoundingClientRect().height;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // تفعيل التأثيرات عند تحميل الصفحة
    handleScrollAnimation();
});

// وظيفة تبديل اللغة
let currentLanguage = 'ar';

function toggleLanguage() {
    const body = document.body;
    const langText = document.getElementById('lang-text');
    const html = document.documentElement;
    
    if (currentLanguage === 'ar') {
        // التبديل إلى الإنجليزية
        currentLanguage = 'en';
        body.classList.add('en');
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        langText.textContent = 'عربي';
        
        // تحديث النصوص
        updateTexts('en');
        
        // تحديث إعدادات البوت
        if (window.ChatWidgetConfig) {
            window.ChatWidgetConfig.branding.welcomeText = 'Hi 👋, how can we help?';
            window.ChatWidgetConfig.branding.responseTimeText = 'We typically respond right away';
        }
    } else {
        // التبديل إلى العربية
        currentLanguage = 'ar';
        body.classList.remove('en');
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        langText.textContent = 'EN';
        
        // تحديث النصوص
        updateTexts('ar');
        
        // تحديث إعدادات البوت
        if (window.ChatWidgetConfig) {
            window.ChatWidgetConfig.branding.welcomeText = 'مرحباً 👋، كيف يمكننا مساعدتك؟';
            window.ChatWidgetConfig.branding.responseTimeText = 'نحن نرد عادة في الحال';
        }
    }
    
    // حفظ اللغة المختارة
    localStorage.setItem('selectedLanguage', currentLanguage);
}

function updateTexts(lang) {
    // تحديث عناصر القائمة
    const navLinks = document.querySelectorAll('.nav-links a[data-ar][data-en]');
    navLinks.forEach(link => {
        link.textContent = link.getAttribute(`data-${lang}`);
    });
    
    // تحديث العناوين والنصوص
    const elementsToUpdate = [
        'hero-title',
        'hero-subtitle',
        'browse-cars-btn',
        'contact-btn'
    ];
    
    elementsToUpdate.forEach(id => {
        const element = document.getElementById(id);
        if (element && element.hasAttribute(`data-${lang}`)) {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });
    
    // تحديث اللوجو
    const logo = document.getElementById('logo-text');
    if (logo) {
        logo.textContent = lang === 'ar' ? 'أوتو إليت' : 'Auto Elite';
    }
    
    // تحديث عنوان الصفحة
    document.title = lang === 'ar' ? 'معرض السيارات الفاخرة' : 'Luxury Car Gallery';
    
    // تحديث الوصف
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = lang === 'ar' 
            ? 'معرض أوتو إليت للسيارات الفاخرة - أفضل معرض لبيع وشراء السيارات الفاخرة والرياضية'
            : 'Auto Elite Luxury Car Gallery - The best gallery for buying and selling luxury and sports cars';
    }
}

// تحميل اللغة المحفوظة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && savedLanguage !== currentLanguage) {
        toggleLanguage();
    }
});

// إضافة خط Roboto للإنجليزية
const robotoFont = document.createElement('link');
robotoFont.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
robotoFont.rel = 'stylesheet';
document.head.appendChild(robotoFont);