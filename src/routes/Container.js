import React from 'react';
import { connect } from 'dva';
import styles from './container.css';
import Square from '../components/Square';
import RecordTable from '../components/RecordTable';
import { Button } from 'antd';


function Container({ location, dispatch, con }) {
  const { playerValue, chessArr, record, count } = con;
  const mapSquare = (item, index, row) => {
    let chess = [];
    const play = (index, row) => {
      let next = playerValue === 'x' ? 'o' : 'x';
      let newArr = Object.assign([], chessArr);
      switch (row) {
        case 0:
          if (chessArr[index] !== null) {
            alert('不能悔棋')
          } else {
            let counts = count;
            newArr.splice(index, 1, playerValue)
            dispatch({
              type: 'con/play',
              payload: {
                playerValue: next,
                record: record.concat({
                  step: count,
                  coordinate: '[' + row + ',' + index + ']',
                  records: chess.concat(newArr)
                }),
                count: counts + 1
              }
            })
          }
          break;
        case 1:
          if (chessArr[index + 3] !== null) {
            alert('不能悔棋')
          } else {
            newArr.splice(index + 3, 1, playerValue)
            let counts = count;
            dispatch({
              type: 'con/play',
              payload: {
                playerValue: next,
                record: record.concat({
                  step: count,
                  coordinate: '[' + row + ',' + index + ']',
                  records: chess.concat(newArr)
                }),
                count: counts + 1
              }
            })
          }
          break;
        case 2:
          if (chessArr[index + 6] !== null) {
            alert('不能悔棋')
          } else {
            newArr.splice(index + 6, 1, playerValue)
            let counts = count;
            dispatch({
              type: 'con/play',
              payload: {
                playerValue: next,
                record: record.concat({
                  step: count,
                  coordinate: '[' + row + ',' + index + ']',
                  records: chess.concat(newArr)
                }),
                count: counts + 1
              }
            })
          }
          break;
        default:
          break;
      }
      dispatch({
        type: 'con/play',
        payload: {
          chessArr: newArr
        }
      })
      // 坐标 00 01 02,10 11 12,20 21 22,00 10 20,01 11 21, 02 10 22,00 11 22,02 11 20 
      // 行 数组下标 
      // 0 1 2,3 4 5,6 7 8, 0 3 6, 1 4 7, 2 5 8, 0 4 8, 2 4 6

    }
    return <Square key={index} value={item} onClick={() => play(index, row)} />
  }
  const arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const calWinner = (arr) => {
    let winner;
    arr.map(item => {
      if (chessArr[item[0]] !== null && chessArr[item[1]] !== null && chessArr[item[2]] !== null && chessArr[item[0]] === chessArr[item[1]] && chessArr[item[1]] === chessArr[item[2]]) {
        winner = chessArr[item[0]];
      }
      return winner;
    })
    return winner;
  }
  const reset = () => {
    let arr = new Array(9).fill(null);
    dispatch({
      type: 'con/play',
      payload: {
        playerValue: 'x',
        chessArr: arr
      }
    })
  }
  const recall = (records, index) => {
    dispatch({
      type: 'con/play',
      payload: {
        // playerValue: 'x',
        chessArr: records.records
      }
    })
  }
  const column = [
    {
      title: '步数',
      key: 'step',
      dataIndex: 'step',
      render: (text, records, index) => <div className={styles.step} onClick={() => recall(records, index)}>{text}</div>
    },
    {
      title: '坐标',
      key: 'coordinate',
      dataIndex: 'coordinate'
    }
  ]
  return (
    <div className={styles.container}>
      <div className={styles.normal}>
        <div className={styles.header}>the next player is: {playerValue}</div>
        <div>{chessArr.slice(0, 3).map((item, index) => mapSquare(item, index, 0))}</div>
        <div>{chessArr.slice(3, 6).map((item, index) => mapSquare(item, index, 1))}</div>
        <div>{chessArr.slice(6, 9).map((item, index) => mapSquare(item, index, 2))}</div>
        <Button onClick={() => reset()}>重新开始</Button>
        <div>the winner is: {calWinner(arr)}</div>
      </div>
      <div className={styles.table}>
        <RecordTable column={column} data={record} />
      </div>
    </div>
  );
}

// IndexPage.propTypes = {
// };

export default connect(({ con }) => ({ con }))(Container);
