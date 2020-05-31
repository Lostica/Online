<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      options: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ]
      }
    };
  },
  created() {},
  async mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    const { data: res } = await this.$http.get("reports/type/1");

    if (res.meta.status != 200) return this.$message.error(res.meta.msg);
    // for(var key in options){
    //     if(options.hasOwnProperty(key)===true){
    //     //此处hasOwnProperty是判断自有属性，使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问会避免原型对象扩展带来的干扰
    //         result[key]=options[key];
    //     }
    // }
    const result = { ...this.options, ...res.data };
    myChart.setOption(result);
  },
  methods: {}
};
</script>
<style lang="less" scoped>
</style>