<template>

    <div id="manage">
        <div class="progress"></div>
        
        <div class="manage-background">
            <div class="manage-background-head">
                <img src="https://mikuimg.oss-cn-shenzhen.aliyuncs.com/icon/%E4%B9%A6%E6%9C%AC.png"><span>广东海洋大学电子技术精品课程管理系统</span>
            </div>
            <div class="manage-icon" title="打开菜单">
                <i class="fa fa-bars fa-lg"></i>
            </div>
            <div class="manage-icon-back" title="返回官网" @click="handleClick('/first/official')">
                <i class="fa fa-location-arrow fa-lg"></i>
            </div>
        </div>

        <div class="manage-content">

            <div class="manage-content-left">

                <div class="manage-icon-return">
                    <i class="fa fa-arrow-circle-o-left fa-lg"></i>
                </div>
                
                <ul class="manage-content-list">
                    <li class="li">
                        <div class="head" @click="changeColor($event,'/manage/managehome')"><i class="fa fa-home fa-lg"></i>首页</div>
                    </li>
                    <li class="li">
                        <div @click="changeColor($event,'/manage/managesite')"><i class="fa fa-gear fa-lg"></i>站点配置</div>
                    </li>
                    <li class="li">
                        <div @click="changeColor($event,'/manage/menumanage')"><i class="fa fa-flag fa-lg"></i>菜单管理</div>   
                    </li>
                    <li @click="changeColor($event)" class="li">
                        <div><i class="fa fa-map fa-lg"></i>页面模块</div>
                        <ul class="manage-content-small-list">
                            <li @click="handleClick('/manage/pagemanage')">页面管理</li>
                            <li @click="handleClick('/manage/pageadd')">添加页面</li>
                        </ul>
                    </li>
                    <li @click="changeColor($event)" class="li">
                        <div><i class="fa fa-folder-open fa-lg"></i>文件模块</div>
                        <ul class="manage-content-small-list">
                            <li @click="handleClick('/manage/foldmanage')">文件管理</li>
                            <li @click="handleClick('/manage/foldadd')">添加文件</li>
                            <li @click="handleClick('/manage/foldtypemanage')">文件分类</li>
                            <li @click="handleClick('/manage/foldtypeadd')">添加文件分类</li>
                        </ul>
                    </li>
                    <li  @click="changeColor($event)" class="li">
                        <div><i class="fa fa-photo fa-lg"></i>图片模块</div>
                        <ul class="manage-content-small-list">
                            <li @click="handleClick('/manage/imgmanage')">图片管理</li>
                            <li @click="handleClick('/manage/imgadd')">添加图片</li>
                            <li @click="handleClick('/manage/gallerymanage')">图册管理</li>
                            <li @click="handleClick('/manage/galleryadd')">添加相册</li>
                        </ul>
                    </li>
                    <li @click="changeColor($event)" class="li">
                        <div><i class="fa fa-video-camera fa-lg"></i>视频模块</div>
                        <ul class="manage-content-small-list">
                            <li @click="handleClick('/manage/videomanage')">视频管理</li>
                            <li @click="handleClick('/manage/videoadd')">添加视频</li>
                            <li @click="handleClick('/manage/videotypemanage')">视频分类</li>
                            <li @click="handleClick('/manage/videotypeadd')">添加视频分类</li>
                        </ul>
                    </li>
                    <li @click="changeColor($event)" class="li">
                        <div><i class="fa fa-file-text fa-lg"></i>文章模块</div>
                        <ul class="manage-content-small-list">
                            <li @click="handleClick('/manage/articlemanage')">文章管理</li>
                            <li @click="handleClick('/manage/articleadd')">添加文章</li>
                            <li @click="handleClick('/manage/authormanage')">作者管理</li>
                            <li @click="handleClick('/manage/authoradd')">添加作者</li>
                            <li @click="handleClick('/manage/articletypemanage')">文章分类</li>
                            <li @click="handleClick('/manage/articletypeadd')">添加文章分类</li>
                        </ul>
                    </li>
                    <li @click="changeColor($event)" class="li">
                        <div><i class="fa fa-home fa-lg"></i>公告模块</div>
                        <ul class="manage-content-small-list">
                            <li @click="handleClick('/manage/infomanage')">公告管理</li>
                            <li @click="handleClick('/manage/infoadd')">添加公告</li>
                        </ul>
                    </li>
                    <li @click="changeColor($event)" class="li">
                        <div><i class="fa fa-link fa-lg"></i>链接模块</div>
                        <ul class="manage-content-small-list">
                            <li @click="handleClick('/manage/linkmanage')">链接管理</li>
                            <li @click="handleClick('/manage/linkadd')">添加链接</li>
                        </ul>
                    </li>
                    <li @click="changeColor($event)" class="li">
                        <div><i class="fa fa-file-picture-o fa-lg"></i>缩略图模块</div>
                        <ul class="manage-content-small-list">
                            <li @click="handleClick('/manage/thumbnailmanage')">缩略图管理</li>
                            <li @click="handleClick('/manage/thumbnailadd')">添加缩略图</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="manage-content-right">
                <div class="manage-content-right-head" id="head">
                    <span>{{title}}</span>
                </div>
                <router-view></router-view>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data() {

            return {

                //后台管理页面标题
                title:"首页"

            }

        },

        methods: {

            //改变点击后标签的颜色
            changeColor(event,router) {

                var isEdge = navigator.userAgent.indexOf("Edge")

                if($('.progress').width() > 0) {

                    return

                }
            	

                if(isEdge != -1) {

                    if(event.target.tagName == "DIV" && event.target.textContent != "站点配置" && event.target.textContent != "菜单管理" && event.target.textContent != "首页") {

                        return

                    }

                }else {

                    if(event.target.tagName == "DIV" && event.target.innerText != "站点配置" && event.target.innerText != "菜单管理" && event.target.innerText != "首页") {
                	
                        return
                        
                    }

                }

                if(event.target.tagName != "UL" && event.target.className != "li") {

                    this.title = event.target.innerText

                }

                window.location.hash = "head"

                $(this).children('div').children('i').css({"color":"#2666af"})

                $(event.target).css({"color":"#2666af"})

                $(event.target).siblings().css({"color":"#5c5c5c"})

                $(event.target).parent().parent().children('div').css({"color":"#2666af"})

                $(event.target).parent().parent().siblings().children('div').css({"color":"#5c5c5c"})

                $(event.target).parent().parent().siblings().children('ul').children('li').css({"color":"#5c5c5c"})

                $(event.target).parent().siblings().children('div').css({"color":"#5c5c5c"})

                $(event.target).parent().siblings().children('div').css({"color":"#5c5c5c"})

                $(event.target).parent().siblings().children('ul').children('li').css({"color":"#5c5c5c"})

                this.handleClick(router)
                
            },

            //点击跳转路由
            handleClick(router) {

                if($('.progress').width() > 0) {

                    return

                }

                this.$router.push({path:router})

            }

        },

        mounted() {

            var preWidth = document.body.clientWidth

            if(this.$store.state.userRole == 1 || this.$store.state.userRole == "") {

                this.handleClick('/first/official')

                return

            }

            this.$router.push({path:'/manage/managehome'})

            $('.head').css({"color":"#2666af"})

            $('.manage-content').click(function() {

                if($('.manage-content-left').width() == 156) {

                    return

                }

                $('.manage-content-left').css({"width":"13rem","left":"-15rem"})

                $('.manage-icon-return').css({"display":"none"})

                $('.manage-content-list').css({"overflow":"initial"})

            })

            $('.manage-icon').click(function() {

                $('.manage-content-left').css({"width":"20rem","left":"0"})

                $('.manage-icon-return').css({"display":"block"})

                $('.manage-content-list').css({"overflow":"hidden"})

            })

            $('.manage-icon-return').click(function() {

                $('.manage-content-left').css({"width":"13rem","left":"-15rem"})

                $('.manage-icon-return').css({"display":"none"})

                $('.manage-content-list').css({"overflow":"initial"})

            })

            window.onresize = function() {

                if(document.body.clientWidth < 1200) {

                    $('.manage-content-left').css({"left":"-20rem"})

                    $('.manage-icon-return').css({"display":"none"})

                    $('.manage-content-list').css({"overflow":"hidden"})

                }else {

                    $('.manage-icon-return').css({"display":"none"})

                    $('.manage-content-left').css({"left":"0","width":"13rem"})

                    $('.manage-content-list').css({"overflow":"initial"})

                }

            }
 
        },

    }

