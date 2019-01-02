<template>
    
    <div id="manage-gallerymanage">

        <div class="manage-gallerymanage-box">
            <table v-if="!correct">
                <tr>
                    <th>相册名称</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in storageGalleryList">
                    <td>
                        {{item.name}}
                    </td>
                    <td>
                        <i class="fa fa-search fa-lg" @click="getMessage(item.name,item.description)"></i>
                        <i class="fa fa-pencil fa-lg" @click="correctGallery(item.name,item.description,item.id)"></i>
                        <i class="fa fa-trash fa-lg" @click="throwGallery(item.id)"></i>
                    </td>
                </tr>
            </table>

            <div class="info-right-next" v-if="!correct">
                <span class="info-right-span" @click="goTop()">Top</span>
                <span class="info-right-span" @click="next('last')"><i class="fa fa-angle-double-left fa-lg"></i></span>
                <span v-for="number in total" @click="getGallery(number)" class="info-right-span">{{number}}</span>
                <span class="info-right-span" @click="next('next')"><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span class="info-right-span" @click="goTail()">Tail</span>
            </div>

            <div class="manage-gallerymanage-box-correct" v-if="correct">
                <form>
                    <div>
                        <label for="name">相册名称:</label>
                        <input v-model="galleryName" type="text" id="name">
                    </div>
                    <div>
                        <label for="description">相册描述:</label>
                        <textarea v-model="galleryDescription" type="text" id="description"></textarea><br/>
                    </div>
                    <div>
                        <label for="file">缩略图: </label>
                        <select name="thumb" id="file" @change="getId('file')">
                            <option v-for= "item in storageThumbList" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                </form>
                <div class="manage-site-button">
                    <span @click="sendMessage()"><i class="fa fa-check fa-lg"></i>提交</span>
                    <span @click="reset()"><i class="fa fa-refresh fa-lg"></i>重置</span>
                    <span @click="hideWarning()"><i class="fa fa-location-arrow fa-lg"></i>返回</span>
                </div>
            </div>  
        </div>


        <div class="manage-gallerymanage-message" v-if="showMessage">
            <div class="manage-gallerymanage-message-box">
                <div class="content">
                    相册名称: {{galleryName}}
                </div>
                <div class="content">
                    相册描述: {{galleryDescription}}
                </div>
                <div class="button" @click="hideMessage()">
                    <i class="fa fa-close fa-lg"></i>
                </div>
            </div>
        </div>

        <div class="manager" v-if="showWarning">
            <div class="manager-box">
                <div class="manager-color">
                    <img src="../../../images/水果.png">
                </div>
                <div class="manager-head">
                    <span>{{state}}</span>
                    <div>
                        {{warningMessage}}
                    </div>
                </div>
                <div class="manager-cancel" @click="hideWarning()">
                    <i class="fa fa-location-arrow fa-2x"></i>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {

        data() {

            return {

                /* 
                    存放缩略图信息
                    name:缩略图名称
                    description:缩略图描述
                    id:缩略图的id
                */
                storageThumbList:[],
                /*
                    存放当页相册信息
                    id:相册分类id
                    description:相册描述
                    name:相册名称
                */
                storageGalleryList:[],
                //存放相册名称
                galleryName:"",
                //相册描述
                galleryDescription:"",
                //存放相册id
                galleryId:"",
                //存放缩略图id
                thumbId:"",
                //是否弹出描述框
                showMessage:false,
                //是否弹出提示框
                showWarning:false,
                //是否编辑缩略图
                correct:false,
                //警告框内容
                warningMessage:"",
                //提交状态
                state:"",
                //存放图片总页数
                pageNumber:"",
                //存放图片页码
                total:[],
                //图片每页的条数
                eachPageNumber:10,
                //存放当前页数
                nowPageNumber:1,

            }

        },

        methods: {

            //丢弃文件
            throwGallery(id) {

                var _this = this

                var data = {

                    "session_id":this.$store.state.userId,

                    "id":id

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/image/delete-category",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

                        _this.getGallery(_this.nowPageNumber)

                        _this.getTotal()

                    },error() {

                        console.log("删除失败")

                    }

                })

            },

            //获取id
            getId(id) {

                switch(id) {

                    case "type":
                        var mySelect = document.querySelector("#"+id)
                        var index = mySelect.selectedIndex
                        this.categoryId = mySelect.options[index].value
                        break
                    case "file":
                        var mySelect = document.querySelector("#"+id)
                        var index = mySelect.selectedIndex
                        this.thumbId = mySelect.options[index].value
                        break
                    case "style":
                        var mySelect = document.querySelector("#"+id)
                        var index = mySelect.selectedIndex
                        this.foldStyle = mySelect.options[index].value
                        break

                }

            },

            //初始化缩略图数组
            initialThumbList(list) {

                var _this = this

                this.storageThumbList.length = 0

                list.forEach(function(value) {

                    _this.storageThumbList.push(value)

                })

                this.thumbId = this.storageThumbList[0].id

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

            //修改缩略图信息
            correctGallery(name,description,id) {

                this.galleryName = name

                this.galleryDescription = description

                this.galleryId = id

                this.correct = true

            },

            //跳转到第一页
            goTop() {

                this.getGallery(1)

            },

            //跳转到最后一页
            goTail() {

                this.getGallery(this.pageNumber)

            },

            //跳转页面
            next(command) {

                if(command == "next") {

                    if(this.nowPageNumber == this.pageNumber) {

                        return

                    }

                    this.getGallery(++this.nowPageNumber)

                }else {

                    if(this.nowPageNumber == 1) {

                        return

                    }

                    this.getGallery(--this.nowPageNumber)

                }

            },

            //获取公告总页数
            getTotal() {

                var _this = this

                this.total.length = 0

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/image/category/count",

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

            //初始化相册列表
            initialGalleryList(list) {

                var _this = this

                this.storageGalleryList.length = 0

                list.forEach(function(value) {

                    _this.storageGalleryList.push(value)

                })

            },

            //获取相册列表
            getGallery(id) {

                var _this = this

                this.nowPageNumber = id

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

            //发送修改后的缩略图信息
            sendMessage() {

                var _this = this

                var data = {

                    "session_id":this.$store.state.userId,

                    "id":this.galleryId,

                    "name":this.galleryName,

                    "description":this.galleryDescription,

                    "thumb":this.thumbId

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/image/category/update",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

                        console.log(data)

                        if(data.status == "error") {

                            _this.warningContent("error")

                        }else {

                            _this.warningContent("success")

                        }

                        _this.showWarning = true

                    },error() {

                        _this.warningContent("error")

                        _this.showWarning = true

                    },

                })


            },

            //重置表单
            reset() {

                document.querySelector('form').reset()

            },

            //隐藏描述框
            hideMessage() {

                this.showMessage = false

            },

            //点击放大镜弹出描述框
            getMessage(name,description) {

                this.galleryName = name

                this.galleryDescription = description

                this.showMessage = true

            },

            //修改提示框内容
            warningContent(content) {

                if(content == "error") {

                    this.state = "Error!"

                    this.warningMessage = "A form information error."

                }else {

                    this.state = "Success!"

                    this.warningMessage = "Change Success!"

                }

            },

            //隐藏提示框
            hideWarning() {

                this.showWarning = false

                this.correct = false

                this.getGallery(this.nowPageNumber)

            },

        },

        mounted() {
            
            this.getGallery(this.nowPageNumber)

            this.getTotal()

            this.getThumbList()

        },

    }

