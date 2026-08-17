// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // تهيئة أيقونات Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const modal = document.getElementById('letterModal');
    const modalContent = modal ? modal.querySelector('div') : null;

    // دوال إدارة النافذة المنبثقة
    window.openModal = function () {
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        if (modalContent) modalContent.classList.add('modal-animate');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function () {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    };

    // إغلاق النافذة عند النقر خارج المحتوى
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                window.closeModal();
            }
        });
    }

    // زر نسخ البريد الإلكتروني أو الهاتف مع تنبيه مرئي
    window.copyToClipboard = function (text, label) {
        navigator.clipboard.writeText(text).then(() => {
            alert(`تم نسخ ${label} بنجاح: ${text}`);
        });
    };
});
