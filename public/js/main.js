// Book Management System - Client-side JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle delete button clicks
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const deleteModal = document.getElementById('deleteModal');
    const deleteForm = document.getElementById('deleteForm');
    const bookTitleSpan = document.getElementById('bookTitle');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-book-id');
            const bookTitle = this.getAttribute('data-book-title');

            if (bookTitleSpan) {
                bookTitleSpan.textContent = bookTitle;
            }

            if (deleteForm) {
                deleteForm.action = `/books/${bookId}?_method=DELETE`;
            }

            if (deleteModal) {
                const modal = new bootstrap.Modal(deleteModal);
                modal.show();
            }
        });
    });

    // Handle favorite toggle
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookId = this.getAttribute('data-book-id');
            const isFavorite = this.getAttribute('data-favorite') === 'true';

            // Show loading state
            const icon = this.querySelector('i');
            const originalClass = icon.className;
            icon.className = 'bi bi-arrow-clockwise';
            icon.style.animation = 'spin 1s linear infinite';

            // Make AJAX request
            fetch(`/books/${bookId}/favorite`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Update button state
                        this.setAttribute('data-favorite', data.favorite.toString());

                        // Update icon
                        icon.style.animation = '';
                        if (data.favorite) {
                            icon.className = 'bi bi-heart-fill text-danger';
                        } else {
                            icon.className = 'bi bi-heart';
                        }

                        // Show success message
                        showNotification(
                            data.favorite ? 'Added to favorites!' : 'Removed from favorites!',
                            'success'
                        );
                    } else {
                        throw new Error(data.error || 'Failed to update favorite status');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    icon.style.animation = '';
                    icon.className = originalClass;
                    showNotification('Failed to update favorite status', 'error');
                });
        });
    });

    // Search form enhancements
    const searchInput = document.querySelector('input[name="search"]');
    if (searchInput) {
        let searchTimeout;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                // Auto-submit search after 500ms of no typing
                if (this.value.length >= 3 || this.value.length === 0) {
                    this.form.submit();
                }
            }, 500);
        });
    }

    // Form validation enhancement
    const forms = document.querySelectorAll('form[novalidate]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();

                // Focus on first invalid field
                const firstInvalidField = form.querySelector(':invalid');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }

                showNotification('Please fill in all required fields correctly', 'error');
            }
            form.classList.add('was-validated');
        });
    });

    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        if (alert.classList.contains('alert-success')) {
            setTimeout(() => {
                alert.style.opacity = '0';
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.parentNode.removeChild(alert);
                    }
                }, 300);
            }, 5000);
        }
    });

    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.book-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const alertTypes = {
        'success': 'alert-success',
        'error': 'alert-danger',
        'warning': 'alert-warning',
        'info': 'alert-info'
    };

    const icons = {
        'success': 'bi-check-circle',
        'error': 'bi-exclamation-triangle',
        'warning': 'bi-exclamation-triangle',
        'info': 'bi-info-circle'
    };

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertTypes[type]} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 1050;
        min-width: 300px;
        max-width: 400px;
    `;

    alertDiv.innerHTML = `
        <i class="bi ${icons[type]}"></i> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.style.opacity = '0';
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 300);
        }
    }, 4000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+N or Cmd+N to add new book
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        window.location.href = '/books/add';
    }

    // Ctrl+F or Cmd+F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        const searchInput = document.querySelector('input[name="search"]');
        if (searchInput) {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
    }

    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.querySelector('input[name="search"]');
        if (searchInput && searchInput === document.activeElement) {
            searchInput.value = '';
            searchInput.form.submit();
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.card h2');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 20;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 50);
    });
}

// Run counter animation when page loads
window.addEventListener('load', function() {
    setTimeout(animateCounters, 500);
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}