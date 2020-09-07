/* 头部 */
Vue.component("TodoHeader", {
  template: "#todu-header",
  data() {
    return {};
  },
  methods: {
    clickHandler() {
      /* 输入框显示 */
      bus.$emit("show");
    },
  },
});
/* 内容 */
Vue.component("TodoMiddle", {
  template: "#todu-middle",
  props: ["date",'end'],
  data() {
    return {
      arr: [],
      bool: [],
      checkbool: false,
    };
  },
  mounted() {
    this.arr = this.end;
    /* 渲染arr添加就出来 但是无法删选 */
    /* 渲染end没有田间数据显示的结果 */
    /* this.arr = this.end; */
  },
  updated() {
    this.$emit("accomplish", this.arr);
  },
  methods: {
    deleteHandler(id) {
      console.log(this.date);
    console.log(this.end);
      /* 选中框是否选中 */
      if (this.bool.indexOf(id) !== -1) {
        /* 查找对应id的下标 */
        let index = this.arr.findIndex((value) => {
          return value.id == id;
        });

        this.arr.splice(index, 1);
      } else {
        alert("未选中");
      }
    },
    checkboxHandler(e) {
      /* console.log(e.target.value); */
      this.checkbool = e.target.checked;
      /*  console.log(this.arr); */
      this.$emit("checkbool", { val: e.target.value, bool: this.checkbool });
    },
  },
});
/* 尾部 */
Vue.component("TodoBottom", {
  template: "#todu-bottom",
  props: ["boarr"],
  data() {
    return {
      typeArr: [
        { type: "全部", style: "all" },
        { type: "完成", style: "accomplish" },
        { type: "未完成", style: "unfinished" },
      ],
      cssStyle: "all",
    };
  },
  mounted() {},
  methods: {
    typeHandler(item) {
      this.cssStyle = item.style;
      console.log(this.boarr);
    switch (item.style) {
        case "all":
          this.$emit('end',this.boarr)
          // return this.boarr;
          break;
        case "accomplish":
          this.$emit('end',this.boarr.filter((item) => {return item.checkbool}))
          // return  this.boarr.filter((item) => {return item.checkbool})
          break;
        case "unfinished":
          this.$emit('end',this.boarr.filter((item) => {return !item.checkbool}))
          // return this.boarr.filter((item) => {return !item.checkbool});
          break;
        default:
          this.$emit('end',this.boarr)
          // return this.boarr;
          break;
      }
    },
  },
  
});
/* 弹出框 */
Vue.component("TodoDisplay", {
  template: "#todu-display",
  data() {
    return {
      bool: false,
      text: "",
      id: "",
    };
  },
  mounted() {
    bus.$on("show", () => {
      this.bool = true;
    });
  },
  methods: {
    /* 确定 */
    determineHandler() {
      console.log(this.text);
      this.bool = false;
      this.id++;
      /* 输入框的内容传到父组件中 */
      this.$emit("show", {
        id: this.id,
        text: this.text,
        checkbool: false,
      });
      this.text = "";
    },
    removeHandler() {
      this.bool = false;
    },
  },
});
let bus = new Vue();
let vm = new Vue({
  el: "#app",
  data: {
    date: [],
    msg: "1",
    idArr: [],
    endArr:[]
  },
  methods: {
    abc(val) {
      /* 接收内容添加到数组中 传给子组件 */
      this.date.push(val);
    },
    accomplish(val) {
      this.idArr = val;
    },
    checkbool(val) {
      let ind = this.date.findIndex((value) => {
        return value.id == val.val;
      });
      this.date[ind].checkbool = val.bool;
      /*  
     console.log(this.date); */
    },
    end(val){
     this.endArr = val
    }
  },
});
