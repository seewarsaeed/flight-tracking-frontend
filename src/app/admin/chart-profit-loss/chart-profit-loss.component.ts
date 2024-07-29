import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { Chart,CategoryScale,LinearScale,BarController,BarElement    } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AppServiceService } from '../../Services/app-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
Chart.register(CategoryScale, LinearScale,BarController,BarElement );
interface ChartData {
  monthYear: string;
  profit: number;
  loss: number;
}
@Component({
  selector: 'app-chart-profit-loss',
  templateUrl: './chart-profit-loss.component.html',
  styleUrls: ['./chart-profit-loss.component.css']
})
export class ChartProfitLossComponent implements OnInit {
  private chart: Chart;
  constructor(private appservice:AppServiceService,private spinner:NgxSpinnerService){
    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        // Your initial options here
      }
    });
  }
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  chartData:ChartData[]=[];
  ngOnInit() {
    this.spinner.show(); // Show spinner before fetching data
  
    this.appservice.GetChartData().subscribe(
      (data: any) => {
        this.chartData = data; 
        this.createChart(this.chartData); 
        this.spinner.hide(); 
      },
      (error) => {
        console.error('Error fetching chart data:', error);
      }
    );
  }
  createChart(data: ChartData[]){
    if (data) {
      console.log(data);
      const labels = data.map((item) => item.monthYear);
      const profits = data.map((item) => item.profit);
      const losses = data.map((item) => item.loss);
      const canvas = document.getElementById('myChart') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (this.chart) {
        this.chart.destroy();
      }
      if(ctx != null)
      this.chart=new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Profit',
              data: profits,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Loss',
              data: losses,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x:{
              type: 'category',
              labels:labels
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    else {
      console.log('chartData is null or undefined');
    }
  }
  selectedMonth: string='';
  selectedYear: string='';
  updateChartData() {
    let filteredData = this.chartData;

    if (this.selectedMonth) {
      filteredData = filteredData.filter(item => item.monthYear.includes(this.selectedMonth));
      console.log('test');
      console.log(filteredData);
    }

    if (this.selectedYear) {
      filteredData = filteredData.filter(item => item.monthYear.includes(this.selectedYear));
    }

    this.createChart(filteredData);
  }
  generatePDF(): void {
    // Get chart and table containers
    const chartContainer = this.chartContainer.nativeElement;
    const tableContainer = this.tableContainer.nativeElement;
  
    // Use html2canvas to capture chart and table as images
    html2canvas(chartContainer).then(chartCanvas => {
      html2canvas(tableContainer).then(tableCanvas => {
        // Create a PDF document
        const pdf = new jsPDF();
        
        // Add the chart image to the PDF
        pdf.addImage(chartCanvas.toDataURL('image/png'), 'PNG', 10, 10, 100, 75);
  
        // Add the table image to the PDF
        pdf.addImage(tableCanvas.toDataURL('image/png'), 'PNG', 10, 90, 100, 75);
  
        // Save or display the PDF
        pdf.save('chart_and_table.pdf');
      });
    });
  }

}
