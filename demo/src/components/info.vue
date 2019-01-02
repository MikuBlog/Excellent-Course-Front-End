<template>

    <div id="info">

        <div class="info-background">
            <div class="info-background-head">Announcement</div>
        </div>

        <div class="info-content">

            <div class="info-position">
                <span>您当前的位置:</span>
                <span @click="handleClick('/first/official',true)"><i class="fa fa-tag fa-lg"></i>首页</span>
                <span><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span @click="handleClick('/first/info',true)"><i class="fa fa-tag fa-lg"></i>公告栏</span>
                <span v-if="!show"><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span v-if="!show">公告</span>
            </div>

            <div class="info-left">
                <div class="info-left-head">
                    <div class="info-left-icon">
                        <i class="fa fa-tags fa-lg"></i><span>Announcement</span>
                    </div>    
                    Newest
                </div>
                <ul class="info-left-list">
                    <li v-for="(item,index) in newestInfoList" @click="sendMessage(item.title,item.content)" v-if="index<10">
                        {{item.title}}
                    </li>
                </ul>
            </div>

            <div class="info-right">

                <div class="wrap" v-if="show">
                        <div class="search">
                            <input type="text" v-model="information" class="searchTerm" placeholder="What are you looking for?" @keydown="search($event)">
                            <i class="fa fa-search fa-lg searchButton"></i>
                        </div>
                </div>

                <div v-if="show">

                  <ul class="info-right-list" v-if="!showSearch">
                      <li v-for="item in storageInfoList" @click="sendMessage(item.title,item.content)">
                          <div class="info-right-head">{{item.title}}</div>
                          <div class="info-right-icon">
                              <div class="info-right-time icon">
                                  <i class="fa fa-clock-o fa-lg"></i><span>2018-10-03</span>
                              </div>
                              <div class="info-right-time icon">
                                  <i class="fa fa-eye fa-lg"></i><span>999阅读</span>
                              </div>
                              <div class="info-right-time icon">
                                  <i class="fa fa-thumbs-o-up fa-lg"></i><span>16人点赞</span>
                              </div>
                              <div class="info-right-time icon">
                                  <i class="fa fa-commenting-o fa-lg"></i><span>33条评论</span>
                              </div>
                          </div>
                      </li>
                  </ul>

                <ul class="info-right-list" v-if="showSearch">
                  
                  <li v-for="info of showList" @click="sendMessage(info.model_data.title,info.model_data.content)">
                        <div class="info-right-head">{{info.model_data.title}}</div>
                        <div class="info-right-icon">
                            <div class="info-right-time icon">
                                <i class="fa fa-clock-o fa-lg"></i><span>2018-10-03</span>
                            </div>
                            <div class="info-right-time icon">
                                <i class="fa fa-eye fa-lg"></i><span>999阅读</span>
                            </div>
                            <div class="info-right-time icon">
                                <i class="fa fa-thumbs-o-up fa-lg"></i><span>16人点赞</span>
                            </div>
                            <div class="info-right-time icon">
                                <i class="fa fa-commenting-o fa-lg"></i><span>33条评论</span>
                            </div>
                        </div>
                     </li>

                </ul>

                </div>

                <div class="info-right-next" v-if="show" v-show="!showSearch">
                    <span class="info-right-span" @click="goTop()">Top</span>
                    <span class="info-right-span" @click="next('last')"><i class="fa fa-angle-double-left fa-lg"></i></span>
                    <span v-for="number in total" @click="getInfoList(number)" class="info-right-span">{{number}}</span>
                    <span class="info-right-span" @click="next('next')"><i class="fa fa-angle-double-right fa-lg"></i></span>
                    <span class="info-right-span" @click="goTail()">Tail</span>
                </div>

                <div class="info-getcontent" v-if="!show">

                    <div class="info-getcontent-head">
                        <span>{{message.title}}</span>
                    </div>

                    <div class="info-getcontent-content" v-html="message.content">
                    </div>

                    <div class="info-getcontent-reward">
                        <span>打赏</span>
                        <span>点赞</span>
                        <span>分享</span>
                    </div>

                </div>

                <div class="info-comment" v-if="!show">
                    <div class="info-comment-head"><span>评论(999)</span></div>
                    <div class="info-comment-content">
                        {{comment}}
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

    </div>


</template>

