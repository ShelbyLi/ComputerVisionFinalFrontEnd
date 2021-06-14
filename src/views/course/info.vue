<template>
  <div class="app-container">
    <!-- 过滤器们 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.videoId"
        placeholder="视频ID"
        clearable
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.videoName"
        placeholder="视频名称"
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
      <el-table-column label="视频ID" width="210px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.videoId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="视频名称" width="155px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.videoName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长" width="170px" align="center" prop="videoDuration" sortable="custom">
        <template slot-scope="{ row }">
          <span>{{ row.videoDuration }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平均观看时长" width="155px" align="center" prop="avgWatchingDuration" sortable="custom">
        <template slot-scope="{ row }">
          <span>{{ row.avgWatchingDuration }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点击率" width="145px" align="center" prop="ctr" sortable="custom">
        <template slot-scope="{ row }">
          <span>{{ row.ctr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="退课人数" width="145px" align="center" prop="dropNum" sortable="custom">
        <template slot-scope="{ row }">
          <span>{{ row.dropNum }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="84px" align="center">
        <template slot-scope="{ row }">
          <!-- TODO 如有此功能 需要在table中加状态 在filter中也加查询条件 -->
          <el-tooltip content="停止使用该视频" effect="light" placement="top">
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
      @pagination="getVideoList"
    />

  </div>
</template>


<script>
import { deleteVideo, fetchVideoList } from "@/api/course";
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";

export default {
  name: "info",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      listLoading: false,
      list: [],
      total: 0,
      listQuery: {
        courseId: "",
        videoId: "",
        videoName: "",
        page: 1,
        limit: 20,
        sort: "",
      },
      downloadLoading: false,
    };
  },
  created() {
    this.getParams();
    this.getVideoList();
  },
  methods: {
    getParams() {
      this.listQuery.courseId = this.$route.query.courseId;
      console.log(this.$route.query.courseId);
    },
    getVideoList() {
      this.listLoading = true;
      fetchVideoList(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    // async getVideoList() {
    //   this.listLoading = true;
    //   const { data } = await fetchVideoList(this.listQuery);
    //   const items = data.records;
    //   this.list = items.map((v) => {
    //     this.$set(v, "edit", false); // https://vuejs.org/v2/guide/reactivity.html
    //     v.originalLevel = v.level; //  will be used when user click the cancel botton
    //     return v;
    //   });
    //   this.total = data.total; // 之前分页不见了因为忘记total赋值了
    //   this.listLoading = false;
    // },
    handleFilter() {
      this.listQuery.page = 1;
      this.getVideoList();
    },
    // 排序
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "videoDuration") {
        this.sortByCreatedTime(order);
      } else if (prop === "avgWatchingDuration") {
        this.sortByAvgWatchingDuration(order);
      } else if (prop === "ctr") {
        this.sortByCtr(order);
      } else if (prop === "dropNum") {
        this.sortByDropNum(order);
      }
    },
    sortByVideoDuration(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+videoDuration";
      } else {
        this.listQuery.sort = "-videoDuration";
      }
      this.handleFilter();
    },
    sortByAvgWatchingDuration(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+avgWatchingDuration";
      } else {
        this.listQuery.sort = "-avgWatchingDuration";
      }
      this.handleFilter();
    },
    sortByCtr(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+ctr";
      } else {
        this.listQuery.sort = "-ctr";
      }
      this.handleFilter();
    },
    sortByDropNum(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+dropNum";
      } else {
        this.listQuery.sort = "-dropNum";
      }
      this.handleFilter();
    },
    handleDelete(row) {
      this.$confirm("此操作将停止使用该视频 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteVideo({ videoId: row.videoId }).then(() => {
            this.$notify({
              title: "成功",
              message: "删除线索成功",
              type: "success",
              duration: 2000,
            });
            this.getVideoList();
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
          "视频ID",
          "视频名称",
          "时长",
          "平均观看时长",
          "点击率",
          "退课人数"
        ];
        const filterVal = [
          "videoId",
          "videoName",
          "videoDuration",
          "avgWatchingDuration",
          "ctr",
          "dropNum"
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
