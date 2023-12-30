import { Job } from "../entities/job";
import { HTMLParser } from "../helpers/HTMLParser";

export class JobsService {
    /**
     * Get Jobs data function
     * @param department : string
     * @returns Job
     */
    async getJobs(department: string): Promise<Job> {
        const htmlParser = new HTMLParser(`https://www.actian.com/company/careers/`);
        const windowLoaded = await htmlParser.init();
        if (!windowLoaded) throw new Error("Error while loading the action careers page!, Please check your connection")
        const extractedJobs = htmlParser.extractJobs()
        return this.filterJobs(extractedJobs, department)
    }

    public filterJobs(jobs: Job, department: string): Job {
        const departmentMatchExp = new RegExp('^(.*?(\\b'+department+'\\b)[^$]*)$', 'gi');
        return jobs.filter(job => departmentMatchExp.test(job.department))
    }
}