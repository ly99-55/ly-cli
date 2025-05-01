import { input, select } from "@inquirer/prompts";
import { clone } from "src/utils/clone";
import fs from 'fs-extra'
import path from "path";
export interface ITemplateInfo {
  name: string;
  downloadUrl: string;
  description: string;
  branch: string;
}

export const templates: Map<string, ITemplateInfo> = new Map([
  [
    "Vue3-Vite-Typescript-Template",
    {
      name: "Vue3-Vite-Typescript-Template",
      downloadUrl: "https://gitee.com/liu-yangxx/ly-admin-pro.git",
      description: "基于Vue3、TypeScript的模板项目。",
      branch: "master",
    },
  ],
]);

const isOverWrite =  (projectName: string) => {
    console.warn(`${projectName}文件夹已存在`)
   return select({
        message: `是否覆盖？`,
        choices: [
            { name: '是', value: true },
            { name: '否', value: false }
        ]
    })
    
}


export async function create(projectName?: string) {
	const templateList = Array.from(templates).map((item: [string, ITemplateInfo]) => {
		const [name, info] = item;
		return {
			name,
			value: name,
			description: info.description
		};
	});
	if (!projectName) {
		projectName = await input({ message: '请输入项目名称：' }); // 修复：赋值给projectName
	}

    const filePath = path.resolve(process.cwd(), projectName);
    if(fs.existsSync(filePath)){
        const run = await isOverWrite(projectName)
        if(run){
           await fs.remove(filePath)
        }else{
            return
        }
    }

	const templateName = await select({ message: '请选择模板：', choices: templateList });

	const info = templates.get(templateName);
	if (info) {
		clone(info.downloadUrl, projectName, ['-b', info.branch]);
	}
}
