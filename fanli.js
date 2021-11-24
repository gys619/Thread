/*
* 38 8,18 * * * m_fanli.js
* */
const {Env} = require('./magic');
const $ = new Env('M饭粒任务');

$.logic = async function () {
    let re = await getTaskFinishCount();
    if (re === -1) {
        $.log("获取个人信息数据错误")
        return;
    }
    if (re.finishCount >= re.maxTaskCount) {
        $.log("已完成全部任务")
        return;
    }
    let loopTimes = re.maxTaskCount - re.finishCount
    $.log(
        `已完成${re.finishCount}次 - 总计可完成${re.maxTaskCount}次 - 还需完成${loopTimes}次\n`)
    for (let i = 0; i < loopTimes; i++) {
        $.log(`开始第${i + 1}次`)
        let taskList = await getTaskList();
        if (taskList === -1) {
            $.log("获取任务列表数据错误")
            continue;
        }
        let task = null;
        for (let i = 0; i < taskList.length; i++) {
            let tmp = taskList[i];
            if (tmp.statusName === '活动结束' || !tmp.taskId || !tmp.businessId
                || tmp.taskId < 1) {
                continue
            }
            if (!task) {
                task = taskList[i];
                continue;
            }
            if (tmp.rewardBeans >= task.rewardBeans) {
                task = taskList[i]
            }
        }
        if (!task?.taskId) {
            $.log("没有找到可继续进行的任务，结束")
            return;
        }
        let data = await saveTaskRecord(task.taskId, task.businessId,
            task.taskType);
        $.log(`等待${task.watchTime}秒`)
        await $.wait(task.watchTime * 1000 + 100, (task.watchTime + 1) * 1000)
        if (data === -1) {
            $.log("做任务失败")
            continue;
        }
        let record = await saveTaskRecord(task.taskId, task.businessId,
            task.taskType, data.uid, data.tt)
        await $.wait(2000, 3000)
        if (record === -1) {
            $.log("获取奖励失败")
            continue;
        }
        $.log(`${record.msg}\n`)
    }
}
$.run({filename: __filename, wait: [1000, 1500]}).catch(
    reason => $.log(reason));

//
/**
 * Safari ifanli
 *
 * {"code":1,"msg":null,"content":[{"taskName":"直播下单更优惠","taskType":1,"taskId":113,"businessId":5548104,"jumpUrl":"https://lives.jd.com/#/5548104/replay?appid=&origin=118","status":2,"statusName":"去赚钱","watchTime":8,"rewardBeans":2},{"taskName":"种草专区","taskType":2,"taskId":112,"businessId":246528834,"jumpUrl":"https://h5.m.jd.com/active/faxian/video/index.html?style=2&des=VideoImmersion&adid=&referpageid=MvideoDetail&playtype=65&projectid=&modeid=1&entrance=1&origin=jdfanli&id=246528834","status":0,"statusName":"去赚钱","watchTime":8,"rewardBeans":2},{"taskName":"去逛逛好货会场","taskType":3,"taskId":3,"businessId":null,"jumpUrl":"https://pro.m.jd.com/mall/active/ieqDLHUodjb59dqysi1GEoZ67o2/index.html","status":3,"statusName":"去赚钱","watchTime":8,"rewardBeans":2},{"taskName":"精选好物","taskType":4,"taskId":10026084864879,"businessId":10026084864879,"jumpUrl":"http://ifanli.m.jd.com/rebate/jump/toItemDetail?skuId=10026084864879","status":1,"statusName":"去赚钱","watchTime":8,"rewardBeans":5}]}
 */
// noinspection DuplicatedCode
async function getTaskList() {
    let headers = {
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://ifanli.m.jd.com/rebate/earnBean.html',
        'Host': 'ifanli.m.jd.com',
        'Cache-Control': 'no-cache',
        'Accept-Language': 'zh-cn',
        'Cookie': $.cookie
    }
    let url = `https://ifanli.m.jd.com/rebateapi/task/getTaskList`
    headers['User-Agent'] = `Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1`
    let data = await $.get(url, headers)
    if (data?.code === 1) {
        return data?.content
    }
    return -1;
}

async function saveTaskRecord(taskId, taskType, businessId, uid, tt) {
    //{ taskId: taskId,businessId:businessId, taskType: taskType }
    let body;
    if (uid) {
        body = {
            "taskId": taskId,
            "taskType": taskType,
            "businessId": businessId,
            "uid": uid,
            "tt": tt
        };
    } else {
        body = {
            "taskId": taskId,
            "taskType": taskType,
            "businessId": businessId
        };
    }

    let headers = {
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://ifanli.m.jd.com/rebate/earnBean.html',
        'Host': 'ifanli.m.jd.com',
        'Origin': 'https://ifanli.m.jd.com',
        'Cache-Control': 'no-cache',
        'Accept-Language': 'zh-cn',
        'Cookie': $.cookie
    }
    headers['User-Agent'] = `Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 JDFanli/2.0.20 jd.fanli/2.0.20`
    let data = await $.post(
        'https://ifanli.m.jd.com/rebateapi/task/saveTaskRecord', body, headers)
    // noinspection DuplicatedCode
    if (data?.code === 1) {
        return data?.content;
    }
    return -1;
}

/**
 * Safari ifanli
 *
 * {"code":1,"msg":null,"content":{"finishCount":0,"maxTaskCount":4}}
 */
// noinspection DuplicatedCode
async function getTaskFinishCount() {
    let headers = {
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://ifanli.m.jd.com/rebate/earnBean.html',
        'Host': 'ifanli.m.jd.com',
        'Cache-Control': 'no-cache',
        'Accept-Language': 'zh-cn',
        'Cookie': $.cookie
    }
    let url = `https://ifanli.m.jd.com/rebateapi/task/getTaskFinishCount?`
    headers['User-Agent'] = `Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1`
    let data = await $.get(url, headers)
    if (data?.code === 1) {
        return data?.content
    }
    return -1;
}