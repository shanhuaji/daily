/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter,
        /******/
      });
      /******/
    }
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 0));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function (module, exports) {
      const patch = snabbdom.patch;
      const h = snabbdom.h;
      function $(elem) {
        return document.querySelector(elem);
      }
      let inputBox = $(".input-box");
      let oList = $(".list");
      let oInsert = $(".insert");
      let oSearch = $(".search");

      let data = {
        initArr: [1, 2],
        bool: false,
        searcnIndex: 0 /* 点击修改时的index */,
      };
      /* 开始渲染页面 */
      init();
      function init() {
        let vdom = h(
          "input",
          {
            props: {
              type: "text",
              placeholder: "请输入内容",
              className: "content",
            },
            style: {},
          },
          []
        );
        patch(inputBox, vdom);
        keydownHandler();
      }
      /* 生成页面 */
      function display() {
        return h(
          "ul",
          { className: "input-box" },
          data.initArr.map((item, index) => {
            return h("li", { style: { listStyle: "none" } }, [
              h("p", {}, item),
              h(
                "button",
                {
                  props: {
                    onclick: () => {
                      searchHandler(index);
                    },
                  },
                },
                "更改"
              ),
              h(
                "button",
                {
                  props: {
                    onclick: () => {
                      removeHandler(index);
                    },
                  },
                },
                "删除"
              ),
            ]);
          })
        );
      }
      patch(oList, display());
      /* 回车添加信息到数组 */
      function keydownHandler() {
        let content = $(".content");
        content.onkeydown = function (e) {
          if (e.keyCode === 13) {
            /* 输入框的数据添加到数组中 */
            data.initArr.push(e.target.value);
            /* 获取ul list已经被第一次ul覆盖*/
            let inputBox = $(".input-box");
            patch(inputBox, display());
            e.target.value = "";
          }
        };
      }
      /* 修改弹框 */
      function searchBox(index) {
        console.log(index);
        data.searcnIndex = index;
        return h(
          "div",
          {
            props: { className: "search" },
            style: { display: data.bool ? "block" : "none" },
          },
          [
            h(
              "input",
              {
                props: {
                  type: "text",
                  placeholder: "请输入修改的内容",
                  className: "search-box",
                },
              },
              []
            ),
            h(
              "button",
              {
                props: {
                  onclick: () => {
                    okclickHandler();
                  },
                },
              },
              ["确定"]
            ),
          ]
        );
      }

      /* 修改弹框的确定 */
      function okclickHandler() {
        let searchValue = $(".search-box");
        data.initArr[data.searcnIndex] = searchValue.value;
        /* 重新获取元素 渲染数组中更改后的元素到页面 */
        let inputBox = $(".input-box");
        patch(inputBox, display());
        /* 再次获取更改框 并更改状态 */
        let oSearch = $(".search");
        data.bool = false;
        patch(oSearch, searchBox());
      }
      /* 修改  */
      function searchHandler(index) {
        console.log("修改");
        /* 渲染修改弹框到页面 */
        let oSearch = $(".search");
        data.bool = true;
        patch(oSearch, searchBox(index));
        /* 点击修改过去当前对应的值并赋值给修改框 */
        let searchValue = $(".search-box");
        searchValue.value = data.initArr[index];
      }
      /* 删除 */
      function removeHandler(index) {
        data.initArr.splice(index, 1);
        let inputBox = $(".input-box");
        patch(inputBox, display());
      }
      /* 查询框 */
      function insertBox() {
        return h("div", { props: { className: "insert" } }, [
          h(
            "input",
            { props: { type: "text", placeholder: "请输入查询的内容"} },
            [],
          ),
          h("button", {}, ["查询"])
        ]);
      }
      patch(oInsert, insertBox());
      /* 查询 */
      function insertHandler(e){ 
        let oInsert = $('.insert')
       oInsert.onchange=(e)=>{
       let val = e.target.value
        data.initArr = data.initArr.filter(item=>{
          return item == val
        })
       /*  点击确定改变数组中的内容重新渲染 */
       let inputBox = $(".input-box");
       patch(inputBox, display());
       
        }
      
      }
      insertHandler()
      /***/
    },
    /******/
  ]
);