</script>

<style lang="scss">

    #manage-gallerymanage {

        .manage-gallerymanage-box {
            position: relative;
            text-align: center;
            overflow: hidden;
            background:white;
            box-shadow: 0 0 1px 1px rgb(240, 240, 240);

            table {
                position: relative;
                margin: auto;
                margin-top:5rem;
                width:90%;
                border-collapse: collapse;

                tr {
                    th {
                        background:#f8f8f8;
                        padding:1rem 0;
                        width:10rem;
                        font-size: 1.5rem;
                        color:#5088b9;
                    }
                    td {
                        font-size: 1.1rem;
                        padding:1rem 0;
                        border: .1rem rgb(240, 240, 240) solid;
                        height:2.5rem;
                        cursor: pointer;
                        transition: .3s;

                        i {
                            margin:0 .3rem;
                            transition: .3s;
                            width:1.5rem;
                        }

                        i:first-of-type {
                            color:#629fd0;
                        }
                        i:nth-of-type(2) {
                            color:#7cb462;
                        }
                        i:last-of-type {
                            color:#e27b6a;
                        }

                        i:hover {
                            font-size: 1.8rem;
                        }
                    }

                    td:hover {
                         background:#f8f8f8;
                         color:#5088b9;
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

            .manage-gallerymanage-box-correct {
                position: relative;
                background: white;
                box-shadow: 0 0 1px 1px rgb(240, 240, 240);
                height:50rem;
                    form {
                        position: absolute;
                        width:50rem;
                        display: inline-block;
                        left:0;
                        right:0;
                        margin: auto;
                        overflow: hidden;
                        text-align: left;
                        div {
                            position: relative;
                            margin:3rem;

                            label {
                                vertical-align: top;
                                font-size: 1.2rem;
                            }

                            input {
                                width:80%;
                                height:2rem;
                                text-indent: .5rem;
                            }

                            textarea {
                                width:81%;
                                height:20rem;
                            }

                            select {
                                width:81%;
                                height:2rem;
                                text-indent: .5rem;
                            }

                            #file {
                                margin-left:1.1rem;
                            }

                        }
                }
                .manage-site-button {
                            position: absolute;
                            width:100%;
                            line-height:5rem;
                            text-align: center;
                            bottom:2rem;

                        span {
                            padding:1rem 2rem;
                            margin:0 2rem;
                            font-size: 1.5rem;
                            color: white;
                            transition: .3s;
                            cursor: pointer;

                            i {
                                margin-right:.5rem;
                            }
                        }

                        span:first-of-type {
                            background:#6fb3df;
                            border:.2rem #6fb3df solid;
                        }

                        span:nth-of-type(2) {
                            background:#aab9c2;
                            border:.2rem #aab9c2 solid;
                        }

                        span:last-of-type {
                            border:.2rem #f1c21e solid;
                            background:#f1c21e;
                        }

                        span:first-of-type:hover {
                            background:white;
                            color:#6fb3df;
                        }

                        span:nth-of-type(2):hover {
                            background:white;
                            color:#aab9c2;
                        }

                        span:last-of-type:hover {
                            color:#f1c21e;
                            background:white;
                        }
                    }
                }
        }

        .manage-gallerymanage-message {

            position: fixed;
            z-index:5;
            top:0;
            right:0;
            left:0;
            bottom:0;
            background:rgba(0,0,0,.5);

            .manage-gallerymanage-message-box {
                position: absolute;
                top:0;
                right:0;
                left:0;
                bottom:0;
                margin:auto;
                width:30rem;
                height:10rem;
                border-radius: 10rem;
                background:white;
                overflow: hidden;
                animation: show 1.5s both;

                .content {
                    position: relative;
                    margin:2.2rem 0 0 5rem;
                    line-height: 1.5rem;
                    font-size: 1.2rem;
                    font-weight: bold;
                    color:#5088b9;
                    white-space: nowrap;
                }

                .button {
                    position: absolute;
                    width:100%;
                    bottom:4rem;
                    right:1.5rem;
                    text-align: right;
                    i {
                        font-size:2rem;
                        color:#5088b9;
                        cursor: pointer;
                        transition: .3s;
                    }

                    i:hover {
                         color:#2666af;
                    }
                }
            }

            @keyframes show {
                0% {
                    width:10rem;
                    height:10rem;
                }100% {
                    width:30rem;
                    height:10rem;
                }
            }

        }

    }

</style>
