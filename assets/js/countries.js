/*
 * IFAD 공통 참가국 목록 로더
 * 각 페이지의 사이드바에서 countries.html을 불러옵니다.
 */

(function () {
    'use strict';

    function loadCountries() {
        var container = document.getElementById('countries-container');

        if (!container) {
            return;
        }

        // 이 스크립트의 위치를 기준으로 countries.html 경로를 찾습니다.
        var scriptUrl = document.currentScript &&
                        document.currentScript.src
            ? document.currentScript.src
            : window.location.href;

        var countriesUrl = new URL('../../countries.html', scriptUrl);

        fetch(countriesUrl.href, {
            cache: 'no-cache'
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error(
                    'countries.html 불러오기 실패: ' + response.status
                );
            }

            return response.text();
        })
        .then(function (html) {
            container.innerHTML = html;
        })
        .catch(function (error) {
            console.error(
                '참가국 목록을 불러오지 못했습니다.',
                error
            );

            container.innerHTML =
                '<p>참가국 목록을 불러오지 못했습니다. 페이지를 새로고침해 주세요.</p>';
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            loadCountries
        );
    } else {
        loadCountries();
    }
})();
