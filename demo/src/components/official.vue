<template>
    <div id="official">

        <div class="bigbox">

            <div class="background">
                <div class="background-head">Excellent course</div>
            </div>



            <div class="content">

                <div class="content-info content-box">
                    <div class="content-info-head head" @click="handleClick('/first/info')">
                        <span class="large">A</span>nnouncement
                    </div>
                    <div class="content-info-image image">
                        <img src="../images/official/公告.jpg" class="img-slide">
                    </div>
                    <div class="content-read"  @click="handleClick('/first/info')">
                        ReadMore
                    </div>
                    <div class="content-icon">
                        <i class="fa fa-tags fa-2x"></i>
                        <span>公告</span>
                    </div>
                </div>

                <div class="content-picture content-box">
                    <div class="content-picture-head head"  @click="handleClick('/first/gallery')">
                        <span class="large">G</span>allery
                    </div>
                    <div class="content-picture-image image">
                        <img src="../images/official/相册.jpg" class="img-slide">
                    </div>
                    <div class="content-read"  @click="handleClick('/first/gallery')">
                        ReadMore
                    </div>
                    <div class="content-icon">
                        <i class="fa fa-picture-o fa-2x"></i>
                        <span>图册</span>
                    </div>
                </div>

                <div class="content-page content-box">
                    <div class="content-page-head head"  @click="handleClick('/first/page')">
                        <span class="large">A</span>rticle
                    </div>
                    <div class="content-page-image image">
                        <img src="../images/official/文章.jpg" class="img-slide">
                    </div>
                    <div class="content-read"  @click="handleClick('/first/page')">
                        ReadMore
                    </div>
                    <div class="content-icon">
                        <i class="fa fa-file-text fa-2x"></i>
                        <span>文章</span>
                    </div>
                </div>

                <div class="content-fold content-box">
                    <div class="content-fold-head head"  @click="handleClick('/first/fold')">
                        <span class="large">D</span>ocument
                    </div>
                    <div class="content-fold-image image">
                        <img src="../images/official/文件.jpg" class="img-slide">
                    </div>
                    <div class="content-read"  @click="handleClick('/first/fold')">
                        ReadMore
                    </div>
                    <div class="content-icon">
                        <i class="fa fa-file fa-2x"></i>
                        <span>文件</span>
                    </div>
                </div>

                <div class="content-video content-box">
                    <div class="content-video-head head"  @click="handleClick('/offifirstcial/video')">
                        <span class="large">V</span>ideo
                    </div>
                    <div class="content-video-image image">
                        <img src="../images/official/视频.jpg" class="img-slide">
                    </div>
                    <div class="content-read"  @click="handleClick('/first/video')">
                        ReadMore
                    </div>
                    <div class="content-icon">
                        <i class="fa fa-play-circle fa-2x"></i>
                        <span>视频</span>
                    </div>
                </div>

                <div class="footer">
                    <div class="footer-content">
                        Copyright 2018 Powered By 旋仔
                    </div>
                </div>
                
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

        methods: {

            //路由跳转
            handleClick(router) {

                var regexp = new RegExp("/official/")

                if(regexp.test(router)) {

                    this.$router.push({path:router})

                    this.show = false

                    return

                }else {

                    this.show = true

                    this.$router.push({path:router})

                }


            }
        },

        mounted() {

            showPictureBox()

        }
        
    }

</script>

<style lang="scss">

.nav-hide {
    height:0;
}

