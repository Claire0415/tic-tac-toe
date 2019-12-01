import React from 'react';
import { connect } from 'dva';
import styles from './container.css';
import Square from '../components/Square';
import RecordTable from '../components/RecordTable';
import { Button } from 'antd';


function Container({ dispatch, con }) {
  const { playerValue, record, step, winner } = con;
  const latestMove = step === 0 ? new Array(9).fill(null) : record[step - 1].records;
  const array = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const mapSquare = (item, index, row) => {
    let chess = [];
    const play = (index, row) => {
      if (winner === '') {
        let next = step % 2 === 0 ? 'o' : 'x';
        let newArr = step === 0 ? new Array(9).fill(null) : Object.assign([], record[step - 1].records);//备份数组用作后续修改
        const handlerChange = (arr) => {
          dispatch({
            type: 'con/play',
            payload: {
              playerValue: next,
              record: record.concat({
                step: record.length + 1,
                coordinate: `[${row}, ${index}]`,
                records: chess.concat(arr)
              }),
              step: record.length + 1
            }
          })
          array.map(items => {
            let [a, b, c] = items;
            if (arr[a] && arr[b] && arr[c]) {
              if (arr[a] === arr[b] && arr[c] === arr[b]) {
                dispatch({
                  type: 'con/play',
                  payload: {
                    winner: arr[a]
                  }
                })
                alert(`赢了~~`)
              }
            }
            return winner;
          })
        }
        switch (row) {
          case 0:
            if (latestMove[index] !== null) {
              alert('这个位置被占啦，换个地方吧~')
            } else {
              newArr.splice(index, 1, playerValue);
              handlerChange(newArr);
            }
            break;
          case 1:
            if (latestMove[index + 3] !== null) {
              alert('这个位置被占啦，换个地方吧~')
            } else {
              newArr.splice(index + 3, 1, playerValue);;
              handlerChange(newArr);
            }
            break;
          case 2:
            if (latestMove[index + 6] !== null) {
              alert('这个位置被占啦，换个地方吧~')
            } else {
              newArr.splice(index + 6, 1, playerValue);;
              handlerChange(newArr);
            }
            break;
          default:
            break;
        }
        // 坐标 00 01 02,10 11 12,20 21 22,00 10 20,01 11 21, 02 10 22,00 11 22,02 11 20 
        // 行 数组下标 
        // 0 1 2,3 4 5,6 7 8, 0 3 6, 1 4 7, 2 5 8, 0 4 8, 2 4 6
      } else {
        alert('你已经赢了，再来一局吧~')
        return;
      }

    }
    return <Square key={index} value={item} onClick={() => play(index, row)} />
  }
  const reset = () => {
    dispatch({
      type: 'con/play',
      payload: {
        playerValue: 'x',// x or o
        record: [],
        step: 0,
        winner: ''
      }
    })
  }
  const recall = (records, index) => {
    dispatch({
      type: 'con/play',
      payload: {
        step: index + 1
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
  const chessArr = step === 0 ? new Array(9).fill(null) : record[step - 1].records;
  return (
    <div className={styles.container}>
      <div className={styles.normal}>
        <div className={styles.header}>the next player is: {playerValue}</div>
        <div>{chessArr.slice(0, 3).map((item, index) => mapSquare(item, index, 0))}</div>
        <div>{chessArr.slice(3, 6).map((item, index) => mapSquare(item, index, 1))}</div>
        <div>{chessArr.slice(6, 9).map((item, index) => mapSquare(item, index, 2))}</div>
        <Button onClick={() => reset()}>重新开始</Button>
        <div>the winner is: {winner}</div>
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
