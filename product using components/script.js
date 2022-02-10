Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="mainComponent">
        <div class="product">

            <div class="proimg">
                <img v-bind:src="image" alt="">
            </div>

            <div class="proinfo">
                <h1>{{title}}</h1>


                <h3 v-if="instock > 10">In stock</h3>
                <h3 v-else-if="instock <= 10 && instock > 0"> Almost sold out!</h3>
                <h3 v-else>Out of stock</h3>

                <p>Shipping : {{shipping}}</p>

                <ul>
                    <li v-for="i in detail">{{i}}</li>
                </ul>

                <h3>Color : </h3>

                <p class="tshartcolor" v-for="(j,i) in tshcolor" @mouseover="imageUpdate(i)" @click="imageUpdate(i)"
                    :style="{background:j.tcolor}">
                    {{j.tcolor}}
                </p><br>


                <button v-on:click="addtocart" :disabled="!instock" :class=[instock?cartClass:cartClassDisabled]>Add To
                    Cart</button>

            </div>

        </div>

        <div>
            <h2>Review</h2>
            <p v-if="!reviews.length">There are no Review yet.</p>
            <div v-for="i in reviews">
                <p>Name : {{i.name}}</p>
                <p>Rating : {{i.rating}}</p>
                <p>Review : {{i.review}}</p>
            </div>
        </div>

        <productReview @review-product-detail="reviewDetail"></productReview>
    </div>`,
    data() {
        return {
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
            cartClass: 'cartClass',
            cartClassDisabled: 'cartClassDisabled',
            reviews: []
        }
    },
    methods: {
        addtocart() {
            this.$emit('add-to-cart', this.tshcolor[this.selectImg].id)
        },
        imageUpdate(i) {
            this.selectImg = i
        },
        reviewDetail(productReview) {
            this.reviews.push(productReview)
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
})


Vue.component('productReview', {
    template: `
    <div>
        <p v-if="errors.length">
            <b><u>Error</u></b>
            <ul>
                <li v-for="i in errors">{{i}}</li>
            </ul>
        </p>
        <form @submit.prevent="onSubmit">
            <table>
                <tr>
                    <td>
                        <label for="name">Name </label>
                    </td>
                    <td>
                        <input type="text" id="name" v-model="name">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="review">Review </label>
                    </td>
                    <td>
                        <textarea id="review" cols="30" rows="3" v-model="review" ></textarea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="rating">Rating </label>
                    </td>
                    <td>
                        <select name="" id="rating" v-model.number="rating">
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="submit" value="Submit" class="cartClass">
                    </td>
                </tr>
            </table>
        </form>
    </div>`,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating){
                let reviewData = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-product-detail', reviewData)
                this.name = null
                this.review = null
                this.rating = null
            }
            else{
                if(!this.name)this.errors.push("Name Required!")
                if(!this.review)this.errors.push("Review Required!")
                if(!this.rating)this.errors.push("Rating Required!")
            }
        }
    }
})



const app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cartColor: '#0003aa',
        cart: []
    },
    methods: {
        updateCard(id) {
            this.cart.push(id)
        }
    }
})