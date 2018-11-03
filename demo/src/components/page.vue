<template>
    <div id="page">
        
        <div class="page-background">
            <div class="page-background-head">Article</div>
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

        <div class="page-content">

                <div class="page-position">
                    <span>您当前的位置:</span>
                    <span @click="handleClick('/first/official',true)"><i class="fa fa-tag fa-lg"></i>首页</span>
                    <span><i class="fa fa-angle-double-right fa-lg"></i></span>
                    <span @click="handleClick('/first/page',true)"><i class="fa fa-tag fa-lg"></i>文章栏</span>
                    <span v-if="!show"><i class="fa fa-angle-double-right fa-lg"></i></span>
                    <span v-if="!show">文章</span>
                </div>

                <div class="page-left" v-show="show">
                    <div class="page-left-head">
                        <div class="page-left-icon">
                            <i class="fa fa-tags fa-lg"></i><span>Article</span>
                        </div>    
                        Catalog
                    </div>
                    <ul class="page-left-list">
                        <li v-for="item in storageArticleTypeList" @click="getTypeList(item.id,item.name)">
                          {{item.name}}
                          <div class="page-left-description">
                            description:{{item.description}}
                          </div>
                        </li>
                    </ul>
                    <div class="paging">
                      <span class="paging-left" @click="nextType('last')"><i class="fa fa-arrow-left fa-lg"></i></span>
                      <span class="paging-right" @click="nextType('next')"><i class="fa fa-arrow-right fa-lg"></i></span>
                    </div>
                </div>

                <div class="page-right" v-if="show">

                    <div class="wrap" v-if="show">
                        <div class="search">
                            <input type="text" v-model="message" class="searchTerm" placeholder="What are you looking for?" @keydown="search($event)">
                            <i class="fa fa-search fa-lg searchButton"></i>
                        </div>
                    </div>

                    <ul class="page-right-list" v-if="!showSearch">
                        <li v-for="page of pageList" @click="getPage(page.post_title,page.id)">
                            <div class="page-right-head">{{page.name}}</div>
                            <div class="page-right-icon">
                                <div class="page-right-time icon">
                                    <i class="fa fa-clock-o fa-lg"></i><span>2018-10-03</span>
                                </div>
                                <div class="page-right-time icon">
                                    <i class="fa fa-eye fa-lg"></i><span>999阅读</span>
                                </div>
                                <div class="page-right-time icon">
                                    <i class="fa fa-thumbs-o-up fa-lg"></i><span>16人点赞</span>
                                </div>
                                <div class="page-right-time icon">
                                    <i class="fa fa-commenting-o fa-lg"></i><span>33条评论</span>
                                </div>
                            </div>
                            <div class="page-right-content"><i class="fa fa-user fa-lg"></i>
                                <span>{{page.post_author.name}}</span>
                            </div>
                            <div class="page-right-catalog">
                                <i class="fa fa-tags fa-lg"></i><span v-if="showNumber2">{{page.post_category.name}}</span><span v-if="!showNumber2">{{typeName}}</span>
                            </div>
                        </li>
                    </ul>

                    <ul class="page-right-list" v-if="showSearch">
                        <li v-for="page of showList" @click="getPage(page.model_data.post_title,page.model_data.id)">
                            <div class="page-right-head">{{page.model_data.name}}</div>
                            <div class="page-right-icon">
                                <div class="page-right-time icon">
                                    <i class="fa fa-clock-o fa-lg"></i><span>2018-10-03</span>
                                </div>
                                <div class="page-right-time icon">
                                    <i class="fa fa-eye fa-lg"></i><span>999阅读</span>
                                </div>
                                <div class="page-right-time icon">
                                    <i class="fa fa-thumbs-o-up fa-lg"></i><span>16人点赞</span>
                                </div>
                                <div class="page-right-time icon">
                                    <i class="fa fa-commenting-o fa-lg"></i><span>33条评论</span>
                                </div>
                            </div>
                            <div class="page-right-content"><i class="fa fa-user fa-lg"></i>
                                <span>{{page.authorName}}</span>
                            </div>
                            <div class="page-right-catalog">
                                <i class="fa fa-tags fa-lg"></i><span>{{page.type}}</span>
                            </div>
                        </li>
                    </ul>

                    <div class="page-right-next" v-if="showNumber"  v-show="!showSearch">
                      <span class="page-right-span" @click="goTop()">Top</span>
                      <span class="page-right-span" @click="next('last')"><i class="fa fa-angle-double-left fa-lg"></i></span>
                      <span class="page-right-span" v-for="num in total" @click="getPageList(num)">{{num}}</span>
                      <span class="page-right-span" @click="next('next')"><i class="fa fa-angle-double-right fa-lg"></i></span>
                      <span class="page-right-span" @click="goTail()">Tail</span>
                    </div>

                </div>

            <div class="page-getcontent" v-if="!show">

                    <div class="page-getcontent-head">
                        <span>{{pageTitle}}</span>
                    </div>

                    <div class="page-getcontent-content" v-html="articleContent"></div>

                    <div class="page-getcontent-reward">
                        <span>打赏</span>
                        <span>点赞</span>
                        <span>分享</span>
                    </div>
            </div>

            <div class="page-comment" v-if="!show">
                <div class="page-comment-head"><span>评论(999)</span></div>
                <div class="page-comment-content">
                    {{comment}}
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
                    存放文章列表
                    name:文章分类名称
                    id:文章分类id
                    description:文章分类描述
                */
      storageArticleTypeList:[],
      //显示登录提示
      showLogin: false,
      //存放搜索信息
      message: "",
      //切换页面
      show: true,
      //用于作者名字显示的媒介
      showName: false,
      /*
                    id:文章id
                    name:文章名字,
                    post_title:文章标题,
                    post_author.name:作者的名字,
                    post_category.name:文章分类,
                    post_summary:文章描述
                    post_content:文章内容
                    post_category_id:文章分类id
                */
      pageList: [],
      /*
                    缓存当前文章信息
                */
      storagePage: {},
      //存放文章内容
      articleContent:"",
      //存放文章标题
      pageTitle:"",
      /*
        存放作者的名字
      */
      writerName: "",
      //存放文件总页数
      pageNumber:"",
      //存放文件页码
      total:[],
      //文件每页的条数
      eachPageNumber:10,
      //存放当前页数
      nowPageNumber:1,
      //是否显示分页栏
      showNumber:true,
      //每页的总数
      eachPageNumber:10,
      //是否隐藏页码条
      showNumber2:true,
      //当前分类名称
      typeName:"",
      //当前视频分类的页数
      nowPageTypePageNumber:1,
      //视频分类总页数
      pageTypePageNumber:"",
      //存放评论数据
      comment:"您需要登录才能看到评论哟~",
      //显示搜索结果
      showSearch:false,
      /*
        model_data.name:文章名称
        model_data.content:文章内容
        model_data.id:文章id
        model_data.post_category_id:文章分类id
      */
      showList:[]
    };
  },

  methods: {

    //请求作者信息
    getAuthorMsg(id) {

      var name

      $.ajax({

        url:"http://qwebfx-test.deali.cn/api/post/author/get?id="+id,

        type:"GET",

        async:false, 

        success(data) {

          name = data.author.name

        },error() {

          console.log("请求失败")

        }

      })

      return name

    },

    //请求文章分类信息
    getPageTypeMsg(id) {

      var type

      $.ajax({

        url:"http://qwebfx-test.deali.cn/api/post/category/get?id="+id,

        type:"GET",

        async:false, 

        success(data) {

          type = data.category.name

        },error() {

          console.log("请求失败")

        }

      })

      return type

    },

    //筛选搜索结果
    selectData(list) {

      var _this = this

       _this.showList.length = 0

      list.forEach(function(value) {

        if(value.model_name == "Post") {

          value.type = _this.getPageTypeMsg(value.model_data.post_category_id)

          console.log(value.type)

          value.authorName = _this.getAuthorMsg(value.model_data.post_author_id)

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

            console.log(list)

            _this.showSearch = true

            _this.message = ""

            _this.selectData(list)

          },error() {

            console.log("请求数据失败")

          }

        })

      }

    },

    //获取文章内容
    getArticleConetent(id) {

      var _this = this

      $.ajax({

        url:"http://qwebfx-test.deali.cn/api/post/get?id="+id,

        type:"GET",

        success(data) {

          _this.articleContent = data.post.post_content

        },error() {

          console.log("请求文章内容失败")

        }

      })

    },

    //获取视频分类总页数
        getAllTypePageNumber() {

            var _this = this

            $.ajax({

                url:"http://qwebfx-test.deali.cn/api/post/category/count",

                type:"GET",

                success(data) {

                    _this.pageTypePageNumber = Math.ceil(data.count/_this.eachPageNumber)

                    if(_this.pageTypePageNumber>=2) {

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

                    if(this.nowPageTypePageNumber == this.pageTypePageNumber) {

                        return

                    }

                    ++this.nowPageTypePageNumber

                    this.getArticleTypeList(this.nowPageTypePageNumber)

                    if(this.nowPageTypePageNumber == this.pageTypePageNumber) {

                        $('.paging-right').css({"display":"none"})

                        $('.paging-left').css({"display":"block"})

                        return

                    }

                    $('.paging-right').css({"display":"block"})

                    $('.paging-left').css({"display":"block"})

                }else {

                    if(this.nowPageTypePageNumber == 1) {

                        return

                    }

                    --this.nowPageTypePageNumber

                    this.getArticleTypeList(this.nowPageTypePageNumber)

                    if(this.nowPageTypePageNumber == 1) {

                        $('.paging-right').css({"display":"block"})
                        
                        $('.paging-left').css({"display":"none"})

                        return

                    }

                    $('.paging-right').css({"display":"block"})

                    $('.paging-left').css({"display":"block"})

                }

        },


    //获取分类文章
    getTypeList(id,name) {

      var _this = this

      this.showNumber2 = false

      this.showNumber = false

      this.showSearch = false

      this.typeName = name

      $.ajax({

        url:"http://qwebfx-test.deali.cn/api/post/category/get?id="+id,

        type:"GET",

        success(data) {

          var list = data.category.posts

          console.log(list)

          _this.initialPageList(list)

        },error() {

          console.log("请求失败")

        }

      })

    },

            //初始化文章分类列表
            initialArticleTypeList(list) {

                var _this = this

                _this.storageArticleTypeList.length = 0

                list.forEach(function(value) {

                    _this.storageArticleTypeList.push(value)

                })

            },

            //获取文章分类信息
            getArticleTypeList(id) {

                var _this = this

                this.nowPageNumber = id

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/post/category/list?page="+id,

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialArticleTypeList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            //跳转到第一页
            goTop() {

                this.getPageList(1)

            },

            //跳转到最后一页
            goTail() {

                this.getPageList(this.pageNumber)

            },

            //跳转页面
            next(command) {

                if(command == "next") {

                    if(this.nowPageNumber == this.pageNumber) {

                        return

                    }

                    this.getPageList(++this.nowPageNumber)

                }else {

                    if(this.nowPageNumber == 1) {

                        return

                    }

                    this.getPageList(--this.nowPageNumber)

                }

            },

            //获取文件总页数
            getTotal() {

                var _this = this

                this.total.length = 0

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/post/count",

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

    //隐藏登录提示框
    hideLogin() {
      this.showLogin = false;
    },

    //给搜索框添加点击事件
    inputFocus() {
      $(".searchTerm").focus(function() {
        $(".searchButton").css({ background: "#6da7ff" });
      });

      $(".searchTerm").blur(function() {
        $(".searchButton").css({ background: "#a4c7fb" });
      });
    },

    //将当前文章信息存放进对象当中,并且获取文章内容
    getPage(page,id) {
      if (this.$store.state.userName == "") {

        this.showLogin = true;

        return;
      }

      this.articleContent = ""

      this.getArticleConetent(id)

      this.pageTitle = page;

      this.show = false;

      this.showNumber = false
    },

    //跳转路由
    handleClick(router, justify) {

      if(router == "/first/page") {

        this.getPageList(this.nowPageNumber)

        this.showNumber2 = true

      }

      this.$store.commit('setPosition',"/first/page")

      this.$router.push({ path: router });

      this.show = justify;

      this.showNumber = true

      this.showNumber2 = true

      this.showSearch = false
    },

    //初始化当前文章页面
    initialPageList(list) {

      var _this = this

      this.pageList.length = 0

      if(list.length == 0 ){

        this.pageList.length = 0

        return

      }

      list.forEach(function(value) {

        _this.pageList.push(value)

      })

    },

    //获取文章列表
    getPageList(id) {

      var _this = this;

      this.nowPageNumber = id

      $.ajax({
        
        url: "http://qwebfx-test.deali.cn/api/post/list?page="+id,

        type: "GET",

        success(data) {
          var list = data.list;

          console.log(list)

          _this.initialPageList(list)

        },
        error() {
          console.log("请求失败");
        }
      });
    },
  },

  mounted() {

    this.getPageList(this.nowPageNumber);

    this.getAllTypePageNumber()

    this.getTotal();

    this.getArticleTypeList(1)

    if(this.$store.state.userId != "") {

      this.comment = "你登录了也看不到评论~"

    } 

  }
};
</script>

<style lang="scss">
#page {
  position: relative;
  background: #f1f1f1;
  height: 100%;
  .page-background {
    position: relative;
    height:80%;
    background: url(../images/official/文章.jpg);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;

    .page-background-head {
      position: relative;
      top: 50%;
      margin-top: -3rem;
      line-height: 6rem;
      font-size: 5rem;
      color: rgb(255, 255, 255);
      text-align: center;
      font-style: italic;
      cursor: pointer;
      transition: 0.3s;
      text-shadow: 3px 3px 3px silver;
      animation: showup 1s 0.5s both;
    }

    .page-background-head:hover {
      color: rgb(86, 221, 255);
    }

    @keyframes showup {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }

  .page-content {
    position: relative;
    top: 10rem;
    margin: auto;
    width: 85%;
    text-align: center;
    animation: moveup 1s both;

    .page-position {
      position: relative;
      text-align: left;
      left: 1.5rem;
      margin-top: 5rem;
      span {
        position: relative;
        line-height: 3rem;
        border: 0.2rem solid #c2e9fb;
        background: white;
        color: #c2e9fb;
        font-size: 1.3rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: 0.5s;
      }

      span:hover {
        color: white;
        background: #c2e9fb;
      }
    }

    .page-left {
      position: relative;
      vertical-align: top;
      margin-top: 5rem;
      display: inline-block;
      background: white;
      width: 35rem;
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

      .page-left-head {
        color: rgb(255, 255, 255);
        position: relative;
        line-height: 14rem;
        text-align: center;
        font-size: 2.8rem;
        font-weight: bold;
        background-image: linear-gradient(to bottom, #a1c4fd, #c2e9fb);
        box-shadow: 0 0 3px 3px rgb(235, 235, 235);
        text-shadow: 3px 3px 3px rgb(245, 244, 244);
        transition: 0.3s;
        font-style: italic;

        .page-left-icon {
          font-style: initial;
          position: relative;
          line-height: 3rem;
          padding: 1rem 0;
          margin: auto;
          width: 60%;
          font-size: 1.2rem;
          border-bottom: 0.2rem inset rgba(230, 230, 230, 0.26);
          text-shadow: 0px 0px 0px rgb(235, 235, 235);
          transition: 0.3s;
        }
      }

      .page-left-list {
        margin-top: 1rem;

        li {
          position: relative;
          margin: auto;
          font-size: 1.3rem;
          line-height: 2.5rem;
          padding: 1rem 0;
          list-style: none;
          border-bottom: 0.1rem solid rgb(240, 240, 240);
          text-indent: 4rem;
          transition: 0.3s;
          cursor: pointer;

          .page-left-description {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height:0;
            opacity: 0;
            transition: .5s;
          }
        }

        li:nth-child(2n) {
          background: rgb(247, 247, 247);
        }

        li:hover {
          color: rgb(0, 204, 255);
          text-shadow: 3px 3px 3px rgb(235, 235, 235);

          .page-left-description{
            height:auto;
             opacity: 1;
          }
        }
      }
    }

    .page-right {
      position: relative;
      display: inline-block;
      margin-left: 10rem;
      width: 50%;

      .wrap {
        position: relative;
        width: 100%;
        left: 50%;
        top: -3rem;
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

      .page-right-list {
        position: relative;
        margin-top: 5rem;
        text-align: left;

        li {
          position: relative;
          list-style: none;
          padding: 2rem;
          background: white;
          margin: 2rem 0;
          box-shadow: 0 0 1px 3px rgb(235, 235, 235);
          cursor: pointer;
          transition: 0.5s;

          .page-right-head {
            font-size: 2rem;
            line-height: 5rem;
            transition: 0.5s;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .page-right-head:hover {
            color: rgb(0, 204, 255);
          }

          .page-right-icon {
            .icon {
              padding: 0 1rem;
              line-height: 2.5rem;
              display: inline-block;
              transition: 0.5s;
            }

            .icon:hover {
              color: rgb(0, 204, 255);
            }

            .icon:first-of-type {
              padding-left: 0;
            }
          }

          .page-right-catalog {
            position: absolute;
            right: 1rem;
            bottom: 1rem;
            padding: 0.5rem 1rem;
            font-size: 1.1rem;
            border-radius: 2rem;
            transition: 0.5s;
          }

          .page-right-catalog:hover {
            color: white;
            background: #7d7d7d;
          }
        }

        li:hover {
          box-shadow: 0 0 3px 3px #c2e9fb;
        }

        .page-right-content {
          padding: 1rem 0;
          font-size: 1.3rem;
          transition: 0.5s;

          i {
            margin: 0 0.3rem;
          }
        }

        .page-right-content:hover {
          color: rgb(0, 204, 255);
        }
      }

      .page-right-span {
          padding: 1rem 1.5rem;
          margin: 0 0.2rem;
          background: white;
          display: inline-block;
          font-size: 1.3rem;
          cursor: pointer;
          border: 0.1rem solid rgb(240, 240, 240);
          box-shadow: 0 0 1px 1px rgb(235, 235, 235);
          transition: 0.5s;
        }

        .page-right-span:hover {
          color: rgb(0, 204, 255);
          border: 0.1rem solid rgb(0, 204, 255);
        }
      }

    .page-getcontent {
      position: relative;
      margin-top: 5rem;
      background: white;
      box-shadow: 0 0 3px 3px rgb(235, 235, 235);
      transition: 0.5s;

      .page-getcontent-head {
        font-size: 2rem;
        line-height: 10rem;
        padding-bottom: 5rem;
        transition: 0.5s;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;

        span {
          display: inline-block;
          height: 8rem;
          border-bottom: 0.1rem dotted rgb(230, 230, 230);
        }
      }
      .page-getcontent-head:hover {
        color: rgb(0, 204, 255);
      }

      .page-getcontent-content {
        text-align: left;
        font-size: 1.5rem;
        text-indent: 5rem;
        padding: 0 0 3rem 0;
      }

      .page-getcontent-reward {
        height: 8rem;
        display: inline-block;
        border-top: 0.1rem dotted rgb(230, 230, 230);
        span {
          position: relative;
          color: white;
          margin: 3rem;
          line-height: 8rem;
          font-size: 1.2rem;
          padding: 1rem 4rem;
          background: silver;
          transition: 0.5s;
          cursor: pointer;
        }
        span:first-of-type {
          border: 0.2rem solid #5bbfdd;
          background: #5bbfdd;
        }
        span:nth-of-type(2) {
          border: 0.2rem solid #efac50;
          background: #efac50;
        }
        span:last-of-type {
          border: 0.2rem solid #5ab75d;
          background: #5ab75d;
        }
        span:first-of-type:hover {
          color: #5bbfdd;
          background: white;
        }
        span:nth-of-type(2):hover {
          color: #efac50;
          background: white;
        }
        span:last-of-type:hover {
          color: #5ab75d;
          background: white;
        }
      }
    }

    .page-getcontent:hover {
      box-shadow: 0 0 3px 3px #c2e9fb;
    }

    .page-comment {
      position: relative;
      margin-top: 5rem;
      width: 100%;
      background: white;
      text-align: left;
      transition: 0.5s;
      .page-comment-head {
        position: relative;
        border-bottom: 0.1rem solid rgb(238, 238, 238);
        span {
          display: inline-block;
          padding: 1rem 2rem;
          background: #f6f6f6;
          font-size: 1.1rem;
          vertical-align: middle;
          color: silver;
        }
      }
      .page-comment-content {
        text-indent: 1rem;
        font-size: 1.3rem;
        line-height: 20rem;
        color: silver;
      }
    }

    .page-comment:hover {
      box-shadow: 0 0 3px 3px #c2e9fb;
    }
  }

  @keyframes moveup {
    0% {
      top: 10rem;
    }
    100% {
      top: 0;
    }
  }
}
@media screen and (min-width: 1441px) {
  #page {
    .page-content {
      .page-getcontent {
        margin: auto;
        margin-top: 5rem;
        width: 70%;
      }

      .page-comment {
        margin: auto;
        margin-top: 5rem;
        width: 70%;
      }
    }
  }
}

@media screen and (min-width: 700px) and (max-width: 1440px) {
  #page {
    .page-content {
      .page-left {
        display: none;
      }

      .page-right {
        margin-top: 8rem;
        margin-left: 0;
        width: 90%;
      }

      .page-getcontent {
        .page-getcontent-content {
          text-index: 4rem;
        }

        .page-getcontent-reward {
          span {
            padding: 0.8rem 2.5rem;
            font-size: 1.3rem;
            margin: 2rem;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 0) and (max-width: 700px) {
  #page {
    .page-background {
      height: 40rem;

      .page-background-head {
        font-size: 3rem;
      }
    }

    .page-content {
      width: 90%;

      .page-position {
        span {
          font-size: 1.1rem;
          padding: 0.2rem 0.7rem;
        }
      }

      .page-left {
        display: none;
      }

      .page-right {
        margin-top: 6rem;
        margin-left: 0;
        width: 100%;
        height: 130rem;

        .page-right-list {

          li {
            .page-right-catalog {
              bottom:0;
              right: 0;
            }
          }

        }

        .page-right-next {
          .page-right-span {
            padding: 0.5rem 0.7rem;
            font-size: 1.1rem;
            margin: 0;
          }
        }

        .wrap {
          .search {
            width: 98%;
          }
        }

      }

      .page-getcontent {
        .page-getcontent-content {
          text-indent: 1.5rem;
          font-size: 1.3rem;
        }

        .page-getcontent-head {
          font-size: 1.5rem;
        }

        .page-getcontent-reward {
          font-size: 1.2rem;

          span {
            padding: 0.7rem 1.5rem;
            margin: 0.5rem;
          }
        }
      }
    }
  }
}
</style>
