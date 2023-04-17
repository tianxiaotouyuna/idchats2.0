import useInitScreen from '@/hooks/useInitScreen';
import React, { useState, useEffect, FunctionComponent, useRef } from 'react'
import { GameEngine, GameLoop, GameLoopUpdateEventOptionType } from "react-native-game-engine";
import { Text, View, TouchableOpacity, Animated, Easing, Alert } from 'react-native'
import { screenHeight } from '@/utils/Dimensions';
import styles from './styles';
import People from './components/People';
const DinosaurRun: FunctionComponent = (props) => {
  const playerYval = new Animated.Value(0)
  const objXval = new Animated.Value(0)
  const bgXval = new Animated.Value(0)
  const [status, setstatus] = useState('Start');
  const [objWidth, setobjWidth] = useState(40);
  const [trees, settrees] = useState('🌲           🌴          🌳');
  const [score, setscore] = useState(0);
  const [highScore, sethighScore] = useState(0);
  const offset = new Animated.Value(0)
  const offset_bg = new Animated.Value(0)
  const offset_person = new Animated.Value(0)
  const GRID_SIZE=30;
  const CELL_SIZE=20;
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  let count = 0
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });

  const jump = () => {
    Animated.timing(playerYval, {
      toValue: -150,
      duration: 320,
      easing: Easing.linear,
      useNativeDriver: true
    }).start()
    setTimeout(() => {
      Animated.timing(playerYval, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true
      }).start()
    }, 200)
  }
  const start = () => {
    setTimeout(() => {
      Animated.loop(
        Animated.timing(objXval, {
          toValue: -650,
          duration: 1300,
          easing: Easing.linear,
          useNativeDriver: true
        }))
        .start((e) => {
        })
    }, 1000)
  }

  const secondRun = () => {
    objXval.setValue(0)
    Animated.timing(objXval, {
      toValue: 450,
      duration: score > 100 ? 900 : 1300,
      easing: Easing.linear,
      useNativeDriver: true
    }
    ).start((e) => {
      var objArray = [40, 50, 60, 30, 20, 0]
      var obj = objArray[Math.floor(Math.random() * objArray.length)]
      setobjWidth(obj)
      secondRun()
    }
    )
  }
  const secondbgRun = () => {
    bgXval.setValue(0)
    Animated.timing(bgXval, {
      toValue: 1450,
      duration: score > 100 ? 2400 : 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start((e) => {
      var objArray = ['🌲           🌴☁          🌳', '🌲     🌲🌲    ☁    🌳', '🌴', '🌳      🌳🌴  ☁    🌴', '🌹🌹', '☁ ☁']
      var obj = objArray[Math.floor(Math.random() * objArray.length)]
      settrees(obj)
      secondbgRun()
    })
  }
  const checkStatus = () => {
    objXval.addListener(({ value }) => {
      if (objWidth > 0) {
        if (playerYval._value > -40 && value >= -400 && value <= -330) {
          //console.log('crash')
          // setstatus('crashed')
          if (score > highScore) {
            sethighScore(score)
          }
        } else {
          // console.log('no crash')

        }
      }
    })
  }
  const countScore = () => {
    setInterval(() => {
      if (status == 'normal') {
        count += 1
        console.log('count:\n' + count)
      }
    }, 500);
  }

  useEffect(() => {
    startAnimated()
    startAnimated_bg()
    startAnimated_person()

    // countScore()
  }, [])

  const startAnimated = () => {
    const animationSlider = Animated.sequence([
      Animated.timing(offset, {
        toValue: -screenHeight,
        duration: 1800,
        delay: 0,
        easing: Easing.linear,
        useNativeDriver: true
      },),
    ]);
    Animated.loop(animationSlider).start();
  }
  const startAnimated_bg = () => {
    const animationSlider = Animated.sequence([
      Animated.timing(offset_bg, {
        toValue: -screenHeight,
        duration: 18100,
        delay: 0,
        easing: Easing.linear,
        useNativeDriver: true
      },),
    ]);
    Animated.loop(animationSlider).start();
  }
  const startAnimated_person = () => {
    const animationSlider = Animated.sequence([
      Animated.timing(offset_person, {
        toValue: screenHeight,
        duration: 18100,
        delay: 0,
        easing: Easing.linear,
        useNativeDriver: true
      }),
    ]);
    Animated.loop(animationSlider).start();
  }
  const render = () => {
    if (status == 'normal') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => jump()}>
          <Animated.Image
            source={require('@/resources/asd.png')}
            style={{
              width: '300%',
              height: '100%',
              position: 'absolute',
              left: 0,
              transform: [
                {
                  translateX: offset_bg
                }
              ]
            }}>
          </Animated.Image>
          <Animated.Image
            source={require('@/resources/asd.gif')}
            style={{
              height: 140, width: 40, backgroundColor: '#000', position: 'absolute', left: '10%',
              transform: [{ translateY: playerYval }], bottom: '40%'
            }}>
          </Animated.Image>
          <Animated.View style={{
            height: 38, width: objWidth - 2, borderWidth: objWidth > 0 ? 2 : 0, borderColor: 'black',
            backgroundColor: '#fff', position: 'absolute', left: '70%',
            transform: [{ translateX: offset }], bottom: '40%'
          }} />
          <View style={{ height: 2, width: '95%', backgroundColor: 'black', alignSelf: 'center', bottom: '40%', position: 'absolute' }} />
          <Animated.Text style={{
            fontSize: 25, opacity: 0.4, zIndex: 20, position: 'absolute', left: screenHeight, bottom: '40%',
            transform: [{ translateX: offset }]
          }}>{trees}</Animated.Text>

          <Text style={{ position: 'absolute', top: 20, right: 30, fontSize: 18 }}>Score: {count}</Text>
        </View>
      )
    } else if (status == 'crashed') {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>You made {count.current + 1} Points</Text>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>HI: {highScore} Points</Text>
          <TouchableOpacity onPress={() => {
            setTimeout(() => {
              objXval.setValue(0)
              playerYval.setValue(0)
              setscore(0)
              setstatus('normal')
            }, 1000);
          }} style={{ alignSelf: 'center', padding: 5, backgroundColor: 'black', marginTop: 20 }}>
            <Text style={{ color: 'white', fontSize: 15, }}>Retry</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => {
            setTimeout(() => {
              objXval.setValue(0)
              playerYval.setValue(0)
              setscore(0)
              setstatus('normal')
              start()
            }, 1000);
          }} style={{ alignSelf: 'center', padding: 5, backgroundColor: 'black', marginTop: 10 }}>
            <Text style={{ color: 'white', fontSize: 15, }}>START</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  const updateHandler = ({ touches, screen, time }:GameLoopUpdateEventOptionType) => {
    let move = touches.find(x => x.type === "move");
    if (move) {
      setx(x + move.delta.pageX)
      sety(y+move.delta.pageY)
    }
  };
const tapTop=()=>{
  Alert.alert('1')
}
  const renderBy_engine = () => {
    const BoardSize = GRID_SIZE * CELL_SIZE;
    const engine = useRef(null);
    return (
      <View style={styles.canvas}>

      <GameLoop style={styles.canvas} onUpdate={(args: GameLoopUpdateEventOptionType)=>updateHandler(args)}
      touchProcessor={()=>{tapTop}}>
        <GameEngine
          ref={engine}
          style={{
            width: BoardSize,
            height: BoardSize,
            flex: null,
            backgroundColor: "white",
          }}
          entities={{
            head: {
              position: [0, 0],
              size: CELL_SIZE,
              updateFrequency: 10,
              nextMove: 10,
              xspeed: 0,
              yspeed: 0,
              renderer: <People />,
            }
          }} 
        />
        </GameLoop>
      </View>
    )
  }
  return (
    // render()
    //计算最大值取哪个市区
    renderBy_engine()
  )
}
export default DinosaurRun;
