<template>
  <div>
    <div class="subject-con" style="background:inherit">
      <div class="sub-content sub-conanswer">
        <i class="subjec-daan subjec-wrong" style="display: inline;"></i>
        <div class="sub-dotitle">
          <em>{{questionData.tqNo}}</em>
          <i>[{{trans[questionData.type]}}]</i>
          {{questionData.describe}}
        </div>

            <RadioGroup vertical class="sub-answer" v-if="questionData.type == 'SingleSelection'">
                <Radio label="A">
                    <i>A.</i>
                    <span>Apple</span>
                </Radio>
                <Radio label="B">
                   <i>B.</i>
                    <span>Android</span>
                </Radio>
                <Radio label="C">
                    <i>c.</i>
                    <span>Windows</span>
                </Radio>
            </RadioGroup>
            <Input v-model="answer" size='small' type="textarea" :rows="4" placeholder="Enter something..." v-if="questionData.type == 'Completion' || questionData.type == 'ShortAnswer'" />
        
        <div class="refer-answer refer-sc" v-if="showAnswer">
            <div class="reck"> 
                正确答案：<em class="right">{{questionData.answer}}</em> 
                我的答案：<em class="wrong">{{answer}}</em>
            </div>
            <ul class="refer-right">
                <li class="collect">
                    <span v-if="showCollect"> <Icon type="md-star-outline" size='24' color="#ed491f" /> 已收藏 </span>
                    <span v-if="!showCollect" @click.once="addCollectionFun"> <Icon type="md-star-outline" size='24'  />收藏 </span>
                </li>
            </ul>
            <div class="answer-desc"> 
                <span> 答案解析:</span>
                <div> {{questionData.parse}}</div>
            </div>

            <div class="ask-btn-new"> 
                <div @click.once="doubleFun" v-if="!showDouble"><Icon type="md-help" size='28' /><div>有疑问</div></div>
                <div v-if="showDouble">疑问  已反馈</div>
            </div>
        </div>
      </div>
    </div>

    <div class="subbottom">
        <ul class="bor">
            <li class="btn__prev pre"><a href="javascript:;"><Icon type="md-arrow-back" />上一题</a></li>
            <li class="btn__analyse ckdan ckzt" @click.once="submitAnswer()"><a href="javascript:;"><Icon type="md-book" />提交并查看答案</a></li>
            <li class="btn__next next"><a href="javascript:;">下一题 <Icon type="md-arrow-forward" /></a></li>
        </ul>
    </div>
  </div>
</template>

<script>

import { getQuestion, submitQuestion, addCollection, doubleTimesIncr} from '@/libs/api';

export default {
  data() {
    return {
        questionData: '',
        showAnswer: false,
        showCollect: false,
        showDouble: false,
        courseId: '',
        questionId: '',
        chapterId: '',
        trans: {
            SingleSelection: '单选题',
            MultipleSelection: '多选题',
            Judgment: '判断题',
            Completion: '填空题',
            ShortAnswer: '简答题'
        },
        amswer: ''
    };
  },
  methods: {
        getList() {
            getQuestion(this.courseId, this.questionId).then(res => {
                if (res.data.data) {
                   this.questionData = res.data.data.question;
                }
            });
        },
        // 学生提交题目
        submitAnswer() {
          this.showAnswer = true
            submitQuestion(this.userId, this.courseId, {questionId: this.questionId, answer: this.answer}).then(res => {
                if (res.data.code == 200) {
                  this.$Message.success(`答案提交${res.data.desc}`);
                } else {
                  this.$Message.error(`答案提交失败！！${res.data.error}`);
                }
            });
        },

        // 收藏题目
        addCollectionFun() {
          this.showCollect = true
            addCollection(this.userId, this.courseId, {questionId: this.questionId, chapterId: this.chapterId}).then(res => {
                if (res.data.code == 200) {
                   this.$Message.success(`收藏题目${res.data.desc}`);
                } else {
                  this.$Message.error(`收藏题目失败！！${res.data.error}`);
                }
            });
        },

        // 对题目有疑惑
        doubleFun() {
          this.showDouble = true
            doubleTimesIncr(this.userId, this.courseId, this.questionId).then(res => {
                if (res.data.data) {
                }
            });
        }
        
    },
    mounted() {
      this.userId = JSON.parse(localStorage.userInfo).userId
      this.courseId = this.$route.params.courseId
      this.questionId = this.$route.params.questionId
      this.chapterId = this.$route.params.chapterId
      this.getList()
    }
};
</script>

<style lang="less" scoped>
.subject-con {
  margin: 20px;
}

