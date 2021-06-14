<template>
  <div class="app-container">
    <!-- 过滤器们 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.studentId"
        placeholder="学生ID"
        clearable
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <!-- <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button> -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>
    </div>
    <!-- 分组 -->
    <div class="filter-container">
      <!-- <el-form
        ref="listGroup"
        :rules="rules"
        :model="listGroup"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left: 50px"
      > -->
        <el-select
          ref="groupingCriteria"
          v-model="listGroup.groupingCriteria"
          placeholder="分组标准"
          clearable
          style="width: 150px"
          class="filter-item"
        >
          <el-option
            v-for="item in groupingCriteria"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-input
          ref="groupingThreshold"
          v-model="listGroup.groupingThreshold"
          placeholder="分组阈值"
          clearable
          style="width: 150px"
          class="filter-item"
          @keyup.enter.native="handleGroup"
        />
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleGroup"
        >
          分组
        </el-button>
      <!-- </el-form> -->
    </div>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart />
    </el-row>
    <!-- 表格 -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
    <!-- <el-table-column
      type="selection"
      width="55">
    </el-table-column> -->
      <el-table-column label="序号" width="80px" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="学生ID" width="210px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.studentId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总选课数" width="160px" align="center" prop="totalCourseNum" sortable="custom">
        <template slot-scope="{ row }">
          <span>{{ row.totalCourseNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上课中" width="170px" align="center" prop="inClassNum" sortable="custom">
        <template slot-scope="{ row }">
          <span>{{ row.inClassNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="退课率(%)" width="145px" align="center" prop="dropRate" sortable="custom">
        <template slot-scope="{ row }">
          <span>{{ row.dropRate }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="280px" align="center">
        <template slot-scope="{ row }">
          <el-tooltip content="查看该学生课程详情" effect="light" placement="top">
            <el-button
              type="info"
              icon="el-icon-message"
              circle
              size="median"
              @click="handleFetchStudentInfo(row.studentId)"
            >
            </el-button>
          </el-tooltip>
          <!-- TODO 如有此功能 需要在table中加状态 在filter中也加查询条件 -->
          <!-- <el-tooltip content="停课" effect="light" placement="top">
            <el-button
              size="median"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(row)"
            >
            </el-button>
          </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getStudentList"
    />

  </div>
</template>


<script>
import {
    fetchStudentList,
    postStudentGroup
} from "@/api/student";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import LineChart from './components/LineChart'

// import getArrayIndex from "@/utils";

export default {
  name: "CourseTable",
  components: { Pagination, LineChart },
  directives: { waves },
  data() {
    const validateGroupingCriteria = (rule, value, callback) => {
      if (!value && !rule.required) {
        callback();
      } else if (value) {
        if (!value) {
          callback(new Error("请选择分组标准"));
        } else {
            callback();
        }
      }
    };
    const validateGroupingThreshold = (rule, value, callback) => {
      if (!value && !rule.required) {
        callback();
      } else if (value) {
        if (!value) {
          callback(new Error("请输入分组阈值"));
        } else {
          if (this.listGroup.groupingCriteria === "学生退课总数") {
            callback(new Error("lalala"))
          } else {
            callback();
          }
          // if (value.length < 2) {
          //   callback(new Error("姓名至少2个字符"));
          // } else if (value.length > 4) {
          //   callback(new Error("姓名不能超过4个字符"));
          // } else {
          //   callback();
          // }
        }
      }
    }
    return {
      tableKey: 0, // 我不知道有啥用
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        studentId: "",
        groupingCriteria: "",
        groupingThreshold: "",
        sort: "",
      },
      listGroup: {
        groupingCriteria: "",
        groupingThreshold: null
      },
      downloadLoading: false,
      multipleSelection: [],
      totalSelection: [],
      groupingCriteria: ["学生课程总数", "学生视频总数", "学生个人退课率"],
      rules: {
        groupingCriteria: [
          {
            required: true,
            // message: "请输入姓名",
            trigger: "blur",
            // validator: validateGroupingCriteria,
          },
        ],
        groupingThreshold: [
          {
            required: true,
            // message: "请输入姓名",
            trigger: "blur",
            // validator: validateGroupingThreshold,
          },
        ],
      }
    };
  },
  created() {
    this.getStudentList();
  },
  methods: {
    getStudentList() {
      this.listLoading = true;
      this.totalSelection.push(this.multipleSelection)
      fetchStudentList(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
        console.log(response);
        // Just to simulate the time of the request
        // TODO 删除
        // setTimeout(() => {
        this.listLoading = false;
        // }, 1.5 * 1000);
      });
    },
    // 筛选 过滤
    handleFilter() {
      this.listQuery.page = 1;
      this.getStudentList();
    },
    handleGroup() {
      // this.listQuery.page = 1;
      // this.getStudentList();
      this.$refs.listGroup.validate((valid) => {
        if (valid) {
            postStudentGroup(this.listGroup).then((response) => {
              this.$router.push({
              path: "/student/chart",
              // query: { listGroup: listGroup },
            })
          });
          // createEvent(this.tempEventForm).then(() => {
          //   // this.list.unshift(this.temp)
          //   this.dialogFormVisible = false;
          //   this.$notify({
          //     title: "成功",
          //     message: "创建事件成功",
          //     type: "success",
          //     duration: 2000,
          //   });
          //   // 刷新表格 即再获取一次
          //   this.getEventsList();
          // });
          // .catch((error) => {
          //   reject(error);
          // });
          // });
        }
      });

    },
    // 排序
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "totalCourseNum") {
        this.sortByTotalCourseNum(order);
      } else if (prop === "inClassNum") {
        this.sortByInClassNum(order);
      } else if (prop === "dropRate") {
        this.sortByDropRate(order);
      }
    },
    sortByTotalCourseNum(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+totalCourseNum";
      } else {
        this.listQuery.sort = "-totalCourseNum";
      }
      this.handleFilter();
    },
    sortByInClassNum(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+inClassNum";
      } else {
        this.listQuery.sort = "-inClassNum";
      }
      this.handleFilter();
    },
    sortByDropRate(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+dropRate";
      } else {
        this.listQuery.sort = "-dropRate";
      }
      this.handleFilter();
    },
    // 多选
    // selectionChange(val) {
    //     this.multipleSelection = val;
    //     console.log(val);
    //   },

    // 对行的操作
    handleFetchStudentInfo(studentId) {
      // fetchClues(eventId).then((response) => {
      // this.pvData = response.data.pvData
      // this.dialogPvVisible = true
      this.$router.push({
        path: "/student/table/info",
        query: { studentId: studentId },
      });
      // });
    },
    // handleDelete(row) {
    //   this.$confirm("此操作将停止该课程 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       deleteCourse({ courseId: row.courseId }).then(() => {
    //         this.$notify({
    //           title: "成功",
    //           message: "删除事件成功",
    //           type: "success",
    //           duration: 2000,
    //         });
    //         this.getCourseList();
    //       });
    //       // this.$message({
    //       //   type: 'success',
    //       //   message: '删除成功!'
    //       // });
    //     })
    //     .catch(() => {
    //       // this.$message({
    //       //   type: "info",
    //       //   message: "已取消删除",
    //       // });
    //     });
    // },
    // 关于导出excel的函数
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "createdTime" || j === "missingTime") {
            return parseTime(v[j]);
          } else if (j === "status") {
            return this.$options.filters["statusFilter"](v[j]); // 在method中使用过滤器
            // return statusFilter(v[j])
          } else if (j === "type") {
            return this.$options.filters["typeFilter"](v[j]);
          } else if (j === "missingAddressCode") {
            return this.$options.filters["CodeToText"](v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "学生ID",
          "总选课数",
          "上课中",
          "退课率"
        ];
        const filterVal = [
          "studentId",
          "totalCourseNum",
          "inClassNum",
          "dropRate"
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "学生信息-student_list",
        });
        this.downloadLoading = false;
      });
    },
  },
};
</script>

<style lang="scss">
.el-drawer.rtl {
  overflow: scroll;
}
</style>