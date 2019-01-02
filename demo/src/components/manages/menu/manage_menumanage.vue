<template>

    <div id="manage-menumanage">

        <div class="manage-menumanage-box">

            <div class="menu-add" @click="showWarning('','','','','','add','添加菜单')">
                <span><i class="fa fa-check fa-lg"></i>添加菜单</span>
            </div>


            <div class="manage-menumanage-list">

                <ul>
                    <li v-for="(item,index) in storageMenuList">
                        <span class="manage-menumanage-list-head">{{item.title}}</span>
                        <span class="manage-menumanage-list-icon">
                            <i class="fa fa-pencil fa-lg" @click="showWarning(item.title,item.link,item.id,item.index,index,'correct','修改菜单')"></i>
                            <i class="fa fa-trash fa-lg" @click="throwMenu(index)"></i>
                        </span>
                        <span class="manage-menumanage-list-arrow">
                            <i class="fa fa-caret-up fa-lg" @click="upMenu($event)"></i>
                            <i class="fa fa-caret-down fa-lg" @click="downMenu($event)"></i>
                        </span>
                    </li>
                </ul>

            </div>

            <div class="manage-menumanage-correct" v-if="showCorrect">


                <form>

                    <div class="menu-head">
                        <span>{{warningTitle}}</span>
                    </div>
                    
                    <div class="menu-input">
                        <label for="menu-title">菜单标题: </label>
                        <input type="text" id="menu-title" v-model="menuTitle">
                    </div>

                    <div class="menu-input">
                        <label for="menu-link">菜单链接: </label>
                        <input type="text" id="menu-link" v-model="menuLink">
                    </div>

                    <div class="menu-message"></div>

                    <div class="menu-button">
                        <span @click="sendCorrectMessage()"><i class="fa fa-check fa-lg"></i>提交</span>
                        <span @click="reset()"><i class="fa fa-refresh fa-lg"></i>重置</span>
                        <span @click="hideWarning()"><i class="fa fa-location-arrow fa-lg"></i>返回</span>
                    </div>

                </form>

            </div>

            <div class="menu-save" @click="saveOrder()">
                <span><i class="fa fa-save fa-lg"></i>保存</span>
            </div>

            <div class="manager" v-if="showWarn">
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
                    <div class="manager-cancel" @click="hideWarn()">
                        <i class="fa fa-location-arrow fa-2x"></i>
                    </div>
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
                    link:菜单链接
                    title:菜单标题
                    id:菜单id,
                    index:菜单位置
                */
                storageMenuList:[],
                //存放该菜单标题
                menuTitle:"",
                //存放该菜单链接
                menuLink:"",
                //存放该菜单id
                menuId:"",
                //存放该菜单的索引
                menuIndex:"",
                //存档当前li的索引
                liIndex:"",
                //是否显示修改框
                showCorrect:false,
                //修改框执行的指令
                correctCommand:"",
                //存放发送的menu数组
                menu:[],
                //用于简单刷新页面
                showList:true,
                //显示框的名字
                warningTitle:"",
                //显示警告提示框
                showWarn:false,
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

                    this.warningMessage = "You have successfully saved it!"

                }

            },

            //隐藏提示框
            hideWarn() {

                this.showWarn = false

            },

            //获取li
            getLi(list) {

                var li = document.querySelectorAll('.manage-menumanage-list>ul>li')

                    if(li.length == 0) {

                        console.log("牛B")

                        return

                    }

                    list.forEach(function(value,index) {

                        li[index].id = value.id

                        li[index].title = value.title

                        li[index].link = value.link

                    })

            },

            //保存顺序信息
            saveOrder() {

                this.correctCommand = "save"

                this.sendCorrectMessage()

            },

            //向上移动菜单
            upMenu(event) {

                var ul = document.querySelector('.manage-menumanage-list>ul')

                var li = document.querySelectorAll('.manage-menumanage-list>ul>li')

                for(var i = 0 ; i < li.length ; i ++) {

                    li[i].index = i

                }

                var newLi = li[event.target.parentNode.parentNode.index]

                var oldLi = li[event.target.parentNode.parentNode.index - 1]

                ul.insertBefore(newLi,oldLi)

            },

            //向下移动该菜单
            downMenu(event) {

                var ul = document.querySelector('.manage-menumanage-list>ul')

                var li = document.querySelectorAll('.manage-menumanage-list>ul>li')

                for(var i = 0 ; i < li.length ; i ++) {

                    li[i].index = i

                }

                var newLi = li[event.target.parentNode.parentNode.index]

                var oldLi = li[event.target.parentNode.parentNode.index + 2]

                ul.insertBefore(newLi,oldLi)

            },

            //删除菜单
            throwMenu(liIndex) {

                var _this = this

                var menu = [] 

                this.storageMenuList.forEach(function(value,index) {

                    if(index == liIndex) {

                        return

                    }

                    menu.push({
                        
                        "id":value.id,

                        "title":value.title,

                        "link":value.link,

                        "index":value.index

                    })

                })

                var data = {

                    "session_id":this.$store.state.userId,

                    "menu": menu

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/menu/update",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

                        _this.getMenuList()


                    },error() {

                        _this.getMenuList()
                    
                    }

                })

            },

            //显示修改信息
            showMessage(command) {

                var message = document.querySelector('.menu-message')

                if(command == "success") {

                    message.innerText = "修改成功！"

                    message.style.color = "#5097d0"

                }else {

                    message.innerText = "修改失败！"

                    message.style.color = "red"

                }

            },

            //隐藏修改信息
            hideMessage() {

                var message = document.querySelector('.menu-message')

                message.innerText = ""

            },

            //发送修改表单信息
            sendCorrectMessage() {

                var _this = this

                this.menu.length = 0
                
                if(this.correctCommand == "correct") {

                    this.storageMenuList.forEach(function(value,index) {

                        if(index == _this.liIndex) {

                            _this.menu.push({

                                "id":_this.menuId,

                                "title":_this.menuTitle,

                                "link":_this.menuLink,

                                "index":index

                            })

                            return

                        }

                        _this.menu.push({
                            
                            "id":value.id,

                            "title":value.title,

                            "link":value.link,

                            "index":index

                        })

                    })

                }
                
                if(this.correctCommand == "add"){

                    var menuIndex = -1

                    if(this.storageMenuList.length != 0) {

                        this.storageMenuList.forEach(function(value,index) {

                            _this.menu.push({
                                
                                "id":value.id,

                                "title":value.title,

                                "link":value.link,

                                "index":index

                            })

                            menuIndex = index

                        })

                    }


                    _this.menu.push({

                        "id":this.menuTitle,

                        "title":this.menuTitle,

                        "link":this.menuLink,

                        "index":menuIndex+1

                    })

                } 
                
                if(this.correctCommand == "save"){

                    var li = document.querySelectorAll('.manage-menumanage-list>ul>li')

                    li.forEach(function(value,index) {

                        _this.menu.push({

                            "id":value.id,

                            "title":value.title,

                            "link":value.link,

                            "index":index

                        })

                    })

                }

                var data = {

                    "session_id": this.$store.state.userId,

                    "menu": _this.menu

                }

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/menu/update",

                    type:"POST",

                    data:JSON.stringify(data),

                    success(data) {

                        if(_this.correctCommand == "save") {

                            _this.warningContent("success")

                            _this.showWarn = true

                            return

                        }

                        _this.showMessage("success")

                        setTimeout(function() {

                            _this.getMenuList()

                            _this.hideWarning()

                            _this.hideMessage()
                            
                        }, 1000);

                    },error() {

                        _this.showMessage("error")

                        setTimeout(function() {

                            _this.getMenuList()

                            _this.hideWarning()

                            _this.hideMessage()
                            
                        }, 1000);

                    }

                })

            },

            //重置表单
            reset() {

                document.querySelector('form').reset()

            },

            //显示菜单框
            showWarning(title,link,id,index,liIndex,command,warningTitle) {

                this.menuTitle = title

                this.menuLink = link

                this.menuId = id

                this.menuIndex = index

                this.liIndex = liIndex

                this.correctCommand = command

                this.warningTitle = warningTitle

                this.showCorrect = true

            },

            //隐藏菜单框
            hideWarning() {

                this.showCorrect = false

            },

            //初始化菜单列表
            initialMenuList(list) {

                var _this = this

                this.storageMenuList.length = 0

                for(var i = 0 ; i < list.length ; i ++) {

                    list.forEach(function(value) {

                        if(value.index == i) {

                            _this.storageMenuList.push(value)

                        }

                    })           

                }
                setTimeout(function() {

                    _this.getLi(_this.storageMenuList)

                },0)


            },

            //获取菜单列表
            getMenuList() {

                var _this = this

                $.ajax({

                    url:"http://qwebfx-test.deali.cn/api/menu/get",

                    type:"GET",

                    success(data) {

                        var list = data.menu

                        _this.initialMenuList(list)

                    },error() {

                        console.log("请求失败")

                    }

                })

            }

        },

        mounted() {

            this.getMenuList()

        }

    }

