<template>
  <div class="app-container">
    <!-- 过滤器们 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.courseId"
        placeholder="课程ID"
        clearable
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.videoNum"
        placeholder="视频数"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option
          v-for="item in videoNumOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <!-- <el-select
        v-model="listQuery.status"
        placeholder="事件状态"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in eventStatusOptions"
          :key="item"
          :label="item"
          :value="eventStatusOptions.getArrayIndex(item)"
        />
      </el-select> -->
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
      @sort-change="sortChange"
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
      <el-table-column label="包含视频数" width="160px" align="center" prop="videoNum" sortable="custom">
        <template slot-scope="{ row }">
          <span>{{ row.videoNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总时长" width="170px" align="center" prop="totalDuration" sortable="custom">
        <template slot-scope="{ row }">
          <span>{{ row.totalDuration }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总参加人数" width="145px" align="center" prop="totalPeopleNum" sortable="custom">
        <template slot-scope="{ row }">
          <span>{{ row.totalPeopleNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="正在参加人数" width="145px" align="center" prop="currentPeopleNum" sortable="custom">
        <template slot-scope="{ row }">
          <span>{{ row.currentPeopleNum }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="280px" align="center">
        <template slot-scope="{ row }">
          <el-tooltip content="查看课程详情" effect="light" placement="top">
            <el-button
              type="info"
              icon="el-icon-message"
              circle
              size="median"
              @click="handleFetchCourseInfo(row.courseId)"
            >
            </el-button>
          </el-tooltip>
          <!-- TODO 如有此功能 需要在table中加状态 在filter中也加查询条件 -->
          <el-tooltip content="停课" effect="light" placement="top">
            <el-button
              size="median"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(row)"
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
      @pagination="getCourseList"
    />

  </div>
</template>


<script>
import {
    fetchCourseList,
    deleteCourse
} from "@/api/course";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

// import getArrayIndex from "@/utils";

export default {
  name: "CourseTable",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0, // 我不知道有啥用
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        courseId: "",
        videoNum: "",
        sort: "",
      },
      videoNumOptions: ["<=5", "6-10", "11-15", ">15"],
      // 下载
      downloadLoading: false,
    };
  },
  created() {
    this.getCourseList();
  },
  methods: {
    getCourseList() {
      this.listLoading = true;

      fetchCourseList(this.listQuery).then((response) => {
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
      this.getCourseList();
    },
    // 排序
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "videoNum") {
        this.sortByVideoNum(order);
      } else if (prop === "totalDuration") {
        this.sortByTotalDuration(order);
      } else if (prop === "totalPeopleNum") {
        this.sortByTotalPeopleNum(order);
      } else if (prop === "currentPeopleNum") {
        this.sortByCurrentPeopleNum(order);
      }
    },
    sortByVideoNum(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+videoNum";
      } else {
        this.listQuery.sort = "-videoNum";
      }
      this.handleFilter();
    },
    sortByTotalDuration(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+totalDuration";
      } else {
        this.listQuery.sort = "-totalDuration";
      }
      this.handleFilter();
    },
    sortByTotalPeopleNum(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+totalPeopleNum";
      } else {
        this.listQuery.sort = "-totalPeopleNum";
      }
      this.handleFilter();
    },
    sortByCurrentPeopleNum(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+currentPeopleNum";
      } else {
        this.listQuery.sort = "-currentPeopleNum";
      }
      this.handleFilter();
    },

    // 对行的操作
    handleFetchCourseInfo(courseId) {
      // fetchClues(eventId).then((response) => {
      // this.pvData = response.data.pvData
      // this.dialogPvVisible = true
      this.$router.push({
        path: "/course/table/info",
        // name: 'clues',
        query: { courseId: courseId },
        // params: {id: eventId},
      });
      // });
    },
    handleDelete(row) {
      this.$confirm("此操作将停止该课程 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCourse({ courseId: row.courseId }).then(() => {
            this.$notify({
              title: "成功",
              message: "删除事件成功",
              type: "success",
              duration: 2000,
            });
            this.getCourseList();
          });
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
        });
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
          "课程ID",
          "包含视频数",
          "总时长",
          "总参加人数",
          "正在参加人数"
        ];
        const filterVal = [
          "courseId",
          "videoNum",
          "totalDuration",
          "totalPeopleNum",
          "currentPeopleNum"
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "课程信息-course_list",
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