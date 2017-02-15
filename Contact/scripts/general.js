import {slowHiderShower} from 'scripts/utility';

/**
 * removes loader of pages smoothly
 * @param {function} cb - callback function
 */
function hideLoader(cb) {
    slowHiderShower('.loading', 1, -0.09, cb);
}

/**
 * show loader of pages smoothly
 * @param {function} cb - callback function
 */
export function showLoader(cb = () => {
}) {
    slowHiderShower('.loading', 1, 0.09, cb);
}

$(function () {
    $('body').on('click', 'a[href]', function (e) {
        if (($(this).attr('href').indexOf("#") === 0) || $(this).attr('target'))
            return;
        e.preventDefault();
        const href = $(this).attr('href');
        showLoader(function () {
            window.location = href;
        });
    });
});

$(window).load(function () {
    hideLoader();
});
