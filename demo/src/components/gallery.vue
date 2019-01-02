<template>
    <div id="gallery">
        
        <div class="gallery-background">
            <div class="gallery-background-head">Gallery</div>
        </div>

        <div class="gallery-content">

            <div class="gallery-position">
                <span>您当前的位置:</span>
                <span @click="handleClick('/first/official',true)"><i class="fa fa-tag fa-lg"></i>首页</span>
                <span><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span @click="handleClick('/first/gallery',true)"><i class="fa fa-tag fa-lg"></i>相册</span>
                <span v-if="showImg"><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span v-if="showImg"><i class="fa fa-tag fa-lg"></i>图片</span>
            </div>

            <div class="wrap" v-if="!showImg">
                <div class="search">
                    <input type="text" v-model="message" class="searchTerm" placeholder="What are you looking for?" @keydown="search($event)">
                    <i class="fa fa-search fa-lg searchButton"></i>
                </div>
            </div>

            <div class="gallery-content-box">

                <div v-if="showImg">
                    <div class="gallery-content-image" v-for="(srcs,index) in imageList" @mouseover="over(index)" @mouseout="leave(index)">
                        <img :src="srcs" class="img-slide">
                        <p class="gallery-content-image-head" :id="index">精选图{{index+1}}</p>
                    </div>
                </div>

                <div v-if="!showImg" v-show="!showSearch">
                    <div class="gallery-content-image" v-for="item in galleryList" @click="showImage()">
                        <img v-lazy="item.thumb.upload" class="image">
                        <div class="gallery-head">
                            {{item.name}}
                        </div> 
                    </div>
                </div>

                <div v-if="!showImg" v-show="showSearch">
                    <div class="gallery-content-image" v-for="item in showList" @click="showImage()">
                        <img v-lazy="item.upload" class="image">
                        <div class="gallery-head">
                            {{item.model_data.name}}
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div class="login-in" v-if="showLogin">

          <div class="login-box">

            <div class="login-box-image">
              <img src="../images/登录.png" alt="">
            </div>

            <div class="login-box-head">
              Please log in first !
            </div>

            <div class="Login-box-button">
              <div class="Login-box-button-cancel" @click="hideLogin()">
                Cancel
              </div>
              <div class="Login-box-button-login" @click="handleClick('/sign')">
                Login | Register
              </div>
            </div>

          </div>

        </div>

        <div class="footer">
            <div class="footer-content">
                Copyright 2018 Powered By 旋仔
            </div>
        </div>

        <div class="gallery-showpicture">
            
            <div class="gallery-hide" @click="hidePicture()"></div>
            
            <div class="gallery-showpicture-image">
                <img :src="picture">
            </div>

            <div class="gallery-showpicture-icon">
                <i class="fa fa-close fa-lg" @click="hidePicture()"></i>
            </div>

        </div>

        <div class="pic-box pic-box-hide">
            <div class="pic-back"></div>
            <div class="pic-button">
                <span class="pic-icon play-stop">
                    <i class="fa fa-play fa-lg pic-play"></i>
                    <i class="fa fa-pause fa-lg pic-stop"></i>
                </span>
                <span class="pic-icon">
                    <i class="fa fa-television fa-lg pic-fullscreen"></i>
                </span>
                <span class="pic-icon pic-close">
                    <i class="fa fa-close fa-lg"></i>
                </span>                    
            </div>
            <div class="pic-arrow pic-left">
                <i class="fa fa-arrow-left fa-lg"></i>
            </div>
            <div class="pic-arrow pic-right">
                <i class="fa fa-arrow-right fa-lg"></i>
            </div>
            <img src="" class="pic-img">
        </div>

    </div>
</template>

