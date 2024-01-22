//모달
document.addEventListener("DOMContentLoaded", function() {
    var subscribeButton = document.querySelector('.subscribe button');
    var modal = document.querySelector('.modal');

    // 모달 열기
    subscribeButton.addEventListener('click', function () {
        modal.style.display = 'flex';
    });


    // 모달 닫기
    var closeModalButton = modal.querySelector('button');
    closeModalButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });
});

// 지도 api
var mapContainer = document.getElementById('mapIn'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);


// 여기까지는 잘 돌아가는 코드들

// 무한 스크롤
document.addEventListener('DOMContentLoaded', function () {
    const catEx = document.getElementById('show');
    const showMoreBtn = document.getElementById('showMore');
    let pageToFetch = 2;
    let initialButtonClick = false;

    function fetchImages(pageNum) {
        const url = 'https://picsum.photos/v2/list?page=' + pageNum + '&limit=6';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response problem.');
                }
                return response.json();
            })
            .then(datas => {
                makeImageList(datas);
                pageToFetch++;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function makeImageList(datas) {
        datas.forEach(item => {
            const liElement = document.createElement('li');
            const imgElement = document.createElement('img');
            imgElement.src = item.download_url;
            imgElement.alt = 'cat';
            liElement.appendChild(imgElement);
            catEx.appendChild(liElement);
        });
    }

    // showMore 버튼 클릭 시 초기 무한 스크롤 활성화
    showMoreBtn.addEventListener('click', function () {
        if (!initialButtonClick) {
            initialButtonClick = true;
            window.addEventListener('scroll', onScroll);
            fetchImages(pageToFetch);
        }
    });

    function onScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1600) {
            fetchImages(pageToFetch);
        }
    }
});





