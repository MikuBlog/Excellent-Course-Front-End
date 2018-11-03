<template>
    <div id="video">
        <a href="#list" id="go-video">
            <div class="go-video" v-if="!show">
                <i class="fa fa-video-camera fa-lg"></i>
            </div>
        </a>
        
        <div class="video-background">
            <div class="video-background-head">Video</div>
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
              <div class="Login-box-button-login" @click="handleClickSign()">
                Login | Register
              </div>
            </div>

          </div>

        </div>

        <div class="video-content">

            <div class="video-position">
                <span>您当前的位置:</span>
                <span @click="handleClick(null,'/first/official',true)"><i class="fa fa-tag fa-lg"></i>首页</span>
                <span><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span @click="handleClick(null,'/first/video',true)"><i class="fa fa-tag fa-lg"></i>视频栏</span>
                <span v-if="!show"><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span v-if="!show">视频</span>
            </div>


            <div class="video-left" v-show="show">
                <div class="video-left-head">
                    <div class="video-left-icon">
                        <i class="fa fa-tags fa-lg"></i><span>Video</span>
                    </div>    
                    Items
                </div>
                <ul class="video-left-list">
                    <li v-for="(item,index) in videoTypeList" @click="getThisTypeVideo(item.id)">
                        {{item.name}}
                        <ul class="video-left-list-list">
                            <li>Description: {{item.description}}</li>
                        </ul>
                    </li>
                </ul>
                <div class="paging">
                    <span class="paging-left" @click="nextType('last')"><i class="fa fa-arrow-left fa-lg"></i></span>
                    <span class="paging-right" @click="nextType('next')"><i class="fa fa-arrow-right fa-lg"></i></span>
                </div>
            </div>


            <div class="video-right" v-if="show">

                <div class="wrap" v-if="show">
                        <div class="search">
                            <input type="text" v-model="message" class="searchTerm" placeholder="What are you looking for?" @keydown="search($event)">
                            <i class="fa fa-search fa-lg searchButton"></i>
                        </div>
                </div>

                <ul class="video-right-list" v-if="show" v-show="!showSearch">
                    <li v-for="(videos,index) in storageVideoList" @click="enter(videos.name,videos.upload)">
                        <img v-lazy="imageList[index]">
                        <div class="video-right-content">
                            <span>{{videos.name}}</span>
                            <div class="icon">
                                <i class="fa fa-clock-o fa-lg"></i><span>2018-10-03</span>
                                <i class="fa fa-star fa-lg"></i><span>收藏</span>
                            </div>
                        </div>
                    </li>
                </ul>

                <ul class="video-right-list" v-if="show" v-show="showSearch">
                    <li v-for="(videos,index) in showList" @click="enter(videos.model_data.title)">
                        <img v-lazy="videos.upload">
                        <div class="video-right-content">
                            <span>{{videos.model_data.name}}</span>
                            <div class="icon">
                                <i class="fa fa-clock-o fa-lg"></i><span>2018-10-03</span>
                                <i class="fa fa-star fa-lg"></i><span>收藏</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="info-right-next" v-if="show" v-show="showPage">
                    <span class="info-right-span" @click="goTop()">Top</span>
                    <span class="info-right-span" @click="next('last')"><i class="fa fa-angle-double-left fa-lg"></i></span>
                    <span v-for="number in total" @click="getVideoList(number)" class="info-right-span">{{number}}</span>
                    <span class="info-right-span" @click="next('next')"><i class="fa fa-angle-double-right fa-lg"></i></span>
                    <span class="info-right-span" @click="goTail()">Tail</span>
                </div>
            </div>


            <div class="video-showvideo" v-if="!show">

                <div class="video-showvideo-content">
                    <div class="video-showvideo-head">
                        {{head}}
                    </div>
                    <video controls :src="upload"></video>
                    <div class="video-showvideo-time">
                        2018-10-02
                    </div>
                </div>

                <div class="video-comment">
                    <div class="video-comment-head"><span>评论(999)</span></div>
                    <div class="video-comment-content">
                        您需要登录才能看到评论哟~
                    </div>
                </div>

                <div class="video-getcontent-reward">
                        <span>打赏</span>
                        <span>点赞</span>
                        <span>分享</span>
                </div>

                <div class="video-comment-list" id="list">
                         <ul>
                            <li v-for="(videos,index) in storageVideoList" v-if="index<5" @click="enter(videos.name)">
                                <img v-lazy="imageList[index]">
                                <div class="video-comment-list-content">
                                    <span>{{videos.name}}</span>
                                    <div class="icon">
                                        <i class="fa fa-clock-o fa-lg"></i><span>2018-10-03</span>
                                        <i class="fa fa-star fa-lg"></i><span>收藏</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                </div>

            </div>

        </div>


        <div class="footer">
            <div class="footer-content">
                Copyright 2018 Powered By 旋仔
            </div>
        </div>


    </div>