.sub-answer-tips {
  width: 130px !important;
  height: 30px;
  background: #eeeeee;
  border-radius: 8px 8px 0px 0px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  margin-left: 36px;
  display: block;
  i {
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
  .right {
    background: #eaefe4;
  }
  .wrong {
    background: #ffe7e7;
  }
}

.sub-answer dd.right-this i,
.sub-answer dd.cho-this i {
  width: 26px !important;
  height: 26px !important;
  position: absolute;
  left: 2px !important;
  top: 5px !important;
  //   background: url(pra_icon.png) no-repeat !important;
}
.sub-answer dd.right-this i {
  background-position: -6px -124px !important;
}
.sub-answer dd.cho-this i {
  background-position: -40px -59px !important;
  left: 3px !important;
}
.sub-answer dd.right-this.cho-this i {
  background-position: -6px -124px !important;
}
.sub-answer dd.wrong-this.cho-this i {
  background-position: -33px -804px !important;
}
.sub-answer.sub-answer-double dd.right-this i {
  background-position: -32px -598px !important;
}
.sub-answer.sub-answer-double dd.cho-this i {
  background-position: 2px -587px !important;
}
.sub-answer.sub-answer-double dd.right-this.cho-this i {
  background-position: -32px -598px !important;
}
.sub-answer.sub-answer-double dd.wrong-this.cho-this i {
  background-position: -32px -556px !important;
}

.sub-answer {
  padding: 15px 50px 25px 65px;
  clear: both;
//   background: url(https://img2.233.com/wx/tiku/v201811/skin/images/logo_bg.png)
    // no-repeat center;
  position: relative;
}
.sub-answer img {
  max-width: 100%;
  height: auto;
}
.sub-answer dd {
  display: block;
  padding: 6px 0 6px 45px;
  margin-left: -20px; /* font-size:14px;*/
  line-height: 24px;
  color: #151515;
  position: relative;
  cursor: pointer;
}
.sub-answer-no dd {
  margin-bottom: 3px;
}
.sub-answer dd:hover {
  background: #f8f8f8;
  border: none;
}
.sub-answer-no dd:hover {
  background: none;
  cursor: text;
}
.sub-answer dd span {
  color: #999;
  margin-right: 5px;
  top: 7px;
  left: 40px;
}
.sub-answer dd i {
  width: 21px;
  height: 21px;
  display: block;
  background-position: -19px -62px;
  position: absolute;
  top: 8px;
  left: 5px;
}

.sub-dotitle { 
  display: inline-block;
  margin-bottom: 50px;
  }
.sub-dotitle .cha-cail a { position: absolute; top: 0; right: 0; color: #e45c40; display: block; padding: 0 20px 0 40px; font-size: 14px; height: 100%; line-height: 42px; }
.sub-dotitle .cha-cail a:hover { background: #f5f5f5; }
.sub-dotitle .cha-cail i { width: 13px; height: 13px; position: absolute; top: 15px; right: 85px; display: block; background-position: 0 -678px; }
.sub-dotitle img { max-width: 100%;height: auto;}
.sub-dotitle em { font-size: 20px; color: #333;font-weight: 900; margin-right: 10px; float: left; }
.sub-dotitle i { color: #333;font-weight: 900; }
.sub-dotitle-img { float: left; overflow: hidden; width: 853px; word-break: break-all; word-wrap: break-word; }
.sub-dotitle-img img { max-width: 800px; float: left; clear: both; margin-top: 10px; }

.ivu-radio-group {
    display: block;
}

.refer-answer {
    background: #f9f9f9;
    border-top: 1px dashed #d8d8d8;
    padding: 30px 12px 30px;
    display: block;
    position: relative;
    margin-right: 30px;
    margin-top: 50px;
    .reck {
        color: #999;
        .right { color: #47ad76; }
        .wrong { color: #ee491f; }
    }
    .refer-right {
        float: right;
        margin-right: 50px;
    }
    .answer-desc {
        margin-top: 30px;
    }
    .ask-btn-new {
        width: 56px;
        height: 56px;
        position: absolute;
        background: #facd38;
        z-index: 9;
        right: 5px;
        color: #e13b29 !important;
        top: -12px;
        text-align: center;
        font-size: 14px;
        border-radius: 52px;
        box-shadow: 0px 10px 10px rgb(0,0, 0, .2);
    }
}

.subbottom {
    width: 100%;
    height: 50px;
    position: relative;
    margin-top: 50px;
    font-size: 18px;

    ul {
    width: 100%;
    height: 50px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 -2px 5px #eee;
    margin-right: 278px;
        li {
                float: left;
                position: relative;
                a {
                    color: #333;
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    display: block;
                    text-align: center;
                }
                a:hover {
                    color: #e45c40;
                }
        }
        .ckdan {
            width: 40%;
            a {
             color: #2d8cf0;
            }
        }
        .pre,.next {
            width: 30%;
        }
    }
}
</style>