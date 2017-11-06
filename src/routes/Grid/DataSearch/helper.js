/* eslint-disable */
export function getOption(data = [], legend = []) {
  /* hard code block */
  const _data = [
    {value:120, name:'剩余-通用合同', selected: true},
    {value:80, name:'剩余-个人律师', selected: true},
    {value:110, name:'剩余-个体工商户', selected: true},
    {value:90, name:'剩余-个人房产经济', selected: true},
    {value:100, name:'已领用-通用合同'},
    {value:150, name:'已领用-个人律师'},
    {value:150, name:'已领用-个体工商户'},
    {value:200, name:'已领用-个人房产经济'}
  ]
  const option = {
    backgroundColor: 'white',
    tooltip: {
      trigger: 'item',
      formatter: "{b}: {c} ({d}%)"
    },
    legend: {
      // orient: 'vertical',
      // y: 'bottom',
      type: 'scroll',
      top: 50,
      data: _data.map(item => item.name)
    },
    markLine: {
      z: -1
    },
    animationEasing: 'elasticOut',

    /* hard code block */
    series: [
      {
        type:'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        center: ['50%', '70%'],
        label: {
          normal: {
            position: 'inner'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[
          {value:400, name:'剩余', selected: true},
          {value:600, name:'已领用'},
        ]
      },
      {
        type:'pie',
        radius: ['40%', '55%'],
        center: ['50%', '70%'],
        label: {
          normal: {
            show: false
          }
        },
        data:[
          {value:120, name:'剩余-通用合同', selected: true},
          {value:80, name:'剩余-个人律师', selected: true},
          {value:110, name:'剩余-个体工商户', selected: true},
          {value:90, name:'剩余-个人房产经济', selected: true},
          {value:100, name:'已领用-通用合同'},
          {value:150, name:'已领用-个人律师'},
          {value:150, name:'已领用-个体工商户'},
          {value:200, name:'已领用-个人房产经济'}
        ]
      }
    ]}
  return option
}

