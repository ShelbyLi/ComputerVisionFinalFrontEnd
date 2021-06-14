<template>
  <div class="app-container">
    <!-- 过滤器们 -->
    <div class="filter-container">
      <el-select
        v-model="listQuery.courseStatus"
        placeholder="课程状态"
        clearable
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="item in courseStatusOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
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
    <!-- 表格 -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="序号" width="80px" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="课程ID" width="210px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.courseId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上一次观看的视频" width="155px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.lastVideoName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="170px" align="center">
        <template slot-scope="{ row }">
          <!-- <span>{{ row.courseStatus }}</span> -->
          <el-tag :type="row.courseStatus | tagCourseStatusFilter">
            {{ row.courseStatus | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="预测退课原因" width="155px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.dropReason }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="84px" align="center">
        <template slot-scope="{ row }">
          <el-tooltip content="提醒该学生" effect="light" placement="top">
            <el-button
              size="median"
              type="warning"
              icon="el-icon-s-promotion"
              circle
              @click="handleInformStudent(row)"
            >
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getStudentInfoList"
    />

  </div>
</template>


<script>
import { informStudent, fetchStudentInfoList } from "@/api/student";
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";

const courseStatusOptions = ["学习中", "已完成", "已退课", "可能退课"];
export default {
  name: "info",
  components: { Pagination },
  directives: { waves },
  filters: {
    typeFilter(courseStatus) {
      return courseStatusOptions[courseStatus];
    },
    tagCourseStatusFilter(courseStatus) {
        const typeMap = ["warning", "success", "info", "danger"];
      return typeMap[courseStatus];
    },
  },
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      list: [],
      total: 0,
      listQuery: {
        studentId: "",
        courseStatus: "",
        page: 1,
        limit: 20,
        sort: "",
      },
     courseStatusOptions: ["学习中", "已完成", "已退课", "可能退课"],
      downloadLoading: false,
    };
  },
  created() {
    this.getParams();
    this.getStudentInfoList();
  },
  methods: {
    getParams() {
      this.listQuery.studentId = this.$route.query.studentId;
      console.log(this.$route.query.studentId);
    },
    getStudentInfoList() {
      this.listLoading = true;
      fetchStudentInfoList(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getStudentInfoList();
    },
    handleInformStudent(row) {
        informStudent(row.studentId)
    },
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
          "视频ID",
          "上一次观看的视频名称",
          "课程状态",
          "退课原因"
        ];
        const filterVal = [
          "videoId",
          "lastVideoName",
          "status",
          "dropReason"
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "课程视频信息-video_list",
        });
        this.downloadLoading = false;
      });
    },
  },
  // // watch: {
  // //   $route: "getParams",
  // },
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 12px;
}
</style>