</template>

<script>
export default {

    data() {

        return {

            /*
                存放该页视频
                title:视频名字
                description:视频描述
                upload:视频地址
            */
            storageVideoList:[],
            //显示登录提示
            showLogin: false,
            /*
                存放视频分类列表
                name:分类名称
                description:分类描述
                id:分类id
            */
            videoTypeList:[],
            //true为公告栏，fasle为单条公告的内容
            show:true,
            //是否显示搜索栏
            showPage:true,
            //存放每个视频的信息
            videoList:[],
            //存放默认图
            imageList:[],
            //存放分类视频
            ItemList:[],
            //存放标题
            head:"",
            //存放文件总页数
            pageNumber:"",
            //存放文件页码
            total:[],
            //文件每页的条数
            eachPageNumber:10,
            //存放当前页数
            nowPageNumber:1,
            //保存当前分类id
            videoTypeId:"",
            //当前视频分类的页数
            nowVideoTypePageNumber:1,
            //视频分类总页数
            videoTypePageNumber:"",
            //存放搜索信息
            message:"",
            //显示搜索结果
            showSearch:false,
            /*
                model_data.name:视频名称
                model_data.title:视频标题
            */
            showList:[],
            //是否显示搜索列表
            showSearch:false,
            /* 
                    存放缩略图信息
                    name:缩略图名称
                    description:缩略图描述
                    id:缩略图的id
                */
            storageThumbList:[],
            // 存放视频地址
            upload:""

        }

    },

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

      list.forEach(function(value) {

        if(value.model_name == "Video") {

          _this.showList.push(value)

        }

      })

      this.showList.forEach(function(valueVid) {

          _this.storageThumbList.forEach(function(valueThu) {

              if(valueVid.model_data.thumb_id == valueThu.id) {

                  valueVid.upload = "http://qwebfx-test.deali.cn"+valueThu.upload

              }

          })

      })

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

            console.log(list)

            _this.showSearch = true

            _this.message = ""

            _this.showPage = false

            _this.selectData(list)

          },error() {

            console.log("请求数据失败")

          }

        })

      }

    },

        //获取视频分类总页数
        getAllTypePageNumber() {

            var _this = this

            $.ajax({

                url:"http://qwebfx-test.deali.cn/api/video/category/count",

                type:"GET",

                success(data) {

                    _this.videoTypePageNumber = Math.ceil(data.count/_this.eachPageNumber)

                    if(_this.videoTypePageNumber>=2) {

                        $('.paging-right').css({"display":"block"})

                    }

                },error() {

                    console.log("请求失败")

                }

            })

        },

        //跳转到分类页
        nextType(command) {

           if(command == "next") {

                    if(this.nowVideoTypePageNumber == this.videoTypePageNumber) {

                        return

                    }

                    ++this.nowVideoTypePageNumber

                    this.getVideoTypeList(this.nowVideoTypePageNumber)

                    if(this.nowVideoTypePageNumber == this.videoTypePageNumber) {

                        $('.paging-right').css({"display":"none"})

                        $('.paging-left').css({"display":"block"})

                        return

                    }

                    $('.paging-right').css({"display":"block"})

                    $('.paging-left').css({"display":"block"})

                }else {

                    if(this.nowVideoTypePageNumber == 1) {

                        return

                    }

                    --this.nowVideoTypePageNumber

                    this.getVideoTypeList(this.nowVideoTypePageNumber)

                    if(this.nowVideoTypePageNumber == 1) {

                        $('.paging-right').css({"display":"block"})
                        
                        $('.paging-left').css({"display":"none"})

                        return

                    }

                    $('.paging-right').css({"display":"block"})

                    $('.paging-left').css({"display":"block"})

                }

        },

        //获取该分类的所有视频
        getThisTypeVideo(id) {

            var _this = this

            this.showPage = false

            this.showSearch = false

            this.videoTypeId = id

            $.ajax({

                url:"http://qwebfx-test.deali.cn/api/video/category/get?id="+id,

                type:"GET",

                success(data) {

                    var list = data.videos

                    _this.initialVideoList(list)


                },error() {

                    console.log("请求失败")

                }

            })

        },

        //跳转到第一页
            goTop() {

                this.getVideoList(1)

            },

            //跳转到最后一页
            goTail() {

                this.getVideoList(this.pageNumber)

            },

            //跳转页面
            next(command) {

                if(command == "next") {

                    if(this.nowPageNumber == this.pageNumber) {

                        return

                    }

                    this.getVideoList(++this.nowPageNumber)

                }else {

                    if(this.nowPageNumber == 1) {

                        return

                    }

                    this.getVideoList(--this.nowPageNumber)

                }

            },

            //获取公告总页数
            getTotal() {

                var _this = this

                this.total.length = 0

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/video/count",

                    type:"GET",

                    success(data) {

                        _this.pageNumber = Math.ceil(data.count/_this.eachPageNumber)

                        for(var i = 1 ; i <= _this.pageNumber ; i ++) {

                            _this.total.push(i)

                        }

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

    //跳转到登录页面
    handleClickSign() {

        this.$store.commit('setPosition',"/first/video")

        this.$router.push({path:"/sign"})

    },

    //隐藏登录提示框
    hideLogin() {

      this.showLogin = false

    },

    //进入视频详情页
    enter(name,url) {

        if(this.$store.state.userName == "") {

            this.showLogin = true

            return

        }

        this.head = name

        this.upload = "http://qwebfx-test.deali.cn"+url

        this.show = false

    },

        handleClick(title,router,justify) {

            if(this.$store.state.userName == "") {

                if(justify) {

                    this.head = title

                    this.show = justify

                    this.$router.push({path:router})

                    this.showPage = true

                    return

                }

                this.showLogin = true

                return 

            }

            this.getVideoList(this.nowPageNumber)

            this.head = title

            this.show = justify

            this.$router.push({path:router})

            this.showSearch = false

            this.showPage = true

            $('.paging-right').css({"display":"block"})

        },

        getVideo() {

            var _this = this

            $.ajax({

                url:"http://qwebfx-test.deali.cn/api/video/list",

                type:"GET",

                success(data) {

                    var list = data.list

                    list.forEach(function(value) {

                        value.cat = "default"

                        _this.videoList.push(value)

                        _this.imageList.push("http://qwebfx-test.deali.cn/static/media/thumb/%E5%A4%B4%E5%83%8F.jpg")

                    })

                },error() {

                    console.log("请求失败")

                }

            })

        },

        //初始化视频列表
        initialVideoList(list) {

            var _this = this

            this.storageVideoList.length = 0

            this.imageList.length = 0

            list.forEach(function(value) {

                _this.storageVideoList.push(value)

                _this.imageList.push("http://qwebfx-test.deali.cn"+value.thumb.upload)

            })

        },

        //获取视频列表
        getVideoList(id) {

            var _this = this

            $.ajax({

                url:"http://qwebfx-test.deali.cn/api/video/list?page="+id,

                type:"GET",

                success(data) {

                    var list = data.list

                    _this.initialVideoList(list)

                    console.log(list)

                },error() {

                    console.log("请求失败")

                }

            })

        },

        //初始化视频分类列表
        initialVideoTypeList(list) {

            var _this = this

            this.videoTypeList.length = 0

            list.forEach(function(value) {

                _this.videoTypeList.push(value)

            })

        },

        //获取视频分类列表
        getVideoTypeList(id) {

            var _this = this

            $.ajax({
                
                url:"http://qwebfx-test.deali.cn/api/video/category/list?page="+id,

                type:"GET",

                success(data) {

                    var list = data.list

                     _this.initialVideoTypeList(list)


                },error() {

                    console.log("请求失败")

                }

            })

        }

    },

    mounted() {

        this.getVideoTypeList(1)

        this.getVideoList(this.nowPageNumber)

        this.getThumbList()

        this.getAllTypePageNumber()

        this.getTotal()

        $('#go-video').click(function () {

            $('#first').animate({
                scrollTop: document.querySelector($.attr(this, 'href')).offsetTop
            }, 300);

            return false;
        });

    }

}

