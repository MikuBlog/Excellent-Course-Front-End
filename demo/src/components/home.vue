<template>
  <div id="myapp">
    <div class="nav-app">
      <div class="nav-image" @click="handleClick()">
        <img src="/src/images/三杠.png" alt="菜单">
      </div>
        <ul class="nav-list" v-show="showList">
          <li @click="handleClick('official')">进入官网</li>
          <li @click="handleClick('#info')">公告</li>
          <li @click="handleClick('#page')">文章</li>
          <li @click="handleClick('#fold')">文件</li>
          <li @click="handleClick('#video')">视频</li>
        </ul>
    </div>

  <div class="firstPage" @click="handleClick('',false)">

    <div class="bg" id="bg">
      <div class="sign" @click="goOfficial()">
        <div class="sign-image">
          <img src="../images/加入我们.png">
        </div>
      </div>
      <div class="bg-head-english">Fundamentals of electronic technology</div>
      <div class="bg-head css14dce5a0ca1c7fd">电子技术基础</div>
      <a href="#info" class="down">
      <div class="arrow-down">
          <img src="../images/箭头.png" class="arrow-first">
      </div>
      </a>
    </div>

    <div class="info" id="info">
      <div class="info-box box">
        <div class="info-head">公告牌</div>
        <div class="info-show-image">
          <img src="../images/公告.png">
          <div class="info-head-2">公告牌</div>
        </div>
        <div class="info-show-message">
          公告及时雨等你来参观！
        </div>
      </div>
      <a href="#bg" class="up">
        <div class="arrow-up">
          <img src="../images/书签.png" class = "arrow-second" alt="上一页">
        </div>
      </a>
      <a href="#pic" class="down">
        <div class="arrow-down">
          <img src="../images/箭头.png" class = "arrow-first">
        </div>
      </a>
    </div>

    <div class="pic" id="pic">
      <div class="pic-boxs box">
        <div class="pic-wave">
          <img src="../images/海浪.png">
          <div class="pic-head">图库</div>
        </div>
        <ul class="pic-list">
          <li v-for="(pics,index) in picList" v-if="index<10">
            <img :src="pics">
          </li>
        </ul>
        <div class="pic-content">海量图库等你来拿！</div>
      </div>
      <a href="#info" class="up">
      <div class="arrow-up">
        <img src="../images/书签.png" class = "arrow-second" alt="上一页">
      </div>
      </a>
      <a href="#page" class="down">
      <div class="arrow-down">
         <img src="../images/箭头.png" class = "arrow-first">
      </div>
      </a>
    </div>

    <div class="page" id="page">
      <div class="page-box box">
        <div class="decorate">
          <img src="../images/小黑板.png">
        </div>
        <div class="page-head">
          文章
        </div>
        <div class="page-pic">
          <img src="../images/图书.png">
        </div>
        <div class="page-list">
          大量精选文章等你来读！
        </div>
      </div>
      <a href="#pic" class="up">
      <div class="arrow-up">
        <img src="../images/书签.png" class = "arrow-second" alt="上一页">
      </div>
      </a>
      <a href="#fold" class="down">
      <div class="arrow-down">
        <img src="../images/箭头.png" class = "arrow-first">
      </div>
      </a>
    </div>

    <div class="fold" id="fold">
      <div class="fold-box box">
        <div class="fold-head">
          文件夹
        </div>
        <div class="fold-image">
          <img src="../images/文件夹.png">
        </div>
        <div class="fold-list">
          海量学习资源等你搜罗！
        </div>
      </div>
      <a href="#page" class="up">
      <div class="arrow-up">
        <img src="../images/书签.png" class = "arrow-second" alt="上一页">
      </div>
      </a>
      <a href="#video" class="down">
      <div class="arrow-down">
        <img src="../images/箭头.png" class = "arrow-first">
      </div>
      </a>
    </div>
    
    <div class="video" id="video">
      <div class="video-box box">
        <div class="video-head">
          视频
        </div>
        <div class="video-image">
          <img src="../images/视频.png">
        </div>
        <div class="video-list">
          视频资源火爆来袭！
        </div>
      </div>
      <a href="#fold" class="up">
      <div class="arrow-up">
        <img src="../images/书签.png" class = "arrow-second" alt="上一页">
      </div>
      </a>
      <a href="#welcome" class="down">
      <div class="arrow-down">
        <img src="../images/箭头.png" class = "arrow-first">
      </div>
      </a>
    </div>

    <div class="welcome" id="welcome">
      <div class="welcome-head" @click="goOfficial()">
          Welcome to your coming
      </div>
      <a href="#bg" class="top">
        <div class="top">
          <img src="../images/返回顶部.png">
        </div>
      </a>
    </div>

  </div>

  </div>
