import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ProgressCircle} from 'react-native-svg-charts';

const DashboardTab = () => {
  const [totalCases, setTotalCases] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [totalSuspects, setTotalSuspects] = useState(0);
  const [totalRefuses, setTotalRefuses] = useState(0);
  const [totalPopulacao, setTotalPopulacao] = useState(0);
  const [totalPercCases, setTotalPercCases] = useState(0);

  function getTodosEstadosBrasileiros() {
    const apiTodosEstadosBrasileiros = () => {
      return fetch('https://covid19-brazil-api.now.sh/api/report/v1')
        .then((response) => response.json())
        .then((json) => {
          //   const jsontmp = JSON.stringify(json.data);
          let sumTotalCases = 0;
          let sumTotalDeaths = 0;
          let sumTotalSuspects = 0;
          let sumTotalRefuses = 0;
          for (let i = 0; i < 27; i++) {
            // console.log(jsontmp.length);
            let tmpcases = JSON.stringify(json.data[i].cases);
            let tmpdeaths = JSON.stringify(json.data[i].deaths);
            let tmpsuspects = JSON.stringify(json.data[i].suspects);
            let tmprefuses = JSON.stringify(json.data[i].refuses);
            sumTotalCases += +tmpcases;
            sumTotalDeaths += +tmpdeaths;
            sumTotalSuspects += +tmpsuspects;
            sumTotalRefuses += +tmprefuses;
          }
          setTotalCases(sumTotalCases);
          setTotalDeaths(sumTotalDeaths);
          setTotalSuspects(sumTotalSuspects);
          setTotalRefuses(sumTotalRefuses);
          console.log(
            '-------------------------------------------------------',
          );
          return null;
        })
        .catch((error) => {
          console.error(error);
        });
    };
    apiTodosEstadosBrasileiros();
    const apiPopulacaoBrasileira = () => {
      return fetch(
        'https://servicodados.ibge.gov.br/api/v1/projecoes/populacao',
      )
        .then((response) => response.json())
        .then((json) => {
          let populacao = +JSON.stringify(json.projecao.populacao);
          setTotalPopulacao(populacao);
        });
    };
    apiPopulacaoBrasileira();
    let percCases: number = +(+totalCases / +totalPopulacao).toFixed(2);
    setTotalPercCases(percCases);
  }

  return (
    <ScrollView>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 25,
        }}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontWeight: 'bold',
              color: 'blue',
              marginBottom: 25,
            }}>
            Dashboard
          </Text>
          <Button
            title="getTodosEstadosBrasileiros"
            onPress={() => getTodosEstadosBrasileiros()}
          />
        </View>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 25,
          }}>
          <Text>Total de casos {totalCases}</Text>
          <Text>Total de mortes {totalDeaths}</Text>
          <Text>Total de suspeitas {totalSuspects}</Text>
          <Text>Total de rejeições {totalRefuses}</Text>
        </View>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}>
          <Text>Porcentagem da população brasileira já infectada</Text>
          <ProgressCircle
            // eslint-disable-next-line react-native/no-inline-styles
            style={{height: 100, marginTop: 20}}
            progress={totalPercCases}
            progressColor={'rgb(134, 65, 244)'}
            strokeWidth={10}
          />
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              textAlign: 'center',
              backfaceVisibility: 'visible',
            }}>
            {totalPercCases}%
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardTab;
