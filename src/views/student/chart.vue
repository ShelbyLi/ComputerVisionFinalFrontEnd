<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->

    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row> -->

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart />
    </el-row>

    <div class="filter-container">
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
    </div>



    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <p>分组1 频繁项集支持率</p>
          <!-- <raddar-chart /> -->
          <pie-chart ref="pieChart" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <p>分组2 频繁项集支持率</p>
          <pie-chart-2 ref="pieChart2" />
        </div>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col> -->
    </el-row>

    <!-- <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row> -->
    <div class="filter-container">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="分组1原因" width="100px" align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column label="学生学习课程多少" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[0]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[1]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="学生意志力高低" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[2]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[3]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="课程内容量多少" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[4]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[5]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="课程难度大小" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[6]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[7]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="观看视频数量" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[8]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[9]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="观看视频次数多少" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[10]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[11]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="观看视频时长" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[12]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[13]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
    <div class="filter-container">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list2"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="分组2原因" width="100px" align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column label="学生学习课程多少" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[0]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[1]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="学生意志力高低" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[2]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[3]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="课程内容量多少" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[4]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[5]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="课程难度大小" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[6]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[7]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="观看视频数量" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[8]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[9]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="观看视频次数多少" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[10]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[11]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="观看视频时长" width="155px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.isReason[12]">
              <el-button
                type="danger"
                icon="el-icon-plus"
                circle
                size="small"
              >
              </el-button>
            </span>
            <span v-if="row.isReason[13]">
              <el-button
                type="success"
                icon="el-icon-minus"
                circle
                size="small"
              >
              </el-button>
            </span>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import PieChart2 from './components/PieChart2'
import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'
import waves from "@/directive/waves"; // waves directive
import {
    postStudentGroup
} from "@/api/student";

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    // PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    PieChart2,
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  directives: { waves },
  data() {
    return {
    //   lineChartData: lineChartData.newVisitis
      listGroup: {
          groupingCriteria: "",
          groupingThreshold: null
      },
      groupingCriteria: ["学生课程总数", "学生视频总数", "学生个人退课率", "课程所有视频数", "课程退课率"],
      
      tableKey: 0, // 我不知道有啥用
      list: null,
      list2: null,
      listLoading: false,
    }
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // }
    
    handleGroup() {
      this.listLoading = true;
      postStudentGroup(this.listGroup).then((response) => {
        this.list = response.data.records[0];
        this.list2 = response.data.records[1]
        this.listLoading = false;
        this.$refs.pieChart.initChart(response.data.pie)
        this.$refs.pieChart2.initChart(response.data.pie2)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

//   .github-corner {
//     position: absolute;
//     top: 0px;
//     border: 0;
//     right: 0;
//   }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>