<template>
    
    <div id="manage-pagemanage">

        <div class="manage-pagemanage-box">

            <table v-if="!correct">
                <tr>
                    <th>页面名称</th>
                    <th>页面标题</th>
                    <th>类别</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in storagePageList">
                    <td>
                        {{item.name}}
                    </td>
                    <td>
                        {{item.title}}
                    </td>
                    <td>
                        {{item.type}}
                    </td>
                    <td>
                        <i class="fa fa-search fa-lg" @click="getMessage(item.name,item.title,item.type)"></i>
                        <i class="fa fa-pencil fa-lg" @click="correctPage(item.name,item.title,item.id,item.type)"></i>
                        <i class="fa fa-trash fa-lg" @click="throwPage(item.id)"></i>
                    </td>
                </tr>
            </table>

            <div class="info-right-next" v-if="!correct">
                <span class="info-right-span" @click="goTop()">Top</span>
                <span class="info-right-span" @click="next('last')"><i class="fa fa-angle-double-left fa-lg"></i></span>
                <span v-for="number in total" @click="getPageList(number)" class="info-right-span">{{number}}</span>
                <span class="info-right-span" @click="next('next')"><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span class="info-right-span" @click="goTail()">Tail</span>
            </div>

            <div class="manage-pagemanage-box-correct" v-if="correct">
                <form>
                    <div>
                        <label for="name">页面名称:</label>
                        <input v-model="pageName" type="text" id="name">
                    </div>
                    <div>
                        <label for="title">页面标题:</label>
                        <input v-model="pageTitle" type="text" id="title">
                    </div>
                    <div>
                        <label for="type">页面类型:</label>
                        <select name="type" id="type"  @change="getPageType()">
                            <option value="post_all">文章目录列表</option>
                            <option value="post_category">指定目录的文章列表页</option>
                            <option value="post_author">指定作者的文章列表页</option>
                            <option value="post">文章页面</option>
                            <option value="img_all">相册列表</option>
                            <option value="img_category">指定目录的图片列表页面</option>
                            <option value="video_all">视频目录列表</option>
                            <option value="video_category">视频列表页面</option>
                            <option value="video">视频播放页面</option>
                            <option value="file_all">文件目录页面</option>
                            <option value="file_category">文件列表页面</option>
                            <option value="file">文件下载页面</option>
                        </select>
                    </div>
                </form>
                <div class="manage-site-button">
                    <span @click="sendMessage()"><i class="fa fa-check fa-lg"></i>提交</span><span @click="reset()"><i class="fa fa-refresh fa-lg"></i>重置</span>
                    <span @click="hideWarning()"><i class="fa fa-location-arrow fa-lg"></i>返回</span>
                </div>
            </div> 

        </div>

        <div class="manage-pagemanage-message" v-if="showMessage">
            <div class="manage-pagemanage-message-box">
                <div class="content">
                    页面名称: {{pageName}}
                </div>
                <div class="content">
                    页面标题: {{pageTitle}}
                </div>
                <div class="content">
                    页面类型: {{pageType}}
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
                    存放页面信息
                    name:页面名称
                    title:页面标题
                    type:页面类别
                    id:页面id
                */
                storagePageList:[],
                //存放单个标题的名称
                pageName:"",
                //存放单个页面的标题
                pageTitle:"",
                //存放单个页面的类型
                pageType:"post_all",
                //存放单个页面的id
                pageId:"",
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
                //存放文件总页数
                pageNumber:"",
                //存放文件页码
                total:[],
                //文件每页的条数
                eachPageNumber:10,
                //存放当前页数
                nowPageNumber:1,

            }

        },

        methods: {

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

            //获取公告总页数
            getTotal() {

                var _this = this

                this.total.length = 0

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/page/count",

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

            //获取页面类别
            getPageType() {

                var mySelect = document.querySelector('select')

                var index = mySelect.selectedIndex

                this.pageType = mySelect.options[index].value

                console.log(this.pageType)

            },

            //发送页面修改数据
            sendMessage() {
                
                var _this = this 

                var data = {

                    "session_id":this.$store.state.userId,

                    "id": this.pageId,

                    "name":this.pageName,

                    "title":this.pageTitle,

                    "type":this.pageType,

                    "post":2

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/page/update",

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

            //丢弃页面
            throwPage(id) {

                var _this = this

                var data = {

                    "session_id":this.$store.state.userId,

                    "id":id

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/page/delete",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

                        _this.getPageList(_this.nowPageNumber)

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

                this.getPageList()

            },

            //重置表单
            reset() {

                document.querySelector('form').reset()

            },

            //修改文件信息
            correctPage(name,title,id,type) {

                this.pageName = name

                this.pageTitle = title

                this.pageId = id

                this.pageType = type

                this.correct = true

                this.$store.commit('setManageTitle',"页面编辑")

            },

            //隐藏描述框
            hideMessage() {

                this.showMessage = false

            },

            //点击放大镜弹出描述框
            getMessage(name,title,type) {

                this.pageName = name

                this.pageTitle = title

                this.pageType = type

                this.showMessage = true

            },

            //初始化页面列表
            initialPageList(list) {

                var _this = this

                this.storagePageList.length = 0

                list.forEach(function(value) {

                    _this.storagePageList.push(value)

                })

            },

            //获取页面列表
            getPageList(id) {

                var _this = this

                this.nowPageNumber = id

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/page/list?page="+id,

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialPageList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

        },

        mounted() {

            this.getPageList(this.nowPageNumber)

            this.getTotal()

        }

    }

</script>

<style lang="scss">

    #manage-pagemanage {

        .manage-pagemanage-box {
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

            .manage-pagemanage-box-correct {
                position: relative;
                background: white;
                box-shadow: 0 0 1px 1px rgb(240, 240, 240);
                height:30rem;
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

                            select {
                                width:81%;
                                height:2rem;
                                text-indent: .5rem;
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
        
        .manage-pagemanage-message {

            position: fixed;
            z-index:5;
            top:0;
            right:0;
            left:0;
            bottom:0;
            background:rgba(0,0,0,.5);

            .manage-pagemanage-message-box {
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
                    margin:1rem 0 0 3rem;
                    line-height: 2rem;
                    font-size: 1.2rem;
                    font-weight: bold;
                    color:#5088b9;
                    white-space: nowrap;
                }

                .button {
                    position: absolute;
                    width:100%;
                    bottom:4rem;
                    right:1rem;
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
