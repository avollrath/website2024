document.addEventListener('DOMContentLoaded', function() {
    function makeSectionsClickable() {
        const clickableSections = document.querySelectorAll('.clickable-section');

        clickableSections.forEach(section => {
            const arrowLink = section.querySelector('.arrow-link');
            const arrowSvg = arrowLink.querySelector('svg');
            const heading = section.querySelector('h2');
            const img = section.querySelector('img');

            section.addEventListener('click', () => {
                window.location.href = arrowLink.href;
            });

            section.addEventListener('mouseover', () => {
                arrowSvg.style.transform = 'rotate(0deg)';
                if (img) {
                    img.style.transform = 'scale(1.1)';
                }
                if (section.classList.contains('bright-section')) {
                    heading.classList.add('cool-contrast-gradient');
                } else {
                    heading.classList.add('gradient-text');
                }
            });

            section.addEventListener('mouseout', () => {
                arrowSvg.style.transform = 'rotate(-45deg)';
                if (img) {
                    img.style.transform = 'scale(1.0)';
                }
                heading.classList.remove('gradient-text', 'cool-contrast-gradient');
            });
        });
    }
    makeSectionsClickable();
});
