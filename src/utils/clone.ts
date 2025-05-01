import simpleGit,{SimpleGitOptions} from 'simple-git'
import createLogger from 'progress-estimator'
import chalk from 'chalk';

const logger = createLogger({
    spinner:{
        interval:100,
        frames:['#','#','#','#'].map((item)=>{
            return chalk.green(item)
        }),
    }
});

//Partial 将原来的类型转换成可选类型，也就是将所有属性变为可选项
const gitOptions:Partial<SimpleGitOptions> = {
    baseDir:process.cwd(), //当前工作目录
    binary:'git', //git命令的路径还有http的
    maxConcurrentProcesses:6, //最大并发数
}

export const clone = async (url:string,projectName:string,options:string[])=>{
    const git = simpleGit(gitOptions);
    try{
        await logger(git.clone(url,projectName,options),'代码下载中...',{
            estimate:1000*60, //预计时间
        })
        console.log()
        console.log(chalk.green(`✨ Project creation complete!`))
        console.log(chalk.blackBright('=================='))
        console.log(chalk.blackBright('== welcom ly-cli =='))
        console.log(chalk.blackBright('=================='))
        console.log()
        console.log(chalk.blackBright('To get started:'))
        console.log(chalk.blackBright(`cd ${projectName}`))
        console.log(chalk.blackBright('pnpm install'))
        console.log(chalk.blackBright('pnpm dev'))
    }catch(err){
        console.log(err)
        console.log(chalk.red('代码下载失败'))
    }
}