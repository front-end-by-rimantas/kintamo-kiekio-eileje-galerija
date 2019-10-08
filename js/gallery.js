const services = [
    { name: 'Design' },
    { name: 'Develop' },
    { name: 'Analysis' },
    { name: 'Video' },
    { name: 'Functional' },
    { name: 'Marketing' }
];

const minItemWidth = 300;
const targetElement = document.querySelector('.row');
let targetElementWidth = parseInt(getComputedStyle( targetElement ).width);
let maxItemCount = Math.floor( targetElementWidth / minItemWidth );
let itemWidth = targetElementWidth / maxItemCount;
let firstItemIndex = 2 + maxItemCount;
let data = [
    ...[...services].splice(-maxItemCount),
    ...services,
    ...[...services].splice(0, maxItemCount)
];

function renderGallery() {
    let HTML = '';
    let itemHTML = '';

    updateGalleryStyles();

    data.forEach( (service, i) => {
        itemHTML += `<div class="item" style="width: ${itemWidth}px;">(${i+1}) ${service.name}</div>`;
    })

    HTML = `<div class="gallery">
                <div class="list" style="width: ${data.length * itemWidth}px;
                                        margin-left: ${-firstItemIndex * itemWidth}px;">
                    ${itemHTML}
                </div>
                <div class="controls">
                    <div class="previous">&lt;</div>
                    <div class="next">&gt;</div>
                </div>
            </div>`;
    
    targetElement.innerHTML = HTML;
    document.querySelector('.previous').addEventListener('click', show);
    document.querySelector('.next').addEventListener('click', show);
    return;
}

function updateGalleryStyles() {
    targetElementWidth = parseInt(getComputedStyle( targetElement ).width);
    maxItemCount = Math.floor( targetElementWidth / minItemWidth );
    itemWidth = targetElementWidth / maxItemCount;
    data = [
        ...[...services].splice(-maxItemCount),
        ...services,
        ...[...services].splice(0, maxItemCount)
    ];

    // targetElement.querySelectorAll('.item').forEach( item => {
    //     item.style.width = itemWidth + 'px';
    // })
    
    // targetElement.querySelector('.list').style.width = data.length * itemWidth + 'px';
    // targetElement.querySelector('.list').style.marginLeft = -firstItemIndex * itemWidth + 'px';

    return;
}

renderGallery();

function show( event ) {
    if ( event.target.classList.contains('previous') ) {
        firstItemIndex--;
        if ( firstItemIndex === 0 ) {
            firstItemIndex = services.length - 1;
        }
    } else {
        firstItemIndex++;
        if ( firstItemIndex === data.length + 1 ) {
            firstItemIndex = maxItemCount;
        }
    }

    return renderGallery();
}

window.addEventListener('resize', renderGallery)