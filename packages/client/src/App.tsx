import { Button, List, Toast } from "@douyinfe/semi-ui";
import "./App.css";

const taskList = [
  {
    title: "拉取代码",
    desc: "从代码仓库拉取指定分支的代码",
    props: JSON.stringify({}),
  },
  {
    title: "环境变量",
    desc: "读取指定的环境变量，生成 .env.build.cache 文件",
    props: JSON.stringify({}),
  },
];

// const pipelineGroup = [
//   {
//     name: "hugo-game-alpha-android",
//     desc: "打包所有 alpha 环境的 android 包",
//     pipelines: [{}],
//   },
// ];

function App() {
  return (
    <div>
      <Button onClick={() => Toast.warning({ content: "welcome" })}>
        创建任务
      </Button>
      <div
        style={{
          padding: 12,
          border: "1px solid var(--semi-color-border)",
          margin: 12,
        }}
      >
        <List
          dataSource={taskList}
          layout="horizontal"
          renderItem={(item) => {
            return (
              <List.Item
                main={
                  <div>
                    <span
                      style={{
                        color: "var(--semi-color-text-0)",
                        fontWeight: 500,
                      }}
                    >
                      {item.title}
                    </span>
                    <p
                      style={{
                        color: "var(--semi-color-text-2)",
                        margin: "4px 0",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                }
              ></List.Item>
            );
          }}
        ></List>
      </div>
    </div>
  );
}

export default App;
