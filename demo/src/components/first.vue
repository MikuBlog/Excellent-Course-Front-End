<template>

    <div id="first">

        <div class="nav-official" id="nav-official">

            <div class="nav-first">
                <span class="nav-home nav-list" @click="handleClick('/first/official')">首页</span>
                <span class="nav-res nav-list">
                教学资源
                <span class="nav-tri"></span>
                    <ul class="nav-res-list">
                        <li @click="handleClick('/first/fold')">文件</li>
                        <li @click="handleClick('/first/video')">视频</li>
                        <li @click="handleClick('/first/gallery')">图片</li>
                        <li @click="handleClick('/first/page')">文章</li>
                    </ul>
                </span>
                <span class="nav-res nav-list">
                友情链接
                <span class="nav-tri"></span>
                    <ul class="nav-res-list">
                        <li v-for="item in storageFriendList" @click="jumpLink(item.link)">
                            {{item.name}}
                        </li>
                    </ul>
                </span>
                <span class="nav-info nav-list" @click="handleClick('/first/info')">公告</span>
                <span class="nav-info nav-list" @click="handleClick('/manage')" v-if="show">管理</span>
                <span class="nav-know nav-list" @click="handleClick('/home')">About</span>
                <span class="nav-head nav-list" @mouseover="showList()" @mouseout="hideList()">
                    <span v-if="show" class="welcome" @click="handleClick('/sign')">
                        <i class="fa fa-address-card-o fa-lg"></i>
                    </span>
                    <span @click="handleClick('/sign')" class="msg">
                        {{user}}
                    </span>
                    <ul>
                        <li @click="switchUser()">切换用户</li>
                        <li @click="cancelUser()">注销</li>
                    </ul>
                </span>
            </div>

            <div class="nav-second">
                <span class="nav-list" @click="handleClick('/first/official')">{{siteConfig.title}}</span>
                <span class="nav-get-list nav-list">
                    <i class="fa fa-reorder fa-lg"></i>
                    <ul class="nav-many-list">
                        <li @click="handleClick('/first/official')">首页</li>
                        <li @click="handleClick('/first/fold')">文件</li>
                        <li @click="handleClick('/first/video')">视频</li>
                        <li @click="handleClick('/first/gallery')">图片</li>
                        <li @click="handleClick('/first/page')">文章</li>
                        <li @click="handleClick('/first/info')">公告</li>
                        <li @click="handleClick('/home')">About</li>
                        <li class="nav-many-list-list" @mouseover="showList()" @mouseout="hideList()">
                            <span @click="handleClick('/sign')">
                                {{user}}
                            </span>
                            <ul>
                                <li @click="switchUser()">切换用户</li>
                                <li @click="cancelUser()">注销</li>
                            </ul>
                        </li>
                    </ul>
                </span>
            </div>
        </div>

        <div class="manager" v-if="showWarning">
            <div class="manager-box">
                <div class="manager-color">
                    <img src="../images/水果.png">
                </div>
                <div class="manager-head">
                    <span>Error!</span>
                    <div>
                        You do not have administrator privileges.
                    </div>
                    <div>
                        Please get administrator privileges.
                    </div>
                </div>
                <div class="manager-cancel" @click="hideWarning()">
                    <i class="fa fa-location-arrow fa-2x"></i>
                </div>
            </div>
        </div>

        <router-view></router-view>

        <a href="#nav-official" class="goTop">
            <div class="go-top">
                <i class="fa fa-arrow-circle-up"></i>
            </div>
        </a>

    </div>
    
</template>

