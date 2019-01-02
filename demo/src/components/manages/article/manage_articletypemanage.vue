<template>
    
    <div id="manage-articletypemanage">

        <div class="manage-articletypemanage-box">
            <table v-if="!correct">
                <tr>
                    <th>文章分类名称</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in storageArticleTypeList">
                    <td>
                        {{item.name}}
                    </td>
                    <td>
                        <i class="fa fa-search fa-lg" @click="getMessage(item.name,item.description)"></i>
                        <i class="fa fa-pencil fa-lg" @click="correctArticle(item.name,item.description,item.id)"></i>
                        <i class="fa fa-trash fa-lg" @click="throwArticle(item.id)"></i>
                    </td>
                </tr>
            </table>

            <div class="info-right-next" v-if="!correct">
                <span class="info-right-span" @click="goTop()">Top</span>
                <span class="info-right-span" @click="next('last')"><i class="fa fa-angle-double-left fa-lg"></i></span>
                <span v-for="number in total" @click="getArticleTypeList(number)" class="info-right-span">{{number}}</span>
                <span class="info-right-span" @click="next('next')"><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span class="info-right-span" @click="goTail()">Tail</span>
            </div>

            <div class="manage-articletypemanage-box-correct" v-if="correct">
                <form>
                    <div>
                        <label for="name">文章分类名称:</label>
                        <input v-model="articleName" type="text" id="name">
                    </div>
                    <div>
                        <label for="content">文章分类描述: </label>
                        <textarea name="content" id="content" cols="30" rows="10" v-model="articleDescription" ></textarea>
                    </div>
                </form>
                <div class="manage-site-button">
                    <span @click="sendMessage()"><i class="fa fa-check fa-lg"></i>提交</span><span @click="reset()"><i class="fa fa-refresh fa-lg"></i>重置</span>
                    <span @click="hideWarning()"><i class="fa fa-location-arrow fa-lg"></i>返回</span>
                </div>
            </div>  
        </div>


        <div class="manage-articletypemanage-message" v-if="showMessage">
            <div class="manage-articletypemanage-message-box">
                <div class="content">
                    文章类别名称: {{articleName}}
                </div>
                <div class="content">
                    文章类别描述: {{articleDescription}}
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
                    存放文章列表
                    name:文章分类名称
                    id:文章分类id
                    description:文章分类描述
                */
                storageArticleTypeList:[],
                //存放文章名称
                articleName:"",
                //存放文章描述
                articleDescription:"",
                //存放文章id
                articleId:"",
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
                state:""

            }

        },

        methods: {

            //跳转到第一页
            goTop() {

                this.getArticleTypeList(1)

            },

            //跳转到最后一页
            goTail() {

                this.getArticleTypeList(this.pageNumber)

            },

            //跳转页面
            next(command) {

                if(command == "next") {

                    if(this.nowPageNumber == this.pageNumber) {

                        return

                    }

                    this.getArticleTypeList(++this.nowPageNumber)

                }else {

                    if(this.nowPageNumber == 1) {

                        return

                    }

                    this.getArticleTypeList(--this.nowPageNumber)

                }

            },

            //获取文件总页数
            getTotal() {

                var _this = this

                this.total.length = 0

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/post/category/count",

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

            //发送文件信息修改数据
            sendMessage() {
                
                var _this = this 

                var data = {

                    "session_id":this.$store.state.userId,

                    "id": this.articleId,

                    "name":this.articleName,

                    "description":this.articleDescription

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/post/category/update",

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

            //丢弃文章分类
            throwArticle(id) {

                var _this = this

                var data = {

                    "session_id":this.$store.state.userId,

                    "id":id

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/post/category/delete",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

                        _this.getArticleTypeList(_this.nowPageNumber)

                        console.log(_this.nowPageNumber)

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

                this.getArticleTypeList(this.nowPageNumber)

            },

            //重置表单
            reset() {

                document.querySelector('form').reset()

            },

            //修改文章分类信息
            correctArticle(name,description,id) {

                this.articleName = name

                this.articleDescription = description

                this.articleId = id

                this.correct = true

            },

            //隐藏描述框
            hideMessage() {

                this.showMessage = false

            },

            //点击放大镜弹出描述框
            getMessage(name,descrition) {

                this.articleName = name

                this.articleDescription= descrition

                this.showMessage = true

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

            }

        },

        mounted() {

            this.getArticleTypeList(this.nowPageNumber)

            this.getTotal()

        }

    }

</script>

<style lang="scss">

    #manage-articletypemanage {

        .manage-articletypemanage-box {
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

            .manage-articletypemanage-box-correct {
                position: relative;
                background: white;
                box-shadow: 0 0 1px 1px rgb(240, 240, 240);
                height:40rem;
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
        
        .manage-articletypemanage-message {

            position: fixed;
            z-index:5;
            top:0;
            right:0;
            left:0;
            bottom:0;
            background:rgba(0,0,0,.5);

            .manage-articletypemanage-message-box {
                position: absolute;
                top:0;
                right:0;
                left:0;
                bottom:0;
                margin:auto;
                width:40rem;
                height:10rem;
                border-radius: 10rem;
                background:white;
                overflow: hidden;
                animation: show 1.5s both;

                .content {
                    position: relative;
                    margin:2.4rem 0 0 5rem;
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
                    width:40rem;
                    height:10rem;
                }
            }

        }

    }

</style>