</template>

<script>

export default {

  data() {

    return {

      infoMessage:[],
      picList:[],
      pageList:[],
      foldList:[],
      videoList:[],
      showList:false

    }

  },

  methods: {

    //处理跳转到下一页的UI（淡入淡出）
    show(preview,later) {

      $(preview+" .box").css({"opacity":0})

      setTimeout(function() {

        $(later+" .box").css({"opacity":1})

      },400)


    },

    //隐藏
    hide() {

      $('.box').css({"opacity":0})

    },

    //滚动到上或下一页
    scrollTo(name) {

      var _this = this

      $(name).click(function () {

            $('.firstPage').animate({
                scrollTop: document.querySelector($.attr(this, 'href')).offsetTop
            }, 300);

             _this.show(name.split(' ')[0],$.attr(this, 'href'))

            return false;
      });

    },
    
    //第一个箭头的作用
    firstArrow(number,name) {

      var arrow = document.querySelectorAll('.arrow-first')[number]

      var arrowBox = document.querySelectorAll('.arrow-down')[number]

      var _this = this

      arrow.addEventListener('mouseover',function() {

        arrowBox.style.animationPlayState = "paused"

      })

      arrow.addEventListener('mouseleave',function() {

        arrowBox.style.animationPlayState = "running"

      })

       _this.$options.methods.scrollTo(name)

    },

    //第二个箭头的作用
    secondArrow(number,name) {

      var arrow = document.querySelectorAll('.arrow-second')[number]

      var arrowBox = document.querySelectorAll('.arrow-up')[number]

      var _this = this

      arrow.addEventListener('mouseover',function() {

        arrowBox.style.animationPlayState = "paused"

      })

      arrow.addEventListener('mouseleave',function() {

        arrowBox.style.animationPlayState = "running"

      })

      _this.$options.methods.scrollTo(name)

    },

    //处理点击三杠时的弹出(其实可以用CSS处理)
    handleClick(name,justify) {

      if(justify == false) {

        this.showList = false;

        return

      }

      if(this.showList == false) {

        this.showList = true;

      }else {

        this.showList = false;

      }

      if(name) {

        if(name=="official") {

          this.$router.push({path:"/first/official"})

          this.hide()

          return

        }

        this.hide()

        location.href = name

        setTimeout(function() {

          $(name+" .box").css({"opacity":1})

        },400)

      }

    },

    //跳转到官网
    goOfficial() {
      this.$router.push({path:'/official'})
    }

  },

  mounted() {

    var _this = this

    this.firstArrow(0,"#bg .down")

    this.firstArrow(1,"#info .down")

    this.firstArrow(2,"#pic .down")

    this.firstArrow(3,"#page .down")

    this.firstArrow(4,"#fold .down")

    this.firstArrow(5,"#video .down")

    this.secondArrow(0,"#info .up")

    this.secondArrow(1,"#pic .up")

    this.secondArrow(2,"#page .up")

    this.secondArrow(3,"#fold .up")

    this.secondArrow(4,"#video .up")

    this.scrollTo("#welcome .top")
        
          //请求图片
      $.ajax({

        url:"http://qwebfx-test.deali.cn/api/image/image-list",

        type:"GET",

        success(data) {

          var getList = data.list

          getList.forEach(function(value,index) {

            if(index == 0 )return

            _this.picList.push("http://qwebfx-test.deali.cn"+value.upload)

          })

        },
        error() {

          console.log("请求失败")

        }

      })

  },
}

