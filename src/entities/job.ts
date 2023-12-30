/**
 * Job, Job Departments and Job Positions entity type
 */
export type Job = JobDepartment[];
export type JobDepartment = {
    department: string,
    openings: string | null,
    positions: JobPositions[]
}

export type JobPositions = {
    name: string,
    location: string,
}