</script>

<style lang="scss">

    #video {
        position: relative;
        height:100%;

        .go-video {
                position: fixed;
                z-index:1;
                bottom:9.5rem;
                left:5rem;
                font-size: 3rem;
                transition: .3s;
                color:rgb(0, 0, 0);
            }
        .go-video:hover {
            color:rgb(0, 204, 255);
        }

        .footer {
            margin-top:20rem;
        }

        .video-background {
            position: relative;
            height:80%;
            background: url(../images/official/视频.jpg);
            background-size:cover;
            background-position: center;
            background-attachment: fixed;

            .video-background-head {
                position: relative;
                top:50%;
                margin-top:-3rem;
                line-height: 6rem;
                font-size: 5rem;
                color:rgb(255, 255, 255);
                text-align: center;
                font-style: italic;
                transition: .3s;
                cursor: pointer;
                text-shadow: 3px 3px 3px silver;
                animation: showup 1s .5s both;
            }

            .video-background-head:hover {
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

        .video-content {
            position: relative;
            margin:auto;
            width:85%;
            text-align: center;
            animation: moveup 1s both;

            .video-showvideo {
                position: relative;
                margin: auto;
                margin-top:5rem;
                width:85%;

                .video-getcontent-reward {
                    position: relative;
                    width:100%;
                        height:8rem;
                        display: inline-block;
                        border-top:.1rem dotted rgb(230, 230, 230);
                        background:white;
                        span {
                            position: relative;
                            color:white;
                            margin:3rem;
                            line-height: 8rem;
                            font-size: 1.2rem;
                            padding:1rem 4rem;
                            background:silver;
                            transition: .5s;
                            cursor: pointer;
                        }
                        span:first-of-type {
                            border:.2rem solid #5bbfdd;
                            background:#5bbfdd;
                        }
                        span:nth-of-type(2) {
                            border:.2rem solid #efac50;
                            background: #efac50;
                        }
                        span:last-of-type {
                            border:.2rem solid #5ab75d;
                            background: #5ab75d;
                        }
                        span:first-of-type:hover {
                            color:#5bbfdd;
                            background:white;
                        }
                        span:nth-of-type(2):hover {
                            color:#efac50;
                            background:white;
                        }
                        span:last-of-type:hover {
                            color:#5ab75d;
                            background:white;
                        }
                    }

                .video-showvideo-content {
                    position: relative;

                    .video-showvideo-head {
                        font-size: 3rem;
                        font-style: italic;
                        text-shadow: 3px 3px 3px rgb(219, 219, 219);
                        margin:1rem 0;
                        cursor: pointer;
                        transition: .5s;
                    }

                    .video-showvideo-time {
                        margin:1rem 1rem;
                        text-align: right;
                        font-size: 1.3rem;
                        text-shadow: 3px 3px 3px rgb(219, 219, 219);
                        cursor: pointer;
                        transition: .5s;
                    }


                    .video-showvideo-head:hover {
                        color: rgb(0, 204, 255);
                    }

                    .video-showvideo-time:hover {
                        color: rgb(0, 204, 255);
                    }

                    video {
                        display: inline-block;
                        width:100%;
                        height:100%;
                    }
                }

                .video-comment {
                        position: relative;
                        margin-top:5rem;
                        width:100%;
                        background: white;
                        text-align: left;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        .video-comment-head {
                            position: relative;
                            border-bottom:.1rem solid rgb(238, 238, 238);
                            span {
                                display: inline-block;
                                padding:1rem 2rem;
                                background:#f6f6f6;
                                font-size: 1.1rem;
                                vertical-align: middle;
                                color:silver;
                            }
                        }
                        .video-comment-content {
                            text-indent: 1rem;
                            font-size: 1.3rem;
                            line-height:20rem;
                            color:silver;
                        }

                    }

                    .video-comment-list {
                        position: relative;
                        margin-top:5rem;
                        ul {
                            text-align: left;
                            li {
                                list-style: none;
                                background:white;
                                margin:1rem 0;
                                padding:1rem 0;
                                box-shadow: 0 0 3px 3px rgb(238, 238, 238);
                                cursor: pointer;
                                transition: .5s;

                                img {
                                    margin: 0 2rem;
                                    width:10rem;
                                    height:10rem;
                                }

                                .video-comment-list-content {
                                    position: relative;
                                    top:-4rem;
                                    display: inline-block;
                                    line-height: 2rem;

                                    span {
                                        font-size: 2rem;
                                        transition: .5s;
                                    }

                                    span:hover {
                                        
                                        color:rgb(0, 204, 255);
                                    }

                                    .icon {

                                        line-height: 3rem;
                                        
                                        i {
                                            font-size: 1.5rem;
                                            transition: .5s;
                                        }
                                        
                                        span {
                                            font-size: 1.3rem;
                                        }

                                        i:hover {
                                            color:rgb(0, 204, 255);
                                        }
                                    }
                                }
                            }

                            li:hover {
                                box-shadow: 0 0 1px 2px rgb(190, 242, 255);
                            }
                        }
                    }
            }

            .video-position {

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

            .video-left {
                position: relative;
                vertical-align: top;
                margin-top:5rem;
                display: inline-block;
                background:white;
                width:35rem;
                box-shadow: 0 0 3px 3px rgb(235, 235, 235);
                text-align: left;

                .paging {

                    position: absolute;
                    width:100%;
                    bottom:45%;

                    span {
                        position: absolute;
                        color:#bae0fb;
                        font-size: 2rem;
                        display: none;
                        cursor: pointer;
                        transition: .3s;
                    }

                    span:hover {
                        color:#a4c8fc;
                    }

                    .paging-left {
                        top:0;
                        left:-5rem;
                        animation: moveleft .5s both infinite;
                    }

                    .paging-right {
                        top:0;
                        right:-5rem;
                        animation: moveright .5s both infinite;
                    }

                    @keyframes moveleft {
                        
                        0% {
                            left:-5rem;
                        }50% {
                            left:-6rem;
                        }100% {
                            left:-5rem;
                        }

                    }

                    @keyframes moveright {
                        
                        0% {
                            right:-5rem;
                        }50% {
                            right:-6rem;
                        }100% {
                            right:-5rem;
                        }

                    }

                }

                .video-left-head {
                    color:rgb(255, 255, 255);
                    position: relative;
                    line-height:14rem;
                    text-align: center;
                    font-size: 2.8rem;
                    font-weight: bold;
                    background-image:linear-gradient(to bottom,#a1c4fd,#c2e9fb);
                    box-shadow: 0 0 3px 3px rgb(235, 235, 235);;
                    text-shadow: 3px 3px 3px rgb(245, 244, 244);
                    transition: .3s;
                    font-style:italic;

                    .video-left-icon {
                        font-style:initial;
                        position: relative;
                        line-height:3rem;
                        padding:1rem 0;
                        margin:auto;
                        width:60%;
                        font-size:1.2rem;
                        border-bottom:.2rem inset rgba(230, 230, 230, 0.26); 
                        text-shadow: 0px 0px 0px rgb(235, 235, 235);
                        transition: .3s;
                    }
                }

                .video-left-list {
                    position: relative;
                    margin-top:1rem;

                    li {
                        position: relative;
                        margin:auto;
                        font-size: 1.3rem;
                        line-height: 2.5rem;
                        padding:1rem 0;
                        list-style:none;
                        border-bottom: .1rem solid rgb(240, 240, 240);
                        text-indent: 4rem;
                        transition: .3s;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        cursor:pointer;

                        .nav-tri {
                            position: relative;
                            top:1rem;
                            left:1rem;
                            display: inline-block;
                            width:0;
                            border:10px solid silver;
                            border-width:10px 6px;
                            border-color:white transparent transparent transparent;
                            transition: .3s;
                        }

                        ul {
                            display: none;

                            li {
                                color:black;
                                font-size: 1.1rem;
                                border: none;
                            }

                            li:hover {
                                color:rgb(0, 204, 255);
                            }
                        }
                    }

                    li:nth-child(2n) {
                        background:rgb(247, 247, 247);
                    }

                    li:hover {
                        color:rgb(0, 204, 255);
                        text-shadow: 3px 3px 3px rgb(235, 235, 235);

                        .nav-tri {
                            border:white transparent transparent transparent;
                            transform: rotate(180deg);
                            top:0;
                        }

                        ul {
                            display: block;
                        }
                    }
                }


            }

            .video-right {
                position: relative;
                display: inline-block;
                margin-left:10rem;
                top:5rem;
                width:55%;
                background:white;
                box-shadow: 0 0 3px 3px rgb(238, 238, 238);
                transition: .5s;

                .wrap {
                    position: relative;
                    width: 100%;
                    left: 50%;
                    top: -8rem;
                    transform: translate(-50%, -50%);

                    .search {
                    width: 98%;
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
                        top: 0.7rem;
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

                .video-right-list {

                    margin:5rem 0;

                    li {
                        box-shadow: 0 0 1px 3px rgb(240, 240, 240);
                        padding:1rem;
                        margin:1rem;
                        width: 13rem;
                        height:17rem;
                        display: inline-block;
                        list-style: none;
                        cursor: pointer;
                        transition: .5s;

                        img {
                            width:10rem;
                            height:10rem;
                            border-bottom: .1rem solid rgb(240, 240, 240);
                            transition: .5s;
                        }

                        .video-right-content {

                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;

                            span{
                                margin-top:1rem;
                                display: inline-block;
                                font-size: 1.3rem;
                                transition: .5s;
                            }

                            span:hover {
                                color:rgb(0, 204, 255);

                            }

                            .icon {

                                span {
                                    font-size:1.1rem;
                                }

                                i:hover {
                                    color:rgb(0, 204, 255);
                                }
                            }
                        }
                    }

                    li:hover {

                        box-shadow: 0 0 1px 2px rgb(190, 242, 255);

                        img {
                            border-bottom: .1rem solid rgb(190, 242, 255);
                        }
                    }
                    
                }

                .info-right-next {
                    position: relative;
                    margin: 5rem 0 5rem 0;
                    width: 100%;

                    .info-right-span {
                        padding: .6rem 1.1rem;
                        margin: 0 0.2rem;
                        background: white;
                        display: inline-block;
                        font-size: 1.1rem;
                        cursor: pointer;
                        box-shadow: 0 0 1px 1px rgb(235, 235, 235);
                        transition: 0.5s;
                    }

                    .info-right-span:hover {
                        color: rgb(0, 204, 255);
                        box-shadow: 0 0 1px 1px rgb(0, 204, 255);
                    }
                }
            }

            .video-right:hover {

                box-shadow: 0 0 1px 2px rgb(190, 242, 255);
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

    @media screen and (min-width:700px) and (max-width:1440px){
        
        #video {

            .video-content {

                .video-showvideo {

                    .video-getcontent-reward {
                        font-size: 1.2rem;

                        span {
                            font-size: 1.2rem;
                            padding:.9rem 2.5rem;
                        }
                    }

                }

                .video-left {
                           
                    display: none;
                    
                }

                .video-right { 
                    margin:5rem 0;
                    margin-left:0;
                    width:90%;

                    .wrap {
                        top: -6rem;
                    }
                }

            }

        }
    }

    @media screen and (min-width:0) and (max-width:700px) {

        #video {

            .go-video {
                font-size: 2rem;
                left:1rem;
            }

            .video-background {

                height:40rem;

                    .video-background-head {
                        font-size: 3rem;
                    }
                }

            .video-content {

                width:90%;

                .video-showvideo {
                    width:100%;

                    .video-getcontent-reward {
                        font-size: 1.2rem;

                        span {
                            padding:.7rem 1.5rem;
                            margin:.5rem;
                        }
                    }

                    .video-showvideo-content {

                        .video-showvideo-head {
                            font-size: 2.5rem;
                        }
                    }

                    .video-comment-list {
                        ul {
                            
                            li {

                                img {
                                    margin: 0 0;
                                }

                                .video-comment-list-content {

                                    span {
                                        font-size: 1.5rem;
                                        transition: .5s;
                                    }

                                    span:hover {
                                        
                                        color:rgb(0, 204, 255);
                                    }

                                    .icon {

                                        line-height: 3rem;
                                        
                                        i {
                                            font-size: 1.3rem;
                                            transition: .5s;
                                        }
                                        
                                        span {
                                            font-size: 1.1rem;
                                        }

                                        i:hover {
                                            color:rgb(0, 204, 255);
                                        }
                                    }
                                }
                            }

                            li:hover {
                                box-shadow: 0 0 1px 2px rgb(190, 242, 255);
                            }
                        }
                    }
                }

                .video-position {
                    span {
                        font-size: 1.1rem;
                        padding:.2rem .7rem;
                    } 
                }

                .video-left {
                           
                    display: none;
                    
                }

                .video-right { 
                    margin:5rem;
                    margin-left:0;
                    width:100%;

                    .wrap {
                        top: -6rem;
                    }

                }

            }

        }
        
    }

</style>
