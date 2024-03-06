
import tippy from 'tippy.js';

export function initializeTooltips() {

    tippy('[title]', {
        arrow: false,
        placement: 'top',
        animation: 'fade',
        delay: 20,
        duration: 20,
        maxWidth: 500,
        allowHTML: true,
        theme: 'custom',
        ignoreAttributes: true,
        content: function(reference) {
            const title = reference.getAttribute('title');
            reference.removeAttribute('title');
            return title;
        }
    });
}


