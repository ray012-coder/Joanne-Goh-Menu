document.addEventListener('DOMContentLoaded', function() {
    let totalPrice = 0;
    const priceDisplay = document.querySelector('.total-amount');

    // 1. 点餐加购逻辑
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const priceText = this.closest('.product-info').querySelector('.price').innerText;
            const price = parseInt(priceText.replace('￥', ''));
            
            totalPrice += price;
            
            // 更新金额显示
            if(priceDisplay) {
                priceDisplay.innerText = '￥' + totalPrice;
                priceDisplay.style.transform = 'scale(1.2)';
                setTimeout(() => priceDisplay.style.transform = 'scale(1)', 150);
            }

            // 按钮点击动画
            this.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(0.8)' },
                { transform: 'scale(1)' }
            ], { duration: 150 });
        });
    });

    // 2. 搜索功能逻辑 (如果页面有搜索框)
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const keyword = e.target.value.toLowerCase();
            document.querySelectorAll('.product-card').forEach(card => {
                const name = card.querySelector('.product-name').innerText.toLowerCase();
                card.style.display = name.includes(keyword) ? 'flex' : 'none';
            });
        });
    }

    // 3. 结算提醒
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (totalPrice === 0) {
                alert("🛒 选几杯好喝的犒劳一下自己吧！");
            } else {
                if (confirm(`🎉 确认下单？\n合计金额：￥${totalPrice}`)) {
                    alert("支付成功！湯鈜驛正在为你加急配送... 🏃💨");
                    totalPrice = 0;
                    priceDisplay.innerText = '￥0';
                }
            }
        });
    }
});