.nav-show {
    height:5rem;
}

    #official {

        position: relative;
        height:100%;

        .large {
            font-size: 4rem;
            color:#ffc800;
        }

        .bigbox {
            position: relative;
            height:100%;

            .go-top {
                position: fixed;
                z-index:1;
                bottom:9rem;
                right:5rem;
                font-size: 4rem;
                transition: .3s;
                display: none;
            }
        }

        .background {
            position: relative;
            background:url(../images/official/大横幅.jpg);
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            height:80%;

            .background-head {
                position: absolute;
                width:100%;
                font-size: 5rem;
                line-height: 6rem;
                top:50%;
                margin-top:-3rem;
                text-align: center;
                color:white;
                font-weight: bold;
                font-style: italic;
                opacity: 0;
                text-shadow: 3px 3px 3px silver;
                transition: .3s;
                cursor: pointer;
                animation: showup 1s .5s both;
            }

            .background-head:hover {
                color:rgb(86, 221, 255);
            }

            @keyframes showup {
                0% {
                    opacity: 0;
                } 100% {
                    opacity: 1;
                }
            }
        }

        .content {
            position: relative;
            top:10rem;
            background:#f1f1f1;
            animation: moveup .5s both;

            .content-box {
                position: relative;
                width:80%;
                text-align: center;
                margin:auto;
                padding-bottom:12rem;
                border-bottom: 3px dotted silver;

                .head {
                    position: relative;
                    display: inline-block;
                    font-size: 3rem;
                    font-style: italic;
                    cursor: pointer;
                    margin-top:8rem;
                    margin-bottom:5rem;
                    transition: .3s;
                }
                .head:hover{
                    color:rgb(0, 204, 255);
                }

                .image {
                    img {
                        box-shadow: 0 0 5px 5px silver;
                        width:80%;
                        height:auto;
                        transition: .3s;
                        cursor: pointer;
                    }
                    img:hover {
                        box-shadow: 0 0 3px 3px rgba(0, 255, 255, 0.315);
                    }
                }
            }

            .content-icon {
                position: absolute;
                right:0;
                bottom:2rem;
                line-height: 2rem;
                padding:.5rem 1.5rem;
                border-radius: 5rem;
                cursor: pointer;
                transition: .5s;

                i {
                    position: relative;
                    top:.15rem;
                }

                span{
                    font-size: 1.5rem;
                }
            }

            .content-icon:hover {
                color:white;
                background: #7d7d7d;
            }

            .content-read {
                position: absolute;
                left:0;
                right:0;
                margin:auto;
                margin-top:5rem;
                width:10rem;
                padding:1rem .5rem;
                font-size:1.5rem;
                font-weight: bold;
                background:#7d7d7d;
                border:.2rem solid #7d7d7d;
                color:white;
                cursor: pointer;
                transition: .5s;
            }

            .content-read:hover {
                color:rgb(0, 204, 255);
                background:white;
                border:.2rem solid rgb(0, 204, 255);
            }
        }

        @keyframes moveup {
          0% {
              top:10rem;
          }  100% {
              top:0rem;
          }
        }


    }


@media screen and (min-width:767px) and (max-width:1224px) {

   #official {

       .large {
            font-size: 3.5rem;
            color:#ffe173;
        }

        .content {

            .content-box {
                width:90%;

                .head {
                    font-size: 2.5rem;
                }
            }

            .content-read {
                padding:1.2rem .2rem;
                font-size:1.2rem;
            }
        }

        .content-icon {
            bottom:0rem;
            right:-1rem;
            font-size:.9rem;

            span{
                  font-size: 1rem;
            }
        }

    }

}

@media screen and (min-width:0) and (max-width:766px) {

    #official {

       .background {
           height:75%;

           .background-head {
               font-size: 3rem; 
           }
       }

       .large {
            font-size: 3rem;
            color:#ffe173;
        }

        .content {

            .content-box {
                width:93%;

                .image {

                    img {

                        box-shadow: 0 0 3px 3px silver;
                    }

                }

                .content-icon {
                    padding:.3rem 1rem;
                    margin-bottom: .5rem;
                    i {
                        position: relative;
                        top:.15rem;
                    }
                }

                .head {
                    font-size: 2.2rem;
                    margin-top:4rem;
                    margin-bottom:2rem;
                }

                .image {
                    img {
                        width:100%;;
                    }
                }
            }

            .content-read {
                padding:.8rem 0;
                width:8rem;
                font-size:1rem;
            }

            .content-icon {
                bottom:0rem;
                right:-1rem;
                font-size:.8rem;

                span{
                    font-size: 1.1rem;
                }
            }
        }

    }

}

</style>

