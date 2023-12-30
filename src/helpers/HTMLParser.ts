import { DOMWindow, JSDOM } from "jsdom";
import { Job, JobDepartment, JobPositions } from "../entities/job";

/**
 * HTML Parser Class to load the given 
 * URL `https://www.actian.com/company/careers/`
 * and scrap data related to job posting
 */
export class HTMLParser {
    private _url: string;
    private _document!: Document;
    private _window!: DOMWindow;

    public isWindowLoaded: boolean = false;

    constructor(url: string) {
        this._url = url;
    }

    init(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                JSDOM.fromURL(this._url).then((dom: JSDOM) => {
                    const { window } = dom;
                    const { document } = window;
                    this._document = document;
                    this._window = window;
                    window.addEventListener('load', () => resolve(true))
                }).catch((err) => {
                    throw new Error(err.message)
                })
            } catch (error) {
                this._window.close()
                reject(false)
            }
        })
    }

    extractJobs() {
        const jobPostings = this._document!.getElementsByClassName('job-posting') as HTMLCollectionOf<Element>
        const jobs: Job = []
        for (let i = 0; i < jobPostings.length; i++) {
            const job = jobPostings.item(i) as Element;
            const jobOpenings = job.childNodes[0].childNodes[1].textContent?.match(/\d+/g)
            const jobDetails: JobDepartment = {
                department: job.childNodes[0].childNodes[0].textContent as string,
                openings: jobOpenings!.length > 0 ? jobOpenings![0] as string : null,
                positions: []
            }
            const jobListing = Array.from(job.children[1].getElementsByClassName('listing')) as Element[];
            const listedJobs: JobPositions[] = jobListing.map(listing => {
                const openPosition: JobPositions = {
                    name: listing.childNodes[0].childNodes[0].textContent as string,
                    location: listing.childNodes[0].childNodes[1].textContent as string
                }
                return openPosition
            })
            jobDetails.positions = listedJobs;
            jobs.push(jobDetails);
        }
        this._window.close()
        return jobs
    }
}