<script>

 export default {


        data() {

            return {

                user:"登录 | 注册",
                //是否弹出管理菜单
                show:false,
                //是否弹出权限警告
                showWarning:false,
                /*
                    title:网页标题
                    homeTitle:主页标题
                    description:主页描述
                */
                siteConfig:{
                    title:"",
                    homeTitle:"",
                    description:""
                },
                /*
                    存放友情链接列表
                    name:友情链接的名称
                    description:友情链接的描述
                    thumb.upload:http://qwebfx-test.deali.cn/xxxxxx(友情链接的缩略图)
                */
                storageFriendList:[]

            }

        },

        methods: {
            
            //跳转到友情链接对应的地址
            jumpLink(url) {

                window.open(url)

            },

            //隐藏警告框
            hideWarning() {

                this.showWarning = false

            },

            showList() {

                if(this.user != "登录 | 注册") {

                    $('.nav-head ul').css({"display":"block"})

                    $('.nav-many-list-list ul').css({"display":"block"})

                }

            },

            hideList() {

                $('.nav-head ul').css({"display":"none"})

                 $('.nav-many-list-list ul').css({"display":"none"})

            },

            cancelUser() {

                window.location.reload()

                this.$router.push({path:this.$store.state.position})

            },

            switchUser() {

                this.$store.commit('setPosition',"")

                this.$router.push({path:"/sign"})

            },

            //判断滚动条滚动方向
            scroll(preview,later,justify) {

                if(later - preview > 0) {

                    $('.nav-official').css({"background":"rgba(255,255,255,.5)"})

                    $('.nav-list').css({"color":'black'})

                    $('.nav-res-list').css({"background":"rgba(255,255,255,.5)"})

                    $('.nav-tri').css({"border-color":"black transparent transparent transparent"})

                    $('.nav-many-list').css({"background":"rgba(255,255,255,.5)"})

                    $('.go-top').css({"display":"block"})

                    $('.nav-head ul').css({"background":"rgba(255,255,255,.5)"})

                    $('.nav-many-list-list ul').css({"background":"rgba(255,255,255,.5)","color":"black"})

                }else {

                    if(justify) {

                        $('.nav-official').css({"background":"rgba(0,0,0,.5)"})

                        $('.nav-list').css({"color":'white'})

                        $('.nav-res-list').css({"background":"rgba(0,0,0,.5)"})

                        $('.nav-tri').css({"border-color":"white transparent transparent transparent"})

                        $('.nav-many-list').css({"background":"rgba(0,0,0,.5)"})

                        $('.go-top').css({"display":"none"})

                        $('.nav-head ul').css({"background":"rgba(0,0,0,.5)"})

                        $('.nav-many-list-list ul').css({"background":"rgba(0,0,0,.5)","color":"white"})

                    }

                }

            },

            //路由跳转
            handleClick(router) {

                var regexp = new RegExp("/official/")

                $('#first').unbind()

                if(router == "/sign") {

                    if(this.show)  {

                        return

                    }

                }

                if(router == '/manage') {

                    console.log(this.$store.state.userRole)

                    if(this.$store.state.userRole == 1) {

                        this.showWarning = true

                        return

                    }

                }

                if(regexp.test(router)) {

                    this.$router.push({path:router})

                    return

                }else {

                    this.$router.push({path:router})

                }


            },

            //请求站点信息
            getSiteConfig() {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/site/info",

                    type:"GET",

                    success(data) {

                        _this.siteConfig.title = data.site.cover_title

                       document.querySelector('title').innerText = data.site.main_title

                    },error() {

                        console.log("请求失败")

                    } 

                })

            },

            //初始化友情链接列表
            initialFriendList(list) {

                var _this = this

                list.forEach(function(value) {

                    _this.storageFriendList.push(value)

                })

            },

            //获取友情链接
            getFriendLinkList() {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/link/list",

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialFriendList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            }

        },

        mounted() {

            var _this = this

            var previewTop

            if(this.$store.state.userName) {

                this.user = this.$store.state.userName

                this.show = true

            }

            var isEdge = navigator.userAgent.indexOf("Edge")

            if(isEdge !=  -1) {

                $('.login-box').css({"animation-play-state":"pause"})

            }

            document.querySelector("#first").onscroll = function(e) {

                if(this.scrollTop == 0) {

                    _this.scroll(previewTop,this.scrollTop,true)

                    previewTop = this.scrollTop

                    return

                }

                _this.scroll(previewTop,this.scrollTop)

                previewTop = this.scrollTop

            }

            $('.goTop').click(function () {

                $('#first').animate({

                    scrollTop: document.querySelector($.attr(this, 'href')).offsetTop

                }, 300);

                return false;
                
            });

            this.getSiteConfig()

            this.getFriendLinkList()

        }

    }
</script>

