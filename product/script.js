const app = new Vue({
    el: '#app',
    data: {
        name: 'T-shart',
        who: 'For men',
        // image: 'img/product-1.jpg',
        selectImg: 0,
        // inStock: 0,
        // instock: false,
        detail: ["100% cotton", "Style - Round Neck", "Machine-wash", "Print - Geometric", "Fit - Regular"],
        tshcolor: [
            { id: 1, tcolor: 'Red', imgURL: 'img/product-1.jpg', quantity: 10 },
            { id: 2, tcolor: 'Black', imgURL: 'img/product-2.jpg', quantity: 0 }
        ],
        cart: 0,
        cartColor: '#0003aa',
        cartClass: 'cartClass',
        cartClassDisabled: 'cartClassDisabled'
    },
    methods: {
        addtocart() {
            this.cart += 1;
        },
        imageUpdate(i) {
            this.selectImg = i
        }
    },
    computed: {
        title() {
            return this.name + " " + this.who
        },
        image() {
            return this.tshcolor[this.selectImg].imgURL
        },
        instock() {
            return this.tshcolor[this.selectImg].quantity
        }
    }
})