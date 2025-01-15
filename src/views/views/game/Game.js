import { useEffect, useReducer } from 'react'
import Dispatcher from '../../../engine/dispatcher/Dispatcher'
import Saves from '../../../engine/saves/Saves'
import GlobalConfigs from '../../../configs/global'
import ModuleExampleActions from '../../../modules/ModuleExample/actions'
import Sounds from '../../../engine/sounds/Sounds'

function Game() {
    const [state, dispatch] = useReducer(Dispatcher.reducer, {})

    useEffect(() => {
        Sounds.play('wow')
        dispatch({
            action: ModuleExampleActions.example,
            payload: {},
        })
    }, [])

    // useEffect(() => {
    //     Creatures.Dispatch.add(dispatch, Creatures.Helpers.generate(1, 70), 1, '')
    // }, [])

    /**
     * Gameplay Loop
     */
    useEffect(() => {
        // Required Variables and Tracking
        const fixedUpdateInSeconds = 1
        const fixedUpdateRate = 1 / fixedUpdateInSeconds
        let frameId = 0
        let prevFrameTime = 0
        let accumulatedLagTime = 0

        // Offline Progress & Catchup
        // if (ENGINE.OFFLINE_PROGRESS) {
        //     // Implement Offline Progress
        // }

        // Stopping Gameplay Loop Handler
        const stop = () => {
            cancelAnimationFrame(frameId)
        }

        // Ticks
        let currentFrameTime = 0
        let lastSave = 0
        const tick = (currentFrameTime) => {
            try {
                frameId = requestAnimationFrame(tick)

                // Calculate Lag & Delta Time
                const deltaMS = currentFrameTime - prevFrameTime
                const deltaTime = Math.min(fixedUpdateRate, deltaMS / 1000)
                accumulatedLagTime += deltaTime
                lastSave += deltaTime

                // Handle onFixedUpdate Logic
                while (accumulatedLagTime >= fixedUpdateRate) {
                    accumulatedLagTime -= fixedUpdateRate
                    Dispatcher.fixedUpdate(dispatch, deltaTime)
                }

                // Handle onUpdate Logic
                Dispatcher.update(dispatch, deltaTime)

                // Check if save is needed
                if (lastSave >= GlobalConfigs.AUTO_SAVE_TIMER_MINUTES * 60) {
                    Saves.save(state)
                    lastSave = 0
                }

                // Set Frame Time
                prevFrameTime = currentFrameTime
            } catch (err) {
                stop()
                throw err
            }
        }

        tick(currentFrameTime)

        return stop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * Save on Reload & Safe Exit
     */
    useEffect(() => {
        const handler = () => {
            Saves.save(state)
        }

        window.addEventListener('beforeunload', handler)

        return () => {
            window.removeEventListener('beforeunload', handler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return <div className="App"></div>
}

export default Game
