import { HttpFetch } from '../../lib'

export const SET_TASKPANEL_INFO_ACTION = 'set_taskpanel_info_action';
export const SET_DAILYTASK_INFO_ACTION = 'set_dailytask_info_action';

export const setTaskPanelInfoAction = (payload) => {
    return {
        type: SET_TASKPANEL_INFO_ACTION,
        ...payload,
    }
}
export const setDailyTaskInfoAction = (payload) => {
    return {
        type: SET_DAILYTASK_INFO_ACTION,
        ...payload,
    }
}
// 任务面板列表
export const getTaskPanelInfoAction = ({ httpFetch, playerId, taskStateId } = {}) =>
    dispatch => {
        httpFetch = httpFetch || new HttpFetch()
        return httpFetch.get('/dailytask/list', { playerId, taskStateId })
            .then(resp => {
                const { stateDataArray, dailyTaskStateUUID, today, rewardList } = resp.data
                dispatch(setTaskPanelInfoAction({ stateDataArray, dailyTaskStateUUID, today, rewardList }))
                return resp
            })
    }
// 任务列表数据
export const getDailyTaskInfoAction = ({ httpFetch, playerId } = {}) =>
    dispatch => {
        httpFetch = httpFetch || new HttpFetch()
        return httpFetch.get('/dailytask/task', { playerId })
            .then(resp => {
                const { taskList } = resp.data
                dispatch(setDailyTaskInfoAction({ taskList }))
                return resp
            })
    }