</script>

<style lang="scss">

    #manage-menumanage {

        .manage-menumanage-box {
            position: relative;
            text-align: center;
            overflow: hidden;
            background:#fefefe;
            box-shadow: 0 0 1px 1px rgb(240, 240, 240);

            .menu-add {
                position: absolute;
                right:2rem;
                top:2rem;
                padding:1rem 1rem;
                font-size: 1.4rem;
                color:#fefefe;
                background: #86b77f;
                transition: .3s;
                cursor: pointer;

                i {
                    margin-right:.3rem; 
                }
            }

            .menu-add:hover {
                background:#71a86a;
            }

            .manage-menumanage-list {

                position: relative;
                margin:12rem 0;
                font-size: 1.3rem;
                ul {
                    li {
                        position: relative;
                        list-style: none;
                        margin: 1.5rem 20rem;
                        padding:1rem 0; 
                        height:2.5rem;
                        background: #f7f9fe;
                        border:.1rem solid #d9e1e9;
                        color:#5088b8;
                        cursor: pointer;
                        transition: .3s;

                        .manage-menumanage-list-head {
                            position: absolute;
                            line-height: 2.5rem;
                            left:2rem;
                        }

                        .manage-menumanage-list-icon {
                            position: absolute;
                            top:1.1rem;
                            right:3rem;

                            i {
                                position: relative;
                                margin:0 .3rem;
                                transition: .3s;
                            }

                            i:first-of-type {
                                color:#7bb363;
                            }
                            
                            i:last-of-type {
                                color:#e07160;
                            }
                            i:hover {
                                font-size: 2rem;
                            }
                        }

                        .manage-menumanage-list-arrow {

                            position: absolute;
                            height:2.5rem;
                            right:1.5rem;

                            i {
                                position: absolute;
                            }

                            i:first-of-type {
                                top:-.3rem;
                            }
                            
                            i:last-of-type {
                                bottom:-.3rem;
                            }
                        }
                    }

                    li:hover {
                        color:#2766ae;
                        background:#ebf1ff;
                    }
                }
            }

            .manage-menumanage-correct {
                position: fixed;
                top:0;
                right:0;
                left:0;
                bottom:0;
                z-index: 5;
                background:rgba(0,0,0,.5);

                form {
                    position: absolute;
                    top:0;
                    right:0;
                    left:0;
                    bottom:0;
                    margin:auto;
                    background:white;
                    height: 23rem;
                    width:40rem;
                    overflow: hidden;
                    animation: showcorrect 1s both;

                    .menu-head {
                        position: relative;
                        margin-top:1rem;
                        padding-bottom:1rem;
                        font-size: 1.5rem;
                        text-align: left;
                        text-indent: 2rem;
                        font-weight: bold;
                        border-bottom: .1rem solid #e4e4e4;
                        color:#5088b8;
                        transition: .5s;
                        cursor: pointer;
                    }

                    .menu-head:hover {
                        color:#2766ae;
                    }

                    .menu-input {
                        position: relative;
                        margin: 2rem;
                        right:2rem;
                        font-size: 1.3rem;

                        input {
                            text-indent: .5rem;
                            height:2rem;
                            width:20rem;
                        }
                    }

                    .menu-message {
                        font-size: 1.1rem;
                    }

                    .menu-button {
                            position: absolute;
                            width:100%;
                            line-height:5rem;
                            text-align: center;
                            bottom:.5rem;

                        span {
                            padding:.5rem 1rem;
                            margin:0 1rem;
                            font-size: 1.1rem;
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

                @keyframes showcorrect {
                    0% {
                        width:0;
                        height: 23rem;
                    }100% {
                        width:40rem;
                        height: 23rem;
                    }
                }

            }

            .menu-save {
                padding:1rem 1rem;
                font-size: 1.4rem;
                color:#fefefe;
                background: #5088b8;
                transition: .3s;
                cursor: pointer;

                i {
                    position: relative;
                    top:-.1rem;
                    margin-right:.5rem; 
                }
            }

            .menu-save:hover {
                background:#2766ae;
            }

            
        }

    }

    @media screen and (min-width:850px) and (max-width:1400px) {

        #manage-menumanage {


            .manage-menumanage-box { 

                .manage-menumanage-list { 
                    ul {
                        li {
                            margin: 1.5rem 15rem;
                        }
                    }
                }

            }
        }

    }

    @media screen and (min-width:0) and (max-width:850px){

        #manage-menumanage {


            .manage-menumanage-box { 

                .manage-menumanage-list { 
                    ul {
                        li {
                            margin: 1.5rem 5rem;
                        }
                    }
                }

            }
        }
        
    }

</style>
