function randomId() {
    return Math.floor(Math.random() * 100000);
}


function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

let products = [
    {
        id: randomId(),
        name: 'Váy prom xòe màu hồng',
        description:
            'Váy được thiết kế với phần trễ vai nhưng vẫn đảm bảo vô cùng kín đáo giúp vừa phù hợp với lứa tuổi lại vừa trở nên nữ tính và lỗng lẫy hơn.',
        price: 250000,
        image:
            'https://www.genvietnam.net/wp-content/uploads/2018/11/vay-prom-cho-hoc-sinh-389-700x700.jpg',
        count: 1,
    },
    {
        id: randomId(),
        name: 'Váy 2 dây dáng xòe bồng',
        description:
            'Váy dạ hội ngắn được nhiều người bạn trẻ yêu thích chính là mẫu váy 2 dây điệu đà với phần chân váy được thiết kế xòe bồng rực rỡ và rất nổi bật.',
        price: 350000,
        image:
            'https://www.genvietnam.net/wp-content/uploads/2018/11/vay-prom-cho-hoc-sinh-890-700x700.jpg',
        count: 1,
    },
    {
        id: randomId(),
        name: 'Váy đi prom ren trắng',
        description:
            'Váy ren trắng được xem là một sự lựa chọn hoàn hảo nhất dành cho các cô nàng của chúng ta, nhất là với những bạn đang ở lứa tuổi 18 đôi mươi thì màu trắng luôn tượng trưng cho sự tinh khôi, trẻ trung và trong sáng theo đúng với lứa tuổi của học trò.',
        price: 250000,
        image:
            'https://www.genvietnam.net/wp-content/uploads/2018/11/Shop-b%C3%A1n-v%C3%A1y-d%E1%BA%A1-h%E1%BB%99i-v%C3%A1y-prom-H%C3%A0-N%E1%BB%99i-4.jpg',
        count: 1,
    },
];
let promotionCode = {
    A: 10,
    B: 20,
    C: 30,
    D: 40,
};

let productsEle = document.querySelector('.products');

let subTotalEl = document.querySelector('.subtotal span');
let vatEl = document.querySelector('.vat span');
let discount = document.querySelector('.discount');
let discountEle = document.querySelector('.discount span');
let totalEle = document.querySelector('.total span');

let btnPromotion = document.querySelector('.promotion button');
let inputPromotion = document.querySelector('#promo-code');


function renderUI(arr) {
    productsEle.innerHTML = '';


    let countEle = document.querySelector('.count');
    countEle.innerText = `Có ${updateTotalItem(arr)} mặt hàng`;


    updateTotalMoney(arr);

    if (arr.length == 0) {
        productsEle.insertAdjacentHTML(
            'afterbegin',
            '<li>Không có sản phẩm nào trong giỏ hàng</li>'
        );
        document.querySelector('.option-container').style.display = 'none';
        return;
    }

    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        productsEle.innerHTML += `
            <li class="row">
                <div class="col left">
                    <div class="thumbnail">
                        <a href="#">
                            <img src="${p.image}" alt="${p.name}">
                        </a>
                    </div>
                    <div class="detail">
                        <div class="name"><a href="#">${p.name}</a></div>
                        <div class="description">
                            ${p.description}
                        </div>
                        <div class="price">${convertMoney(p.price)}</div>
                    </div>
                </div>
                <div class="col right">
                    <div class="quantity">
                        <input 
                            type="number" 
                            class="quantity" 
                            step="1" 
                            value="${p.count}" 
                            onchange="changeTotalProduct(${p.id}, event)"
                            oninput="this.value =
                            !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null" 
                        >
                    </div>
                    <div class="remove">
                     
                        <i id="remove" title="Remove" class="fa fa-trash danger" onclick="removeItem(${p.id})"></i>
                        </span>
                    </div>
                   
                </div>
            </li>
        `;
    }
}

function updateTotalItem(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        total += p.count;
    }
    return total;
}
function removeItem(id) {
    let confirmed = window.confirm("Bạn chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
    if (confirmed) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products.splice(i, 1);
            }
        }
        renderUI(products);
    }
}
function changeTotalProduct(id, e) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].count = Number(e.target.value);
        }
    }
    renderUI(products);
}

function updateTotalMoney(arr) {

    let totalMoney = 0;
    let discountMoney = 0;

    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        totalMoney += p.count * p.price;
    }


    let data = checkPromotion();

    if (data) {
        discountMoney = (totalMoney * data) / 100;
        discount.classList.remove('hide');
    } else {
        discount.classList.add('hide');
    }


    subTotalEl.innerText = convertMoney(totalMoney);
    vatEl.innerText = convertMoney(totalMoney * 0.05);
    discountEle.innerText = convertMoney(discountMoney);
    totalEle.innerText = convertMoney(totalMoney * 1.05 - discountMoney);
}


function checkPromotion() {
    let value = inputPromotion.value;
    if (promotionCode[value]) {
        return promotionCode[value];
    }
    return 0;
}

btnPromotion.addEventListener('click', function () {
    updateTotalMoney(products);
});

window.onload = function () {
    let isLogin = JSON.parse(localStorage.getItem('userLogin'));
    console.log(isLogin);

    if (isLogin == undefined) {
        window.location.href = 'login.html'
    } else if (isLogin.isLogin) {
        window.onload = renderUI(products);
    } else {
        window.location.href = 'login.html'
    }

}