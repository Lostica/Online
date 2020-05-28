<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert show-icon title="注意！只允许为第三级分类设置参数！" type="warning" :closable="false"></el-alert>
      <el-row class="el-row">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            clearable
            change-on-select
            :props="cateProps"
            v-model="selectedCateKeys"
            :options="cateLists"
            @change="cateChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" :disabled="isBtnDisabled" @click="addDialogVisible=true">添加参数</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" stripe border>
            <el-table-column type="expand" v-slot="scope">
              <el-tag
                closable
                @close="handleClose(i,scope.row)"
                v-for="(item,i) in scope.row.attr_vals"
                :key="i"
              >{{item}}</el-tag>
              <!-- 输入的文本框 -->
              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              ></el-input>
              <!-- 添加按钮 -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(scope.row)"
              >+ New Tag</el-button>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作" prop="attr_name" v-slot="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="showEditDialog(scope.row.attr_id)"
              >编辑</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="removeParams(scope.row.attr_id)"
              >删除</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" :disabled="isBtnDisabled" @click="addDialogVisible=true">添加属性</el-button>
          <el-table :data="onlyTableData" stripe border>
            <el-table-column type="expand" v-slot="scope">
              <el-tag
                closable
                @close="handleClose(i,scope.row)"
                v-for="(item,i) in scope.row.attr_vals"
                :key="i"
              >{{item}}</el-tag>
              <!-- 输入的文本框 -->
              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              ></el-input>
              <!-- 添加按钮 -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(scope.row)"
              >+ New Tag</el-button>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作" prop="attr_name" v-slot="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="showEditDialog(scope.row.attr_id)"
              >编辑</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="removeParams(scope.row.attr_id)"
              >删除</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      @close="addDialogClosed"
      :title="'添加'+titleText"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改参数的对话框 -->
    <el-dialog
      @close="editDialogClosed"
      :title="'修改'+titleText"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 被激活的页签
      activeName: "many",
      selectedCateKeys: [],
      // 控制按钮与文本框的切换
      inputVisible: false,
      inputValue: "",
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      addForm: {
        attr_name: ""
      },
      editForm: {
        attr_name: ""
      },
      addFormRules: {
        attr_name: [{ required: true, message: "请输入手机", trigger: "blur" }]
      },
      editFormRules: {
        attr_name: [{ required: true, message: "请输入手机", trigger: "blur" }]
      },
      addDialogVisible: false,
      editDialogVisible: false,
      cateLists: [],
      manyTableData: [],
      onlyTableData: []
    };
  },
  created() {
    this.getCateLists();
  },
  methods: {
    // 获取所有的商品分类列表
    async getCateLists() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.cateLists = res.data;
      // console.log(this.cateLists);
    },
    // 修改对话框
    async showEditDialog(attr_id) {
      const { data: res } = await this.$http.get(
        "categories/" + this.cateId + "/attributes/" + attr_id,
        { params: { attr_sel: this.activeName } }
      );
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.editForm = res.data;

      this.editDialogVisible = true;
    },
    // 点击按钮，添加参数
    addParams() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "categories/" + this.cateId + "/attributes",
          {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          }
        );
        console.log(res);
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg);
        this.$message.success(res.meta.msg);
        this.cateChange();
        this.addDialogVisible = false;
      });
    },
    editParams() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.put(
          "categories/" + this.cateId + "/attributes/" + this.editForm.attr_id,
          {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName
          }
        );
        console.log(res);
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        this.$message.success(res.meta.msg);
        this.cateChange();
        this.editDialogVisible = false;
      });
    },
    async cateChange() {
      if (this.selectedCateKeys.length != 3) {
        this.selectedCateKeys = [];
        this.manyTableData=this.onlyTableData=[]
        return;
      }
      const { data: res } = await this.$http.get(
        "categories/" + this.cateId + "/attributes",
        { params: { sel: this.activeName } }
      );
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
        item.inputVisible = false;
        item.inputValue = "";
      });
      console.log(res.data);

      if (this.activeName == "many") this.manyTableData = res.data;
      else this.onlyTableData = res.data;
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // tab页签点击事件
    handleClick() {
      this.cateChange();
      // console.log(this.activeName);
    },
    async removeParams(attr_id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该参数, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmResult != "confirm") return this.$message.info("已取消删除");
      const { data: res } = await this.$http.delete(
        "categories/" + this.cateId + "/attributes/" + attr_id
      );

      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.cateChange();
      this.$message.success(res.meta.msg);
    },
    // 文本框失去焦点或回车松开
    handleInputConfirm(row) {
      if (row.inputValue.trim() == "") {
        row.inputValue = "";
        row.inputVisible = false;
        return;
      }

      row.attr_vals.push(row.inputValue.trim());
      row.inputValue = "";
      row.inputVisible = false;
      this.saveAttrVals(row);
    },
    // 把对attr_vals的操作保存
    async saveAttrVals(row) {
      const { data: res } = await this.$http.put(
        "categories/" + this.cateId + "/attributes/" + row.attr_id,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(" ")
        }
      );
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.$message.success(res.meta.msg);
    },
    showInput(row) {
      row.inputVisible = true;
      // 自动获得焦点
      // $nextTick 当页面上的元素被重新渲染之后，会调用回调函数
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleClose(i, row) {
      row.attr_vals.splice(i, 1);
      this.saveAttrVals(row);
    }
  },

  computed: {
    isBtnDisabled() {
      if (this.selectedCateKeys.length != 3) return true;
      return false;
    },
    cateId() {
      if (this.selectedCateKeys.length == 3) return this.selectedCateKeys[2];
      return null;
    },
    titleText() {
      if (this.activeName == "many") return "动态参数";
      else return "静态属性";
    }
  }
};
</script>

<style lang="less" scoped>
.el-row {
  margin: 15px 0;
}

.el-tag {
  margin: 0 5px;
}

.input-new-tag {
  width: 120px;
}
</style>