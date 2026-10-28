
/*
 * IFAD 공통 참가국 목록 로더
 */

(function () {
    'use strict';

    function loadCountries() {
        var container = document.getElementById('countries-container');

        if (!container) {
            return;
        }

        // 공통 참가국 파일 경로
        var countriesUrl = new URL(
            'countries.html',
            window.location.origin +
                window.location.pathname.substring(
                    0,
                    window.location.pathname.lastIndexOf('/') + 1
                )
        );

        // 참가국 목록 불러오기
        fetch(countriesUrl.href, {
            cache: 'no-cache'
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(
                        'countries.html 불러오기 실패: ' +
                        response.status
                    );
                }

                return response.text();
            })
            .then(function (html) {
                // 참가국 목록 삽입
                container.innerHTML = html;

                // 브라우저가 목록의 레이아웃을 반영한 뒤
                // 기존 사이드바 높이를 다시 계산
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        if (window.jQuery) {
                            window.jQuery(window).trigger(
                                'resize.sidebar-lock'
                            );
                        }
                    });
                });
            })
            .catch(function (error) {
                console.error(
                    '참가국 목록 로딩 오류:',
                    error
                );

                container.innerHTML =
                    '<p>참가국 목록을 불러오지 못했습니다.</p>';
            });
    }

    // DOM 준비 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            loadCountries
        );
    } else {
        loadCountries();
    }
})();
