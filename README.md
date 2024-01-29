```
group:
- name: alpha
[
    -name: 平台
    - pipeline[]
        pipeline:{
            env,
            project,
            workspace,
            tasks: [

            ]
        }
    - log
    - status [idle, pending, doing, done, failed]
]

```