</script>

<style lang="scss">

.arrow-down {
        position: absolute;
        width:100%;
        text-align: center;
        top:85%;
        animation: movedown .5s infinite;

        img {
          height:8rem;
          width:5rem;
        }

        @keyframes movedown {
          0% {
            top:85%;
          }50% {
            top:88%;
          }100% {
            top:85%;
          }
        }

}

.arrow-up {
        position: absolute;
        width:100%;
        text-align: center;
        top:-4%;
        animation: moveup 4s infinite linear;
        transition: .5s;

        img {
          height:8rem;
          width:5rem;
        }

        @keyframes moveup {
          0%{
            top:-4%
          }50%{
            top:-1%;
          }100%{
            top:-4%;
          }
        }

}


.decorate {
  position: absolute;
  top:0;
  left:0;
  width:15rem;
  height:10rem;
  transform: rotate(-20deg);

  img {
    height:100%;
    width:100%;
  }
}

.info-head,.pic-head,.page-head,.fold-head,.video-head {
  transition:.5s;
}

.sign {
  position: absolute;
  z-index: 1;
  width:15rem;
  height:12rem;

  .sign-image {
    position: absolute;
    top:0;
    cursor: pointer;
    width:100%;
    height:100%;

    img {
      width:100%;
      height:100%;
      transition: .5s;
    }

    img:hover {
      width:110%;
      height:110%;
    }
  }

}

.nav-app {
  position: absolute;
  right:1rem;
  top:1rem;
  z-index:1;
  width:4rem;
  height:4rem;
  display: none;

  .nav-image {

    width:100%;
    height:100%;

    img {
      width:100%;
      height:100%;
    }
  }

  .nav-list {
      position: absolute;
      right:0;
      width:12rem;
      font-size:1.5rem;
      text-align: center;
      font-weight: bold;

      li{
        background-color:white;
        list-style: none;
        padding:1rem 3rem;
        white-space: nowrap;
        cursor: pointer;
      }

      li:hover {
        color:white;
        background:red;
      }
    }
}

