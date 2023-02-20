
// Import Highcharts
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import VariablePie from "highcharts/modules/variable-pie.js";
VariablePie(Highcharts);
export default function Piechart() {
  let options = {
    chart: {
      type: "variablepie",
   },
   title: {
      text: "",
   },
   plotOptions: {
      variablepie: {
         allowPointSelect: false,
         cursor: "pointer",
         dataLabels: {
            enabled: false,
         },
      },
   },
   tooltip: {
      headerFormat: "",
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' + "Percentage (%): <b>{point.y}</b><br/>" + "Amount : <b>{point.z}</b><br/>",
   },
    series: [
      {
         minPointSize: 10,
         innerSize: "20%",
         zMin: 0,
         name: "countries",
         data: [
            {
               name: "Charity",
               y: 2,
               z: 22222222.22,
            },
            {
               name: "Pre Sales",
               y: 5,
               z: 55555555.55,
            },
            {
               name: "Collaborations",
               y: 5,
               z: 55555555.55,
            },
            {
               name: "Liquidity Pool",
               y: 10,
               z: 111111111.1,
            },
            {
               name: "Marketing & Development",
               y: 14,
               z: 155555555.54,
            },
            {
               name: "Team & Foundation",
               y: 19,
               z: 211111111.09,
            },
            {
               name: "Public Sales",
               y: 20,
               z: 222222222.2,
            },
            {
               name: "Rewards",
               y: 25,
               z: 277777777.75,
            },
         ],
         colors: ["#8596ff", "#9200ff", "#fd5c3c", "#fc9338", "#fdd43c", "#f04feb", "#12d2ff", "#4748ff"],
      }
    ]
  };
  // 

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