<script>
export default {
  data() {
    return {
      /*
        存放当页公告列表
        content:公告内容
        title:公告标题
        id:公告id
      */
      storageInfoList:[],
      //存放最新公告
      newestInfoList:[],
      //存放公告页数
      total: [],
      //存放显示的公告，内容为对象(包含每个公告的标题和内容)
      storageList: [],
      //存放文件总页数
      pageNumber:"",
      //存放文件页码
      total:[],
      //文件每页的条数
      eachPageNumber:10,
      //存放当前页数
      nowPageNumber:1,
      //true为公告栏，fasle为单条公告的内容
      show: true,
      //显示登录提示
      showLogin:false,
      //存放单条公告的标题和内容
      message: {
        title: "",
        content: ""
      },
      //存放表单信息
      information: "",
      //展示搜索的结果
      showSearch: false,
      /*
        model_data.content:公告内容
        model_data.id:公告id
        model_data.title:公告标题
      */
      showList: [],
      //存放评论数据
      comment:"您需要登录才能看到评论哟~"
    };
  },

  methods: {

    //筛选搜索结果
    selectData(list) {

      var _this = this

       _this.showList.length = 0

      list.forEach(function(value) {

        if(value.model_name == "Announcement") {

          _this.showList.push(value)

        }

      })

    },

    //搜索
    search(event) {

      var _this = this

      if(event.keyCode == 13) {

        if(this.information == "") {

          return 

        }

        $.ajax({

          url:"http://qwebfx-test.deali.cn/api/search/?w="+_this.information,

          type:"GET",

          success(data) {

            var list = data.result

            _this.showSearch = true

            _this.information = ""

            _this.selectData(list)

          },error() {

            console.log("请求数据失败")

          }

        })

      }

    },

    //获取最新公告列表
    getNewestInfoList(id) {

      var _this = this

      $.ajax({

        url:"http://qwebfx-test.deali.cn/api/announcement/list?page="+id,

        async:false,

        type:"GET",

        success(data) {

          var list = data.list

          list.forEach(function(value) {

            _this.newestInfoList.unshift(value)

          })

          },error() {

            console.log("请求失败")

          }

      })

    },

    //跳转到第一页
            goTop() {

                this.getInfoList(1)

            },

            //跳转到最后一页
            goTail() {

                this.getInfoList(this.pageNumber)

            },

            //跳转页面
            next(command) {

                if(command == "next") {

                    if(this.nowPageNumber == this.pageNumber) {

                        return

                    }

                    this.getInfoList(++this.nowPageNumber)

                }else {

                    if(this.nowPageNumber == 1) {

                        return

                    }

                    this.getInfoList(--this.nowPageNumber)

                }

            },

            //获取文件总页数
            getTotal() {

                var _this = this

                this.total.length = 0

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/announcement/count",

                    type:"GET",

                    success(data) {

                        _this.pageNumber = Math.ceil(data.count/_this.eachPageNumber)

                        for(var i = 1 ; i <= _this.pageNumber ; i ++) {

                            _this.total.push(i)

                        }

                        if(_this.pageNumber >= 2) {

                          _this.getNewestInfoList(_this.pageNumber-1)

                          _this.getNewestInfoList(_this.pageNumber)

                        }else {

                          _this.getNewestInfoList(_this.pageNumber)

                        }

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

    //隐藏登录提示框
    hideLogin() {

      this.showLogin = false

    },

    //处理路由与切换页面
    handleClick(router, justify) {

      if(router == "/first/info") {

        this.showSearch = false

        this.getInfoList(this.nowPageNumber)

      }

      this.show = justify;

      this.$store.commit('setPosition',"/first/info")

      this.$router.push({ path: router });

    },

    //点击公告条刷新并进入单条公告内容区块
    sendMessage(title, content) {


      if(this.$store.state.userName == "") {

        this.showLogin = true

        return

      }

      this.message.title = title;

      this.message.content = content;

      this.show = false;

    },

    //初始化公告列表
    initialInfoList(list) {

      var _this = this

      this.storageInfoList.length = 0

      list.forEach(function(value) {

         _this.storageInfoList.push(value)

      })

    },

    //获取当页公告
    getInfoList(id) {

            var _this = this

            this.nowPageNumber = id

            $.ajax({

                url:"http://qwebfx-test.deali.cn/api/announcement/list?page="+id,

                type:"GET",

                success(data) {

                    var list = data.list

                    _this.initialInfoList(list)

                },error() {

                  console.log("请求成功")

                }

            })

        },
  },

  mounted() {
  

    this.getInfoList(this.nowPageNumber)

    this.getTotal()

    // this.getNewestInfoList()

    if(this.$store.state.userId != "") {

      this.comment = "你登录了也看不到评论~"

    } 
    
  }

};
</script>

<style lang="scss">
#info {
  position: relative;
  height:100%;
  background: #f1f1f1;


  .footer {
    position: relative;
    margin-top: 10rem;
    background: black;

    .footer-content {
      text-align: center;
      line-height: 10rem;
      font-size: 1.3rem;
      color: white;
    }
  }

  .info-background {
    position: relative;
    height:80%;
    background: url(../images/official/公告.jpg);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;

    .info-background-head {
      position: relative;
      top: 50%;
      margin-top: -3rem;
      line-height: 6rem;
      font-size: 5rem;
      color: rgb(255, 255, 255);
      text-align: center;
      font-style: italic;
      transition: 0.3s;
      cursor: pointer;
      text-shadow: 3px 3px 3px silver;
      animation: showup 1s 0.5s both;
    }

    .info-background-head:hover {
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

  .info-content {
    position: relative;
    top: 10rem;
    margin: auto;
    width: 85%;
    text-align: center;
    animation: moveup 1s both;

    .info-position {
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

    .info-left {
      position: relative;
      vertical-align: top;
      margin-top: 5rem;
      display: inline-block;
      background: white;
      width: 35rem;
      box-shadow: 0 0 3px 3px rgb(235, 235, 235);
      text-align: left;

      .info-left-head {
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

        .info-left-icon {
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

      .info-left-list {
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }

        li:nth-child(2n) {
          background: rgb(247, 247, 247);
        }

        li:hover {
          color: rgb(0, 204, 255);
          text-shadow: 3px 3px 3px rgb(235, 235, 235);
        }
      }
    }

    .info-right {
      position: relative;
      display: inline-block;
      margin-left: 10rem;
      width: 55%;

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

      .info-getcontent {
        position: relative;
        margin-top: 5rem;
        background: white;
        box-shadow: 0 0 3px 3px rgb(235, 235, 235);
        transition: 0.5s;

        .info-getcontent-head {
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
        .info-getcontent-head:hover {
          color: rgb(0, 204, 255);
        }

        .info-getcontent-content {
          text-align: left;
          font-size: 1.5rem;
          text-indent: 5rem;
          padding: 0 0 3rem 0;
        }

        .info-getcontent-reward {
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

      .info-getcontent:hover {
        box-shadow: 0 0 3px 3px #c2e9fb;
      }

      .info-right-list {
        margin-top: 5rem;
        text-align: left;

        li {
          list-style: none;
          padding: 2rem;
          background: white;
          margin: 2rem 0;
          box-shadow: 0 0 1px 3px rgb(235, 235, 235);
          cursor: pointer;
          transition: 0.5s;

          .info-right-head {
            font-size: 2rem;
            line-height: 5rem;
            transition: 0.5s;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .info-right-head:hover {
            color: rgb(0, 204, 255);
          }

          .info-right-icon {
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
        }

        li:hover {
          box-shadow: 0 0 3px 3px #c2e9fb;
        }

        .info-right-content {
          padding: 1rem 0;
          font-size: 1.5rem;
          transition: 0.5s;
        }

        .info-right-content:hover {
          color: rgb(0, 204, 255);
        }
      }

      .info-right-next {
        position: relative;
        margin-top: 5rem;
        width: 100%;

        .info-right-span {
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

        .info-right-span:hover {
          color: rgb(0, 204, 255);
          border: 0.1rem solid rgb(0, 204, 255);
        }
      }

      .info-comment {
        position: relative;
        margin-top: 5rem;
        width: 100%;
        background: white;
        text-align: left;
        transition: 0.5s;
        .info-comment-head {
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
        .info-comment-content {
          text-indent: 1rem;
          font-size: 1.3rem;
          line-height: 20rem;
          color: silver;
        }
      }

      .info-comment:hover {
        box-shadow: 0 0 3px 3px #c2e9fb;
      }
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

@media screen and (min-width: 700px) and (max-width: 1440px) {
  #info {
    .info-content {
      .info-left {
        display: none;
      }

      .info-right {
        margin-top: 8rem;
        margin-left: 0;
        width: 90%;

        .info-getcontent {
          .info-getcontent-content {
            text-indent: 4rem;
          }

          .info-getcontent-reward {
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
}

@media screen and (min-width: 0) and (max-width: 700px) {
  #info {
    .info-background {
      height: 40rem;

      .info-background-head {
        font-size: 3rem;
      }
    }

    .info-content {
      width: 90%;

      .info-position {
        span {
          font-size: 1.1rem;
          padding: 0.2rem 0.7rem;
        }
      }

      .info-left {
        display: none;
      }

      .info-right {
        margin-left: 0;
        width: 100%;
        height: 130rem;
        margin-top: 6rem;

        .wrap {
          .search {
            width: 98%;
          }
        }

        .info-right-next {
          .info-right-span {
            padding: 0.5rem 0.7rem;
            font-size: 1.1rem;
            margin: 0;
          }
        }

        .info-getcontent {
          .info-getcontent-content {
            text-indent: 1.5rem;
            font-size: 1.3rem;
          }

          .info-getcontent-head {
            font-size: 1.5rem;
          }

          .info-getcontent-reward {
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
}
</style>