</script>

<style lang="scss">

    #manage {
        position: relative;
        background:#f5f7f8;
        height:100%;
        overflow: auto;

        .progress {
            position: fixed;
            top:0;
            z-index:3;
            height:.5rem;
            width:0;
            background-image: linear-gradient(to right,rgb(48, 255, 48),rgb(151, 255, 151));
            transition: .5s;
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

        .manage-background {
            position: relative;
            background:#fefefe;
            height:8rem;
            box-shadow: 0 0 2px 2px rgb(240, 240, 240);
            
            .manage-background-head {
                position: relative;
                vertical-align: middle;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                img {
                    position: relative;
                    margin-left:5%;
                    margin-top:.5rem; 
                    width:7rem;
                    height:7rem;
                }

                span {
                    position: relative;
                    margin-left:1rem; 
                    top:-2.5rem;
                    display: inline-block;
                    line-height:10rem;
                    font-size: 2.5rem;
                    color:#777777;
                }
            } 

            .manage-icon {
                position: absolute;
                left:5rem;
                top:2rem;
                width:3rem;
                height: 3rem;
                border: .1rem solid #5088b9;
                color:#5088b9;
                border-radius: 50%;
                text-align: center;
                display: none;
                cursor: pointer;
                transition: .5s;

                i {
                    line-height: 3rem;
                    font-size: 1.5rem;
                }
            }

            .manage-icon:hover {
                 color:#2666af;
                 border: .1rem solid #2666af;
            }

            .manage-icon-back {
                position: absolute;
                right:5rem;
                top:2rem;
                width:3rem;
                height: 3rem;
                border: .1rem solid #5088b9;
                color:#5088b9;
                border-radius: 50%;
                text-align: center;
                cursor: pointer;
                transition: .5s;

                i {
                    line-height: 3rem;
                    font-size: 1.5rem;
                }
            }

            .manage-icon-back:hover {
                 color:#2666af;
                 border: .1rem solid #2666af;
            }
        }

        .manage-content {
            position: relative;
            margin-top: 3rem;
            white-space: nowrap;

            .manage-content-left {
                position: relative;
                display: inline-block;
                margin-left: 8rem;
                width: 13rem;
                vertical-align: top;

                .manage-icon-return {
                    position: fixed;
                    z-index: 3;
                    top:1rem;
                    left:15rem;
                    display: none;
                    i {
                        cursor: pointer;
                        color:#5088b9;
                        font-size: 3rem;
                        transition: .5s;
                    }
                    i:hover {
                        color:#2666af;
                    }
                }

                .manage-content-list {
                    position: relative;
                    list-style: none;
                    li {
                        font-size: 1.5rem;
                        padding:3rem 1rem;
                        border-bottom:.1rem solid #e3e7ea;
                        color: #707070;
                        transition: .5;
                        cursor: pointer; 

                        div {
                            padding: .5rem 0;
                            i {
                                position: absolute;
                                margin-top:.3rem;
                                left: -2.5rem;
                            }
                        }
                        .manage-content-small-list {
                            position: relative;
                            list-style: none;
                            padding-top:1rem; 
                            li {
                                position: relative;
                                font-size: 1.3rem;
                                border-bottom:none; 
                                left:-.8rem;
                                padding:1rem 1rem;
                                transition: .3s;
                            }

                            li:hover {
                                background:#edeff0;
                            }
                        }
                    }
                }
            }

            .manage-content-right {
                position: relative;
                display: inline-block;
                margin-left: 8%;
                margin-top: 3rem;
                width: 70%;

                .manage-content-right-head {
                    position: relative;
                    text-align: center;
                    font-size: 2.5rem;
                    line-height: 5rem;
                    padding:2rem 0;
                    background: #fefefe;
                    box-shadow: 0 0 1px 1px rgb(240, 240, 240);

                    span {
                        position: relative;
                        color:#5088b9;
                        display: inline-block;
                        width:15rem;
                        border-bottom: .1rem solid #5088b9;
                        cursor: pointer;
                        transition: .3s;
                    }

                    span:hover {
                        color:#2666af;
                        border-bottom: .1rem solid #2666af;
                    }
                }
            }
        }       
    }

    @media screen and (min-width:0) and (max-width:1200px) {

        #manage {

            .manage-background {
                text-align: center;
                
                .manage-background-head {

                    img {
                        position: relative;
                        margin-left:0;
                        margin-top:.5rem; 
                        width:6rem;
                        height:6rem;
                    }

                    span {
                        position: relative;
                        margin-left:1rem; 
                        top:-2rem;
                        display: inline-block;
                        line-height:10rem;
                        font-size: 2rem;
                        color:#777777;
                    }
                } 

                .manage-icon {
                    display: block;
                }
            }

            .manage-content {
                text-align: center;

                .manage-content-left {
                    text-align: left;
                    position: fixed;
                    background:white;
                    margin-left:0;
                    z-index: 3;
                    top:0;
                    bottom:0;
                    left:0;
                    width:0;
                    overflow: auto;

                    .manage-content-list {
                        position: absolute;
                        width:100%;

                        li {
                            position: relative;
                            left:5rem;
                        }
                    }
                }

                .manage-content-right {
                    text-align: left;
                    width:90%;
                    margin-left: 0;
                }

            }

        }

    }

     @media screen and (min-width:0) and (max-width:850px) {

          #manage {

            .manage-background {
                text-align: center;
                
                .manage-background-head {

                    img {
                        position: relative;
                        margin-left:0;
                        margin-top:1.3rem; 
                        width:5rem;
                        height:5rem;
                    }

                    span {
                        position: relative;
                        margin-left:1rem; 
                        top:-1.8rem;
                        display: inline-block;
                        line-height:10rem;
                        font-size: 1.6rem;
                        color:#777777;
                        display: none;
                    }
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
                        margin-top:2.5rem;
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
            }
     }

</style>