<script>

    import showPictureBox from '../js/image.main.min.js'

    export default {

        data() {

            return {
                /*
                    保存相册列表
                    name:相册名称
                    id:相册id
                    http://qwebfx-test.deali.cn/+thumb.upload  相册缩略图
                */
                galleryList:[],
                //存放图片地址
                imageList:[],

                picture:"",
                //是否显示图片
                showImg:false,
                //记录请求的次数
                times:1,
                //相册的总页数
                totalPage:"",
                //显示登录提示
                showLogin:false,
                //是否显示搜索结果
                showSearch:false,
                //存放搜索信息
                message:"",
                /*
                    存放搜索列表
                    model_data.name:相册名称
                    model_data.thumb_id:相册缩略图id
                */
                showList:[],
                /* 
                    存放缩略图信息
                    name:缩略图名称
                    description:缩略图描述
                    id:缩略图的id
                */
                storageThumbList:[]

            }

        } ,

        methods: {

    //初始化缩略图数组
            initialThumbList(list) {

                var _this = this

                this.storageThumbList.length = 0

                list.forEach(function(value) {

                    _this.storageThumbList.push(value)

                })

            },

            //请求缩略图列表
            getThumbList() {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/thumb/list",

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialThumbList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

    //筛选搜索结果
    selectData(list) {

      var _this = this

       _this.showList.length = 0

       _this.galleryList.length = 0

      list.forEach(function(value) {

        if(value.model_name == "ImageCategory") {

          _this.showList.push(value)

        }

      })

      this.showList.forEach(function(valuePic) {

          _this.storageThumbList.forEach(function(valueThu) {

              if(valuePic.model_data.thumb_id == valueThu.id) {

                  valuePic.upload = "http://qwebfx-test.deali.cn"+valueThu.upload

              }

          })

      })

      console.log(this.showList)

    },

    //搜索
    search(event) {

      var _this = this

      if(event.keyCode == 13) {

        if(this.message == "") {

          return 

        }

        $.ajax({

          url:"http://qwebfx-test.deali.cn/api/search/?w="+_this.message,

          type:"GET",

          success(data) {

            var list = data.result

            _this.showSearch = true

            _this.message = ""

            _this.selectData(list)

          },error() {

            console.log("请求数据失败")

          }

        })

      }

    },

    //隐藏登录提示框
    hideLogin() {

      this.showLogin = false

    },

            //显示图库
            showImage() {

                var _this = this

                if(this.$store.state.userName == "") {

                     this.showLogin = true

                     return

                }

                this.showImg = true

                this.imageList.length = 0

                if(this.showImg == true) {

                    $('.gallery-content-box').css({"margin":"3rem 0"})

                }

                //初始化10张图片地址
                for(var i = 0 ; i < 12 ; i ++)  {

                    this.getPicture()

                }

                //判断是否准备滚动到底部
                $('#first').scroll(function() {

                    var justify = document.querySelector('#first').scrollHeight - $('#first').scrollTop() - $('#first').height() < 100

                    //如果是则进行一次10张图片的请求
                    if(justify) {

                        for(var i = 0 ; i < 4 ; i ++) {

                            _this.getPicture()

                        }

                        if(_this.times < _this.totalPage) {

                            _this.getGalleryList(++_this.times)

                        }

                    }

                })

            },

            over(index) {

                $("#"+index).css({"height":"4rem"})

            },

            leave(index) {

                $("#"+index).css({"height":0})

            },

            showPicture(src) {

                var gallery = $('.gallery-showpicture')

                this.picture = src

                gallery.css({'opacity':1,'z-index':3})

            },

            hidePicture() {

                var gallery = $('.gallery-showpicture')

                gallery.css({'opacity':0,'z-index':-1})

            },

            //处理路由请求
            handleClick(router) {

                this.showImg = false

                this.imageList.length = 0

                this.galleryList.length = 0

                this.times = 1

                this.getGalleryList(this.times)

                this.showSearch = false

                if(this.showImg == false) {

                    $('.gallery-content-box').css({"margin":"12rem 0"})

                }

                if(router == "/sign") {

                    this.$store.commit('setPosition',"/first/gallery")

                }

                this.$router.push({path:router})

                $('#first').unbind()

            },

            //获取图片（其实就是改个名字）
            getPicture() {

                this.initial()

            },

            //初始化图片函数
            initial() {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/utils/img_url/300x300",

                    type:"GET",

                    success(data) {
                        
                        _this.imageList.push(data)

                        showPictureBox()

                    },error() {

                        console.log("请求出错")

                    }

                })

            },

            //初始化相册列表
            initialGalleryList(list) {

                var _this = this

                list.forEach(function(value) {

                    if(value.thumb == null) {

                        value.thumb = {}

                        value.thumb.upload = "http://qwebfx-test.deali.cn/static/media/thumb_200x250/0cc8d538fe5d7f64995fc220f076475f.jpg"

                    }else {

                        value.thumb.upload =" http://qwebfx-test.deali.cn" +  value.thumb.upload

                    }

                    _this.galleryList.push(value)

                })

            },

            //获取相册列表
            getGalleryList(id) {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/image/category/list?page="+id,

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialGalleryList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            //获取相册总页数
            getTotal() {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/image/category/count",

                    type:"GET",

                    success(data) {

                        _this.totalPage = Math.ceil(data.count/10)

                    },error() {
                        
                        console.log("请求相册总数失败")

                    }

                })

            }

        },

        mounted() {

            this.getThumbList()

            this.getGalleryList(this.times)

            this.getTotal()

        }

    }

