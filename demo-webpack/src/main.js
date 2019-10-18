import './scss/index.scss'
import imgs from './assets/img/a.png';
import './assets/iconfont/iconfont.css';
// import $ from 'jquery'
import './scss/swiper.scss'
import Swiper from 'swiper'

import axios from 'axios'

// console.log(axios, 'axios')
const swiperWrapper = document.querySelector('.swiper-wrapper');

axios.get('/getCanrouselist').then(res => {
  console.log(res.data, 'res--------------res')
  swiperWrapper.innerHTML = res.data.map(item => {
     return `<div class="swiper-slide"> <img src=${item.img} > </div>`
   }).join('')
})


new Swiper('.swiper-container', {})