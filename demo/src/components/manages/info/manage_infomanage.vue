<template>
    
    <div id="manage-infomanage">

        <div class="manage-infomanage-box">
            <table v-if="!correct">
                <tr>
                    <th>公告名称</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in storageInfoList">
                    <td>
                        {{item.title}}
                    </td>
                    <td>
                        <i class="fa fa-search fa-lg" @click="handleClick('/first/info')"></i>
                        <i class="fa fa-pencil fa-lg" @click="correctInfo(item.title,item.id,item.content)"></i>
                        <i class="fa fa-trash fa-lg" @click="throwInfo(item.id)"></i>
                    </td>
                </tr>
            </table>

            <div class="info-right-next" v-if="!correct">
                <span class="info-right-span" @click="goTop()">Top</span>
                <span class="info-right-span" @click="next('last')"><i class="fa fa-angle-double-left fa-lg"></i></span>
                <span v-for="number in total" @click="getInfoPage(number)" class="info-right-span">{{number}}</span>
                <span class="info-right-span" @click="next('next')"><i class="fa fa-angle-double-right fa-lg"></i></span>
                <span class="info-right-span" @click="goTail()">Tail</span>
            </div>

            <div class="manage-infomanage-box-correct" v-if="correct">
                <form>
                    <div>
                        <label for="head">公告标题:</label>
                        <input type="text" id="head" v-model="title">
                    </div>
                    <div>
                        <label for="file">附件:</label>
                        <select name="thumb" id="file"  @change="getFoldId()">
                            <option v-for="item in foldContentList" :value="item.id">{{item.file_object.name}}</option>
                        </select>
                    </div>
                </form>
                <div class="manage-head">公告内容</div>
                <editor class="editor"></editor>
                <div class="manage-site-button">
                    <span @click="sendMessage()"><i class="fa fa-check fa-lg"></i>提交</span><span @click="reset()"><i class="fa fa-refresh fa-lg"></i>重置</span>
                    <span @click="hideWarning()"><i class="fa fa-location-arrow fa-lg"></i>返回</span>
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

import editor from '../../editor'

    export default {

        components:{editor},

        data() {

            return {

                /*
                    存放当页公告
                    title:公告标题
                    content:公告内容
                    id:公告id
                */
                storageInfoList:[],
                //存放公告id
                infoId:"",
                //存放公告总页数
                pageNumber:"",
                //存放公告页码
                total:[],
                //公告每页的条数
                eachPageNumber:10,
                //存放当前页数
                nowPageNumber:1,
                //是否显示更改页面
                correct:false,
                /*
                    存放文件数据
                    id:文件id
                    file_object.name:文件名
                */
                foldContentList:[],
                //存放文件Id
                FoldId:"",
                //存放文件标题
                title:"",
                //是否弹出提示框
                showWarning:false,
                //警告框内容
                warningMessage:"",
                //提交状态
                state:""

            }

        },

        methods: {

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

                this.getInfoPage(this.nowPageNumber)

            },

            //重置表单
            reset() {

                document.querySelector('form').reset()

                document.querySelector('.ql-editor').innerText = ""                

            },

            //显示公告修改页面
            correctInfo(title,id,content) {

                this.infoId = id

                this.title = title

                this.correct = true

                setTimeout(function() {

                    document.querySelector('.ql-editor').innerHTML = content

                })

            },

            //获取文件Id
            getFoldId() {

                var mySelect = document.querySelector('select')

                var index = mySelect.selectedIndex

                this.FoldId = mySelect.options[index].value

            },

            //获取文件列表
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

                        _this.FoldId = _this.foldContentList[0].id

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            //将数据发送到服务器
            sendMessage() {

                var _this = this

                var data = {

                    "session_id":this.$store.state.userId,

                    "id":this.infoId,

                    "title":this.title,

                    "content":document.querySelector('.ql-editor').innerHTML,

                    "attachment":[this.FoldId]

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/announcement/update",

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

                    }

                })

            },

            //删除公告
            throwInfo(infoId) {

                var _this = this

                var data = {

                    "session_id":this.$store.state.userId,

                    "id":infoId

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/announcement/delete",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

                        _this.getInfoPage(_this.nowPageNumber)

                        _this.getTotal()

                    },error() {

                        console.log("删除失败")

                    }

                })

            },

            //跳转到第一页
            goTop() {

                this.getInfoPage(1)

            },

            //跳转到最后一页
            goTail() {

                this.getInfoPage(this.pageNumber)

            },

            //跳转页面
            next(command) {

                if(command == "next") {

                    if(this.nowPageNumber == this.pageNumber) {

                        return

                    }

                    this.getInfoPage(++this.nowPageNumber)

                }else {

                    if(this.nowPageNumber == 1) {

                        return

                    }

                    this.getInfoPage(--this.nowPageNumber)

                }

            },

            //获取公告总页数
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

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            //初始化页数数组
            initialInfoList(list) {

                var _this = this

                this.storageInfoList.length = 0

                list.forEach(function(value) {

                    _this.storageInfoList.push(value)

                })

            },

            //获取对应页数的公告
            getInfoPage(id) {

                var _this = this

                this.nowPageNumber = id

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/announcement/list?page="+id,

                    type:"GET",

                    success(data) {

                        var list = data.list

                        _this.initialInfoList(list)

                        console.log(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            },

            //跳转路由
            handleClick(router) {

                this.$router.push({path:router})

            }

        },

        mounted() {

            this.getInfoPage(this.nowPageNumber)

            this.getTotal()

            this.getContent()

        }

    }

</script>

<style lang="scss">

    #manage-infomanage {

        .manage-infomanage-box {
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

            .manage-infomanage-box-correct {
                position: relative;
                background: white;
                box-shadow: 0 0 1px 1px rgb(240, 240, 240);
                height:65rem;
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
                                text-indent: 1rem;
                            }

                            select  {
                                width:81%;
                                height:2rem;
                                margin-left:2.3rem;
                            }
                        }
                }
                
                .manage-head {
                	
                	position: relative;
                	top:15rem;
                	font-size: 1.5rem;
                	
                }

                .quill-editor{
                    position: absolute;
                    left:0;
                    right:0;
                    margin: auto;
                    top:18rem;
                    width:80%;
                    height: 30rem;
                    
                    .ql-toolbar {
                        white-space: normal;
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

        }

    }

</style>
