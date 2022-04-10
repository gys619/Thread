let logs = [
'"random":"34038984","log":"1649609592095~18RCD4zkS04d41d8cd98f00b204e9800998ecf8427e~1,1~E97F477EB64B001195F05A4D48067CD6C272595D~0doi8po~C~TRpGXBAPbWUeE0ZbWxoIam8ZFF9AXxAPBxQQQkEXDBoDBwYMAw8KBgcAAw4KAgEMABoeE0VQUhoIE0ZBQkxGV0dTFBQQRldUFAIQRVRBV01TRFMXGhpCVVwXDGMGHQIZBhQBHQAZB2UeE1hfFAIDHRBWRRoIEwVQUFpQAFABAAgEVAZTD1sGBwABUw9RCQMHDw1WCQAFFBQQX0IXDBp+WFxAThhKCQRqAAwQHRBBFAIQAAQBDw4CCAcMBAgLBBAZFFJZEwgXVxoeE1RFVBoIExAZFFZEEwgXcVddVl5QFnFcUhwXGhpcUEQXDBoLAwsGBRoeE0FWRBoIagQDARQBBgdoGhpAXhAPbRpTEx4XVxoeE1MXGhpTEx4XVxoeE1MXGhpTE28ZFFFdUBAPFF5UV1RTUExGEx4XV1IQCxBAFBQQUlsXDBpFAhwHGAwQHRBWUGdEEwgXBggQHRBXUhoIE0BUWFxdXA8GAggBCQsNAhoeE19fFAJpAR4FGghvHRBXWldVEwgXVxoeE19GURoIE1MXSw==~04y5u3i"',


]


if (process.env.logs) {
    if (process.env.logs.indexOf('\n') > -1) {

        logs = process.env.logs.split('\n');
    } else {
        logs = process.env.logs.split();
    }
}
for (let i = 0; i < logs.length; i++) {
    const index = (i + 1 === 1) ? '' : (i + 1);
    exports['logs' + index] = logs[i];
}