#myapp {
  height:100%;
  overflow: hidden;

  .firstPage {
    height:100%;
    overflow: hidden;
  }
  .bg {
    position: relative;
    height:100%;
    background:url(../images/背景1.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;

      .bg-head-english {
        position: relative;
        top:40%;
        margin-top:-3rem;
        height:6rem;
        color:rgb(255, 255, 255);
        font-size: 5rem;
        text-align: center;
        text-shadow: 2px 2px 2px silver;
      }

      .bg-head{
        position: relative;
        top:47%;
        margin-top:-3rem;
        height:6rem;
        color:rgb(255, 255, 255);
        font-size: 5rem;
        letter-spacing:1.3rem;
        text-align: center;
        text-shadow: 2px 2px 2px silver;
      }

    }

  
  
  
  .info {
      position: relative;
      height:100%;
      width:100%;
      background:url(../images/背景2.jpg); 
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      overflow: hidden;

      .info-box {
        position: relative;
        left:20%;
        margin-left:-10%;
        top:10%;
        marign-top:-5%;
        width:80%;
        height:80%;
        background:rgba(255,255,255,.8);
        overflow: hidden;
        opacity: 0;
        transition:1s;

        .info-head {
            position: relative;
            top:1rem;
            font-size: 3rem;
            font-weight: bolder;
            text-align: center;
            cursor: pointer;
            transition: .5s;
            opacity: 0;
          }

        .info-head:hover {
          color:rgb(122, 255, 255);
        }

        .info-show-image {
          position: absolute;
          bottom: 0;
          left:13rem;
          width:30rem;
          height:40rem;

          img {
            width:100%;
            height:100%;
          }

          .info-head-2 {
            position: absolute;
            top:13rem;
            left:10rem;
            font-size: 3rem;
            font-weight: bolder;
            cursor: pointer;
          }

          .info-head-2:hover {
            color:rgb(122, 255, 255);
          }
        }

        .info-show-message {
            position: absolute;
            font-size: 3rem;
            width:50%;
            right:-5rem;
            top:20rem;
            white-space: nowrap;
        }
      }
  }

  .pic {
      position: relative;
      height:100%;
      width:100%;
      background:url(../images/背景3.jpg); 
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      overflow: hidden;

      .pic-boxs {
        position: relative;
        left:20%;
        margin-left:-10%;
        top:10%;
        marign-top:-5%;
        width:80%;
        height:80%;
        background:rgba(255,255,255,.8);
        overflow: hidden;
        opacity: 0;
        transition:1s;

        .pic-wave {
          position: relative;
          margin-top:3rem;
          width:100%;
          height:20%;
          text-align: center;
          overflow: hidden;

          img {
            width:25rem;
            height:10rem;
          }

          .pic-head {
            position: relative;
            top:-10rem;
            font-size: 4rem;
            font-weight: bolder;
            cursor: pointer;
          }

          .pic-head:hover {
             color:rgb(122, 255, 255);
          }
        }

        .pic-list {
            position: relative;
            justify-content: space-around;
            margin-top:5rem;
            text-align: center;
            width:100%;
            
            li {
              display: inline-block;
              width:15rem;
              height:15rem;
              margin:1rem;
              list-style: none;
              img{
                width:100%;
                height:100%;
              }
            }
        }

        .pic-content {
          margin-top:8rem;
          font-size: 2.3rem;
          text-align: center;
          display: none;
        }
      }
  }

  .page {
      position: relative;
      height:100%;
      width:100%;
      background:url(../images/背景4.jpg); 
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      overflow: hidden;

      .page-box {
        position: relative;
        left:20%;
        margin-left:-10%;
        top:10%;
        marign-top:-5%;
        width:80%;
        height:80%;
        background:rgba(255,255,255,.5);
        overflow: hidden;
        opacity: 0;
        transition:1s;

        .page-head {
          position: relative;
          margin-top:2rem;
          font-size: 5rem;
          font-weight: bolder;
          text-align: center;
          cursor: pointer;
        }

        .page-head:hover {
           color:rgb(122, 255, 255);
        }

        .page-pic {
          position: absolute;
          right: 0;
          top:7rem;
          width:40rem;
          height:40rem;

          img {
            height:100%;
            width:100%;
          }
        }

        .page-list {
          position: absolute;
          top:20rem;
          left:9rem;
          font-size: 3rem;
          line-height: 3rem;
          width:50%;
          height:50%;
          white-space: nowrap;
        }
      }
  }

  .fold {
      position: relative;
      height:100%;
      width:100%;
      background:url(../images/背景5.jpg); 
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      overflow: hidden;

      .fold-box {
        position: relative;
        left:20%;
        margin-left:-10%;
        top:10%;
        marign-top:-5%;
        width:80%;
        height:80%;
        background:rgba(255,255,255,.5);
        overflow: hidden;
        opacity: 0;
        transition:1s;

        .fold-head {
          margin-top:2rem;
          font-size: 4rem;
          font-weight: bolder;
          text-align: center;
          cursor: pointer;
        }

        .fold-head:hover {
           color:rgb(122, 255, 255);
        }

        .fold-image {
          position: absolute;
          top:10rem;
          left:5rem;
          width:30rem;
          height:30rem;
          
          img {
            height:100%;
            width:100%;
          }
        }

        .fold-list {
          position: absolute;
          right:0;
          top:20rem;
          width:50%;
          height:50%;
          font-size: 3rem;
          line-height: 3rem;
          white-space: nowrap;
        }
      }
  }

  .video {
      position: relative;
      height:100%;
      width:100%;
      background:url(../images/背景6.jpg); 
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      overflow: hidden;

      .video-box {
        position: relative;
        left:20%;
        margin-left:-10%;
        top:10%;
        marign-top:-5%;
        width:80%;
        height:80%;
        background:rgba(255,255,255,.5);
        overflow: hidden;
        opacity: 0;
        transition:1s;

        .video-head {
          margin-top:2rem;
          font-size: 4rem;
          font-weight: bolder;
          text-align: center;
          cursor: pointer;
        }

        .video-head:hover {
           color:rgb(122, 255, 255);
        }

        .video-image {
          position: absolute;
          top:10rem;
          right:5rem;
          width:30rem;
          height:30rem;
          
          img {
            height:100%;
            width:100%;
          }
        }

        .video-list {
          position: absolute;
          left:10rem;
          top:20rem;
          width:50%;
          height:50%;
          font-size: 3rem;
          line-height: 3rem;
          white-space: nowrap;
        }
      }
  }

  .welcome {
      position: relative;
      height:100%;
      width:100%;
      background:url(../images/背景7.jpg); 
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      overflow: hidden;

    .welcome-head {
      position: relative;
      line-height: 5rem;
      top:50%;
      margin-top:-2.5rem;
      text-align: center;
      font-weight: bold;
      font-size: 4rem;
      font-style: italic;
      color:white;
      text-shadow: 2px 2px 2px silver;
      transition: .5s;
      cursor: pointer;
    }

    .welcome-head:hover {
      text-shadow: 4px 4px 4px silver;
    }

    .welcome-head:active {
      color:rgb(255, 255, 92);
    }

    .top {
        position: absolute;
        width:10rem;
        height:10rem;
        left:0;
        bottom:0;
        animation: movetop 3s linear infinite;

        img {
          width:100%;
          height:100%;
        }

        @keyframes movetop {
          0%{
            bottom:0;
          }50% {
            bottom:1rem;
          }100% {
            bottom:0;
          }
        }
    }
  }
}

