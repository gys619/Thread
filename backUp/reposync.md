# 通过reposync方式进行代码同步


### 申请PAT

[点此来生成一个 token](https://github.com/settings/tokens/new) ，把 `repo`和`workflow` 两部分勾上，然后点击最下面的创建按钮。

### 填写PAT到Secrets

申请完毕后，在分支中点击`Settings`-`Secrets`-`New secret`

`name`填`PAT`，`Value`填入上方申请到的PAT,保存即可

### 手动触发一次代码同步

点击`Actions`,点击右上角的star运行所有脚本

等待两分钟左右,能够发现代码全部同步过来

## Enjoy

操作到这一步,表示您已经全部完成了

剩下的去配置cookie等secrets就好啦
