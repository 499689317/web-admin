import { SET_TASKPANEL_INFO_ACTION } from '../../actions'
import { SET_DAILYTASK_INFO_ACTION } from '../../actions'

const initialState = {
    stateDataArray: [
        {
            dayUUID: 0,
            lock: false,
            activation: 0,
            finish: false,
            hasTaskCount: 0,
            needTaskCount: 0,
            taskLinkedUUID: 0,
            startDate: 0,
            stopDate: 0,
            startServerDateStr: '',
            stopServerDateStr: '',
        }
    ],
    dailyTaskStateUUID: 0,
    today: 0,
    rewardList: [],
    taskList: [
        {
            taskTemplateId: 0,
            taskUUID: 0,
            taskLinkUUID: 0,
            taskTargetData: '',
            taskRewardData: [],
            hasGotReward: false,
            taskState: 0,
            machineId: 0,
            prevTaskUUID: 0,
            nextTaskUUID: 0,
            taskTotalCount: 0,
            taskType: 0,
            rewardRTP: 0,
            totalBet: 0,
            targetHitCounter: 0,
        }
    ]
};

const dailytask = (state = initialState, action = {}) => {
    const { type, ...payload } = action
    Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k])

    switch (type) {
        case SET_TASKPANEL_INFO_ACTION:
            return Object.assign({ ...state }, { ...payload })
        case SET_DAILYTASK_INFO_ACTION:
            return Object.assign({ ...state }, { ...payload })
        default:
            return state
    }
}
export default dailytask;