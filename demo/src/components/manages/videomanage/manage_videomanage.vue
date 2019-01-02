<template>
    
    <div id="manage-videomanage">

        <div class="manage-videomanage-box">


            <table v-if="!correct">
                <tr>
                    <th>视频名称</th>
                    <th>视频标题</th>
                    <th>视频类别</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in storageVideoList">
                    <td>
                        {{item.name}}
                    </td>
                    <td>
                        {{item.title}}
                    </td>
                    <td>
                        {{item.category.name}}
                    </td>
                    <td>
                        <i class="fa fa-search fa-lg" @click="getMessage(item.name,item.title,item.description,item.category.name,item.date)"></i>
                        <i class="fa fa-pencil fa-lg" @click="correctVideo(item.name,item.title,item.description,item.id)"></i>
                        <i class="fa fa-trash fa-lg" @click="throwVideo(item.id)"></i>
                    </td>
                </tr>
            </table>

            <div class="info-right-next" v-if="!correct">
                <span class="info-right-span" @click="goTop()">Top</span>
                <span class="info-right-span" @click="next('last')"><i class="fa fa-angle-double-left fa-lg"></i></span>
                <span v-for="number in total" @click="getVideoList(number)" class="info-right-span">{{number}}</span>
                <span class="info-right-span" @click="next('next')"><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span class="info-right-span" @click="goTail()">Tail</span>
            </div>

            <div class="manage-videomanage-box-correct" v-if="correct">
                <form>
                    <div>
                        <label for="name">视频名称:</label>
                        <input v-model="videoName" type="text" id="name">
                    </div>
                    <div>
                        <label for="title">视频标题:</label>
                        <input v-model="videoTitle" type="text" id="title">
                    </div>
                    <div>
                        <label for="type">视频类别:</label>
                        <select name="type" id="type" @change="getId('type')">
                            <option v-for= "item in storageVideoTypeList" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="file">缩略图: </label>
                        <select name="thumb" id="file" @change="getId('file')">
                            <option v-for= "item in storageThumbList" :value="item.id">{{item.name}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="content">视频描述: </label>
                        <textarea name="content" id="content" cols="30" rows="10" v-model="videoDescription"></textarea>
                    </div>
                </form>
                <div class="manage-site-button">
                    <span @click="sendMessage()"><i class="fa fa-check fa-lg"></i>提交</span><span @click="reset()"><i class="fa fa-refresh fa-lg"></i>重置</span>
                    <span @click="hideWarning()"><i class="fa fa-location-arrow fa-lg"></i>返回</span>
                </div>
            </div> 


        </div>

        <div class="manage-videomanage-message" v-if="showMessage">
            <div class="manage-videomanage-message-box">
                <div class="content">
                    视频名称: {{videoName}}
                </div>
                <div class="content">
                    视频标题: {{videoTitle}}
                </div>
                <div class="content">
                    视频描述: {{videoDescription}}
                </div>
                <div class="content">
                    视频类别: {{videoType}}
                </div>
                <div class="content">
                    上传时间: {{time}}
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
                    存放视频分类列表
                    description:视频分类描述
                    id:视频分类id
                    name:视频分类名称
                    thumb_id:视频缩略图id
                    thumb.description:视频缩略图描述
                    thumb.name:视频缩略图名称
                */
                storageVideoTypeList:[],
                /*
                    存放当页视频列表
                    name:视频名称
                    id:视频id
                    title:视频标题
                    description:视频描述
                    category.name:视频类别
                    category.id:视频类别id
                */
                storageVideoList:[],
                //存放视频名称
                videoName:"",
                //存放视频标题
                videoTitle:"",
                //存放视频描述
                videoDescription:"",
                //存放视频类别
                videoType:"",
                //存放视频上传时间
                time:"",
                //存放视频id
                videoId:"",
                //存放文件分类id
                categoryId:"",
                //保存缩略图id
                thumbId:"",
                //存放文件总页数
                pageNumber:"",
                //存放文件页码
                total:[],
                //文件每页的条数
                eachPageNumber:10,
                //存放当前页数
                nowPageNumber:1,
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
                //视频分类数目
                videoTypePageNumber:""

            }

        },

        methods: {

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

            //初始化视频分类列表
            initialVideoTypeList(list) {

                var _this = this

                list.forEach(function(value) {

                    _this.storageVideoTypeList.push(value)

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

            //获取视频总页数
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

            //获取时间戳事件
            timestampToTime(timestamp) {

                var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                
                var Y = date.getFullYear() + '-';
                
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                
                var D = date.getDate() + ' ';
                
                var h = date.getHours() + ':';
                
                var m = date.getMinutes() + ':';
                
                var s = date.getSeconds();
                
                return Y+M+D+h+m+s;
            },

            //发送视频信息修改数据
            sendMessage() {
                
                var _this = this 

                var data = {

                    "session_id":this.$store.state.userId,

                    "id": this.videoId,

                    "name":this.videoName,

                    "category":this.categoryId,

                    "thumb":this.thumbId,

                    "title":this.videoTitle,

                    "description":this.videoDescription

                }

                console.log(data)

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/video/update",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

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

            //丢弃文件
            throwVideo(id) {

                var _this = this

                var data = {

                    "session_id":this.$store.state.userId,

                    "id":id

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/video/delete",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

                        _this.getVideoList(_this.nowPageNumber)

                        _this.getTotal()

                    },error() {

                        console.log("删除失败")

                    }

                })

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

                this.getVideoList(this.nowPageNumber)

            },

            //重置表单
            reset() {

                document.querySelector('form').reset()

            },

            //修改视频信息
            correctVideo(name,title,description,id) {

                this.videoName = name

                this.videoTitle = title

                this.videoDescription = description

                this.videoId = id

                this.categoryId = this.storageVideoTypeList[0].id

                this.thumbId = this.storageThumbList[0].id 

                this.correct = true

            },

            //隐藏描述框
            hideMessage() {

                this.showMessage = false

            },

            //点击放大镜弹出描述框
            getMessage(name,title,description,type,time) {

                this.videoName = name

                this.videoTitle = title

                this.videoDescription = description

                this.videoType = type

                this.time = this.timestampToTime(time)

                this.showMessage = true

            },

            //初始化视频列表
            initialVideoList(list) {

                var _this = this

                this.storageVideoList.length = 0

                list.forEach(function(value) {

                    _this.storageVideoList.push(value)

                })

            },

            //获取视频
            getVideoList(id) {

                var _this = this

                this.nowPageNumber = id

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/video/list?page="+id,

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialVideoList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })


            },

            //获取页数
            getAllPageNumber(url,val,fName) {

                var _this = this

                $.ajax({

                    url:url,

                    type:"GET",

                    success(data) {

                        _this[val] = Math.ceil(data.count/_this.eachPageNumber)

                        _this.getAllList(val,fName)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            //获取单选框中的所有元素
            getAllList(val,fName) {

                for(var i = 1 ; i <= this[val] ; i ++) {

                    this[fName](i)

                }

            },

        },

        mounted() {
            
            this.getVideoList(this.nowPageNumber)

            this.getTotal()

            this.getAllPageNumber("http://qwebfx-test.deali.cn/api/video/category/count","videoTypePageNumber","getVideoTypeList")

            this.getThumbList()

        },

    }

</script>

<style lang="scss">

    #manage-videomanage {

        .manage-videomanage-box {
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

            .manage-videomanage-box-correct {
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
        
        .manage-videomanage-message {

            position: fixed;
            z-index:5;
            top:0;
            right:0;
            left:0;
            bottom:0;
            background:rgba(0,0,0,.5);

            .manage-videomanage-message-box {
                position: absolute;
                top:0;
                right:0;
                left:0;
                bottom:0;
                margin:auto;
                width:40rem;
                height:13rem;
                border-radius: 10rem;
                background:white;
                overflow: hidden;
                animation: show 1.5s both;

                .content {
                    position: relative;
                    margin:1rem 0 0 5rem;
                    line-height: 1.5rem;
                    font-size: 1.2rem;
                    font-weight: bold;
                    color:#5088b9;
                    white-space: nowrap;
                }

                .button {
                    position: absolute;
                    width:100%;
                    bottom:5.5rem;
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
                    height:13rem;
                }100% {
                    width:40rem;
                    height:13rem;
                }
            }

        }

    }

</style>
