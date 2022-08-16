<template>
  <div class="manage">
    <el-dialog
      :title="oprateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="porateFormLabel"
        :form="oprateForm"
        :inline="true"
        ref="form"
      >
      <!--  ref可以理解成打一个标识，类似于一个id，最终会收集到this对象的refs里面s -->
      </common-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">
          搜索
        </el-button>
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
       @changePage="getList()" 
       @edit="editUser" 
       @del="delUser"
    >
    </common-table>
  </div>
</template>
<script>
import CommonForm from "../../components/common/commonform.vue";
import CommonTable from "../../components/common/commontable.vue";
import { getUser } from "../../../api/data.js";
export default {
  name: "User",
  data() {
    return {
      oprateType: "add",
      isShow: false,
      porateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "女",
              value: 1,
            },
            {
              label: "男",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      oprateForm: {
        name: "",
        age: "",
        sex: "",
        addr: "",
        birth: ""
      },
      formLabel: [
        {
          model: "keybord",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    confirm() {
      if (this.oprateType === "edit") {
        this.$http.post("/user/edit", this.oprateForm).then((res) => {
          // console.log(res);
          this.isShow = false;
          this.getList();
        })
      } else {
        this.$http.post("/user/add", this.oprateForm).then((res) => {
          // console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.oprateType = "add";
      this.oprateForm = {
        name: "",
        age: "",
        sex: "",
        addr: "",
        birth: ""
      }
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : '';
      getUser({
        page: this.config.page,
        name
      }).then(({data: res}) => {
        this.tableData =  res.list.map(item => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        })
        this.config.total = res.count;
        this.config.loading = false;
      })
    },
    editUser(row) {
      this.oprateType = "edit";
      this.isShow = true;
      // console.log(row)
      this.oprateForm = row;
    },
    
    delUser(row) {//已经搭建完页面，但是删除的时候需要二次弹窗的确认的时候，
    //修改页面样式是比较麻烦的，这时候就可以使用$confirm来完成二次弹窗的确认工作
      this.$confirm("此操作将永久删除组件,是否继续?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .post("user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          })
      }).catch((err) => {
        console.log(err);})
    },
  },
  created() {
    this.getList();
  },
  components: {
    CommonForm,
    CommonTable,
  },
};
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>