@media screen and (min-width:0) and (max-width:1224px) {

    html,
    body {
        font-size:10px;
    }

    .nav-app {
        width:3rem;
        height:3rem;
        display: block;
    }

    #myapp .bg {

      .bg-head-english {
        font-size:3rem;
      }

      .bg-head {
        font-size: 3rem;
        margin-top:-2rem;
      }
    }

    #myapp .info .info-box .info-show-image {
        bottom:0;
        left:0;
        right:0;
        width:16rem;
        height:20rem;
        margin:auto;
    }

    #myapp .info .info-box .info-show-image .info-head-2 {

      font-size: 2rem;
      top:6rem;
      left:5rem;

    }

    #myapp .info .info-box .info-show-message {
        top:10rem;
        width:100%;
        text-align: center;
        font-size: 2rem;
        right:0;
        left:0;
        margin:auto;
    }

    #myapp .info .info-box .info-head {
        opacity: 1;
    }

    .info-show-list {
        font-size:3rem;
    }

    #myapp .pic .pic-box .pic-content {
      display: block;
    }

    #myapp .pic .pic-box .pic-wave .pic-head {
      font-size:3rem; 
    }

    #myapp .page .page-box .page-list {
      width:100%;
      text-align: center;
        top:0;
        right:0;
        left:0;
        bottom:0;
        margin:auto;
        margin-top:20rem;
        font-size:2rem;
    }

    #myapp .page .page-box .page-head {
      font-size: 3rem;
    }

    #myapp .page .page-box .page-pic {
      left:0;
      right:0;
      top:30rem;
      margin: auto;
      width:20rem;
      height:20rem;
    }

    #myapp .fold .fold-box .fold-head {
      font-size: 3rem;
    }

    #myapp .fold .fold-box .fold-list {
        width:100%;
        text-align: center;
        font-size:2rem;
        top:0;
        right:0;
        left:0;
        bottom:0;
        margin:auto;
        margin-top:15rem;
    }

    #myapp .fold .fold-box .fold-image {
        top:24rem;
        left:0;
        right:0;
        margin: auto;
        width:20rem;
        height:20rem;
    }

    #myapp .video .video-box .video-list{
      width:100%;
      text-align: center;
      font-size: 2rem;
        top:0;
        right:0;
        left:0;
        bottom:0;
        margin:auto;
        margin-top:15rem;
    }

    #myapp .video .video-box .video-image {
      top:24rem;
        bottom:0;
        left:0;
        right:0;
        margin: auto;
        width:20rem;
        height:20rem;
    }

    .nav {
        display: block;
    }

    .decorate {
        width:10rem;
        height:6rem;
    }

}

</style>