</script>

<style lang="scss">

    #gallery {
        position: relative;
        height:100%;
        background:#f1f1f1;

        .gallery-showpicture {

            position: fixed;
            z-index:-1;
            top:0;
            right:0;
            left:0;
            bottom:0;
            background:rgba(0,0,0,.5);
            opacity: 0;
            transition: 1s;

            .gallery-hide {
                position: absolute;
                top:0;
                right:0;
                left:0;
                bottom:0;
            }

            .gallery-showpicture-image {
                position: absolute;
                top:0;
                right:0;
                left:0;
                bottom:0;
                margin:auto;
                width:50rem;
                height:50rem;

                img {
                    width:100%;
                    height:100%;
                }
            }

            .gallery-showpicture-icon {
                position: absolute;
                right:3rem;
                top:3rem;

                i {
                    font-size: 3rem;
                    color:white;
                    transition: .5s;
                }

                i:hover {
                    color:rgb(0, 204, 255);
                }
            }
        }

        .gallery-background {
            position: relative;
            height:80%;
            background: url(../images/official/相册.jpg);
            background-size:cover;
            background-position: center;
            background-attachment: fixed;

            .gallery-background-head {
                position: relative;
                top:50%;
                margin-top:-3rem;
                line-height: 6rem;
                font-size: 5rem;
                color:rgb(255, 255, 255);
                text-align: center;
                font-style: italic;
                text-shadow: 3px 3px 3px silver;
                cursor: pointer;
                transition: .3s;
                animation: showup 1s .5s both;
            }

            .gallery-background-head:hover {
                color:rgb(86, 221, 255);
            }

            @keyframes showup {
                0% {
                    opacity: 0;
                }100% {
                    opacity: 1;
                }
            }
        }

        .gallery-content {

            position: relative;
            top:10rem;
            margin:auto;
            width:85%;
            text-align: center;
            animation: moveup 1s both;

            .gallery-position {

                position: relative;
                text-align: left;
                left:1.5rem;
                margin-top:5rem;
                span {
                    position: relative;
                    line-height: 3rem;
                    border: .2rem solid  #c2e9fb;
                    background:white;
                    color: #c2e9fb;
                    font-size: 1.3rem;
                    padding:.5rem 1rem;
                    cursor: pointer;
                    transition: .5s;
                }

                span:hover {
                    color:white;
                    background:#c2e9fb;
                }

            }

            .wrap {
                position: relative;
                width: 50%;
                left:50%;
                top: 5rem;
                transform: translate(-50%, -50%);

                .search {
                width: 100%;
                position: relative;

                .searchTerm {
                    float: left;
                    width: 100%;
                    border: 2px solid #c1e8fa;
                    padding: 5px;
                    height: 20px;
                    border-radius: 10rem;
                    outline: none;
                    color: #c7deff;
                }

                .searchTerm:focus {
                    color: #b6e6fc;
                    border: 2px solid #99dfff;
                }

                .searchButton {
                    position: absolute;
                    top:.7rem;
                    right: -20px;
                    width: 60px;
                    height: 36px;
                    text-align: center;
                    color: #c1e8fa;
                    border-radius: 10rem;
                    cursor: pointer;
                    font-size: 20px;
                    transition: 0.5s;
                }

                .searchButton:hover {
                    color: #99dfff;
                }
                }
            }

            .gallery-content-box {

                position: relative;
                background: white;
                padding-top:2rem;
                margin:12rem 0;

                .gallery-content-image {
                    position: relative;
                    display: inline-block;
                    cursor: pointer;

                    .gallery-head {

                        padding:1rem 0;
                        font-size: 1.7rem;
                        text-shadow: 3px 3px 3px rgb(219, 219, 219);
                        transition: .5s;
                        cursor: pointer;
                    }

                    img {

                        margin:.5rem;
                        width:23rem;
                        height:23rem;
                        
                    }

                    .image {
                        margin:.5rem;
                        width:28rem;
                        height:28rem;
                        border-bottom:.1rem solid #efefef;
                        padding: 2rem; 
                        transition: .5s;
                        cursor: pointer;
                    }

                    .image:hover {
                            border-bottom: .1rem solid rgb(190, 242, 255);
                        }

                    .gallery-head:hover {
                        color:rgb(0, 204, 255);
                    }

                    .gallery-content-image-head {
                        position: absolute;
                        margin:.5rem;
                        left:0;
                        right:0;
                        bottom:.2rem;
                        background-image: linear-gradient(to top,black,rgba(0,0,0,.5),rgba(0,0,0,.0));
                        color:white;
                        font-size: 1.5rem;
                        height:0;
                        line-height:4rem;
                        transition: .5s;
                    }
                }
            }

        }

        @keyframes moveup {
            0% {
                top:10rem;
            }100% {
                top:0;
            }
        }

    }

    @media screen and (min-width:1800px) {

        #gallery {

            .gallery-showpicture {

                .gallery-showpicture-image {
                    width:70rem;
                    height:70rem;
                }
            }


            .gallery-content {
                width: 60%;
            }

        }

    }

    @media screen and (min-width:767px) and (max-width:1799px) {

        #gallery {

            .gallery-showpicture {

                .gallery-showpicture-image {
                    width:55rem;
                    height:55rem;
                }
            }

        }

    }

    @media screen and (min-width:0) and (max-width:766px) {

        #gallery {

            .gallery-background {

                height:40rem;

                .gallery-background-head {
                    font-size: 3rem;
                }

            }

            .gallery-showpicture {

                .gallery-showpicture-image {
                    width:25rem;
                    height:25rem;
                }

                .gallery-showpicture-icon {
                    right:2rem;
                    top:2rem;
                }
            }

            .gallery-content {

                .wrap {
                    width:100%;
                }

                width:90%;

                 .gallery-position {

                     span {
                        font-size: 1.1rem;
                        padding:.2rem .7rem;
                     }

                 }


                .gallery-content-box {

                    position: relative;

                    .gallery-content-image {

                        .gallery-head {
                            padding:1rem 0;
                            font-size: 1.3rem;
                            text-shadow: 3px 3px 3px rgb(219, 219, 219);
                            transition: .5s;
                            cursor: pointer;
                        }

                        img {
                            width:20rem;
                            height:20rem;
                        }

                        .image {
                            width:18rem;
                            height:18rem;
                        }
                    }
            
                }

            }

        }

    }

</style>
