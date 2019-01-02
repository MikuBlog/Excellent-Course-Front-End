<template>
    <div id="fold">
        
        <div class="fold-background">
            <div class="fold-background-head">Document</div>
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

        <div class="fold-content">

            <div class="fold-position">
                <span>您当前的位置:</span>
                <span @click="handleClick('/first/official',true)"><i class="fa fa-tag fa-lg"></i>首页</span>
                <span><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span @click="handleClick('/first/fold',true)"><i class="fa fa-tag fa-lg"></i>文件夹</span>
                <span v-if="!show"><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span v-if="!show" @click="handleClick('/first/fold',false,foldname,false)">{{foldname}}</span>
                <span v-if="showSecond"><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span v-if="showSecond">{{foldMessage.title}}</span>
            </div>

            <div class="wrap" v-if="show">
                <div class="search">
                    <input type="text" v-model="message" class="searchTerm" placeholder="What are you looking for?" @keydown="search($event)">
                    <i class="fa fa-search fa-lg searchButton"></i>
                </div>
            </div>

            <div class="fold-list" v-if="show" v-show="!showSearch">
                <ul>
                    <li v-for="(foldName,index) in foldList" @click="handleClick('',false,foldName,false)">
                        <img v-lazy="imageList[index]">
                        <div class="fold-list-name">{{foldName}}</div>
                    </li>
                </ul>
            </div>

            <div class="fold-list" v-if="show" v-show="showSearch">
                <ul>
                    <li v-for="(foldName,index) in showList" @click="handleClick('',false,foldName.model_data.name,false)">
                        <img v-lazy="imageList[index]">
                        <div class="fold-list-name">{{foldName.model_data.name}}</div>
                    </li>
                </ul>
            </div>

            <div class="fold-list-content" v-if="!show">
                <ul>
                    <li v-for="(folds,index) in foldCurrent">
                        <img v-lazy="imageList[index]" @click="handleClickSecond(folds.file_object.name,folds.file_object.description,downloadList[index])">
                        <div class="fold-list-box" @click="handleClickSecond(folds.file_object.name,folds.file_object.description,downloadList[index])">
                            <div class="fold-list-content-head">{{folds.file_object.name}}</div>
                            <span>{{folds.file_object.description}}</span>
                        </div>
                        <div class="icon">
                            <a :href="downloadList[index]" download="w3logo" target="_blank"><i class="fa fa-download fa-lg"></i></a>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="fold-detail" v-if="showSecond">
                <div class="fold-detail-content">
                    <div class="fold-detail-head">{{foldMessage.title}}</div>
                    <div class="fold-detail-description">{{foldMessage.description}}</div>
                    <div class='fold-button'><a :href="foldMessage.url" download="文件.jpg">下载</a></div>
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

            //显示登录提示
            showLogin: false,
            //存放文件分类名
            foldList:[],
            //存放图片地址
            imageList:[],
            //切换页面
            show:true,
            //切换第二个页面,
            showSecond:false,
            //存放文件夹名字
            foldname:"",
            //存放页面信息的变量
            foldMessage:{},
            //存放文件列表
            foldContentList:[],
            //存放当前页面的文件列表
            foldCurrent:[],
            //存放文件下载地址
            downloadList:[],
            //存放搜索信息
            message:"",
            /*
                model_data:文件夹名称
            */
            showList:[],
            //是否显示搜索结果
            showSearch:false

        }

    },

    methods: {

        //筛选搜索结果
    selectData(list) {

      var _this = this

       _this.showList.length = 0

      list.forEach(function(value) {

        if(value.model_name == "FileCategory") {

          _this.showList.push(value)

        }

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

            _this.showSearch = true

            _this.message = ""

            _this.selectData(list)

          },error() {

            console.log("请求数据失败")

          }

        })

      }

    },

        //前往登录页面
        handleClickSign() {

            this.$store.commit('setPosition',"/first/fold")

            this.$router.push({path:"/sign"})

        },

        //隐藏登录提示框
        hideLogin() {

            this.showLogin = false

        },

        getContent() {
            
            var _this = this

            $.ajax({

                url:"http://qwebfx-test.deali.cn/api/file/list",

                type:"GET",

                success(data) {

                    var list = data.list

                    list.forEach(function(value) {

                        _this.foldContentList.push(value)

                    })

                },error() {

                    console.log("请求失败")

                }

            })

        },

        getPicture() {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/utils/img_url/300x300",

                    type:"GET",

                    success(data) {
                        
                        _this.imageList.push(data)

                    },error() {

                        console.log("请求出错")

                    }

                })

        },

        handleClickSecond(title,description,url) {

            if(this.$store.state.userName == "") {

                this.showLogin = true

                return

            }

            this.showSecond = true

            this.foldMessage.title = title

            this.foldMessage.description = description

            this.foldMessage.url = url

            $('.fold-list-content').css({"display":"none"})

        },

        handleClick(router,justify,foldName,showSecond) {

            var _this = this

            _this.foldCurrent.length = 0

            _this.downloadList.length = 0

            if(this.$store.state.userName == "") {

                this.showLogin = true

                return

            }

            if(foldName) {

                var regexp = new RegExp(foldName)
                
                this.foldname = foldName

                this.foldContentList.forEach(function(value) {

                    if(regexp.test(value.file_object.category.name)) {

                        _this.foldCurrent.push(value)

                        _this.downloadList.push("http://qwebfx-test.deali.cn"+value.url)

                    }

                })

            }

            this.showSearch = false

            this.show = justify

            this.showSecond = showSecond

            $('.fold-list-content').css({"display":"block"})

            this.$router.push({path:router})

        }

    },

    mounted() {

        var _this = this

        this.getContent()

        $.ajax({

            url:"http://qwebfx-test.deali.cn/api/file/category-list",

            type:"GET",

            success(data) {

                var list = data.list

                list.forEach(function(value) {

                    _this.foldList.push(value.name)

                })

                for(var i = 0 ; i < _this.foldList.length ; i ++ ) {

                    _this.getPicture()

                }

            },error() {

                console.log("请求失败")

            }

        })

    }

}
</script>

