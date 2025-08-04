// ملف JavaScript لصفحات تسجيل الدخول وإنشاء الحساب

document.addEventListener('DOMContentLoaded', function() {
    // التعامل مع نموذج تسجيل الدخول
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على قيم الحقول
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked || false;
            
            // التحقق من صحة البيانات
            if (!email || !password) {
                showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // محاكاة عملية تسجيل الدخول (في التطبيق الحقيقي، سيتم إرسال البيانات إلى الخادم)
            simulateLogin(email, password, remember);
        });
    }
    
    // التعامل مع نموذج إنشاء حساب جديد
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على قيم الحقول
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms')?.checked || false;
            
            // التحقق من صحة البيانات
            if (!fullname || !email || !phone || !password || !confirmPassword) {
                showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showAlert('كلمة المرور وتأكيد كلمة المرور غير متطابقين', 'error');
                return;
            }
            
            if (!terms) {
                showAlert('يجب الموافقة على الشروط والأحكام', 'error');
                return;
            }
            
            // محاكاة عملية إنشاء حساب جديد (في التطبيق الحقيقي، سيتم إرسال البيانات إلى الخادم)
            simulateRegister(fullname, email, phone, password);
        });
    }
    
    // التعامل مع أزرار تسجيل الدخول بواسطة وسائل التواصل الاجتماعي
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList[1].split('-')[0]; // google, facebook, linkedin, apple
            socialLogin(provider);
        });
    });
});

// دالة لعرض رسائل التنبيه
function showAlert(message, type = 'success') {
    // إنشاء عنصر التنبيه
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // إضافة العنصر إلى الصفحة
    const container = document.querySelector('.login-container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // إزالة التنبيه بعد 3 ثوانٍ
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// محاكاة عملية تسجيل الدخول
function simulateLogin(email, password, remember) {
    // إظهار رسالة تحميل
    showAlert('جاري تسجيل الدخول...', 'info');
    
    // محاكاة تأخير الشبكة
    setTimeout(() => {
        // في التطبيق الحقيقي، سيتم التحقق من البيانات على الخادم
        // هنا نقوم بمحاكاة نجاح عملية تسجيل الدخول
        
        // تخزين معلومات المستخدم في التخزين المحلي
        if (remember) {
            localStorage.setItem('user_email', email);
        }
        
        // إظهار رسالة نجاح
        showAlert('تم تسجيل الدخول بنجاح! جاري تحويلك...', 'success');
        
        // تحويل المستخدم إلى لوحة التحكم بعد 2 ثانية
        setTimeout(() => {
            window.location.href = 'admin/dashboard.html';
        }, 2000);
    }, 1500);
}

// محاكاة عملية إنشاء حساب جديد
function simulateRegister(fullname, email, phone, password) {
    // إظهار رسالة تحميل
    showAlert('جاري إنشاء الحساب...', 'info');
    
    // محاكاة تأخير الشبكة
    setTimeout(() => {
        // في التطبيق الحقيقي، سيتم إرسال البيانات إلى الخادم
        // هنا نقوم بمحاكاة نجاح عملية إنشاء الحساب
        
        // إظهار رسالة نجاح
        showAlert('تم إنشاء الحساب بنجاح! جاري تحويلك...', 'success');
        
        // تحويل المستخدم إلى صفحة تسجيل الدخول بعد 2 ثانية
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }, 1500);
}

// محاكاة تسجيل الدخول بواسطة وسائل التواصل الاجتماعي
function socialLogin(provider) {
    // إظهار رسالة تحميل
    showAlert(`جاري تسجيل الدخول باستخدام ${provider}...`, 'info');
    
    // محاكاة تأخير الشبكة
    setTimeout(() => {
        // في التطبيق الحقيقي، سيتم فتح نافذة منبثقة للمصادقة
        // هنا نقوم بمحاكاة نجاح عملية تسجيل الدخول
        
        // إظهار رسالة نجاح
        showAlert(`تم تسجيل الدخول باستخدام ${provider} بنجاح! جاري تحويلك...`, 'success');
        
        // تحويل المستخدم إلى لوحة التحكم بعد 2 ثانية
        setTimeout(() => {
            window.location.href = 'admin/dashboard.html';
        }, 2000);
    }, 1500);
}

// إضافة تنسيقات CSS للتنبيهات
const style = document.createElement('style');
style.textContent = `
    .alert {
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
        text-align: center;
    }
    
    .alert-success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .alert-error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .alert-info {
        background-color: #d1ecf1;
        color: #0c5460;
        border: 1px solid #bee5eb;
    }
`;
document.head.appendChild(style);