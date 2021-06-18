<template>
  <div class="dashboard-editor-container">

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <box-plot/>
    </el-row> -->

    <div class="filter-container">
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handlePredicate"
        >
          预测
        </el-button>
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleGetLabel"
        >
          原label
        </el-button>
    </div>


    <div class="filter-container">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="序号" width="150px" align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column label="图像名" width="200px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.imgName }}</span>
        </template>
        </el-table-column>

        <el-table-column label="深度学习预测结果" width="255px" align="center">
          <template slot-scope="{ row }">
            <!-- <span>{{ row.dlPrediction }}</span> -->
            <span>{{ row.dlPrediction  | fruitNameFilter}}</span>
            <span v-if="fruitMap[row.dlPrediction] == 'apple'">
                <svg-icon icon-class= 'apple'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.dlPrediction] == 'strawberry'">
                <svg-icon icon-class= 'strawberry'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.dlPrediction] == 'orange'">
                <svg-icon icon-class= 'orange'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.dlPrediction] == 'banana'">
                <svg-icon icon-class= 'banana'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.dlPrediction] == 'durian'">
                <svg-icon icon-class= 'durian'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.dlPrediction] == 'pineapple'">
                <svg-icon icon-class= 'pineapple'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.dlPrediction] == 'pomegranate'">
                <svg-icon icon-class= 'pomegranate'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.dlPrediction] == 'grape'">
                <svg-icon icon-class= 'grape'  class="icon"/>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="机器学习预测结果" width="255px" align="center">
          <template slot-scope="{ row }">
            <!-- <span>{{ row.mlPrediction }}</span> -->
            <span>{{ row.mlPrediction  | fruitNameFilter}}</span>
            <span v-if="fruitMap[row.mlPrediction] == 'apple'">
                <svg-icon icon-class= 'apple'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.mlPrediction] == 'strawberry'">
                <svg-icon icon-class= 'strawberry'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.mlPrediction] == 'orange'">
                <svg-icon icon-class= 'orange'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.mlPrediction] == 'banana'">
                <svg-icon icon-class= 'banana'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.mlPrediction] == 'durian'">
                <svg-icon icon-class= 'durian'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.mlPrediction] == 'pineapple'">
                <svg-icon icon-class= 'pineapple'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.mlPrediction] == 'pomegranate'">
                <svg-icon icon-class= 'pomegranate'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.mlPrediction] == 'grape'">
                <svg-icon icon-class= 'grape'  class="icon"/>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="label" width="255px" align="center">
          <template slot-scope="{ row }" v-if="isLabelVisible">
            <!-- <span>{{ row.label }}</span> -->
            <span>{{ row.label  | fruitNameFilter}}</span>
            <span v-if="fruitMap[row.label] == 'apple'">
                <svg-icon icon-class= 'apple'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.label] == 'strawberry'">
                <svg-icon icon-class= 'strawberry'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.label] == 'orange'">
                <svg-icon icon-class= 'orange'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.label] == 'banana'">
                <svg-icon icon-class= 'banana'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.label] == 'durian'">
                <svg-icon icon-class= 'durian'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.label] == 'pineapple'">
                <svg-icon icon-class= 'pineapple'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.label] == 'pomegranate'">
                <svg-icon icon-class= 'pomegranate'  class="icon"/>
            </span>
            <span v-if="fruitMap[row.label] == 'grape'">
                <svg-icon icon-class= 'grape'  class="icon"/>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <p>深度学习预测统计</p>
          <!-- <raddar-chart /> -->
          <pie-chart ref="pieChart" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <p>机器学习预测统计</p>
          <pie-chart-2 ref="pieChart2" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper" v-if="isLabelVisible">
          <p>原label统计</p>
          <pie-chart-3 ref="pieChart3"/>
        </div>
      </el-col>
    </el-row>

    <div class="filter-container">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="score"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <!-- <el-table-column label="序号" width="100px" align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column> -->

        <el-table-column label="score" width="155px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.measurement }}</span>
        </template>
        </el-table-column>

        <el-table-column label="深度学习" width="155px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.dl }}</span>
          </template>
        </el-table-column>

        <el-table-column label="机器学习" width="155px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.ml }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
    
    
  </div>
</template>

<script>
// import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import PieChart2 from './components/PieChart2'
import PieChart3 from './components/PieChart3'
// import BoxPlot from './components/Boxplot'
import waves from "@/directive/waves"; // waves directive
import {
    FetchtFruitList,
    FetchtScore
} from "@/api/fruit";

export default {
  name: 'DashboardAdmin',
  components: {
    // LineChart,
    PieChart,
    PieChart2,
    PieChart3
    // BoxPlot
  },
  directives: { waves },
  filters: {
    fruitNameFilter(fruit) {
      const fruitMap = ['apple', 'strawberry', 'orange', 'banana', 'durian', 'pineapple', 'pomegranate', 'grape'];
      return fruitMap[fruit];
    },
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      score: null,
      listLoading: false,
      isLabelVisible: false,
      fruitMap: ['apple', 'strawberry', 'orange', 'banana', 'durian', 'pineapple', 'pomegranate', 'grape'],
      pie3: null
    }
  },
  methods: {
      handlePredicate() {
        this.listLoading = true;
        this.isLabelVisible = false;
        FetchtFruitList(this.listGroup).then((response) => {
            this.list = response.data.record;
            this.listLoading = false;
            this.$refs.pieChart.initChart(response.data.pie)
            this.$refs.pieChart2.initChart(response.data.pie2)
            // this.$refs.pieChart3.initChart(response.data.pie3)
            this.pie3 = response.data.pie3
        })
      },
     
      handleGetLabel() {
        this.isLabelVisible = true;
        this.getScore()
      },
      getScore() {
        // this.listLoading = true;
        FetchtScore().then((response) => {

            this.score = response.data.score;
            this.$refs.pieChart3.initChart(this.pie3)
        })
      },

    
    // handleGroup() {
    //   this.listLoading = true;
    //   postStudentGroup(this.listGroup).then((response) => {
    //     this.count = response.data.count
    //     this.droprate = response.data.dropRate
    //     this.list = response.data.records[0];
    //     this.list2 = response.data.records[1]
    //     this.listLoading = false;
    //     this.$refs.pieChart.initChart(response.data.pie)
    //     this.$refs.pieChart2.initChart(response.data.pie2)
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

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