<style lang="scss">

    #fold {
        position: relative;
        height:100%;

         .fold-background {
            position: relative;
            height:80%;
            background: url(../images/official/文件.jpg);
            background-size:cover;
            background-position: center;
            background-attachment: fixed;

            .fold-background-head {
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

            .fold-background-head:hover {
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

        .fold-content {
            position: relative;
            margin:auto;
            width:85%;
            text-align: center;
            animation: moveup 1s both;

            .fold-position {

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

            .fold-list {
                position: relative;
                margin-top:12rem;
                background:white;
                ul {

                    li {
                        display: inline-block;
                        margin:1rem;
                        cursor: pointer;

                        img {
                            padding:2rem;
                            border-bottom: .1rem solid rgb(240, 240, 240);
                            transition: .5s;
                        }

                        .fold-list-name {
                            padding:1rem 0;
                            font-size: 1.7rem;
                            text-shadow: 3px 3px 3px rgb(219, 219, 219);
                            transition: .5s;
                        }

                        img:hover {
                            border-bottom: .1rem solid rgb(190, 242, 255);
                        }

                        .fold-list-name:hover {
                            color:rgb(0, 204, 255);
                        }
                    }
                }
            }

            .fold-list-content {
                position: relative;
                margin-top:5rem;

                ul {
                    position: relative;
                    li {
                        padding:2rem 0;
                        margin: 2rem 0;
                        text-align: left;
                        position: relative;
                        background:white;
                        list-style:none;
                        box-shadow: 0 0 3px 3px rgb(235, 235, 235);
                        cursor: pointer;
                        transition: .5s;

                        img {
                            margin:0 3rem;
                            width:15rem;
                            height:15rem;
                        }

                        .fold-list-box {
                            position: relative;
                            display: inline-block;
                            bottom:7rem;

                            .fold-list-content-head {
                                position: relative;
                                font-size: 2rem;
                                line-height: 4rem;
                                transition: .5s;
                            }


                            .fold-list-content-head:hover {
                                color:rgb(0,204,255);
                            }

                            span {
                                position: relative;
                                top:2rem;
                                display: inline-block;
                                font-size: 1.5rem;
                                transition: .5s;
                            }

                            span:hover {
                                color:rgb(0,204,255);
                            }
                        }

                        .icon {
                            position: absolute;
                            top:9rem;
                            right:2rem;

                            i {
                                color:black;
                                font-size: 3rem;
                                transition: .5s;
                            }

                            i:hover {
                                color:rgb(0,204,255);
                            }
                        }
                    }

                    li:hover {
                        box-shadow: 0 0 3px 3px #c2e9fb;
                    }
                }
            }

            .fold-detail {
                margin-top:5rem;
                background:white;
                box-shadow: 0 0 3px 3px rgb(235, 235, 235);
                transition: .5s;
                cursor: pointer;

                .fold-detail-head {
                    font-size: 3rem;
                    padding:5rem;
                    transition: .5s;
                    text-shadow: 3px 3px 3px rgb(235, 235, 235);
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap
                }

                .fold-detail-description {
                    font-size: 1.5rem;
                    text-align: left;
                    text-indent: 2rem;
                }

                .fold-detail-head:hover {
                    color:rgb(0,204,255);
                }

                .fold-button {
                    margin:5rem 0 3rem 0;
                    font-size: 1.2rem;
                    font-weight: bold;
                    display: inline-block;
                    padding:.7rem 2rem;
                    background:red;
                    border:.2rem solid red;
                    transition: .3s;

                    a {
                        color:white;
                        text-decoration: none;
                        transition: .3s;
                    }
                }

                .fold-button:hover {
                    border:.2rem solid rgb(0,204,255);
                    background:white;
                    a {
                        color:rgb(0,204,255);
                    }
                }
            }

            .fold-detail:hover {
                box-shadow: 0 0 3px 3px #c2e9fb;
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

        #fold {

            .fold-content {
                width:60%;
            }
        }
    }

    @media screen and (min-width:0) and (max-width:700px) {

        #fold {

            .fold-background {

                height:40rem;

                    .fold-background-head {
                        font-size: 3rem;
                    }
                }

            .fold-content {

                width:90%;  

                .wrap {
                    width:100%;
                }

                .fold-detail {

                    .fold-detail-head {
                        font-size: 2rem;
                    }

                    .fold-detail-description {
                        font-size: 1.3rem;
                    }

                }

                .fold-list {

                    ul {

                        li {

                            img {
                                width:18rem;
                                height:18rem;
                            }
                        }
                    }
                }

                .fold-list-content {

                    ul {

                        li {
                            text-align: center;
                            img {

                                margin:0 0;
                            }
                            .fold-list-box {
                                bottom:0;
                                display: block;

                                .fold-list-content-head {
                                    font-size: 1.5rem;
                                    line-height: 3rem;
                                }

                                span {
                                    top:1rem;
                                    font-size: 1.2rem;
                                }
                            }
                            .icon {
                                top:21rem;
                                right:1rem;

                                i {
                                    font-size: 2.5rem;
                                }
                            }
                        }
                    }
                }

                .fold-position {
                
                    span {
                        font-size: 1.1rem;
                        padding:.2rem .7rem;
                    } 
                }     

            }


        }
        
    }

</style>