<style lang="scss">

    ::-webkit-scrollbar {
        width: 8px;//表示垂直滚动条的宽度
        height: 8px;//表示水平滚动条的高度
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,.08);
        border-radius: 10px;
        -webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,.1);
    }

    #first {

        position: relative;
        overflow: auto;
        background:#f1f1f1;
        height:100%;

        .login-in {
            position: fixed;
            z-index: 1;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.5);

            .login-box {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: auto;
                width: 30rem;
                height: 30rem;
                transition: 0.5s;
                box-shadow: 0 0 1px 1px rgb(156, 156, 156);
                background: #fefefe;
                animation: moveTo 1.5s both;
                overflow: hidden;

            .login-box-image {
                position: relative;
                margin-top: 4rem;
                text-align: center;

                img {
                    width: 30%;
                    height: 30%;
                }
            }

            .login-box-head {
                position: relative;
                margin-top: 3rem;
                font-size: 1.5rem;
                text-align: center;
                color: #c2c2c2;
            }

            .Login-box-button {
                position: absolute;
                bottom: 0;
                width: 100%;
                display: flex;
                text-align: center;
                font-size: 1.3rem;
                line-height: 5rem;

                .Login-box-button-cancel {
                flex: 1;
                color: #c2c2c2;
                cursor: pointer;
                transition: 0.5s;
                }
                .Login-box-button-login {
                flex: 1;
                color: #a5d198;
                cursor: pointer;
                transition: 0.5s;
                }

                .Login-box-button-login:hover {
                color: #b7f5a5;
                }

                .Login-box-button-cancel:hover {
                color: #929292;
                }
            }
            }

            @keyframes moveTo {
                0% {
                    width:0rem;
                    height:0rem;
                }50% {
                    width:30rem;
                    height:0rem;
                }100% {
                    width:30rem;
                    height:30rem;
                }
            }

            .login-box:hover {
                box-shadow: 0 0 2px 2px rgb(0, 204, 255);
            }
        }

        .manager {

            position: fixed;
            z-index:3;
            top:0;
            right:0;
            bottom:0;
            left:0;
            background: rgba(0,0,0,.5);

            .manager-box {
                position: absolute;
                width:40rem;
                height:28rem;
                top:0;
                right:0;
                bottom:0;
                left:0;
                margin:auto;
                background:white;
                border-radius: 1rem;
                overflow: hidden;
                animation: showUp 1.5s both;

                .manager-color {
                    border-top-right-radius: 1rem;
                    border-top-left-radius: 1rem;
                    height:10rem;
                    background-image: linear-gradient(to bottom, #a1c4fd, #c2e9fb);

                    img {
                        position: absolute;
                        left:3rem;
                        top:2rem;
                        width:10rem;
                        height:10rem;
                    }
                }

                .manager-head {
                    position: relative;
                    color:#929292;
                    margin-top:4rem;
                    margin-left:3rem;
                    font-size: 1.3rem;
                    text-align: left;

                    span {
                        display: inline-block;
                        margin-bottom:.5rem;
                        font-size: 3rem;
                    }

                    div{
                        margin: .5rem 0;
                    }
                }

                .manager-cancel {
                    position: absolute;
                    right:1rem;
                    bottom:1rem;
                    border-radius:50%;
                    background:#a1c4fd; 
                    width:3rem;
                    height:3rem;
                    text-align: center;
                    cursor: pointer;
                    transition: .5s;

                    i {
                        color: white;
                        line-height: 3rem;
                        transition: .5s;
                    }
                }

                .manager-cancel:hover {
                    background:rgb(0,204,255);
                }
            }

            @keyframes showUp {
                0% {
                    width:20rem;
                    height:15rem;
                }50% {
                    width:40rem;
                    height:15rem;
                }100% {
                    width:40rem;
                    height:28rem;
                }
            }
        }

        .welcome {
            font-size: 1.8rem;
        }

        .go-top {
                position: fixed;
                z-index:5;
                bottom:9rem;
                right:7rem;
                transition: .3s;
                display: none;
                color:rgb(0, 0, 0);
                
                i{
                    padding: 1rem;
                    font-size: 3.3rem;
                }
            }
        .go-top:hover {
            color:rgb(0, 204, 255);
        }

        .nav-official {
            position: fixed;
            top:0;
            width:100%;
            z-index: 1;
            height:0;
            background:rgba(0,0,0,.5);
            transition: .5s;
            animation: shownav 1s 1s both;

            .nav-second {
                display: none;

                i {
                    font-size: 1.5rem;
                }

                .nav-many-list {
                    position: absolute;
                    width:9rem;
                    right:0;
                    top:5rem;
                    display: none;
                    background:rgba(0,0,0,.5);
                    li {
                        text-align: center;
                        font-size: 1.2rem;
                        padding:.5rem 1rem;
                        list-style: none;
                        box-shadow: 1px 0px 1px rgba(255, 255, 255, 0.288);
                    }

                    li:hover {
                        color:white;
                        background:rgb(0, 204, 255);
                    }

                    .nav-many-list-list {
                        position: relative;
                        ul {
                            position: absolute;
                            width:100%;
                            top:0;
                            right:9rem;
                            background:rgba(0,0,0,.5);
                            display: none;
                            text-align: center;

                            li {
                                padding:1rem 2rem;
                                list-style: none;
                                box-shadow: 1px 0px 1px rgba(255, 255, 255, 0.288);
                            }

                            li:hover {
                                color:white;
                                background:rgb(0, 204, 255);
                            }
                        }
                    }
                }

                .nav-get-list:hover {
                    color:white;
                     .nav-many-list {
                         display: block
                     }
                } 

            }

            .nav-list {
                position: relative;
                display: inline-block;
                color:white;
                font-size: 1.3rem;
                line-height: 3rem;
                padding:1rem 2rem;
                cursor: pointer;
                transition: .3s;
            }

            .nav-list:hover {
                background:rgb(0, 204, 255);
            }

            .nav-list:first-of-type {
                margin-left:6rem;
            }

            .nav-list:last-of-type {
                position: absolute;
                right:4rem;
            }

            .nav-head {

                ul {
                    position: absolute;
                    width:100%;
                    left:0;
                    top:5rem;
                    display: none;
                    background:rgba(0,0,0,.5);
                    text-align: center;

                    li {
                        padding:1rem 2rem;
                        list-style: none;
                        box-shadow: 1px 0px 1px rgba(255, 255, 255, 0.288);
                    }

                    li:hover {
                        color:white;
                        background:rgb(0, 204, 255);
                    }
                }
            }

            .nav-res:hover {
                .nav-tri {
                    border:white transparent transparent transparent;
                    transform: rotate(180deg);
                    top:1.2rem;
                }
                .nav-res-list {
                    display: block;
                }
            }

            .nav-res {
                padding:1rem 2.3rem;

                .nav-tri {
                    position: absolute;
                    top:2.2rem;
                    right:.5rem;
                    display: inline-block;
                    width:0;
                    border:10px solid silver;
                    border-width:10px 6px;
                    border-color:white transparent transparent transparent;
                    transition: .3s;
                }

                .nav-res-list {
                    display: none;
                    position: absolute;
                    left:0;
                    top:5rem;
                    width:100%;
                    background:rgba(0,0,0,.5);
                    cursor: pointer;

                    li {
                        padding: 1rem 0;
                        list-style: none;
                        text-align: center; 
                        transition: .3s;
                        box-shadow: 1px 0px 1px rgba(255, 255, 255, 0.288);
                        a{
                            text-decoration: none;
                        }
                    }

                    li:hover {
                        color:white;
                        background:rgb(0, 204, 255);
                        a {
                            color:white;
                        }
                    }
                }
            }
        }

        @keyframes shownav {
            0% {
                height:0;
            }100% {
                height:5rem;
            }
        }

        .footer {
            position: relative;
            margin-top:10rem;
            background:black;

            .footer-content {
                text-align: center;
                line-height:10rem;
                font-size: 1.3rem;
                color:white;
            }
        }

    }

    @media screen and (min-width:0) and (max-width:850px) {

        #first {
            
            .go-top {
                right:1.2rem;
                i {
                    font-size: 2.5rem;
                }
            }

            .manager {

                .manager-box {
                    width:26rem;
                    height:20rem;

                    .manager-color {
                        border-top-right-radius: 1rem;
                        border-top-left-radius: 1rem;
                        height:7rem;
                        background-image: linear-gradient(to bottom, #a1c4fd, #c2e9fb);

                        img {
                            position: absolute;
                            left:3rem;
                            top:2rem;
                            width:7rem;
                            height:7rem;
                        }
                    }

                    .manager-head {
                        margin-left:1.5rem;
                        margin-top:2rem;
                        span{
                            margin-top:0rem;
                            font-size: 1.7rem;
                        }
                        div {
                            font-size:1.2rem;
                        }
                    }
                }


                @keyframes showUp {
                    0% {
                        width:0rem;
                        height:7rem;
                    }50% {
                        width:26rem;
                        height:7rem;
                    }100% {
                        width:26rem;
                        height:20rem;
                    }
                }
            }

            .login-in {

                .login-box {
                    width:20rem;
                    height:20rem;

                    .login-box-head {
                        position: relative;
                        margin-top: 3rem;
                        font-size: 1.3rem;
                        text-align: center;
                        color: #c2c2c2;
                    }
                    .Login-box-button {
                        font-size:1.1rem;
                    }
                }

                 @keyframes moveTo {
                        0% {
                            width:0;
                            height:0;
                        }50% {
                            width:20rem;
                            height:0;
                        }100% {
                            width:20rem;
                            height:25rem;
                        }
                    }
            }

            .nav-official {

            .nav-first {
                display: none;
            }

            .nav-second {
                display: block;

                .nav-list:first-of-type {
                    margin-left:1rem;
                }

                .nav-list:last-of-type {
                    right:1rem;
                }
            }
            }
        }

    }



</style>
